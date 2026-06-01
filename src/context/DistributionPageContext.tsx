import { createContext, useContext } from 'react'

import type { DistributionTransformerProduct } from '../data/distributionTransformers'
import {
  comparisonParameters,
  distributionCategory,
  distributionTransformerProducts,
} from '../data/distributionTransformers'

export type DistributionPageData = {
  category: { slug: string; title: string; description: string }
  products: DistributionTransformerProduct[]
  comparisonParameters: { key: string; label: string; hint?: string; order?: number }[]
}

const defaultData: DistributionPageData = {
  category: distributionCategory,
  products: distributionTransformerProducts,
  comparisonParameters,
}

const DistributionPageContext = createContext<DistributionPageData>(defaultData)

export function DistributionPageProvider({
  value,
  children,
}: {
  value: DistributionPageData
  children: React.ReactNode
}) {
  return (
    <DistributionPageContext.Provider value={value}>{children}</DistributionPageContext.Provider>
  )
}

export function useDistributionPageData() {
  return useContext(DistributionPageContext)
}
