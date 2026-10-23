export type CmsDoc = {
  _id: string
  _type: string
  [key: string]: unknown
}

export type FaqItem = {
  id: string
  page: string
  question: string
  answer: string
}

export type SiteSettingsDoc = {
  _id: 'siteSettings'
  _type: 'siteSettings'
  addressLines: string[]
  postalCode: string
  locality: string
  region: string
  country: string
  lat: number
  lng: number
  mapsUrl: string
  phone: string
  phoneHref: string
  email: string
  whatsappNumber: string
  whatsappNote: string
  hours: string[]
  opens: string
  closes: string
}
