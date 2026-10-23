import { collection, deleteDoc, doc, getDocs, setDoc, type DocumentData } from 'firebase/firestore'

import type { CmsDoc } from '../../lib/cms-query'
import { getFirebaseAuth, getFirebaseDb } from './firebase'

function snapshotDocs(snapshot: { docs: { id: string; data: () => DocumentData }[] }): CmsDoc[] {
  return snapshot.docs.map((entry) => {
    const data = entry.data() as CmsDoc
    return { ...data, _id: data._id || entry.id }
  })
}

function stripUndefined(value: unknown): unknown {
  if (Array.isArray(value)) return value.map((item) => stripUndefined(item))
  if (!value || typeof value !== 'object') return value
  const output: Record<string, unknown> = {}
  for (const [key, nested] of Object.entries(value as Record<string, unknown>)) {
    if (nested === undefined) continue
    output[key] = stripUndefined(nested)
  }
  return output
}

export async function readContentDocuments(): Promise<CmsDoc[]> {
  const contentSnap = await getDocs(collection(getFirebaseDb(), 'content'))
  return snapshotDocs(contentSnap)
}

export async function readLeadDocuments(): Promise<CmsDoc[]> {
  if (!getFirebaseAuth().currentUser) return []
  const snap = await getDocs(collection(getFirebaseDb(), 'leads'))
  return snapshotDocs(snap).map((entry) => ({
    ...entry,
    _type: (entry._type as string) || 'lead',
  }))
}

export async function writeDocument(payload: CmsDoc) {
  const collectionName = payload._type === 'lead' ? 'leads' : 'content'
  await setDoc(doc(getFirebaseDb(), collectionName, payload._id), stripUndefined(payload) as CmsDoc)
}

export async function removeDocument(id: string) {
  const db = getFirebaseDb()
  await deleteDoc(doc(db, 'content', id)).catch(() => undefined)
  await deleteDoc(doc(db, 'leads', id)).catch(() => undefined)
}
