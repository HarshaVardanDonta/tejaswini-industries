import { useCmsQuery } from '../hooks/useCmsQuery'
import type { FaqItem } from '../cms/types'

export function FaqList({ page, heading = 'Questions buyers ask' }: { page: string; heading?: string }) {
  const { data } = useCmsQuery<{ items?: FaqItem[] } | null>('*[_id == "faqs"][0]')
  const items = (data?.items || []).filter((item) => item.page === page || item.page === 'all')
  if (!items.length) return null

  return (
    <section className="max-w-[1280px] mx-auto w-full px-margin-mobile md:px-margin-desktop py-space-12">
      <h2 className="font-h2 text-h2 text-primary uppercase border-b-2 border-gray-100 pb-space-2 mb-space-6">
        {heading}
      </h2>
      <div className="flex flex-col gap-space-6">
        {items.map((item) => (
          <article key={item.id}>
            <h3 className="font-h3 text-h3 text-on-surface mb-space-2">{item.question}</h3>
            <p className="font-body-lg text-body-lg text-gray-700 max-w-3xl">{item.answer}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export function usePageFaqs(page: string): FaqItem[] {
  const { data } = useCmsQuery<{ items?: FaqItem[] } | null>('*[_id == "faqs"][0]')
  return (data?.items || []).filter((item) => item.page === page || item.page === 'all')
}
