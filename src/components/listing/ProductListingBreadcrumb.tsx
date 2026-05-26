import { Link } from 'react-router-dom'
import { Icon } from '../Icon'

type ProductListingBreadcrumbProps = {
  categoryTitle: string
}

export function ProductListingBreadcrumb({
  categoryTitle,
}: ProductListingBreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-2 text-gray-500 font-label text-label uppercase mb-space-8"
    >
      <Link to="/" className="hover:text-primary transition-colors">
        Home
      </Link>
      <Icon name="chevron_right" size={14} filled={false} />
      <Link to="/products" className="hover:text-primary transition-colors">
        Products
      </Link>
      <Icon name="chevron_right" size={14} filled={false} />
      <span className="text-on-surface font-bold">{categoryTitle}</span>
    </nav>
  )
}
