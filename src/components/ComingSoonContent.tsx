import { Link } from 'react-router-dom'
import { Icon } from './Icon'

type ComingSoonContentProps = {
  title: string
  description: string
}

export function ComingSoonContent({ title, description }: ComingSoonContentProps) {
  return (
    <>
      <section className="relative bg-tertiary text-on-tertiary pt-space-16 pb-space-12 px-margin-mobile md:px-margin-desktop overflow-hidden border-b border-outline-variant">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,var(--color-blue-light),transparent)]" />
        <div className="max-w-[1280px] mx-auto relative z-10">
          <div className="border-l-4 border-secondary pl-space-4">
            <h1 className="font-display-xl-mobile md:font-display-xl text-display-xl-mobile md:text-display-xl uppercase tracking-tight text-white mb-space-2">
              {title}
            </h1>
            <p className="font-body-lg text-body-lg text-tertiary-fixed-dim max-w-3xl">
              {description}
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop py-space-16">
        <div className="max-w-xl mx-auto text-center border border-gray-300 bg-white rounded p-space-12 shadow-sm">
          <Icon name="engineering" size={48} className="text-primary mx-auto mb-space-4" />
          <p className="font-h2 text-h2 text-primary uppercase mb-space-3">Coming Soon</p>
          <p className="font-body-sm text-body-sm text-gray-700 mb-space-8">
            We are preparing this section and will share updates here shortly.
            For immediate opportunities or inquiries, please reach out to our team.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-primary text-on-primary font-label text-label uppercase px-space-6 py-space-3 rounded hover:bg-primary-container transition-colors"
          >
            Contact Us
            <Icon name="arrow_forward" size={18} filled={false} />
          </Link>
        </div>
      </section>
    </>
  )
}
