import { Link, NavLink } from 'react-router-dom'
import logo from '../assets/logo.png'
import { contactInfo } from '../constants/contactInfo'
import { REQUEST_QUOTE_PATH } from '../constants/routes'
import { Icon } from './Icon'

const navLinks = [
  { label: 'Products', to: '/products' },
  { label: 'Services', to: '/services' },
  { label: 'Projects', to: '/projects' },
  { label: 'Blogs', to: '/blogs' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
] as const

function navLinkClass({ isActive }: { isActive: boolean }) {
  return isActive
    ? 'text-on-primary border-b-[3px] border-secondary pb-1 font-label text-label uppercase transition-all duration-200'
    : 'text-on-primary/80 hover:text-on-primary font-label text-label uppercase transition-colors hover:bg-primary-container/20 px-2 py-1 rounded'
}

function LogoLink({ className }: { className: string }) {
  return (
    <Link
      to="/"
      className="flex items-center shrink-0 bg-white rounded-lg p-1.5 shadow-sm hover:opacity-95 transition-opacity"
      aria-label="Tejaswini Industries home"
    >
      <img
        src={logo}
        alt=""
        className={`w-auto object-contain ${className}`}
      />
    </Link>
  )
}

export function Header() {
  return (
    <>
      <header className="bg-primary text-on-primary sticky top-0 z-40 border-b-4 border-secondary w-full shadow-sm hidden md:block">
        <div className="flex justify-between items-center w-full px-margin-desktop max-w-[1280px] mx-auto h-20">
          <LogoLink className="h-12" />
          <nav className="flex items-center gap-space-6 h-full">
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                className={navLinkClass}
                end={false}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-space-4">
            <div className="hidden lg:flex gap-2">
              <a
                href={contactInfo.phoneHref}
                aria-label={`Call ${contactInfo.phone}`}
                className="p-2 text-on-primary/80 hover:text-on-primary transition-colors hover:bg-primary-container/20 rounded-full"
              >
                <Icon name="call" />
              </a>
              <a
                href={`mailto:${contactInfo.email}`}
                aria-label={`Email ${contactInfo.email}`}
                className="p-2 text-on-primary/80 hover:text-on-primary transition-colors hover:bg-primary-container/20 rounded-full"
              >
                <Icon name="mail" />
              </a>
            </div>
            <Link
              to={REQUEST_QUOTE_PATH}
              className="bg-secondary text-on-secondary px-space-4 py-space-2 rounded-lg font-label text-label uppercase tracking-widest hover:bg-secondary/90 transition-colors border border-secondary shadow-sm"
            >
              Request Quote
            </Link>
          </div>
        </div>
      </header>

      <header className="bg-primary text-on-primary sticky top-0 z-40 border-b-4 border-secondary w-full shadow-sm md:hidden flex justify-between items-center px-margin-mobile h-16">
        <LogoLink className="h-8" />
        <button
          type="button"
          aria-label="Menu"
          className="p-2 text-on-primary hover:bg-primary-container/20 rounded"
        >
          <Icon name="menu" />
        </button>
      </header>
    </>
  )
}
