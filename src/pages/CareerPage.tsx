import { ComingSoonContent } from '../components/ComingSoonContent'
import { ProductsShell } from '../components/layout/ProductsShell'
import { PageSEO } from '../components/seo/PageSEO'
import { staticPageMeta } from '../constants/seo'

export function CareerPage() {
  return (
    <ProductsShell className="bg-background">
      <PageSEO {...staticPageMeta.careers} />
      <main className="grow">
        <ComingSoonContent
          title="Careers"
          description="Join a team building precision-engineered transformers and industrial power solutions."
        />
      </main>
    </ProductsShell>
  )
}
