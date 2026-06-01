import { EditorShell } from '../components/EditorShell'
import { ImageField } from '../components/ImageField'
import { SectionCard } from '../components/SectionCard'
import { TextArea } from '../components/fields/TextArea'
import { TextInput } from '../components/fields/TextInput'
import { useSingletonPage } from '../hooks/useSingletonPage'
import { adminQueries } from '../lib/adminQueries'
import type { SanityImageWithUrl } from '../types/adminDocuments'
import { emptyImage, patchNested } from './helpers'

type LandingDoc = {
  _id: string
  _type: string
  hero?: {
    image?: SanityImageWithUrl
    badgePrimary?: string
    badgeSecondary?: string
    title?: string
    description?: string
    primaryCta?: string
    secondaryCta?: string
  }
  companyIntro?: {
    title?: string
    paragraphs?: string[]
    image?: SanityImageWithUrl
    stats?: { value: string; label: string }[]
  }
  portfolio?: {
    eyebrow?: string
    title?: string
    linkLabel?: string
    items?: {
      title: string
      description: string
      image?: SanityImageWithUrl
      size?: string
      overlayPrimary?: boolean
    }[]
  }
  technicalSupremacy?: {
    title?: string
    features?: { icon: string; title: string; description: string; accent?: string }[]
  }
  ctaBanner?: { title?: string; description?: string; buttonLabel?: string }
}

