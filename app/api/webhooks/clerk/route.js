import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { sendWelcomeEmail } from '@/lib/email';

export async function POST(request) {
  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

  if (!webhookSecret) {
    return NextResponse.json({ error: 'Missing webhook secret' }, { status: 500 });
  }

  const payload = await request.text();
  const headerPayload = await headers();

  const svixId = headerPayload.get('svix-id');
  const svixTimestamp = headerPayload.get('svix-timestamp');
  const svixSignature = headerPayload.get('svix-signature');

  if (!svixId || !svixTimestamp || !svixSignature) {
    return NextResponse.json({ error: 'Missing svix headers' }, { status: 400 });
  }

  const wh = new Webhook(webhookSecret);
  let event;

  try {
    event = wh.verify(payload, {
      'svix-id': svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature,
    });
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'user.created' || event.type === 'user.updated') {
    const {
      id,
      first_name,
      last_name,
      email_addresses,
      primary_email_address_id,
    } = event.data;

    // email_addresses[0] is not guaranteed to be the primary one — a user can
    // add a second address and promote it. Match on the primary id, and only
    // fall back to the first entry if that lookup finds nothing.
    const primaryEmail =
      email_addresses?.find((e) => e.id === primary_email_address_id)
        ?.email_address ??
      email_addresses?.[0]?.email_address ??
      null;

    try {
      // Check existence first instead of relying on ON CONFLICT, so the
      // customers.id sequence is only advanced on a genuine new row.
      const [existing] = await sql`
        SELECT customer_id, email FROM customers WHERE clerk_id = ${id}
      `;

      if (existing) {
        await sql`
          UPDATE customers
          SET first_name = ${first_name},
              last_name = ${last_name},
              email = ${primaryEmail}
          WHERE clerk_id = ${id}
        `;
        console.log("✅ User updated successfully");
      } else {
        await sql`
          INSERT INTO customers (clerk_id, first_name, last_name, email)
          VALUES (${id}, ${first_name}, ${last_name}, ${primaryEmail})
        `;
        console.log("✅ User inserted successfully");
      }

      // Welcome on a genuinely new customer, under either definition of "new":
      // a brand-new Clerk account (user.created), or a clerk_id we have never
      // seen before. The second case matters because user.updated can be the
      // first event we actually receive, depending on which events the Clerk
      // instance is subscribed to. gainedEmail covers an email-less account
      // that just picked up an address - nothing to send before that.
      const isNewClerkUser = event.type === 'user.created';
      const isNewRow = !existing;
      const gainedEmail = Boolean(existing && !existing.email && primaryEmail);
      const shouldSendWelcome =
        Boolean(primaryEmail) && (isNewClerkUser || isNewRow || gainedEmail);

      if (shouldSendWelcome) {
        try {
          await sendWelcomeEmail({
            to: primaryEmail,
            firstName: first_name,
          });
          console.log("✅ Welcome email sent");
        } catch (mailError) {
          // Do not fail the webhook. A 500 would make Svix retry, but the
          // customer row already exists either way.
          console.error('Welcome email failed:', mailError);
        }
      } else {
        console.log(
          `↩️ Welcome skipped - event=${event.type}, hasEmail=${Boolean(primaryEmail)}, newRow=${isNewRow}`
        );
      }
    } catch (dbError) {
      console.error('DB upsert failed:', dbError);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
