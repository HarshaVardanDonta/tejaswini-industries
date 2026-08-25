import type { VercelRequest, VercelResponse } from '@vercel/node'
import { handleContactInquiry } from '../lib/handle-contact-inquiry.js'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const result = await handleContactInquiry(req.body)
  return res.status(result.status).json(result.body)
}
