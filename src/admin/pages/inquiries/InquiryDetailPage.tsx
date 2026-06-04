import { useParams } from 'react-router-dom'

import { EditorShell } from '../../components/EditorShell'
import { ToggleInput } from '../../components/fields/ToggleInput'
import { useDocumentEditor } from '../../hooks/useDocumentEditor'
import { adminQueries } from '../../lib/adminQueries'

type QuoteFields = {
  category?: string
  capacity?: string
  transformerType?: string
  coolingType?: string
  windingMaterial?: string
  tapChanger?: string
  altitude?: string
  maxAmbientTemp?: string
  siteDetails?: string
  standardsIs?: boolean
  standardsIec?: boolean
  standardsAnsi?: boolean
  technicalRequirements?: string
  product?: string
  sku?: string
}

type Doc = {
  _id: string
  _type: 'siteInquiry'
  source?: string
  responded?: boolean
  submittedAt?: string
  name?: string
  company?: string
  email?: string
  phone?: string
  inquiryLabel?: string
  message?: string
  quote?: QuoteFields
}

function ReadOnlyField({ label, value }: { label: string; value?: string }) {
  return (
    <div>
      <p className="font-label text-label text-gray-500 uppercase tracking-wide">{label}</p>
      <p className="font-body-sm text-body-sm text-gray-800 mt-1 whitespace-pre-wrap">
        {value?.trim() ? value : '—'}
      </p>
    </div>
  )
}

function formatDate(iso?: string) {
  if (!iso) return '—'
  try {
    return new Date(iso).toLocaleString(undefined, {
      dateStyle: 'full',
      timeStyle: 'short',
    })
  } catch {
    return iso
  }
}

function formatSource(source?: string) {
  if (source === 'quote') return 'Quote request'
  if (source === 'contact') return 'Contact form'
  return source ?? '—'
}

function standardsList(quote?: QuoteFields) {
  if (!quote) return '—'
  const items = [
    quote.standardsIs ? 'IS (Indian Standards)' : null,
    quote.standardsIec ? 'IEC Standards' : null,
    quote.standardsAnsi ? 'ANSI Standards' : null,
  ].filter(Boolean)
  return items.length ? items.join(', ') : '—'
}

export function InquiryDetailPage() {
  const { id } = useParams<{ id: string }>()
  const docId = decodeURIComponent(id ?? '')

  const { form, setForm, loading, error, dirty, saving, message, onSave, onDiscard } =
    useDocumentEditor<Doc>({
      query: adminQueries.siteInquiryById,
      params: { id: docId },
    })

  if (!form) return null

  const quote = form.quote

  return (
    <EditorShell
      title="Inquiry details"
      description={`${formatSource(form.source)} · ${formatDate(form.submittedAt)}`}
      loading={loading}
      error={error}
      dirty={dirty}
      saving={saving}
      message={message}
      onSave={() => onSave()}
      onDiscard={onDiscard}
    >
      <ToggleInput
        label="Responded"
        checked={form.responded ?? false}
        onChange={(checked) => setForm({ ...form, responded: checked })}
      />

      <div className="border border-gray-200 rounded-sm bg-white p-5 space-y-4">
        <h2 className="font-h3 text-h3 text-primary uppercase">Contact</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ReadOnlyField label="Company" value={form.company} />
          <ReadOnlyField label="Full name" value={form.name} />
          <ReadOnlyField label="Email" value={form.email} />
          <ReadOnlyField label="Phone" value={form.phone} />
          <ReadOnlyField label="Inquiry type" value={form.inquiryLabel} />
        </div>
      </div>

      {form.source === 'quote' && quote ? (
        <div className="border border-gray-200 rounded-sm bg-white p-5 space-y-4">
          <h2 className="font-h3 text-h3 text-primary uppercase">Product details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ReadOnlyField label="Category" value={quote.category} />
            <ReadOnlyField label="Capacity (kVA)" value={quote.capacity} />
            <ReadOnlyField label="Transformer type" value={quote.transformerType} />
            <ReadOnlyField label="Cooling" value={quote.coolingType} />
            <ReadOnlyField label="Winding material" value={quote.windingMaterial} />
            <ReadOnlyField label="Tap changer" value={quote.tapChanger} />
            <ReadOnlyField label="Product" value={quote.product} />
            <ReadOnlyField label="SKU" value={quote.sku} />
          </div>
          <h2 className="font-h3 text-h3 text-primary uppercase pt-2">Technical specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ReadOnlyField label="Altitude (m)" value={quote.altitude} />
            <ReadOnlyField label="Max ambient temp (°C)" value={quote.maxAmbientTemp} />
            <ReadOnlyField label="Site conditions" value={quote.siteDetails} />
            <ReadOnlyField label="Compliance standards" value={standardsList(quote)} />
          </div>
          <ReadOnlyField
            label="Technical requirements"
            value={quote.technicalRequirements}
          />
        </div>
      ) : null}

      <div className="border border-gray-200 rounded-sm bg-white p-5 space-y-2">
        <h2 className="font-h3 text-h3 text-primary uppercase">Message</h2>
        <pre className="font-body-sm text-body-sm text-gray-800 whitespace-pre-wrap wrap-break-word">
          {form.message?.trim() || '—'}
        </pre>
      </div>
    </EditorShell>
  )
}
