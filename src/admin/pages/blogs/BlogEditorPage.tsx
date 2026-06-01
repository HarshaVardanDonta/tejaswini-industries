import { useNavigate, useParams } from 'react-router-dom'

import { EditorShell } from '../../components/EditorShell'
import { ImageField } from '../../components/ImageField'
import { SectionCard } from '../../components/SectionCard'
import { TextArea } from '../../components/fields/TextArea'
import { TextInput } from '../../components/fields/TextInput'
import { ToggleInput } from '../../components/fields/ToggleInput'
import { emptyImage } from '../../editors/helpers'
import { useDocumentEditor } from '../../hooks/useDocumentEditor'
import { adminQueries } from '../../lib/adminQueries'
import { resolveSlug, slugify, toSanitySlug } from '../../lib/adminMutations'
import type { SanityImageWithUrl, SanitySlug } from '../../types/adminDocuments'

type BlogSection = {
  id?: string
  title?: string
  paragraphs?: string[]
  subsections?: { id?: string; title?: string; checklist?: { label: string; text: string }[] }[]
  table?: { headers?: string[]; rows?: { cells: string[] }[] }
  alert?: { title?: string; message?: string }
}

type BlogDoc = {
  _id: string
  _type: 'blogPost'
  id: string
  slug: string | SanitySlug
  title: string
  excerpt?: string
  category?: string
  categoryLabel?: string
  date?: string
  author?: string
  featured?: boolean
  accent?: boolean
  alertMeta?: boolean
  authorRole?: string
  readTime?: string
  breadcrumbLabel?: string
  intro?: string
  image?: SanityImageWithUrl
  authorImage?: SanityImageWithUrl
  sections?: BlogSection[]
  tableOfContents?: { id: string; label: string; indent?: number }[]
}

