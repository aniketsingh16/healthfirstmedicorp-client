const API = 'https://api.telegram.org';

// Telegram's HTML parse mode needs these three escaped. The enquiry text is
// user input, so a stray "<" would otherwise break the entire message.
function escapeHtml(value) {
    return String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

async function sendMessage(text) {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
        throw new Error(
            'Telegram not configured: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is missing'
        );
    }

    const res = await fetch(`${API}/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: chatId,
            text,
            parse_mode: 'HTML',
            link_preview_options: { is_disabled: true },
        }),
        // The caller awaits this, so the ceiling here is how long a customer can
        // be left waiting on their form if Telegram hangs.
        signal: AbortSignal.timeout(5000),
    });

    const body = await res.json().catch(() => ({}));

    if (!body.ok) {
        throw new Error(
            `Telegram ${body.error_code ?? res.status}: ${body.description ?? 'unknown error'}`
        );
    }

    return body.result;
}

export async function sendEnquiryAlert({ name, email, phone, enquiry, unsaved = false }) {
    // Telegram hard-caps a message at 4096 characters. Leave room for labels.
    const message = String(enquiry ?? '').slice(0, 3500);

    const text = [
        unsaved
            ? '<b>New enquiry</b> ⚠️ <i>not saved to database, reply from this message</i>'
            : '<b>New enquiry</b>',
        '',
        `<b>Name:</b> ${escapeHtml(name)}`,
        `<b>Phone:</b> ${escapeHtml(phone)}`,
        `<b>Email:</b> ${escapeHtml(email)}`,
        '',
        escapeHtml(message),
    ].join('\n');

    return sendMessage(text);
}
