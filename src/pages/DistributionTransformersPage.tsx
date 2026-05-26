import { useEffect } from 'react'
import { CustomConfigCTA } from '../components/listing/CustomConfigCTA'
import { EfficiencyGuideNote } from '../components/listing/EfficiencyGuideNote'
import { ProductFilters } from '../components/listing/ProductFilters'
import { ProductListingBreadcrumb } from '../components/listing/ProductListingBreadcrumb'
import { ProductListingCard } from '../components/listing/ProductListingCard'
import { ProductsShell } from '../components/layout/ProductsShell'
import {
  distributionCategory,
  distributionTransformerProducts,
} from '../data/distributionTransformers'

export function DistributionTransformersPage() {
  useEffect(() => {
    document.title = `${distributionCategory.title} - Tejaswini Industries`
  }, [])

  return (
    <ProductsShell className="bg-gray-50">
      <main className="grow max-w-[1280px] mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin-desktop py-space-8 w-full">
        <ProductListingBreadcrumb categoryTitle={distributionCategory.title} />

        <div className="mb-space-12 pb-space-8 border-b border-gray-300">
          <h1 className="font-display-xl text-display-xl text-primary uppercase mb-space-4">
            {distributionCategory.title}
          </h1>
          <p className="font-body-lg text-body-lg text-gray-700 max-w-3xl">
            {distributionCategory.description}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-gutter">
          <ProductFilters />
          <div className="w-full lg:w-3/4 flex flex-col gap-space-12">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-space-6">
              {distributionTransformerProducts.map((product) => (
                <ProductListingCard key={product.id} product={product} />
              ))}
            </div>
            <EfficiencyGuideNote />
            <CustomConfigCTA />
          </div>
        </div>
      </main>
    </ProductsShell>
  )
}
