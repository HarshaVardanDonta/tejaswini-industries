import { useLandingPageData } from '../context/LandingPageContext'

export function CompanyIntro() {
  const { companyIntro } = useLandingPageData()

  return (
    <section className="py-space-16 px-margin-mobile md:px-margin-desktop bg-surface max-w-[1280px] mx-auto w-full">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
        <div className="col-span-1 md:col-span-6 order-2 md:order-1">
          <h2 className="font-display-lg text-display-lg text-gray-700 uppercase mb-space-6 flex items-center gap-3">
            <span className="w-8 h-1 bg-primary block" />
            {companyIntro.title}
          </h2>
          {companyIntro.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className="font-body-lg text-body-lg text-gray-500 mb-space-4 last:mb-space-6">
              {paragraph}
            </p>
          ))}
          <div className="grid grid-cols-2 gap-space-4 border-t border-gray-100 pt-space-6">
            {companyIntro.stats.map((stat) => (
              <div key={stat.label} className="border-l-2 border-secondary pl-space-3 even:border-primary">
                <div className="font-mono-data text-display-lg text-primary mb-1">{stat.value}</div>
                <div className="font-label text-label text-gray-700 uppercase">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-1 md:col-span-6 order-1 md:order-2 mb-space-8 md:mb-0 relative">
          <div className="absolute inset-0 bg-primary translate-x-4 translate-y-4 rounded-sm -z-10" />
          <img
            alt={companyIntro.imageAlt}
            className="w-full h-auto object-cover rounded-sm border border-gray-100 shadow-sm"
            src={companyIntro.image}
          />
        </div>
      </div>
    </section>
  )
}
