/**
 * Opens the Ask AI modal.
 *
 * Uses a window event rather than React context on purpose: the trigger is a
 * menu item rendered deep inside server components, while the modal is mounted
 * in MasterLayout. A provider would have to wrap both, which means restructuring
 * the layout. An event costs nothing and works regardless of tree position.
 */
export const OPEN_CHAT_EVENT = "hfmc:open-chat";

export function openChat() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(OPEN_CHAT_EVENT));
}
