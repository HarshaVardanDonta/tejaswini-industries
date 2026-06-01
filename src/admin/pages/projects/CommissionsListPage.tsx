import { ListTable } from '../../components/ListTable'
import { useAdminDocument } from '../../hooks/useAdminDocument'
import { adminQueries } from '../../lib/adminQueries'

type Row = { _id: string; id?: string; sector?: string; deliverable?: string; location?: string }

export function CommissionsListPage() {
  const { data, loading, error } = useAdminDocument<Row[]>(adminQueries.commissionRows)
  if (loading) return <div className="p-6 text-gray-500">Loading…</div>
  if (error) return <div className="p-6 text-secondary">{error}</div>
  return (
    <ListTable
      title="Commission Rows"
      addHref="/admin/commissions/new"
      columns={['ID', 'Sector', 'Deliverable', 'Location']}
      rows={(data ?? []).map((item) => ({
        id: item._id,
        cells: [item.id ?? '', item.sector ?? '', item.deliverable ?? '', item.location ?? ''],
        editHref: `/admin/commissions/${encodeURIComponent(item._id)}`,
      }))}
    />
  )
}
