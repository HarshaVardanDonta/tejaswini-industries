import { useMemo } from 'react'
import { ProductsShell } from '../components/layout/ProductsShell'
import { PageLoading } from '../components/PageLoading'
import { ProductCategoryCard } from '../components/products/ProductCategoryCard'
import { ProductsIntro } from '../components/products/ProductsIntro'
import { PageSEO } from '../components/seo/PageSEO'
import { staticPageMeta } from '../constants/seo'
import { productCategories } from '../data/productCategories'
import { useSanityQuery } from '../hooks/useSanityQuery'
import { mapProductCategory } from '../sanity/mappers'
import { queries } from '../sanity/queries'

export function ProductsPage() {
  const { data, loading } = useSanityQuery<Array<Record<string, unknown>>>(
    queries.productCategories,
    {},
    null
  )

  const categories = useMemo(() => {
    if (!data?.length) return productCategories
    return data.map((item) => mapProductCategory(item as Parameters<typeof mapProductCategory>[0]))
  }, [data])

  if (loading) return <ProductsShell><PageLoading embedded /></ProductsShell>

  return (
    <ProductsShell>
      <PageSEO {...staticPageMeta.products} />
      <main className="grow w-full max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop py-space-8 md:py-space-12 flex flex-col gap-space-8">
        <ProductsIntro />
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {categories.map((category) => (
            <ProductCategoryCard key={category.id} category={category} />
          ))}
        </section>
      </main>
    </ProductsShell>
  )
}
