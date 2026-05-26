import { images } from '../constants/images'

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
      lines: ['Industrial Estate, Phase II,', 'Sector 4, Manufacturing Hub, IN'],
      mono: false,
    },
    {
      icon: 'call',
      title: 'Direct Contact',
      lines: ['+91 800 555 0199', 'sales@tejaswini.ind'],
      mono: true,
    },
    {
      icon: 'schedule',
      title: 'Operating Hours',
      lines: ['Mon - Sat: 9:00 AM - 6:00 PM', 'Sun: Closed'],
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
    imageAlt:
      'Satellite map view of an industrial park with a facility marker',
    label: 'Manufacturing Hub, IN',
  },
  form: {
    title: 'Project Inquiry Form',
    submitLabel: 'Submit Inquiry',
  },
}
