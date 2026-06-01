import { useAboutPageData } from '../../context/PageDataContext'
import { Icon } from '../Icon'

export function AboutVisionMission() {
  const { visionMission } = useAboutPageData()
  return (
    <section className="bg-gray-50 py-space-16 border-y border-gray-100">
      <div className="px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
          {visionMission.map((card) => (
            <div
              key={card.title}
              className={`bg-white border border-gray-100 rounded-xl p-space-8 shadow-sm transition-colors ${
                card.variant === 'mission'
                  ? 'border-l-4 border-l-secondary hover:border-gray-300'
                  : 'hover:border-primary focus-within:ring focus-within:ring-primary/20'
              }`}
            >
              <div
                className={`w-16 h-16 flex items-center justify-center rounded mb-space-6 border ${
                  card.variant === 'mission'
                    ? 'bg-red-light border-secondary-fixed'
                    : 'bg-blue-light border-primary-fixed'
                }`}
              >
                <Icon
                  name={card.icon}
                  size={36}
                  className={
                    card.variant === 'mission' ? 'text-secondary' : 'text-primary'
                  }
                />
              </div>
              <h3 className="font-h1 text-h1 text-primary uppercase mb-space-4">
                {card.title}
              </h3>
              <p className="font-body-lg text-body-lg text-gray-700">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
