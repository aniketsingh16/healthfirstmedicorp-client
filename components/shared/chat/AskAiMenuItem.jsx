"use client";

import { openChat } from "./openChat";

/**
 * A menu entry that opens the chat widget instead of navigating.
 *
 * Rendered by Menu.jsx for any item carrying `action: "chat"`. It is a <button>
 * rather than an <a href="#">, because it performs an action rather than going
 * anywhere — that keeps keyboard and screen-reader behaviour honest. The
 * `menu-item--action` class exists so the button can be styled back to look
 * like the surrounding links.
 */
export default function AskAiMenuItem({ item }) {
    return (
        <li className="menu-item--action">
            <button type="button" onClick={openChat}>
                {item.icon && <i className={item.icon}></i>}
                {item.text}
            </button>
        </li>
    );
}
