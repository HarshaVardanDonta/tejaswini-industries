import { useNavigate, useParams } from 'react-router-dom'

import { EditorShell } from '../../components/EditorShell'
import { ImageField } from '../../components/ImageField'
import { TextArea } from '../../components/fields/TextArea'
import { TextInput } from '../../components/fields/TextInput'
import { emptyImage } from '../../editors/helpers'
import { useDocumentEditor } from '../../hooks/useDocumentEditor'
import { adminQueries } from '../../lib/adminQueries'
import type { SanityImageWithUrl } from '../../types/adminDocuments'

type Doc = {
  _id: string
  _type: 'productCategory'
  id: string
  title: string
  description: string
  image?: SanityImageWithUrl
  technicalSpecs?: string[]
  bodyParagraphs?: string[]
}

export function ProductCategoryEditPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const isNew = id === 'new'
  const docId = isNew ? `productCategory-${Date.now()}` : decodeURIComponent(id ?? '')

  const { form, setForm, loading, error, dirty, saving, message, onSave, onDiscard } =
    useDocumentEditor<Doc>({
      query: adminQueries.byId,
      params: { id: docId },
      skipLoad: isNew,
      defaultDoc: {
        _id: docId,
        _type: 'productCategory',
        id: '',
        title: '',
        description: '',
        technicalSpecs: [],
        bodyParagraphs: [],
        image: emptyImage(),
      },
    })

  if (!isNew && !form && !loading) {
    return <EditorShell title="Category" loading={false} error="Not found" dirty={false} saving={false} message={null} onSave={() => {}} onDiscard={() => {}}>{null}</EditorShell>
  }
  if (!form) return null

  const handleSave = async () => {
    const ok = await onSave()
    if (ok && isNew) navigate(`/admin/products/categories/${encodeURIComponent(form._id)}`, { replace: true })
  }

  return (
    <EditorShell title={isNew ? 'New Category' : 'Edit Category'} loading={loading && !isNew} error={error} dirty={dirty} saving={saving} message={message} onSave={handleSave} onDiscard={onDiscard}>
      <TextInput label="ID" value={form.id} onChange={(v) => setForm({ ...form, id: v })} />
      <TextInput label="Title" value={form.title} onChange={(v) => setForm({ ...form, title: v })} />
      <TextArea label="Short description (card blurb)" value={form.description} onChange={(v) => setForm({ ...form, description: v })} />
      <ImageField label="Image" value={form.image ?? emptyImage()} onChange={(image) => setForm({ ...form, image })} />
      <TextArea
        label="Technical specifications (one per line)"
        value={(form.technicalSpecs ?? []).join('\n')}
        onChange={(v) => setForm({ ...form, technicalSpecs: v.split('\n').filter(Boolean) })}
      />
      <TextArea
        label="Description paragraphs (separate with a blank line)"
        value={(form.bodyParagraphs ?? []).join('\n\n')}
        onChange={(v) =>
          setForm({
            ...form,
            bodyParagraphs: v
              .split(/\n\s*\n/)
              .map((paragraph) => paragraph.trim())
              .filter(Boolean),
          })
        }
      />
    </EditorShell>
  )
}
