import { Link } from 'react-router-dom'
import { useDistributionPageData } from '../../context/DistributionPageContext'
import type {
  ComparisonCellValue,
  ComparisonParameter,
  DistributionTransformerProduct,
} from '../../data/distributionTransformers'
import { Icon } from '../Icon'

type SpecificationComparisonTableProps = {
  products: DistributionTransformerProduct[]
}

function cellKey(value: ComparisonCellValue): string {
  if (typeof value === 'string') return value
  return value.tags.join('|')
}

function rowValuesDiffer(
  products: DistributionTransformerProduct[],
  param: ComparisonParameter
): boolean {
  const keys = products.map((p) =>
    cellKey(p.comparisonValues[param.key] ?? '—')
  )
  return new Set(keys).size > 1
}

function ComparisonCell({
  value,
  highlighted,
}: {
  value: ComparisonCellValue
  highlighted: boolean
}) {
  const cellClass = highlighted
    ? 'bg-blue-light/10 font-medium text-primary'
    : 'text-gray-700'

  if (typeof value === 'string') {
    return (
      <td
        className={`border-b border-r border-gray-100 p-space-4 font-mono-data text-mono-data last:border-r-0 ${cellClass}`}
      >
        {value}
      </td>
    )
  }

  return (
    <td
      className={`border-b border-r border-gray-100 p-space-4 last:border-r-0 ${cellClass}`}
    >
      <div className="flex flex-wrap gap-2">
        {value.tags.map((tag) => (
          <span
            key={tag}
            className={
              highlighted
                ? 'bg-white border border-primary px-2 py-1 rounded-sm font-mono-data text-[11px] text-primary'
                : 'bg-gray-100 border border-gray-300 px-2 py-1 rounded-sm font-mono-data text-[11px] text-gray-700'
            }
          >
            {tag}
          </span>
        ))}
      </div>
    </td>
  )
}

export function SpecificationComparisonTable({
  products,
}: SpecificationComparisonTableProps) {
  const { comparisonParameters, category: distributionCategory } = useDistributionPageData()
  return (
    <div className="bg-surface border border-gray-100 rounded-lg overflow-hidden shadow-sm relative">
      <div className="overflow-x-auto comparison-scroll">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr>
              <th className="bg-gray-50 border-b border-r border-gray-300 p-space-4 font-label text-label text-gray-700 uppercase sticky left-0 z-20 sticky-col-shadow w-1/4 min-w-[200px]">
                Parameter
              </th>
              {products.map((product) => (
                <th
                  key={product.id}
                  className={`bg-white border-b border-r border-gray-100 p-space-6 align-top min-w-[200px] last:border-r-0 ${
                    product.comparisonHighlight ? 'relative' : ''
                  }`}
                >
                  {product.comparisonHighlight && (
                    <div className="absolute top-0 right-0 bg-primary text-on-primary font-label text-label px-3 py-1 uppercase tracking-wider rounded-bl">
                      Most Selected
                    </div>
                  )}
                  <div className="flex flex-col gap-space-2">
                    <div
                      className={`h-[120px] bg-gray-50 border rounded relative overflow-hidden flex items-center justify-center mb-space-2 ${
                        product.comparisonHighlight
                          ? 'border-primary'
                          : 'border-gray-300'
                      }`}
                    >
                      <img
                        src={product.image}
                        alt={product.imageAlt}
                        className="object-cover w-full h-full opacity-80 mix-blend-multiply"
                      />
                      {product.comparisonSku && (
                        <div
                          className={`absolute top-2 right-2 px-2 py-1 border rounded-sm font-mono-data text-mono-data text-[11px] ${
                            product.comparisonHighlight
                              ? 'bg-primary/90 text-on-primary border-primary-container'
                              : 'bg-white/90 text-gray-700 border-gray-300'
                          }`}
                        >
                          {product.comparisonSku}
                        </div>
                      )}
                    </div>
                    <h3 className="font-h3 text-h3 text-primary uppercase">
                      {product.title}
                    </h3>
                    {product.detailSlug && (
                      <Link
                        to={`/products/${distributionCategory.slug}/${product.detailSlug}`}
                        className="font-label text-label text-secondary hover:underline flex items-center gap-1 uppercase tracking-wider"
                      >
                        View Details
                        <Icon name="arrow_forward" size={14} className="icon-outline" />
                      </Link>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white">
            {comparisonParameters.map((param, rowIndex) => {
              const differs = rowValuesDiffer(products, param)
              return (
                <tr
                  key={param.key}
                  className={`hover:bg-blue-light/30 transition-colors ${
                    rowIndex % 2 === 1 ? 'bg-gray-50/50' : ''
                  }`}
                >
                  <td className="bg-gray-50 border-b border-r border-gray-300 p-space-4 font-label text-label text-gray-700 uppercase sticky left-0 z-10 sticky-col-shadow">
                    <span className="flex items-center justify-between gap-2">
                      {param.label}
                      {param.hint && (
                        <span
                          className="material-symbols-outlined text-[16px] text-gray-500 icon-outline shrink-0"
                          title={param.hint}
                        >
                          info
                        </span>
                      )}
                    </span>
                  </td>
                  {products.map((product) => {
                    const value =
                      product.comparisonValues[param.key] ?? '—'
                    const highlight = Boolean(
                      product.comparisonHighlight && differs
                    )
                    return (
                      <ComparisonCell
                        key={product.id}
                        value={value}
                        highlighted={highlight}
                      />
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <div className="bg-gray-50 border-t border-gray-300 p-space-4 flex justify-end">
        <Link
          to={`/products/${distributionCategory.slug}`}
          className="flex items-center gap-2 font-label text-label text-gray-700 hover:text-primary transition-colors border border-dashed border-gray-300 hover:border-primary px-4 py-2 rounded-sm uppercase tracking-wider bg-white"
        >
          <Icon name="add" size={18} className="icon-outline" />
          Add Product to Compare
        </Link>
      </div>
    </div>
  )
}
