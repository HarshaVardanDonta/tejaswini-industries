import { useEffect, useState, type ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'

import { getFirebaseAuth, getFirebaseDb, isFirebaseConfigured } from '../cms/firebase'
import { PageSEO } from '../components/seo/PageSEO'

export function AdminGuard({ children }: { children: ReactNode }) {
  const location = useLocation()
  const [state, setState] = useState<'loading' | 'in' | 'out'>('loading')

  useEffect(() => {
    if (!isFirebaseConfigured) {
      queueMicrotask(() => setState('out'))
      return
    }
    return onAuthStateChanged(getFirebaseAuth(), async (user) => {
      if (!user) {
        setState('out')
        return
      }
      const allow = await getDoc(doc(getFirebaseDb(), 'admins', user.uid))
      if (!allow.exists()) {
        await signOut(getFirebaseAuth())
        setState('out')
        return
      }
      setState('in')
    })
  }, [])

  if (state === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center font-body-sm text-body-sm text-gray-500">
        <PageSEO title="Admin" description="Private admin." path="/admin" noindex />
        Loading admin…
      </div>
    )
  }

  if (state === 'out') {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />
  }

  return <>{children}</>
}
