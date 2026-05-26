import { Icon } from './Icon'

const features = [
  {
    icon: 'architecture',
    title: 'Precision Design',
    description:
      'Engineered utilizing advanced CAD systems, ensuring structural integrity and optimal thermal dynamics for every unit fabricated.',
    accent: 'primary' as const,
  },
  {
    icon: 'verified_user',
    title: 'Rigorous Testing',
    description:
      'Every product undergoes a multi-stage quality assurance protocol, simulating extreme operational loads prior to deployment.',
    accent: 'secondary' as const,
  },
  {
    icon: 'support_agent',
    title: 'Lifeline Support',
    description:
      'Dedicated field service teams provide rapid-response maintenance and lifecycle support, minimizing critical downtime.',
    accent: 'primary' as const,
  },
]

export function TechnicalSupremacy() {
  return (
    <section className="py-space-16 px-margin-mobile md:px-margin-desktop bg-surface max-w-[1280px] mx-auto w-full">
      <div className="text-center mb-space-12">
        <h2 className="font-display-lg text-display-lg text-gray-700 uppercase mb-space-2">
          Technical Supremacy
        </h2>
        <div className="w-16 h-1 bg-secondary mx-auto" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-space-6">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="bg-white border border-gray-100 p-space-6 rounded-sm shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
          >
            <div
              className={`absolute top-0 left-0 w-1 h-full transition-all duration-300 group-hover:w-2 ${
                feature.accent === 'secondary' ? 'bg-secondary' : 'bg-primary'
              }`}
            />
            <Icon
              name={feature.icon}
              className={`text-[40px] mb-space-4 ${
                feature.accent === 'secondary' ? 'text-secondary' : 'text-primary'
              }`}
            />
            <h3 className="font-h3 text-h3 text-gray-700 uppercase mb-space-2">
              {feature.title}
            </h3>
            <p className="font-body-sm text-body-sm text-gray-500">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
