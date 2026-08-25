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

export function buildCategoryInquiryWhatsAppUrl(categoryTitle: string) {
  const message = [
    'Hello, I am interested in learning more about your products.',
    '',
    `Category: ${categoryTitle}`,
    '',
    'Please share specifications, pricing, and delivery details.',
  ].join('\n')

  return getWhatsAppUrl(message)
}
