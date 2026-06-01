import { useEffect, useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { BlogDetailBreadcrumb } from '../components/blog-detail/BlogDetailBreadcrumb'
import { BlogDetailContent } from '../components/blog-detail/BlogDetailContent'
import { BlogDetailHero } from '../components/blog-detail/BlogDetailHero'
import { BlogDetailShare } from '../components/blog-detail/BlogDetailShare'
import { BlogDetailSidebar } from '../components/blog-detail/BlogDetailSidebar'
import { ProductsShell } from '../components/layout/ProductsShell'
import { PageLoading } from '../components/PageLoading'
import { BlogDetailProvider } from '../context/BlogDetailContext'
import { transformerMaintenanceGuide } from '../data/blogDetailTransformerMaintenance'
import { useSanityQuery } from '../hooks/useSanityQuery'
import { mapBlogDetail } from '../sanity/mappers'
import { queries } from '../sanity/queries'

export function BlogDetailPage() {
  const { slug = '' } = useParams()
  const { data, loading } = useSanityQuery(queries.blogPostBySlug, { slug }, null)

  const article = useMemo(() => {
    const mapped = mapBlogDetail(data as Record<string, unknown> | null, transformerMaintenanceGuide)
    return mapped.slug ? mapped : slug === transformerMaintenanceGuide.slug ? transformerMaintenanceGuide : null
  }, [data, slug])

  useEffect(() => {
    if (article) {
      document.title = `${article.title} - Tejaswini Industries`
    }
  }, [article])

  if (loading) {
    return (
      <ProductsShell className="bg-background">
        <PageLoading embedded />
      </ProductsShell>
    )
  }

  if (!article) {
    return (
      <ProductsShell className="bg-background">
        <main className="grow max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop py-space-16 text-center">
          <h1 className="font-h1 text-h1 text-primary uppercase mb-space-4">Article not found</h1>
          <Link to="/blogs" className="text-secondary font-label text-label uppercase">
            Back to blogs
          </Link>
        </main>
      </ProductsShell>
    )
  }

  return (
    <BlogDetailProvider value={article}>
      <ProductsShell className="bg-background">
        <main className="grow w-full max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop py-space-8 md:py-space-12 grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          <BlogDetailBreadcrumb currentLabel={article.breadcrumbLabel} />

          <article className="lg:col-span-8 flex flex-col gap-space-8">
            <BlogDetailHero />
            <BlogDetailContent />
            <BlogDetailShare />
          </article>

          <BlogDetailSidebar />
        </main>
      </ProductsShell>
    </BlogDetailProvider>
  )
}
