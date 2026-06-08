import { clientsPage } from '../../data/clients'
import { Icon } from '../Icon'

export function ClientsMetrics() {
  const { metrics } = clientsPage

  return (
    <section className="mb-space-16 border border-gray-100 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x border-gray-100">
        {metrics.map((metric) => (
          <div key={metric.label} className="p-space-8 text-center bg-gray-50">
            <Icon name={metric.icon} size={40} className="text-secondary mb-space-2" />
            <p className="font-display-lg text-display-lg text-primary font-mono-data">
              {metric.value}
            </p>
            <p className="font-label text-label text-gray-700 mt-2">{metric.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
