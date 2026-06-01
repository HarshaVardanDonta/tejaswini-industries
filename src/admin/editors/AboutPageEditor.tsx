import { EditorShell } from '../components/EditorShell'
import { ImageField } from '../components/ImageField'
import { SectionCard } from '../components/SectionCard'
import { TextArea } from '../components/fields/TextArea'
import { TextInput } from '../components/fields/TextInput'
import { useSingletonPage } from '../hooks/useSingletonPage'
import { adminQueries } from '../lib/adminQueries'
import type { SanityImageWithUrl } from '../types/adminDocuments'
import { emptyImage, patchNested } from './helpers'

type AboutDoc = Record<string, unknown> & {
  hero?: { title?: string; description?: string; image?: SanityImageWithUrl }
  overview?: { title?: string; paragraphs?: string[]; isoImage?: SanityImageWithUrl; highlights?: { icon: string; label: string }[] }
  visionMission?: { icon: string; title: string; description: string; variant?: string }[]
  cta?: { title?: string; description?: string; buttonLabel?: string }
}

export function AboutPageEditor() {
  const { form, setForm, loading, error, dirty, saving, message, onSave, onDiscard } =
    useSingletonPage<AboutDoc>({ query: adminQueries.aboutPage, docId: 'aboutPage', docType: 'aboutPage' })

  if (!form && !loading) return <EditorShell title="About" loading={false} error="Document not found." dirty={false} saving={false} message={null} onSave={() => {}} onDiscard={() => {}}>{null}</EditorShell>
  if (!form) return null

  const hero = form.hero ?? {}
  const overview = form.overview ?? {}
  const cta = form.cta ?? {}

  return (
    <EditorShell title="About Page" loading={loading} error={error} dirty={dirty} saving={saving} message={message} onSave={onSave} onDiscard={onDiscard}>
      <SectionCard title="Hero">
        <TextInput label="Title" value={hero.title ?? ''} onChange={(v) => setForm(patchNested(form, 'hero', { ...hero, title: v }))} />
        <TextArea label="Description" value={hero.description ?? ''} onChange={(v) => setForm(patchNested(form, 'hero', { ...hero, description: v }))} />
        <ImageField label="Image" value={hero.image ?? emptyImage()} onChange={(image) => setForm(patchNested(form, 'hero', { ...hero, image }))} />
      </SectionCard>

      <SectionCard title="Overview">
        <TextInput label="Title" value={overview.title ?? ''} onChange={(v) => setForm(patchNested(form, 'overview', { ...overview, title: v }))} />
        <TextArea label="Paragraphs (one per line)" value={(overview.paragraphs ?? []).join('\n')} onChange={(v) => setForm(patchNested(form, 'overview', { ...overview, paragraphs: v.split('\n').filter(Boolean) }))} />
        <ImageField label="ISO image" value={overview.isoImage ?? emptyImage()} onChange={(isoImage) => setForm(patchNested(form, 'overview', { ...overview, isoImage }))} />
      </SectionCard>

      <SectionCard title="Vision & Mission" defaultOpen={false}>
        {(form.visionMission ?? []).map((item, i) => (
          <div key={i} className="border border-gray-100 p-3 space-y-2 rounded-sm">
            <TextInput label="Icon" value={item.icon} onChange={(icon) => { const arr = [...(form.visionMission ?? [])]; arr[i] = { ...arr[i], icon }; setForm({ ...form, visionMission: arr }) }} />
            <TextInput label="Title" value={item.title} onChange={(title) => { const arr = [...(form.visionMission ?? [])]; arr[i] = { ...arr[i], title }; setForm({ ...form, visionMission: arr }) }} />
            <TextArea label="Description" value={item.description} onChange={(description) => { const arr = [...(form.visionMission ?? [])]; arr[i] = { ...arr[i], description }; setForm({ ...form, visionMission: arr }) }} />
          </div>
        ))}
        <button type="button" className="font-label text-label text-secondary uppercase" onClick={() => setForm({ ...form, visionMission: [...(form.visionMission ?? []), { icon: '', title: '', description: '' }] })}>+ Add block</button>
      </SectionCard>

      <SectionCard title="CTA" defaultOpen={false}>
        <TextInput label="Title" value={cta.title ?? ''} onChange={(v) => setForm(patchNested(form, 'cta', { ...cta, title: v }))} />
        <TextArea label="Description" value={cta.description ?? ''} onChange={(v) => setForm(patchNested(form, 'cta', { ...cta, description: v }))} />
        <TextInput label="Button label" value={cta.buttonLabel ?? ''} onChange={(v) => setForm(patchNested(form, 'cta', { ...cta, buttonLabel: v }))} />
      </SectionCard>
    </EditorShell>
  )
}
