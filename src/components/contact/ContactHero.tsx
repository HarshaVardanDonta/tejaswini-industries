import { useContactPageData } from '../../context/PageDataContext'

export function ContactHero() {
  const { hero } = useContactPageData()

  return (
    <section className="relative bg-tertiary text-on-tertiary pt-space-16 pb-space-12 px-margin-mobile md:px-margin-desktop overflow-hidden border-b border-outline-variant">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,var(--color-blue-light),transparent)]" />
      <div className="max-w-[1280px] mx-auto relative z-10">
        <div className="border-l-4 border-secondary pl-space-4 mb-space-6">
          <h1 className="font-display-xl-mobile md:font-display-xl text-display-xl-mobile md:text-display-xl uppercase tracking-tight text-white mb-space-2">
            {hero.title}
          </h1>
          <p className="font-body-lg text-body-lg text-tertiary-fixed-dim max-w-2xl">
            {hero.description}
          </p>
        </div>
      </div>
    </section>
  )
}
