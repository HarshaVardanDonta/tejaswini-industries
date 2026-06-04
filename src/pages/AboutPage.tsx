import { useMemo } from 'react'
import { AboutCta } from '../components/about/AboutCta'
import { AboutHero } from '../components/about/AboutHero'
import { AboutInfrastructure } from '../components/about/AboutInfrastructure'
import { AboutOverview } from '../components/about/AboutOverview'
import { AboutSectors } from '../components/about/AboutSectors'
import { AboutVisionMission } from '../components/about/AboutVisionMission'
import { ProductsShell } from '../components/layout/ProductsShell'
import { PageLoading } from '../components/PageLoading'
import { PageSEO } from '../components/seo/PageSEO'
import { staticPageMeta } from '../constants/seo'
import { AboutPageProvider } from '../context/PageDataContext'
import { aboutPage } from '../data/about'
import { useSanityQuery } from '../hooks/useSanityQuery'
import { mapAboutPage } from '../sanity/mappers'
import { queries } from '../sanity/queries'

export function AboutPage() {
  const { data, loading } = useSanityQuery(queries.aboutPage, {}, null)
  const pageData = useMemo(
    () => mapAboutPage(data as Record<string, unknown> | null, aboutPage),
    [data]
  )


  if (loading) return <ProductsShell className="bg-background"><PageLoading embedded /></ProductsShell>

  return (
    <AboutPageProvider value={pageData}>
      <ProductsShell className="bg-background">
        <PageSEO {...staticPageMeta.about} />
        <main className="grow max-w-[1280px] mx-auto w-full">
          <AboutHero />
          <AboutOverview />
          <AboutVisionMission />
          <AboutInfrastructure />
          <AboutSectors />
          <AboutCta />
        </main>
      </ProductsShell>
    </AboutPageProvider>
  )
}
