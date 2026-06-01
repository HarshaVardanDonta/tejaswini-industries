import { useEffect, useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ProductDetailBreadcrumb } from '../components/product-detail/ProductDetailBreadcrumb'
import { ProductDetailGallery } from '../components/product-detail/ProductDetailGallery'
import { ProductDetailInfo } from '../components/product-detail/ProductDetailInfo'
import { TechnicalParametersTable } from '../components/product-detail/TechnicalParametersTable'
import { ProductsShell } from '../components/layout/ProductsShell'
import { PageLoading } from '../components/PageLoading'
import { DistributionPageProvider } from '../context/DistributionPageContext'
import { ProductDetailProvider } from '../context/ProductDetailContext'
import { distributionCategory } from '../data/distributionTransformers'
import { productDetail250Kva } from '../data/productDetail250Kva'
import { useSanityQuery } from '../hooks/useSanityQuery'
import { mapProductDetail } from '../sanity/mappers'
import { queries } from '../sanity/queries'

export function DistributionTransformer250KvaPage() {
  const { slug = '250-kva' } = useParams()
  const { data, loading } = useSanityQuery(queries.productDetailBySlug, { slug }, null)

  const detail = useMemo(
    () => mapProductDetail(data as Record<string, unknown> | null, productDetail250Kva),
    [data]
  )

  useEffect(() => {
    document.title = `${detail.title} | Tejaswini Industries`
  }, [detail.title])

  if (loading) {
    return (
      <ProductsShell className="bg-background">
        <PageLoading />
      </ProductsShell>
    )
  }

  if (!data && slug !== productDetail250Kva.slug) {
    return (
      <ProductsShell className="bg-background">
        <main className="grow max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop py-space-16 text-center">
          <h1 className="font-h1 text-h1 text-primary uppercase mb-space-4">Product not found</h1>
          <Link to="/products/distribution-transformers" className="text-secondary font-label text-label uppercase">
            Back to listing
          </Link>
        </main>
      </ProductsShell>
    )
  }

  return (
    <DistributionPageProvider
      value={{
        category: distributionCategory,
        products: [],
        comparisonParameters: [],
      }}
    >
      <ProductDetailProvider value={detail}>
        <ProductsShell className="bg-background">
          <main className="grow w-full max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop py-space-12 grid grid-cols-4 md:grid-cols-12 gap-gutter">
            <ProductDetailBreadcrumb currentLabel={detail.breadcrumbLabel} />

            <section className="col-span-4 md:col-span-12 grid grid-cols-1 md:grid-cols-12 gap-gutter mb-space-16">
              <ProductDetailGallery />
              <ProductDetailInfo />
            </section>

            <TechnicalParametersTable />
          </main>
        </ProductsShell>
      </ProductDetailProvider>
    </DistributionPageProvider>
  )
}
