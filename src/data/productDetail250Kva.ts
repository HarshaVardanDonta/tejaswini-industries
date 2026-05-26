import { images } from '../constants/images'

export type QuickSpec = {
  label: string
  value: string
  highlight?: boolean
}

export type TechnicalParameter = {
  parameter: string
  value: string
}

export const productDetail250Kva = {
  slug: '250-kva',
  sku: 'TR-250K-D1',
  title: '250 kVA Distribution Transformer',
  breadcrumbLabel: '250 kVA',
  description:
    'Engineered for absolute reliability in high-demand industrial environments. This 250 kVA unit features advanced core design for minimal energy loss and superior thermal management.',
  images: {
    main: {
      src: images.distributionListing.detail250kva.main,
      alt: '250 kVA distribution transformer in a modern industrial facility',
    },
    front: {
      src: images.distributionListing.detail250kva.front,
      alt: 'Front view of 250 kVA industrial transformer control panel',
    },
    detail: {
      src: images.distributionListing.detail250kva.detail,
      alt: 'Close-up of high-voltage ceramic bushings on distribution transformer',
    },
  },
  quickSpecs: [
    { label: 'Power Rating', value: '250 kVA', highlight: true },
    { label: 'Voltage Ratio', value: '11 kV / 433 V' },
    { label: 'Cooling Type', value: 'ONAN' },
    { label: 'Vector Group', value: 'Dyn11' },
  ] satisfies QuickSpec[],
  technicalParameters: [
    { parameter: 'Continuous Rating', value: '250 kVA' },
    { parameter: 'No-Load Loss (Max)', value: '480 W' },
    { parameter: 'Load Loss at 75°C (Max)', value: '3150 W' },
    { parameter: 'Impedance Voltage', value: '4.5%' },
    {
      parameter: 'Winding Material',
      value: 'Electrolytic Copper / Aluminum (Optional)',
    },
    { parameter: 'Insulation Class', value: 'Class A (Mineral Oil Immersed)' },
    {
      parameter: 'Applicable Standard',
      value: 'IS 1180 (Part 1) : 2014 / IEC 60076',
    },
  ] satisfies TechnicalParameter[],
} as const
