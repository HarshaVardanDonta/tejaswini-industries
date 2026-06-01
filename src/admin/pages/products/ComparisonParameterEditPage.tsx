import { useNavigate, useParams } from 'react-router-dom'

import { EditorShell } from '../../components/EditorShell'
import { TextInput } from '../../components/fields/TextInput'
import { useDocumentEditor } from '../../hooks/useDocumentEditor'
import { adminQueries } from '../../lib/adminQueries'

type Doc = { _id: string; _type: 'comparisonParameter'; key: string; label: string; hint?: string; order?: number }

export function ComparisonParameterEditPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const isNew = id === 'new'
  const docId = isNew ? `comparisonParameter-${Date.now()}` : decodeURIComponent(id ?? '')

  const { form, setForm, loading, error, dirty, saving, message, onSave, onDiscard } =
    useDocumentEditor<Doc>({
      query: adminQueries.byId,
      params: { id: docId },
      skipLoad: isNew,
      defaultDoc: { _id: docId, _type: 'comparisonParameter', key: '', label: '', hint: '', order: 0 },
    })

  if (!form) return null

  const handleSave = async () => {
    const ok = await onSave()
    if (ok && isNew) navigate(`/admin/products/comparison/${encodeURIComponent(form._id)}`, { replace: true })
  }

  return (
    <EditorShell title={isNew ? 'New Parameter' : 'Edit Parameter'} loading={loading && !isNew} error={error} dirty={dirty} saving={saving} message={message} onSave={handleSave} onDiscard={onDiscard}>
      <TextInput label="Key" value={form.key} onChange={(v) => setForm({ ...form, key: v })} />
      <TextInput label="Label" value={form.label} onChange={(v) => setForm({ ...form, label: v })} />
      <TextInput label="Hint" value={form.hint ?? ''} onChange={(v) => setForm({ ...form, hint: v })} />
      <TextInput label="Order" type="number" value={String(form.order ?? 0)} onChange={(v) => setForm({ ...form, order: Number(v) || 0 })} />
    </EditorShell>
  )
}
