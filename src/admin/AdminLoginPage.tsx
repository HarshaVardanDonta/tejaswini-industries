import { type FormEvent, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

import { sanityClient } from '../sanity/client'
import { ADMIN_SESSION_KEY, queries } from '../sanity/queries'

export function AdminLoginPage() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setLoading(true)
    setError('')

    try {
      const credentials = await sanityClient.fetch<{ username: string; password: string } | null>(
        queries.adminCredentials
      )

      if (!credentials) {
        setError('Admin credentials are not configured in Sanity yet.')
        return
      }

      if (username === credentials.username && password === credentials.password) {
        sessionStorage.setItem(ADMIN_SESSION_KEY, 'true')
        navigate('/admin', { replace: true })
        return
      }

      setError('Invalid username or password.')
    } catch {
      setError('Unable to verify credentials. Check Sanity configuration.')
    } finally {
      setLoading(false)
    }
  }

  if (sessionStorage.getItem(ADMIN_SESSION_KEY) === 'true') {
    return <Navigate to="/admin" replace />
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <meta name="robots" content="noindex" />
      <div className="w-full max-w-md bg-white rounded-sm border border-gray-200 p-8 shadow-lg">
        <div className="mb-8">
          <p className="font-label text-label text-secondary uppercase tracking-widest mb-2">
            Tejaswini Industries
          </p>
          <h1 className="font-display-lg text-display-lg text-gray-700 uppercase">Admin Login</h1>
          <p className="font-body-sm text-body-sm text-gray-500 mt-2">
            Sign in to manage site content in Sanity Studio.
          </p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="block">
            <span className="font-label text-label text-gray-700 uppercase">Username</span>
            <input
              className="mt-1 w-full border border-gray-200 rounded-sm px-3 py-2 font-body-sm text-body-sm"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
