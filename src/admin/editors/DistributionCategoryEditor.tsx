import { EditorShell } from '../components/EditorShell'
import { TextArea } from '../components/fields/TextArea'
import { TextInput } from '../components/fields/TextInput'
import { useSingletonPage } from '../hooks/useSingletonPage'
import { adminQueries } from '../lib/adminQueries'

type DistributionCategoryDoc = {
  _id: string
  _type: string
  slug?: string
  title?: string
  description?: string
}

export function DistributionCategoryEditor() {
  const { form, setForm, loading, error, dirty, saving, message, onSave, onDiscard } =
    useSingletonPage<DistributionCategoryDoc>({
      query: adminQueries.distributionCategory,
      docId: 'distributionCategory',
      docType: 'distributionCategory',
    })

  if (!form && !loading) return <EditorShell title="Distribution Category" loading={false} error="Document not found." dirty={false} saving={false} message={null} onSave={() => {}} onDiscard={() => {}}>{null}</EditorShell>
  if (!form) return null

  return (
    <EditorShell title="Distribution Category" description="Listing page header for distribution transformers." loading={loading} error={error} dirty={dirty} saving={saving} message={message} onSave={onSave} onDiscard={onDiscard}>
      <TextInput label="Slug" value={form.slug ?? ''} onChange={(slug) => setForm({ ...form, slug })} />
      <TextInput label="Title" value={form.title ?? ''} onChange={(title) => setForm({ ...form, title })} />
      <TextArea label="Description" value={form.description ?? ''} onChange={(description) => setForm({ ...form, description })} />
    </EditorShell>
  )
}
