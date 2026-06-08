import { clientsPage } from '../../data/clients'

export function ClientsTestimonials() {
  const { testimonials } = clientsPage

  return (
    <section>
      <div className="mb-space-8 flex items-center justify-between border-b border-gray-300 pb-space-2">
        <h2 className="font-h2 text-h2 text-on-background uppercase">
          {testimonials.title}
        </h2>
        <span className="font-label text-label text-gray-500 hidden sm:inline">
          {testimonials.subtitle}
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-space-6">
        {testimonials.items.map((testimonial) => (
          <article
            key={testimonial.title}
            className={`bg-white border border-gray-100 border-l-4 p-space-6 flex flex-col justify-between ${
              testimonial.accent === 'secondary' ? 'border-l-secondary' : 'border-l-primary'
            }`}
          >
            <div>
              <div className="flex justify-between items-start gap-space-4 mb-space-4">
                <h3 className="font-h3 text-h3 text-primary uppercase">{testimonial.title}</h3>
                <span className="bg-gray-50 text-gray-700 border border-gray-100 px-2 py-1 font-mono-data text-[11px] shrink-0">
                  {testimonial.tag}
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant italic mb-space-6">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
            </div>
            <div className="border-t border-gray-100 pt-space-4 mt-auto">
              <p className="font-label text-label text-on-background">{testimonial.author}</p>
              <p className="font-body-sm text-body-sm text-gray-500 text-xs mt-1 uppercase">
                {testimonial.organization}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
