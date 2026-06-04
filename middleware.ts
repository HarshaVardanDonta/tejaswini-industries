import { next } from '@vercel/functions'
import { isSocialBot } from './lib/seo.js'

export default function middleware(request: Request) {
  const userAgent = request.headers.get('user-agent')

  if (!isSocialBot(userAgent)) {
    return next()
  }

  const { pathname } = new URL(request.url)
  const isBlogDetail = /^\/blogs\/[^/]+$/.test(pathname)
  const isProductDetail = /^\/products\/distribution-transformers\/[^/]+$/.test(pathname)

  if (!isBlogDetail && !isProductDetail) {
    return next()
  }

  if (pathname.endsWith('/compare')) {
    return next()
  }

  const previewUrl = new URL('/api/preview', request.url)
  previewUrl.searchParams.set('path', pathname)

  return next({
    rewrite: previewUrl,
  })
}

export const config = {
  matcher: ['/blogs/:slug*', '/products/distribution-transformers/:slug*'],
}
