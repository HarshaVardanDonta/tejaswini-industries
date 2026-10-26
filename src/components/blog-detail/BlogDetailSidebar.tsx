import { Link } from 'react-router-dom'
import { CONTACT_PATH } from '../../constants/routes'
import { contactInfo, getWhatsAppUrl } from '../../constants/contactInfo'
import { useBlogDetail } from '../../context/BlogDetailContext'
import type { BlogPost } from '../../data/blogs'
import { Icon } from '../Icon'

export function BlogDetailSidebar({ otherPosts }: { otherPosts: BlogPost[] }) {
  const { tableOfContents, relatedProduct } = useBlogDetail()

  return (
    <aside className="lg:col-span-4 flex flex-col gap-space-8">
      {tableOfContents.length > 0 ? (
        <div className="industrial-card p-space-6">
          <h3 className="font-h3 text-h3 text-primary uppercase mb-space-4 border-b border-gray-100 pb-space-2">
            Table of Contents
          </h3>
          <nav className="flex flex-col gap-space-3 font-body-sm text-body-sm" aria-label="Table of contents">
            {tableOfContents.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`text-gray-700 hover:text-primary transition-colors flex items-center gap-space-2 ${
                  item.indent ? 'pl-space-4' : ''
                }`}
              >
                <Icon
                  name={item.indent ? 'remove' : 'subdirectory_arrow_right'}
                  size={16}
                  filled={false}
                  className="text-gray-300 shrink-0"
                />
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      ) : null}

      <div className="bg-primary text-on-primary rounded-lg p-space-6 border-t-4 border-secondary shadow-md">
        <h3 className="font-h2 text-h2 uppercase mb-space-2">Request a quote</h3>
        <p className="font-body-sm text-body-sm text-on-primary/80 mb-space-6">
          Send the kVA rating, voltage and site location. Call or WhatsApp {contactInfo.phone}.
        </p>
        <div className="flex flex-col gap-space-3">
          <Link
            to={CONTACT_PATH}
            className="w-full bg-secondary text-on-secondary font-label text-label px-space-4 py-space-3 rounded uppercase tracking-wider hover:bg-secondary/90 transition-colors text-center"
          >
            Request a quote
          </Link>
          <a
            href={getWhatsAppUrl('Hello, I would like a quote for a distribution transformer. Please share details.')}
            rel="noopener"
            className="w-full border border-on-primary/60 text-on-primary font-label text-label px-space-4 py-space-3 rounded uppercase tracking-wider hover:bg-on-primary/10 transition-colors text-center"
          >
            WhatsApp us
          </a>
        </div>
      </div>

      {otherPosts.length > 0 ? (
        <div className="industrial-card p-space-6">
          <h3 className="font-h3 text-h3 text-primary uppercase mb-space-4 border-b border-gray-100 pb-space-2">
            More guides
          </h3>
          <ul className="flex flex-col gap-space-4 list-none pl-0 m-0">
            {otherPosts.map((post) => (
              <li key={post.id}>
                <Link
                  to={`/blogs/${post.slug}`}
                  className="font-label text-label text-on-surface hover:text-primary transition-colors"
                >
                  {post.title}
                </Link>
                {post.readTime ? (
                  <span className="block font-mono-data text-mono-data text-gray-500 text-[11px] mt-1 uppercase">
                    {post.readTime}
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {relatedProduct ? (
        <div className="industrial-card p-space-6">
          <h3 className="font-h3 text-h3 text-primary uppercase mb-space-4 border-b border-gray-100 pb-space-2">
            Related product
          </h3>
          <Link to={relatedProduct.href} className="flex gap-space-3 group">
            <div className="w-24 h-16 bg-gray-100 rounded overflow-hidden shrink-0 border border-gray-300 group-hover:border-primary transition-colors">
              <img
                alt={relatedProduct.imageAlt}
                className="w-full h-full object-cover"
                src={relatedProduct.image}
                width={96}
                height={64}
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h4 className="font-label text-label text-on-surface group-hover:text-primary transition-colors uppercase">
                {relatedProduct.title}
              </h4>
              <span className="font-mono-data text-mono-data text-gray-500 text-[11px] mt-1">
                {relatedProduct.capacity}
              </span>
            </div>
          </Link>
        </div>
      ) : null}
    </aside>
  )
}
