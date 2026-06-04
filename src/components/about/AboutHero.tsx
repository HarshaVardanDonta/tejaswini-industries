import { useAboutPageData } from '../../context/PageDataContext'

export function AboutHero() {
  const { hero } = useAboutPageData()

  return (
    <section
      className="hero-bleed-header relative w-full flex items-center bg-gray-700"
      aria-label={hero.imageAlt}
      style={{
        backgroundImage: `url('${hero.image}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-primary/70 mix-blend-multiply" aria-hidden />
      <div className="hero-bleed-header__content relative z-10 flex flex-1 items-center w-full px-margin-mobile md:px-margin-desktop">
        <div className="md:w-2/3">
          <h1 className="font-display-xl text-display-xl text-on-primary uppercase mb-space-4 border-l-4 border-secondary pl-space-4">
            {hero.title}
          </h1>
          <p className="font-body-lg text-body-lg text-surface-bright max-w-2xl bg-surface-container-lowest/10 p-space-4 backdrop-blur-sm border border-surface-bright/20 rounded">
            {hero.description}
          </p>
        </div>
      </div>
    </section>
  )
}
