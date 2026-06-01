import { Navigate, useLocation } from 'react-router-dom'

import { ADMIN_SESSION_KEY } from '../sanity/queries'

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const isAuthenticated = sessionStorage.getItem(ADMIN_SESSION_KEY) === 'true'

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />
  }

  return <>{children}</>
}
