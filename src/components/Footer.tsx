import { Link } from 'react-router-dom'
import { Icon } from './Icon'

const quickLinks = [
  'Product Categories',
  'Quality Policy',
  'Infrastructure',
  'Career',
  'Privacy Policy',
]

type FooterProps = {
  variant?: 'default' | 'compact'
}

export function Footer({ variant = 'default' }: FooterProps) {
  if (variant === 'compact') {
    return (
      <footer className="bg-surface-container-high dark:bg-tertiary-container w-full border-t border-gray-300 dark:border-outline-variant mt-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-space-8 px-margin-mobile md:px-margin-desktop py-space-12 w-full max-w-[1280px] mx-auto">
          <div className="flex flex-col gap-space-4 md:col-span-1">
            <span className="font-h3 text-h3 text-primary dark:text-primary-fixed-dim uppercase">
              Tejaswini Industries
            </span>
            <p className="font-body-sm text-body-sm text-gray-700 dark:text-gray-300">
              © 2024 Tejaswini Industries. ISO 9001:2015 Certified. Precision
              Engineering Redefined.
            </p>
          </div>
          <div className="flex flex-col gap-space-4 md:col-span-3">
            <nav className="flex flex-wrap gap-space-6 font-label text-label uppercase">
              {quickLinks.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors hover:underline decoration-secondary decoration-2 underline-offset-4"
                >
                  {link}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </footer>
    )
  }

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
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-2 py-1 rounded-sm border border-primary/20">
            <Icon name="verified" size={14} />
            <span className="font-label text-label uppercase">ISO 9001:2015</span>
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
            {quickLinks.slice(1).map((link) => (
              <li key={link}>
                <a
                  href="#"
                  className="font-body-sm text-body-sm text-gray-700 dark:text-gray-300 hover:text-primary transition-colors hover:underline decoration-secondary decoration-2 underline-offset-4"
                >
                  {link}
                </a>
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
              <span>
                Industrial Estate,
                <br />
                Phase II, Sector 4.
              </span>
            </p>
            <p className="flex items-center gap-2 mt-2">
              <Icon name="call" size={16} />
              +91 98765 43210
            </p>
            <p className="flex items-center gap-2">
              <Icon name="mail" size={16} />
              sales@tejaswini.ind
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
