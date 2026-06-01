import { useAboutPageData } from '../../context/PageDataContext'
import { Icon } from '../Icon'

export function AboutSectors() {
  const { sectors } = useAboutPageData()

  return (
    <section className="bg-primary py-space-16 text-on-primary">
      <div className="px-margin-mobile md:px-margin-desktop text-center">
        <h2 className="font-h1 text-h1 uppercase mb-space-12 inline-block border-b-2 border-secondary pb-space-2">
          {sectors.title}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter">
          {sectors.items.map((sector) => (
            <div
              key={sector.label}
              className="flex flex-col items-center p-space-4 border border-on-primary/10 rounded-xl bg-on-primary/5 hover:bg-on-primary/10 transition-colors"
            >
              <Icon
                name={sector.icon}
                size={48}
                className="mb-space-4 text-surface-bright"
              />
              <span className="font-label text-label uppercase tracking-widest text-center">
                {sector.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
