import { useNavigate, useParams } from 'react-router-dom'

import { EditorShell } from '../../components/EditorShell'
import { ImageField } from '../../components/ImageField'
import { SpecListEditor } from '../../components/SpecListEditor'
import { TextInput } from '../../components/fields/TextInput'
import { emptyImage } from '../../editors/helpers'
import { useDocumentEditor } from '../../hooks/useDocumentEditor'
import { adminQueries } from '../../lib/adminQueries'
import type { SanityImageWithUrl, Spec } from '../../types/adminDocuments'

type Doc = {
  _id: string
  _type: 'project'
  id: string
  title: string
  category?: string
  categoryLabel?: string
  sector?: string
  location?: string
  image?: SanityImageWithUrl
  specs?: Spec[]
  accent?: string
}

export function ProjectEditPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const isNew = id === 'new'
  const docId = isNew ? `project-${Date.now()}` : decodeURIComponent(id ?? '')

  const { form, setForm, loading, error, dirty, saving, message, onSave, onDiscard } =
    useDocumentEditor<Doc>({
      query: adminQueries.byId,
      params: { id: docId },
      skipLoad: isNew,
      defaultDoc: { _id: docId, _type: 'project', id: '', title: '', specs: [], image: emptyImage() },
    })

  if (!form) return null

  const handleSave = async () => {
    const ok = await onSave()
    if (ok && isNew) navigate(`/admin/projects/${encodeURIComponent(form._id)}`, { replace: true })
  }

  return (
    <EditorShell title={isNew ? 'New Project' : 'Edit Project'} loading={loading && !isNew} error={error} dirty={dirty} saving={saving} message={message} onSave={handleSave} onDiscard={onDiscard}>
      <TextInput label="ID" value={form.id} onChange={(v) => setForm({ ...form, id: v })} />
      <TextInput label="Title" value={form.title} onChange={(v) => setForm({ ...form, title: v })} />
      <TextInput label="Category" value={form.category ?? ''} onChange={(v) => setForm({ ...form, category: v })} />
      <TextInput label="Category label" value={form.categoryLabel ?? ''} onChange={(v) => setForm({ ...form, categoryLabel: v })} />
      <TextInput label="Sector" value={form.sector ?? ''} onChange={(v) => setForm({ ...form, sector: v })} />
      <TextInput label="Location" value={form.location ?? ''} onChange={(v) => setForm({ ...form, location: v })} />
      <ImageField label="Image" value={form.image ?? emptyImage()} onChange={(image) => setForm({ ...form, image })} />
      <SpecListEditor label="Specs" specs={form.specs ?? []} onChange={(specs) => setForm({ ...form, specs })} />
    </EditorShell>
  )
}
