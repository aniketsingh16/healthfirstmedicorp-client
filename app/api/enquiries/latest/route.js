import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

/**
 * GET /api/enquiries/latest
 *
 * Lightweight polling endpoint for the healthfirstmedicorp-notifications
 * Android app. Returns ONLY the most recent row of `contact_submissions`
 * (the table that POST /api/contact writes to) so the app can compare the
 * id against the last one it saw and fire a local notification.
 *
 * Auth: open by default. If you set ENQUIRY_ALERT_API_KEY in the server
 * environment, the endpoint starts requiring that value in either the
 * `x-api-key` header or an `Authorization: Bearer <key>` header. Set the
 * same value as API_KEY in the mobile app's config.ts and nothing else
 * needs to change.
 */

// Never cache — the app polls this and must always see fresh data.
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(req) {
  // ---- optional shared-secret auth -------------------------------------
  const expectedKey = process.env.ENQUIRY_ALERT_API_KEY;

  if (expectedKey) {
    const headerKey = req.headers.get('x-api-key');
    const bearer = req.headers.get('authorization')?.replace(/^Bearer\s+/i, '');
    const providedKey = headerKey || bearer;

    if (providedKey !== expectedKey) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  // ---- fetch the newest enquiry ----------------------------------------
  try {
    const rows = await sql`
      SELECT id, name, email, phone, enquiry, created_at
      FROM contact_submissions
      ORDER BY id DESC
      LIMIT 1
    `;

    // No enquiries in the table yet — still a success, just nothing to show.
    if (rows.length === 0) {
      return NextResponse.json(
        { latest: null, serverTime: new Date().toISOString() },
        { status: 200, headers: { 'Cache-Control': 'no-store' } }
      );
    }

    const row = rows[0];

    return NextResponse.json(
      {
        latest: {
          id: row.id,
          name: row.name,
          email: row.email,
          phone: row.phone,
          // Trim the message so the polling payload stays tiny.
          enquiry:
            typeof row.enquiry === 'string' && row.enquiry.length > 160
              ? `${row.enquiry.slice(0, 160)}…`
              : row.enquiry,
          created_at: row.created_at,
        },
        serverTime: new Date().toISOString(),
      },
      { status: 200, headers: { 'Cache-Control': 'no-store' } }
    );
  } catch (err) {
    console.error('GET /api/enquiries/latest failed:', err);
    return NextResponse.json({ error: 'Failed to load latest enquiry' }, { status: 500 });
  }
}
