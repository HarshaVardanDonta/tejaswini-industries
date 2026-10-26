import { Link } from 'react-router-dom'
import type { BlogPost } from '../../data/blogs'
import { Icon } from '../Icon'

export function FeaturedBlogPost({ post }: { post: BlogPost }) {
  const href = post.slug ? `/blogs/${post.slug}` : '/blogs'
  return (
    <article className="bg-white border border-gray-100 rounded-lg overflow-hidden group relative">
      <div className="h-64 md:h-96 w-full bg-gray-300 relative overflow-hidden">
        {post.image ? (
          <img
            alt={post.imageAlt}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
            src={post.image}
            width={768}
            height={432}
            decoding="async"
          />
        ) : null}
        <div className="absolute top-space-4 left-space-4 bg-secondary text-on-secondary font-label text-label px-space-3 py-space-1 uppercase">
          Featured guide
        </div>
      </div>
      <div className="p-space-6 md:p-space-8 border-l-4 border-primary">
        <div className="flex items-center gap-space-4 font-mono-data text-mono-data text-gray-500 mb-space-3 uppercase">
          <span>{post.categoryLabel}</span>
          <span>•</span>
          <span>{post.date}</span>
          {post.readTime ? (
            <>
              <span>•</span>
              <span>{post.readTime}</span>
            </>
          ) : null}
        </div>
        <h2 className="font-h1 text-h1 text-primary mb-space-4 group-hover:text-secondary transition-colors">
          <Link to={href} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </h2>
        <p className="font-body-lg text-body-lg text-gray-700 mb-space-6">{post.excerpt}</p>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-space-4">
          <p className="font-label text-label text-primary">{post.author}</p>
          <span className="inline-flex items-center gap-space-2 text-primary font-label text-label group-hover:text-secondary transition-colors uppercase">
            Read the guide
            <Icon name="arrow_forward" size={16} filled={false} />
          </span>
        </div>
      </div>
    </article>
  )
}
