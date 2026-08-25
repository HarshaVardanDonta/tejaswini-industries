import { EditorShell } from '../components/EditorShell'
import { ImageField } from '../components/ImageField'
import { SectionCard } from '../components/SectionCard'
import { TextArea } from '../components/fields/TextArea'
import { TextInput } from '../components/fields/TextInput'
import { useSingletonPage } from '../hooks/useSingletonPage'
import { adminQueries } from '../lib/adminQueries'
import type { SanityImageWithUrl } from '../types/adminDocuments'
import { emptyImage, patchNested } from './helpers'

type ContactDoc = Record<string, unknown> & {
  hero?: { title?: string; description?: string }
  infoCards?: { icon: string; title: string; lines: string[]; mono?: boolean }[]
  whatsapp?: { title?: string; description?: string; buttonLabel?: string }
  map?: { image?: SanityImageWithUrl; label?: string }
  form?: { title?: string; submitLabel?: string }
  inquiryTypes?: { value: string; label: string }[]
}

export function ContactPageEditor() {
  const { form, setForm, loading, error, dirty, saving, message, onSave, onDiscard } =
    useSingletonPage<ContactDoc>({ query: adminQueries.contactPage, docId: 'contactPage', docType: 'contactPage' })

  if (!form && !loading) return <EditorShell title="Contact" loading={false} error="Document not found." dirty={false} saving={false} message={null} onSave={() => {}} onDiscard={() => {}}>{null}</EditorShell>
  if (!form) return null

  const hero = form.hero ?? {}
  const whatsapp = form.whatsapp ?? {}
  const map = form.map ?? {}
  const contactForm = form.form ?? {}

  return (
    <EditorShell title="Contact Page" loading={loading} error={error} dirty={dirty} saving={saving} message={message} onSave={onSave} onDiscard={onDiscard}>
      <SectionCard title="Hero">
        <TextInput label="Title" value={hero.title ?? ''} onChange={(v) => setForm(patchNested(form, 'hero', { ...hero, title: v }))} />
        <TextArea label="Description" value={hero.description ?? ''} onChange={(v) => setForm(patchNested(form, 'hero', { ...hero, description: v }))} />
      </SectionCard>

      <SectionCard title="Info Cards" defaultOpen={false}>
        {(form.infoCards ?? []).map((card, i) => (
          <div key={i} className="border border-gray-100 p-3 space-y-2 rounded-sm">
            <TextInput label="Icon" value={card.icon} onChange={(icon) => { const arr = [...(form.infoCards ?? [])]; arr[i] = { ...arr[i], icon }; setForm({ ...form, infoCards: arr }) }} />
            <TextInput label="Title" value={card.title} onChange={(title) => { const arr = [...(form.infoCards ?? [])]; arr[i] = { ...arr[i], title }; setForm({ ...form, infoCards: arr }) }} />
            <TextArea label="Lines (one per line)" value={(card.lines ?? []).join('\n')} onChange={(v) => { const arr = [...(form.infoCards ?? [])]; arr[i] = { ...arr[i], lines: v.split('\n').filter(Boolean) }; setForm({ ...form, infoCards: arr }) }} />
          </div>
        ))}
        <button type="button" className="font-label text-label text-secondary uppercase" onClick={() => setForm({ ...form, infoCards: [...(form.infoCards ?? []), { icon: '', title: '', lines: [] }] })}>+ Add card</button>
      </SectionCard>

      <SectionCard title="WhatsApp" defaultOpen={false}>
        <TextInput label="Title" value={whatsapp.title ?? ''} onChange={(v) => setForm(patchNested(form, 'whatsapp', { ...whatsapp, title: v }))} />
        <TextArea label="Description" value={whatsapp.description ?? ''} onChange={(v) => setForm(patchNested(form, 'whatsapp', { ...whatsapp, description: v }))} />
        <TextInput label="Button label" value={whatsapp.buttonLabel ?? ''} onChange={(v) => setForm(patchNested(form, 'whatsapp', { ...whatsapp, buttonLabel: v }))} />
      </SectionCard>

      <SectionCard title="Map" defaultOpen={false}>
        <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-3">
          The live site embeds Google Maps at the corporate office coordinates. The image
          below is used for alt text context only.
        </p>
        <ImageField label="Map image (legacy / alt)" value={map.image ?? emptyImage()} onChange={(image) => setForm(patchNested(form, 'map', { ...map, image }))} />
        <TextInput label="Label" value={map.label ?? ''} onChange={(v) => setForm(patchNested(form, 'map', { ...map, label: v }))} />
      </SectionCard>

      <SectionCard title="Form" defaultOpen={false}>
        <TextInput label="Title" value={contactForm.title ?? ''} onChange={(v) => setForm(patchNested(form, 'form', { ...contactForm, title: v }))} />
        <TextInput label="Submit label" value={contactForm.submitLabel ?? ''} onChange={(v) => setForm(patchNested(form, 'form', { ...contactForm, submitLabel: v }))} />
      </SectionCard>

      <SectionCard title="Inquiry Types" defaultOpen={false}>
        {(form.inquiryTypes ?? []).map((item, i) => (
          <div key={i} className="grid grid-cols-2 gap-3">
            <TextInput label="Value" value={item.value} onChange={(value) => { const arr = [...(form.inquiryTypes ?? [])]; arr[i] = { ...arr[i], value }; setForm({ ...form, inquiryTypes: arr }) }} />
            <TextInput label="Label" value={item.label} onChange={(label) => { const arr = [...(form.inquiryTypes ?? [])]; arr[i] = { ...arr[i], label }; setForm({ ...form, inquiryTypes: arr }) }} />
          </div>
        ))}
        <button type="button" className="font-label text-label text-secondary uppercase" onClick={() => setForm({ ...form, inquiryTypes: [...(form.inquiryTypes ?? []), { value: '', label: '' }] })}>+ Add type</button>
      </SectionCard>
    </EditorShell>
  )
}
