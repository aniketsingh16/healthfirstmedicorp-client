"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import "./request-callback-two.scss";
import { OPEN_CALLBACK_MODAL } from "@/components/shared/headers/modules/RequestCallbackButton";

/**
 * Callback-request popup. Opens once, five seconds after mount.
 *
 * "Once" is persisted in localStorage rather than component state — otherwise
 * it would reappear on every client-side navigation, which is what makes these
 * popups feel like spam. Clearing the key below re-arms it for testing.
 */
const SEEN_KEY = "hfmc:callback-popup-seen";
const DELAY_MS = 5000;

const PHONE = "+91 73870 86440";
const EMAIL = "acc.hfmc01@gmail.com";


// Display labels, not the Sanity `category.name` values. Those are slug-shaped,
// for example "First-Aid-Kits", and read badly in a dropdown. Keep this list in
// step with the categories in Sanity.
const CATEGORIES = [
  "AED / Defibrillators",
  "CPR Training Manikins",
  "First Aid Kits",
  "Evacuation Chairs",
  "Other / Not sure",
];


export default function RequestCallbackTwo() {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({ phone: "", name: "", email: "" });
  const [status, setStatus] = useState({ state: "idle", message: "" });
  const [category, setCategory] = useState("");
  const [catQuery, setCatQuery] = useState("");
  const [catOpen, setCatOpen] = useState(false);

  const categoryMatches = CATEGORIES.filter((item) =>
    item.toLowerCase().includes(catQuery.trim().toLowerCase())
  );

  const dialogRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    if (window.localStorage.getItem(SEEN_KEY)) return undefined;

    const timer = setTimeout(() => setOpen(true), DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {  // Manual Opening of Modal
    const onOpen = () => setOpen(true);
    window.addEventListener(OPEN_CALLBACK_MODAL, onOpen);
    return () => window.removeEventListener(OPEN_CALLBACK_MODAL, onOpen);
  }, []);

  // Close on Escape, and lock background scroll while open.
  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") close();
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  function close() {
    setOpen(false);
    try {
      window.localStorage.setItem(SEEN_KEY, "1");
    } catch {
      // Private browsing can throw on write — not worth failing the close over.
    }
  }

  function update(field) {
    return (event) => setValues((prev) => ({ ...prev, [field]: event.target.value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!category) {
      setStatus({ state: "error", message: "Please pick a product category." });
      return;
    }

    if (status.state === "sending") return;

    setStatus({ state: "sending", message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          phone: values.phone,
          email: values.email,
          enquiry: `Callback requested from website popup regarding Category: ${category}`,

        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus({ state: "error", message: data?.error ?? "Something went wrong." });
        return;
      }

      setValues({ phone: "", name: "", email: "" });
      setCategory("");
      setCatQuery("");
      setStatus({ state: "done", message: "Thanks! Our team we'll call you back shortly." });

      setTimeout(() => {
        close();
        // Without this the "Thanks" message is still in state next time the
        // modal opens, sitting above an empty form.
        setStatus({ state: "idle", message: "" });
      }, 2200);

    } catch {
      setStatus({ state: "error", message: "Could not reach the server. Please try again." });
    }
  }

  if (!open) return null;

  return (
        <div className="rcb__overlay rcb__overlay--two" onClick={close} role="presentation">
      <div
        className="rcb"
        role="dialog"
        aria-modal="true"
        aria-labelledby="rcb-title"
        tabIndex={-1}
        ref={dialogRef}
        // The overlay closes on click; stop clicks inside the panel bubbling up.
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="rcb__close" onClick={close} aria-label="Close">
          &times;
        </button>

        <h2 className="rcb__title" id="rcb-title">
          Need help finding what you were looking for?
        </h2>
        <p className="rcb__subtitle">Get a call back from our team</p>

        <form className="rcb__form" onSubmit={handleSubmit}>
          <input
            type="tel"
            className="rcb__input"
            placeholder="Phone*"
            required
            value={values.phone}
            onChange={update("phone")}
          />
          <input
            type="text"
            className="rcb__input"
            placeholder="Name*"
            required
            value={values.name}
            onChange={update("name")}
          />
          <input
            type="email"
            className="rcb__input"
            placeholder="Email"
            value={values.email}
            onChange={update("email")}
          />
          
          {/* Free-text search that must resolve to a real category. catQuery is
              what was typed; category is the committed choice. Keeping them
              separate is what lets the submit guard reject typed-but-unpicked. */}
          <div className="rcb__combo">
            <input
              type="text"
              className="rcb__input rcb__combo-input"
              placeholder="Search or select product category*"
              value={catQuery}
              autoComplete="off"
              role="combobox"
              aria-expanded={catOpen}
              aria-controls="rcb-cat-list"
              onFocus={() => setCatOpen(true)}
              onBlur={() => setCatOpen(false)}
              onChange={(event) => {
                setCatQuery(event.target.value);
                // Typing invalidates the previous pick, so the submit guard
                // cannot pass on a stale selection.
                setCategory("");
                setCatOpen(true);
              }}
              onKeyDown={(event) => {
                // The modal itself closes on Escape. While this list is open,
                // Escape should close only the list, so stop it bubbling.
                if (event.key === "Escape" && catOpen) {
                  event.stopPropagation();
                  setCatOpen(false);
                }
              }}
            />

            {catOpen && (
              <ul className="rcb__combo-list" id="rcb-cat-list" role="listbox">
                {categoryMatches.length === 0 && (
                  <li className="rcb__combo-empty">No match. Try Other / Not sure.</li>
                )}
                {categoryMatches.map((item) => (
                  <li key={item}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={category === item}
                      // mousedown fires before the input's blur. Without this
                      // the list unmounts before the click ever lands.
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => {
                        setCategory(item);
                        setCatQuery(item);
                        setCatOpen(false);
                      }}
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button type="submit" className="rcb__submit" disabled={status.state === "sending"}>
            {status.state === "sending" ? "Sending…" : "Request a Callback"}
          </button>

          {status.message && (
            <p className={`rcb__status rcb__status--${status.state}`}>{status.message}</p>
          )}
        </form>

        <p className="rcb__legal">
          By clicking you agree to our <Link href="/privacy-policy">Privacy policy,</Link>
          <br />
          <Link href="/terms">Terms of use &amp; Disclaimer</Link>
        </p>

        <p className="rcb__or">or</p>

        <ul className="rcb__contacts">
          <li>
            <span className="rcb__icon" aria-hidden="true">
              <i className="fa fa-phone" />
            </span>
            <a href={`tel:${PHONE.replace(/\s/g, "")}`}>Call: {PHONE}</a>
          </li>
          <li>
            <span className="rcb__icon" aria-hidden="true">
              <i className="fa fa-envelope" />
            </span>
            <a href={`mailto:${EMAIL}`}>Email: {EMAIL}</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
