import { PolicyPageContent } from '../components/policy/PolicyPageContent'
import { ProductsShell } from '../components/layout/ProductsShell'
import { PageSEO } from '../components/seo/PageSEO'
import { staticPageMeta } from '../constants/seo'
import { qualityPolicy } from '../data/policies'

export function QualityPolicyPage() {
  return (
    <ProductsShell className="bg-background">
      <PageSEO {...staticPageMeta.qualityPolicy} />
      <main className="grow">
        <PolicyPageContent policy={qualityPolicy} />
      </main>
    </ProductsShell>
  )
}
