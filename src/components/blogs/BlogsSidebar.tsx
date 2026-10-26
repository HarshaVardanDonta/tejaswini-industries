import { Link } from 'react-router-dom'
import { CONTACT_PATH } from '../../constants/routes'
import { contactInfo, getWhatsAppUrl } from '../../constants/contactInfo'
import { Icon } from '../Icon'

const relatedPages = [
  { label: 'Distribution transformers', to: '/products/distribution-transformers' },
  { label: 'Service areas in Telangana', to: '/service-areas' },
  { label: 'Electrical services', to: '/services' },
  { label: 'About Tejaswini Industries', to: '/about' },
]

export function BlogsSidebar() {
  return (
    <aside className="lg:col-span-4 space-y-space-8">
      <div className="bg-primary text-on-primary p-space-6 border-t-4 border-secondary">
        <h3 className="font-h2 text-h2 mb-space-2 uppercase">Request a quote</h3>
        <p className="font-body-sm text-body-sm text-on-primary/80 mb-space-6">
          Oil-filled distribution transformers from 100 kVA to 2000 kVA, made in Hyderabad. Send
          your kVA rating, voltage and site location.
        </p>
        <div className="flex flex-col gap-space-3">
          <Link
            to={CONTACT_PATH}
            className="w-full bg-secondary text-on-secondary font-label text-label uppercase py-space-3 hover:bg-secondary-container transition-colors tracking-widest text-center"
          >
            Request a quote
          </Link>
          <a
            href={getWhatsAppUrl('Hello, I would like a quote for a distribution transformer. Please share details.')}
            rel="noopener"
            className="w-full border border-on-primary/60 text-on-primary font-label text-label uppercase py-space-3 hover:bg-on-primary/10 transition-colors tracking-widest text-center"
          >
            WhatsApp {contactInfo.phone}
          </a>
        </div>
      </div>

      <div className="bg-white border border-gray-100 p-space-6">
        <h3 className="font-h3 text-h3 text-primary uppercase mb-space-6 pb-space-2 border-b-2 border-gray-100 flex items-center gap-space-2">
          <Icon name="link" className="text-secondary" filled={false} />
          Related pages
        </h3>
        <ul className="space-y-space-4 list-none pl-0 m-0">
          {relatedPages.map((page) => (
            <li key={page.to}>
              <Link
                to={page.to}
                className="font-label text-label text-gray-700 hover:text-primary transition-colors"
              >
                {page.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}
