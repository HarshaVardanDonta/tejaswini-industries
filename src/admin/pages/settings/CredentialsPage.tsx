import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'

import { EditorShell } from '../../components/EditorShell'
import { getFirebaseAuth, isFirebaseConfigured } from '../../../cms/firebase'

export function CredentialsPage() {
  const [email, setEmail] = useState<string | null>(null)

  useEffect(() => {
    if (!isFirebaseConfigured) return
    return onAuthStateChanged(getFirebaseAuth(), (user) => setEmail(user?.email ?? null))
  }, [])

  return (
    <EditorShell
      title="Admin access"
      description="Login is Firebase Authentication email and password. A signed-in user can write content only when an admins/{uid} document exists. Create that document with scripts/seed-firestore.mjs. Passwords are not stored in Firestore."
      loading={false}
      error={null}
      dirty={false}
      saving={false}
      message={null}
      onSave={() => {}}
      onDiscard={() => {}}
    >
      <p className="font-body-sm text-body-sm text-gray-700">
        Signed in as {email || 'unknown'}.
        {isFirebaseConfigured ? '' : ' Firebase web config is missing.'}
      </p>
    </EditorShell>
  )
}
