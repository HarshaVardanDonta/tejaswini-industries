import { aboutPage } from '../../data/about'
import { Icon } from '../Icon'

export function AboutCta() {
  const { cta } = aboutPage

  return (
    <section className="px-margin-mobile md:px-margin-desktop py-space-16 text-center border-b border-gray-100 bg-surface-bright">
      <h2 className="font-display-xl text-display-xl text-primary uppercase mb-space-4">
        {cta.title}
      </h2>
      <p className="font-body-lg text-body-lg text-gray-500 max-w-2xl mx-auto mb-space-8">
        {cta.description}
      </p>
      <button
        type="button"
        className="bg-primary text-on-primary font-label text-label uppercase tracking-widest px-space-8 py-space-4 rounded hover:bg-surface-tint transition-colors border border-transparent focus:ring-2 focus:ring-offset-2 focus:ring-primary inline-flex items-center gap-space-2"
      >
        <span>{cta.buttonLabel}</span>
        <Icon name="arrow_forward" size={16} filled={false} />
      </button>
    </section>
  )
}
