import { useEffect, useMemo } from 'react'
import { ContactHero } from '../components/contact/ContactHero'
import { ContactInquiryForm } from '../components/contact/ContactInquiryForm'
import { ContactSidebar } from '../components/contact/ContactSidebar'
import { ProductsShell } from '../components/layout/ProductsShell'
import { PageLoading } from '../components/PageLoading'
import { ContactPageProvider } from '../context/PageDataContext'
import { contactPage, inquiryTypes } from '../data/contact'
import { useSanityQuery } from '../hooks/useSanityQuery'
import { mapContactPage } from '../sanity/mappers'
import { queries } from '../sanity/queries'

export function ContactPage() {
  const { data, loading } = useSanityQuery(queries.contactPage, {}, null)
  const pageData = useMemo(
    () =>
      mapContactPage(data as Record<string, unknown> | null, {
        ...contactPage,
        inquiryTypes: [...inquiryTypes],
      }),
    [data]
  )

  useEffect(() => {
    document.title = 'Contact Us - Tejaswini Industries'
  }, [])

  if (loading) return <ProductsShell className="bg-background"><PageLoading /></ProductsShell>

  return (
    <ContactPageProvider value={pageData}>
      <ProductsShell className="bg-background" footerVariant="compact">
        <main className="grow">
          <ContactHero />
          <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop py-space-12 grid grid-cols-1 lg:grid-cols-12 gap-gutter">
            <ContactSidebar />
            <ContactInquiryForm />
          </div>
        </main>
      </ProductsShell>
    </ContactPageProvider>
  )
}
