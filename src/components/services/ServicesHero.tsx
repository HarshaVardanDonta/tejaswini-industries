import { Link } from 'react-router-dom'
import { useServicesPageData } from '../../context/PageDataContext'
import { Icon } from '../Icon'

export function ServicesHero() {
  const { hero } = useServicesPageData()

  return (
    <section className="hero-bleed-header relative w-full flex items-center bg-gray-900 border-b border-gray-300">
      <div className="absolute inset-0 z-0" aria-hidden>
        <img
          src={hero.image}
          alt={hero.imageAlt}
          className="w-full h-full object-cover opacity-40 mix-blend-overlay"
        />
      </div>
      <div className="hero-bleed-header__content relative z-10 flex flex-1 items-center w-full max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="max-w-3xl bg-surface/95 p-8 border-l-4 border-secondary shadow-lg">
          <span className="font-label text-label text-secondary uppercase tracking-widest block mb-4">
            {hero.eyebrow}
          </span>
          <h1 className="font-display-xl-mobile md:font-display-xl text-display-xl-mobile md:text-display-xl text-primary mb-6 uppercase">
            {hero.title}
          </h1>
          <p className="font-body-lg text-body-lg text-gray-700 mb-8 max-w-2xl">
            {hero.description}
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#core-services"
              className="bg-primary text-white font-label text-label uppercase px-8 py-3 rounded hover:bg-primary-container transition-colors flex items-center gap-2 border border-primary"
            >
              Explore Services
              <Icon name="arrow_downward" size={16} filled={false} />
            </a>
            <Link
              to="/corporate-profile"
              className="bg-transparent text-primary font-label text-label uppercase px-8 py-3 rounded hover:bg-gray-100 transition-colors flex items-center gap-2 border border-primary"
            >
              Download Brochure
              <Icon name="download" size={16} filled={false} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
