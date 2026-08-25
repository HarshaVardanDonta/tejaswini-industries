import type { VercelRequest, VercelResponse } from '@vercel/node'
import { buildSitemapXml, getSitemapUrls } from '../lib/seo-resolvers.js'

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  const urls = await getSitemapUrls()
  const xml = buildSitemapXml(urls)

  res.setHeader('Content-Type', 'application/xml; charset=utf-8')
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400')
  return res.status(200).send(xml)
}
