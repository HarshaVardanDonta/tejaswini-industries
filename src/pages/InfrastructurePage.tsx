import { ComingSoonContent } from '../components/ComingSoonContent'
import { ProductsShell } from '../components/layout/ProductsShell'
import { PageSEO } from '../components/seo/PageSEO'
import { staticPageMeta } from '../constants/seo'

export function InfrastructurePage() {
  return (
    <ProductsShell className="bg-background">
      <PageSEO {...staticPageMeta.infrastructure} />
      <main className="grow">
        <ComingSoonContent
          title="Infrastructure"
          description="Explore our manufacturing facilities, testing capabilities, and industrial infrastructure."
        />
      </main>
    </ProductsShell>
  )
}
