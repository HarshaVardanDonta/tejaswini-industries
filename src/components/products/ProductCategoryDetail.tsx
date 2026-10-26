import { Link } from 'react-router-dom'
import { type ProductCategory } from '../../data/productCategories'
import { buildCategoryInquiryWhatsAppUrl } from '../../constants/contactInfo'
import { CONTACT_PATH } from '../../constants/routes'
import { Icon } from '../Icon'
import { ProductCategoryBreadcrumb } from './ProductCategoryBreadcrumb'
import {
  EnquiryCta,
  HeroFacts,
  OnThisPage,
  ProductFaqSection,
  RelatedGuides,
  RelatedProducts,
  SectionBody,
  ShortAnswer,
  SpecsTable,
} from './ProductSeoBlocks'

const RELATED_DISTRIBUTION = [
  { id: 'distribution-transformers', label: 'Distribution transformers' },
  { id: 'dry-type-transformers', label: 'Dry type' },
]

const DISTRIBUTION_BUILD_OPTIONS = [
  {
    title: 'Winding',
    options: [
      {
        label: 'Aluminium (Al)',
        detail:
          'Lighter winding. The conductor cross-section is larger than copper for the same current.',
      },
      {
        label: 'Copper (Cu)',
        detail:
          'Higher conductivity than aluminium, so the conductor cross-section is smaller for the same current.',
      },
    ],
  },
  {
    title: 'Core type',
    options: [
      {
        label: 'CRGO',
        detail:
          'Cold-rolled grain-oriented silicon steel. The grain is aligned so magnetic loss is lower along the rolling direction.',
      },
      {
        label: 'Amorphous',
        detail:
          'Metallic-glass ribbon core. It generally has lower no-load loss than CRGO, and the tank is often larger for the same kVA.',
      },
    ],
  },
  {
    title: 'Cooling',
    options: [
      {
        label: 'Oil-cooled (ONAN)',
        detail:
          'Oil natural, air natural. Oil circulates naturally and the tank surface releases heat to the air. The same units are also described as oil-immersed.',
      },
    ],
  },
  {
    title: 'Tap changer',
    options: [
      {
        label: 'Off-load (OFTC)',
        detail: 'The tap is changed with the transformer isolated.',
      },
      {
        label: 'On-load (OLTC)',
        detail: 'The tap can be changed while the unit is in service.',
      },
    ],
  },
] as const

