import { ListTable } from '../../components/ListTable'
import { useAdminDocument } from '../../hooks/useAdminDocument'
import { adminQueries } from '../../lib/adminQueries'

type Row = { _id: string; id?: string; title?: string; categoryLabel?: string }

export function ProjectsListPage() {
  const { data, loading, error } = useAdminDocument<Row[]>(adminQueries.projects)
  if (loading) return <div className="p-6 text-gray-500">Loading…</div>
  if (error) return <div className="p-6 text-secondary">{error}</div>
  return (
    <ListTable
      title="Projects"
      addHref="/admin/projects/new"
      columns={['ID', 'Title', 'Category']}
      rows={(data ?? []).map((item) => ({
        id: item._id,
        cells: [item.id ?? '', item.title ?? '', item.categoryLabel ?? ''],
        editHref: `/admin/projects/${encodeURIComponent(item._id)}`,
      }))}
    />
  )
}
