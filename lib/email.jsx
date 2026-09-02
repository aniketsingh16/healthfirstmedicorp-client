import { Resend } from "resend";
import { render } from "@react-email/render";
import WelcomeEmail from "@/lib/emails/WelcomeEmail";

const resend = new Resend(process.env.RESEND_API_KEY);
const LOGO_URL ="https://cdn.sanity.io/images/27p517bf/production/fcd2009306b35b4eba8fa9d6cc3daf2a7e20a022-700x250.png"

// Must be a domain verified in Resend.
const FROM =
    process.env.RESEND_FROM ||
    "Healthfirst Medicorp <onboarding@healthfirstmedicorp.shop>";

export async function sendWelcomeEmail({ to, firstName }) {
    if (!to) throw new Error("sendWelcomeEmail: no recipient");

    // render() returns a Promise — without await the body sends as
    // "[object Promise]".
    const html = await render(<WelcomeEmail firstName={firstName} logoSrc={LOGO_URL} />);

    const { data, error } = await resend.emails.send({
        from: FROM,
        to,
        subject: "Welcome to Healthfirst Medicorp",
        html,
    });

    if (error) throw new Error(error.message ?? "Resend rejected the message");
    return data;
}
