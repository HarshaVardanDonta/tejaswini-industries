import { useMemo } from 'react'
import { CTABanner } from '../components/CTABanner'
import { CompanyIntro } from '../components/CompanyIntro'
import { Hero } from '../components/Hero'
import { PageLoading } from '../components/PageLoading'
import { Portfolio } from '../components/Portfolio'
import { TechnicalSupremacy } from '../components/TechnicalSupremacy'
import { PageSEO } from '../components/seo/PageSEO'
import { staticPageMeta } from '../constants/seo'
import { defaultLandingPageData, LandingPageProvider } from '../context/LandingPageContext'
import { useSanityQuery } from '../hooks/useSanityQuery'
import { mapLandingPage } from '../sanity/mappers'
import { queries } from '../sanity/queries'

export function LandingPage() {
  const { data, loading } = useSanityQuery(queries.landingPage, {}, null)
  const pageData = useMemo(
    () => mapLandingPage(data as Record<string, unknown> | null, defaultLandingPageData),
    [data]
  )

  if (loading) return <PageLoading />

  return (
    <LandingPageProvider value={pageData}>
      <PageSEO {...staticPageMeta.home} />
      <Hero />
      <CompanyIntro />
      <Portfolio />
      <TechnicalSupremacy />
      <CTABanner />
    </LandingPageProvider>
  )
}
