/**
 * Format a price amount with currency symbol
 * @param amount - The price amount (can be null/undefined)
 * @param currency - Currency symbol (default: "£")
 * @returns Formatted price string (e.g., "£599.99")
 */

export function formatPrice(amount) {
  const numericAmount = Number(amount);

  if (amount === null || amount === undefined || Number.isNaN(numericAmount)) {
    return "0.00";
  }

  return new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numericAmount);
}

const DATE_FORMAT_OPTIONS = {
  short: { day: "numeric", month: "short" },
  long: { day: "numeric", month: "long", year: "numeric" },
  datetime: {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  },
};

/**
 * Format a date string with locale-specific formatting
 * @param date - ISO date string (can be null/undefined)
 * @param format - "short" (5 Jan), "long" (5 January 2025), "datetime" (5 January 2025, 14:30)
 * @param fallback - Fallback text when date is null/undefined
 * @returns Formatted date string
 */
export function formatDate(date, format = "long", fallback = "Date unknown") {
  if (!date) return fallback;
  return new Date(date).toLocaleDateString("en-IN", DATE_FORMAT_OPTIONS[format]);
}

/**
 * Format an order number for display (shows only the last segment after the last hyphen)
 * @param orderNumber - Full order number (e.g., "ORD-2024-ABC123")
 * @returns Shortened order number (e.g., "ABC123") or "N/A" if null
 */
export function formatOrderNumber(orderNumber) {
  if (!orderNumber) return "N/A";
  return orderNumber.split("-").pop() ?? orderNumber;
}



// middleware.js (at your project root, same level as app/)
// import { clerkMiddleware } from '@clerk/nextjs/server';

// export default clerkMiddleware();

// export const config = {
//   matcher: [
//     '/((?!_next|[^?]*\\.(?:html?|css|js|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
//     '/(api|trpc)(.*)',
//   ],
// };