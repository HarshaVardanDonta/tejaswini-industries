import { useMemo, useState } from 'react'
import { BlogPostCard } from '../components/blogs/BlogPostCard'
import { BlogsFilters } from '../components/blogs/BlogsFilters'
import { BlogsIntro } from '../components/blogs/BlogsIntro'
import { BlogsSidebar } from '../components/blogs/BlogsSidebar'
import { FeaturedBlogPost } from '../components/blogs/FeaturedBlogPost'
import { ProductsShell } from '../components/layout/ProductsShell'
import { PageLoading } from '../components/PageLoading'
import { buildBreadcrumbJsonLd, PageSEO } from '../components/seo/PageSEO'
import { staticPageMeta } from '../constants/seo'
import { ALL_CATEGORIES, buildBlogFilters } from '../data/blogs'
import type { BlogPost } from '../data/blogs'
import { useCmsQuery } from '../hooks/useCmsQuery'
import { mapBlogPost } from '../cms/mappers'
import { queries } from '../cms/queries'

export function BlogsPage() {
  const [filter, setFilter] = useState<string>(ALL_CATEGORIES)
  const { data: postsData, loading } = useCmsQuery<Array<Record<string, unknown>>>(
    queries.blogPosts,
    {},
    null,
  )

  const posts = useMemo(
    (): BlogPost[] =>
      (postsData ?? []).map((post) => mapBlogPost(post as Parameters<typeof mapBlogPost>[0])),
    [postsData],
  )
  const filters = useMemo(() => buildBlogFilters(posts), [posts])
  const featured = useMemo(() => posts.find((post) => post.featured) ?? posts[0], [posts])

  const showFeatured = filter === ALL_CATEGORIES && Boolean(featured)
  const gridPosts = useMemo(() => {
    const visible = filter === ALL_CATEGORIES ? posts : posts.filter((post) => post.category === filter)
    return showFeatured ? visible.filter((post) => post.id !== featured?.id) : visible
  }, [filter, posts, showFeatured, featured])

  if (loading) {
    return (
      <ProductsShell className="bg-gray-50">
        <PageLoading embedded />
      </ProductsShell>
    )
  }

  return (
    <ProductsShell className="bg-gray-50">
      <PageSEO
        {...staticPageMeta.blogs}
        image={featured?.image}
        jsonLd={buildBreadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Blogs', path: '/blogs' },
        ])}
      />
      <main className="grow max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop py-space-12 space-y-space-12 w-full">
        <div>
          <BlogsIntro />
          <BlogsFilters filters={filters} active={filter} onChange={setFilter} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          <div className="lg:col-span-8 space-y-space-8">
            {showFeatured && featured ? <FeaturedBlogPost post={featured} /> : null}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-space-6">
              {gridPosts.map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
          <BlogsSidebar />
        </div>
      </main>
    </ProductsShell>
  )
}
