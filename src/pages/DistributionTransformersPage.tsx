import { useMemo } from 'react'
import { CompareSelectionBar } from '../components/comparison/CompareSelectionBar'
import { CustomConfigCTA } from '../components/listing/CustomConfigCTA'
import { EfficiencyGuideNote } from '../components/listing/EfficiencyGuideNote'
import { ProductFilters } from '../components/listing/ProductFilters'
import { ProductListingBreadcrumb } from '../components/listing/ProductListingBreadcrumb'
import { ProductListingCard } from '../components/listing/ProductListingCard'
import { ProductsShell } from '../components/layout/ProductsShell'
import { PageLoading } from '../components/PageLoading'
import { PageSEO } from '../components/seo/PageSEO'
import { DistributionPageProvider } from '../context/DistributionPageContext'
import { comparisonParameters, distributionCategory } from '../data/distributionTransformers'
import { useProductComparison } from '../hooks/useProductComparison'
import { useProductFilters } from '../hooks/useProductFilters'
import { useSanityQuery } from '../hooks/useSanityQuery'
import {
  getDistributionListingProductsFallback,
  mapProductDetailToListingProduct,
} from '../sanity/mappers'
import { DISTRIBUTION_TRANSFORMERS_CATEGORY_ID } from '../constants/productCategories'
import { queries } from '../sanity/queries'

export function DistributionTransformersPage() {
  const { selectedIds, toggle, clear, isSelected, canAdd, count } = useProductComparison()
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

  const {
    filterGroups,
    filterState,
    setCheckbox,
    setRange,
    clearAll,
    filteredProducts,
  } = useProductFilters(
    DISTRIBUTION_TRANSFORMERS_CATEGORY_ID,
    pageData.products,
    pageData.comparisonParameters
  )

  const hasFilters = filterGroups.length > 0
  const showResultCount =
    hasFilters && filteredProducts.length !== pageData.products.length

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
        <PageSEO
          title={pageData.category.title}
          description={pageData.category.description}
          path="/products/distribution-transformers"
        />
        <main className="grow max-w-[1280px] mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin-desktop py-space-8 w-full">
          <ProductListingBreadcrumb categoryTitle={pageData.category.title} />

          <div className="mb-space-12 pb-space-8 border-b border-gray-300">
            <h1 className="font-display-xl text-display-xl text-primary uppercase mb-space-4">
              {pageData.category.title}
            </h1>
            <p className="font-body-lg text-body-lg text-gray-700 max-w-3xl">
              {pageData.category.description}
            </p>
            {showResultCount && (
              <p className="font-mono-data text-mono-data text-gray-500 mt-space-4">
                Showing {filteredProducts.length} of {pageData.products.length} products
              </p>
            )}
          </div>

          <div className="flex flex-col lg:flex-row gap-gutter">
            <ProductFilters
              groups={filterGroups}
              state={filterState}
              onCheckboxChange={setCheckbox}
              onRangeChange={setRange}
              onClear={clearAll}
            />
            <div
              className={`w-full flex flex-col gap-space-12 ${hasFilters ? 'lg:w-3/4' : ''}`}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-space-6">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <ProductListingCard
                      key={product.id}
                      product={product}
                      compareSelected={isSelected(product.id)}
                      compareDisabled={!canAdd && !isSelected(product.id)}
                      onCompareToggle={toggle}
                    />
                  ))
                ) : (
                  <p className="col-span-full font-body-lg text-body-lg text-gray-700 py-space-12 text-center border border-gray-200 rounded-lg bg-white">
                    No products match the selected filters. Try adjusting or clearing filters.
                  </p>
                )}
              </div>
              <EfficiencyGuideNote />
              <CustomConfigCTA />
            </div>
          </div>
        </main>
        <CompareSelectionBar selectedIds={selectedIds} onClear={clear} />
        {count > 0 && <div className="h-20" aria-hidden />}
      </ProductsShell>
    </DistributionPageProvider>
  )
}
