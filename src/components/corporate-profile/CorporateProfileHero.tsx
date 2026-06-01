import { Link } from 'react-router-dom'
import { useCorporateProfilePageData } from '../../context/PageDataContext'
import { Icon } from '../Icon'

export function CorporateProfileHero() {
  const { hero } = useCorporateProfilePageData()

  return (
    <section className="relative bg-tertiary text-on-tertiary overflow-hidden border-b-4 border-secondary pt-space-16 pb-space-16 md:pt-[120px] md:pb-[120px]">
      <div className="absolute inset-0 z-0">
        <img
          src={hero.image}
          alt={hero.imageAlt}
          className="w-full h-full object-cover object-center opacity-40 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-tertiary via-tertiary/90 to-transparent" />
        <div className="absolute inset-0 dark-industrial-grid opacity-30" />
      </div>
      <div className="relative z-10 w-full px-margin-mobile md:px-margin-desktop max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-gutter">
        <div className="col-span-1 md:col-span-8 flex flex-col items-start">
          <div className="flex items-center gap-space-3 mb-space-6 bg-surface/10 border border-surface/20 px-space-4 py-space-2 rounded backdrop-blur-sm">
            <Icon name="verified" size={20} className="text-secondary" />
            <span className="font-label text-label uppercase tracking-widest">
              {hero.badge}
            </span>
          </div>
          <h1 className="font-display-xl-mobile md:font-display-xl text-display-xl-mobile md:text-display-xl uppercase mb-space-6 max-w-[800px]">
            {hero.title}{' '}
            <span className="text-secondary">{hero.titleHighlight}</span>
          </h1>
          <p className="font-body-lg text-body-lg text-tertiary-fixed-dim max-w-[600px] mb-space-8">
            {hero.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-space-4 w-full sm:w-auto">
            <button
              type="button"
              className="bg-secondary text-on-secondary font-label text-label uppercase px-space-8 py-space-4 rounded hover:bg-secondary/90 transition-colors flex items-center justify-center gap-space-2"
            >
              <span>Download Corporate Profile</span>
              <Icon name="picture_as_pdf" size={20} filled={false} />
            </button>
            <Link
              to="/contact"
              className="bg-transparent border-2 border-on-tertiary text-on-tertiary font-label text-label uppercase px-space-8 py-space-4 rounded hover:bg-on-tertiary hover:text-tertiary transition-colors flex items-center justify-center text-center"
            >
              Request Technical Consultation
            </Link>
          </div>
        </div>
        <div className="col-span-1 md:col-span-4 mt-space-8 md:mt-0 flex flex-col justify-end">
          <div className="grid grid-cols-2 gap-space-4">
            {hero.stats.map((stat) => (
              <div
                key={stat.label}
                className={`bg-surface/10 border border-surface/20 p-space-4 backdrop-blur-sm ${
                  'accent' in stat && stat.accent
                    ? 'border-l-4 border-l-secondary'
                    : ''
                }`}
              >
                <span className="block font-mono-data text-[32px] font-bold text-on-tertiary mb-space-1">
                  {stat.value}
                </span>
                <span className="block font-label text-label uppercase text-tertiary-fixed-dim">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
