import { Link } from 'react-router-dom'
import { Icon } from '../Icon'

type BlogDetailBreadcrumbProps = {
  currentLabel: string
}

export function BlogDetailBreadcrumb({ currentLabel }: BlogDetailBreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="lg:col-span-12 flex items-center gap-space-2 font-label text-label text-gray-500 mb-space-4"
    >
      <Link to="/" className="hover:text-primary transition-colors">
        Home
      </Link>
      <Icon name="chevron_right" size={14} filled={false} />
      <Link to="/blogs" className="hover:text-primary transition-colors">
        Blogs
      </Link>
      <Icon name="chevron_right" size={14} filled={false} />
      <span className="text-on-surface">{currentLabel}</span>
    </nav>
  )
}
