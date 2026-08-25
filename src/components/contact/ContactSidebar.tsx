import { contactInfo, getWhatsAppUrl } from '../../constants/contactInfo'
import { useContactPageData } from '../../context/PageDataContext'
import { getGoogleMapsEmbedUrl, getGoogleMapsNavigationUrl } from '../../lib/contactMap'
import { Icon } from '../Icon'

const linkClassName =
  'font-mono-data text-mono-data text-on-surface-variant hover:text-primary transition-colors'

const addressLinkClassName =
  'font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors'

export function ContactSidebar() {
  const { infoCards, whatsapp, map } = useContactPageData()

  return (
    <div className="lg:col-span-5 flex flex-col gap-space-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-space-4">
        {infoCards.map((card) => (
          <div
            key={card.title}
            className="bg-white border border-gray-100 p-space-6 rounded flex items-start gap-space-4"
          >
            <Icon name={card.icon} size={30} className="text-primary mt-1 shrink-0" />
            <div>
              <h3 className="font-label text-label text-gray-700 uppercase mb-space-1">
                {card.title}
              </h3>
              {card.lines.map((line, index) => {
                const lineClassName = card.mono
                  ? `${linkClassName} mb-1 last:mb-0 block`
                  : 'font-body-sm text-body-sm text-on-surface-variant'

                if (card.title === 'Corporate Office' && index === 0) {
                  return (
                    <a
                      key="address"
                      href={contactInfo.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={addressLinkClassName}
                    >
                      {contactInfo.addressLines[0]}
                      <br />
                      {contactInfo.addressLines[1]}
                    </a>
                  )
                }

                if (card.title === 'Corporate Office' && index > 0) {
                  return null
                }

                if (card.title === 'Direct Contact' && line === contactInfo.phone) {
                  return (
                    <a
                      key={line}
                      href={contactInfo.phoneHref}
                      className={lineClassName}
                    >
                      {line}
                    </a>
                  )
                }

                if (card.title === 'Direct Contact' && line === contactInfo.email) {
                  return (
                    <a
                      key={line}
                      href={`mailto:${contactInfo.email}`}
                      className={lineClassName}
                    >
                      {line}
                    </a>
                  )
                }

                return (
                  <p key={line} className={lineClassName}>
                    {line}
                  </p>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-surface-tint border-l-4 border-secondary p-space-6 rounded relative overflow-hidden group hover:bg-primary transition-colors cursor-pointer">
        <div className="absolute -right-5 -top-5 opacity-10 group-hover:scale-110 transition-transform duration-500 pointer-events-none">
          <Icon name="chat" size={96} className="text-white" />
        </div>
        <div className="relative z-10">
          <h3 className="font-h3 text-h3 text-white uppercase mb-space-2">
            {whatsapp.title}
          </h3>
          <p className="font-body-sm text-body-sm text-blue-light mb-space-4 max-w-[80%]">
            {whatsapp.description}
          </p>
          <a
            href={getWhatsAppUrl(contactInfo.whatsappMessages.contact)}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-primary font-label text-label uppercase px-space-4 py-space-2 rounded inline-flex items-center gap-2 hover:bg-gray-50 transition-colors"
          >
            <Icon name="chat" size={18} filled={false} />
            {whatsapp.buttonLabel}
          </a>
        </div>
      </div>

      <a
        href={getGoogleMapsNavigationUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Get directions to ${map.label} in Google Maps`}
        className="bg-gray-100 border border-gray-300 rounded overflow-hidden h-64 relative group block"
      >
        <iframe
          title={map.imageAlt}
          src={getGoogleMapsEmbedUrl()}
          className="pointer-events-none w-full h-full border-0 grayscale opacity-80 group-hover:grayscale-0 transition-all duration-500"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
        <div className="absolute inset-0 bg-primary/10 pointer-events-none" />
        <div className="absolute bottom-space-2 right-space-2 bg-white px-space-2 py-space-1 border border-gray-300 rounded font-label text-label text-gray-700 shadow-sm pointer-events-none">
          {map.label}
        </div>
      </a>
    </div>
  )
}
