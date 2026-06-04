export const SITE_NAME = 'Tejaswini Industries'

export const DEFAULT_SITE_URL = 'https://tejaswiniindustries.com'

export const DEFAULT_DESCRIPTION =
  'Tejaswini Industries delivers precision-engineered transformers, control panels, and critical electrical infrastructure solutions for industrial and utility applications.'

export const DEFAULT_OG_IMAGE = '/images.png'

export type PageMeta = {
  title: string
  description: string
  path: string
  image?: string
  type?: 'website' | 'article' | 'product'
  noindex?: boolean
}

function readEnv(key: string): string | undefined {
  if (typeof globalThis !== 'undefined' && 'process' in globalThis) {
    const proc = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process
    return proc?.env?.[key]
  }
  return undefined
}

export function getSiteUrl(): string {
  const fromEnv = readEnv('VITE_SITE_URL') || readEnv('SITE_URL') || DEFAULT_SITE_URL

  return fromEnv.replace(/\/$/, '')
}

export function buildAbsoluteUrl(pathOrUrl: string, siteUrl?: string): string {
  if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) {
    return pathOrUrl
  }

  const base = (siteUrl ?? getSiteUrl()).replace(/\/$/, '')
  return `${base}${pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`}`
}

export function truncateDescription(text: string, maxLength = 160): string {
  const normalized = text.replace(/\s+/g, ' ').trim()
  if (normalized.length <= maxLength) return normalized
  return `${normalized.slice(0, maxLength - 1).trimEnd()}…`
}

export function formatPageTitle(title: string): string {
  if (title.includes(SITE_NAME)) return title
  return `${title} | ${SITE_NAME}`
}

export function isSocialBot(userAgent: string | null | undefined): boolean {
  if (!userAgent) return false
  return /facebookexternalhit|Facebot|Twitterbot|LinkedInBot|WhatsApp|Slackbot|TelegramBot|Discordbot|Pinterest/i.test(
    userAgent
  )
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;')
}

export function buildMetaTagsHtml(meta: PageMeta, siteUrl?: string): string {
  const base = siteUrl ?? getSiteUrl()
  const title = formatPageTitle(meta.title)
  const description = truncateDescription(meta.description)
  const canonical = buildAbsoluteUrl(meta.path, base)
  const image = buildAbsoluteUrl(meta.image || DEFAULT_OG_IMAGE, base)
  const type = meta.type || 'website'
  const robots = meta.noindex ? '\n  <meta name="robots" content="noindex">' : ''

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">${robots}
  <link rel="canonical" href="${escapeHtml(canonical)}">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:image" content="${escapeHtml(image)}">
  <meta property="og:url" content="${escapeHtml(canonical)}">
  <meta property="og:type" content="${escapeHtml(type)}">
  <meta property="og:site_name" content="${escapeHtml(SITE_NAME)}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(title)}">
  <meta name="twitter:description" content="${escapeHtml(description)}">
  <meta name="twitter:image" content="${escapeHtml(image)}">
</head>
<body>
  <p><a href="${escapeHtml(canonical)}">${escapeHtml(title)}</a></p>
</body>
</html>`
}

export const STATIC_SITEMAP_ROUTES: { path: string; priority: string; changefreq: string }[] = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/products', priority: '0.9', changefreq: 'weekly' },
  {
    path: '/products/distribution-transformers',
    priority: '0.9',
    changefreq: 'weekly',
  },
  {
    path: '/products/distribution-transformers/compare',
    priority: '0.8',
    changefreq: 'monthly',
  },
  { path: '/blogs', priority: '0.9', changefreq: 'weekly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/contact', priority: '0.8', changefreq: 'monthly' },
  { path: '/services', priority: '0.8', changefreq: 'monthly' },
  { path: '/projects', priority: '0.8', changefreq: 'monthly' },
  { path: '/corporate-profile', priority: '0.8', changefreq: 'monthly' },
  { path: '/careers', priority: '0.7', changefreq: 'monthly' },
  { path: '/infrastructure', priority: '0.7', changefreq: 'monthly' },
  { path: '/quality-policy', priority: '0.6', changefreq: 'yearly' },
  { path: '/privacy-policy', priority: '0.6', changefreq: 'yearly' },
]
