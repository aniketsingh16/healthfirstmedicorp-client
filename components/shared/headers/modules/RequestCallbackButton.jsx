"use client";

import "./request-callback-button.scss";

// The modal is mounted in MasterLayout, a different subtree from the header, so
// there is no shared parent that could hold the open state. A window event
// bridges the two without a context provider. RequestCallback listens for this
// exact name, so if you rename it, rename it in both places.
export const OPEN_CALLBACK_MODAL = "hfmc:open-callback-modal";

export default function RequestCallbackButton() {
    return (
        <button
            type="button"
            className="hfmc-callback-btn"
            aria-label="Request a call back"
            onClick={() => window.dispatchEvent(new Event(OPEN_CALLBACK_MODAL))}
        >
            <i className="icon-telephone" aria-hidden="true" />
            <span>Request a Call Back</span>
        </button>
    );
}
