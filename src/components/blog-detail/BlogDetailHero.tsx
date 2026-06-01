import { useBlogDetail } from '../../context/BlogDetailContext'
import { Icon } from '../Icon'

export function BlogDetailHero() {
  const { title, author, date, readTime, heroImage, heroImageAlt } = useBlogDetail()

  return (
    <header className="flex flex-col gap-space-6">
      <h1 className="font-display-xl-mobile md:font-display-xl text-display-xl-mobile md:text-display-xl text-on-surface uppercase tracking-tight border-l-4 border-primary pl-space-4">
        {title}
      </h1>
      <div className="flex flex-wrap items-center gap-space-6 font-mono-data text-mono-data text-gray-700 bg-gray-50 p-space-3 rounded industrial-border">
        <div className="flex items-center gap-space-2">
          <Icon name="person" size={16} filled={false} />
          <span>{author}</span>
        </div>
        <div className="flex items-center gap-space-2">
          <Icon name="calendar_today" size={16} filled={false} />
          <span>{date}</span>
        </div>
        <div className="flex items-center gap-space-2">
          <Icon name="timer" size={16} filled={false} />
          <span>{readTime}</span>
        </div>
      </div>
      <div className="w-full aspect-video bg-surface-container rounded overflow-hidden industrial-border">
        <img
          alt={heroImageAlt}
          className="w-full h-full object-cover"
          src={heroImage}
        />
      </div>
    </header>
  )
}
