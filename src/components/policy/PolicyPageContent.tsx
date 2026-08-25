import type { PolicyContent } from '../../data/policies'

type PolicyPageContentProps = {
  policy: PolicyContent
}

export function PolicyPageContent({ policy }: PolicyPageContentProps) {
  return (
    <>
      <section className="relative bg-tertiary text-on-tertiary pt-space-16 pb-space-12 px-margin-mobile md:px-margin-desktop overflow-hidden border-b border-outline-variant">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,var(--color-blue-light),transparent)]" />
        <div className="max-w-[1280px] mx-auto relative z-10">
          <div className="border-l-4 border-secondary pl-space-4">
            <h1 className="font-display-xl-mobile md:font-display-xl text-display-xl-mobile md:text-display-xl uppercase tracking-tight text-white mb-space-2">
              {policy.title}
            </h1>
            <p className="font-body-lg text-body-lg text-tertiary-fixed-dim max-w-3xl">
              {policy.intro}
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop py-space-12">
        <p className="font-label text-label text-gray-500 uppercase mb-space-8">
          Last updated: {policy.lastUpdated}
        </p>

        <div className="space-y-space-8 max-w-3xl">
          {policy.sections.map((section) => (
            <div key={section.title}>
              <h2 className="font-h2 text-h2 text-primary uppercase mb-space-3 border-b border-gray-100 pb-space-2">
                {section.title}
              </h2>
              <div className="space-y-space-3">
                {section.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="font-body-sm text-body-sm text-gray-700 leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
