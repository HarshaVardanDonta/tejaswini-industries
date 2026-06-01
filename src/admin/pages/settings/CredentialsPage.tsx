import { EditorShell } from '../../components/EditorShell'
import { TextInput } from '../../components/fields/TextInput'
import { useSingletonPage } from '../../hooks/useSingletonPage'
import { adminQueries } from '../../lib/adminQueries'
import type { AdminCredentials } from '../../types/adminDocuments'

export function CredentialsPage() {
  const { form, setForm, loading, error, dirty, saving, message, onSave, onDiscard } =
    useSingletonPage<AdminCredentials>({
      query: adminQueries.adminCredentials,
      docId: 'adminCredentials',
      docType: 'adminCredentials',
    })

  if (!form && !loading) {
    return (
      <EditorShell
        title="Admin Credentials"
        loading={false}
        error="Credentials document not found. Run the seed script."
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

  return (
    <EditorShell
      title="Admin Credentials"
      description="Username and password used on the /admin/login page."
      loading={loading}
      error={error}
      dirty={dirty}
      saving={saving}
      message={message}
      onSave={onSave}
      onDiscard={onDiscard}
    >
      <TextInput label="Username" value={form.username} onChange={(username) => setForm({ ...form, username })} />
      <TextInput label="Password" type="password" value={form.password} onChange={(password) => setForm({ ...form, password })} />
    </EditorShell>
  )
}
