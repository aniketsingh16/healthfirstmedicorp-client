import { sql } from "@/lib/db";
import { computeTotals, getSeller } from "./seller";

/**
 * @param {{ search?: string, status?: string, customerId?: string, from?: string, to?: string, limit?: number }} opts
 */
export async function getInvoices({
  search = "",
  status = "all",
  customerId = "",
  from = "",
  to = "",
  limit = 50,
} = {}) {
  const searchTerm = search.trim() === "" ? null : `%${search.trim()}%`;
  const statusFilter = status === "all" ? null : status;
  const customerFilter = customerId === "" ? null : Number(customerId);
  const fromDate = from === "" ? null : from;
  const toDate = to === "" ? null : to;

  const rows = await sql`
    SELECT
      i.invoice_id,
      i.invoice_number,
      i.status,
      i.issue_date,
      i.due_date,
      i.total,
      i.currency,
      i.bill_to,
      i.customer_id
    FROM invoices i
    WHERE (${searchTerm}::text IS NULL OR i.invoice_number ILIKE ${searchTerm})
      AND (${statusFilter}::text IS NULL OR i.status = ${statusFilter})
      AND (${customerFilter}::bigint IS NULL OR i.customer_id = ${customerFilter})
      AND (${fromDate}::date IS NULL OR i.issue_date >= ${fromDate}::date)
      AND (${toDate}::date IS NULL OR i.issue_date <= ${toDate}::date)
    ORDER BY i.issue_date DESC, i.invoice_id DESC
    LIMIT ${limit}
  `;

  return rows.map(mapInvoiceRow);
}

/** Total / Paid / Pending tiles above the list. */
export async function getInvoiceKpis() {
  const [row] = await sql`
    SELECT
      COALESCE(SUM(total) FILTER (WHERE status <> 'cancelled'), 0) AS total_value,
      COUNT(*)             FILTER (WHERE status <> 'cancelled')    AS total_count,
      COALESCE(SUM(total) FILTER (WHERE status = 'paid'), 0)       AS paid_value,
      COUNT(*)             FILTER (WHERE status = 'paid')          AS paid_count,
      COALESCE(SUM(total) FILTER (WHERE status IN ('draft','sent','overdue')), 0) AS pending_value,
      COUNT(*)             FILTER (WHERE status IN ('draft','sent','overdue'))    AS pending_count
    FROM invoices
  `;

  return {
    totalValue: Number(row.total_value),
    totalCount: Number(row.total_count),
    paidValue: Number(row.paid_value),
    paidCount: Number(row.paid_count),
    pendingValue: Number(row.pending_value),
    pendingCount: Number(row.pending_count),
  };
}

export async function getInvoice(invoiceId) {
  const [invoice] = await sql`
    SELECT * FROM invoices WHERE invoice_id = ${invoiceId}
  `;
  if (!invoice) return null;

  const items = await sql`
    SELECT *
    FROM invoice_items
    WHERE invoice_id = ${invoiceId}
    ORDER BY position ASC, invoice_item_id ASC
  `;

  return {
    ...mapInvoiceRow(invoice),
    seller: invoice.seller,
    notes: invoice.notes,
    paymentTerms: invoice.payment_terms,
    placeOfSupply: invoice.place_of_supply,
    subtotal: Number(invoice.subtotal),
    taxTotal: Number(invoice.tax_total),
    sentAt: invoice.sent_at,
    paidAt: invoice.paid_at,
    orderId: invoice.order_id ? Number(invoice.order_id) : null,
    items: items.map((item) => ({
      id: Number(item.invoice_item_id),
      productId: item.product_id,
      hsnCode: item.hsn_code,
      name: item.name,
      description: item.description,
      quantity: Number(item.quantity),
      unit: item.unit,
      rate: Number(item.rate),
      taxRate: Number(item.tax_rate),
      taxableValue: Number(item.taxable_value),
      taxAmount: Number(item.tax_amount),
      lineTotal: Number(item.line_total),
    })),
  };
}

