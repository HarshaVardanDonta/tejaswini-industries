import type { BlogFilter } from '../../data/blogs'

type BlogsFiltersProps = {
  filters: BlogFilter[]
  active: string
  onChange: (category: string) => void
}

export function BlogsFilters({ filters, active, onChange }: BlogsFiltersProps) {
  if (filters.length <= 2) return null
  return (
    <div className="flex flex-wrap gap-space-2 pt-space-4">
      {filters.map((filter) => {
        const isActive = active === filter.id
        return (
          <button
            key={filter.id}
            type="button"
            onClick={() => onChange(filter.id)}
            aria-pressed={isActive}
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
