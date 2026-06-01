import { Link } from 'react-router-dom'
import { useDistributionPageData } from '../../context/DistributionPageContext'
import { buildCompareSearchParams } from '../../hooks/useProductComparison'
import { Icon } from '../Icon'

type CompareSelectionBarProps = {
  selectedIds: string[]
  onClear: () => void
}

export function CompareSelectionBar({
  selectedIds,
  onClear,
}: CompareSelectionBarProps) {
  const { products: distributionTransformerProducts, category: distributionCategory } =
    useDistributionPageData()
  if (selectedIds.length === 0) return null

  const selectedProducts = selectedIds
    .map((id) =>
      distributionTransformerProducts.find((product) => product.id === id)
    )
    .filter(Boolean)

  const compareHref = `/products/${distributionCategory.slug}/compare?ids=${buildCompareSearchParams(selectedIds)}`
  const canCompare = selectedIds.length >= 2

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-primary text-on-primary py-4 px-margin-mobile md:px-margin-desktop z-[60] shadow-[0_-4px_20px_rgba(0,0,0,0.15)] flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-space-4">
      <div className="flex items-center gap-space-4 md:gap-space-8">
        <div className="flex items-center gap-space-3">
          <Icon name="compare_arrows" size={24} filled={false} />
          <span className="font-h3 text-h3 uppercase">
            Compare ({selectedIds.length}) Product
            {selectedIds.length === 1 ? '' : 's'} Selected
          </span>
        </div>
        <div className="hidden md:flex gap-4">
          {selectedProducts.map((product) =>
            product ? (
              <div
                key={product.id}
                className="w-12 h-12 bg-white/10 rounded border border-white/20 overflow-hidden"
              >
                <img
                  src={product.image}
                  alt=""
                  className="w-full h-full object-cover opacity-90"
                />
              </div>
            ) : null
          )}
        </div>
      </div>
      <div className="flex items-center gap-space-4">
        <button
          type="button"
          onClick={onClear}
          className="text-on-primary hover:underline font-label text-label uppercase"
        >
          Clear All
        </button>
        {canCompare ? (
          <Link
            to={compareHref}
            className="bg-secondary hover:bg-secondary/90 text-white font-label text-label uppercase px-space-8 py-space-3 rounded-lg shadow-sm transition-colors text-center"
          >
            Compare Now
          </Link>
        ) : (
          <span className="font-label text-label uppercase text-on-primary/70 px-space-4">
            Select at least 2 products
          </span>
        )}
      </div>
    </div>
  )
}
