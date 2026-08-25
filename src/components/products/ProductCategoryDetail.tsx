import { Link } from 'react-router-dom'
import type { ProductCategory } from '../../data/productCategories'
import { buildCategoryInquiryWhatsAppUrl } from '../../constants/contactInfo'
import { CONTACT_PATH } from '../../constants/routes'
import { Icon } from '../Icon'
import { ProductCategoryBreadcrumb } from './ProductCategoryBreadcrumb'

type ProductCategoryDetailProps = {
  category: ProductCategory
}

export function ProductCategoryDetail({ category }: ProductCategoryDetailProps) {
  const whatsAppUrl = buildCategoryInquiryWhatsAppUrl(category.title)

  return (
    <main className="grow w-full max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop py-space-8 md:py-space-12">
      <ProductCategoryBreadcrumb categoryTitle={category.title} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter mb-space-12">
        <div className="rounded-xl overflow-hidden border border-gray-100 bg-gray-50 aspect-[4/3] lg:aspect-auto lg:min-h-[360px]">
          <img
            src={category.image}
            alt={category.imageAlt}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="font-display-lg text-display-lg md:font-display-xl md:text-display-xl text-primary uppercase tracking-tight mb-space-4">
            {category.title}
          </h1>
          <p className="font-body-lg text-body-lg text-gray-700 mb-space-8 border-l-[3px] border-secondary pl-space-4">
            {category.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-space-3">
            <Link
              to={CONTACT_PATH}
              className="inline-flex items-center justify-center bg-primary text-on-primary font-label text-label uppercase px-space-6 py-space-3 rounded-lg hover:bg-primary-container hover:text-on-primary-container transition-colors"
            >
              Ask Us
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

      {category.technicalSpecs.length > 0 ? (
        <section className="mb-space-12">
          <h2 className="font-h2 text-h2 text-primary uppercase border-b-2 border-gray-100 pb-space-2 mb-space-6">
            Technical Specification
          </h2>
          <ul className="space-y-space-3">
            {category.technicalSpecs.map((spec) => (
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

      {category.bodyParagraphs.length > 0 ? (
        <section>
          <h2 className="font-h2 text-h2 text-primary uppercase border-b-2 border-gray-100 pb-space-2 mb-space-6">
            Description
          </h2>
          <div className="font-body-lg text-body-lg text-gray-700 space-y-space-4">
            {category.bodyParagraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  )
}
