export type AdminNavItem = {
  label: string
  path: string
  description?: string
}

export type AdminNavGroup = {
  title: string
  items: AdminNavItem[]
}

export const adminNavGroups: AdminNavGroup[] = [
  {
    title: 'Overview',
    items: [{ label: 'Dashboard', path: '/admin', description: 'Content overview' }],
  },
  {
    title: 'Pages',
    items: [
      { label: 'Landing Page', path: '/admin/pages/landing' },
      { label: 'Services', path: '/admin/pages/services' },
      { label: 'About', path: '/admin/pages/about' },
      { label: 'Contact', path: '/admin/pages/contact' },
      { label: 'Corporate Profile', path: '/admin/pages/corporate-profile' },
      { label: 'Distribution Category', path: '/admin/pages/distribution-category' },
    ],
  },
  {
    title: 'Blogs',
    items: [{ label: 'All Posts', path: '/admin/blogs' }],
  },
  {
    title: 'Products',
    items: [
      { label: 'Categories & products', path: '/admin/products/categories' },
      { label: 'Comparison Parameters', path: '/admin/products/comparison' },
    ],
  },
  {
    title: 'Projects',
    items: [
      { label: 'Projects', path: '/admin/projects' },
      { label: 'Commission Rows', path: '/admin/commissions' },
    ],
  },
  {
    title: 'Inquiries',
    items: [
      {
        label: 'All submissions',
        path: '/admin/inquiries',
        description: 'Quote and contact form submissions',
      },
    ],
  },
  {
    title: 'Other',
    items: [{ label: 'Trending Articles', path: '/admin/trending' }],
  },
  {
    title: 'Settings',
    items: [{ label: 'Admin Credentials', path: '/admin/settings/credentials' }],
  },
]

export const pageKeys = [
  'landing',
  'services',
  'about',
  'contact',
  'corporate-profile',
  'distribution-category',
] as const

export type PageKey = (typeof pageKeys)[number]

export const pageKeyToDocId: Record<PageKey, string> = {
  landing: 'landingPage',
  services: 'servicesPage',
  about: 'aboutPage',
  contact: 'contactPage',
  'corporate-profile': 'corporateProfilePage',
  'distribution-category': 'distributionCategory',
}

export const pageKeyToType: Record<PageKey, string> = {
  landing: 'landingPage',
  services: 'servicesPage',
  about: 'aboutPage',
  contact: 'contactPage',
  'corporate-profile': 'corporateProfilePage',
  'distribution-category': 'distributionCategory',
}

export const pageKeyToTitle: Record<PageKey, string> = {
  landing: 'Landing Page',
  services: 'Services Page',
  about: 'About Page',
  contact: 'Contact Page',
  'corporate-profile': 'Corporate Profile',
  'distribution-category': 'Distribution Category',
}
