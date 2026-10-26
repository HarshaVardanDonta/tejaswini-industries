import { Link } from 'react-router-dom'
import type { BlogFigure } from '../../context/BlogDetailContext'
import { useBlogDetail } from '../../context/BlogDetailContext'
import { CONTACT_PATH } from '../../constants/routes'
import { contactInfo, getWhatsAppUrl } from '../../constants/contactInfo'
import { Icon } from '../Icon'
import { RichText } from './RichText'

function Paragraphs({ items }: { items?: string[] }) {
  return (
    <>
      {items?.map((paragraph, index) => (
        <p key={index} className="mt-space-6">
          <RichText text={paragraph} />
        </p>
      ))}
    </>
  )
}

function Bullets({ items }: { items?: string[] }) {
  if (!items?.length) return null
  return (
    <ul className="list-none space-y-space-2 pl-0 mt-space-4">
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-space-2">
          <Icon name="check_circle" size={20} filled={false} className="text-secondary mt-[2px] shrink-0" />
          <span>
            <RichText text={item} />
          </span>
        </li>
      ))}
    </ul>
  )
}

function Figure({ figure }: { figure: BlogFigure }) {
  return (
    <figure
      className={`my-space-8 mx-auto ${figure.maxWidth === 'full' ? 'max-w-full' : 'max-w-md'}`}
    >
      <img
        src={figure.url}
        alt={figure.alt}
        width={figure.width}
        height={figure.height}
        loading="lazy"
        decoding="async"
        className="w-full h-auto rounded industrial-border"
      />
      {figure.caption ? (
        <figcaption className="font-body-sm text-body-sm text-gray-700 mt-space-2">
          {figure.caption}
        </figcaption>
      ) : null}
    </figure>
  )
}

export function BlogDetailContent() {
  const { intro, sections, faqs, cta } = useBlogDetail()

  return (
    <div className="font-body-lg text-body-lg text-on-surface space-y-space-6 max-w-none">
      <p className="text-[18px] leading-relaxed font-semibold text-gray-700 border-l-2 border-gray-300 pl-space-4">
        <RichText text={intro} />
      </p>

      {sections.map((section) => (
        <div key={section.id}>
          <h2
            id={section.id}
            className="font-h2 text-h2 text-primary uppercase border-b-2 border-gray-100 pb-space-2 mt-space-8 scroll-mt-24"
          >
            {section.title}
          </h2>
          <Paragraphs items={section.paragraphs} />
          <Bullets items={section.bullets} />

          {section.subsections?.map((subsection) => (
            <div key={subsection.id}>
              <h3
                id={subsection.id}
                className="font-h3 text-h3 text-tertiary mt-space-6 scroll-mt-24"
              >
                {subsection.title}
              </h3>
              <Paragraphs items={subsection.paragraphs} />
              <Bullets items={subsection.bullets} />
              {subsection.checklist?.length ? (
                <ul className="list-none space-y-space-2 pl-0 mt-space-4">
                  {subsection.checklist.map((item) => (
                    <li key={item.label} className="flex items-start gap-space-2">
                      <Icon
                        name="check_circle"
                        size={20}
                        filled={false}
                        className="text-secondary mt-[2px] shrink-0"
                      />
                      <span>
                        <strong>{item.label}</strong> <RichText text={item.text} />
                      </span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}

          {section.table && (
            <div className="w-full overflow-x-auto my-space-6 rounded industrial-border">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-300">
                    {section.table.headers.map((header) => (
                      <th
                        key={header}
                        className="p-space-3 font-label text-label text-gray-700 uppercase tracking-wide"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="font-mono-data text-mono-data text-on-surface">
                  {section.table.rows.map((row, index) => (
                    <tr
                      key={index}
                      className={`border-b border-gray-100 hover:bg-gray-50/50 transition-colors ${
                        index % 2 === 1 ? 'bg-gray-50' : ''
                      }`}
                    >
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex} className={`p-space-3 ${cellIndex === 0 ? 'font-semibold' : ''}`}>
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <Paragraphs items={section.closing} />
          {section.figure ? <Figure figure={section.figure} /> : null}

          {section.alert && (
            <div className="industrial-card industrial-card-critical p-space-4 my-space-6">
              <div className="flex gap-space-3">
                <Icon name="warning" size={24} className="text-secondary shrink-0" />
                <div>
                  <h4 className="font-h3 text-h3 text-on-surface mb-space-1">{section.alert.title}</h4>
                  <p className="font-body-sm text-body-sm text-gray-700 m-0">{section.alert.message}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      {faqs.length > 0 && (
        <section aria-labelledby="faq">
          <h2
            id="faq"
            className="font-h2 text-h2 text-primary uppercase border-b-2 border-gray-100 pb-space-2 mt-space-8 scroll-mt-24"
          >
            Frequently asked questions
          </h2>
          <div className="flex flex-col gap-space-6 mt-space-6">
            {faqs.map((item) => (
              <div key={item.question}>
                <h3 className="font-h3 text-h3 text-tertiary">{item.question}</h3>
                <p className="mt-space-2">
                  <RichText text={item.answer} />
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {cta && (
        <aside className="bg-primary text-on-primary rounded-lg p-space-6 border-t-4 border-secondary mt-space-8">
          <h2 className="font-h2 text-h2 uppercase mb-space-2">{cta.title}</h2>
          <p className="font-body-sm text-body-sm text-on-primary/80 mb-space-6">{cta.text}</p>
          <div className="flex flex-wrap gap-space-3">
            <Link
              to={CONTACT_PATH}
              className="bg-secondary text-on-secondary font-label text-label px-space-6 py-space-3 rounded-sm uppercase tracking-widest hover:bg-secondary/90 transition-colors"
            >
              Request a quote
            </Link>
            <a
              href={getWhatsAppUrl('Hello, I would like a quote for a distribution transformer. Please share details.')}
              className="border border-on-primary/60 text-on-primary font-label text-label px-space-6 py-space-3 rounded-sm uppercase tracking-widest hover:bg-on-primary/10 transition-colors"
              rel="noopener"
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
      )}
    </div>
  )
}
