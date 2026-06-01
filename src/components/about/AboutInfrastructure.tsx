import { useAboutPageData } from '../../context/PageDataContext'
import { Icon } from '../Icon'

export function AboutInfrastructure() {
  const { infrastructure } = useAboutPageData()

  return (
    <section className="px-margin-mobile md:px-margin-desktop py-space-16">
      <div className="mb-space-12 text-center md:text-left">
        <h2 className="font-h1 text-h1 text-primary uppercase border-l-4 border-secondary pl-space-4 inline-block">
          {infrastructure.title}
        </h2>
        <p className="font-body-lg text-body-lg text-gray-500 mt-space-2 max-w-3xl">
          {infrastructure.subtitle}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
        <div className="md:col-span-4 flex flex-col gap-space-4">
          {infrastructure.features.map((feature) => (
            <div
              key={feature.title}
              className={
                feature.variant === 'primary'
                  ? 'bg-primary text-on-primary p-space-6 rounded-xl border border-primary-fixed shadow-sm'
                  : 'bg-white border border-gray-100 p-space-6 rounded-xl shadow-sm'
              }
            >
              <h4
                className={`font-h3 text-h3 uppercase mb-space-2 flex items-center gap-space-2 ${
                  feature.variant === 'primary' ? '' : 'text-primary'
                }`}
              >
                <Icon name={feature.icon} />
                {feature.title}
              </h4>
              <p
                className={`font-body-sm text-body-sm ${
                  feature.variant === 'primary'
                    ? 'text-surface-bright/80'
                    : 'text-gray-700'
                }`}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
        <div
          className="md:col-span-8 h-full min-h-[400px] border border-gray-100 rounded-xl overflow-hidden bg-gray-50"
          role="img"
          aria-label={infrastructure.facilityImageAlt}
          style={{
            backgroundImage: `url('${infrastructure.facilityImage}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </div>
    </section>
  )
}
