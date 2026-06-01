import { useLandingPageData } from '../context/LandingPageContext'

export function CTABanner() {
  const { ctaBanner } = useLandingPageData()

  return (
    <section className="py-space-12 px-margin-mobile md:px-margin-desktop bg-tertiary w-full border-t border-gray-700">
      <div className="max-w-[1280px] mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-space-6">
        <div>
          <h2 className="font-h1 text-h1 text-white uppercase mb-2">{ctaBanner.title}</h2>
          <p className="font-body-lg text-body-lg text-on-tertiary-container">{ctaBanner.description}</p>
        </div>
        <button
          type="button"
          className="bg-secondary text-on-secondary px-space-6 py-space-3 rounded-sm font-label text-label uppercase tracking-widest hover:bg-secondary/90 transition-colors whitespace-nowrap"
        >
          {ctaBanner.buttonLabel}
        </button>
      </div>
    </section>
  )
}
