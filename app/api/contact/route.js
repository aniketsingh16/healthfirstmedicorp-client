import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function POST(req) {
  try {
    const { name, email, phone, enquiry } = await req.json();

    if (!name || !email || !phone || !enquiry) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const result = await sql`
      INSERT INTO contact_submissions (name, email, phone, enquiry)
      VALUES (${name}, ${email}, ${phone}, ${enquiry})
      RETURNING *
    `;

    return NextResponse.json({ submission: result[0] }, { status: 201 });
  } catch (err) {
    console.error('Neon insert failed:', err);
    return NextResponse.json({ error: 'Failed to save submission' }, { status: 500 });
  }
}