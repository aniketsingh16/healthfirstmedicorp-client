import { Resend } from 'resend';
import { render } from '@react-email/render';
import { NextResponse } from 'next/server';
import KoalaWelcomeEmail from '@/app/api/send-email/email-template';

const resend = new Resend(process.env.RESEND_API_KEY); // moved key to env — see note below

export async function POST(req) {
    try {
        const { name, email } = await req.json(); // App Router: parse body via req.json(), not req.body

        const emailContent = await render(<KoalaWelcomeEmail userFirstname={name} />); // render() returns a Promise — needs awaiting, or html gets sent as "[object Promise]"

        const { data, error } = await resend.emails.send({
            from: 'Healthfirst Medicorp <onboarding@healthfirstmedicorp.com>',
            to: email,
            subject: "Welcome to Healthfirst Medicorp",
            html: emailContent
        });

        if (error) {
            return NextResponse.json({ error }, { status: 500 }); // App Router: NextResponse.json(data, options), not res.json()
        }

        return NextResponse.json({ message: 'Email sent successfully!' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}