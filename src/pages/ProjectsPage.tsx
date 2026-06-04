import { useMemo, useState } from 'react'
import { ProductsShell } from '../components/layout/ProductsShell'
import { PageLoading } from '../components/PageLoading'
import { CommissionsTable } from '../components/projects/CommissionsTable'
import { ProjectCard } from '../components/projects/ProjectCard'
import { ProjectsFilters } from '../components/projects/ProjectsFilters'
import { ProjectsIntro } from '../components/projects/ProjectsIntro'
import { PageSEO } from '../components/seo/PageSEO'
import { staticPageMeta } from '../constants/seo'
import { ProjectsPageProvider } from '../context/ProjectsPageContext'
import type { Project, ProjectCategory } from '../data/projects'
import { commissionRows, projects } from '../data/projects'
import { useSanityQuery } from '../hooks/useSanityQuery'
import { mapProject } from '../sanity/mappers'
import { queries } from '../sanity/queries'

export function ProjectsPage() {
  const [filter, setFilter] = useState<ProjectCategory>('all')
  const { data: projectsData, loading: projectsLoading } = useSanityQuery<
    Array<Record<string, unknown>>
  >(queries.projects, {}, null)
  const { data: commissionData, loading: commissionLoading } = useSanityQuery<
    Array<Record<string, unknown>>
  >(queries.commissionRows, {}, null)

  const projectList = useMemo((): Project[] => {
    if (!projectsData?.length) return projects
    return projectsData.map((item) => mapProject(item as Parameters<typeof mapProject>[0]) as Project)
  }, [projectsData])

  const commissionList = useMemo(() => {
    if (!commissionData?.length) return commissionRows
    return commissionData.map((row) => ({
      id: row.id as string,
      sector: row.sector as string,
      deliverable: row.deliverable as string,
      location: row.location as string,
      status: row.status as 'active' | 'closed',
    }))
  }, [commissionData])

  const filteredProjects = useMemo(() => {
    if (filter === 'all') return projectList
    return projectList.filter((p) => p.category === filter)
  }, [filter, projectList])

  if (projectsLoading || commissionLoading) {
    return (
      <ProductsShell className="bg-background">
        <PageLoading embedded />
      </ProductsShell>
    )
  }

  return (
    <ProjectsPageProvider commissionRows={commissionList}>
      <ProductsShell className="bg-background">
        <PageSEO {...staticPageMeta.projects} />
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
    </ProjectsPageProvider>
  )
}
