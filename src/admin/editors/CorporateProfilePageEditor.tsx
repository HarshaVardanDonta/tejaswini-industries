import { EditorShell } from '../components/EditorShell'
import { ImageField } from '../components/ImageField'
import { SectionCard } from '../components/SectionCard'
import { TextArea } from '../components/fields/TextArea'
import { TextInput } from '../components/fields/TextInput'
import { useSingletonPage } from '../hooks/useSingletonPage'
import { adminQueries } from '../lib/adminQueries'
import type { SanityImageWithUrl } from '../types/adminDocuments'
import { emptyImage, patchNested } from './helpers'

type CorporateDoc = Record<string, unknown> & {
  hero?: {
    image?: SanityImageWithUrl
    badge?: string
    title?: string
    titleHighlight?: string
    description?: string
    stats?: { value: string; label: string; accent?: string }[]
  }
  profile?: {
    image?: SanityImageWithUrl
    eyebrow?: string
    title?: string
    paragraphs?: string[]
    established?: string
    highlights?: { icon: string; title: string; description: string }[]
  }
}

export function CorporateProfilePageEditor() {
  const { form, setForm, loading, error, dirty, saving, message, onSave, onDiscard } =
    useSingletonPage<CorporateDoc>({
      query: adminQueries.corporateProfilePage,
      docId: 'corporateProfilePage',
      docType: 'corporateProfilePage',
    })

  if (!form && !loading) return <EditorShell title="Corporate Profile" loading={false} error="Document not found." dirty={false} saving={false} message={null} onSave={() => {}} onDiscard={() => {}}>{null}</EditorShell>
  if (!form) return null

  const hero = form.hero ?? {}
  const profile = form.profile ?? {}

  return (
    <EditorShell title="Corporate Profile" loading={loading} error={error} dirty={dirty} saving={saving} message={message} onSave={onSave} onDiscard={onDiscard}>
      <SectionCard title="Hero">
        <ImageField label="Image" value={hero.image ?? emptyImage()} onChange={(image) => setForm(patchNested(form, 'hero', { ...hero, image }))} />
        <TextInput label="Badge" value={hero.badge ?? ''} onChange={(v) => setForm(patchNested(form, 'hero', { ...hero, badge: v }))} />
        <TextInput label="Title" value={hero.title ?? ''} onChange={(v) => setForm(patchNested(form, 'hero', { ...hero, title: v }))} />
        <TextInput label="Title highlight" value={hero.titleHighlight ?? ''} onChange={(v) => setForm(patchNested(form, 'hero', { ...hero, titleHighlight: v }))} />
        <TextArea label="Description" value={hero.description ?? ''} onChange={(v) => setForm(patchNested(form, 'hero', { ...hero, description: v }))} />
        {(hero.stats ?? []).map((stat, i) => (
          <div key={i} className="grid grid-cols-2 gap-3 border border-gray-100 p-3 rounded-sm">
            <TextInput label="Value" value={stat.value} onChange={(value) => { const stats = [...(hero.stats ?? [])]; stats[i] = { ...stats[i], value }; setForm(patchNested(form, 'hero', { ...hero, stats })) }} />
            <TextInput label="Label" value={stat.label} onChange={(label) => { const stats = [...(hero.stats ?? [])]; stats[i] = { ...stats[i], label }; setForm(patchNested(form, 'hero', { ...hero, stats })) }} />
          </div>
        ))}
        <button type="button" className="font-label text-label text-secondary uppercase" onClick={() => setForm(patchNested(form, 'hero', { ...hero, stats: [...(hero.stats ?? []), { value: '', label: '' }] }))}>+ Add stat</button>
      </SectionCard>

      <SectionCard title="Profile">
        <ImageField label="Image" value={profile.image ?? emptyImage()} onChange={(image) => setForm(patchNested(form, 'profile', { ...profile, image }))} />
        <TextInput label="Eyebrow" value={profile.eyebrow ?? ''} onChange={(v) => setForm(patchNested(form, 'profile', { ...profile, eyebrow: v }))} />
        <TextInput label="Title" value={profile.title ?? ''} onChange={(v) => setForm(patchNested(form, 'profile', { ...profile, title: v }))} />
        <TextArea label="Paragraphs (one per line)" value={(profile.paragraphs ?? []).join('\n')} onChange={(v) => setForm(patchNested(form, 'profile', { ...profile, paragraphs: v.split('\n').filter(Boolean) }))} />
        <TextInput label="Established" value={profile.established ?? ''} onChange={(v) => setForm(patchNested(form, 'profile', { ...profile, established: v }))} />
      </SectionCard>
    </EditorShell>
  )
}
