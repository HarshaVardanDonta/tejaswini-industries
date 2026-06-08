import { ClientsHero } from '../components/clients/ClientsHero'
import { ClientsLogos } from '../components/clients/ClientsLogos'
import { ClientsMetrics } from '../components/clients/ClientsMetrics'
import { ClientsTestimonials } from '../components/clients/ClientsTestimonials'
import { ProductsShell } from '../components/layout/ProductsShell'
import { PageSEO } from '../components/seo/PageSEO'
import { staticPageMeta } from '../constants/seo'

export function ClientsPage() {
  return (
    <ProductsShell className="bg-background">
      <PageSEO {...staticPageMeta.clients} />
      <ClientsHero />
      <main className="grow w-full max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-space-16">
        <ClientsMetrics />
        <ClientsLogos />
        <ClientsTestimonials />
      </main>
    </ProductsShell>
  )
}