export function BlogEditorPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const isNew = id === 'new'
  const docId = isNew ? `blogPost-draft-${Date.now()}` : decodeURIComponent(id ?? '')

  const { form, setForm, loading, error, dirty, saving, message, onSave, onDiscard } =
    useDocumentEditor<BlogDoc>({
      query: adminQueries.blogPostFull,
      params: { id: docId },
      skipLoad: isNew,
      defaultDoc: {
        _id: docId,
        _type: 'blogPost',
        id: '',
        slug: '',
        title: '',
        excerpt: '',
        sections: [],
        tableOfContents: [],
        image: emptyImage(),
        authorImage: emptyImage(),
      },
    })

  if (!form) return null

  const handleSave = async () => {
    const slugCurrent = resolveSlug(form.slug) || slugify(form.title)
    const payload = {
      ...form,
      slug: toSanitySlug(slugCurrent),
      _id: form._id.startsWith('blogPost-') ? form._id : `blogPost-${slugCurrent}`,
    }
    const ok = await onSave(payload)
    if (ok) {
      setForm(payload)
      if (isNew) navigate(`/admin/blogs/${encodeURIComponent(payload._id)}`, { replace: true })
    }
  }

  const sections = form.sections ?? []

  return (
    <EditorShell title={isNew ? 'New Blog Post' : 'Edit Blog Post'} loading={loading && !isNew} error={error} dirty={dirty} saving={saving} message={message} onSave={handleSave} onDiscard={onDiscard}>
      <SectionCard title="Metadata">
        <TextInput label="ID" value={form.id} onChange={(v) => setForm({ ...form, id: v })} />
        <TextInput label="Slug" value={resolveSlug(form.slug)} onChange={(v) => setForm({ ...form, slug: v })} hint="Used in URL /blogs/:slug" />
        <TextInput label="Title" value={form.title} onChange={(v) => setForm({ ...form, title: v })} />
        <TextArea label="Excerpt" value={form.excerpt ?? ''} onChange={(v) => setForm({ ...form, excerpt: v })} />
        <TextInput label="Category" value={form.category ?? ''} onChange={(v) => setForm({ ...form, category: v })} />
        <TextInput label="Category label" value={form.categoryLabel ?? ''} onChange={(v) => setForm({ ...form, categoryLabel: v })} />
        <TextInput label="Date" value={form.date ?? ''} onChange={(v) => setForm({ ...form, date: v })} />
        <TextInput label="Author" value={form.author ?? ''} onChange={(v) => setForm({ ...form, author: v })} />
        <TextInput label="Read time" value={form.readTime ?? ''} onChange={(v) => setForm({ ...form, readTime: v })} />
        <ToggleInput label="Featured" checked={!!form.featured} onChange={(featured) => setForm({ ...form, featured })} />
        <ImageField label="Cover image" value={form.image ?? emptyImage()} onChange={(image) => setForm({ ...form, image })} />
        <TextArea label="Intro" value={form.intro ?? ''} onChange={(v) => setForm({ ...form, intro: v })} />
      </SectionCard>

      <SectionCard title="Sections" defaultOpen={false}>
        {sections.map((section, si) => (
          <div key={si} className="border border-gray-200 p-4 space-y-3 rounded-sm">
            <TextInput label="Section ID" value={section.id ?? ''} onChange={(v) => {
              const next = [...sections]
              next[si] = { ...next[si], id: v }
              setForm({ ...form, sections: next })
            }} />
            <TextInput label="Section title" value={section.title ?? ''} onChange={(v) => {
              const next = [...sections]
              next[si] = { ...next[si], title: v }
              setForm({ ...form, sections: next })
            }} />
            <TextArea label="Paragraphs (one per line)" value={(section.paragraphs ?? []).join('\n')} onChange={(v) => {
              const next = [...sections]
              next[si] = { ...next[si], paragraphs: v.split('\n').filter(Boolean) }
              setForm({ ...form, sections: next })
            }} />
            {section.alert ? (
              <>
                <TextInput label="Alert title" value={section.alert.title ?? ''} onChange={(title) => {
                  const next = [...sections]
                  next[si] = { ...next[si], alert: { ...section.alert!, title } }
                  setForm({ ...form, sections: next })
                }} />
                <TextArea label="Alert message" value={section.alert.message ?? ''} onChange={(message) => {
                  const next = [...sections]
                  next[si] = { ...next[si], alert: { ...section.alert!, message } }
                  setForm({ ...form, sections: next })
                }} />
              </>
            ) : null}
            <button type="button" className="font-label text-label text-secondary uppercase" onClick={() => {
              const next = sections.filter((_, i) => i !== si)
              setForm({ ...form, sections: next })
            }}>Remove section</button>
          </div>
        ))}
        <div className="flex flex-wrap gap-2">
          <button type="button" className="font-label text-label text-secondary uppercase" onClick={() => setForm({ ...form, sections: [...sections, { id: '', title: '', paragraphs: [] }] })}>+ Paragraph section</button>
          <button type="button" className="font-label text-label text-secondary uppercase" onClick={() => setForm({ ...form, sections: [...sections, { id: '', title: '', alert: { title: '', message: '' } }] })}>+ Alert section</button>
        </div>
      </SectionCard>

      <SectionCard title="Table of contents" defaultOpen={false}>
        {(form.tableOfContents ?? []).map((item, i) => (
          <div key={i} className="grid grid-cols-2 gap-3">
            <TextInput label="ID" value={item.id} onChange={(id) => {
              const toc = [...(form.tableOfContents ?? [])]
              toc[i] = { ...toc[i], id }
              setForm({ ...form, tableOfContents: toc })
            }} />
            <TextInput label="Label" value={item.label} onChange={(label) => {
              const toc = [...(form.tableOfContents ?? [])]
              toc[i] = { ...toc[i], label }
              setForm({ ...form, tableOfContents: toc })
            }} />
          </div>
        ))}
        <button type="button" className="font-label text-label text-secondary uppercase" onClick={() => setForm({ ...form, tableOfContents: [...(form.tableOfContents ?? []), { id: '', label: '' }] })}>+ Add TOC item</button>
      </SectionCard>
    </EditorShell>
  )
}
