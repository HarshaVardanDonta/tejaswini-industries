import { images } from '../constants/images'
import { contactInfo } from '../constants/contactInfo'

export const inquiryTypes = [
  { value: 'product', label: 'Product Inquiry' },
  { value: 'turnkey', label: 'Turnkey Project' },
  { value: 'liaisoning', label: 'Liaisoning Service' },
  { value: 'others', label: 'Others' },
] as const

export const contactPage = {
  hero: {
    title: 'Get in Touch',
    description:
      'Precision engineering requires clear communication. Connect with our technical consultants for robust industrial solutions, turnkey projects, and expert electrical liaisoning.',
  },
  infoCards: [
    {
      icon: 'domain',
      title: 'Corporate Office',
      lines: [...contactInfo.addressLines],
      mono: false,
    },
    {
      icon: 'call',
      title: 'Direct Contact',
      lines: [contactInfo.phone, contactInfo.email],
      mono: true,
    },
    {
      icon: 'schedule',
      title: 'Operating Hours',
      lines: [...contactInfo.operatingHoursLines],
      mono: false,
    },
  ],
  whatsapp: {
    title: 'Technical Support Chat',
    description:
      'Connect directly with our engineering team via WhatsApp for immediate technical assistance.',
    buttonLabel: 'Start Chat',
  },
  map: {
    image: images.contact.map,
    imageAlt: `Map showing Tejaswini Industries corporate office in ${contactInfo.mapLabel}`,
    label: contactInfo.mapLabel,
  },
  form: {
    title: 'Project Inquiry Form',
    submitLabel: 'Submit Inquiry',
  },
}
