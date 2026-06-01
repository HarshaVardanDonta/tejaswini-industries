import { useNavigate, useParams } from 'react-router-dom'

import { EditorShell } from '../../components/EditorShell'
import { TextInput } from '../../components/fields/TextInput'
import { useDocumentEditor } from '../../hooks/useDocumentEditor'
import { adminQueries } from '../../lib/adminQueries'

type Doc = { _id: string; _type: 'commissionRow'; id: string; sector: string; deliverable: string; location: string; status?: string }

export function CommissionEditPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const isNew = id === 'new'
  const docId = isNew ? `commissionRow-${Date.now()}` : decodeURIComponent(id ?? '')

  const { form, setForm, loading, error, dirty, saving, message, onSave, onDiscard } =
    useDocumentEditor<Doc>({
      query: adminQueries.byId,
      params: { id: docId },
      skipLoad: isNew,
      defaultDoc: { _id: docId, _type: 'commissionRow', id: '', sector: '', deliverable: '', location: '', status: '' },
    })

  if (!form) return null

  const handleSave = async () => {
    const ok = await onSave()
    if (ok && isNew) navigate(`/admin/commissions/${encodeURIComponent(form._id)}`, { replace: true })
  }

  return (
    <EditorShell title={isNew ? 'New Commission' : 'Edit Commission'} loading={loading && !isNew} error={error} dirty={dirty} saving={saving} message={message} onSave={handleSave} onDiscard={onDiscard}>
      <TextInput label="ID" value={form.id} onChange={(v) => setForm({ ...form, id: v })} />
      <TextInput label="Sector" value={form.sector} onChange={(v) => setForm({ ...form, sector: v })} />
      <TextInput label="Deliverable" value={form.deliverable} onChange={(v) => setForm({ ...form, deliverable: v })} />
      <TextInput label="Location" value={form.location} onChange={(v) => setForm({ ...form, location: v })} />
      <TextInput label="Status" value={form.status ?? ''} onChange={(v) => setForm({ ...form, status: v })} />
    </EditorShell>
  )
}
