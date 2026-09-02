"use client";

import { useEffect, useRef, useState } from "react";
import { OPEN_CHAT_EVENT } from "./openChat";
import "./chat-modal.scss";

/**
 * Ask AI — the Chatbase agent in a modal.
 *
 * Uses Chatbase's iframe embed rather than the bubble script, so there is no
 * second floating launcher competing with the WhatsApp and back-to-top buttons,
 * and no dependency on their JS command API.
 *
 * The iframe is only rendered while open. Mounting it up front would load the
 * agent for every visitor whether or not they ever click Ask AI.
 *
 * Override the agent per environment with NEXT_PUBLIC_CHATBASE_IFRAME_URL.
 */
const IFRAME_URL =
    process.env.NEXT_PUBLIC_CHATBASE_IFRAME_URL ||
    "https://www.chatbase.co/chatbot-iframe/blFW3eL0SuieFUa_wra01";

export default function ChatModal() {
    const [open, setOpen] = useState(false);
    const panelRef = useRef(null);

    useEffect(() => {
        const onOpen = () => setOpen(true);
        window.addEventListener(OPEN_CHAT_EVENT, onOpen);
        return () => window.removeEventListener(OPEN_CHAT_EVENT, onOpen);
    }, []);

    useEffect(() => {
        if (!open) return undefined;

        const onKeyDown = (event) => {
            if (event.key === "Escape") setOpen(false);
        };

        document.addEventListener("keydown", onKeyDown);
        panelRef.current?.focus();

        // The WhatsApp and back-to-top buttons live in the same corner this
        // panel docks into. Flagging the body lets CSS hide them for the
        // duration rather than having the panel sit on top of dead controls.
        document.body.classList.add("chat-open");

        // Body scroll is deliberately NOT locked — the panel docks alongside the
        // page instead of covering it, so the user can keep reading and browsing
        // while the agent is open.
        return () => {
            document.removeEventListener("keydown", onKeyDown);
            document.body.classList.remove("chat-open");
        };
    }, [open]);

    if (!open) return null;

    return (
        // No backdrop and no aria-modal: this docks beside the page rather than
        // blocking it, so the rest of the site stays readable and usable while
        // the agent is open — matching how these widgets normally behave.
        <div className="chatm__dock">
            <div
                className="chatm"
                role="dialog"
                aria-label="Ask AI"
                tabIndex={-1}
                ref={panelRef}
            >
                {/*
                  Positioned to sit exactly on top of the X that Chatbase draws
                  in its own header. That one is cross-origin and cannot close
                  this panel, so ours overlays it — the user sees a single X and
                  the click lands here, where it works.

                  Drawn as an SVG rather than the &times; glyph: the entity
                  renders as a heavy serif cross that will not match the thin
                  stroked icon inside the frame.
                */}
                <button
                    type="button"
                    className="chatm__close"
                    onClick={() => setOpen(false)}
                    aria-label="Close chat"
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                        <path
                            d="M6 6 L18 18 M18 6 L6 18"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                    </svg>
                </button>

                <iframe
                    src={IFRAME_URL}
                    title="Ask AI"
                    className="chatm__frame"
                    // Chatbase asks for microphone so voice input works.
                    allow="microphone"
                />
            </div>
        </div>
    );
}
