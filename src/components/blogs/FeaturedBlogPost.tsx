import { useFeaturedPost } from '../../context/BlogsPageContext'
import { Icon } from '../Icon'

export function FeaturedBlogPost() {
  const featuredPost = useFeaturedPost()
  return (
    <article className="bg-white border border-gray-100 rounded-lg overflow-hidden group">
      <div className="h-64 md:h-96 w-full bg-gray-300 relative overflow-hidden">
        <img
          alt={featuredPost.imageAlt}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
          src={featuredPost.image}
        />
        <div className="absolute top-space-4 left-space-4 bg-secondary text-on-secondary font-label text-label px-space-3 py-space-1 uppercase">
          Featured Guide
        </div>
      </div>
      <div className="p-space-6 md:p-space-8 border-l-4 border-primary">
        <div className="flex items-center gap-space-4 font-mono-data text-mono-data text-gray-500 mb-space-3 uppercase">
          <span>{featuredPost.categoryLabel}</span>
          <span>•</span>
          <span>{featuredPost.date}</span>
        </div>
        <h2 className="font-h1 text-h1 text-primary mb-space-4 group-hover:text-secondary transition-colors">
          {featuredPost.title}
        </h2>
        <p className="font-body-lg text-body-lg text-gray-700 mb-space-6">
          {featuredPost.excerpt}
        </p>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-space-4">
          <div className="flex items-center gap-space-3">
            <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden shrink-0">
              <img
                alt={featuredPost.authorImageAlt}
                className="w-full h-full object-cover"
                src={featuredPost.authorImage}
              />
            </div>
            <div>
              <p className="font-label text-label text-primary">
                {featuredPost.authorName}
              </p>
              <p className="font-mono-data text-mono-data text-gray-500 text-[11px]">
                {featuredPost.authorRole}
              </p>
            </div>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-space-2 text-primary font-label text-label hover:text-secondary transition-colors uppercase"
          >
            Read Full Guide
            <Icon name="arrow_forward" size={16} filled={false} />
          </a>
        </div>
      </div>
    </article>
  )
}
