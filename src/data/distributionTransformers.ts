import { images } from '../constants/images'

export type ProductSpec = {
  label: string
  value: string
}

export type ProductBadge =
  | { type: 'best-seller'; label: string }
  | { type: 'efficiency'; label: string; icon: string }

export type DistributionTransformerProduct = {
  id: string
  title: string
  image: string
  imageAlt: string
  specs: ProductSpec[]
  badge?: ProductBadge
  accent?: boolean
  detailSlug?: string
}

export const distributionTransformerProducts: DistributionTransformerProduct[] =
  [
    {
      id: 'series-t',
      title: 'Oil Immersed Distribution Transformer - Series T',
      image: images.distributionListing.seriesT,
      imageAlt: 'Industrial oil-immersed distribution transformer',
      badge: { type: 'best-seller', label: 'Best Seller' },
      detailSlug: '250-kva',
      specs: [
        { label: 'Capacity', value: '100kVA - 500kVA' },
        { label: 'Voltage', value: '11kV / 433V' },
        { label: 'Standard', value: 'IS 2026 / IEC 60076' },
      ],
    },
    {
      id: 'series-h',
      title: 'High-Capacity Core Type Transformer - Series H',
      image: images.distributionListing.seriesH,
      imageAlt: 'High capacity distribution transformer cooling radiators',
      specs: [
        { label: 'Capacity', value: '630kVA - 2500kVA' },
        { label: 'Voltage', value: '22kV / 433V' },
        { label: 'Standard', value: 'IS 2026 / IEC 60076' },
      ],
    },
    {
      id: 'energy-efficient',
      title: 'Energy Efficient Star Rated Transformer',
      image: images.distributionListing.energyEfficient,
      imageAlt: 'Compact energy efficient distribution transformer',
      badge: { type: 'efficiency', label: 'High Efficiency', icon: 'bolt' },
      accent: true,
      detailSlug: '250-kva',
      specs: [
        { label: 'Capacity', value: '25kVA - 250kVA' },
        { label: 'Efficiency', value: 'BEE 4 Star / 5 Star' },
        { label: 'Standard', value: 'IS 1180 (Part 1)' },
      ],
    },
  ]

export const distributionCategory = {
  slug: 'distribution-transformers',
  title: 'Distribution Transformers',
  description:
    'Engineered for continuous operation in demanding environments. Our distribution transformers strictly adhere to ISO 9001:2015 standards, ensuring minimal energy loss and maximum reliability for industrial, commercial, and utility applications.',
} as const
