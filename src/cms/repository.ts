import { evaluateQuery, type CmsDoc } from '../../lib/cms-query'
import { contentDocuments, retiredContentIds } from './active-content'
import { FIREBASE_SETUP_HINT, isFirebaseConfigured } from './config'

function asDocs(value: readonly CmsDoc[]): CmsDoc[] {
  return value.map((doc) => ({ ...doc }))
}

let remoteContent: CmsDoc[] | null = null

export function getBakedDocuments(): CmsDoc[] {
  return asDocs(contentDocuments)
}

export async function loadMergedDocuments(options?: { includeLeads?: boolean }): Promise<CmsDoc[]> {
  const baked = getBakedDocuments().filter((entry) => entry._type !== 'lead' && entry._type !== 'siteInquiry')
  if (!isFirebaseConfigured || typeof window === 'undefined') return baked

  try {
    const remote = await import('./remote')
    if (!remoteContent) {
      remoteContent = await remote.readContentDocuments()
    }
    const merged = new Map(baked.map((entry) => [entry._id, entry]))
    for (const entry of remoteContent) {
      if (retiredContentIds.includes(entry._id)) continue
      merged.set(entry._id, entry)
    }
    const content = [...merged.values()].filter((entry) => entry._type !== 'lead')
    if (!options?.includeLeads) return content
    const leads = await remote.readLeadDocuments()
    return [...content, ...leads]
  } catch (error) {
    console.warn('[cms] Firestore read failed, using baked content.', error)
    return baked
  }
}

export function invalidateContentCache() {
  remoteContent = null
}

export async function fetchCms<T>(
  query: string,
  params: Record<string, unknown> = {},
  options?: { includeLeads?: boolean },
): Promise<T> {
  const docs = await loadMergedDocuments(options)
  return evaluateQuery(query, params, docs) as T
}

export function readBaked<T>(query: string, params: Record<string, unknown> = {}): T {
  return evaluateQuery(query, params, getBakedDocuments()) as T
}

export async function saveContentDocument(document: CmsDoc) {
  if (!isFirebaseConfigured) {
    throw new Error(`Saving needs Firebase. ${FIREBASE_SETUP_HINT}`)
  }
  const payload = {
    ...document,
    updatedAt: new Date().toISOString(),
  }
  const remote = await import('./remote')
  await remote.writeDocument(payload)
  invalidateContentCache()
}

export async function deleteContentDocument(id: string) {
  if (!isFirebaseConfigured) {
    throw new Error(`Deleting needs Firebase. ${FIREBASE_SETUP_HINT}`)
  }
  const remote = await import('./remote')
  await remote.removeDocument(id)
  invalidateContentCache()
}
