import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { mapBlogPost } from '../../cms/mappers'
import { queries } from '../../cms/queries'
import { contactInfo, getWhatsAppUrl } from '../../constants/contactInfo'
import { CONTACT_PATH } from '../../constants/routes'
import {
  getProductCategoryById,
  getProductCategoryPath,
  type ProductFaq,
  type ProductSection,
  type ProductSpecRow,
} from '../../data/productCategories'
import { useCmsQuery } from '../../hooks/useCmsQuery'
import { RichText } from '../blog-detail/RichText'
import { Icon } from '../Icon'

const H2 =
  'font-h2 text-h2 text-primary uppercase border-b-2 border-gray-100 pb-space-2 mb-space-6 scroll-mt-24'

/** 40 to 60 word direct answer shown first on the page. */
export function ShortAnswer({ text, label = 'In short' }: { text: string; label?: string }) {
  return (
    <aside
      aria-label="Short answer"
      data-short-answer
      className="bg-gray-50 border border-gray-100 border-l-[3px] border-l-secondary rounded-lg p-space-4 md:p-space-6"
    >
      <p className="font-label text-label text-secondary uppercase tracking-widest mb-space-2">
        {label}
      </p>
      <p className="font-body-lg text-body-lg text-on-surface">{text}</p>
    </aside>
  )
}

/** Rating, voltage class and approval facts shown under the heading. */
export function HeroFacts({ facts }: { facts: string[] }) {
  if (!facts.length) return null
  return (
    <ul aria-label="Key facts" className="flex flex-wrap gap-space-2 mb-space-6 list-none p-0">
      {facts.map((fact) => (
        <li
          key={fact}
          className="font-label text-label uppercase tracking-wide text-primary bg-white border border-gray-300 rounded px-space-3 py-space-1"
        >
          {fact}
        </li>
      ))}
    </ul>
  )
}

