import { useMemo } from 'react'
import { ProductsShell } from '../components/layout/ProductsShell'
import { PageLoading } from '../components/PageLoading'
import { ProductCategoryCard } from '../components/products/ProductCategoryCard'
import { ProductsIntro } from '../components/products/ProductsIntro'
import {
  EnquiryCta,
  ProductFaqSection,
  RelatedGuides,
  SectionBody,
} from '../components/products/ProductSeoBlocks'
import {
  buildBreadcrumbJsonLd,
  buildCollectionJsonLd,
  buildFaqJsonLd,
  PageSEO,
} from '../components/seo/PageSEO'
import { staticPageMeta } from '../constants/seo'
import {
  CATALOG_HIDDEN_IDS,
  getProductCategoryById,
  getProductCategoryPath,
  productCategories,
} from '../data/productCategories'
import { useCmsQuery } from '../hooks/useCmsQuery'
import { mapProductCategory, mapProductsPage } from '../cms/mappers'
import { queries } from '../cms/queries'

export function ProductsPage() {
  const { data, loading } = useCmsQuery<Array<Record<string, unknown>>>(
    queries.productCategories,
    {},
    null
  )

  const { data: pageDoc } = useCmsQuery<Record<string, unknown> | null>(
    queries.productsPage,
    {},
    null,
  )
  const page = useMemo(() => mapProductsPage(pageDoc as Parameters<typeof mapProductsPage>[0]), [pageDoc])

  const categories = useMemo(() => {
    const source = !data?.length
      ? productCategories
      : data.map((item) => {
          const id = (item as { id: string }).id
          const staticFallback = getProductCategoryById(id)
          return mapProductCategory(
            item as Parameters<typeof mapProductCategory>[0],
            staticFallback
          )
        })
    return source.filter((category) => !CATALOG_HIDDEN_IDS.has(category.id))
  }, [data])

  if (loading) return <ProductsShell><PageLoading embedded /></ProductsShell>

  const meta = {
    ...staticPageMeta.products,
    title: page?.metaTitle || staticPageMeta.products.title,
    description: page?.metaDescription || staticPageMeta.products.description,
  }
  const faqs = page?.faqs ?? []
  const jsonLd = [
    buildCollectionJsonLd({
      title: 'Transformers and panels made in Hyderabad',
      description: meta.description,
      path: meta.path,
      items: categories.map((category) => ({
        name: category.title,
        path: getProductCategoryPath(category.id),
        image: category.image,
      })),
    }),
    buildBreadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'Products', path: '/products' },
    ]),
    ...(faqs.length ? [buildFaqJsonLd(faqs)] : []),
  ]

  return (
    <ProductsShell>
      <PageSEO {...meta} image={categories[0]?.image} jsonLd={jsonLd} />
      <main className="grow w-full max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop py-space-8 md:py-space-12 flex flex-col gap-space-8">
        <ProductsIntro shortAnswer={page?.shortAnswer} />
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {categories.map((category) => (
            <ProductCategoryCard key={category.id} category={category} />
          ))}
        </section>
        {page?.sections?.map((section) => (
          <SectionBody key={section.id} section={section} specs={[]} />
        ))}
        <ProductFaqSection faqs={faqs} />
        <RelatedGuides slugs={page?.relatedGuides ?? []} />
        <EnquiryCta
          title="Need a quote?"
          text="Send the product, rating, voltage, quantity and site location. Tejaswini Industries will reply with a quotation from its works in Mallapur, Hyderabad."
          whatsAppMessage="Hello, I would like a quote for transformers or panels. Please share details."
        />
      </main>
    </ProductsShell>
  )
}
