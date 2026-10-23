import { useEffect, useMemo, useState } from 'react'

import { evaluateQuery } from '../../lib/cms-query'
import { loadMergedDocuments, readBaked } from '../cms/repository'

type QueryState<T> = {
  data: T | null
  loading: boolean
  error: Error | null
}

export function useCmsQuery<T>(
  query: string,
  params: Record<string, unknown> = {},
  fallback: T | null = null,
): QueryState<T> {
  const paramsKey = JSON.stringify(params)
  const initial = useMemo(() => {
    const result = readBaked<T | null>(query, JSON.parse(paramsKey) as Record<string, unknown>)
    return result ?? fallback
  }, [query, paramsKey, fallback])
  const [data, setData] = useState<T | null>(initial)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let cancelled = false
    loadMergedDocuments()
      .then((docs) => {
        if (cancelled) return
        const result = evaluateQuery(
          query,
          JSON.parse(paramsKey) as Record<string, unknown>,
          docs,
        ) as T | null
        setData(result ?? fallback)
      })
      .catch((err: unknown) => {
        if (!cancelled) setError(err instanceof Error ? err : new Error('Failed to load content'))
      })
    return () => {
      cancelled = true
    }
  }, [query, paramsKey, fallback])

  return { data, loading: false, error }
}
