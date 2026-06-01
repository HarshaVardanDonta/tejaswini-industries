import { useLandingPageData } from '../context/LandingPageContext'
import { Icon } from './Icon'

export function Hero() {
  const { hero } = useLandingPageData()
  const titleLines = hero.title.split('\n')

  return (
    <section className="relative w-full h-[819px] min-h-[600px] flex items-center bg-gray-900 border-b border-gray-300 overflow-hidden">
      <div className="absolute inset-0 bg-black/60 z-10" />
      <img
        alt={hero.imageAlt}
        className="absolute inset-0 w-full h-full object-cover z-0"
        src={hero.image}
      />
      <div className="relative z-20 w-full max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 md:grid-cols-12 gap-gutter">
        <div className="col-span-1 md:col-span-8 flex flex-col justify-center">
          <div className="inline-flex items-center gap-3 bg-primary/80 backdrop-blur-sm text-on-primary px-3 py-1 rounded-sm border border-primary-fixed-dim/30 w-max mb-space-6 flex-wrap">
            <span className="inline-flex items-center gap-2">
              <Icon name="verified" size={16} />
              <span className="font-label text-label uppercase">{hero.badgePrimary}</span>
            </span>
            <span className="hidden sm:block w-px h-4 bg-on-primary/30 shrink-0" aria-hidden />
            <span className="inline-flex items-center gap-2">
              <Icon name="verified" size={16} />
              <span className="font-label text-label uppercase">{hero.badgeSecondary}</span>
            </span>
          </div>
          <h1 className="font-display-xl-mobile md:font-display-xl text-display-xl-mobile md:text-display-xl text-white uppercase tracking-tight mb-space-4 border-l-4 border-secondary pl-space-4 bg-gradient-to-r from-black/40 to-transparent py-2">
            {titleLines.map((line, index) => (
              <span key={line}>
                {line}
                {index < titleLines.length - 1 ? <br /> : null}
              </span>
            ))}
          </h1>
          <p className="font-body-lg text-body-lg text-gray-100 mb-space-8 max-w-2xl bg-black/30 p-space-4 rounded-sm border-l border-gray-500 backdrop-blur-sm">
            {hero.description}
          </p>
          <div className="flex flex-wrap gap-space-4">
            <button
              type="button"
              className="bg-secondary text-on-secondary px-space-6 py-space-3 rounded-sm font-label text-label uppercase tracking-widest hover:bg-secondary/90 transition-colors flex items-center gap-2 border border-secondary shadow-[0_4px_14px_rgba(187,0,39,0.3)]"
            >
              {hero.primaryCta}
              <Icon name="arrow_forward" size={18} />
            </button>
            <button
              type="button"
              className="bg-white/10 backdrop-blur-md text-white border border-gray-300/50 px-space-6 py-space-3 rounded-sm font-label text-label uppercase tracking-widest hover:bg-white/20 transition-colors flex items-center gap-2"
            >
              <Icon name="call" size={18} />
              {hero.secondaryCta}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
