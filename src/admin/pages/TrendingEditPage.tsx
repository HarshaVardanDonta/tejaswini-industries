import { useNavigate, useParams } from 'react-router-dom'

import { EditorShell } from '../components/EditorShell'
import { TextInput } from '../components/fields/TextInput'
import { useDocumentEditor } from '../hooks/useDocumentEditor'
import { adminQueries } from '../lib/adminQueries'

type Doc = { _id: string; _type: 'trendingArticle'; rank: number; title: string; readTime: string; order?: number }

export function TrendingEditPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const isNew = id === 'new'
  const docId = isNew ? `trendingArticle-${Date.now()}` : decodeURIComponent(id ?? '')

  const { form, setForm, loading, error, dirty, saving, message, onSave, onDiscard } =
    useDocumentEditor<Doc>({
      query: adminQueries.byId,
      params: { id: docId },
      skipLoad: isNew,
      defaultDoc: { _id: docId, _type: 'trendingArticle', rank: 1, title: '', readTime: '', order: 0 },
    })

  if (!form) return null

  const handleSave = async () => {
    const ok = await onSave()
    if (ok && isNew) navigate(`/admin/trending/${encodeURIComponent(form._id)}`, { replace: true })
  }

  return (
    <EditorShell title={isNew ? 'New Trending Article' : 'Edit Trending Article'} loading={loading && !isNew} error={error} dirty={dirty} saving={saving} message={message} onSave={handleSave} onDiscard={onDiscard}>
      <TextInput label="Rank" type="number" value={String(form.rank)} onChange={(v) => setForm({ ...form, rank: Number(v) || 0 })} />
      <TextInput label="Title" value={form.title} onChange={(v) => setForm({ ...form, title: v })} />
      <TextInput label="Read time" value={form.readTime} onChange={(v) => setForm({ ...form, readTime: v })} />
      <TextInput label="Order" type="number" value={String(form.order ?? 0)} onChange={(v) => setForm({ ...form, order: Number(v) || 0 })} />
    </EditorShell>
  )
}
