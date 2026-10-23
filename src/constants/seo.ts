import {
  DEFAULT_SITE_URL,
  buildAbsoluteUrl as buildAbsoluteUrlBase,
} from '../../lib/seo'

export {
  SITE_NAME,
  DEFAULT_SITE_URL,
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  truncateDescription,
  formatPageTitle,
} from '../../lib/seo'

export function getClientSiteUrl(): string {
  return (import.meta.env.VITE_SITE_URL || DEFAULT_SITE_URL).replace(/\/$/, '')
}

export function buildAbsoluteUrl(pathOrUrl: string): string {
  return buildAbsoluteUrlBase(pathOrUrl, getClientSiteUrl())
}

export const staticPageMeta = {
  home: {
    title: 'Distribution Transformer Manufacturer in Hyderabad',
    description:
      'Tejaswini Industries manufactures 11 kV, 22 kV and 33 kV distribution transformers in Hyderabad, Telangana, from 100 kVA to 5000 kVA, with ONAN cooling and OLTC or off-load tap changers.',
    path: '/',
  },
  products: {
    title: 'Transformers and Panels Made in Hyderabad',
    description:
      'Distribution, power and dry-type transformers, oil-cooled and copper-wound units, OLTC options, HT panels, LT panels and ring main units from Mallapur, Hyderabad.',
    path: '/products',
  },
  serviceAreas: {
    title: 'Transformer Supply in Hyderabad and Telangana',
    description:
      'Distribution transformers and LT/HT panels made at Mallapur, Hyderabad, for projects in Hyderabad and Telangana. Quote with kVA, voltage and site location.',
    path: '/service-areas',
  },
  blogs: {
    title: 'Industrial Insights',
    description:
      'Technical articles, maintenance guides, and industry insights from Tejaswini Industries engineering team.',
    path: '/blogs',
  },
  about: {
    title: 'About the Hyderabad Transformer Works',
    description:
      'Tejaswini Industries designs and builds transformers and panels in Hyderabad, Telangana. ISO 9001:2015 and a BIS Certified mark are shown on this site.',
    path: '/about',
  },
  contact: {
    title: 'Request a Transformer Quote in Telangana',
    description:
      'Contact Tejaswini Industries in Mallapur, Hyderabad. Call +91 9248030365 or send kVA, voltage, company, role and the Telangana project location.',
    path: '/contact',
  },
  services: {
    title: 'Electrical Services in Hyderabad and Telangana',
    description:
      'Turnkey HT/LT work, maintenance and TGSPDCL / TSSPDCL liaisoning from Hyderabad. Liaisoning is a service, not a published product approval.',
    path: '/services',
  },
  projects: {
    title: 'Projects',
    description:
      'Explore Tejaswini Industries completed projects and installations across power utilities and industrial sectors.',
    path: '/projects',
  },
  clients: {
    title: 'Our Clients & Technical Testimonials',
    description:
      'Discover the industrial partners and technical testimonials that validate Tejaswini Industries precision engineering and ISO-certified reliability.',
    path: '/clients',
  },
  corporateProfile: {
    title: 'Corporate Profile',
    description:
      'Precision engineering for global power infrastructure. Learn about Tejaswini Industries capabilities, certifications, and corporate overview.',
    path: '/corporate-profile',
  },
  careers: {
    title: 'Careers',
    description:
      'Join Tejaswini Industries and build a career in precision electrical engineering and manufacturing.',
    path: '/careers',
  },
  infrastructure: {
    title: 'Infrastructure',
    description:
      'State-of-the-art manufacturing infrastructure and testing facilities at Tejaswini Industries.',
    path: '/infrastructure',
  },
  qualityPolicy: {
    title: 'Quality Policy',
    description:
      'Tejaswini Industries quality policy and commitment to precision-engineered products meeting applicable standards.',
    path: '/quality-policy',
  },
  privacyPolicy: {
    title: 'Privacy Policy',
    description:
      'How Tejaswini Industries collects, uses, and protects information when you visit our website or contact us.',
    path: '/privacy-policy',
  },
} as const
