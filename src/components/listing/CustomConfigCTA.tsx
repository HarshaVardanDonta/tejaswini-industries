import { Icon } from '../Icon'

export function CustomConfigCTA() {
  return (
    <section className="mt-space-8 bg-surface-container-low border border-gray-300 rounded-lg p-space-8 text-center">
      <h2 className="font-h1 text-h1 text-on-surface uppercase mb-space-4">
        Require a Custom Configuration?
      </h2>
      <p className="font-body-lg text-body-lg text-gray-700 max-w-2xl mx-auto mb-space-6">
        Our engineering team can design and manufacture distribution transformers
        tailored to specific voltage ratios, impedance requirements, or specialized
        dimensional constraints.
      </p>
      <button
        type="button"
        className="bg-secondary hover:bg-secondary/90 text-white font-label text-label uppercase px-space-8 py-space-4 rounded-lg shadow-sm transition-colors inline-flex items-center gap-2"
      >
        <Icon name="engineering" size={20} filled={false} />
        Request Custom Configuration
      </button>
    </section>
  )
}
