import { ListTable } from '../../components/ListTable'
import { useAdminDocument } from '../../hooks/useAdminDocument'
import { adminQueries } from '../../lib/adminQueries'

type Row = {
  _id: string
  source?: string
  name?: string
  company?: string
  inquiryLabel?: string
  responded?: boolean
  submittedAt?: string
}

function formatDate(iso?: string) {
  if (!iso) return '—'
  try {
    return new Date(iso).toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    })
  } catch {
    return iso
  }
}

function formatSource(source?: string) {
  if (source === 'quote') return 'Quote'
  if (source === 'contact') return 'Contact'
  return source ?? '—'
}

export function InquiriesListPage() {
  const { data, loading, error } = useAdminDocument<Row[]>(adminQueries.siteInquiries)
  if (loading) return <div className="p-6 text-gray-500">Loading…</div>
  if (error) return <div className="p-6 text-secondary">{error}</div>

  return (
    <ListTable
      title="Form Inquiries"
      description="Quote and contact submissions from the public site."
      columns={['Date', 'Source', 'Company', 'Name', 'Inquiry type', 'Responded']}
      rows={(data ?? []).map((item) => ({
        id: item._id,
        cells: [
          formatDate(item.submittedAt),
          formatSource(item.source),
          item.company ?? '',
          item.name ?? '',
          item.inquiryLabel ?? '',
          item.responded ? 'Yes' : 'No',
        ],
        editHref: `/admin/inquiries/${encodeURIComponent(item._id)}`,
      }))}
      emptyMessage="No submissions yet."
    />
  )
}
