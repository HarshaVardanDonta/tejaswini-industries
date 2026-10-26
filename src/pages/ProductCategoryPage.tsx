import { useMemo } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { usePageFaqs } from '../components/FaqList'
import { ProductsShell } from '../components/layout/ProductsShell'
import { PageLoading } from '../components/PageLoading'
import { presentCategory, ProductCategoryDetail } from '../components/products/ProductCategoryDetail'
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildProductJsonLd,
  PageSEO,
} from '../components/seo/PageSEO'
import {
  getProductCategoryById,
  getProductCategoryPath,
  PRODUCT_SHORT_LABELS,
} from '../data/productCategories'
import { useCmsQuery } from '../hooks/useCmsQuery'
import { mapProductCategory } from '../cms/mappers'
import { queries } from '../cms/queries'

export function ProductCategoryPage() {
  const { categoryId = '' } = useParams<{ categoryId: string }>()
  const staticFallback = categoryId ? getProductCategoryById(categoryId) : undefined
  const legacyFaqs = usePageFaqs(categoryId)

  const { data, loading } = useCmsQuery<Record<string, unknown> | null>(
    queries.productCategoryById,
    { id: categoryId },
    null,
  )

  const category = useMemo(() => {
    if (data && typeof data.id === 'string') {
      return mapProductCategory(data as Parameters<typeof mapProductCategory>[0], staticFallback)
    }
    return staticFallback ?? null
  }, [data, staticFallback])

  if (!categoryId) {
    return <Navigate to="/products" replace />
  }

  if (loading && !category) {
    return (
      <ProductsShell>
        <PageLoading embedded />
      </ProductsShell>
    )
  }

  if (!category) {
    return <Navigate to="/products" replace />
  }

  const product = presentCategory(category)
  const path = getProductCategoryPath(product.id)
  const faqs = product.faqs?.length
    ? product.faqs
    : legacyFaqs.map((item) => ({ question: item.question, answer: item.answer }))
  const metaTitle = product.metaTitle || product.title
  const metaDescription = product.metaDescription || product.description
  const jsonLd = [
    buildProductJsonLd({
      title: product.title,
      description: metaDescription,
      path,
      image: product.image,
      category: 'Electrical equipment',
      specs: product.specsTable,
    }),
    buildBreadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'Products', path: '/products' },
      { name: product.title, path },
    ]),
    ...(faqs.length ? [buildFaqJsonLd(faqs)] : []),
  ]

  return (
    <ProductsShell>
      <PageSEO
        title={metaTitle}
        description={metaDescription}
        path={path}
        image={product.image}
        type="product"
        jsonLd={jsonLd}
      />
      <ProductCategoryDetail
        category={{ ...product, faqs }}
        relatedTitles={PRODUCT_SHORT_LABELS}
      />
      <p className="max-w-[1280px] mx-auto w-full px-margin-mobile md:px-margin-desktop pb-space-8 font-body-sm text-body-sm text-gray-600">
        Need a rating for a Hyderabad or Telangana site?{' '}
        <Link to="/contact" className="text-secondary uppercase font-label">
          Request a quote
        </Link>
        {' '}or see{' '}
        <Link to="/service-areas" className="text-secondary uppercase font-label">
          service areas
        </Link>
        .
      </p>
    </ProductsShell>
  )
}
