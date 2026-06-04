import {
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  type PageMeta,
  getSiteUrl,
} from './seo.js'
import {
  FALLBACK_BLOG_META,
  FALLBACK_BLOG_SLUG,
  FALLBACK_PRODUCT_META,
  FALLBACK_PRODUCT_SLUG,
} from './seo-fallbacks.js'
import { resolveServerImageUrl } from './sanity-image-server.js'
import { isSanityServerConfigured, sanityServerClient } from './sanity-server.js'

const blogPostBySlugQuery = `*[_type == "blogPost" && slug.current == $slug][0]{
  title,
  excerpt,
  intro,
  image{ url, alt, asset }
}`

const productDetailBySlugQuery = `*[_type == "productDetail" && slug.current == $slug][0]{
  title,
  description,
  images{ main{ url, alt, asset } }
}`

const blogSlugsQuery = `*[_type == "blogPost" && defined(slug.current)]{
  "slug": slug.current,
  _updatedAt
}`

const productSlugsQuery = `*[_type == "productDetail" && defined(slug.current)]{
  "slug": slug.current,
  _updatedAt
}`

type BlogPostDoc = {
  title?: string
  excerpt?: string
  intro?: string
  image?: { url?: string; alt?: string; asset?: { _ref?: string } }
}

type ProductDetailDoc = {
  title?: string
  description?: string
  images?: { main?: { url?: string; alt?: string; asset?: { _ref?: string } } }
}

type SlugEntry = { slug: string; _updatedAt?: string }

function blogMetaFromDoc(slug: string, doc: BlogPostDoc): PageMeta {
  return {
    title: doc.title || 'Industrial Insights',
    description: doc.excerpt || doc.intro || DEFAULT_DESCRIPTION,
    path: `/blogs/${slug}`,
    image: resolveServerImageUrl(doc.image, FALLBACK_BLOG_META.image) || DEFAULT_OG_IMAGE,
    type: 'article',
  }
}

function productMetaFromDoc(slug: string, doc: ProductDetailDoc): PageMeta {
  return {
    title: doc.title || 'Product Details',
    description: doc.description || DEFAULT_DESCRIPTION,
    path: `/products/distribution-transformers/${slug}`,
    image:
      resolveServerImageUrl(doc.images?.main, FALLBACK_PRODUCT_META.image) || DEFAULT_OG_IMAGE,
    type: 'product',
  }
}

export async function resolveMetaForPath(pathname: string): Promise<PageMeta | null> {
  const blogMatch = pathname.match(/^\/blogs\/([^/]+)$/)
  if (blogMatch) {
    const slug = decodeURIComponent(blogMatch[1])

    if (isSanityServerConfigured) {
      const doc = await sanityServerClient.fetch<BlogPostDoc | null>(blogPostBySlugQuery, { slug })
      if (doc?.title) return blogMetaFromDoc(slug, doc)
    }

    if (slug === FALLBACK_BLOG_SLUG) {
      return {
        title: FALLBACK_BLOG_META.title,
        description: FALLBACK_BLOG_META.description,
        path: `/blogs/${slug}`,
        image: FALLBACK_BLOG_META.image,
        type: 'article',
      }
    }

    return null
  }

  const productMatch = pathname.match(/^\/products\/distribution-transformers\/([^/]+)$/)
  if (productMatch) {
    const slug = decodeURIComponent(productMatch[1])

    if (slug === 'compare') return null

    if (isSanityServerConfigured) {
      const doc = await sanityServerClient.fetch<ProductDetailDoc | null>(
        productDetailBySlugQuery,
        { slug }
      )
      if (doc?.title) return productMetaFromDoc(slug, doc)
    }

    if (slug === FALLBACK_PRODUCT_SLUG) {
      return {
        title: FALLBACK_PRODUCT_META.title,
        description: FALLBACK_PRODUCT_META.description,
        path: `/products/distribution-transformers/${slug}`,
        image: FALLBACK_PRODUCT_META.image,
        type: 'product',
      }
    }

    return null
  }

  return null
}

export type SitemapUrl = {
  loc: string
  lastmod?: string
  changefreq: string
  priority: string
}

export async function getSitemapUrls(): Promise<SitemapUrl[]> {
  const siteUrl = getSiteUrl()
  const urls: SitemapUrl[] = []

  const { STATIC_SITEMAP_ROUTES } = await import('./seo.js')
  for (const route of STATIC_SITEMAP_ROUTES) {
    urls.push({
      loc: `${siteUrl}${route.path === '/' ? '' : route.path}`,
      changefreq: route.changefreq,
      priority: route.priority,
    })
  }

  let blogSlugs: SlugEntry[] = []
  let productSlugs: SlugEntry[] = []

  if (isSanityServerConfigured) {
    ;[blogSlugs, productSlugs] = await Promise.all([
      sanityServerClient.fetch<SlugEntry[]>(blogSlugsQuery),
      sanityServerClient.fetch<SlugEntry[]>(productSlugsQuery),
    ])
  }

  const blogSlugSet = new Set(blogSlugs.map((entry) => entry.slug))
  if (!blogSlugSet.has(FALLBACK_BLOG_SLUG)) {
    blogSlugs.push({ slug: FALLBACK_BLOG_SLUG })
  }

  const productSlugSet = new Set(productSlugs.map((entry) => entry.slug))
  if (!productSlugSet.has(FALLBACK_PRODUCT_SLUG)) {
    productSlugs.push({ slug: FALLBACK_PRODUCT_SLUG })
  }

  for (const entry of blogSlugs) {
    if (!entry.slug) continue
    urls.push({
      loc: `${siteUrl}/blogs/${entry.slug}`,
      lastmod: entry._updatedAt ? entry._updatedAt.split('T')[0] : undefined,
      changefreq: 'monthly',
      priority: '0.8',
    })
  }

  for (const entry of productSlugs) {
    if (!entry.slug) continue
    urls.push({
      loc: `${siteUrl}/products/distribution-transformers/${entry.slug}`,
      lastmod: entry._updatedAt ? entry._updatedAt.split('T')[0] : undefined,
      changefreq: 'monthly',
      priority: '0.8',
    })
  }

  return urls
}

export function buildSitemapXml(urls: SitemapUrl[]): string {
  const urlEntries = urls
    .map((entry) => {
      const lastmod = entry.lastmod ? `\n    <lastmod>${entry.lastmod}</lastmod>` : ''
      return `  <url>
    <loc>${escapeXml(entry.loc)}</loc>${lastmod}
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}
