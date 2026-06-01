import { EditorShell } from '../components/EditorShell'
import { ImageField } from '../components/ImageField'
import { SectionCard } from '../components/SectionCard'
import { TextArea } from '../components/fields/TextArea'
import { TextInput } from '../components/fields/TextInput'
import { useSingletonPage } from '../hooks/useSingletonPage'
import { adminQueries } from '../lib/adminQueries'
import type { SanityImageWithUrl } from '../types/adminDocuments'
import { emptyImage, patchNested } from './helpers'

type ServicesDoc = Record<string, unknown> & {
  hero?: { image?: SanityImageWithUrl; eyebrow?: string; title?: string; description?: string }
  coreServices?: { id: string; title: string; description: string; icon: string; iconBg?: string; accent?: string; features?: string[] }[]
  processSteps?: { step: string; title: string; description: string; icon: string; highlight?: boolean }[]
  capabilities?: Record<string, unknown>
  cta?: { title?: string; description?: string }
}

export function ServicesPageEditor() {
  const { form, setForm, loading, error, dirty, saving, message, onSave, onDiscard } =
    useSingletonPage<ServicesDoc>({ query: adminQueries.servicesPage, docId: 'servicesPage', docType: 'servicesPage' })

  if (!form && !loading) return <EditorShell title="Services" loading={false} error="Document not found." dirty={false} saving={false} message={null} onSave={() => {}} onDiscard={() => {}}>{null}</EditorShell>
  if (!form) return null

  const hero = form.hero ?? {}
  const cta = form.cta ?? {}

  return (
    <EditorShell title="Services Page" loading={loading} error={error} dirty={dirty} saving={saving} message={message} onSave={onSave} onDiscard={onDiscard}>
      <SectionCard title="Hero">
        <ImageField label="Image" value={(hero.image as SanityImageWithUrl) ?? emptyImage()} onChange={(image) => setForm(patchNested(form, 'hero', { ...hero, image }))} />
        <TextInput label="Eyebrow" value={hero.eyebrow ?? ''} onChange={(v) => setForm(patchNested(form, 'hero', { ...hero, eyebrow: v }))} />
        <TextInput label="Title" value={hero.title ?? ''} onChange={(v) => setForm(patchNested(form, 'hero', { ...hero, title: v }))} />
        <TextArea label="Description" value={hero.description ?? ''} onChange={(v) => setForm(patchNested(form, 'hero', { ...hero, description: v }))} />
      </SectionCard>

      <SectionCard title="Core Services" defaultOpen={false}>
        {(form.coreServices ?? []).map((svc, i) => (
          <div key={i} className="border border-gray-100 p-4 space-y-2 rounded-sm">
            <TextInput label="ID" value={svc.id} onChange={(id) => { const arr = [...(form.coreServices ?? [])]; arr[i] = { ...arr[i], id }; setForm({ ...form, coreServices: arr }) }} />
            <TextInput label="Title" value={svc.title} onChange={(title) => { const arr = [...(form.coreServices ?? [])]; arr[i] = { ...arr[i], title }; setForm({ ...form, coreServices: arr }) }} />
            <TextArea label="Description" value={svc.description} onChange={(description) => { const arr = [...(form.coreServices ?? [])]; arr[i] = { ...arr[i], description }; setForm({ ...form, coreServices: arr }) }} />
            <TextInput label="Icon" value={svc.icon} onChange={(icon) => { const arr = [...(form.coreServices ?? [])]; arr[i] = { ...arr[i], icon }; setForm({ ...form, coreServices: arr }) }} />
            <TextArea label="Features (one per line)" value={(svc.features ?? []).join('\n')} onChange={(v) => { const arr = [...(form.coreServices ?? [])]; arr[i] = { ...arr[i], features: v.split('\n').filter(Boolean) }; setForm({ ...form, coreServices: arr }) }} />
          </div>
        ))}
        <button type="button" className="font-label text-label text-secondary uppercase" onClick={() => setForm({ ...form, coreServices: [...(form.coreServices ?? []), { id: '', title: '', description: '', icon: '', features: [] }] })}>+ Add service</button>
      </SectionCard>

      <SectionCard title="Process Steps" defaultOpen={false}>
        {(form.processSteps ?? []).map((step, i) => (
          <div key={i} className="border border-gray-100 p-3 space-y-2 rounded-sm">
            <TextInput label="Step" value={step.step} onChange={(v) => { const arr = [...(form.processSteps ?? [])]; arr[i] = { ...arr[i], step: v }; setForm({ ...form, processSteps: arr }) }} />
            <TextInput label="Title" value={step.title} onChange={(v) => { const arr = [...(form.processSteps ?? [])]; arr[i] = { ...arr[i], title: v }; setForm({ ...form, processSteps: arr }) }} />
            <TextArea label="Description" value={step.description} onChange={(v) => { const arr = [...(form.processSteps ?? [])]; arr[i] = { ...arr[i], description: v }; setForm({ ...form, processSteps: arr }) }} />
            <TextInput label="Icon" value={step.icon} onChange={(v) => { const arr = [...(form.processSteps ?? [])]; arr[i] = { ...arr[i], icon: v }; setForm({ ...form, processSteps: arr }) }} />
          </div>
        ))}
        <button type="button" className="font-label text-label text-secondary uppercase" onClick={() => setForm({ ...form, processSteps: [...(form.processSteps ?? []), { step: '', title: '', description: '', icon: '' }] })}>+ Add step</button>
      </SectionCard>

      <SectionCard title="CTA" defaultOpen={false}>
        <TextInput label="Title" value={cta.title ?? ''} onChange={(v) => setForm(patchNested(form, 'cta', { ...cta, title: v }))} />
        <TextArea label="Description" value={cta.description ?? ''} onChange={(v) => setForm(patchNested(form, 'cta', { ...cta, description: v }))} />
      </SectionCard>
    </EditorShell>
  )
}
