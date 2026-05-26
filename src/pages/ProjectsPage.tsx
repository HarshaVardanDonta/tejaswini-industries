import { useEffect, useMemo, useState } from 'react'
import { ProductsShell } from '../components/layout/ProductsShell'
import { CommissionsTable } from '../components/projects/CommissionsTable'
import { ProjectCard } from '../components/projects/ProjectCard'
import { ProjectsFilters } from '../components/projects/ProjectsFilters'
import { ProjectsIntro } from '../components/projects/ProjectsIntro'
import type { ProjectCategory } from '../data/projects'
import { projects } from '../data/projects'

export function ProjectsPage() {
  const [filter, setFilter] = useState<ProjectCategory>('all')

  useEffect(() => {
    document.title = 'Projects - Tejaswini Industries'
  }, [])

  const filteredProjects = useMemo(() => {
    if (filter === 'all') return projects
    return projects.filter((p) => p.category === filter)
  }, [filter])

  return (
    <ProductsShell className="bg-background" sidebarVariant="projects">
      <main className="grow w-full max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop py-space-12">
        <div className="mb-space-12 flex flex-col md:flex-row justify-between items-end gap-space-6 border-b border-gray-300 pb-space-6">
          <ProjectsIntro />
          <ProjectsFilters active={filter} onChange={setFilter} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
          <CommissionsTable />
        </div>
      </main>
    </ProductsShell>
  )
}
