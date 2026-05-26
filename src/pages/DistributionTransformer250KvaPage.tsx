import { useEffect } from 'react'
import { ProductDetailBreadcrumb } from '../components/product-detail/ProductDetailBreadcrumb'
import { ProductDetailGallery } from '../components/product-detail/ProductDetailGallery'
import { ProductDetailInfo } from '../components/product-detail/ProductDetailInfo'
import { TechnicalParametersTable } from '../components/product-detail/TechnicalParametersTable'
import { ProductsShell } from '../components/layout/ProductsShell'
import { productDetail250Kva } from '../data/productDetail250Kva'

export function DistributionTransformer250KvaPage() {
  useEffect(() => {
    document.title = `${productDetail250Kva.title} | Tejaswini Industries`
  }, [])

  return (
    <ProductsShell className="bg-background">
      <main className="grow w-full max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop py-space-12 grid grid-cols-4 md:grid-cols-12 gap-gutter">
        <ProductDetailBreadcrumb currentLabel={productDetail250Kva.breadcrumbLabel} />

        <section className="col-span-4 md:col-span-12 grid grid-cols-1 md:grid-cols-12 gap-gutter mb-space-16">
          <ProductDetailGallery />
          <ProductDetailInfo />
        </section>

        <TechnicalParametersTable />
      </main>
    </ProductsShell>
  )
}
