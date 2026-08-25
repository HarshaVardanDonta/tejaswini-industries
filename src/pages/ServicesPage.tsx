import { useMemo } from 'react'
import { ProductsShell } from '../components/layout/ProductsShell'
import { PageLoading } from '../components/PageLoading'
import { ServicesCapabilities } from '../components/services/ServicesCapabilities'
import { ServicesCta } from '../components/services/ServicesCta'
import { ServicesGrid } from '../components/services/ServicesGrid'
import { ServicesHero } from '../components/services/ServicesHero'
import { ServicesProcess } from '../components/services/ServicesProcess'
import { PageSEO } from '../components/seo/PageSEO'
import { staticPageMeta } from '../constants/seo'
import { ServicesPageProvider } from '../context/PageDataContext'
import { servicesPage } from '../data/services'
import { useSanityQuery } from '../hooks/useSanityQuery'
import { mapServicesPage } from '../sanity/mappers'
import { queries } from '../sanity/queries'

export function ServicesPage() {
  const { data, loading } = useSanityQuery(queries.servicesPage, {}, null)
  const pageData = useMemo(
    () => mapServicesPage(data as Record<string, unknown> | null, servicesPage),
    [data]
  )

  if (loading) return <ProductsShell className="bg-surface"><PageLoading embedded /></ProductsShell>

  return (
    <ServicesPageProvider value={pageData}>
      <ProductsShell className="bg-surface">
        <PageSEO {...staticPageMeta.services} />
        <main className="grow w-full">
          <ServicesHero />
          <ServicesGrid />
          <ServicesProcess />
          <ServicesCapabilities />
          <ServicesCta />
        </main>
      </ProductsShell>
    </ServicesPageProvider>
  )
}
