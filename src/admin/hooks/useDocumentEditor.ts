import { useCallback } from 'react'

import { deleteDocument } from '../lib/adminMutations'
import { useAdminDocument } from './useAdminDocument'
import { useAdminSave } from './useAdminSave'
import { useFormState } from './useFormState'

export function useDocumentEditor<T extends Record<string, unknown> & { _id: string; _type: string }>({
  query,
  params,
  defaultDoc,
  skipLoad = false,
}: {
  query: string
  params: Record<string, unknown>
  defaultDoc?: T
  skipLoad?: boolean
}) {
  const fetched = useAdminDocument<T>(skipLoad ? 'null[0]' : query, params)
  const { data, loading, error, reload } = skipLoad
    ? { data: null, loading: false, error: null, reload: fetched.reload }
    : fetched
  const initial = (skipLoad ? defaultDoc : data ?? defaultDoc) ?? null
  const { form, setForm, dirty, resetBaseline, discard } = useFormState<T | null>(initial)
  const { save, saving, message } = useAdminSave()

  const onSave = useCallback(async (override?: T) => {
    const doc = override ?? form
    if (!doc) return false
    const ok = await save(doc)
    if (ok) {
      resetBaseline()
      await reload()
    }
    return ok
  }, [form, save, resetBaseline, reload])

  const onDelete = useCallback(async (id: string) => {
    await deleteDocument(id)
    await reload()
  }, [reload])

  return {
    form,
    setForm,
    loading,
    error,
    dirty,
    saving,
    message,
    onSave,
    onDiscard: discard,
    onDelete,
    reload,
  }
}
