import { ProductsShell } from '../components/layout/ProductsShell'
import { QuoteHero } from '../components/quote/QuoteHero'
import { QuoteSidebar } from '../components/quote/QuoteSidebar'
import { QuoteWizard } from '../components/quote/QuoteWizard'
import { PageSEO } from '../components/seo/PageSEO'
import { staticPageMeta } from '../constants/seo'

export function RequestQuotePage() {
  return (
    <ProductsShell className="bg-gray-50">
      <PageSEO {...staticPageMeta.requestQuote} />
      <main className="grow">
        <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop py-space-12 md:py-space-16 w-full">
          <QuoteHero />
          <div className="grid grid-cols-1 md:grid-cols-12 gap-space-8 md:gap-gutter">
            <QuoteWizard />
            <QuoteSidebar />
          </div>
        </div>
      </main>
    </ProductsShell>
  )
}
