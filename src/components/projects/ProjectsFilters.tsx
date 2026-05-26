import type { ProjectCategory } from '../../data/projects'
import { projectFilters } from '../../data/projects'

type ProjectsFiltersProps = {
  active: ProjectCategory
  onChange: (category: ProjectCategory) => void
}

export function ProjectsFilters({ active, onChange }: ProjectsFiltersProps) {
  return (
    <div className="flex flex-wrap gap-space-2">
      {projectFilters.map((filter) => {
        const isActive = active === filter.id
        return (
          <button
            key={filter.id}
            type="button"
            onClick={() => onChange(filter.id)}
            className={
              isActive
                ? 'bg-primary text-on-primary px-space-4 py-space-2 rounded font-label text-label uppercase border border-primary focus:outline-none focus:ring-2 focus:ring-primary/20'
                : 'bg-surface-container-lowest text-gray-700 hover:bg-gray-50 px-space-4 py-space-2 rounded font-label text-label uppercase border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors'
            }
          >
            {filter.label}
          </button>
        )
      })}
    </div>
  )
}
