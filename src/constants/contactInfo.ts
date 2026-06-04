export const contactInfo = {
  addressLines: [
    '3-13-109/1/1, FCI Road, Suryanagar',
    'Mallapur, Hyderabad - 500076, Telangana, India',
  ],
  /** WGS-84 coordinates for Tejaswini Industries, Mallapur, Hyderabad */
  coordinates: {
    lat: 17.4454786,
    lng: 78.5800202,
  },
  /** Google Maps directions / navigation to the office */
  mapsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=17.4454786,78.5800202&travelmode=driving',
  phone: '+91 9248030365',
  phoneHref: 'tel:+919248030365',
  email: 'info@tejaswiniindustries.com',
  mapLabel: 'Hyderabad, Telangana',
  operatingHoursLines: ['Mon - Sat: 9:00 AM - 5:30 PM', 'Sun: Closed'],
  whatsappNumber: '919248030362',
  whatsappMessages: {
    contact:
      'Hello, I would like to get in touch with Tejaswini Industries. Please share more details.',
    products:
      'Hello, I am interested in Tejaswini Industries products. Please share more details.',
  },
} as const

export function getWhatsAppUrl(message: string) {
  return `https://wa.me/${contactInfo.whatsappNumber}?text=${encodeURIComponent(message)}`
}

type ProductProposalFields = {
  sku: string
  title: string
  quickSpecs: { label: string; value: string }[]
  technicalParameters: { parameter: string; value: string }[]
}

export function buildProductProposalWhatsAppUrl({
  sku,
  title,
  quickSpecs,
  technicalParameters,
}: ProductProposalFields) {
  const primarySpecs = quickSpecs.map((spec) => `${spec.label}: ${spec.value}`).join('\n')
  const technicalSpecs = technicalParameters
    .map((param) => `${param.parameter}: ${param.value}`)
    .join('\n')

  const message = [
    'Hello, I would like to request a detailed proposal for the following product:',
    '',
    `Product: ${title}`,
    `SKU: ${sku}`,
    '',
    'Primary Specifications:',
    primarySpecs,
    '',
    'Technical Parameters:',
    technicalSpecs,
    '',
    'Please share pricing, delivery timeline, and any additional details.',
  ].join('\n')

  return getWhatsAppUrl(message)
}
