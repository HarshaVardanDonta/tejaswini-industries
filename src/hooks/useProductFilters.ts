import { useCallback, useEffect, useMemo, useState } from 'react'

import type { DistributionTransformerProduct } from '../data/distributionTransformers'
import {
  applyFilters,
  buildFilterGroups,
  createDefaultFilterState,
  type FilterGroup,
  type FilterState,
} from '../lib/productFilters'

type ComparisonParam = { key: string; label: string }

export function useProductFilters(
  categoryId: string,
  products: DistributionTransformerProduct[],
  comparisonParameters: ComparisonParam[] = []
) {
  const filterGroups = useMemo(
    () => buildFilterGroups(categoryId, products, comparisonParameters),
    [categoryId, products, comparisonParameters]
  )

  const defaultState = useMemo(
    () => createDefaultFilterState(filterGroups),
    [filterGroups]
  )

  const [filterState, setFilterState] = useState<FilterState>(defaultState)

  useEffect(() => {
    setFilterState(defaultState)
  }, [defaultState])

  const filteredProducts = useMemo(
    () => applyFilters(products, filterGroups, filterState, categoryId),
    [products, filterGroups, filterState, categoryId]
  )

  const clearAll = useCallback(() => {
    setFilterState(defaultState)
  }, [defaultState])

  const setCheckbox = useCallback(
    (groupKey: string, optionId: string, checked: boolean) => {
      setFilterState((prev) => ({
        ...prev,
        checkboxes: {
          ...prev.checkboxes,
          [groupKey]: {
            ...prev.checkboxes[groupKey],
            [optionId]: checked,
          },
        },
      }))
    },
    []
  )

  const setRange = useCallback((groupKey: string, value: number) => {
    setFilterState((prev) => ({
      ...prev,
      ranges: { ...prev.ranges, [groupKey]: value },
    }))
  }, [])

  return {
    filterGroups,
    filterState,
    setFilterState,
    setCheckbox,
    setRange,
    clearAll,
    filteredProducts,
  }
}

export type { FilterGroup, FilterState }
