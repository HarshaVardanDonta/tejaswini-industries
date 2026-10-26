import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { BlogDetailBreadcrumb } from '../components/blog-detail/BlogDetailBreadcrumb'
import { BlogDetailContent } from '../components/blog-detail/BlogDetailContent'
import { BlogDetailHero } from '../components/blog-detail/BlogDetailHero'
import { BlogDetailShare } from '../components/blog-detail/BlogDetailShare'
import { BlogDetailSidebar } from '../components/blog-detail/BlogDetailSidebar'
import { ProductsShell } from '../components/layout/ProductsShell'
import { PageLoading } from '../components/PageLoading'
import {
  buildArticleJsonLd,
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  PageSEO,
} from '../components/seo/PageSEO'
import { BlogDetailProvider } from '../context/BlogDetailContext'
import type { BlogPost } from '../data/blogs'
import { useCmsQuery } from '../hooks/useCmsQuery'
import { mapBlogDetail, mapBlogPost } from '../cms/mappers'
import { queries } from '../cms/queries'

export function BlogDetailPage() {
  const { slug = '' } = useParams()
  const { data, loading } = useCmsQuery(queries.blogPostBySlug, { slug }, null)
  const { data: postsData } = useCmsQuery<Array<Record<string, unknown>>>(queries.blogPosts, {}, null)

  const article = useMemo(
    () => (data ? mapBlogDetail(data as Record<string, unknown> | null) : null),
    [data],
  )

  const otherPosts = useMemo(
    (): BlogPost[] =>
      (postsData ?? [])
        .map((post) => mapBlogPost(post as Parameters<typeof mapBlogPost>[0]))
        .filter((post) => post.slug && post.slug !== slug),
    [postsData, slug],
  )

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

  const articlePath = `/blogs/${article.slug}`
  const jsonLd: Record<string, unknown>[] = [
    buildArticleJsonLd({
      title: article.title,
      description: article.metaDescription,
      path: articlePath,
      image: article.heroImage,
      datePublished: article.publishedAt,
      dateModified: article.dateModified,
      author: article.author || undefined,
      authorType: 'Organization',
      wordCount: article.wordCount,
      section: article.category || undefined,
    }),
    buildBreadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'Blogs', path: '/blogs' },
      { name: article.breadcrumbLabel, path: articlePath },
    ]),
  ]
  if (article.faqs.length) {
    jsonLd.push(
      buildFaqJsonLd(article.faqs.map((item) => ({ question: item.question, answer: item.answer }))),
    )
  }

  return (
    <BlogDetailProvider value={article}>
      <ProductsShell className="bg-background">
        <PageSEO
          title={article.metaTitle}
          description={article.metaDescription}
          path={articlePath}
          image={article.heroImage}
          type="article"
          jsonLd={jsonLd}
        />
        <main className="grow w-full max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop py-space-8 md:py-space-12 grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          <BlogDetailBreadcrumb currentLabel={article.breadcrumbLabel} />

          <article className="lg:col-span-8 flex flex-col gap-space-8">
            <BlogDetailHero />
            <BlogDetailContent />
            <BlogDetailShare />
          </article>

          <BlogDetailSidebar otherPosts={otherPosts} />
        </main>
      </ProductsShell>
    </BlogDetailProvider>
  )
}
