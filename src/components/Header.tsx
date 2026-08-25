import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../assets/logo.png'
import smallLogo from '../assets/smallLogo.jpeg'
import { contactInfo } from '../constants/contactInfo'
import { CONTACT_PATH } from '../constants/routes'
import { useCompactHeader } from '../hooks/useCompactHeader'
import { useHeaderShellWidth } from '../hooks/useHeaderShellWidth'
import { Icon } from './Icon'

const navLinks = [
  { label: 'Products', to: '/products' },
  { label: 'Services', to: '/services' },
  { label: 'Projects', to: '/projects' },
  { label: 'Clients', to: '/clients' },
  { label: 'Blogs', to: '/blogs' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
] as const

function navLinkClass({ isActive }: { isActive: boolean }) {
  return isActive
    ? 'text-on-primary border-b-[3px] border-secondary pb-1 font-label text-label uppercase transition-all duration-200'
    : 'text-on-primary/80 hover:text-on-primary font-label text-label uppercase transition-colors hover:bg-primary-container/20 px-2 py-1 rounded'
}

function mobileNavLinkClass({ isActive }: { isActive: boolean }) {
  return isActive
    ? 'flex items-center px-space-4 py-space-3 text-on-primary font-label text-label uppercase border-l-4 border-secondary bg-primary-container/30'
    : 'flex items-center px-space-4 py-space-3 text-on-primary/80 hover:text-on-primary hover:bg-primary-container/20 font-label text-label uppercase transition-colors'
}

function BrandLogo({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="header-brand">
      <Link
        to="/"
        onClick={onNavigate}
        className="header-compact-logo-link"
        aria-label="Tejaswini Industries home"
      >
        <img src={smallLogo} alt="" />
      </Link>
    </div>
  )
}

type HeaderShellProps = {
  isCompact: boolean
  variant: 'desktop' | 'mobile'
  children: ReactNode
}

function HeaderShell({ isCompact, variant, children }: HeaderShellProps) {
  const anchorRef = useRef<HTMLElement>(null)
  const shellRef = useRef<HTMLDivElement>(null)
  const widthPx = useHeaderShellWidth(shellRef, anchorRef, variant, isCompact)
  const visibilityClass =
    variant === 'desktop' ? 'hidden md:block' : 'md:hidden block'

  return (
    <header
      ref={anchorRef}
      className={`header-anchor text-on-primary ${visibilityClass}`}
      aria-expanded={!isCompact}
    >
      <div className="header-float-slot">
        <div
          ref={shellRef}
          className={`header-shell header-shell--${variant} text-on-primary ${
            isCompact ? 'header-shell--compact' : 'header-shell--expanded'
          }`}
          style={widthPx != null ? { width: widthPx } : undefined}
        >
          <div className="header-shell-inner">{children}</div>
        </div>
      </div>
    </header>
  )
}

function DesktopHeader({ isCompact }: { isCompact: boolean }) {
  return (
    <HeaderShell isCompact={isCompact} variant="desktop">
      <div className="header-shell-row header-shell-row--desktop">
        <BrandLogo />
        <div className="header-chrome header-chrome--desktop min-w-0 h-full">
          <nav className="flex items-center gap-space-6 h-full flex-1 justify-center min-w-0">
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                className={navLinkClass}
                end={false}
                tabIndex={isCompact ? -1 : undefined}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-space-4 shrink-0">
            <div className="hidden lg:flex gap-2">
              <a
                href={contactInfo.phoneHref}
                aria-label={`Call ${contactInfo.phone}`}
                className="p-2 text-on-primary/80 hover:text-on-primary transition-colors hover:bg-primary-container/20 rounded-full"
                tabIndex={isCompact ? -1 : undefined}
              >
                <Icon name="call" />
              </a>
              <a
                href={`mailto:${contactInfo.email}`}
                aria-label={`Email ${contactInfo.email}`}
                className="p-2 text-on-primary/80 hover:text-on-primary transition-colors hover:bg-primary-container/20 rounded-full"
                tabIndex={isCompact ? -1 : undefined}
              >
                <Icon name="mail" />
              </a>
            </div>
            <Link
              to={CONTACT_PATH}
              className="bg-secondary text-on-secondary px-space-4 py-space-2 rounded-lg font-label text-label uppercase tracking-widest hover:bg-secondary/90 transition-colors border border-secondary/80 shadow-sm whitespace-nowrap"
              tabIndex={isCompact ? -1 : undefined}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </HeaderShell>
  )
}

function MobileHeaderBar({
  isCompact,
  mobileMenuOpen,
  onOpenMenu,
}: {
  isCompact: boolean
  mobileMenuOpen: boolean
  onOpenMenu: () => void
}) {
  return (
    <HeaderShell isCompact={isCompact} variant="mobile">
      <div className="header-shell-row header-shell-row--mobile">
        <BrandLogo />
        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-nav-drawer"
          onClick={onOpenMenu}
          className="header-menu-btn p-2 text-on-primary hover:bg-primary-container/20 rounded-full"
        >
          <Icon name="menu" />
        </button>
      </div>
    </HeaderShell>
  )
}

function LogoLink({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <Link
      to="/"
      onClick={onNavigate}
      className="block h-8 shrink-0 rounded bg-white px-1.5 py-0.5"
      aria-label="Tejaswini Industries home"
    >
      <img src={logo} alt="" className="h-full w-auto object-contain object-left" />
    </Link>
  )
}

export function Header() {
  const isCompact = useCompactHeader()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    if (!mobileMenuOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [mobileMenuOpen])

  useEffect(() => {
    if (!mobileMenuOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [mobileMenuOpen])

  const closeMobileMenu = () => setMobileMenuOpen(false)

  return (
    <>
      <DesktopHeader isCompact={isCompact} />
      <MobileHeaderBar
        isCompact={isCompact}
        mobileMenuOpen={mobileMenuOpen}
        onOpenMenu={() => setMobileMenuOpen(true)}
      />

      <div
        className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        <button
          type="button"
          aria-label="Close menu"
          className="absolute inset-0 bg-black/50"
          onClick={closeMobileMenu}
        />

        <nav
          id="mobile-nav-drawer"
          aria-label="Mobile navigation"
          className={`absolute top-0 right-0 flex h-full w-[min(320px,85vw)] flex-col border-l-4 border-secondary bg-primary text-on-primary shadow-xl transition-transform duration-300 ease-out ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between border-b border-on-primary/20 px-margin-mobile py-space-3">
            <LogoLink onNavigate={closeMobileMenu} />
            <button
              type="button"
              aria-label="Close menu"
              onClick={closeMobileMenu}
              className="rounded p-2 text-on-primary hover:bg-primary-container/20"
            >
              <Icon name="close" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-space-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                className={mobileNavLinkClass}
                end={false}
                onClick={closeMobileMenu}
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="border-t border-on-primary/20 px-margin-mobile py-space-4 space-y-space-3">
            <div className="flex gap-space-2">
              <a
                href={contactInfo.phoneHref}
                aria-label={`Call ${contactInfo.phone}`}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-on-primary/20 px-space-3 py-space-2 font-label text-label uppercase hover:bg-primary-container/20 transition-colors"
              >
                <Icon name="call" size={18} />
                Call
              </a>
              <a
                href={`mailto:${contactInfo.email}`}
                aria-label={`Email ${contactInfo.email}`}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-on-primary/20 px-space-3 py-space-2 font-label text-label uppercase hover:bg-primary-container/20 transition-colors"
              >
                <Icon name="mail" size={18} />
                Email
              </a>
            </div>
            <Link
              to={CONTACT_PATH}
              onClick={closeMobileMenu}
              className="flex w-full items-center justify-center bg-secondary px-space-4 py-space-3 rounded-lg font-label text-label uppercase tracking-widest text-on-secondary hover:bg-secondary/90 transition-colors border border-secondary shadow-sm"
            >
              Contact Us
            </Link>
          </div>
        </nav>
      </div>
    </>
  )
}
