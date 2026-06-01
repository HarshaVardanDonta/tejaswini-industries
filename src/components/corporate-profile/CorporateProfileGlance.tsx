import { Link } from 'react-router-dom'
import { useCorporateProfilePageData } from '../../context/PageDataContext'
import { Icon } from '../Icon'

export function CorporateProfileGlance() {
  const { profile } = useCorporateProfilePageData()

  return (
    <section className="py-space-16 md:py-[100px] bg-background relative border-b border-gray-100">
      <div className="w-full px-margin-mobile md:px-margin-desktop max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
        <div className="col-span-1 lg:col-span-5 relative">
          <div className="absolute -inset-4 border-2 border-gray-100 rounded-lg -z-10 translate-x-4 translate-y-4" />
          <img
            src={profile.image}
            alt={profile.imageAlt}
            className="w-full aspect-[4/5] object-cover rounded shadow-sm border border-gray-100"
          />
          <div className="absolute bottom-0 right-0 bg-primary text-on-primary p-space-6 border-l-4 border-secondary translate-x-4 translate-y-4 max-w-[220px]">
            <Icon name="precision_manufacturing" size={48} className="mb-space-2" filled={false} />
            <h3 className="font-h3 text-h3 uppercase mb-space-1">
              Engineering Authority
            </h3>
            <p className="font-body-sm text-body-sm text-primary-fixed-dim">
              {profile.established}
            </p>
          </div>
        </div>
        <div className="col-span-1 lg:col-span-6 lg:col-start-7 mt-space-12 lg:mt-0">
          <div className="flex items-center gap-space-2 mb-space-4">
            <div className="w-8 h-[2px] bg-secondary" />
            <span className="font-label text-label text-secondary uppercase tracking-widest">
              {profile.eyebrow}
            </span>
          </div>
          <h2 className="font-h1 text-h1 uppercase mb-space-6 text-primary">
            {profile.title}
          </h2>
          {profile.paragraphs.map((paragraph) => (
            <p
              key={paragraph.slice(0, 40)}
              className="font-body-lg text-body-lg text-gray-700 mb-space-6 last:mb-space-8"
            >
              {paragraph}
            </p>
          ))}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-6 mb-space-8">
            {profile.highlights.map((item) => (
              <div key={item.title} className="flex gap-space-4">
                <div className="shrink-0 w-12 h-12 bg-gray-50 border border-gray-100 flex items-center justify-center rounded">
                  <Icon name={item.icon} size={24} className="text-primary" filled={false} />
                </div>
                <div>
                  <h4 className="font-h3 text-h3 uppercase text-primary mb-space-1">
                    {item.title}
                  </h4>
                  <p className="font-body-sm text-body-sm text-gray-500">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 font-label text-label text-secondary uppercase tracking-wider hover:underline"
          >
            Learn more about us
            <Icon name="arrow_forward" size={16} filled={false} />
          </Link>
        </div>
      </div>
    </section>
  )
}
