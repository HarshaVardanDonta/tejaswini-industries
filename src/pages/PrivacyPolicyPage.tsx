import { PolicyPageContent } from '../components/policy/PolicyPageContent'
import { ProductsShell } from '../components/layout/ProductsShell'
import { PageSEO } from '../components/seo/PageSEO'
import { staticPageMeta } from '../constants/seo'
import { privacyPolicy } from '../data/policies'

export function PrivacyPolicyPage() {
  return (
    <ProductsShell className="bg-background">
      <PageSEO {...staticPageMeta.privacyPolicy} />
      <main className="grow">
        <PolicyPageContent policy={privacyPolicy} />
      </main>
    </ProductsShell>
  )
}
