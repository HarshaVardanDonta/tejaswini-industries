import {
  SITE_NAME,
  formatPageTitle,
  truncateDescription,
  DEFAULT_OG_IMAGE,
} from '../../../lib/seo'
import { buildAbsoluteUrl } from '../../constants/seo'

type PageSEOProps = {
  title: string
  description: string
  path: string
  image?: string
  type?: 'website' | 'article' | 'product'
  noindex?: boolean
  jsonLd?: Record<string, unknown>
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
  const fullTitle = formatPageTitle(title)
  const desc = truncateDescription(description)
  const canonical = buildAbsoluteUrl(path)
  const ogImage = buildAbsoluteUrl(image || DEFAULT_OG_IMAGE)

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      {noindex ? <meta name="robots" content="noindex" /> : null}
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
      {jsonLd ? (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      ) : null}
    </>
  )
}

export function buildArticleJsonLd(options: {
  title: string
  description: string
  path: string
  image?: string
  datePublished?: string
  author?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: options.title,
    description: truncateDescription(options.description),
    image: buildAbsoluteUrl(options.image || DEFAULT_OG_IMAGE),
    url: buildAbsoluteUrl(options.path),
    datePublished: options.datePublished,
    author: options.author
      ? { '@type': 'Person', name: options.author }
      : { '@type': 'Organization', name: SITE_NAME },
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
    sku: options.sku,
    brand: {
      '@type': 'Brand',
      name: SITE_NAME,
    },
  }
}
