"use client";

import { openChat } from "./openChat";

/**
 * Header "Ask AI" trigger.
 *
 * Its own client component because NavigationPrimary is a server component —
 * marking that file "use client" would pull ModuleHeaderCategories and
 * ModuleHeaderSupplies across the boundary with it.
 */
export default function AskAiButton() {
    return (
        <button type="button" className="ps-btn--ask-ai" onClick={openChat}>
            {/*
              A masked span rather than <img>: an <img> paints the SVG's own
              baked-in colours and cannot inherit the button's, so it would not
              follow the text on hover. The mask uses the file as a stencil and
              fills it with currentColor instead.
            */}
            <span className="ps-btn--ask-ai__icon" aria-hidden="true" />
            Ask AI
        </button>
        
    );
}
