import { useEffect, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { contactInfo, getWhatsAppUrl } from '../../constants/contactInfo'
import { CONTACT_PATH } from '../../constants/routes'
import { images } from '../../constants/images'
import { Icon } from '../Icon'

const TEASE_STORAGE_KEY = 'ti-floating-sidebar-teased'
const WHATSAPP_URL = getWhatsAppUrl(contactInfo.whatsappMessages.products)

function WhatsAppIcon({ className = 'w-5 h-5 shrink-0' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

type SidebarActionProps = {
  href?: string
  to?: string
  label: string
  icon: ReactNode
  className: string
  target?: string
  rel?: string
  onActivate?: () => void
}

function SidebarAction({
  href,
  to,
  label,
  icon,
  className,
  target,
  rel,
  onActivate,
}: SidebarActionProps) {
  const classNames = `flex items-center justify-center gap-space-2 px-space-4 py-space-3 rounded-xl shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-transform whitespace-nowrap min-w-[3rem] group-hover/sidebar:justify-start ${className}`

  const handleActivate = () => {
    onActivate?.()
    ;(document.activeElement as HTMLElement | null)?.blur()
  }

  const content = (
    <>
      {icon}
      <span className="font-label text-label uppercase tracking-wide max-w-0 overflow-hidden opacity-0 group-hover/sidebar:max-w-[10rem] group-hover/sidebar:opacity-100 transition-all duration-300">
        {label}
      </span>
    </>
  )

  if (to) {
    return (
      <Link to={to} title={label} className={classNames} onClick={handleActivate}>
        {content}
      </Link>
    )
  }

  return (
    <a
      href={href}
      title={label}
      target={target}
      rel={rel}
      className={classNames}
      onClick={handleActivate}
    >
      {content}
    </a>
  )
}

export function ProductsFloatingSidebar() {
  const [shouldTease, setShouldTease] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)

  const dismissSidebar = () => {
    setShouldTease(false)
    setIsCollapsed(true)
  }

  useEffect(() => {
    if (sessionStorage.getItem(TEASE_STORAGE_KEY)) return

    sessionStorage.setItem(TEASE_STORAGE_KEY, '1')
    setShouldTease(true)
    const timer = window.setTimeout(() => setShouldTease(false), 1150)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <aside
      className={`group/sidebar floating-sidebar fixed right-0 bottom-24 z-50 hidden lg:flex flex-col gap-3 bg-surface-container-lowest dark:bg-surface-dim shadow-md border border-gray-300 dark:border-outline border-r-0 rounded-l-xl rounded-r-none p-3 pr-4 overflow-hidden ${
        shouldTease ? 'floating-sidebar--tease' : ''
      } ${isCollapsed ? 'floating-sidebar--collapsed' : ''}`}
      aria-label="Quick actions"
      onPointerLeave={() => setIsCollapsed(false)}
    >
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 bg-secondary rounded-full group-hover/sidebar:opacity-0 transition-opacity duration-200"
        aria-hidden
      />

      <div className="text-center border-b border-gray-100 pb-2 mb-1 max-h-0 opacity-0 overflow-hidden group-hover/sidebar:max-h-36 group-hover/sidebar:opacity-100 transition-all duration-300">
        <p className="font-label text-label text-primary uppercase">
          ISO 9001:2015
        </p>
        <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">
          Certified Excellence
        </p>
        <div className="mt-2 pt-2 border-t border-gray-100 flex justify-center">
          <img
            src={images.bisCertification}
            alt="BIS Certification"
            className="h-7 w-auto object-contain"
          />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <SidebarAction
          to={CONTACT_PATH}
          label="Contact Us"
          icon={<Icon name="mail" size={22} />}
          className="bg-secondary text-on-secondary"
          onActivate={dismissSidebar}
        />
        <SidebarAction
          href={WHATSAPP_URL}
          label="WhatsApp"
          icon={<WhatsAppIcon />}
          className="bg-[#25D366] text-white hover:bg-[#20BD5A]"
          target="_blank"
          rel="noopener noreferrer"
          onActivate={dismissSidebar}
        />
      </div>
    </aside>
  )
}
