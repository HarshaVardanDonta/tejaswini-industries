import type { BlogCategory } from '../../data/blogs'
import { blogFilters } from '../../data/blogs'

type BlogsFiltersProps = {
  active: BlogCategory
  onChange: (category: BlogCategory) => void
}

export function BlogsFilters({ active, onChange }: BlogsFiltersProps) {
  return (
    <div className="flex flex-wrap gap-space-2 pt-space-4">
      {blogFilters.map((filter) => {
        const isActive = active === filter.id
        return (
          <button
            key={filter.id}
            type="button"
            onClick={() => onChange(filter.id)}
            className={
              isActive
                ? 'bg-primary text-on-primary font-label text-label px-space-4 py-space-2 border border-primary uppercase'
                : 'bg-white text-gray-700 font-label text-label px-space-4 py-space-2 border border-gray-300 hover:bg-gray-100 transition-colors uppercase'
            }
          >
            {filter.label}
          </button>
        )
      })}
    </div>
  )
}
