import { Outlet, useLocation } from 'react-router-dom'
import { FloatingActions } from '../FloatingActions'
import { Footer } from '../Footer'
import { Header } from '../Header'

export function AppLayout() {
  const { pathname } = useLocation()
  const isStandaloneRoute =
    pathname.startsWith('/products') ||
    pathname.startsWith('/projects') ||
    pathname.startsWith('/blogs') ||
    pathname.startsWith('/about') ||
    pathname.startsWith('/contact')

  if (isStandaloneRoute) {
    return <Outlet />
  }

  return (
    <div className="bg-surface text-on-surface font-body-lg min-h-screen flex flex-col antialiased">
      <Header />
      <main className="grow">
        <Outlet />
      </main>
      <FloatingActions />
      <Footer />
    </div>
  )
}
