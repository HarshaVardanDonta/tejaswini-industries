import { Link } from 'react-router-dom'
import { useProductDetail } from '../../context/ProductDetailContext'
import { buildProductProposalWhatsAppUrl } from '../../constants/contactInfo'
import { REQUEST_QUOTE_PATH } from '../../constants/routes'
import { Icon } from '../Icon'

export function ProductDetailInfo() {
  const { sku, title, description, quickSpecs, technicalParameters } =
    useProductDetail()
  const proposalWhatsAppUrl = buildProductProposalWhatsAppUrl({
    sku,
    title,
    quickSpecs,
    technicalParameters,
  })
  const quoteUrl = `${REQUEST_QUOTE_PATH}?product=${encodeURIComponent(title)}&sku=${encodeURIComponent(sku)}&category=distribution-transformers`

  return (
    <div className="md:col-span-5 flex flex-col justify-start">
      <div className="mb-space-2 flex gap-space-2 flex-wrap">
        <span className="bg-primary text-on-primary px-space-2 py-space-1 rounded font-label text-label uppercase">
          In Stock
        </span>
        <span className="bg-gray-100 text-gray-700 border border-gray-300 px-space-2 py-space-1 rounded font-label text-label uppercase">
          SKU: {sku}
        </span>
      </div>
      <h1 className="font-display-lg text-display-lg md:font-display-xl md:text-display-xl text-primary mb-space-4 uppercase tracking-tight">
        {title}
      </h1>
      <p className="font-body-lg text-body-lg text-gray-700 mb-space-6 border-l-[3px] border-secondary pl-space-4 py-1">
        {description}
      </p>
      <div className="bg-gray-50 border border-gray-100 rounded-lg p-space-4 mb-space-6">
        <h3 className="font-h3 text-h3 text-gray-700 mb-space-3 uppercase">
          Primary Specifications
        </h3>
        <ul className="grid grid-cols-2 gap-space-3 font-body-sm text-body-sm text-gray-700">
          {quickSpecs.map((spec) => (
            <li key={spec.label} className="flex flex-col">
              <span className="font-label text-label text-gray-500 uppercase">
                {spec.label}
              </span>
              <span
                className={`font-mono-data text-mono-data ${
                  spec.highlight ? 'text-primary font-bold' : ''
                }`}
              >
                {spec.value}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-space-3 mt-auto">
        <a
          href={proposalWhatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-primary text-on-primary font-label text-label uppercase tracking-widest py-space-4 rounded hover:bg-primary-fixed-variant transition-colors flex items-center justify-center gap-space-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          <Icon name="assignment" filled={false} />
          Request Detailed Proposal
        </a>
        <Link
          to={quoteUrl}
          className="w-full bg-white text-primary border border-primary font-label text-label uppercase tracking-widest py-space-3 rounded hover:bg-blue-light transition-colors flex items-center justify-center gap-space-2"
        >
          <Icon name="request_quote" filled={false} />
          Request Quote
        </Link>
        <div className="grid grid-cols-2 gap-space-3">
          <button
            type="button"
            className="bg-white text-primary border border-primary font-label text-label uppercase py-space-3 rounded hover:bg-blue-light transition-colors flex items-center justify-center gap-space-2"
          >
            <Icon name="picture_as_pdf" filled={false} />
            Datasheet
          </button>
          <button
            type="button"
            className="bg-gray-50 text-gray-700 border border-gray-300 font-label text-label uppercase py-space-3 rounded hover:bg-gray-100 transition-colors flex items-center justify-center gap-space-2"
          >
            <Icon name="share" filled={false} />
            Share
          </button>
        </div>
      </div>
    </div>
  )
}
