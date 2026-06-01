import { ListTable } from '../components/ListTable'
import { useAdminDocument } from '../hooks/useAdminDocument'
import { adminQueries } from '../lib/adminQueries'

type Row = { _id: string; rank?: number; title?: string; readTime?: string }

export function TrendingListPage() {
  const { data, loading, error } = useAdminDocument<Row[]>(adminQueries.trendingArticles)
  if (loading) return <div className="p-6 text-gray-500">Loading…</div>
  if (error) return <div className="p-6 text-secondary">{error}</div>
  return (
    <ListTable
      title="Trending Articles"
      addHref="/admin/trending/new"
      columns={['Rank', 'Title', 'Read time']}
      rows={(data ?? []).map((item) => ({
        id: item._id,
        cells: [String(item.rank ?? ''), item.title ?? '', item.readTime ?? ''],
        editHref: `/admin/trending/${encodeURIComponent(item._id)}`,
      }))}
    />
  )
}
