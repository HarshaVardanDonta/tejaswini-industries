import { useCallback, useEffect, useState } from 'react'

import { fetchCms } from '../../cms/repository'

export function useAdminDocument<T>(query: string, params: Record<string, unknown> = {}) {
  const paramsKey = JSON.stringify(params)
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const reload = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await fetchCms<T | null>(query, JSON.parse(paramsKey) as Record<string, unknown>, {
        includeLeads: true,
      })
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load document')
      setData(null)
    } finally {
      setLoading(false)
    }
  }, [query, paramsKey])

  useEffect(() => {
    let cancelled = false
    void Promise.resolve().then(() => {
      if (!cancelled) void reload()
    })
    return () => {
      cancelled = true
    }
  }, [reload])

  return { data, setData, loading, error, reload }
}
