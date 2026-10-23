import { useMemo } from 'react'
import { CTABanner } from '../components/CTABanner'
import { CompanyIntro } from '../components/CompanyIntro'
import { Hero } from '../components/Hero'
import { PageLoading } from '../components/PageLoading'
import { Portfolio } from '../components/Portfolio'
import { TechnicalSupremacy } from '../components/TechnicalSupremacy'
import { buildFaqJsonLd, PageSEO } from '../components/seo/PageSEO'
import { staticPageMeta } from '../constants/seo'
import { defaultLandingPageData, LandingPageProvider } from '../context/LandingPageContext'
import { FaqList, usePageFaqs } from '../components/FaqList'
import { useCmsQuery } from '../hooks/useCmsQuery'
import { mapLandingPage } from '../cms/mappers'
import { queries } from '../cms/queries'

export function LandingPage() {
  const { data, loading } = useCmsQuery(queries.landingPage, {}, null)
  const faqs = usePageFaqs('home')
  const pageData = useMemo(
    () => mapLandingPage(data as Record<string, unknown> | null, defaultLandingPageData),
    [data]
  )

  if (loading) return <PageLoading />

  return (
    <LandingPageProvider value={pageData}>
      <PageSEO
        {...staticPageMeta.home}
        jsonLd={faqs.length ? buildFaqJsonLd(faqs) : undefined}
      />
      <Hero />
      <CompanyIntro />
      <Portfolio />
      <TechnicalSupremacy />
      <CTABanner />
      <FaqList page="home" />
    </LandingPageProvider>
  )
}
