/** Types and helpers for blog content. The articles themselves live in scripts/blog-posts.mjs. */

export type BlogPost = {
  id: string
  slug?: string
  title: string
  excerpt: string
  category: string
  categoryLabel: string
  /** Display date, for example "26 Oct 2026". */
  date: string
  publishedAt?: string
  readTime?: string
  author: string
  image: string
  imageAlt: string
  featured?: boolean
}

export type BlogFilter = { id: string; label: string }

export const ALL_CATEGORIES = 'all'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

/** "2026-10-26" becomes "26 Oct 2026". Falls back to the given text when the date is not ISO. */
export function formatPostDate(publishedAt: string | undefined, fallback = ''): string {
  const match = publishedAt?.match(/^(\d{4})-(\d{2})-(\d{2})/)
  if (!match) return fallback
  const month = MONTHS[Number(match[2]) - 1]
  if (!month) return fallback
  return `${Number(match[3])} ${month} ${match[1]}`
}

/** Category filters are built from the posts that exist, so no filter ever leads to an empty list. */
export function buildBlogFilters(posts: BlogPost[]): BlogFilter[] {
  const seen = new Map<string, string>()
  for (const post of posts) {
    if (post.category && !seen.has(post.category)) seen.set(post.category, post.categoryLabel)
  }
  return [
    { id: ALL_CATEGORIES, label: 'All guides' },
    ...[...seen.entries()].map(([id, label]) => ({ id, label })),
  ]
}
