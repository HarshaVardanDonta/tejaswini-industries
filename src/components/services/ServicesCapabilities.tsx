import { useServicesPageData } from '../../context/PageDataContext'
import { Icon } from '../Icon'

export function ServicesCapabilities() {
  const { capabilities } = useServicesPageData()

  return (
    <section className="py-space-16 px-margin-mobile md:px-margin-desktop w-full max-w-[1280px] mx-auto bg-surface">
      <div className="mb-space-8">
        <h2 className="font-display-lg text-display-lg text-primary uppercase">
          Technical Capabilities
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4">
        <div className="md:col-span-2 md:row-span-2 bg-white border border-gray-300 rounded-lg p-8 flex flex-col justify-end relative overflow-hidden group min-h-[280px]">
          <img
            src={capabilities.featured.image}
            alt={capabilities.featured.imageAlt}
            className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale group-hover:grayscale-0 group-hover:opacity-40 transition-all duration-500"
          />
          <div className="relative z-10 bg-white/90 p-6 border-l-4 border-primary">
            <h3 className="font-h2 text-h2 text-primary uppercase mb-2">
              {capabilities.featured.title}
            </h3>
            <p className="font-body-sm text-body-sm text-gray-700">
              {capabilities.featured.description}
            </p>
          </div>
        </div>
        <div className="md:col-span-2 bg-gray-50 border border-gray-200 rounded-lg p-6 flex items-center gap-6">
          <div className="w-16 h-16 bg-white border border-gray-200 rounded shrink-0 flex items-center justify-center text-primary shadow-sm">
            <Icon name={capabilities.internalElectrification.icon} size={32} filled={false} />
          </div>
          <div>
            <h3 className="font-h3 text-h3 text-primary uppercase mb-1">
              {capabilities.internalElectrification.title}
            </h3>
            <p className="font-body-sm text-body-sm text-gray-600">
              {capabilities.internalElectrification.description}
            </p>
          </div>
        </div>
        <div className="bg-primary text-white rounded-lg p-6 flex flex-col justify-between min-h-[140px]">
          <Icon name={capabilities.structural.icon} size={32} filled={false} />
          <div>
            <h3 className="font-h3 text-h3 uppercase mb-2">
              {capabilities.structural.title}
            </h3>
            <p className="font-body-sm text-body-sm text-primary-fixed-dim">
              {capabilities.structural.description}
            </p>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col justify-between shadow-sm min-h-[140px]">
          <Icon name={capabilities.energyAuditing.icon} size={32} className="text-secondary" filled={false} />
          <div>
            <h3 className="font-h3 text-h3 text-primary uppercase mb-2">
              {capabilities.energyAuditing.title}
            </h3>
            <p className="font-body-sm text-body-sm text-gray-600">
              {capabilities.energyAuditing.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
