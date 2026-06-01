import { Link } from 'react-router-dom'
import { useBlogDetail } from '../../context/BlogDetailContext'
import { Icon } from '../Icon'

export function BlogDetailSidebar() {
  const { tableOfContents, relatedProduct } = useBlogDetail()

  return (
    <aside className="lg:col-span-4 flex flex-col gap-space-8">
      <div className="industrial-card p-space-6">
        <h3 className="font-h3 text-h3 text-primary uppercase mb-space-4 border-b border-gray-100 pb-space-2">
          Table of Contents
        </h3>
        <nav className="flex flex-col gap-space-3 font-body-sm text-body-sm">
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

      <div className="bg-primary text-on-primary rounded-lg p-space-6 text-center border-t-4 border-secondary shadow-md relative overflow-hidden">
        <div className="absolute -right-8 -top-8 text-on-primary/10 pointer-events-none">
          <Icon name="description" size={120} filled={false} />
        </div>
        <div className="relative z-10">
          <h3 className="font-h2 text-h2 uppercase mb-space-2">
            Standardized Checklist
          </h3>
          <p className="font-body-sm text-body-sm text-on-primary/80 mb-space-6">
            Download the comprehensive ISO-compliant maintenance checklist PDF
            for field technicians.
          </p>
          <button
            type="button"
            className="w-full bg-secondary text-on-secondary font-label text-label px-space-4 py-space-3 rounded uppercase tracking-wider hover:bg-secondary/90 transition-colors flex items-center justify-center gap-space-2"
          >
            <Icon name="download" size={18} filled={false} />
            Download Document
          </button>
        </div>
      </div>

      <div className="industrial-card p-space-6">
        <h3 className="font-h3 text-h3 text-primary uppercase mb-space-4 border-b border-gray-100 pb-space-2">
          Relevant Hardware
        </h3>
        {relatedProduct ? (
        <div className="flex flex-col gap-space-4">
          <Link
            to={relatedProduct.href}
            className="flex gap-space-3 group"
          >
            <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden shrink-0 border border-gray-300 group-hover:border-primary transition-colors">
              <img
                alt={relatedProduct.imageAlt}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all"
                src={relatedProduct.image}
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
      </div>
    </aside>
  )
}
