import createImageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url'

import { sanityClient } from './client'

const builder = createImageUrlBuilder(sanityClient)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

export type ImageWithUrl = {
  asset?: { _ref?: string; _type?: string }
  url?: string
  alt?: string
}

export function resolveImageUrl(image?: ImageWithUrl | null, fallback = ''): string {
  if (!image) return fallback
  if (image.asset?._ref) {
    return urlFor(image).url()
  }
  return image.url || fallback
}

export function resolveImageAlt(image?: ImageWithUrl | null, fallback = ''): string {
  return image?.alt || fallback
}
