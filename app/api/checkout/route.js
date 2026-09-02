import { auth } from "@clerk/nextjs/server";
import { sql } from "@/lib/db";
import { client } from "@/sanity/lib/client";

// Delivery pricing lives on the server. The client renders the same options,
// but what the client says a delivery costs is not what we charge.
const DELIVERY_FEES = {
    standard: 0,
    express: 99,
    sameday: 199,
};

const PAYMENT_METHODS = ["card", "upi", "cod"];

const TAX_RATE = 0.05;

const MAX_QTY_PER_LINE = 99;

// `allProducts` is the live Sanity document type; `id` is its own string
// field (not Sanity's `_id`), which is what the cart stores.
const PRODUCTS_BY_IDS = `*[_type == "allProducts" && productID  in $ids]{
  productID,
  name,
  sellingPrice,
  stock
}`;

const money = (n) => Math.round(n * 100) / 100;

/**
 * Validates the address the buyer typed. Never trust the client-side
 * `isAddressValid` check — that only stops honest mistakes.
 */
function validateAddress(address) {
    if (!address || typeof address !== "object") return "Address is missing";

    const required = [
        ["firstName", "First name"],
        ["lastName", "Last name"],
        ["email", "Email"],
        ["mobile", "Mobile number"],
        ["addressLine1", "Address"],
        ["city", "City"],
        ["state", "State"],
    ];

    for (const [field, label] of required) {
        if (!address[field] || String(address[field]).trim() === "") {
            return `${label} is required`;
        }
    }

    if (!/^\S+@\S+\.\S+$/.test(address.email)) return "Email is not valid";
    if (!/^\d{6}$/.test(String(address.pincode || ""))) return "Pincode must be 6 digits";
    if (!/^\d{10}$/.test(String(address.mobile).replace(/\D/g, "").slice(-10))) {
        return "Mobile number is not valid";
    }

    return null;
}

