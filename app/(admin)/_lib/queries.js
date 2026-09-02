import { sql } from "@/lib/db";

/**
 * Admin-only reads against Neon. Nothing here writes.
 *
 * Revenue convention: cancelled and refunded orders are excluded everywhere.
 * `orders.total` on its own would count money that was never kept, which makes
 * the dashboard disagree with the bank. Change REVENUE_STATUSES in one place if
 * that convention ever changes.
 */
const REVENUE_STATUSES = ["pending", "confirmed", "packed", "shipped", "delivered"];

// ---------------------------------------------------------------- overview

export async function getOverviewKpis() {
  const [row] = await sql`
    SELECT
      COALESCE(SUM(o.total), 0)          AS revenue,
      COUNT(*)                           AS order_count,
      COALESCE(AVG(o.total), 0)          AS avg_order_value,
      COUNT(DISTINCT o.customer_id)      AS buying_customers
    FROM orders o
    WHERE o.status = ANY(${REVENUE_STATUSES})
  `;

  const [{ customer_count }] = await sql`SELECT COUNT(*) AS customer_count FROM customers`;

  return {
    revenue: Number(row.revenue),
    orderCount: Number(row.order_count),
    avgOrderValue: Number(row.avg_order_value),
    buyingCustomers: Number(row.buying_customers),
    customerCount: Number(customer_count),
  };
}

/** Daily revenue for the last N days, zero-filled so the chart has no gaps. */
export async function getRevenueSeries(days = 30) {
  const rows = await sql`
    WITH span AS (
      SELECT generate_series(
        (now() AT TIME ZONE 'Asia/Kolkata')::date - (${days - 1}::int),
        (now() AT TIME ZONE 'Asia/Kolkata')::date,
        '1 day'
      )::date AS day
    )
    SELECT
      span.day,
      COALESCE(SUM(o.total), 0) AS revenue,
      COUNT(o.order_id)         AS orders
    FROM span
    LEFT JOIN orders o
      ON (o.created_at AT TIME ZONE 'Asia/Kolkata')::date = span.day
     AND o.status = ANY(${REVENUE_STATUSES})
    GROUP BY span.day
    ORDER BY span.day
  `;

  return rows.map((r) => ({
    day: r.day,
    revenue: Number(r.revenue),
    orders: Number(r.orders),
  }));
}

/** Units sold per product. Uses idx_order_items_product. */
export async function getTopProducts(limit = 5) {
  const rows = await sql`
    SELECT
      oi.product_id,
      oi.product_name,
      SUM(oi.quantity)   AS units,
      SUM(oi.line_total) AS revenue
    FROM order_items oi
    JOIN orders o ON o.order_id = oi.order_id
    WHERE o.status = ANY(${REVENUE_STATUSES})
    GROUP BY oi.product_id, oi.product_name
    ORDER BY units DESC
    LIMIT ${limit}
  `;

  return rows.map((r) => ({
    productId: r.product_id,
    productName: r.product_name,
    units: Number(r.units),
    revenue: Number(r.revenue),
  }));
}

/** Order counts per status — drives the tab badges on the orders page. */
export async function getStatusBreakdown() {
  const rows = await sql`
    SELECT status, COUNT(*) AS count
    FROM orders
    GROUP BY status
  `;
  return Object.fromEntries(rows.map((r) => [r.status, Number(r.count)]));
}

// ------------------------------------------------------------------ orders

/**
 * @param {{ status?: string, search?: string, sort?: 'newest'|'oldest', limit?: number, offset?: number }} opts
 */
export async function getOrders({
  status = "all",
  search = "",
  sort = "newest",
  limit = 25,
  offset = 0,
} = {}) {
  const statusFilter = status === "all" ? null : status;
  const searchTerm = search.trim() === "" ? null : `%${search.trim()}%`;

  const rows = await sql`
    SELECT
      o.order_id,
      o.order_number,
      o.subtotal,
      o.shipping_fee,
      o.tax,
      o.total,
      o.currency,
      o.status,
      o.payment_status,
      o.created_at,
      c.first_name,
      c.last_name,
      c.email
    FROM orders o
    JOIN customers c ON c.customer_id = o.customer_id
    WHERE (${statusFilter}::text IS NULL OR o.status = ${statusFilter})
      AND (${searchTerm}::text IS NULL OR o.order_number ILIKE ${searchTerm})
    ORDER BY
      CASE WHEN ${sort} = 'oldest' THEN o.created_at END ASC,
      CASE WHEN ${sort} <> 'oldest' THEN o.created_at END DESC
    LIMIT ${limit} OFFSET ${offset}
  `;

  const [{ count }] = await sql`
    SELECT COUNT(*) AS count
    FROM orders o
    WHERE (${statusFilter}::text IS NULL OR o.status = ${statusFilter})
      AND (${searchTerm}::text IS NULL OR o.order_number ILIKE ${searchTerm})
  `;

  return {
    rows: rows.map((r) => ({
      orderId: Number(r.order_id),
      orderNumber: r.order_number,
      subtotal: Number(r.subtotal),
      shippingFee: Number(r.shipping_fee),
      tax: Number(r.tax),
      total: Number(r.total),
      currency: r.currency,
      status: r.status,
      paymentStatus: r.payment_status,
      createdAt: r.created_at,
      customerName: [r.first_name, r.last_name].filter(Boolean).join(" ") || "—",
      customerEmail: r.email,
    })),
    total: Number(count),
  };
}

