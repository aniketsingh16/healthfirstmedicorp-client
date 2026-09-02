
// Format to INR
export function formatPrice(amount, currency = "₹") {
  return `${currency}${(amount ?? 0).toFixed(2)}`;
}