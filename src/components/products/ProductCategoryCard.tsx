import { Link } from 'react-router-dom'
import type { ProductCategory } from '../../data/productCategories'
import { getProductCategoryPath } from '../../data/productCategories'

type ProductCategoryCardProps = {
  category: ProductCategory
}

export function ProductCategoryCard({ category }: ProductCategoryCardProps) {
  return (
    <article className="bg-white border border-gray-100 rounded-xl overflow-hidden flex flex-col group hover:border-primary transition-colors">
      <div className="h-48 bg-gray-100 relative overflow-hidden">
        <img
          alt={category.imageAlt}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          src={category.image}
        />
      </div>
      <div className="p-space-6 flex flex-col grow gap-space-4 border-l-[3px] border-transparent group-hover:border-secondary transition-all">
        <div>
          <h2 className="font-h2 text-h2 text-primary uppercase mb-space-2">
            {category.title}
          </h2>
          <p className="font-body-sm text-body-sm text-gray-700 line-clamp-3">
            {category.description}
          </p>
        </div>
        <div className="mt-auto pt-space-4">
          <Link
            to={getProductCategoryPath(category.id)}
            className="inline-flex items-center justify-center bg-primary text-on-primary font-label text-label uppercase px-space-4 py-space-3 rounded-lg hover:bg-primary-container hover:text-on-primary-container transition-colors w-full"
          >
            Learn More
          </Link>
        </div>
      </div>
    </article>
  )
}
