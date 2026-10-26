import { Link } from 'react-router-dom'
import type { BlogPost } from '../../data/blogs'

type BlogPostCardProps = {
  post: BlogPost
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  const href = post.slug ? `/blogs/${post.slug}` : undefined

  return (
    <article className="bg-white border border-gray-100 rounded-lg overflow-hidden group flex flex-col h-full relative">
      <div className="h-48 w-full bg-gray-300 relative overflow-hidden border-b border-gray-100">
        {post.image ? (
          <img
            alt={post.imageAlt}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
            src={post.image}
            width={768}
            height={432}
            loading="lazy"
            decoding="async"
          />
        ) : null}
      </div>
      <div className="p-space-4 flex-1 flex flex-col">
        <div className="font-mono-data text-mono-data text-gray-500 mb-space-2 uppercase">
          {post.categoryLabel} • {post.date}
        </div>
        <h3 className="font-h3 text-h3 text-primary mb-space-3 group-hover:text-secondary transition-colors">
          {href ? (
            <Link to={href} className="after:absolute after:inset-0">
              {post.title}
            </Link>
          ) : (
            post.title
          )}
        </h3>
        <p className="font-body-sm text-body-sm text-gray-700 mb-space-4 flex-1">{post.excerpt}</p>
        <div className="mt-auto border-t border-gray-100 pt-space-4 flex justify-between items-center">
          <p className="font-label text-label text-gray-700">
            {post.author}
            {post.readTime ? ` • ${post.readTime}` : ''}
          </p>
          {href ? (
            <span
              aria-hidden="true"
              className="bg-primary text-on-primary font-label text-label px-space-3 py-space-1 rounded group-hover:bg-primary-container transition-colors uppercase"
            >
              Read
            </span>
          ) : null}
        </div>
      </div>
    </article>
  )
}
