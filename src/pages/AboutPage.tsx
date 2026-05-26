import { useEffect } from 'react'
import { AboutCta } from '../components/about/AboutCta'
import { AboutHero } from '../components/about/AboutHero'
import { AboutInfrastructure } from '../components/about/AboutInfrastructure'
import { AboutOverview } from '../components/about/AboutOverview'
import { AboutSectors } from '../components/about/AboutSectors'
import { AboutVisionMission } from '../components/about/AboutVisionMission'
import { ProductsShell } from '../components/layout/ProductsShell'

export function AboutPage() {
  useEffect(() => {
    document.title = 'About Us | Tejaswini Industries'
  }, [])

  return (
    <ProductsShell className="bg-background" footerVariant="default">
      <main className="grow max-w-[1280px] mx-auto w-full">
        <AboutHero />
        <AboutOverview />
        <AboutVisionMission />
        <AboutInfrastructure />
        <AboutSectors />
        <AboutCta />
      </main>
    </ProductsShell>
  )
}
