export type ImageWithUrl = {
  _type?: string
  asset?: { _ref?: string; _type?: string; asset?: { _ref?: string } }
  url?: string
  alt?: string
}

/** Images stay as URLs. Spark plan has no Cloud Storage, so asset refs are not resolved. */
export function resolveImageUrl(image?: ImageWithUrl | null, fallback = ''): string {
  if (!image) return fallback
  return image.url || fallback
}

export function resolveImageAlt(image?: ImageWithUrl | null, fallback = ''): string {
  return image?.alt || fallback
}