export async function POST(req) {
    try {
        // Identity comes from the Clerk session, never from the request body —
        // otherwise anyone could place an order as anyone else.
        const { userId: clerkId } = await auth();
        if (!clerkId) {
            return Response.json({ error: "Not signed in" }, { status: 401 });
        }

        const body = await req.json();
        const { address, cartItems, deliveryMethod, paymentMethod } = body;

        // ----------------------------------------------------------------
        // 1. Validate the request
        // ----------------------------------------------------------------
        const addressError = validateAddress(address);
        if (addressError) {
            return Response.json({ error: addressError }, { status: 400 });
        }

        if (!Array.isArray(cartItems) || cartItems.length === 0) {
            return Response.json({ error: "Your cart is empty" }, { status: 400 });
        }

        if (!(deliveryMethod in DELIVERY_FEES)) {
            return Response.json({ error: "Invalid delivery method" }, { status: 400 });
        }

        if (!PAYMENT_METHODS.includes(paymentMethod)) {
            return Response.json({ error: "Invalid payment method" }, { status: 400 });
        }

        // Collapse duplicate ids and coerce quantities, so a malformed cart
        // can't create two lines for the same product or a negative quantity.
        const requested = new Map();
        for (const line of cartItems) {
            const id = String(line?.productID ?? "").trim();
            const qty = Number.parseInt(line?.quantity ?? 1, 10);

            if (!id) {
                return Response.json(
                    { error: "Cart contains an invalid item" },
                    { status: 400 }
                );
            }
            if (!Number.isInteger(qty) || qty < 1 || qty > MAX_QTY_PER_LINE) {
                return Response.json(
                    {
                        error: `Quantity for each item must be between 1 and ${MAX_QTY_PER_LINE}`,
                    },
                    { status: 400 }
                );
            }
            requested.set(id, (requested.get(id) ?? 0) + qty);
        }

        // ----------------------------------------------------------------
        // 2. Re-price the cart from Sanity — the client's prices are display
        //    values only. Pricing an order from the request body is how you
        //    end up selling a ₹40,000 item for ₹1.
        // ----------------------------------------------------------------
        const ids = [...requested.keys()];
        const products = await client
            .withConfig({ useCdn: false }) // CDN can be minutes stale; pricing can't be
            .fetch(PRODUCTS_BY_IDS, { ids });

        const byId = new Map(products.map((p) => [p.productID, p]));


        const missing = ids.filter((id) => !byId.has(id));
        if (missing.length > 0) {
            return Response.json(
                {
                    error: "Some items are no longer available. Please review your cart.",
                    missing,
                },
                { status: 409 }
            );
        }

        const lines = [];
        const outOfStock = [];

        for (const [id, quantity] of requested) {
            const product = byId.get(id);
            const price = Number(product.sellingPrice);

            if (!Number.isFinite(price) || price < 0) {
                return Response.json(
                    { error: `"${product.name}" is not priced correctly. Please contact us.` },
                    { status: 409 }
                );
            }

            // `stock` may be undefined on older documents — only block when we
            // actually know the stock level and it is short.
            if (typeof product.stock === "number" && product.stock < quantity) {
                outOfStock.push({
                    id,
                    name: product.name,
                    available: product.stock,
                    requested: quantity,
                });
                continue;
            }

            lines.push({
                productId: id,
                productName: product.name,
                unitPrice: money(price),
                quantity,
                lineTotal: money(price * quantity),
            });
        }

        if (outOfStock.length > 0) {
            return Response.json(
                { error: "Some items are out of stock", outOfStock },
                { status: 409 }
            );
        }

        // ----------------------------------------------------------------
        // 3. Compute the totals server-side
        // ----------------------------------------------------------------
        const subtotal = money(lines.reduce((sum, l) => sum + l.lineTotal, 0));
        const shippingFee = money(DELIVERY_FEES[deliveryMethod]);
        const tax = money(subtotal * TAX_RATE);
        const total = money(subtotal + shippingFee + tax);

        // ----------------------------------------------------------------
        // 4. Upsert the customer tied to this Clerk session.
        //    ON CONFLICT rather than SELECT-then-INSERT: two tabs checking
        //    out at once would otherwise both see "no customer" and race.
        //    COALESCE keeps existing values when a field arrives empty.
        // ----------------------------------------------------------------
        const [customer] = await sql`
            INSERT INTO customers (clerk_id, first_name, last_name, email, mobile)
            VALUES (
                ${clerkId},
                ${address.firstName},
                ${address.lastName},
                ${address.email},
                ${address.mobile}
            )
            ON CONFLICT (clerk_id) DO UPDATE SET
                first_name = COALESCE(NULLIF(EXCLUDED.first_name, ''), customers.first_name),
                last_name  = COALESCE(NULLIF(EXCLUDED.last_name,  ''), customers.last_name),
                email      = COALESCE(NULLIF(EXCLUDED.email,      ''), customers.email),
                mobile     = COALESCE(NULLIF(EXCLUDED.mobile,     ''), customers.mobile),
                updated_at = now()
            RETURNING customer_id
        `;

        const customerId = customer.customer_id;

        // ----------------------------------------------------------------
        // 5. Save the address to the address book only if they asked us to.
        //    The order keeps its own frozen copy either way (step 6).
        // ----------------------------------------------------------------
        let addressId = null;
        if (address.saveAddress) {
            const [saved] = await sql`
                INSERT INTO addresses (
                    customer_id, first_name, last_name, contact_number, company_name,
                    address_line1, address_line2, pincode, city, state
                )
                VALUES (
                    ${customerId},
                    ${address.firstName},
                    ${address.lastName},
                    ${address.mobile},
                    ${address.companyName || null},
                    ${address.addressLine1},
                    ${address.addressLine2 || null},
                    ${address.pincode},
                    ${address.city},
                    ${address.state}
                )
                RETURNING address_id
            `;
            addressId = saved.address_id;
        }

        // Frozen shipping address stored on the order itself.
        const shippingAddress = {
            firstName: address.firstName,
            lastName: address.lastName,
            email: address.email,
            mobile: address.mobile,
            companyName: address.companyName || null,
            addressLine1: address.addressLine1,
            addressLine2: address.addressLine2 || null,
            pincode: address.pincode,
            city: address.city,
            state: address.state,
            country: "India",
        };

        // ----------------------------------------------------------------
        // 6. Write order + line items + payment as ONE statement.
        //
        //    The Neon HTTP driver has no interactive transaction, so this
        //    uses data-modifying CTEs: Postgres runs a single statement
        //    atomically, which means we can never end up with an order that
        //    has no line items. UNNEST turns the JS arrays into rows.
        // ----------------------------------------------------------------
        const [order] = await sql`
            WITH new_order AS (
                INSERT INTO orders (
                    customer_id, address_id, shipping_address,
                    delivery_method, payment_method,
                    subtotal, shipping_fee, tax, total, currency,
                    status, payment_status
                )
                VALUES (
                    ${customerId},
                    ${addressId},
                    ${JSON.stringify(shippingAddress)}::jsonb,
                    ${deliveryMethod},
                    ${paymentMethod},
                    ${subtotal},
                    ${shippingFee},
                    ${tax},
                    ${total},
                    'INR',
                    'pending',
                    'unpaid'
                )
                RETURNING order_id, order_number, created_at
            ),
            new_items AS (
                INSERT INTO order_items (
                    order_id, product_id, product_name, unit_price, quantity, line_total
                )
                SELECT o.order_id, t.product_id, t.product_name,
                       t.unit_price, t.quantity, t.line_total
                FROM new_order o
                CROSS JOIN UNNEST(
                    ${lines.map((l) => l.productId)}::text[],
                    ${lines.map((l) => l.productName)}::text[],
                    ${lines.map((l) => l.unitPrice)}::numeric[],
                    ${lines.map((l) => l.quantity)}::int[],
                    ${lines.map((l) => l.lineTotal)}::numeric[]
                ) AS t(product_id, product_name, unit_price, quantity, line_total)
                RETURNING 1
            ),
            new_payment AS (
                INSERT INTO payments (order_id, provider, method, amount, currency, status)
                SELECT o.order_id,
                       ${paymentMethod === "cod" ? "cod" : "manual"},
                       ${paymentMethod},
                       ${total},
                       'INR',
                       'pending'
                FROM new_order o
                RETURNING 1
            )
            SELECT order_id, order_number, created_at FROM new_order
        `;

        return Response.json({
            success: true,
            orderId: order.order_id,
            orderNumber: order.order_number,
            total,
            itemCount: lines.reduce((sum, l) => sum + l.quantity, 0),
        });
    } catch (err) {
        // Log the detail server-side; return something generic to the buyer.
        console.error("Checkout failed:", err);
        return Response.json(
            { error: "We couldn't place your order. Please try again." },
            { status: 500 }
        );
    }
}
