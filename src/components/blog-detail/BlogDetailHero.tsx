import { useBlogDetail } from '../../context/BlogDetailContext'
import { Icon } from '../Icon'

export function BlogDetailHero() {
  const { title, author, date, publishedAt, readTime, heroImage, heroImageAlt, heroCaption } = useBlogDetail()

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
          <time dateTime={publishedAt}>{date}</time>
        </div>
        <div className="flex items-center gap-space-2">
          <Icon name="timer" size={16} filled={false} />
          <span>{readTime}</span>
        </div>
      </div>
      {heroImage ? (
        <figure className="m-0">
          <div className="w-full aspect-video bg-surface-container rounded overflow-hidden industrial-border">
            <img
              alt={heroImageAlt}
              className="w-full h-full object-cover"
              src={heroImage}
              width={768}
              height={432}
              decoding="async"
              fetchPriority="high"
            />
          </div>
          {heroCaption ? (
            <figcaption className="font-body-sm text-body-sm text-gray-700 mt-space-2">
              {heroCaption}
            </figcaption>
          ) : null}
        </figure>
      ) : null}
    </header>
  )
}
