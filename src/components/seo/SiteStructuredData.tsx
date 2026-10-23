import { readBaked } from '../../cms/repository'
import { contactInfo } from '../../constants/contactInfo'
import { buildAbsoluteUrl } from '../../constants/seo'
import { DEFAULT_OG_IMAGE, SITE_NAME } from '../../../lib/seo'
import { currentHeadSink, pushJsonLd } from '../../seo/headSink'

type Settings = {
  streetAddress?: string
  addressLines?: string[]
  postalCode?: string
  locality?: string
  region?: string
  phone?: string
  email?: string
  lat?: number
  lng?: number
  opens?: string
  closes?: string
}

function siteGraph() {
  const settings = readBaked<Settings | null>('*[_id == "siteSettings"][0]')
  const phone = settings?.phone || contactInfo.phone
  const email = settings?.email || contactInfo.email
  const street =
    settings?.streetAddress ||
    '3-13-109/1/1, FCI Road, Suryanagar, Mallapur'
  const postalCode = settings?.postalCode || '500076'
  const lat = settings?.lat ?? contactInfo.coordinates.lat
  const lng = settings?.lng ?? contactInfo.coordinates.lng
  const origin = buildAbsoluteUrl('/')
  const orgId = `${origin}#organization`
  const localId = `${origin}#manufacturer`

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': orgId,
        name: SITE_NAME,
        url: origin,
        email,
        telephone: phone,
        logo: buildAbsoluteUrl(DEFAULT_OG_IMAGE),
      },
      {
        '@type': ['LocalBusiness', 'Manufacturer'],
        '@id': localId,
        name: SITE_NAME,
        url: origin,
        image: buildAbsoluteUrl(DEFAULT_OG_IMAGE),
        telephone: phone,
        email,
        parentOrganization: { '@id': orgId },
        address: {
          '@type': 'PostalAddress',
          streetAddress: street,
          addressLocality: settings?.locality || 'Hyderabad',
          addressRegion: settings?.region || 'Telangana',
          postalCode,
          addressCountry: 'IN',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: lat,
          longitude: lng,
        },
        areaServed: [
          { '@type': 'City', name: 'Hyderabad' },
          { '@type': 'State', name: 'Telangana' },
        ],
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            opens: settings?.opens || '09:00',
            closes: settings?.closes || '17:30',
          },
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${origin}#website`,
        name: SITE_NAME,
        url: origin,
        publisher: { '@id': orgId },
        inLanguage: 'en',
      },
    ],
  }
}

export function SiteStructuredData() {
  const sink = currentHeadSink()
  const graph = siteGraph()
  if (sink) {
    pushJsonLd(sink, 'site-graph', graph)
    return null
  }
  return <script type="application/ld+json">{JSON.stringify(graph)}</script>
}
