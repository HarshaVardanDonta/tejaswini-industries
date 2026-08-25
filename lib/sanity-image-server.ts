import createImageUrlBuilder from '@sanity/image-url'

import { sanityServerClient } from './sanity-server.js'

const builder = createImageUrlBuilder(sanityServerClient)

type ImageWithUrl = {
  asset?: { _ref?: string; _type?: string }
  url?: string
  alt?: string
}

export function resolveServerImageUrl(image?: ImageWithUrl | null, fallback = ''): string {
  if (!image) return fallback
  if (image.asset?._ref) {
    return builder.image(image).url()
  }
  return image.url || fallback
}
