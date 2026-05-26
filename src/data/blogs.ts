import { images } from '../constants/images'

export type BlogCategory =
  | 'all'
  | 'transformers'
  | 'electrical-safety'
  | 'industry-news'
  | 'maintenance'

export type BlogPost = {
  id: string
  slug?: string
  title: string
  excerpt: string
  category: Exclude<BlogCategory, 'all'>
  categoryLabel: string
  date: string
  author: string
  image: string
  imageAlt: string
  accent?: boolean
  alertMeta?: boolean
}

export type TrendingArticle = {
  rank: string
  title: string
  readTime: string
}

export const blogFilters: { id: BlogCategory; label: string }[] = [
  { id: 'all', label: 'All Categories' },
  { id: 'transformers', label: 'Transformers' },
  { id: 'electrical-safety', label: 'Electrical Safety' },
  { id: 'industry-news', label: 'Industry News' },
  { id: 'maintenance', label: 'Maintenance' },
]

export const featuredPost = {
  categoryLabel: 'TRANSFORMERS',
  date: 'OCT 24, 2024',
  title: 'Optimizing Core Performance in High-Voltage Transformers',
  excerpt:
    'A comprehensive analysis of advanced cooling methodologies and magnetic core optimizations designed to extend lifecycle and improve efficiency in heavy industrial applications.',
  image: images.blogs.featured,
  imageAlt: 'High-voltage transformer in a modern manufacturing facility',
  authorName: 'DR. ARVIND RAO',
  authorRole: 'CHIEF ENGINEER',
  authorImage: images.blogs.author,
  authorImageAlt: 'Professional headshot of chief engineer',
}

export const blogPosts: BlogPost[] = [
  {
    id: 'transformer-maintenance',
    slug: 'transformer-maintenance-guide',
    title: 'Maximizing Efficiency: A Guide to Distribution Transformer Maintenance',
    excerpt:
      'Proactive maintenance protocols for oil-immersed distribution transformers—visual inspections, dielectric testing, and ISO-compliant field checklists.',
    category: 'maintenance',
    categoryLabel: 'MAINTENANCE',
    date: 'OCT 24, 2024',
    author: 'ENG. RAJESH KUMAR',
    image: images.blogs.detailHero,
    imageAlt: 'Distribution transformer maintenance in a manufacturing facility',
  },
  {
    id: 'arc-flash-standards',
    title: 'Revised Arc Flash Hazard Safety Standards Q4',
    excerpt:
      'Critical updates to personal protective equipment requirements and boundary calculations for low-voltage panels.',
    category: 'electrical-safety',
    categoryLabel: 'ALERT • SAFETY',
    date: 'OCT 15, 2024',
    author: 'COMPLIANCE TEAM',
    image: images.blogs.safety,
    imageAlt: 'Industrial warehouse with electrical components',
    accent: true,
    alertMeta: true,
  },
  {
    id: 'iso-audit',
    title: 'ISO 9001:2015 Audit Preparation Guidelines',
    excerpt:
      'A structured checklist for manufacturing floors to ensure seamless compliance during upcoming certification renewal audits.',
    category: 'industry-news',
    categoryLabel: 'INDUSTRY NEWS',
    date: 'OCT 10, 2024',
    author: 'QA DEPT',
    image: images.blogs.industryNews,
    imageAlt: 'Technical blueprint on digital drafting screen',
  },
  {
    id: 'cable-routing',
    title: 'Cable Routing Standards for Heavy Load Centers',
    excerpt:
      'Best practices for tray management and separation protocols to minimize electromagnetic interference in dense installations.',
    category: 'electrical-safety',
    categoryLabel: 'ELECTRICAL SAFETY',
    date: 'OCT 05, 2024',
    author: 'DR. ARVIND RAO',
    image: images.blogs.electricalSafety,
    imageAlt: 'Heavy gauge electrical cables in steel conduit',
  },
]

export const trendingArticles: TrendingArticle[] = [
  {
    rank: '01',
    title: 'Copper vs Aluminum Windings: A Cost-Benefit Analysis',
    readTime: '5 MIN READ',
  },
  {
    rank: '02',
    title: 'Navigating the New Substation Clearance Regulations',
    readTime: '8 MIN READ',
  },
  {
    rank: '03',
    title: 'Troubleshooting Harmonic Distortion in Industrial Grids',
    readTime: '12 MIN READ',
  },
  {
    rank: '04',
    title: 'The Future of Dry-Type Transformers',
    readTime: '4 MIN READ',
  },
]
