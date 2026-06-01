import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'ti-distribution-compare-ids'
export const MAX_COMPARE_PRODUCTS = 3

function readStoredIds(): string[] {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as unknown
    return Array.isArray(parsed)
      ? parsed.filter((id): id is string => typeof id === 'string')
      : []
  } catch {
    return []
  }
}

function writeStoredIds(ids: string[]) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
}

export function useProductComparison() {
  const [selectedIds, setSelectedIds] = useState<string[]>(readStoredIds)

  useEffect(() => {
    writeStoredIds(selectedIds)
  }, [selectedIds])

  const isSelected = useCallback(
    (id: string) => selectedIds.includes(id),
    [selectedIds]
  )

  const toggle = useCallback((id: string) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id)
      if (prev.length >= MAX_COMPARE_PRODUCTS) return prev
      return [...prev, id]
    })
  }, [])

  const clear = useCallback(() => setSelectedIds([]), [])

  const canAdd = selectedIds.length < MAX_COMPARE_PRODUCTS

  return {
    selectedIds,
    toggle,
    clear,
    isSelected,
    canAdd,
    count: selectedIds.length,
  }
}

export function buildCompareSearchParams(ids: string[]): string {
  return ids.join(',')
}

export function parseCompareIdsParam(param: string | null): string[] {
  if (!param) return []
  return param
    .split(',')
    .map((id) => id.trim())
    .filter(Boolean)
}
