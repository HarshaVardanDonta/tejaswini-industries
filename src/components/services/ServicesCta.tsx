import { Link } from 'react-router-dom'
import { useServicesPageData } from '../../context/PageDataContext'

export function ServicesCta() {
  const { cta } = useServicesPageData()

  return (
    <section className="bg-primary text-on-primary py-space-16 mt-space-12 border-t-4 border-secondary">
      <div className="w-full max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop text-center">
        <h2 className="font-display-lg text-display-lg uppercase mb-4">
          {cta.title}
        </h2>
        <p className="font-body-lg text-body-lg text-primary-fixed mb-8 max-w-2xl mx-auto">
          {cta.description}
        </p>
        <form
          className="max-w-md mx-auto flex flex-col gap-4 bg-white/5 p-6 rounded-lg border border-white/10"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="text-left">
            <label
              htmlFor="services-consult-email"
              className="font-label text-label uppercase text-primary-fixed mb-1 block"
            >
              Work Email
            </label>
            <input
              id="services-consult-email"
              type="email"
              placeholder="engineer@company.com"
              className="w-full bg-white text-gray-900 border border-gray-300 rounded px-4 py-2 font-body-sm focus:border-secondary focus:ring-1 focus:ring-secondary outline-none"
            />
          </div>
          <Link
            to="/contact"
            className="w-full bg-secondary text-white font-label text-label uppercase py-3 rounded hover:bg-secondary-container transition-colors mt-2 text-center"
          >
            Initiate Consultation
          </Link>
        </form>
      </div>
    </section>
  )
}
