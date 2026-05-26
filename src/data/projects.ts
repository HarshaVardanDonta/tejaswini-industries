import { images } from '../constants/images'

export type ProjectCategory = 'all' | 'transformers' | 'ht-panels' | 'installations'

export type ProjectSpec = {
  label: string
  value: string
}

export type Project = {
  id: string
  title: string
  category: Exclude<ProjectCategory, 'all'>
  categoryLabel: string
  sector: string
  location: string
  image: string
  imageAlt: string
  specs: ProjectSpec[]
  accent?: boolean
}

export type CommissionRow = {
  id: string
  sector: string
  deliverable: string
  location: string
  status: 'active' | 'closed'
}

export const projectFilters: { id: ProjectCategory; label: string }[] = [
  { id: 'all', label: 'All Projects' },
  { id: 'transformers', label: 'Transformers' },
  { id: 'ht-panels', label: 'HT Panels' },
  { id: 'installations', label: 'Installations' },
]

export const projects: Project[] = [
  {
    id: 'mega-solar-park',
    title: 'Mega Solar Park Substation',
    category: 'transformers',
    categoryLabel: 'Transformer',
    sector: 'Solar Farm Infrastructure',
    location: 'Gujarat',
    image: images.projects.solarSubstation,
    imageAlt: 'Massive industrial electrical transformer in a modern factory',
    accent: true,
    specs: [
      { label: 'Capacity', value: '500 MVA' },
      { label: 'Voltage', value: '400/220 kV' },
    ],
  },
  {
    id: 'cement-plant-control',
    title: 'Cement Plant Main Control',
    category: 'ht-panels',
    categoryLabel: 'HT Panels',
    sector: 'Cement Manufacturing',
    location: 'Maharashtra',
    image: images.projects.cementControl,
    imageAlt: 'Row of HT electrical control panels in a manufacturing facility',
    specs: [
      { label: 'Panels Installed', value: '24 Units' },
      { label: 'Standard', value: 'IEC 62271' },
    ],
  },
  {
    id: 'steel-mill-routing',
    title: 'Steel Mill Power Routing',
    category: 'installations',
    categoryLabel: 'Installation',
    sector: 'Heavy Metallurgy',
    location: 'Odisha',
    image: images.projects.steelRouting,
    imageAlt: 'Complex electrical cabling inside an industrial installation',
    specs: [
      { label: 'Scope', value: 'Full Turnkey' },
      { label: 'Completion', value: '2023-Q2' },
    ],
  },
]

export const commissionRows: CommissionRow[] = [
  {
    id: 'PRJ-24-091',
    sector: 'Textile Manufacturing',
    deliverable: '2500kVA Distribution Transformer',
    location: 'Surat',
    status: 'active',
  },
  {
    id: 'PRJ-24-088',
    sector: 'Automotive Assembly',
    deliverable: 'Complete HT/LT Panel Suite',
    location: 'Pune',
    status: 'closed',
  },
  {
    id: 'PRJ-23-112',
    sector: 'Petrochemicals',
    deliverable: 'Flameproof Substation Installation',
    location: 'Jamnagar',
    status: 'closed',
  },
]
