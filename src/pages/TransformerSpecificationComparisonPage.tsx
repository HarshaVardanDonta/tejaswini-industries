import { useEffect, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ComparisonBreadcrumb } from '../components/comparison/ComparisonBreadcrumb'
import { SpecificationComparisonTable } from '../components/comparison/SpecificationComparisonTable'
import { ProductsShell } from '../components/layout/ProductsShell'
import { PageLoading } from '../components/PageLoading'
import { Icon } from '../components/Icon'
import { DistributionPageProvider } from '../context/DistributionPageContext'
import { comparisonParameters, distributionCategory } from '../data/distributionTransformers'
import { parseCompareIdsParam } from '../hooks/useProductComparison'
import { useSanityQuery } from '../hooks/useSanityQuery'
import {
  getDistributionListingProductsFallback,
  mapProductDetailToListingProduct,
} from '../sanity/mappers'
import { DISTRIBUTION_TRANSFORMERS_CATEGORY_ID } from '../constants/productCategories'
import { queries } from '../sanity/queries'

export function TransformerSpecificationComparisonPage() {
  const [searchParams] = useSearchParams()
  const idsParam = searchParams.get('ids')

  const { data: categoryData } = useSanityQuery(queries.distributionCategory, {}, null)
  const { data: productsData, loading } = useSanityQuery<Array<Record<string, unknown>>>(
    queries.productDetailsByCategory,
    { categoryId: DISTRIBUTION_TRANSFORMERS_CATEGORY_ID },
    null
  )
  const { data: paramsData } = useSanityQuery<Array<Record<string, unknown>>>(
    queries.comparisonParameters,
    {},
    null
  )

  const pageData = useMemo(() => {
    const category = categoryData
      ? {
          slug: (categoryData as { slug?: string }).slug || distributionCategory.slug,
          title: (categoryData as { title?: string }).title || distributionCategory.title,
          description:
            (categoryData as { description?: string }).description ||
            distributionCategory.description,
        }
      : distributionCategory

    const products = productsData?.length
      ? productsData.map((p) => mapProductDetailToListingProduct(p))
      : getDistributionListingProductsFallback()

    const params = (paramsData?.length
      ? paramsData.map((p, index) => ({
          key: p.key as string,
          label: p.label as string,
          hint: p.hint as string | undefined,
          order: (p.order as number) ?? index,
        }))
      : comparisonParameters.map((p, index) => ({ ...p, order: index })))

    return {
      category,
      products,
      comparisonParameters: params
        .map((p) => ({ ...p, order: p.order ?? 0 }))
        .sort((a, b) => a.order - b.order)
        .map(({ order: _order, ...param }) => param),
    }
  }, [categoryData, productsData, paramsData])

  const products = useMemo(() => {
    const ids = parseCompareIdsParam(idsParam)
    const unique = [...new Set(ids)]
    return unique
      .map((id) => pageData.products.find((product) => product.id === id))
      .filter((product): product is (typeof pageData.products)[number] => !!product)
  }, [idsParam, pageData.products])

  useEffect(() => {
    document.title = `Technical Comparison - ${pageData.category.title} - Tejaswini Industries`
  }, [pageData.category.title])

  useEffect(() => {
    if (products.length > 0) {
      sessionStorage.setItem(
        'ti-distribution-compare-ids',
        JSON.stringify(products.map((p) => p.id))
      )
    }
  }, [products])

  const hasEnoughProducts = products.length >= 2

  if (loading) {
    return (
      <ProductsShell className="bg-gray-50">
        <PageLoading embedded />
      </ProductsShell>
    )
  }

  return (
    <DistributionPageProvider value={pageData}>
      <ProductsShell className="bg-gray-50">
        <main className="grow max-w-[1280px] mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin-desktop py-space-8 w-full pb-space-16">
          <ComparisonBreadcrumb />

          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-space-4 pb-space-6 border-b border-gray-300 mb-space-8">
            <div>
              <h1 className="font-display-xl text-display-xl text-primary uppercase">
                Technical Comparison
              </h1>
              <p className="font-body-lg text-body-lg text-gray-700 mt-space-2 max-w-2xl">
                Detailed specification matrix for Distribution Transformers. Compare critical
                performance metrics to identify the optimal configuration for your operational
                requirements.
              </p>
            </div>
            {hasEnoughProducts && (
              <button
                type="button"
                className="bg-primary text-on-primary font-label text-label px-space-6 py-space-3 rounded hover:bg-primary/90 transition-colors flex items-center gap-space-2 uppercase tracking-wider whitespace-nowrap"
              >
                <Icon name="download" size={18} className="icon-outline" />
                Download Comparison PDF
              </button>
            )}
          </div>

          {hasEnoughProducts ? (
            <SpecificationComparisonTable products={products} />
          ) : (
            <section className="bg-white border border-gray-100 rounded-lg p-space-12 text-center shadow-sm">
              <Icon
                name="compare_arrows"
                size={48}
                className="text-gray-300 mx-auto mb-space-4 icon-outline"
              />
              <h2 className="font-h2 text-h2 text-primary uppercase mb-space-2">
                No products to compare
              </h2>
              <p className="font-body-lg text-body-lg text-gray-700 max-w-xl mx-auto mb-space-6">
                Select at least two distribution transformers from the listing page to view a
                side-by-side specification matrix.
              </p>
              <Link
                to={`/products/${pageData.category.slug}`}
                className="inline-flex items-center gap-2 bg-primary text-on-primary font-label text-label uppercase px-space-6 py-space-3 rounded hover:bg-primary/90 transition-colors"
              >
                <Icon name="arrow_back" size={18} className="icon-outline" />
                Back to listing
              </Link>
            </section>
          )}

          {hasEnoughProducts && (
            <p className="mt-space-6 text-center">
              <Link
                to={`/products/${pageData.category.slug}`}
                className="font-label text-label text-secondary hover:underline uppercase tracking-wider"
              >
                Modify selection
              </Link>
            </p>
          )}
        </main>
      </ProductsShell>
    </DistributionPageProvider>
  )
}