/**
 * Line items for a page of orders, keyed by order id.
 *
 * One query for the whole page rather than one per row — the orders list shows
 * up to 50 at a time, and 50 round trips to Neon would dominate the response.
 * Uses idx_order_items_order.
 *
 * Names and prices come from order_items, not Sanity: they are snapshots taken
 * at purchase time, so a product renamed or repriced later (or deleted from the
 * catalogue entirely) still shows what was actually bought.
 *
 * @param {number[]} orderIds
 * @returns {Promise<Record<number, Array<{...}>>>}
 */
export async function getOrderItemsByOrder(orderIds) {
  if (!orderIds || orderIds.length === 0) return {};

  const rows = await sql`
    SELECT
      oi.order_id,
      oi.product_id,
      oi.product_name,
      oi.unit_price,
      oi.quantity,
      oi.line_total
    FROM order_items oi
    WHERE oi.order_id = ANY(${orderIds}::bigint[])
    ORDER BY oi.order_id, oi.line_total DESC
  `;

  const byOrder = {};
  for (const r of rows) {
    const key = Number(r.order_id);
    (byOrder[key] ??= []).push({
      productId: r.product_id,
      productName: r.product_name,
      unitPrice: Number(r.unit_price),
      quantity: Number(r.quantity),
      lineTotal: Number(r.line_total),
    });
  }
  return byOrder;
}

// --------------------------------------------------------------- customers

/**
 * Customers with aggregate order count and lifetime spend, plus their default
 * address for the Location column.
 *
 * @param {{ segment?: 'all'|'prospect'|'returning', search?: string, limit?: number, offset?: number }} opts
 */
export async function getCustomers({
  segment = "all",
  search = "",
  limit = 25,
  offset = 0,
} = {}) {
  const searchTerm = search.trim() === "" ? null : `%${search.trim()}%`;

  const rows = await sql`
    WITH stats AS (
      SELECT
        o.customer_id,
        COUNT(*)                  AS order_count,
        COALESCE(SUM(o.total), 0) AS spent
      FROM orders o
      WHERE o.status = ANY(${REVENUE_STATUSES})
      GROUP BY o.customer_id
    )
    SELECT
      c.customer_id,
      c.first_name,
      c.last_name,
      c.email,
      c.mobile,
      c.created_at,
      COALESCE(s.order_count, 0) AS order_count,
      COALESCE(s.spent, 0)       AS spent,
      a.city,
      a.state
    FROM customers c
    LEFT JOIN stats s ON s.customer_id = c.customer_id
    LEFT JOIN LATERAL (
      SELECT city, state
      FROM addresses
      WHERE customer_id = c.customer_id
      ORDER BY is_default DESC, created_at DESC
      LIMIT 1
    ) a ON true
    WHERE (${searchTerm}::text IS NULL
           OR c.email ILIKE ${searchTerm}
           OR (COALESCE(c.first_name, '') || ' ' || COALESCE(c.last_name, '')) ILIKE ${searchTerm})
      AND (
        ${segment} = 'all'
        OR (${segment} = 'prospect'  AND COALESCE(s.order_count, 0) = 0)
        OR (${segment} = 'returning' AND COALESCE(s.order_count, 0) > 1)
      )
    ORDER BY c.created_at DESC
    LIMIT ${limit} OFFSET ${offset}
  `;

  return rows.map((r) => ({
    customerId: Number(r.customer_id),
    name: [r.first_name, r.last_name].filter(Boolean).join(" ") || "—",
    email: r.email,
    mobile: r.mobile,
    createdAt: r.created_at,
    orderCount: Number(r.order_count),
    spent: Number(r.spent),
    location: [r.city, r.state].filter(Boolean).join(", ") || "—",
  }));
}

export async function getRecentOrders(limit = 6) {
  const { rows } = await getOrders({ limit });
  return rows;
}
