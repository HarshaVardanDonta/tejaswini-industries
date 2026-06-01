import { Link } from 'react-router-dom'
import { useDistributionPageData } from '../../context/DistributionPageContext'
import type { DistributionTransformerProduct } from '../../data/distributionTransformers'
import { Icon } from '../Icon'

type ProductListingCardProps = {
  product: DistributionTransformerProduct
  compareSelected?: boolean
  compareDisabled?: boolean
  onCompareToggle?: (id: string) => void
}

export function ProductListingCard({
  product,
  compareSelected = false,
  compareDisabled = false,
  onCompareToggle,
}: ProductListingCardProps) {
  const { category: distributionCategory } = useDistributionPageData()
  const borderClass = compareSelected
    ? 'border-2 border-primary'
    : product.accent
      ? 'border-l-[3px] border-l-secondary border-y border-r border-gray-100'
      : 'border border-gray-100'

  return (
    <article
      className={`bg-white ${borderClass} rounded-lg overflow-hidden group hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-shadow duration-300 flex flex-col`}
    >
      <div className="h-48 bg-gray-100 relative border-b border-gray-100">
        <img
          alt={product.imageAlt}
          className="w-full h-full object-cover mix-blend-multiply opacity-90 group-hover:opacity-100 transition-opacity"
          src={product.image}
        />
        {product.badge?.type === 'best-seller' && (
          <div className="absolute top-space-2 right-space-2 bg-secondary text-white px-2 py-1 rounded font-label text-[10px] uppercase tracking-widest">
            {product.badge.label}
          </div>
        )}
        {product.badge?.type === 'efficiency' && (
          <div className="absolute top-space-2 right-space-2 bg-primary-container text-white px-2 py-1 rounded font-label text-[10px] uppercase tracking-widest flex items-center gap-1">
            <Icon name={product.badge.icon} size={12} />
            {product.badge.label}
          </div>
        )}
      </div>
      <div className="p-space-4 flex flex-col grow">
        <h3 className="font-h3 text-h3 text-primary uppercase mb-space-2">
          {product.title}
        </h3>
        <div className="bg-gray-50 rounded p-space-3 mb-space-4 grow border border-gray-100">
          <table className="w-full text-left">
            <tbody>
              {product.specs.map((spec) => (
                <tr
                  key={spec.label}
                  className="border-b border-gray-100 last:border-0"
                >
                  <th className="py-1 font-label text-label text-gray-500 uppercase font-normal">
                    {spec.label}
                  </th>
                  <td className="py-1 font-mono-data text-mono-data text-right text-gray-700">
                    {spec.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col gap-space-2 mt-auto">
          {onCompareToggle && (
            <label
              className={`flex items-center gap-2 mb-2 ${
                compareDisabled && !compareSelected
                  ? 'cursor-not-allowed opacity-50'
                  : 'cursor-pointer'
              }`}
            >
              <input
                type="checkbox"
                checked={compareSelected}
                disabled={compareDisabled && !compareSelected}
                onChange={() => onCompareToggle(product.id)}
                className="w-4 h-4 rounded-sm border-gray-300 text-primary focus:ring-primary focus:ring-offset-0 bg-gray-50 cursor-pointer disabled:cursor-not-allowed"
              />
              <span className="font-label text-label uppercase text-gray-700">
                Compare Product
              </span>
            </label>
          )}
          {product.detailSlug ? (
            <Link
              to={`/products/${distributionCategory.slug}/${product.detailSlug}`}
              className="w-full bg-primary hover:bg-primary/90 text-white font-label text-label uppercase py-space-2 rounded transition-colors text-center block"
            >
              View Specifications
            </Link>
          ) : (
            <button
              type="button"
              className="w-full bg-primary hover:bg-primary/90 text-white font-label text-label uppercase py-space-2 rounded transition-colors text-center"
            >
              View Specifications
            </button>
          )}
          <button
            type="button"
            className="w-full border border-gray-300 hover:border-primary text-gray-700 hover:text-primary font-label text-label uppercase py-space-2 rounded transition-colors flex items-center justify-center gap-2"
          >
            <Icon name="picture_as_pdf" size={16} className="icon-outline" />
            Download Datasheet
          </button>
        </div>
      </div>
    </article>
  )
}
