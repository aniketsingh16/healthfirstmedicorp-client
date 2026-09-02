// ARCHIVED — this is the original app/api/checkout/route.js as it was before
// the rewrite. Kept for reference only. Next's App Router only treats a file
// named `route.js` as an endpoint, so nothing here is served.

import { auth } from "@clerk/nextjs/server";
import { sql } from "@/lib/db";

export async function POST(req) {
    try {
        const { userId: clerkId } = await auth(); // from Clerk session, NOT from request body
        if (!clerkId) {
            return Response.json({ error: "Not signed in" }, { status: 401 });
        }

        const body = await req.json();
        const { address } = body;

        // 1. Find or create the customer row tied to this Clerk session
        let [customer] = await sql`
            SELECT customer_id FROM customers WHERE clerk_id = ${clerkId}
        `;

        if (!customer) {
                [customer] = await sql`
                    INSERT INTO customers (clerk_id, first_name, last_name, email, contact_number)
                    VALUES (${clerkId}, ${address.firstName}, ${address.lastName}, ${address.email}, ${address.mobile})
                    RETURNING customer_id
                `;
            }

        const customerId = customer.customer_id;

        // 2. Insert the address, linked to that customer — only if they checked "save address"
        let addressId = null;
        if (address.saveAddress) {
        [{ address_id: addressId }] = await sql`
            INSERT INTO addresses (
                customer_id,
                first_name,
                last_name,
                contact_number,
                company_name,
                address_line1,
                address_line2,
                pincode,
                city,
                state
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
    }
        // 3. Order creation not handled yet — return what we have so far
        return Response.json({ success: true, customerId, addressId });

    } catch (err) {
        console.error("Checkout address save failed:", err);
        return Response.json({ error: "Failed to save address" }, { status: 500 });
    }
}
