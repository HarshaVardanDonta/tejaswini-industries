import { CTABanner } from '../components/CTABanner'
import { CompanyIntro } from '../components/CompanyIntro'
import { Hero } from '../components/Hero'
import { Portfolio } from '../components/Portfolio'
import { TechnicalSupremacy } from '../components/TechnicalSupremacy'

export function LandingPage() {
  return (
    <>
      <Hero />
      <CompanyIntro />
      <Portfolio />
      <TechnicalSupremacy />
      <CTABanner />
    </>
  )
}
