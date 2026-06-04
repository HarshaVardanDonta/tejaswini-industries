import { quotePage } from '../../data/quote'

export function QuoteHero() {
  return (
    <section className="mb-space-12 md:mb-space-16 border-l-4 border-primary pl-space-6 md:pl-space-8">
      <h1 className="font-display-xl-mobile md:font-display-xl text-display-xl-mobile md:text-display-xl text-primary uppercase mb-space-4">
        {quotePage.hero.title}
      </h1>
      <p className="font-body-lg text-body-lg text-gray-700 max-w-3xl">
        {quotePage.hero.description}
      </p>
    </section>
  )
}
