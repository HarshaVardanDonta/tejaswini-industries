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
    title: 'Tejaswini Industries',
    description:
      'Tejaswini Industries delivers industrial-grade transformers, control panels, and critical infrastructure solutions engineered for absolute reliability.',
    path: '/',
  },
  products: {
    title: 'Products',
    description:
      'Engineered for rigorous industrial environments, our comprehensive range of transformers, panels, and power distribution solutions.',
    path: '/products',
  },
  blogs: {
    title: 'Industrial Insights',
    description:
      'Technical articles, maintenance guides, and industry insights from Tejaswini Industries engineering team.',
    path: '/blogs',
  },
  about: {
    title: 'About Us',
    description:
      'Tejaswini Industries stands at the forefront of industrial precision, delivering robust solutions for power utilities and heavy manufacturing.',
    path: '/about',
  },
  contact: {
    title: 'Contact Us',
    description:
      'Get in touch with Tejaswini Industries for product inquiries, project consultations, and technical support.',
    path: '/contact',
  },
  requestQuote: {
    title: 'Request a Quote',
    description:
      'Request a technical quote from Tejaswini Industries for transformers, turnkey projects, and industrial power solutions.',
    path: '/request-quote',
  },
  services: {
    title: 'Services',
    description:
      'Turnkey engineering services, installation, commissioning, and maintenance from Tejaswini Industries.',
    path: '/services',
  },
  projects: {
    title: 'Projects',
    description:
      'Explore Tejaswini Industries completed projects and installations across power utilities and industrial sectors.',
    path: '/projects',
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
  compare: {
    title: 'Technical Comparison',
    description:
      'Compare distribution transformer specifications side by side to find the right industrial power solution.',
    path: '/products/distribution-transformers/compare',
  },
} as const
