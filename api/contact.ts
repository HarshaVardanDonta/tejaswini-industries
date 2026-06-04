import type { VercelRequest, VercelResponse } from '@vercel/node'
import { parseInquiryPayload } from '../lib/contact-inquiry.js'
import { sendInquiryEmail } from '../lib/send-inquiry-email.js'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { payload, errors } = parseInquiryPayload(req.body)
  if (!payload) {
    return res.status(400).json({ error: 'Validation failed', fields: errors })
  }

  const result = await sendInquiryEmail(payload)
  if (!result.ok) {
    const status = result.error === 'not_configured' ? 503 : 502
    return res.status(status).json({ error: result.message })
  }

  return res.status(200).json({ ok: true })
}
