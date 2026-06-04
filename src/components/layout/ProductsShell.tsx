import type { ReactNode } from 'react'
import { Footer } from '../Footer'
import { Header } from '../Header'
import { ProductsFloatingSidebar } from '../products/ProductsFloatingSidebar'

type ProductsShellProps = {
  children: ReactNode
  className?: string
}

export function ProductsShell({
  children,
  className = 'bg-surface',
}: ProductsShellProps) {
  return (
    <div
      className={`${className} text-on-surface min-h-screen flex flex-col font-body-lg antialiased`}
    >
      <Header />
      <div className="page-below-header flex flex-col grow min-h-0">{children}</div>
      <ProductsFloatingSidebar />
      <Footer />
    </div>
  )
}
