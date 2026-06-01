import { Link } from 'react-router-dom'
import { useDistributionPageData } from '../../context/DistributionPageContext'
import { Icon } from '../Icon'

export function ComparisonBreadcrumb() {
  const { category: distributionCategory } = useDistributionPageData()
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-2 text-gray-500 font-label text-label uppercase mb-space-8 flex-wrap"
    >
      <Link to="/" className="hover:text-primary transition-colors">
        Home
      </Link>
      <Icon name="chevron_right" size={14} filled={false} />
      <Link to="/products" className="hover:text-primary transition-colors">
        Products
      </Link>
      <Icon name="chevron_right" size={14} filled={false} />
      <Link
        to={`/products/${distributionCategory.slug}`}
        className="hover:text-primary transition-colors"
      >
        {distributionCategory.title}
      </Link>
      <Icon name="chevron_right" size={14} filled={false} />
      <span className="text-on-surface font-bold">Compare Specifications</span>
    </nav>
  )
}
