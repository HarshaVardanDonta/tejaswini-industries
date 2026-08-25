import { ListTable } from '../../components/ListTable'
import { useAdminDocument } from '../../hooks/useAdminDocument'
import { adminQueries } from '../../lib/adminQueries'
import { useMemo, useState } from 'react'

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
  const [filter, setFilter] = useState<'latest' | 'oldest' | 'responded' | 'not-responded'>('latest')

  const filteredRows = useMemo(() => {
    const entries = [...(data ?? [])]

    if (filter === 'latest') {
      entries.sort((a, b) => new Date(b.submittedAt ?? 0).getTime() - new Date(a.submittedAt ?? 0).getTime())
      return entries
    }

    if (filter === 'oldest') {
      entries.sort((a, b) => new Date(a.submittedAt ?? 0).getTime() - new Date(b.submittedAt ?? 0).getTime())
      return entries
    }

    return entries.filter((item) => (filter === 'responded' ? item.responded : !item.responded))
  }, [data, filter])

  if (loading) return <div className="p-6 text-gray-500">Loading…</div>
  if (error) return <div className="p-6 text-secondary">{error}</div>

  return (
    <ListTable
      title="Form Inquiries"
      description="Quote and contact submissions from the public site."
      headerControls={
        <label className="font-body-sm text-body-sm text-gray-700 flex items-center gap-2">
          <span>Filter</span>
          <select
            value={filter}
            onChange={(event) => {
              setFilter(event.target.value as 'latest' | 'oldest' | 'responded' | 'not-responded')
            }}
            className="border border-gray-200 rounded-sm px-3 py-2 bg-white text-gray-700 font-body-sm"
            aria-label="Filter inquiries"
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
            <option value="responded">Responded</option>
            <option value="not-responded">Not Responded</option>
          </select>
        </label>
      }
      columns={['Date', 'Source', 'Company', 'Name', 'Inquiry type', 'Responded']}
      rows={filteredRows.map((item) => ({
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
