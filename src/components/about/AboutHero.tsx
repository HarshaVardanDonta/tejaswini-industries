import { aboutPage } from '../../data/about'

export function AboutHero() {
  const { hero } = aboutPage

  return (
    <section
      className="relative w-full h-[614px] min-h-[500px] flex items-center bg-gray-700"
      aria-label={hero.imageAlt}
      style={{
        backgroundImage: `url('${hero.image}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-primary/70 mix-blend-multiply" />
      <div className="relative z-10 px-margin-mobile md:px-margin-desktop md:w-2/3">
        <h1 className="font-display-xl text-display-xl text-on-primary uppercase mb-space-4 border-l-4 border-secondary pl-space-4">
          {hero.title}
        </h1>
        <p className="font-body-lg text-body-lg text-surface-bright max-w-2xl bg-surface-container-lowest/10 p-space-4 backdrop-blur-sm border border-surface-bright/20 rounded">
          {hero.description}
        </p>
      </div>
    </section>
  )
}
