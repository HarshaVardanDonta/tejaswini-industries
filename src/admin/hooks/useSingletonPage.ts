import { useCallback } from 'react'

import { useAdminDocument } from './useAdminDocument'
import { useAdminSave } from './useAdminSave'
import { useFormState } from './useFormState'

export function useSingletonPage<T extends Record<string, unknown> & { _id?: string; _type?: string }>({
  query,
  docId,
  docType,
}: {
  query: string
  docId: string
  docType: string
}) {
  const { data, loading, error, reload } = useAdminDocument<T>(query)
  const { form, setForm, dirty, resetBaseline, discard } = useFormState<T | null>(data)
  const { save, saving, message } = useAdminSave()

  const onSave = useCallback(async () => {
    if (!form) return
    const payload = {
      ...form,
      _id: (form._id as string) || docId,
      _type: (form._type as string) || docType,
    } as Record<string, unknown> & { _id: string; _type: string }
    const ok = await save(payload)
    if (ok) {
      resetBaseline()
      await reload()
    }
  }, [form, docId, docType, save, resetBaseline, reload])

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
  }
}
