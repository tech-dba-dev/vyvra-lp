import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { Resend } from 'resend';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/* ─── Env validation ─── */
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL;      // e.g. "Vyvra <noreply@vyvra.com>"
const SUPPORT_EMAIL = process.env.SUPPORT_EMAIL;               // e.g. "support@vyvra.com"
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || '')   // comma-separated, e.g. "https://lp.vyvra.com,https://vyvra.com"
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

if (!RESEND_API_KEY || !RESEND_FROM_EMAIL || !SUPPORT_EMAIL || ALLOWED_ORIGINS.length === 0) {
  console.error('Missing required env vars: RESEND_API_KEY, RESEND_FROM_EMAIL, SUPPORT_EMAIL, ALLOWED_ORIGINS');
  process.exit(1);
}

const resend = new Resend(RESEND_API_KEY);
const app = express();

/* ─── Rate limiting (in-memory, per IP) ─── */
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX = 5; // max 5 submissions per window

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

// Cleanup stale entries every 30 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap) {
    if (now > entry.resetAt) rateLimitMap.delete(ip);
  }
}, 30 * 60 * 1000);

/* ─── Middleware ─── */
app.use(express.json({ limit: '20mb' }));

/* ─── CORS for allowed origins ─── */
app.use('/api', (req, res, next) => {
  const origin = req.headers.origin;
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.sendStatus(204); return; }
  next();
});

/* ─── Contact API ─── */
app.post('/api/contact', async (req, res) => {
  const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || req.socket.remoteAddress || 'unknown';

  if (isRateLimited(ip)) {
    res.status(429).json({ error: 'Too many requests. Please try again later.' });
    return;
  }

  const { enquiryType, orderNumber, firstName, lastName, email, phone, address, message, honeypot, files } = req.body;

  // Honeypot check
  if (honeypot) {
    // Silently succeed for bots
    res.json({ success: true });
    return;
  }

  // Server-side validation
  if (!enquiryType || !firstName?.trim() || !lastName?.trim() || !email?.trim() || !message?.trim()) {
    res.status(400).json({ error: 'Missing required fields.' });
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    res.status(400).json({ error: 'Invalid email address.' });
    return;
  }

  // Validate and build attachments
  const ALLOWED_MIME = ['image/jpeg', 'image/png', 'application/pdf'];
  const MAX_FILE_SIZE = 5 * 1024 * 1024;
  const attachments: { filename: string; content: Buffer }[] = [];

  if (Array.isArray(files)) {
    for (const f of files.slice(0, 3)) {
      if (!f.name || !f.data || !ALLOWED_MIME.includes(f.type)) continue;
      const buf = Buffer.from(f.data, 'base64');
      if (buf.length > MAX_FILE_SIZE) continue;
      attachments.push({ filename: f.name, content: buf });
    }
  }

  const fullName = `${firstName.trim()} ${lastName.trim()}`;

  try {
    // 1) Email to support — full details + attachments
    await resend.emails.send({
      from: RESEND_FROM_EMAIL,
      to: [SUPPORT_EMAIL],
      replyTo: email.trim(),
      subject: `[Contact] ${enquiryType} — ${fullName}`,
      html: buildSupportEmail({
        enquiryType, orderNumber, fullName, email: email.trim(),
        phone, address, message: message.trim(),
      }),
      attachments,
    });

    // 2) Confirmation email to customer
    await resend.emails.send({
      from: RESEND_FROM_EMAIL,
      to: [email.trim()],
      subject: 'We received your message — Vyvra',
      html: buildConfirmationEmail({ firstName: firstName.trim(), enquiryType }),
    });

    res.json({ success: true });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error('Resend error:', errorMessage);
    res.status(500).json({ error: 'Failed to send email. Please try again later.' });
  }
});

/* ─── Email Templates ─── */

type SupportEmailData = {
  enquiryType: string;
  orderNumber?: string;
  fullName: string;
  email: string;
  phone?: string;
  address?: string;
  message: string;
};

function buildSupportEmail(data: SupportEmailData): string {
  const rows = [
    ['Enquiry Type', data.enquiryType],
    data.orderNumber ? ['Order Number', data.orderNumber] : null,
    ['Name', data.fullName],
    ['Email', data.email],
    data.phone ? ['Phone', data.phone] : null,
    data.address ? ['Address', data.address] : null,
  ].filter(Boolean) as [string, string][];

  const tableRows = rows
    .map(([label, value]) =>
      `<tr><td style="padding:8px 12px;font-weight:600;color:#333;white-space:nowrap;vertical-align:top;border-bottom:1px solid #eee">${escapeHtml(label)}</td><td style="padding:8px 12px;color:#555;border-bottom:1px solid #eee">${escapeHtml(value)}</td></tr>`
    )
    .join('');

  return `
    <div style="font-family:'Inter',Helvetica,Arial,sans-serif;max-width:600px;margin:0 auto;color:#333">
      <div style="padding:24px 0;border-bottom:2px solid #CF9C97">
        <h1 style="margin:0;font-size:18px;font-weight:600;color:#333">New Contact Form Submission</h1>
      </div>
      <table style="width:100%;border-collapse:collapse;margin:24px 0">${tableRows}</table>
      <div style="margin:24px 0">
        <h3 style="margin:0 0 8px;font-size:14px;font-weight:600;color:#333">Message</h3>
        <div style="padding:16px;background:#f9f7f6;border-radius:6px;white-space:pre-wrap;font-size:14px;line-height:1.6;color:#555">${escapeHtml(data.message)}</div>
      </div>
      <div style="padding:16px 0;border-top:1px solid #eee;font-size:12px;color:#999">
        Reply directly to this email to respond to the customer.
      </div>
    </div>
  `;
}

type ConfirmationEmailData = {
  firstName: string;
  enquiryType: string;
};

function buildConfirmationEmail(data: ConfirmationEmailData): string {
  return `
    <div style="font-family:'Inter',Helvetica,Arial,sans-serif;max-width:600px;margin:0 auto;color:#333">
      <div style="padding:24px 0;border-bottom:2px solid #CF9C97">
        <h1 style="margin:0;font-size:18px;font-weight:600;color:#333">VYVRA</h1>
      </div>
      <div style="padding:32px 0">
        <p style="margin:0 0 16px;font-size:15px;line-height:1.6">Hi ${escapeHtml(data.firstName)},</p>
        <p style="margin:0 0 16px;font-size:15px;line-height:1.6">Thank you for reaching out. We've received your <strong>${escapeHtml(data.enquiryType)}</strong> enquiry and our team will get back to you within <strong>24–48 hours</strong>.</p>
        <p style="margin:0 0 16px;font-size:15px;line-height:1.6">If your matter is urgent, feel free to reply directly to this email.</p>
        <p style="margin:0;font-size:15px;line-height:1.6">Best regards,<br/><strong>The Vyvra Team</strong></p>
      </div>
      <div style="padding:16px 0;border-top:1px solid #eee;font-size:12px;color:#999;text-align:center">
        &copy; Vyvra — All rights reserved.
      </div>
    </div>
  `;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* ─── Serve static frontend ─── */
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));
app.get('{*path}', (_req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

/* ─── Start ─── */
const PORT = parseInt(process.env.PORT || '3001', 10);
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
