import { images } from '../constants/images'

export type ProductSpec = {
  label: string
  value: string
}

export type ProductBadge =
  | { type: 'best-seller'; label: string }
  | { type: 'efficiency'; label: string; icon: string }

export type ComparisonParameter = {
  key: string
  label: string
  hint?: string
}

export type ComparisonCellValue = string | { tags: string[] }

export type DistributionTransformerProduct = {
  id: string
  title: string
  image: string
  imageAlt: string
  specs: ProductSpec[]
  badge?: ProductBadge
  accent?: boolean
  detailSlug?: string
  comparisonSku?: string
  comparisonHighlight?: boolean
  comparisonValues: Record<string, ComparisonCellValue>
}

export const comparisonParameters: ComparisonParameter[] = [
  { key: 'capacity', label: 'Capacity Range' },
  { key: 'voltage', label: 'Voltage Ratio (kV)' },
  { key: 'standard', label: 'Applicable Standard' },
  { key: 'powerRating', label: 'Power Rating (kVA)' },
  { key: 'coolingType', label: 'Cooling Type' },
  { key: 'vectorGroup', label: 'Vector Group' },
  { key: 'noLoadLoss', label: 'No-Load Loss (W)', hint: 'Max losses at rated voltage and frequency' },
  { key: 'loadLoss', label: 'Load Loss @ 75°C (W)' },
  { key: 'impedance', label: 'Impedance Voltage (%)' },
  { key: 'compliance', label: 'Compliance Standards' },
]

export const distributionTransformerProducts: DistributionTransformerProduct[] =
  [
    {
      id: 'series-t',
      title: 'Oil Immersed Distribution Transformer - Series T',
      image: images.distributionListing.seriesT,
      imageAlt: 'Industrial oil-immersed distribution transformer',
      badge: { type: 'best-seller', label: 'Best Seller' },
      detailSlug: '250-kva',
      comparisonSku: 'DT-250',
      specs: [
        { label: 'Capacity', value: '100kVA - 500kVA' },
        { label: 'Voltage', value: '11kV / 433V' },
        { label: 'Standard', value: 'IS 2026 / IEC 60076' },
      ],
      comparisonValues: {
        capacity: '100kVA - 500kVA',
        voltage: '11 / 0.433',
        standard: 'IS 2026 / IEC 60076',
        powerRating: '250',
        coolingType: 'ONAN',
        vectorGroup: 'Dyn11',
        noLoadLoss: '480',
        loadLoss: '3150',
        impedance: '4.5',
        compliance: { tags: ['IS 1180', 'IEC 60076'] },
      },
    },
    {
      id: 'series-h',
      title: 'High-Capacity Core Type Transformer - Series H',
      image: images.distributionListing.seriesH,
      imageAlt: 'High capacity distribution transformer cooling radiators',
      comparisonSku: 'DT-1000',
      comparisonHighlight: true,
      specs: [
        { label: 'Capacity', value: '630kVA - 2500kVA' },
        { label: 'Voltage', value: '22kV / 433V' },
        { label: 'Standard', value: 'IS 2026 / IEC 60076' },
      ],
      comparisonValues: {
        capacity: '630kVA - 2500kVA',
        voltage: '22 / 0.433',
        standard: 'IS 2026 / IEC 60076',
        powerRating: '1000',
        coolingType: 'ONAN / ONAF',
        vectorGroup: 'Dyn11',
        noLoadLoss: '1250',
        loadLoss: '10500',
        impedance: '5.0',
        compliance: { tags: ['IS 1180', 'IEC 60076'] },
      },
    },
    {
      id: 'energy-efficient',
      title: 'Energy Efficient Star Rated Transformer',
      image: images.distributionListing.energyEfficient,
      imageAlt: 'Compact energy efficient distribution transformer',
      badge: { type: 'efficiency', label: 'High Efficiency', icon: 'bolt' },
      accent: true,
      detailSlug: '250-kva',
      comparisonSku: 'DT-250-EE',
      specs: [
        { label: 'Capacity', value: '25kVA - 250kVA' },
        { label: 'Efficiency', value: 'BEE 4 Star / 5 Star' },
        { label: 'Standard', value: 'IS 1180 (Part 1)' },
      ],
      comparisonValues: {
        capacity: '25kVA - 250kVA',
        voltage: '11 / 0.433',
        standard: 'IS 1180 (Part 1)',
        powerRating: '250',
        coolingType: 'ONAN',
        vectorGroup: 'Dyn11',
        noLoadLoss: '420',
        loadLoss: '3150',
        impedance: '4.5',
        compliance: { tags: ['IS 1180'] },
      },
    },
  ]

export function getDistributionProductsByIds(
  ids: string[]
): DistributionTransformerProduct[] {
  const unique = [...new Set(ids)]
  return unique
    .map((id) =>
      distributionTransformerProducts.find((product) => product.id === id)
    )
    .filter((product): product is DistributionTransformerProduct => !!product)
}

export const distributionCategory = {
  slug: 'distribution-transformers',
  title: 'Distribution Transformers',
  description:
    'Engineered for continuous operation in demanding environments. Our distribution transformers strictly adhere to ISO 9001:2015 standards, ensuring minimal energy loss and maximum reliability for industrial, commercial, and utility applications.',
} as const
