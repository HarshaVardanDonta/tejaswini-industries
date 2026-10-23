import { deleteContentDocument, saveContentDocument } from '../../cms/repository'
import type { CmsDoc } from '../../cms/types'
import type { ContentSlug } from '../types/adminDocuments'

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function toContentSlug(value: string) {
  return { _type: 'slug' as const, current: slugify(value) }
}

export function resolveSlug(slug: string | ContentSlug | undefined | null): string {
  if (!slug) return ''
  if (typeof slug === 'string') return slug
  return slug.current ?? ''
}

export function stripDocMeta<T extends Record<string, unknown>>(doc: T) {
  const rest = { ...doc }
  delete rest._rev
  delete rest._createdAt
  delete rest._updatedAt
  return rest
}

type SaveableDoc = Record<string, unknown> & { _id: string; _type: string }

export async function saveDocument(doc: SaveableDoc) {
  const payload = stripDocMeta(doc) as SaveableDoc
  if (!payload._id || !payload._type) {
    throw new Error('Document _id and _type are required to save.')
  }
  await saveContentDocument(payload as CmsDoc)
}

export async function deleteDocument(id: string) {
  await deleteContentDocument(id)
}