function DistributionBuildOptions() {
  return (
    <div aria-label="Distribution transformer options">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            {DISTRIBUTION_BUILD_OPTIONS.map((group) => (
              <div
                key={group.title}
                className="border border-gray-100 rounded-xl p-space-6 bg-white"
              >
                <h3 className="font-label text-label text-primary uppercase tracking-widest mb-space-4">
                  {group.title}
                </h3>
                <ul className="space-y-space-4">
                  {group.options.map((option) => (
                    <li key={option.label}>
                      <p className="font-h3 text-h3 text-on-surface">{option.label}</p>
                      <p className="font-body-sm text-body-sm text-gray-700 mt-space-1">
                        {option.detail}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
    </div>
  )
}

type ProductCategoryDetailProps = {
  category: ProductCategory
  /** Short link labels for related product ids. */
  relatedTitles?: Record<string, string>
}

export function presentCategory(category: ProductCategory): ProductCategory {
  if (category.id !== 'distribution-transformers') return category
  return {
    ...category,
    description: category.description.replace(
      /aluminium windings/i,
      'aluminium or copper windings',
    ),
    technicalSpecs: category.technicalSpecs.map((spec) =>
      /^winding:\s*aluminium$/i.test(spec.trim())
        ? 'Winding: aluminium (Al) or copper (Cu)'
        : spec,
    ),
    bodyParagraphs: category.bodyParagraphs.map((paragraph) =>
      paragraph.replace(
        'Windings on this range are aluminium.',
        'Windings are aluminium (Al) or copper (Cu).',
      ),
    ),
  }
}

export function ProductCategoryDetail({ category, relatedTitles = {} }: ProductCategoryDetailProps) {
  const product = presentCategory(category)
  const whatsAppUrl = buildCategoryInquiryWhatsAppUrl(product.title)
  const sections = product.sections ?? []
  const specs = product.specsTable ?? []
  const faqs = product.faqs ?? []
  const structured = sections.length > 0

  return (
    <main className="grow w-full max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop py-space-8 md:py-space-12">
      <ProductCategoryBreadcrumb categoryTitle={product.title} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter mb-space-8">
        <div className="rounded-xl overflow-hidden border border-gray-100 bg-gray-50 aspect-[4/3] lg:aspect-auto lg:min-h-[360px]">
          <img
            src={product.image}
            alt={product.imageAlt}
            className="w-full h-full object-cover"
            width={960}
            height={720}
            decoding="async"
            fetchPriority="high"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="font-display-lg text-display-lg md:font-display-xl md:text-display-xl text-primary uppercase tracking-tight mb-space-4">
            {product.title}
          </h1>
          <HeroFacts facts={product.heroFacts ?? []} />
          {product.shortAnswer ? (
            <div className="mb-space-6">
              <ShortAnswer text={product.shortAnswer} />
            </div>
          ) : (
            <p className="font-body-lg text-body-lg text-gray-700 mb-space-8 border-l-[3px] border-secondary pl-space-4">
              {product.description}
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-space-3">
            <Link
              to={CONTACT_PATH}
              className="inline-flex items-center justify-center bg-primary text-on-primary font-label text-label uppercase px-space-6 py-space-3 rounded-lg hover:bg-primary-container hover:text-on-primary-container transition-colors"
            >
              Request a quote
            </Link>
            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-space-2 border border-primary text-primary font-label text-label uppercase px-space-6 py-space-3 rounded-lg hover:bg-primary hover:text-on-primary transition-colors"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {structured ? (
        <>
          <OnThisPage sections={sections} hasFaq={faqs.length > 0} />
          {sections.map((section) => (
            <SectionBody
              key={section.id}
              section={section}
              specs={specs}
              options={product.id === 'distribution-transformers' ? <DistributionBuildOptions /> : null}
            />
          ))}
        </>
      ) : (
        <>
          {specs.length > 0 ? (
            <section className="mb-space-12">
              <h2 className="font-h2 text-h2 text-primary uppercase border-b-2 border-gray-100 pb-space-2 mb-space-6">
                Technical Specification
              </h2>
              <SpecsTable rows={specs} />
            </section>
          ) : null}
      {product.technicalSpecs.length > 0 && specs.length === 0 ? (
        <section className="mb-space-12">
          <h2 className="font-h2 text-h2 text-primary uppercase border-b-2 border-gray-100 pb-space-2 mb-space-6">
            Technical Specification
          </h2>
          <ul className="space-y-space-3">
            {product.technicalSpecs.map((spec) => (
              <li
                key={spec}
                className="flex items-start gap-space-2 font-body-sm text-body-sm text-gray-700"
              >
                <Icon
                  name="check_circle"
                  size={18}
                  className="text-secondary mt-0.5 shrink-0"
                  filled={false}
                />
                {spec}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {product.bodyParagraphs.length > 0 ? (
        <section>
          <h2 className="font-h2 text-h2 text-primary uppercase border-b-2 border-gray-100 pb-space-2 mb-space-6">
            Description
          </h2>
          <div className="font-body-lg text-body-lg text-gray-700 space-y-space-4">
            {product.bodyParagraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
            ))}
          </div>
        </section>
      ) : null}
        </>
      )}

      <ProductFaqSection faqs={faqs} />
      <RelatedGuides slugs={product.relatedGuides ?? []} />
      <EnquiryCta
        title={`Need a quote for ${product.title.replace(/ in Hyderabad$/i, '')}?`}
        text="Send your specification and Tejaswini Industries will reply with a quotation from its works in Mallapur, Hyderabad. Useful details to include:"
        checklist={product.quoteChecklist ?? []}
        whatsAppMessage={`Hello, I would like a quote for ${product.title.replace(/ in Hyderabad$/i, '')}. Please share details.`}
      />
      <RelatedProducts
        ids={
          product.relatedProducts?.length
            ? product.relatedProducts
            : RELATED_DISTRIBUTION.filter((item) => item.id !== product.id).map((item) => item.id)
        }
        titles={relatedTitles}
      />
    </main>
  )
}
