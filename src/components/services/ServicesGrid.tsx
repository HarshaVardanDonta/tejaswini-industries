import { useServicesPageData } from '../../context/PageDataContext'
import { Icon } from '../Icon'

export function ServicesGrid() {
  const servicesPage = useServicesPageData()
  return (
    <section
      id="core-services"
      className="py-space-16 px-margin-mobile md:px-margin-desktop w-full max-w-[1280px] mx-auto bg-surface scroll-mt-24"
    >
      <div className="mb-space-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-300 pb-6">
        <div>
          <h2 className="font-display-lg text-display-lg text-primary uppercase">
            Core Services
          </h2>
          <p className="font-body-lg text-body-lg text-gray-700 mt-2 max-w-xl">
            Comprehensive engineering solutions designed for maximum efficiency
            and compliance.
          </p>
        </div>
        <div className="flex items-center gap-2 font-label text-label text-secondary">
          <Icon name="verified" size={20} />
          <span>ISO 9001:2015 CERTIFIED PROCESSES</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
        {servicesPage.coreServices.map((service) => (
          <article
            key={service.id}
            className="bg-white border border-gray-100 rounded-lg p-6 hover:shadow-md transition-shadow group relative overflow-hidden flex flex-col h-full"
          >
            {service.accent === 'secondary' ? (
              <div className="absolute top-0 left-0 w-1 h-full bg-secondary" />
            ) : (
              <div className="absolute top-0 left-0 w-full h-1 bg-primary group-hover:bg-secondary transition-colors" />
            )}
            <div
              className={`w-12 h-12 rounded flex items-center justify-center mb-6 border border-gray-100 ${
                service.iconBg === 'red-light'
                  ? 'bg-red-light text-secondary'
                  : 'bg-blue-light text-primary'
              }`}
            >
              <Icon name={service.icon} size={24} filled={false} />
            </div>
            <h3 className="font-h2 text-h2 text-primary uppercase mb-4">
              {service.title}
            </h3>
            <p className="font-body-sm text-body-sm text-gray-700 mb-6 grow">
              {service.description}
            </p>
            <ul className="space-y-2 mb-6">
              {service.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2 font-body-sm text-body-sm text-steel"
                >
                  <Icon
                    name="check_circle"
                    size={16}
                    className="text-secondary mt-0.5 shrink-0"
                    filled={false}
                  />
                  {feature}
                </li>
              ))}
            </ul>
            <span className="font-label text-label text-primary uppercase flex items-center gap-1 mt-auto">
              View Details
              <Icon name="arrow_forward" size={16} filled={false} />
            </span>
          </article>
        ))}
      </div>
    </section>
  )
}
