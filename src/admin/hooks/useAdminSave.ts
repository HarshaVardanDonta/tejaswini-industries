import { useCallback, useState } from 'react'

import { saveDocument } from '../lib/adminMutations'

export function useAdminSave() {
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(
    null
  )

  const save = useCallback(async (doc: Record<string, unknown> & { _id: string; _type: string }) => {
    setSaving(true)
    setMessage(null)
    try {
      await saveDocument(doc)
      setMessage({ type: 'success', text: 'Changes saved successfully.' })
      return true
    } catch (err) {
      setMessage({
        type: 'error',
        text: err instanceof Error ? err.message : 'Failed to save changes.',
      })
      return false
    } finally {
      setSaving(false)
    }
  }, [])

  const clearMessage = useCallback(() => setMessage(null), [])

  return { save, saving, message, clearMessage }
}