export function LandingPageEditor() {
  const { form, setForm, loading, error, dirty, saving, message, onSave, onDiscard } =
    useSingletonPage<LandingDoc>({
      query: adminQueries.landingPage,
      docId: 'landingPage',
      docType: 'landingPage',
    })

  if (!form && !loading) {
    return (
      <EditorShell
        title="Landing Page"
        loading={false}
        error="Document not found. Run seed script first."
        dirty={false}
        saving={false}
        message={null}
        onSave={() => {}}
        onDiscard={() => {}}
      >
        {null}
      </EditorShell>
    )
  }

  if (!form) return null

  const hero = form.hero ?? {}
  const companyIntro = form.companyIntro ?? {}
  const portfolio = form.portfolio ?? {}
  const technical = form.technicalSupremacy ?? {}
  const cta = form.ctaBanner ?? {}

  return (
    <EditorShell
      title="Landing Page"
      description="Homepage hero, intro, portfolio, features, and CTA."
      loading={loading}
      error={error}
      dirty={dirty}
      saving={saving}
      message={message}
      onSave={onSave}
      onDiscard={onDiscard}
    >
      <SectionCard title="Hero">
        <ImageField
          label="Hero image"
          value={hero.image ?? emptyImage()}
          onChange={(image) => setForm(patchNested(form, 'hero', { ...hero, image }))}
        />
        <TextInput label="Badge primary" value={hero.badgePrimary ?? ''} onChange={(v) => setForm(patchNested(form, 'hero', { ...hero, badgePrimary: v }))} />
        <TextInput label="Badge secondary" value={hero.badgeSecondary ?? ''} onChange={(v) => setForm(patchNested(form, 'hero', { ...hero, badgeSecondary: v }))} />
        <TextInput label="Title" value={hero.title ?? ''} onChange={(v) => setForm(patchNested(form, 'hero', { ...hero, title: v }))} />
        <TextArea label="Description" value={hero.description ?? ''} onChange={(v) => setForm(patchNested(form, 'hero', { ...hero, description: v }))} />
        <TextInput label="Primary CTA" value={hero.primaryCta ?? ''} onChange={(v) => setForm(patchNested(form, 'hero', { ...hero, primaryCta: v }))} />
        <TextInput label="Secondary CTA" value={hero.secondaryCta ?? ''} onChange={(v) => setForm(patchNested(form, 'hero', { ...hero, secondaryCta: v }))} />
      </SectionCard>

      <SectionCard title="Company Intro">
        <TextInput label="Title" value={companyIntro.title ?? ''} onChange={(v) => setForm(patchNested(form, 'companyIntro', { ...companyIntro, title: v }))} />
        <TextArea label="Paragraphs (one per line)" value={(companyIntro.paragraphs ?? []).join('\n')} onChange={(v) => setForm(patchNested(form, 'companyIntro', { ...companyIntro, paragraphs: v.split('\n').filter(Boolean) }))} />
        <ImageField label="Image" value={companyIntro.image ?? emptyImage()} onChange={(image) => setForm(patchNested(form, 'companyIntro', { ...companyIntro, image }))} />
        {(companyIntro.stats ?? []).map((stat, i) => (
          <div key={i} className="grid grid-cols-2 gap-3 border border-gray-100 p-3 rounded-sm">
            <TextInput label="Value" value={stat.value} onChange={(value) => {
              const stats = [...(companyIntro.stats ?? [])]
              stats[i] = { ...stats[i], value }
              setForm(patchNested(form, 'companyIntro', { ...companyIntro, stats }))
            }} />
            <TextInput label="Label" value={stat.label} onChange={(label) => {
              const stats = [...(companyIntro.stats ?? [])]
              stats[i] = { ...stats[i], label }
              setForm(patchNested(form, 'companyIntro', { ...companyIntro, stats }))
            }} />
          </div>
        ))}
        <button type="button" className="font-label text-label text-secondary uppercase" onClick={() => setForm(patchNested(form, 'companyIntro', { ...companyIntro, stats: [...(companyIntro.stats ?? []), { value: '', label: '' }] }))}>+ Add stat</button>
      </SectionCard>

      <SectionCard title="Portfolio" defaultOpen={false}>
        <TextInput label="Eyebrow" value={portfolio.eyebrow ?? ''} onChange={(v) => setForm(patchNested(form, 'portfolio', { ...portfolio, eyebrow: v }))} />
        <TextInput label="Title" value={portfolio.title ?? ''} onChange={(v) => setForm(patchNested(form, 'portfolio', { ...portfolio, title: v }))} />
        <TextInput label="Link label" value={portfolio.linkLabel ?? ''} onChange={(v) => setForm(patchNested(form, 'portfolio', { ...portfolio, linkLabel: v }))} />
        {(portfolio.items ?? []).map((item, i) => (
          <div key={i} className="border border-gray-100 p-4 space-y-3 rounded-sm">
            <TextInput label="Item title" value={item.title} onChange={(title) => {
              const items = [...(portfolio.items ?? [])]
              items[i] = { ...items[i], title }
              setForm(patchNested(form, 'portfolio', { ...portfolio, items }))
            }} />
            <TextArea label="Description" value={item.description} onChange={(description) => {
              const items = [...(portfolio.items ?? [])]
              items[i] = { ...items[i], description }
              setForm(patchNested(form, 'portfolio', { ...portfolio, items }))
            }} />
            <ImageField label="Image" value={item.image ?? emptyImage()} onChange={(image) => {
              const items = [...(portfolio.items ?? [])]
              items[i] = { ...items[i], image }
              setForm(patchNested(form, 'portfolio', { ...portfolio, items }))
            }} />
          </div>
        ))}
        <button type="button" className="font-label text-label text-secondary uppercase" onClick={() => setForm(patchNested(form, 'portfolio', { ...portfolio, items: [...(portfolio.items ?? []), { title: '', description: '', size: 'medium', overlayPrimary: false }] }))}>+ Add item</button>
      </SectionCard>

      <SectionCard title="Technical Supremacy" defaultOpen={false}>
        <TextInput label="Title" value={technical.title ?? ''} onChange={(v) => setForm(patchNested(form, 'technicalSupremacy', { ...technical, title: v }))} />
        {(technical.features ?? []).map((feat, i) => (
          <div key={i} className="border border-gray-100 p-3 space-y-2 rounded-sm">
            <TextInput label="Icon" value={feat.icon} onChange={(icon) => {
              const features = [...(technical.features ?? [])]
              features[i] = { ...features[i], icon }
              setForm(patchNested(form, 'technicalSupremacy', { ...technical, features }))
            }} />
            <TextInput label="Title" value={feat.title} onChange={(title) => {
              const features = [...(technical.features ?? [])]
              features[i] = { ...features[i], title }
              setForm(patchNested(form, 'technicalSupremacy', { ...technical, features }))
            }} />
            <TextArea label="Description" value={feat.description} onChange={(description) => {
              const features = [...(technical.features ?? [])]
              features[i] = { ...features[i], description }
              setForm(patchNested(form, 'technicalSupremacy', { ...technical, features }))
            }} />
          </div>
        ))}
        <button type="button" className="font-label text-label text-secondary uppercase" onClick={() => setForm(patchNested(form, 'technicalSupremacy', { ...technical, features: [...(technical.features ?? []), { icon: '', title: '', description: '' }] }))}>+ Add feature</button>
      </SectionCard>

      <SectionCard title="CTA Banner" defaultOpen={false}>
        <TextInput label="Title" value={cta.title ?? ''} onChange={(v) => setForm(patchNested(form, 'ctaBanner', { ...cta, title: v }))} />
        <TextArea label="Description" value={cta.description ?? ''} onChange={(v) => setForm(patchNested(form, 'ctaBanner', { ...cta, description: v }))} />
        <TextInput label="Button label" value={cta.buttonLabel ?? ''} onChange={(v) => setForm(patchNested(form, 'ctaBanner', { ...cta, buttonLabel: v }))} />
      </SectionCard>
    </EditorShell>
  )
}
