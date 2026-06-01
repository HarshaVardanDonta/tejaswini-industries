import { ListTable } from '../../components/ListTable'
import { useAdminDocument } from '../../hooks/useAdminDocument'
import { adminQueries } from '../../lib/adminQueries'
import { resolveSlug } from '../../lib/adminMutations'
import type { SanitySlug } from '../../types/adminDocuments'

type Row = {
  _id: string
  title?: string
  slug?: string | SanitySlug
  categoryLabel?: string
  featured?: boolean
  date?: string
}

export function BlogListPage() {
  const { data, loading, error } = useAdminDocument<Row[]>(adminQueries.blogPosts)
  if (loading) return <div className="p-6 text-gray-500">Loading…</div>
  if (error) return <div className="p-6 text-secondary">{error}</div>
  return (
    <ListTable
      title="Blog Posts"
      addHref="/admin/blogs/new"
      columns={['Title', 'Slug', 'Category', 'Featured']}
      rows={(data ?? []).map((item) => ({
        id: item._id,
        cells: [
          item.title ?? '',
          resolveSlug(item.slug),
          item.categoryLabel ?? '',
          item.featured ? 'Yes' : 'No',
        ],
        editHref: `/admin/blogs/${encodeURIComponent(item._id)}`,
      }))}
    />
  )
}
