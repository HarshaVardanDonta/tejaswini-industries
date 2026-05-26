import { useEffect } from 'react'
import { ContactHero } from '../components/contact/ContactHero'
import { ContactInquiryForm } from '../components/contact/ContactInquiryForm'
import { ContactSidebar } from '../components/contact/ContactSidebar'
import { ProductsShell } from '../components/layout/ProductsShell'

export function ContactPage() {
  useEffect(() => {
    document.title = 'Contact Us - Tejaswini Industries'
  }, [])

  return (
    <ProductsShell className="bg-background" sidebarVariant="contact" footerVariant="compact">
      <main className="grow">
        <ContactHero />
        <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop py-space-12 grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          <ContactSidebar />
          <ContactInquiryForm />
        </div>
      </main>
    </ProductsShell>
  )
}
