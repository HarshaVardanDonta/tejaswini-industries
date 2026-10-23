import { EditorShell } from '../../components/EditorShell'
import { TextArea } from '../../components/fields/TextArea'
import { TextInput } from '../../components/fields/TextInput'
import { useSingletonPage } from '../../hooks/useSingletonPage'

type SiteSettingsForm = {
  _id: string
  _type: string
  addressLines: string[]
  streetAddress: string
  postalCode: string
  locality: string
  region: string
  phone: string
  phoneHref: string
  email: string
  whatsappNumber: string
  whatsappNote: string
  hours: string[]
  opens: string
  closes: string
  lat: number
  lng: number
  mapsUrl: string
}

export function BusinessSettingsPage() {
  const { form, setForm, loading, error, dirty, saving, message, onSave, onDiscard } =
    useSingletonPage<SiteSettingsForm>({
      query: '*[_id == "siteSettings"][0]',
      docId: 'siteSettings',
      docType: 'siteSettings',
    })

  if (!form) {
    return (
      <EditorShell
        title="Business details"
        loading={loading}
        error={error || 'Business details were not found. Run the Firestore seed.'}
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

  const patch = (partial: Partial<SiteSettingsForm>) => setForm({ ...form, ...partial })

  return (
    <EditorShell
      title="Business details"
      description="Name, address and phone used across the site and in structured data. This is the only NAP record."
      loading={loading}
      error={error}
      dirty={dirty}
      saving={saving}
      message={message}
      onSave={onSave}
      onDiscard={onDiscard}
    >
      <TextArea
        label="Address lines"
        hint="One line per row."
        value={(form.addressLines || []).join('\n')}
        onChange={(value) => patch({ addressLines: value.split('\n').map((line) => line.trimEnd()) })}
      />
      <TextInput label="Street address" value={form.streetAddress || ''} onChange={(streetAddress) => patch({ streetAddress })} />
      <TextInput label="PIN code" value={form.postalCode || ''} onChange={(postalCode) => patch({ postalCode })} />
      <TextInput label="City" value={form.locality || ''} onChange={(locality) => patch({ locality })} />
      <TextInput label="State" value={form.region || ''} onChange={(region) => patch({ region })} />
      <TextInput label="Phone" value={form.phone || ''} onChange={(phone) => patch({ phone })} />
      <TextInput label="Phone link" value={form.phoneHref || ''} onChange={(phoneHref) => patch({ phoneHref })} />
      <TextInput label="Email" value={form.email || ''} onChange={(email) => patch({ email })} />
      <TextInput label="WhatsApp number" value={form.whatsappNumber || ''} onChange={(whatsappNumber) => patch({ whatsappNumber })} />
      <TextArea label="Number note" value={form.whatsappNote || ''} onChange={(whatsappNote) => patch({ whatsappNote })} />
      <TextArea
        label="Hours"
        value={(form.hours || []).join('\n')}
        onChange={(value) => patch({ hours: value.split('\n').filter(Boolean) })}
      />
      <TextInput label="Opens (24h)" value={form.opens || ''} onChange={(opens) => patch({ opens })} />
      <TextInput label="Closes (24h)" value={form.closes || ''} onChange={(closes) => patch({ closes })} />
    </EditorShell>
  )
}
