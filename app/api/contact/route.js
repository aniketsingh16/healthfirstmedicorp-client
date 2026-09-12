import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { sendEnquiryAlert } from '@/lib/telegram';

export async function POST(req) {
  let payload;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { name, email, phone, enquiry } = payload ?? {};

  if (!name || !email || !phone || !enquiry) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  // The row is the source of truth, so it goes first. Its own catch is what
  // stops a database failure from skipping the alert below.
  let saved = null;
  try {
    const rows = await sql`
      INSERT INTO contact_submissions (name, email, phone, enquiry)
      VALUES (${name}, ${email}, ${phone}, ${enquiry})
      RETURNING *
    `;
    saved = rows[0];
  } catch (dbError) {
    console.error('Neon insert failed:', dbError);
  }

  // Awaited on purpose. The team being notified is the point of this endpoint,
  // so we wait for it and report honestly rather than guessing.
  let alerted = false;
  try {
    await sendEnquiryAlert({ name, email, phone, enquiry, unsaved: !saved });
    alerted = true;
  } catch (alertError) {
    console.error('Telegram alert failed:', alertError);
  }

  if (saved) {
    if (!alerted) console.error(`Enquiry ${saved.id} saved but team NOT notified`);
    return NextResponse.json({ submission: saved, alerted }, { status: 201 });
  }

  if (alerted) {
    console.warn('Enquiry NOT saved to database, but Telegram alert delivered');
    return NextResponse.json({ submission: null, saved: false }, { status: 201 });
  }

  console.error('Enquiry LOST: database and Telegram both failed');
  return NextResponse.json({ error: 'Failed to save submission' }, { status: 500 });
}
