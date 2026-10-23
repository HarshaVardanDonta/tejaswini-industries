import { DEFAULT_OG_IMAGE, SITE_NAME, formatPageTitle, truncateDescription } from '../../lib/seo'
import { buildAbsoluteUrl } from '../constants/seo'

export type HeadSink = {
  title: string
  description: string
  path: string
  image: string
  type: string
  noindex: boolean
  jsonLd: unknown[]
  keys: Set<string>
}

export function pushJsonLd(sink: HeadSink | null, key: string, data: unknown) {
  if (!sink || sink.keys.has(key)) return
  sink.keys.add(key)
  sink.jsonLd.push(data)
}

let activeSink: HeadSink | null = null

export function beginHeadCapture(): HeadSink {
  activeSink = createHeadSink()
  return activeSink
}

export function endHeadCapture() {
  activeSink = null
}

export function currentHeadSink() {
  return activeSink
}

export function createHeadSink(): HeadSink {
  return {
    title: 'Tejaswini Industries',
    description:
      'Distribution transformer manufacturer in Hyderabad, Telangana. Copper and oil-cooled distribution units, OLTC and OFTC tap changers, and LT/HT panels.',
    path: '/',
    image: DEFAULT_OG_IMAGE,
    type: 'website',
    noindex: false,
    jsonLd: [],
    keys: new Set<string>(),
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;')
}

export function renderHeadHtml(sink: HeadSink): string {
  const title = formatPageTitle(sink.title)
  const description = truncateDescription(sink.description)
  const canonical = buildAbsoluteUrl(sink.path)
  const image = buildAbsoluteUrl(sink.image || DEFAULT_OG_IMAGE)
  const robots = sink.noindex ? 'noindex, nofollow' : 'index, follow'
  const scripts = sink.jsonLd
    .map(
      (entry) =>
        `<script type="application/ld+json">${JSON.stringify(entry).replace(/</g, '\\u003c')}</script>`,
    )
    .join('\n  ')

  return [
    `<title>${escapeHtml(title)}</title>`,
    `<meta name="description" content="${escapeHtml(description)}" />`,
    `<meta name="robots" content="${robots}" />`,
    `<link rel="canonical" href="${escapeHtml(canonical)}" />`,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
    `<meta property="og:image" content="${escapeHtml(image)}" />`,
    `<meta property="og:url" content="${escapeHtml(canonical)}" />`,
    `<meta property="og:type" content="${escapeHtml(sink.type || 'website')}" />`,
    `<meta property="og:site_name" content="${escapeHtml(SITE_NAME)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(description)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(image)}" />`,
    scripts,
  ]
    .filter(Boolean)
    .join('\n    ')
}
