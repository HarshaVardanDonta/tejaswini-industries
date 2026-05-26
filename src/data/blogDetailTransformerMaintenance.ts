import { images } from '../constants/images'

type ChecklistItem = { label: string; text: string }

type BlogSubsection = {
  id: string
  title: string
  checklist: ChecklistItem[]
}

type BlogSection = {
  id: string
  title: string
  paragraphs: string[]
  subsections?: BlogSubsection[]
  table?: {
    headers: string[]
    rows: string[][]
  }
  alert?: {
    title: string
    message: string
  }
}

export const transformerMaintenanceGuide = {
  slug: 'transformer-maintenance-guide',
  breadcrumbLabel: 'Transformer Maintenance',
  title:
    'Maximizing Efficiency: A Guide to Distribution Transformer Maintenance',
  author: 'Eng. Rajesh Kumar',
  date: 'Oct 24, 2024',
  readTime: '8 min read',
  heroImage: images.blogs.detailHero,
  heroImageAlt:
    'Distribution transformer maintenance in a modern manufacturing facility',
  intro:
    'Distribution transformers are the critical backbone of industrial power systems. Proactive maintenance is not merely a recommendation; it is an operational imperative to prevent catastrophic failures and ensure continuous high-performance output.',
  sections: [
    {
      id: 'routine-visual-inspections',
      title: '1. Routine Visual Inspections',
      paragraphs: [
        'Visual inspections form the first line of defense in transformer maintenance. These should be conducted strictly according to a documented schedule. Key indicators of potential issues include oil leaks around gaskets or valves, discoloration of the tank surface indicating localized overheating, and physical damage to bushings or cooling fins.',
      ],
      subsections: [
        {
          id: 'key-inspection-checkpoints',
          title: 'Key Inspection Checkpoints',
          checklist: [
            {
              label: 'Oil Levels & Leaks:',
              text: 'Verify conservator oil levels and inspect all welded joints and valves.',
            },
            {
              label: 'Silica Gel Breather:',
              text: 'Ensure the gel is blue (active) and replace if it turns pink (saturated).',
            },
            {
              label: 'Bushing Condition:',
              text: 'Check for cracks, tracking marks, or significant dirt accumulation.',
            },
          ],
        },
      ],
    },
    {
      id: 'technical-maintenance-schedule',
      title: '2. Technical Maintenance Schedule',
      paragraphs: [
        'Adhering to a standardized maintenance grid is vital for operational compliance and equipment longevity. Below is the recommended industrial standard schedule for oil-immersed distribution transformers.',
      ],
      table: {
        headers: ['Component', 'Inspection Action', 'Frequency', 'Tolerance limit'],
        rows: [
          [
            'Oil BDV Test',
            'Dielectric strength measurement',
            'Annual',
            '> 40 kV (min)',
          ],
          [
            'Earth Resistance',
            'Megger testing of neutral/body earth',
            'Bi-Annual',
            '< 1.0 Ohm',
          ],
          [
            'Buchholz Relay',
            'Gas accumulation check & float operation',
            'Quarterly',
            'Zero Gas',
          ],
          [
            'Winding Resistance',
            'Bridge method measurement per phase',
            '3 Years',
            '± 2% variation',
          ],
        ],
      },
      alert: {
        title: 'Critical Action Warning',
        message:
          'Never attempt oil sampling or internal inspections while the transformer is energized. Ensure comprehensive isolation and grounding protocols are executed prior to physical intervention.',
      },
    },
  ],
  tableOfContents: [
    { id: 'routine-visual-inspections', label: 'Routine Visual Inspections', indent: false },
    { id: 'key-inspection-checkpoints', label: 'Key Inspection Checkpoints', indent: true },
    { id: 'technical-maintenance-schedule', label: 'Technical Maintenance Schedule', indent: false },
  ],
  relatedProduct: {
    title: 'Oil Immersed Series T-500',
    capacity: 'Cap: 500kVA - 2500kVA',
    image: images.blogs.relatedOilImmersed,
    imageAlt: 'Oil immersed industrial transformer thumbnail',
    href: '/products/distribution-transformers',
  },
} satisfies {
  slug: string
  breadcrumbLabel: string
  title: string
  author: string
  date: string
  readTime: string
  heroImage: string
  heroImageAlt: string
  intro: string
  sections: BlogSection[]
  tableOfContents: { id: string; label: string; indent: boolean }[]
  relatedProduct: {
    title: string
    capacity: string
    image: string
    imageAlt: string
    href: string
  }
}
