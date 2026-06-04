import type { VercelRequest, VercelResponse } from '@vercel/node'
import { buildMetaTagsHtml } from '../lib/seo.js'
import { resolveMetaForPath } from '../lib/seo-resolvers.js'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).send('Method not allowed')
  }

  const pathParam = req.query.path
  const pathname = typeof pathParam === 'string' ? pathParam : Array.isArray(pathParam) ? pathParam[0] : ''

  if (!pathname.startsWith('/')) {
    return res.status(400).send('Invalid path')
  }

  const meta = await resolveMetaForPath(pathname)
  if (!meta) {
    return res.status(404).send('Not found')
  }

  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400')
  return res.status(200).send(buildMetaTagsHtml(meta))
}
