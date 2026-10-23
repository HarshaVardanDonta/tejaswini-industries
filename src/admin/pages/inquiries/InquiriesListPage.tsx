import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import { setLeadHandled } from '../../../cms/leads'
import { useAdminDocument } from '../../hooks/useAdminDocument'
import { adminQueries } from '../../lib/adminQueries'

type Lead = {
  _id: string
  name?: string
  company?: string
  inquiryLabel?: string
  kvaRating?: string
  projectLocation?: string
  handled?: boolean
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

export function LeadsInbox({
  compact = false,
  showHeading = true,
}: {
  compact?: boolean
  showHeading?: boolean
}) {
  const { data, loading, error, reload } = useAdminDocument<Lead[]>(adminQueries.leads)
  const [busyId, setBusyId] = useState<string | null>(null)
  const [actionError, setActionError] = useState<string | null>(null)

  const rows = useMemo(() => {
    return [...(data ?? [])].sort((a, b) => (b.submittedAt ?? '').localeCompare(a.submittedAt ?? ''))
  }, [data])
  const visible = compact ? rows.slice(0, 8) : rows
  const openCount = rows.filter((lead) => !lead.handled).length

  async function toggleHandled(lead: Lead) {
    setBusyId(lead._id)
    setActionError(null)
    try {
      await setLeadHandled(lead._id, !lead.handled)
      await reload()
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Could not update this lead.')
    } finally {
      setBusyId(null)
    }
  }

  if (loading) return <div className="p-6 text-gray-500">Loading leads…</div>
  if (error) return <div className="p-6 text-secondary">{error}</div>

  return (
    <div className={showHeading ? 'p-6 space-y-4' : 'space-y-4'}>
      {showHeading ? (
        <div>
          <h1 className="font-h1 text-h1 text-primary uppercase">Leads</h1>
          <p className="font-body-sm text-body-sm text-gray-500 mt-1 max-w-2xl">
            Quote requests saved from the contact form, newest first. This site does not email you
            when a lead arrives. Check this inbox. Email alerts would need the Blaze plan or a
            third-party form service.
          </p>
        </div>
      ) : null}
      <p className="font-body-sm text-body-sm text-gray-700">
        {openCount} open {openCount === 1 ? 'lead' : 'leads'}
      </p>
      {actionError ? (
        <p className="font-body-sm text-body-sm text-secondary" role="alert">
          {actionError}
        </p>
      ) : null}
      <div className="border border-gray-200 rounded-sm overflow-x-auto bg-white">
        <table className="w-full text-left min-w-[720px]">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {['Received', 'Company', 'Name', 'kVA', 'Location', 'Handled'].map((col) => (
                <th key={col} className="px-4 py-3 font-label text-label text-gray-700 uppercase tracking-wide">
                  {col}
                </th>
              ))}
              <th className="px-4 py-3 font-label text-label text-gray-700 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {visible.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-gray-500 font-body-sm">
                  No leads yet.
                </td>
              </tr>
            ) : (
              visible.map((lead) => (
                <tr key={lead._id} className="border-b border-gray-100 last:border-0">
                  <td className="px-4 py-3 font-body-sm text-body-sm text-gray-700 whitespace-nowrap">
                    {formatDate(lead.submittedAt)}
                  </td>
                  <td className="px-4 py-3 font-body-sm text-body-sm text-gray-700">{lead.company || '—'}</td>
                  <td className="px-4 py-3 font-body-sm text-body-sm text-gray-700">{lead.name || '—'}</td>
                  <td className="px-4 py-3 font-body-sm text-body-sm text-gray-700">{lead.kvaRating || '—'}</td>
                  <td className="px-4 py-3 font-body-sm text-body-sm text-gray-700">{lead.projectLocation || '—'}</td>
                  <td className="px-4 py-3 font-body-sm text-body-sm text-gray-700">{lead.handled ? 'Yes' : 'No'}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <button
                      type="button"
                      disabled={busyId === lead._id}
                      onClick={() => void toggleHandled(lead)}
                      className="font-label text-label text-primary uppercase hover:underline disabled:opacity-50 mr-3"
                    >
                      {lead.handled ? 'Reopen' : 'Mark handled'}
                    </button>
                    <Link
                      to={`/admin/leads/${encodeURIComponent(lead._id)}`}
                      className="font-label text-label text-secondary uppercase hover:underline"
                    >
                      Open
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {compact && rows.length > visible.length ? (
        <Link to="/admin/leads" className="inline-block font-label text-label text-secondary uppercase hover:underline">
          View all {rows.length} leads
        </Link>
      ) : null}
    </div>
  )
}

export function InquiriesListPage() {
  return <LeadsInbox />
}
