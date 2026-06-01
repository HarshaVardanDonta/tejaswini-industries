import { useCallback, useEffect, useState } from 'react'

import { sanityClient } from '../../sanity/client'

export function useAdminDocument<T>(
  query: string,
  params: Record<string, unknown> = {}
) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const reload = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await sanityClient.fetch<T | null>(query, params)
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load document')
      setData(null)
    } finally {
      setLoading(false)
    }
  }, [query, JSON.stringify(params)])

  useEffect(() => {
    reload()
  }, [reload])

  return { data, setData, loading, error, reload }
}
