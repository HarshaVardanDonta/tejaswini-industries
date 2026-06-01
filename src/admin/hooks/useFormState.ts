import { useCallback, useEffect, useMemo, useState } from 'react'

export function useFormState<T>(initial: T | null) {
  const [form, setForm] = useState<T | null>(initial)
  const [baseline, setBaseline] = useState<string>('')

  useEffect(() => {
    if (initial) {
      setForm(initial)
      setBaseline(JSON.stringify(initial))
    }
  }, [initial])

  const dirty = useMemo(() => {
    if (!form) return false
    return JSON.stringify(form) !== baseline
  }, [form, baseline])

  const resetBaseline = useCallback(() => {
    if (form) setBaseline(JSON.stringify(form))
  }, [form])

  const discard = useCallback(() => {
    if (initial) {
      setForm(JSON.parse(baseline) as T)
    }
  }, [baseline, initial])

  return { form, setForm, dirty, resetBaseline, discard }
}
