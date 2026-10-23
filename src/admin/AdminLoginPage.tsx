import { type FormEvent, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'

import { FIREBASE_SETUP_HINT } from '../cms/config'
import { getFirebaseAuth, getFirebaseDb, isFirebaseConfigured } from '../cms/firebase'
import { PageSEO } from '../components/seo/PageSEO'

export function AdminLoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [signedIn, setSignedIn] = useState(false)

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setLoading(true)
    setError('')

    if (!isFirebaseConfigured) {
      setError(`Sign-in could not reach Firebase. ${FIREBASE_SETUP_HINT}`)
      setLoading(false)
      return
    }

    try {
      const credential = await signInWithEmailAndPassword(getFirebaseAuth(), email.trim(), password)
      const allow = await getDoc(doc(getFirebaseDb(), 'admins', credential.user.uid))
      if (!allow.exists()) {
        await signOut(getFirebaseAuth())
        setError('This account is not on the admin allowlist.')
        return
      }
      setSignedIn(true)
      navigate('/admin', { replace: true })
    } catch {
      setError('Invalid email or password.')
    } finally {
      setLoading(false)
    }
  }

  if (signedIn) {
    return <Navigate to="/admin" replace />
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <PageSEO title="Admin login" description="Private content admin." path="/admin/login" noindex />
      <div className="w-full max-w-md bg-white rounded-sm border border-gray-200 p-8 shadow-lg">
        <div className="mb-8">
          <p className="font-label text-label text-secondary uppercase tracking-widest mb-2">
            Tejaswini Industries
          </p>
          <h1 className="font-display-lg text-display-lg text-gray-700 uppercase">Admin Login</h1>
          <p className="font-body-sm text-body-sm text-gray-500 mt-2">
            Sign in with the Firebase Auth email and password created for the owner. Writes are allowed only for UIDs in the admins collection.
          </p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="block">
            <span className="font-label text-label text-gray-700 uppercase">Email</span>
            <input
              type="email"
              className="mt-1 w-full border border-gray-200 rounded-sm px-3 py-2 font-body-sm text-body-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
              required
            />
          </label>
          <label className="block">
            <span className="font-label text-label text-gray-700 uppercase">Password</span>
            <input
              type="password"
              className="mt-1 w-full border border-gray-200 rounded-sm px-3 py-2 font-body-sm text-body-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </label>
          {error ? <p className="font-body-sm text-body-sm text-secondary">{error}</p> : null}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-on-primary py-3 rounded-sm font-label text-label uppercase tracking-widest hover:bg-primary/90 transition-colors disabled:opacity-60"
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}
