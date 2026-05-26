import { images } from '../constants/images'

export type ProductCategory = {
  id: string
  title: string
  description: string
  image: string
  imageAlt: string
  listingPath?: string
}

export const productCategories: ProductCategory[] = [
  {
    id: 'distribution-transformers',
    title: 'Distribution Transformers',
    description:
      'High-efficiency distribution units designed to step down voltage for local commercial and industrial grid applications. Built with robust enclosures for extended operational lifespan.',
    image: images.products.distribution,
    imageAlt:
      'Heavy-duty industrial distribution transformer in a modern warehouse',
    listingPath: '/products/distribution-transformers',
  },
  {
    id: 'power-transformers',
    title: 'Power Transformers',
    description:
      'Heavy-duty transformers engineered for high-voltage transmission networks. Delivering supreme reliability and handling immense loads with minimal energy loss.',
    image: images.products.power,
    imageAlt: 'Large power transformer at an outdoor substation',
  },
  {
    id: 'dry-type-transformers',
    title: 'Dry Type Transformers',
    description:
      'Environmentally safe, liquid-free transformers ideal for indoor installations where fire safety is paramount. Low maintenance and highly reliable.',
    image: images.products.dryType,
    imageAlt: 'Dry-type transformer in a clean electrical control room',
  },
  {
    id: 'ht-panels',
    title: 'HT Panels',
    description:
      'High Tension switchgear panels designed for the protection and control of high-voltage industrial circuits, ensuring operational safety and system stability.',
    image: images.products.htPanels,
    imageAlt: 'Row of high tension electrical control panels',
  },
  {
    id: 'lt-panels',
    title: 'LT Panels',
    description:
      'Low Tension distribution boards providing critical power routing and circuit protection for complex facility networks and heavy machinery clusters.',
    image: images.products.ltPanels,
    imageAlt: 'Low tension distribution panels in a factory setting',
  },
  {
    id: 'rmus',
    title: 'RMUs',
    description:
      'Compact, fully enclosed Ring Main Units for secondary distribution networks. Offering superior protection in minimal spatial footprints.',
    image: images.products.rmu,
    imageAlt: 'Compact ring main unit switchgear',
  },
]