export function SpecsTable({
  rows,
  caption = 'Specifications',
}: {
  rows: ProductSpecRow[]
  caption?: string
}) {
  if (!rows.length) return null
  return (
    <div className="w-full overflow-x-auto my-space-6 rounded-lg border border-gray-100">
      <table className="w-full text-left border-collapse">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="bg-gray-50 border-b border-gray-300">
            <th scope="col" className="p-space-3 font-label text-label text-gray-700 uppercase tracking-wide">
              Parameter
            </th>
            <th scope="col" className="p-space-3 font-label text-label text-gray-700 uppercase tracking-wide">
              Specification
            </th>
          </tr>
        </thead>
        <tbody className="font-body-sm text-body-sm text-on-surface">
          {rows.map((row, index) => (
            <tr key={row.label} className={`border-b border-gray-100 ${index % 2 === 1 ? 'bg-gray-50' : ''}`}>
              <th scope="row" className="p-space-3 font-semibold align-top w-2/5">
                {row.label}
              </th>
              <td className="p-space-3">{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function OnThisPage({ sections, hasFaq }: { sections: ProductSection[]; hasFaq: boolean }) {
  if (!sections.length) return null
  return (
    <nav aria-label="On this page" className="mb-space-8">
      <p className="font-label text-label text-gray-500 uppercase tracking-widest mb-space-2">
        On this page
      </p>
      <ul className="flex flex-wrap gap-x-space-4 gap-y-space-2">
        {sections.map((section) => (
          <li key={section.id}>
            <a href={`#${section.id}`} className="font-body-sm text-body-sm text-secondary hover:text-primary">
              {section.title}
            </a>
          </li>
        ))}
        {hasFaq ? (
          <li>
            <a href="#faq" className="font-body-sm text-body-sm text-secondary hover:text-primary">
              Frequently asked questions
            </a>
          </li>
        ) : null}
      </ul>
    </nav>
  )
}

export function SectionBody({
  section,
  specs,
  options,
}: {
  section: ProductSection
  specs: ProductSpecRow[]
  options?: React.ReactNode
}) {
  return (
    <section aria-labelledby={section.id} className="mb-space-12">
      <h2 id={section.id} className={H2}>
        {section.title}
      </h2>
      <div className="font-body-lg text-body-lg text-gray-700 space-y-space-4">
        {section.paragraphs.map((paragraph, index) => (
          <p key={index}>
            <RichText text={paragraph} />
          </p>
        ))}
      </div>
      {section.bullets?.length ? (
        <ul className="list-none space-y-space-2 pl-0 mt-space-4 font-body-lg text-body-lg text-gray-700">
          {section.bullets.map((item, index) => (
            <li key={index} className="flex items-start gap-space-2">
              <Icon name="check_circle" size={20} filled={false} className="text-secondary mt-[2px] shrink-0" />
              <span>
                <RichText text={item} />
              </span>
            </li>
          ))}
        </ul>
      ) : null}
      {section.table ? <SpecsTable rows={specs} /> : null}
      {section.extraTables?.map((table) => (
        <div key={table.caption} className="w-full overflow-x-auto my-space-6 rounded-lg border border-gray-100">
          <table className="w-full text-left border-collapse">
            <caption className="p-space-3 text-left font-body-sm text-body-sm font-semibold text-gray-700 bg-gray-50 border-b border-gray-100">
              {table.caption}
            </caption>
            <thead>
              <tr className="bg-gray-50 border-b border-gray-300">
                {table.headers.map((header) => (
                  <th key={header} scope="col" className="p-space-3 font-label text-label text-gray-700 uppercase tracking-wide">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="font-mono-data text-mono-data text-on-surface">
              {table.rows.map((row, index) => (
                <tr key={row[0]} className={`border-b border-gray-100 ${index % 2 === 1 ? 'bg-gray-50' : ''}`}>
                  {row.map((cell, cellIndex) =>
                    cellIndex === 0 ? (
                      <th key={cellIndex} scope="row" className="p-space-3 font-semibold">
                        {cell}
                      </th>
                    ) : (
                      <td key={cellIndex} className="p-space-3">
                        {cell}
                      </td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
      {section.extraTablesNote ? (
        <p className="font-body-sm text-body-sm text-gray-600 mt-space-2">{section.extraTablesNote}</p>
      ) : null}
      {section.options ? <div className="mt-space-6">{options}</div> : null}
      {section.closing?.length ? (
        <div className="font-body-lg text-body-lg text-gray-700 space-y-space-4 mt-space-4">
          {section.closing.map((paragraph, index) => (
            <p key={index}>
              <RichText text={paragraph} />
            </p>
          ))}
        </div>
      ) : null}
      {section.figure ? (
        <figure className={`my-space-8 ${section.figure.maxWidth === 'full' ? 'max-w-full' : 'max-w-md'}`}>
          <img
            src={section.figure.url}
            alt={section.figure.alt}
            width={section.figure.width}
            height={section.figure.height}
            loading="lazy"
            decoding="async"
            className="w-full h-auto rounded-lg border border-gray-100"
          />
          {section.figure.caption ? (
            <figcaption className="font-body-sm text-body-sm text-gray-700 mt-space-2">
              {section.figure.caption}
            </figcaption>
          ) : null}
        </figure>
      ) : null}
    </section>
  )
}

export function ProductFaqSection({
  faqs,
  heading = 'Frequently asked questions',
}: {
  faqs: ProductFaq[]
  heading?: string
}) {
  if (!faqs.length) return null
  return (
    <section aria-labelledby="faq" className="mb-space-12">
      <h2 id="faq" className={H2}>
        {heading}
      </h2>
      <div className="flex flex-col gap-space-6">
        {faqs.map((item) => (
          <article key={item.question}>
            <h3 className="font-h3 text-h3 text-on-surface mb-space-2">{item.question}</h3>
            <p className="font-body-lg text-body-lg text-gray-700 max-w-3xl">{item.answer}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export function RelatedGuides({ slugs }: { slugs: string[] }) {
  const { data } = useCmsQuery<Array<Record<string, unknown>>>(queries.blogPosts, {}, null)
  const guides = useMemo(() => {
    const posts = (data ?? []).map((post) => mapBlogPost(post as Parameters<typeof mapBlogPost>[0]))
    return slugs
      .map((slug) => posts.find((post) => post.slug === slug))
      .filter((post): post is NonNullable<typeof post> => Boolean(post))
  }, [data, slugs])
  if (!guides.length) return null
  return (
    <section aria-labelledby="related-guides" className="mb-space-12">
      <h2 id="related-guides" className={H2}>
        Related guides
      </h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
        {guides.map((post) => (
          <li key={post.slug} className="border border-gray-100 rounded-lg p-space-4 hover:border-primary transition-colors">
            <Link to={`/blogs/${post.slug}`} className="font-h3 text-h3 text-primary block mb-space-2">
              {post.title}
            </Link>
            <p className="font-body-sm text-body-sm text-gray-700">{post.excerpt}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

export function RelatedProducts({ ids, titles }: { ids: string[]; titles: Record<string, string> }) {
  const items = ids.filter((id) => titles[id] || getProductCategoryById(id))
  if (!items.length) return null
  return (
    <nav aria-label="Related products" className="mb-space-12">
      <h2 className={H2}>Related products</h2>
      <ul className="flex flex-wrap gap-space-3">
        {items.map((id) => (
          <li key={id}>
            <Link to={getProductCategoryPath(id)} className="font-label text-label uppercase text-secondary hover:text-primary">
              {titles[id] ?? getProductCategoryById(id)?.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export function EnquiryCta({
  title,
  text,
  whatsAppMessage,
  checklist = [],
}: {
  title: string
  text: string
  whatsAppMessage: string
  /** What to send with the enquiry. Added to the WhatsApp message as a fill-in list. */
  checklist?: string[]
}) {
  const message = checklist.length
    ? `${whatsAppMessage}\n\n${checklist.map((item) => `${item}: `).join('\n')}`
    : whatsAppMessage
  return (
    <aside className="bg-primary text-on-primary rounded-lg p-space-6 border-t-4 border-secondary mb-space-12">
      <h2 className="font-h2 text-h2 uppercase mb-space-2">{title}</h2>
      <p className="font-body-sm text-body-sm text-on-primary/80 mb-space-4">{text}</p>
      {checklist.length ? (
        <ul className="list-none p-0 mb-space-6 grid grid-cols-1 md:grid-cols-2 gap-space-1 font-body-sm text-body-sm text-on-primary/90">
          {checklist.map((item) => (
            <li key={item} className="flex items-start gap-space-2">
              <Icon name="check_circle" size={18} filled={false} className="mt-[2px] shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : null}
      <div className="flex flex-wrap gap-space-3">
        <Link
          to={CONTACT_PATH}
          className="bg-secondary text-on-secondary font-label text-label px-space-6 py-space-3 rounded-sm uppercase tracking-widest hover:bg-secondary/90 transition-colors"
        >
          Request a quote
        </Link>
        <a
          href={getWhatsAppUrl(message)}
          rel="noopener"
          className="border border-on-primary/60 text-on-primary font-label text-label px-space-6 py-space-3 rounded-sm uppercase tracking-widest hover:bg-on-primary/10 transition-colors"
        >
          WhatsApp
        </a>
        <a
          href={contactInfo.phoneHref}
          className="border border-on-primary/60 text-on-primary font-label text-label px-space-6 py-space-3 rounded-sm uppercase tracking-widest hover:bg-on-primary/10 transition-colors"
        >
          Call {contactInfo.phone}
        </a>
      </div>
    </aside>
  )
}
