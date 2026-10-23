import { readBaked } from './repository'
import type { CmsDoc } from './types'

export const staticPublicPaths = [
  '/',
  '/products',
  '/projects',
  '/clients',
  '/services',
  '/corporate-profile',
  '/about',
  '/contact',
  '/quality-policy',
  '/privacy-policy',
  '/careers',
  '/infrastructure',
  '/blogs',
  '/service-areas',
] as const

export function getProductPaths(): string[] {
  const categories = readBaked<CmsDoc[]>('*[_type == "productCategory"] | order(id asc)')
  return categories.map((category) => `/products/${String(category.id)}`)
}

export function getBlogPaths(): string[] {
  const posts = readBaked<CmsDoc[]>('*[_type == "blogPost"] | order(date desc)')
  return posts
    .map((post) => {
      const slug = post.slug as { current?: string } | undefined
      return slug?.current ? `/blogs/${slug.current}` : ''
    })
    .filter(Boolean)
}

export function getPublicPaths(): string[] {
  return [...staticPublicPaths, ...getProductPaths(), ...getBlogPaths()]
}

export function getPrerenderPaths(): string[] {
  return [...getPublicPaths(), '/admin/login', '/admin']
}
