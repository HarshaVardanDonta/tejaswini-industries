import { Outlet, useLocation } from 'react-router-dom'
import { Footer } from '../Footer'
import { Header } from '../Header'
import { ProductsFloatingSidebar } from '../products/ProductsFloatingSidebar'

export function AppLayout() {
  const { pathname } = useLocation()
  const isStandaloneRoute =
    pathname.startsWith('/products') ||
    pathname.startsWith('/projects') ||
    pathname.startsWith('/clients') ||
    pathname.startsWith('/services') ||
    pathname.startsWith('/corporate-profile') ||
    pathname.startsWith('/blogs') ||
    pathname.startsWith('/about') ||
    pathname.startsWith('/contact') ||
    pathname.startsWith('/quality-policy') ||
    pathname.startsWith('/privacy-policy') ||
    pathname.startsWith('/careers') ||
    pathname.startsWith('/infrastructure')

  if (isStandaloneRoute) {
    return <Outlet />
  }

  return (
    <div className="bg-surface text-on-surface font-body-lg min-h-screen flex flex-col antialiased">
      <Header />
      <main className="grow">
        <Outlet />
      </main>
      <ProductsFloatingSidebar />
      <Footer />
    </div>
  )
}
