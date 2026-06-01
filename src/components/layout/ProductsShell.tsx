import type { ReactNode } from 'react'
import { Footer } from '../Footer'
import { Header } from '../Header'
import { ProductsFloatingSidebar } from '../products/ProductsFloatingSidebar'

type ProductsShellProps = {
  children: ReactNode
  className?: string
  footerVariant?: 'default' | 'compact'
}

export function ProductsShell({
  children,
  className = 'bg-surface',
  footerVariant = 'compact',
}: ProductsShellProps) {
  return (
    <div
      className={`${className} text-on-surface min-h-screen flex flex-col font-body-lg antialiased`}
    >
      <Header />
      {children}
      <ProductsFloatingSidebar />
      <Footer variant={footerVariant} />
    </div>
  )
}
