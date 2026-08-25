import { Link } from 'react-router-dom'
import { contactInfo } from '../constants/contactInfo'
import { images } from '../constants/images'
import { Icon } from './Icon'

const quickLinks = [
  { label: 'Quality Policy', to: '/quality-policy' },
  { label: 'Infrastructure', to: '/infrastructure' },
  { label: 'Career', to: '/careers' },
  { label: 'Privacy Policy', to: '/privacy-policy' },
] as const

export function Footer() {
  return (
    <footer className="bg-surface-container-high dark:bg-tertiary-container w-full border-t border-gray-300 dark:border-outline-variant mt-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-space-8 px-margin-desktop py-space-12 w-full max-w-[1280px] mx-auto">
        <div className="col-span-1 md:col-span-2">
          <div className="font-h3 text-h3 text-primary dark:text-primary-fixed-dim uppercase mb-space-4 flex items-center gap-2">
            <Icon name="factory" />
            Tejaswini Industries
          </div>
          <p className="font-body-sm text-body-sm text-gray-700 dark:text-gray-300 max-w-sm mb-space-4">
            Precision engineering for industrial infrastructure. Designing and
            manufacturing heavy-duty transformers and control systems for global
            operations.
          </p>
          <div className="flex flex-wrap items-center gap-space-3">
            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-sm border border-gray-300 dark:border-outline-variant bg-white dark:bg-surface-container shadow-sm h-11">
              <Icon name="verified" className="text-primary shrink-0" size={20} />
              <div className="flex flex-col min-w-0">
                <span className="font-label text-label text-primary dark:text-on-primary-fixed uppercase leading-tight whitespace-nowrap">
                  ISO 9001:2015
                </span>
                <span className="font-body-sm text-[11px] text-gray-600 dark:text-gray-500 uppercase leading-none">
                  Certified
                </span>
              </div>
            </div>
            <div className="inline-flex items-center px-3 py-2 rounded-sm border border-gray-300 dark:border-outline-variant bg-white dark:bg-surface-container shadow-sm h-11">
              <img
                src={images.bisCertification}
                alt="BIS Certification"
                className="h-7 w-auto object-contain"
              />
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <h4 className="font-label text-label text-gray-700 dark:text-gray-300 uppercase tracking-widest mb-space-4 border-b border-gray-300 pb-2">
            Quick Links
          </h4>
          <ul className="flex flex-col gap-space-2">
            <li>
              <Link
                to="/products"
                className="font-body-sm text-body-sm text-gray-700 dark:text-gray-300 hover:text-primary transition-colors hover:underline decoration-secondary decoration-2 underline-offset-4"
              >
                Product Categories
              </Link>
            </li>
            {quickLinks.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  className="font-body-sm text-body-sm text-gray-700 dark:text-gray-300 hover:text-primary transition-colors hover:underline decoration-secondary decoration-2 underline-offset-4"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-1">
          <h4 className="font-label text-label text-gray-700 dark:text-gray-300 uppercase tracking-widest mb-space-4 border-b border-gray-300 pb-2">
            Contact
          </h4>
          <address className="not-italic font-body-sm text-body-sm text-gray-700 dark:text-gray-300 flex flex-col gap-space-2">
            <p className="flex items-start gap-2">
              <Icon name="location_on" size={16} className="mt-1 shrink-0" />
              <a
                href={contactInfo.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                {contactInfo.addressLines[0]}
                <br />
                {contactInfo.addressLines[1]}
              </a>
            </p>
            <p className="flex items-center gap-2 mt-2">
              <Icon name="call" size={16} />
              <a
                href={contactInfo.phoneHref}
                className="hover:text-primary transition-colors"
              >
                {contactInfo.phone}
              </a>
            </p>
            <p className="flex items-center gap-2">
              <Icon name="mail" size={16} />
              <a
                href={`mailto:${contactInfo.email}`}
                className="hover:text-primary transition-colors"
              >
                {contactInfo.email}
              </a>
            </p>
          </address>
        </div>
      </div>
      <div className="border-t border-gray-300 dark:border-outline-variant py-space-4 bg-gray-100 dark:bg-tertiary">
        <div className="px-margin-desktop w-full max-w-[1280px] mx-auto text-center">
          <p className="font-body-sm text-body-sm text-gray-500 dark:text-gray-400">
            © 2024 Tejaswini Industries. ISO 9001:2015 Certified. Precision
            Engineering Redefined.
          </p>
        </div>
      </div>
    </footer>
  )
}
