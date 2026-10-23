import { EditorShell } from '../components/EditorShell'
import { TextArea } from '../components/fields/TextArea'
import { TextInput } from '../components/fields/TextInput'
import { useSingletonPage } from '../hooks/useSingletonPage'

type Area = { name: string; detail: string }
type ServiceAreasForm = {
  _id: string
  _type: string
  title: string
  description: string
  paragraphs: string[]
  areas: Area[]
}

export function ServiceAreasEditorPage() {
  const { form, setForm, loading, error, dirty, saving, message, onSave, onDiscard } =
    useSingletonPage<ServiceAreasForm>({
      query: '*[_id == "serviceAreasPage"][0]',
      docId: 'serviceAreasPage',
      docType: 'serviceAreasPage',
    })

  if (!form) {
    return (
      <EditorShell
        title="Service areas"
        loading={loading}
        error={error || 'Service areas document not found. Run the Firestore seed.'}
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

  return (
    <EditorShell
      title="Service areas"
      description="Hyderabad and Telangana coverage copy. Do not add towns the business has not confirmed."
      loading={loading}
      error={error}
      dirty={dirty}
      saving={saving}
      message={message}
      onSave={onSave}
      onDiscard={onDiscard}
    >
      <TextInput label="Title" value={form.title || ''} onChange={(title) => setForm({ ...form, title })} />
      <TextArea label="Summary" value={form.description || ''} onChange={(description) => setForm({ ...form, description })} />
      <TextArea
        label="Paragraphs"
        hint="One paragraph per row."
        rows={8}
        value={(form.paragraphs || []).join('\n')}
        onChange={(value) => setForm({ ...form, paragraphs: value.split('\n').filter(Boolean) })}
      />
      {(form.areas || []).map((area, index) => (
        <div key={`${area.name}-${index}`} className="border border-gray-200 p-4 space-y-3">
          <TextInput
            label="Area name"
            value={area.name}
            onChange={(name) => {
              const areas = form.areas.map((item, itemIndex) => (itemIndex === index ? { ...item, name } : item))
              setForm({ ...form, areas })
            }}
          />
          <TextArea
            label="Detail"
            value={area.detail}
            onChange={(detail) => {
              const areas = form.areas.map((item, itemIndex) => (itemIndex === index ? { ...item, detail } : item))
              setForm({ ...form, areas })
            }}
          />
        </div>
      ))}
    </EditorShell>
  )
}
