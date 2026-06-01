import { sanityWriteClient } from '../../sanity/client'
import type { SanitySlug } from '../types/adminDocuments'

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function toSanitySlug(value: string) {
  return { _type: 'slug' as const, current: slugify(value) }
}

/** Sanity slug fields arrive as `{ _type, current }`; plain strings are also supported. */
export function resolveSlug(slug: string | SanitySlug | undefined | null): string {
  if (!slug) return ''
  if (typeof slug === 'string') return slug
  return slug.current ?? ''
}

export function stripSanityMeta<T extends Record<string, unknown>>(doc: T) {
  const { _rev, _createdAt, _updatedAt, ...rest } = doc as T & {
    _rev?: string
    _createdAt?: string
    _updatedAt?: string
  }
  return rest
}

type SaveableDoc = Record<string, unknown> & { _id: string; _type: string }

export async function saveDocument(doc: SaveableDoc) {
  if (!import.meta.env.VITE_SANITY_WRITE_TOKEN) {
    throw new Error('VITE_SANITY_WRITE_TOKEN is not configured.')
  }
  const payload = stripSanityMeta(doc) as SaveableDoc
  if (!payload._id || !payload._type) {
    throw new Error('Document _id and _type are required to save.')
  }
  return sanityWriteClient.createOrReplace(payload)
}

export async function deleteDocument(id: string) {
  if (!import.meta.env.VITE_SANITY_WRITE_TOKEN) {
    throw new Error('VITE_SANITY_WRITE_TOKEN is not configured.')
  }
  return sanityWriteClient.delete(id)
}
