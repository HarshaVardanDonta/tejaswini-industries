import { useEffect, useState } from 'react'

import { isSanityConfigured, sanityClient } from '../sanity/client'

type QueryState<T> = {
  data: T | null
  loading: boolean
  error: Error | null
}

export function useSanityQuery<T>(
  query: string,
  params: Record<string, unknown> = {},
  fallback: T | null = null
): QueryState<T> {
  const [data, setData] = useState<T | null>(fallback)
  const [loading, setLoading] = useState(isSanityConfigured)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!isSanityConfigured) {
      setData(fallback)
      setLoading(false)
      return
    }

    let cancelled = false
    setLoading(true)
    setError(null)

    sanityClient
      .fetch<T>(query, params)
      .then((result: T) => {
        if (!cancelled) {
          setData(result ?? fallback)
          setLoading(false)
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error('Failed to fetch content'))
          setData(fallback)
          setLoading(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [query, fallback, JSON.stringify(params)])

  return { data, loading, error }
}
