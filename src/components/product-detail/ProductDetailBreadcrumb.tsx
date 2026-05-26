import { Link } from 'react-router-dom'
import { distributionCategory } from '../../data/distributionTransformers'
import { Icon } from '../Icon'

type ProductDetailBreadcrumbProps = {
  currentLabel: string
}

export function ProductDetailBreadcrumb({
  currentLabel,
}: ProductDetailBreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex text-gray-500 font-label text-label uppercase col-span-4 md:col-span-12 mb-space-4"
    >
      <ol className="inline-flex items-center flex-wrap gap-y-1 space-x-2">
        <li className="inline-flex items-center">
          <Link to="/" className="hover:text-primary transition-colors">
            Home
          </Link>
        </li>
        <li>
          <div className="flex items-center">
            <Icon name="chevron_right" size={16} filled={false} className="mx-1" />
            <Link to="/products" className="hover:text-primary transition-colors">
              Products
            </Link>
          </div>
        </li>
        <li>
          <div className="flex items-center">
            <Icon name="chevron_right" size={16} filled={false} className="mx-1" />
            <Link
              to={`/products/${distributionCategory.slug}`}
              className="hover:text-primary transition-colors"
            >
              {distributionCategory.title}
            </Link>
          </div>
        </li>
        <li aria-current="page">
          <div className="flex items-center">
            <Icon name="chevron_right" size={16} filled={false} className="mx-1" />
            <span className="text-primary font-bold">{currentLabel}</span>
          </div>
        </li>
      </ol>
    </nav>
  )
}
