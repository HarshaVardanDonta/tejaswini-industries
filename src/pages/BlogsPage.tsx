import { useEffect, useMemo, useState } from 'react'
import { BlogPagination } from '../components/blogs/BlogPagination'
import { BlogPostCard } from '../components/blogs/BlogPostCard'
import { BlogsFilters } from '../components/blogs/BlogsFilters'
import { BlogsIntro } from '../components/blogs/BlogsIntro'
import { BlogsSidebar } from '../components/blogs/BlogsSidebar'
import { FeaturedBlogPost } from '../components/blogs/FeaturedBlogPost'
import { ProductsShell } from '../components/layout/ProductsShell'
import type { BlogCategory } from '../data/blogs'
import { blogPosts } from '../data/blogs'

export function BlogsPage() {
  const [filter, setFilter] = useState<BlogCategory>('all')

  useEffect(() => {
    document.title = 'Industrial Insights - Tejaswini Industries'
  }, [])

  const filteredPosts = useMemo(() => {
    if (filter === 'all') return blogPosts
    return blogPosts.filter((post) => post.category === filter)
  }, [filter])

  return (
    <ProductsShell className="bg-gray-50">
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
  )
}
