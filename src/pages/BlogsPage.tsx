import { useMemo, useState } from 'react'
import { BlogPagination } from '../components/blogs/BlogPagination'
import { BlogPostCard } from '../components/blogs/BlogPostCard'
import { BlogsFilters } from '../components/blogs/BlogsFilters'
import { BlogsIntro } from '../components/blogs/BlogsIntro'
import { BlogsSidebar } from '../components/blogs/BlogsSidebar'
import { FeaturedBlogPost } from '../components/blogs/FeaturedBlogPost'
import { ProductsShell } from '../components/layout/ProductsShell'
import { PageLoading } from '../components/PageLoading'
import { PageSEO } from '../components/seo/PageSEO'
import { staticPageMeta } from '../constants/seo'
import { BlogsPageProvider } from '../context/BlogsPageContext'
import type { BlogCategory, BlogPost } from '../data/blogs'
import { blogPosts, featuredPost, trendingArticles } from '../data/blogs'
import { useSanityQuery } from '../hooks/useSanityQuery'
import { mapBlogPost, mapFeaturedPost } from '../sanity/mappers'
import { queries } from '../sanity/queries'

export function BlogsPage() {
  const [filter, setFilter] = useState<BlogCategory>('all')
  const { data: postsData, loading: postsLoading } = useSanityQuery<Array<Record<string, unknown>>>(
    queries.blogPosts,
    {},
    null
  )
  const { data: featuredData } = useSanityQuery(queries.featuredBlogPost, {}, null)
  const { data: trendingData, loading: trendingLoading } = useSanityQuery<
    Array<Record<string, unknown>>
  >(queries.trendingArticles, {}, null)

  const posts = useMemo((): BlogPost[] => {
    if (!postsData?.length) return blogPosts
    return postsData.map((post) => mapBlogPost(post as Parameters<typeof mapBlogPost>[0]) as BlogPost)
  }, [postsData])

  const featured = useMemo(
    () => mapFeaturedPost(featuredData as Record<string, unknown> | null, featuredPost),
    [featuredData]
  )

  const trending = useMemo(() => {
    if (!trendingData?.length) return trendingArticles
    return trendingData.map((item) => ({
      rank: item.rank as string,
      title: item.title as string,
      readTime: item.readTime as string,
    }))
  }, [trendingData])

  const filteredPosts = useMemo(() => {
    if (filter === 'all') return posts
    return posts.filter((post) => post.category === filter)
  }, [filter, posts])

  if (postsLoading || trendingLoading) {
    return (
      <ProductsShell className="bg-gray-50">
        <PageLoading embedded />
      </ProductsShell>
    )
  }

  return (
    <BlogsPageProvider featured={featured} trending={trending}>
      <ProductsShell className="bg-gray-50">
        <PageSEO {...staticPageMeta.blogs} />
        <main className="grow max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop py-space-12 space-y-space-12 w-full">
          <div>
            <BlogsIntro />
            <BlogsFilters active={filter} onChange={setFilter} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
            <div className="lg:col-span-8 space-y-space-8">
              <FeaturedBlogPost />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-6">
                {filteredPosts.map((post) => (
                  <BlogPostCard key={post.id} post={post} />
                ))}
              </div>
              <BlogPagination />
            </div>
            <BlogsSidebar />
          </div>
        </main>
      </ProductsShell>
    </BlogsPageProvider>
  )
}
