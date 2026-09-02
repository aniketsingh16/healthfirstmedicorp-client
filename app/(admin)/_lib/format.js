const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const inrPrecise = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  minimumFractionDigits: 2,
});

/** Compact money for stat tiles: ₹4,12,000 */
export const money = (n) => inr.format(Number(n) || 0);

/** Exact money for tables and invoices: ₹4,12,000.00 */
export const moneyExact = (n) => inrPrecise.format(Number(n) || 0);

export const count = (n) => new Intl.NumberFormat("en-IN").format(Number(n) || 0);

/** "8 Aug 2026" */
export const dateLong = (d) =>
  new Date(d).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

/** Split date for the calendar-chip in the orders list: { month: "AUG", day: "8" } */
export const dateChip = (d) => {
  const date = new Date(d);
  return {
    month: date.toLocaleDateString("en-IN", { month: "short" }).toUpperCase(),
    day: date.toLocaleDateString("en-IN", { day: "numeric" }),
  };
};

/** Initials for the avatar fallback — we have no image column on customers. */
export const initials = (name) =>
  (name || "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("") || "?";

/**
 * Deterministic avatar colour so a given customer keeps the same one across
 * renders and pages. Hue only — saturation and lightness stay fixed so every
 * avatar carries equal visual weight in a list.
 */
export const avatarColor = (seed) => {
  let hash = 0;
  for (let i = 0; i < (seed || "").length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) % 360;
  }
  return `hsl(${hash}, 52%, 58%)`;
};

/** Maps the seven DB order statuses onto MUI palette intents. */
export const STATUS_INTENT = {
  pending: "warning",
  confirmed: "info",
  packed: "info",
  shipped: "info",
  delivered: "success",
  cancelled: "error",
  refunded: "default",
};

export const STATUS_LABEL = {
  pending: "Pending",
  confirmed: "Confirmed",
  packed: "Packed",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
  refunded: "Refunded",
};

export const ORDER_STATUSES = Object.keys(STATUS_LABEL);
