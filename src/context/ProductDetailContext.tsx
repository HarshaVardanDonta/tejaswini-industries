import { createContext, useContext } from 'react'

import { productDetail250Kva } from '../data/productDetail250Kva'

export type ProductDetailData = {
  slug: string
  sku: string
  title: string
  breadcrumbLabel: string
  description: string
  images: {
    main: { src: string; alt: string }
    front: { src: string; alt: string }
    detail: { src: string; alt: string }
  }
  quickSpecs: { label: string; value: string; highlight?: boolean }[]
  technicalParameters: { parameter: string; value: string }[]
}

const ProductDetailContext = createContext<ProductDetailData>(productDetail250Kva)

export function ProductDetailProvider({
  value,
  children,
}: {
  value: ProductDetailData
  children: React.ReactNode
}) {
  return <ProductDetailContext.Provider value={value}>{children}</ProductDetailContext.Provider>
}

export function useProductDetail() {
  return useContext(ProductDetailContext)
}
