import {
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  type PageMeta,
  getSiteUrl,
} from './seo.js'
import { FALLBACK_BLOG_META, FALLBACK_BLOG_SLUG } from './seo-fallbacks.js'
import { resolveServerImageUrl } from './sanity-image-server.js'
import { isSanityServerConfigured, sanityServerClient } from './sanity-server.js'

const blogPostBySlugQuery = `*[_type == "blogPost" && slug.current == $slug][0]{
  title,
  excerpt,
  intro,
  image{ url, alt, asset }
}`

const productCategoryByIdQuery = `*[_type == "productCategory" && id == $id][0]{
  id,
  title,
  description,
  image{ url, alt, asset }
}`

const blogSlugsQuery = `*[_type == "blogPost" && defined(slug.current)]{
  "slug": slug.current,
  _updatedAt
}`

const productCategoryIdsQuery = `*[_type == "productCategory" && defined(id)]{
  id,
  _updatedAt
}`

type BlogPostDoc = {
  title?: string
  excerpt?: string
  intro?: string
  image?: { url?: string; alt?: string; asset?: { _ref?: string } }
}

type ProductCategoryDoc = {
  id?: string
  title?: string
  description?: string
  image?: { url?: string; alt?: string; asset?: { _ref?: string } }
}

type SlugEntry = { slug: string; _updatedAt?: string }
type CategoryEntry = { id: string; _updatedAt?: string }

function blogMetaFromDoc(slug: string, doc: BlogPostDoc): PageMeta {
  return {
    title: doc.title || 'Industrial Insights',
    description: doc.excerpt || doc.intro || DEFAULT_DESCRIPTION,
    path: `/blogs/${slug}`,
    image: resolveServerImageUrl(doc.image, FALLBACK_BLOG_META.image) || DEFAULT_OG_IMAGE,
    type: 'article',
  }
}

function productCategoryMetaFromDoc(id: string, doc: ProductCategoryDoc): PageMeta {
  return {
    title: doc.title || 'Products',
    description: doc.description || DEFAULT_DESCRIPTION,
    path: `/products/${id}`,
    image: resolveServerImageUrl(doc.image) || DEFAULT_OG_IMAGE,
    type: 'website',
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

  const categoryMatch = pathname.match(/^\/products\/([^/]+)$/)
  if (categoryMatch) {
    const id = decodeURIComponent(categoryMatch[1])

    if (isSanityServerConfigured) {
      const doc = await sanityServerClient.fetch<ProductCategoryDoc | null>(
        productCategoryByIdQuery,
        { id }
      )
      if (doc?.title) return productCategoryMetaFromDoc(id, doc)
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
  let categoryIds: CategoryEntry[] = []

  if (isSanityServerConfigured) {
    ;[blogSlugs, categoryIds] = await Promise.all([
      sanityServerClient.fetch<SlugEntry[]>(blogSlugsQuery),
      sanityServerClient.fetch<CategoryEntry[]>(productCategoryIdsQuery),
    ])
  }

  const blogSlugSet = new Set(blogSlugs.map((entry) => entry.slug))
  if (!blogSlugSet.has(FALLBACK_BLOG_SLUG)) {
    blogSlugs.push({ slug: FALLBACK_BLOG_SLUG })
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

  for (const entry of categoryIds) {
    if (!entry.id) continue
    urls.push({
      loc: `${siteUrl}/products/${entry.id}`,
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
