import { Link } from 'react-router-dom'
import type { BlogPost } from '../../data/blogs'

type BlogPostCardProps = {
  post: BlogPost
}

function postHref(post: BlogPost) {
  return post.slug ? `/blogs/${post.slug}` : undefined
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  const borderClass = post.accent
    ? 'border-l-[3px] border-l-secondary'
    : ''
  const href = postHref(post)
  const readLinkClass =
    'bg-primary text-on-primary font-label text-label px-space-3 py-space-1 rounded hover:bg-primary-container transition-colors uppercase'

  return (
    <article
      className={`bg-white border border-gray-100 rounded-lg overflow-hidden group flex flex-col h-full ${borderClass}`}
    >
      <div className="h-48 w-full bg-gray-300 relative overflow-hidden border-b border-gray-100">
        <img
          alt={post.imageAlt}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
          src={post.image}
        />
      </div>
      <div className="p-space-4 flex-1 flex flex-col">
        <div
          className={`font-mono-data text-mono-data text-gray-500 mb-space-2 uppercase ${
            post.alertMeta ? 'text-secondary font-bold' : ''
          }`}
        >
          {post.categoryLabel} • {post.date}
        </div>
        <h3 className="font-h3 text-h3 text-primary mb-space-3 group-hover:text-secondary transition-colors">
          {post.title}
        </h3>
        <p className="font-body-sm text-body-sm text-gray-700 mb-space-4 flex-1">
          {post.excerpt}
        </p>
        <div className="mt-auto border-t border-gray-100 pt-space-4 flex justify-between items-center">
          <p className="font-label text-label text-gray-700">{post.author}</p>
          {href ? (
            <Link to={href} className={readLinkClass}>
              Read
            </Link>
          ) : (
            <a href="#" className={readLinkClass}>
              Read
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
