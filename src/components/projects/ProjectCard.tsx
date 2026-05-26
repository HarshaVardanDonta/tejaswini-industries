import type { Project } from '../../data/projects'
import { Icon } from '../Icon'

type ProjectCardProps = {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const borderClass = project.accent
    ? 'border-l-[3px] border-l-secondary'
    : ''

  return (
    <article
      className={`bg-surface-container-lowest border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300 group flex flex-col ${borderClass}`}
    >
      <div className="relative h-64 bg-gray-100 overflow-hidden">
        <img
          alt={project.imageAlt}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          src={project.image}
        />
        <div className="absolute top-space-4 left-space-4 bg-background text-primary px-space-2 py-space-1 rounded font-label text-label uppercase shadow-sm border border-gray-100">
          {project.categoryLabel}
        </div>
      </div>
      <div className="p-space-6 flex flex-col grow bg-surface-container-lowest">
        <h3 className="font-h3 text-h3 text-primary uppercase mb-space-2">
          {project.title}
        </h3>
        <div className="flex items-center gap-space-2 text-gray-700 font-body-sm text-body-sm mb-space-6 flex-wrap">
          <Icon name="factory" size={16} filled={false} className="text-gray-500" />
          <span>{project.sector}</span>
          <span className="text-gray-300">|</span>
          <Icon name="location_on" size={16} filled={false} className="text-gray-500" />
          <span>{project.location}</span>
        </div>
        <div className="mt-auto pt-space-4 border-t border-gray-100 grid grid-cols-2 gap-space-4">
          {project.specs.map((spec) => (
            <div key={spec.label}>
              <span className="block font-label text-label text-gray-500 uppercase mb-1">
                {spec.label}
              </span>
              <span className="block font-mono-data text-mono-data text-on-surface font-semibold">
                {spec.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </article>
  )
}
