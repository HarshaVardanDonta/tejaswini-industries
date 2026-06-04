import { useAboutPageData } from '../../context/PageDataContext'
import { Icon } from '../Icon'

export function AboutOverview() {
  const { overview } = useAboutPageData()

  return (
    <section className="px-margin-mobile md:px-margin-desktop py-space-16 grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
      <div className="md:col-span-5 relative">
        <div className="border border-gray-100 bg-white p-space-2 rounded-xl shadow-sm">
          <img
            alt={overview.isoImageAlt}
            className="w-full h-auto rounded-lg grayscale hover:grayscale-0 transition-all duration-500"
            src={overview.isoImage}
          />
        </div>
        <div className="absolute -bottom-space-6 -left-space-2 sm:-left-space-6 bg-white border border-gray-100 p-space-4 rounded-xl shadow-sm border-l-4 border-l-secondary">
          <p className="font-h2 text-h2 text-primary uppercase">BIS</p>
          <p className="font-label text-label text-gray-500 uppercase tracking-widest">
            Certified
          </p>
        </div>
        <div className="absolute -bottom-space-6 -right-space-2 sm:-right-space-6 bg-white border border-gray-100 p-space-4 rounded-xl shadow-sm border-l-4 border-l-secondary">
          <p className="font-h2 text-h2 text-primary uppercase">ISO 9001:2015</p>
          <p className="font-label text-label text-gray-500 uppercase tracking-widest">
            Certified
          </p>
        </div>
      </div>
      <div className="md:col-span-7 md:pl-space-8 mt-space-8 md:mt-0">
        <h2 className="font-h1 text-h1 text-primary uppercase mb-space-4">
          {overview.title}
        </h2>
        <div className="font-body-lg text-body-lg text-gray-700 space-y-space-4">
          {overview.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>
        <div className="mt-space-8 flex gap-space-4 flex-col sm:flex-row">
          {overview.highlights.map((item) => (
            <div
              key={item.label}
              className="bg-gray-50 border border-gray-100 p-space-4 rounded flex-1"
            >
              <Icon
                name={item.icon}
                size={30}
                className="text-secondary mb-space-2 block"
              />
              <p className="font-h3 text-h3 text-primary uppercase">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
