import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'

import { EditorShell } from '../../components/EditorShell'
import { ImageField } from '../../components/ImageField'
import { SpecListEditor } from '../../components/SpecListEditor'
import { TextArea } from '../../components/fields/TextArea'
import { TextInput } from '../../components/fields/TextInput'
import { emptyImage } from '../../editors/helpers'
import { useDocumentEditor } from '../../hooks/useDocumentEditor'
import { adminQueries } from '../../lib/adminQueries'
import { resolveSlug, slugify, toSanitySlug } from '../../lib/adminMutations'
import type { SanityImageWithUrl, SanitySlug, Spec } from '../../types/adminDocuments'

type Doc = {
  _id: string
  _type: 'productDetail'
  categoryId: string
  slug: string | SanitySlug
  sku: string
  title: string
  breadcrumbLabel?: string
  description?: string
  images?: { main?: SanityImageWithUrl; front?: SanityImageWithUrl; detail?: SanityImageWithUrl }
  quickSpecs?: Spec[]
  technicalParameters?: { parameter: string; value: string }[]
}

export function ProductDetailEditPage() {
  const { id } = useParams<{ id: string }>()
  const [searchParams] = useSearchParams()
  const categoryIdFromQuery = searchParams.get('categoryId') ?? ''
  const navigate = useNavigate()
  const isNew = id === 'new'
  const docId = isNew ? `productDetail-${slugify('new')}-${Date.now()}` : decodeURIComponent(id ?? '')

  const { form, setForm, loading, error, dirty, saving, message, onSave, onDiscard } =
    useDocumentEditor<Doc>({
      query: adminQueries.byId,
      params: { id: docId },
      skipLoad: isNew,
      defaultDoc: {
        _id: docId,
        _type: 'productDetail',
        categoryId: categoryIdFromQuery,
        slug: '',
        sku: '',
        title: '',
        description: '',
        images: { main: emptyImage(), front: emptyImage(), detail: emptyImage() },
        quickSpecs: [],
        technicalParameters: [],
      },
    })

  if (!form) return null

  const images = form.images ?? {}

  const handleSave = async () => {
    const payload = {
      ...form,
      categoryId: form.categoryId || categoryIdFromQuery,
      slug: toSanitySlug(resolveSlug(form.slug) || slugify(form.title)),
    }
    const ok = await onSave(payload)
    if (ok && isNew) navigate(`/admin/products/details/${encodeURIComponent(form._id)}`, { replace: true })
  }

  return (
    <EditorShell title={isNew ? 'New product' : 'Edit product'} loading={loading && !isNew} error={error} dirty={dirty} saving={saving} message={message} onSave={handleSave} onDiscard={onDiscard}>
      <p className="font-body-sm text-body-sm text-gray-600 -mt-2 mb-2">
        <Link to="/admin/products/categories" className="text-secondary hover:underline">
          ← Back to categories
        </Link>
        {form.categoryId || categoryIdFromQuery ? (
          <>
            {' · '}
            <span className="font-label text-label text-gray-500 uppercase">Category: </span>
            {form.categoryId || categoryIdFromQuery}
          </>
        ) : null}
      </p>
      <TextInput
        label="Category ID"
        value={form.categoryId ?? ''}
        onChange={(v) => setForm({ ...form, categoryId: v })}
        hint="Must match a product category id"
      />
      <TextInput label="Slug" value={resolveSlug(form.slug)} onChange={(v) => setForm({ ...form, slug: v })} />
      <TextInput label="SKU" value={form.sku} onChange={(v) => setForm({ ...form, sku: v })} />
      <TextInput label="Title" value={form.title} onChange={(v) => setForm({ ...form, title: v })} />
      <TextInput label="Breadcrumb label" value={form.breadcrumbLabel ?? ''} onChange={(v) => setForm({ ...form, breadcrumbLabel: v })} />
      <TextArea label="Description" value={form.description ?? ''} onChange={(v) => setForm({ ...form, description: v })} />
      <ImageField label="Main image" value={images.main ?? emptyImage()} onChange={(main) => setForm({ ...form, images: { ...images, main } })} />
      <ImageField label="Front image" value={images.front ?? emptyImage()} onChange={(front) => setForm({ ...form, images: { ...images, front } })} />
      <SpecListEditor label="Quick specs" specs={form.quickSpecs ?? []} onChange={(quickSpecs) => setForm({ ...form, quickSpecs })} />
      <div className="space-y-3">
        <p className="font-label text-label text-gray-700 uppercase">Technical parameters</p>
        {(form.technicalParameters ?? []).map((row, i) => (
          <div key={i} className="grid grid-cols-2 gap-3 border border-gray-100 p-3 rounded-sm">
            <TextInput label="Parameter" value={row.parameter} onChange={(parameter) => {
              const arr = [...(form.technicalParameters ?? [])]
              arr[i] = { ...arr[i], parameter }
              setForm({ ...form, technicalParameters: arr })
            }} />
            <TextInput label="Value" value={row.value} onChange={(value) => {
              const arr = [...(form.technicalParameters ?? [])]
              arr[i] = { ...arr[i], value }
              setForm({ ...form, technicalParameters: arr })
            }} />
          </div>
        ))}
        <button type="button" className="font-label text-label text-secondary uppercase" onClick={() => setForm({ ...form, technicalParameters: [...(form.technicalParameters ?? []), { parameter: '', value: '' }] })}>+ Add parameter</button>
      </div>
    </EditorShell>
  )
}
