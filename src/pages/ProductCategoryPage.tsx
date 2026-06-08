import { useMemo } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { ProductsShell } from '../components/layout/ProductsShell'
import { PageLoading } from '../components/PageLoading'
import { ProductCategoryDetail } from '../components/products/ProductCategoryDetail'
import { PageSEO } from '../components/seo/PageSEO'
import { getProductCategoryById, getProductCategoryPath } from '../data/productCategories'
import { useSanityQuery } from '../hooks/useSanityQuery'
import { mapProductCategory } from '../sanity/mappers'
import { queries } from '../sanity/queries'

export function ProductCategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>()
  const staticFallback = categoryId ? getProductCategoryById(categoryId) : undefined

  const { data, loading } = useSanityQuery<Record<string, unknown>>(
    queries.productCategoryById,
    { id: categoryId ?? '' },
    null
  )

  const category = useMemo(() => {
    if (!categoryId || !staticFallback) return null
    if (!data) return staticFallback
    return mapProductCategory(
      data as Parameters<typeof mapProductCategory>[0],
      staticFallback
    )
  }, [categoryId, data, staticFallback])

  if (!categoryId || !staticFallback) {
    return <Navigate to="/products" replace />
  }

  if (loading && !data) {
    return (
      <ProductsShell>
        <PageLoading embedded />
      </ProductsShell>
    )
  }

  if (!category) {
    return <Navigate to="/products" replace />
  }

  return (
    <ProductsShell>
      <PageSEO
        title={category.title}
        description={category.description}
        path={getProductCategoryPath(category.id)}
      />
      <ProductCategoryDetail category={category} />
    </ProductsShell>
  )
}
