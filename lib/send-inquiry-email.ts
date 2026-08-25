import nodemailer from 'nodemailer'
import {
  buildInquiryEmailContent,
  type InquiryPayload,
} from './contact-inquiry.js'

type SendResult =
  | { ok: true }
  | { ok: false; error: 'not_configured' | 'send_failed'; message: string }

function getSmtpConfig() {
  const host = process.env.SMTP_HOST?.trim()
  const user = process.env.SMTP_USER?.trim()
  const pass = process.env.SMTP_PASS?.trim()

  if (!host || !user || !pass) {
    return null
  }

  const port = Number(process.env.SMTP_PORT ?? '587')
  const secure =
    process.env.SMTP_SECURE === 'true' || (Number.isFinite(port) && port === 465)

  return {
    host,
    port: Number.isFinite(port) ? port : 587,
    secure,
    auth: { user, pass },
  }
}

export async function sendInquiryEmail(payload: InquiryPayload): Promise<SendResult> {
  const smtp = getSmtpConfig()
  if (!smtp) {
    return {
      ok: false,
      error: 'not_configured',
      message:
        'Email is not configured. Set SMTP_HOST, SMTP_USER, and SMTP_PASS on the server.',
    }
  }

  const to =
    process.env.CONTACT_INQUIRY_TO?.trim() || 'info@tejaswiniindustries.com'
  const from =
    process.env.SMTP_FROM?.trim() || process.env.SMTP_USER?.trim() || to
  const { subject, text, html } = buildInquiryEmailContent(payload)

  const transporter = nodemailer.createTransport(smtp)

  try {
    await transporter.sendMail({
      from,
      to,
      replyTo: payload.email,
      subject,
      text,
      html,
    })
    return { ok: true }
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to send inquiry email.'
    console.error('[contact-inquiry] send failed:', message)
    return { ok: false, error: 'send_failed', message }
  }
}
