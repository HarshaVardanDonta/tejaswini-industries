import { useEffect } from 'react'
import { BlogDetailBreadcrumb } from '../components/blog-detail/BlogDetailBreadcrumb'
import { BlogDetailContent } from '../components/blog-detail/BlogDetailContent'
import { BlogDetailHero } from '../components/blog-detail/BlogDetailHero'
import { BlogDetailShare } from '../components/blog-detail/BlogDetailShare'
import { BlogDetailSidebar } from '../components/blog-detail/BlogDetailSidebar'
import { ProductsShell } from '../components/layout/ProductsShell'
import { transformerMaintenanceGuide } from '../data/blogDetailTransformerMaintenance'

export function BlogDetailPage() {
  useEffect(() => {
    document.title = `${transformerMaintenanceGuide.title} - Tejaswini Industries`
  }, [])

  return (
    <ProductsShell className="bg-background">
      <main className="grow w-full max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop py-space-8 md:py-space-12 grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        <BlogDetailBreadcrumb
          currentLabel={transformerMaintenanceGuide.breadcrumbLabel}
        />

        <article className="lg:col-span-8 flex flex-col gap-space-8">
          <BlogDetailHero />
          <BlogDetailContent />
          <BlogDetailShare />
        </article>

        <BlogDetailSidebar />
      </main>
    </ProductsShell>
  )
}