/** Customer picker on the create form. */
export async function getCustomerOptions() {
  const rows = await sql`
    SELECT
      c.customer_id,
      c.first_name,
      c.last_name,
      c.email,
      c.mobile,
      a.address_line1, a.address_line2, a.city, a.state, a.pincode
    FROM customers c
    LEFT JOIN LATERAL (
      SELECT address_line1, address_line2, city, state, pincode
      FROM addresses
      WHERE customer_id = c.customer_id
      ORDER BY is_default DESC, created_at DESC
      LIMIT 1
    ) a ON true
    ORDER BY c.first_name NULLS LAST, c.last_name NULLS LAST
  `;

  return rows.map((r) => ({
    customerId: Number(r.customer_id),
    name: [r.first_name, r.last_name].filter(Boolean).join(" ") || r.email || "—",
    email: r.email,
    phone: r.mobile,
    address: [r.address_line1, r.address_line2, r.city, r.state, r.pincode]
      .filter(Boolean)
      .join(", "),
  }));
}

/**
 * Creates an invoice and its lines in one transaction, allocating the number
 * inside it so a failed insert cannot burn a number and leave a hole.
 *
 * Totals are recomputed here rather than trusted from the client — the browser
 * can be edited, and this is a financial record.
 */
export async function createInvoice({
  customerId,
  billTo,
  items,
  issueDate,
  dueDate,
  paymentTerms,
  notes,
  placeOfSupply,
  status = "draft",
  orderId = null,
}) {
  const { lines, subtotal, taxTotal, total } = computeTotals(items);
  const year = new Date(issueDate).getFullYear();
  const seller = getSeller();

  // The CTE makes numbering + insert a single atomic statement, so no explicit
  // transaction is needed here and a failed insert cannot burn a number.
  const insertedRows = await sql`
    WITH allocated AS (
      SELECT next_invoice_number(${year}::int) AS number
    )
    INSERT INTO invoices (
      invoice_number, year, customer_id, order_id, bill_to, seller, status,
      issue_date, due_date, payment_terms, subtotal, tax_total, total,
      place_of_supply, notes
    )
    SELECT
      allocated.number, ${year}, ${customerId}, ${orderId},
      ${JSON.stringify(billTo)}::jsonb, ${JSON.stringify(seller)}::jsonb, ${status},
      ${issueDate}::date, ${dueDate}::date, ${paymentTerms},
      ${subtotal}, ${taxTotal}, ${total},
      ${placeOfSupply}, ${notes}
    FROM allocated
    RETURNING invoice_id, invoice_number
  `;

  const { invoice_id, invoice_number } = insertedRows[0];

  if (lines.length > 0) {
    // Array form is the documented neon transaction API — all lines land or none do.
    await sql.transaction(
      lines.map(
        (line, index) => sql`
          INSERT INTO invoice_items (
            invoice_id, position, product_id, hsn_code, name, description,
            quantity, unit, rate, tax_rate, taxable_value, tax_amount, line_total
          ) VALUES (
            ${invoice_id}, ${index},
            ${line.productId || null}, ${line.hsnCode || null},
            ${line.name}, ${line.description || null},
            ${line.quantity}, ${line.unit || "pcs"}, ${line.rate}, ${line.taxRate},
            ${line.taxableValue}, ${line.taxAmount}, ${line.lineTotal}
          )
        `,
      ),
    );
  }

  return { invoiceId: Number(invoice_id), invoiceNumber: invoice_number };
}

export async function markInvoiceSent(invoiceId) {
  await sql`
    UPDATE invoices
       SET status = CASE WHEN status = 'draft' THEN 'sent' ELSE status END,
           sent_at = now()
     WHERE invoice_id = ${invoiceId}
  `;
}

export async function setInvoiceStatus(invoiceId, status) {
  await sql`
    UPDATE invoices
       SET status = ${status},
           paid_at = CASE WHEN ${status} = 'paid' THEN now() ELSE paid_at END
     WHERE invoice_id = ${invoiceId}
  `;
}

function mapInvoiceRow(row) {
  return {
    invoiceId: Number(row.invoice_id),
    invoiceNumber: row.invoice_number,
    status: row.status,
    issueDate: row.issue_date,
    dueDate: row.due_date,
    total: Number(row.total),
    currency: row.currency,
    billTo: row.bill_to,
    customerId: row.customer_id ? Number(row.customer_id) : null,
  };
}
