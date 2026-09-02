/**
 * The "from" block on every invoice.
 *
 * Read from env so the GSTIN and address are not baked into the repo, with
 * placeholders that are obviously placeholders — an invoice that silently ships
 * with someone else's GSTIN is worse than one that visibly says TODO.
 *
 * Add to .env.local:
 *   INVOICE_SELLER_NAME="Healthfirst Medicorp"
 *   INVOICE_SELLER_ADDRESS="123 Business Street, Mumbai, India"
 *   INVOICE_SELLER_EMAIL="billing@healthfirstmedicorp.com"
 *   INVOICE_SELLER_PHONE="+91 90000 00000"
 *   INVOICE_SELLER_GSTIN="27AAAAA0000A1Z5"
 */
export function getSeller() {
  return {
    name: process.env.INVOICE_SELLER_NAME || "Healthfirst Medicorp",
    address: process.env.INVOICE_SELLER_ADDRESS || "[SET INVOICE_SELLER_ADDRESS]",
    email: process.env.INVOICE_SELLER_EMAIL || "[SET INVOICE_SELLER_EMAIL]",
    phone: process.env.INVOICE_SELLER_PHONE || "[SET INVOICE_SELLER_PHONE]",
    gstin: process.env.INVOICE_SELLER_GSTIN || "[SET INVOICE_SELLER_GSTIN]",
  };
}

/**
 * The footer block: bank details, terms, and the authorised signatory.
 *
 * These print on every invoice you already send, so they are not secrets — but
 * they are env-overridable so a staging deploy cannot quote the live account.
 * Drop the signature and UPI QR into /public/static/img/ and point the two
 * *_IMAGE vars at them; until then the footer renders labelled placeholders.
 */
export function getBankDetails() {
  return {
    bankName: process.env.INVOICE_BANK_NAME || "UNION BANK OF INDIA, WARJE MALVADI",
    accountNumber: process.env.INVOICE_BANK_ACCOUNT || "608901010050207",
    ifsc: process.env.INVOICE_BANK_IFSC || "UBIN0560898",
    accountHolder: process.env.INVOICE_BANK_HOLDER || "HEALTHFIRST MEDICORP",
    upiQrImage: process.env.INVOICE_UPI_QR_IMAGE || null,
  };
}

export function getSignatory() {
  return {
    company: process.env.INVOICE_SELLER_NAME || "HEALTHFIRST MEDICORP",
    name: process.env.INVOICE_SIGNATORY_NAME || "Ravindra Pal Singh",
    signatureImage: process.env.INVOICE_SIGNATURE_IMAGE || null,
    // Mirrors the Adobe-style stamp on the existing PDFs. Rendered from the
    // invoice's own timestamp so it cannot claim a date the document does not have.
    digitallySigned: process.env.INVOICE_DIGITAL_SIGNATURE !== "false",
  };
}

export const INVOICE_TERMS =
  process.env.INVOICE_TERMS || "Thanks for doing business with us!";

export const PAYMENT_TERMS = [
  { value: "Due on receipt", days: 0 },
  { value: "Net 7", days: 7 },
  { value: "Net 15", days: 15 },
  { value: "Net 30", days: 30 },
  { value: "Net 45", days: 45 },
];

/** Due date implied by a payment term, so the two fields cannot drift apart. */
export function dueDateFor(issueDate, terms) {
  const match = PAYMENT_TERMS.find((t) => t.value === terms);
  if (!match) return null;
  const due = new Date(issueDate);
  due.setDate(due.getDate() + match.days);
  return due.toISOString().slice(0, 10);
}

export const INVOICE_STATUSES = ["draft", "sent", "paid", "overdue", "cancelled"];

export const INVOICE_STATUS_LABEL = {
  draft: "Draft",
  sent: "Sent",
  paid: "Paid",
  overdue: "Overdue",
  cancelled: "Cancelled",
};

export const INVOICE_STATUS_INTENT = {
  draft: "default",
  sent: "info",
  paid: "success",
  overdue: "error",
  cancelled: "default",
};

/**
 * Single source of truth for invoice arithmetic — used by the create form's
 * live preview AND by the server before insert, so what the user saw is what
 * gets stored. Tax is per line then summed, never applied to the subtotal.
 */
export function computeTotals(items) {
  let subtotal = 0;
  let taxTotal = 0;

  const lines = items.map((item) => {
    const quantity = Number(item.quantity) || 0;
    const rate = Number(item.rate) || 0;
    const taxRate = Number(item.taxRate) || 0;

    const taxableValue = round2(quantity * rate);
    const taxAmount = round2(taxableValue * (taxRate / 100));

    subtotal += taxableValue;
    taxTotal += taxAmount;

    return {
      ...item,
      quantity,
      rate,
      taxRate,
      taxableValue,
      taxAmount,
      lineTotal: round2(taxableValue + taxAmount),
    };
  });

  subtotal = round2(subtotal);
  taxTotal = round2(taxTotal);

  return { lines, subtotal, taxTotal, total: round2(subtotal + taxTotal) };
}

// Money is NUMERIC in Postgres; keep JS from introducing float drift before it
// gets there. Half-up, which is what an Indian invoice is expected to use.
function round2(n) {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}
