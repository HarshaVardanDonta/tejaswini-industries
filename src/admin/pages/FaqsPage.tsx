import { EditorShell } from '../components/EditorShell'
import { TextArea } from '../components/fields/TextArea'
import { TextInput } from '../components/fields/TextInput'
import { useSingletonPage } from '../hooks/useSingletonPage'
import type { FaqItem } from '../../cms/types'

type FaqDoc = {
  _id: string
  _type: string
  items: FaqItem[]
}

export function FaqsPage() {
  const { form, setForm, loading, error, dirty, saving, message, onSave, onDiscard } =
    useSingletonPage<FaqDoc>({
      query: '*[_id == "faqs"][0]',
      docId: 'faqs',
      docType: 'faqSet',
    })

  if (!form) {
    return (
      <EditorShell
        title="FAQs"
        loading={loading}
        error={error || 'FAQ document not found. Run the Firestore seed.'}
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

  const items = form.items || []
  const updateItem = (index: number, patch: Partial<FaqItem>) => {
    const next = items.map((item, itemIndex) => (itemIndex === index ? { ...item, ...patch } : item))
    setForm({ ...form, items: next })
  }

  return (
    <EditorShell
      title="FAQs"
      description="Answers shown on the public pages and in FAQPage structured data. Use the page id (home or service-areas). Product page FAQs are edited on each product category."
      loading={loading}
      error={error}
      dirty={dirty}
      saving={saving}
      message={message}
      onSave={onSave}
      onDiscard={onDiscard}
    >
      {items.map((item, index) => (
        <div key={item.id || index} className="border border-gray-200 p-4 space-y-3">
          <TextInput label="Page" value={item.page} onChange={(page) => updateItem(index, { page })} />
          <TextInput label="Question" value={item.question} onChange={(question) => updateItem(index, { question })} />
          <TextArea label="Answer" value={item.answer} rows={5} onChange={(answer) => updateItem(index, { answer })} />
          <button
            type="button"
            className="font-label text-label uppercase text-secondary"
            onClick={() => setForm({ ...form, items: items.filter((_, itemIndex) => itemIndex !== index) })}
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        className="font-label text-label uppercase text-primary"
        onClick={() =>
          setForm({
            ...form,
            items: [
              ...items,
              { id: `faq-${Date.now()}`, page: 'home', question: '', answer: '' },
            ],
          })
        }
      >
        Add question
      </button>
    </EditorShell>
  )
}
