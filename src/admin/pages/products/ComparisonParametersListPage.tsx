import { ListTable } from '../../components/ListTable'
import { useAdminDocument } from '../../hooks/useAdminDocument'
import { adminQueries } from '../../lib/adminQueries'

type Row = { _id: string; key?: string; label?: string; order?: number }

export function ComparisonParametersListPage() {
  const { data, loading, error } = useAdminDocument<Row[]>(adminQueries.comparisonParameters)
  if (loading) return <div className="p-6 text-gray-500">Loading…</div>
  if (error) return <div className="p-6 text-secondary">{error}</div>
  return (
    <ListTable
      title="Comparison Parameters"
      addHref="/admin/products/comparison/new"
      columns={['Key', 'Label', 'Order']}
      rows={(data ?? []).map((item) => ({
        id: item._id,
        cells: [item.key ?? '', item.label ?? '', String(item.order ?? '')],
        editHref: `/admin/products/comparison/${encodeURIComponent(item._id)}`,
      }))}
    />
  )
}
