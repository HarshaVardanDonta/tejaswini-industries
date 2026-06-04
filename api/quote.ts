import type { VercelRequest, VercelResponse } from '@vercel/node'
import { handleQuoteRequest } from '../lib/handle-quote-request.js'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const result = await handleQuoteRequest(req.body)
  return res.status(result.status).json(result.body)
}
