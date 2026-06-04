import { buildQuoteMessage } from './build-quote-message.js'
import { parseQuotePayload } from './parse-quote-payload.js'
import { sendInquiryEmail } from './send-inquiry-email.js'
import { createSiteInquiryFromQuote } from './save-site-inquiry.js'

import type { InquiryHandlerResult } from './handle-contact-inquiry.js'

export async function handleQuoteRequest(body: unknown): Promise<InquiryHandlerResult> {
  const { payload, errors } = parseQuotePayload(body)
  if (!payload) {
    return { status: 400, body: { error: 'Validation failed', fields: errors } }
  }

  const saveResult = await createSiteInquiryFromQuote(payload)
  if (!saveResult.ok) {
    const status = saveResult.error === 'not_configured' ? 503 : 502
    return { status, body: { error: saveResult.message } }
  }

  const emailResult = await sendInquiryEmail({
    name: payload.name,
    company: payload.company,
    email: payload.email,
    phone: payload.phone,
    inquiryLabel: 'Quote Request',
    message: buildQuoteMessage(payload),
  })
  if (!emailResult.ok) {
    console.warn('[quote-request] email not sent:', emailResult.message)
  }

  return { status: 200, body: { ok: true, id: saveResult.id } }
}
