import { Outlet, useNavigate } from 'react-router-dom'

import { ADMIN_SESSION_KEY } from '../../sanity/queries'
import { AdminSidebar } from './AdminSidebar'

export function AdminLayout() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <meta name="robots" content="noindex" />
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 border-b border-gray-200 bg-white px-6 flex items-center justify-end gap-4">
          <button
            type="button"
            onClick={() => {
              sessionStorage.removeItem(ADMIN_SESSION_KEY)
              navigate('/admin/login')
            }}
            className="font-label text-label uppercase text-gray-700 hover:text-secondary"
          >
            Sign out
          </button>
        </header>
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
