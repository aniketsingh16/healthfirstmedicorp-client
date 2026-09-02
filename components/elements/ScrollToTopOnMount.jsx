"use client";

import { useEffect } from "react";

// Next's scroll-to-top is one-shot per navigation and gets consumed by the
// loading.jsx Suspense fallback, so the real page mounts at a stale offset.
// Module scope: popstate fires before the new page mounts, so the listener has
// to outlive any single render.
let lastNavWasPop = false;

if (typeof window !== "undefined") {
    window.addEventListener("popstate", () => {
        lastNavWasPop = true;
    });
}

export default function ScrollToTopOnMount() {
    useEffect(() => {
        // Back/forward should restore the previous position, not jump to top.
        if (lastNavWasPop) {
            lastNavWasPop = false;
            return;
        }
        // Respect deep links to an anchor.
        if (window.location.hash) return;

        window.scrollTo(0, 0);
    }, []);

    return null;
}
