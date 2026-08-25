import { parseInquiryPayload } from './contact-inquiry.js'
import { sendInquiryEmail } from './send-inquiry-email.js'
import { createSiteInquiryFromContact } from './save-site-inquiry.js'

export type InquiryHandlerResult =
  | { status: number; body: Record<string, unknown> }

export async function handleContactInquiry(body: unknown): Promise<InquiryHandlerResult> {
  const { payload, errors } = parseInquiryPayload(body)
  if (!payload) {
    return { status: 400, body: { error: 'Validation failed', fields: errors } }
  }

  const saveResult = await createSiteInquiryFromContact(payload)
  if (!saveResult.ok) {
    const status = saveResult.error === 'not_configured' ? 503 : 502
    return { status, body: { error: saveResult.message } }
  }

  const emailResult = await sendInquiryEmail(payload)
  if (!emailResult.ok) {
    console.warn('[contact-inquiry] email not sent:', emailResult.message)
  }

  return { status: 200, body: { ok: true, id: saveResult.id } }
}
