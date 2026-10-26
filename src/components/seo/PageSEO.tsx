import { SITE_NAME, formatPageTitle, truncateDescription, DEFAULT_OG_IMAGE } from '../../../lib/seo'
import { buildAbsoluteUrl } from '../../constants/seo'
import { currentHeadSink, pushJsonLd } from '../../seo/headSink'

type JsonLd = Record<string, unknown>

type PageSEOProps = {
  title: string
  description: string
  path: string
  image?: string
  type?: 'website' | 'article' | 'product'
  noindex?: boolean
  jsonLd?: JsonLd | JsonLd[]
}

export function PageSEO({
  title,
  description,
  path,
  image,
  type = 'website',
  noindex,
  jsonLd,
}: PageSEOProps) {
  const sink = currentHeadSink()
  const fullTitle = formatPageTitle(title)
  const desc = truncateDescription(description)
  const canonical = buildAbsoluteUrl(path)
  const ogImage = buildAbsoluteUrl(image || DEFAULT_OG_IMAGE)
  const blocks = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : []

  if (sink) {
    sink.title = title
    sink.description = description
    sink.path = path
    sink.image = image || DEFAULT_OG_IMAGE
    sink.type = type
    sink.noindex = Boolean(noindex)
    blocks.forEach((block, index) => pushJsonLd(sink, `page:${path}:${index}`, block))
    return null
  }

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow'} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={ogImage} />
      {blocks.map((block, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(block)}
        </script>
      ))}
    </>
  )
}

export function buildArticleJsonLd(options: {
  title: string
  description: string
  path: string
  image?: string
  datePublished?: string
  dateModified?: string
  author?: string
  authorType?: 'Person' | 'Organization'
  wordCount?: number
  section?: string
}) {
  const url = buildAbsoluteUrl(options.path)
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: options.title,
    description: truncateDescription(options.description),
    image: buildAbsoluteUrl(options.image || DEFAULT_OG_IMAGE),
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    datePublished: options.datePublished,
    dateModified: options.dateModified || options.datePublished,
    ...(options.wordCount ? { wordCount: options.wordCount } : {}),
    ...(options.section ? { articleSection: options.section } : {}),
    inLanguage: 'en-IN',
    author:
      options.author && options.authorType === 'Person'
        ? { '@type': 'Person', name: options.author }
        : { '@type': 'Organization', name: options.author || SITE_NAME, url: buildAbsoluteUrl('/') },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: buildAbsoluteUrl(DEFAULT_OG_IMAGE),
      },
    },
  }
}

export function buildProductJsonLd(options: {
  title: string
  description: string
  path: string
  image?: string
  sku?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: options.title,
    description: truncateDescription(options.description),
    image: buildAbsoluteUrl(options.image || DEFAULT_OG_IMAGE),
    url: buildAbsoluteUrl(options.path),
    ...(options.sku ? { sku: options.sku } : {}),
    brand: {
      '@type': 'Brand',
      name: SITE_NAME,
    },
    manufacturer: {
      '@type': 'Organization',
      name: SITE_NAME,
    },
  }
}

export function buildBreadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: buildAbsoluteUrl(item.path),
    })),
  }
}

export function buildFaqJsonLd(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}
