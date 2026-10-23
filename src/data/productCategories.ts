import { images } from '../constants/images'

export type ProductCategory = {
  id: string
  title: string
  description: string
  image: string
  imageAlt: string
  technicalSpecs: string[]
  bodyParagraphs: string[]
}

export function getProductCategoryPath(id: string) {
  return `/products/${id}`
}

/** Choices shown on the distribution transformer page, not as their own products. */
export const CATALOG_HIDDEN_IDS = new Set([
  'crgo-core-transformers',
  'amorphous-core-transformers',
  'aluminium-wound-transformers',
  'oil-cooled-transformers',
  'oltc-transformers',
])

export function getProductCategoryById(id: string): ProductCategory | undefined {
  return productCategories.find((category) => category.id === id)
}

export const productCategories: ProductCategory[] = [
  {
    id: 'distribution-transformers',
    title: 'Distribution Transformers in Hyderabad',
    description:
      'Distribution transformers made in Hyderabad, 100 kVA to 2000 kVA, 11/22/33 kV, ONAN, with CRGO or amorphous cores and aluminium or copper windings.',
    image: images.products.distribution,
    imageAlt:
      'Heavy-duty industrial distribution transformer in a modern warehouse',
    technicalSpecs: [
      'Range: 100 kVA to 2000 kVA',
      'Voltage Class: 11 kV, 22 kV, 33 kV',
      'Cooling: ONAN',
      'Core: CRGO or amorphous',
      'Winding: aluminium (Al) or copper (Cu)',
      'Taping: OFF Load Tap Changer / On load Tap changer',
    ],
    bodyParagraphs: [
      'Distribution transformers for projects in Hyderabad and Telangana are built in 1 or 3 phase, with primary voltages up to 33 kV and secondary voltages from 433 V to 11000 V. The top rating is 2000 kVA. The low end of the published range remains 100 kVA.',
      'Cores are CRGO (cold-rolled grain-oriented steel) or amorphous metal. Windings are aluminium (Al) or copper (Cu). ISO 9001 certification is stated for the transformers, with internal and external quality audits. No efficiency-star rating is published.',
      'Cooling is ONAN (oil natural, air natural). Tap changers are off-load or on-load. Apartment and factory kVA is not published as a sizing chart; send connected load with the inquiry.',
    ],
  },
  {
    id: 'crgo-core-transformers',
    title: 'CRGO Core Distribution Transformers in Hyderabad',
    description:
      'CRGO-core distribution transformers made in Hyderabad, Telangana, from 100 kVA to 2000 kVA at 11 kV, 22 kV and 33 kV, with aluminium windings.',
    image: images.products.distribution,
    imageAlt: 'CRGO-core distribution transformer built in Hyderabad',
    technicalSpecs: [
      'Core: CRGO (cold-rolled grain-oriented silicon steel)',
      'Range: 100 kVA to 2000 kVA',
      'Voltage Class: 11 kV, 22 kV, 33 kV',
      'Cooling: ONAN',
      'Winding: aluminium',
    ],
    bodyParagraphs: [
      'A CRGO core is cold-rolled grain-oriented silicon steel. The grains are aligned so magnetic loss along the rolling direction is lower than in non-oriented electrical steel. Tejaswini Industries builds CRGO-core distribution transformers in Hyderabad from 100 kVA to 2000 kVA.',
      'Voltage class is 11 kV, 22 kV and 33 kV. Cooling is ONAN. Windings are aluminium. No loss figure in watts and no efficiency-star rating are published.',
    ],
  },
  {
    id: 'amorphous-core-transformers',
    title: 'Amorphous Core Distribution Transformers in Hyderabad',
    description:
      'Amorphous-core distribution transformers made in Hyderabad, 100 kVA to 2000 kVA, 11/22/33 kV, aluminium wound, with lower no-load loss than CRGO.',
    image: images.products.distribution,
    imageAlt: 'Amorphous-core distribution transformer built in Hyderabad',
    technicalSpecs: [
      'Core: amorphous metal (metallic-glass ribbon)',
      'Range: 100 kVA to 2000 kVA',
      'Voltage Class: 11 kV, 22 kV, 33 kV',
      'Cooling: ONAN',
      'Winding: aluminium',
    ],
    bodyParagraphs: [
      'An amorphous core is a thin metallic-glass ribbon. It generally has lower no-load loss and lower hysteresis loss than a CRGO core of the same rating. Tejaswini Industries builds both cores in Hyderabad, from 100 kVA to 2000 kVA, with aluminium windings.',
      'The ribbon is more brittle than CRGO steel, and the tank is often larger for the same kVA. This site does not publish a watt loss, a percentage energy saving, or an efficiency-star rating.',
    ],
  },
  {
    id: 'aluminium-wound-transformers',
    title: 'Aluminium Wound Distribution Transformers in Hyderabad',
    description:
      'Aluminium-wound distribution transformers made in Hyderabad, 100 kVA to 2000 kVA, on CRGO or amorphous cores, for projects in Telangana.',
    image: images.products.distribution,
    imageAlt: 'Aluminium-wound distribution transformer built in Hyderabad',
    technicalSpecs: [
      'Winding: aluminium',
      'Core: CRGO or amorphous',
      'Range: 100 kVA to 2000 kVA',
      'Voltage Class: 11 kV, 22 kV, 33 kV',
      'Cooling: ONAN',
    ],
    bodyParagraphs: [
      'Distribution transformers made here use aluminium windings, on either a CRGO core or an amorphous core, from 100 kVA to 2000 kVA. Aluminium has lower electrical conductivity than copper, so the conductor cross-section is larger for the same current, and the winding weighs less.',
      'No price difference and no efficiency-star rating are published. Voltage class is 11 kV, 22 kV and 33 kV. Cooling is ONAN.',
    ],
  },
  {
    id: 'dry-type-transformers',
    title: 'Dry Type Transformers',
    description:
      'Environmentally safe, liquid-free transformers ideal for indoor installations where fire safety is paramount. Low maintenance and highly reliable.',
    image: images.products.dryType,
    imageAlt: 'Dry-type transformer in a clean electrical control room',
    technicalSpecs: [
      'VPI type (Vacuum Pressure Impregnated Transformer) up to 2000 kVA',
      'Insulation grade F (155 °C) and H (180 °C)',
      'Protection up to IP56',
      'High mechanical strength with void-free insulation',
      'No temperature fluctuation — easy maintenance, less prone to fire hazard',
    ],
    bodyParagraphs: [
      'A dry type transformer is a type of transformer which never uses any insulating liquid where its winding or core are immersed in liquid. Rather, the windings and core are kept within a sealed tank that is pressurized with air.',
      'We make VPI type (Vacuum Pressure Impregnated Transformer). This type of transformer is available up to 2000 kVA with insulation grade F (155 °) and H (180 °), with protection up to IP56.',
      'This type of transformer has several advantages: high mechanical strength, void-free insulation, no temperature fluctuation, easy maintenance, and less prone to fire hazard.',
    ],
  },
  {
    id: 'ht-panels',
    title: 'HT Panels',
    description:
      'High Tension switchgear panels designed for the protection and control of high-voltage industrial circuits, ensuring operational safety and system stability.',
    image: images.products.htPanels,
    imageAlt: 'Row of high tension electrical control panels',
    technicalSpecs: [
      'Vacuum Circuit Breaker rating 630–2000 A',
      'Current Transformer ACC: 1–5p10',
      'Potential Transformers ACC: 1',
      'Ammeter, voltmeter with selector switches',
      'Insulation level: 12/28/75 kV',
    ],
    bodyParagraphs: [
      'High Tension panels are designed for the protection and control of high-voltage industrial circuits. Our HT panels incorporate vacuum circuit breakers, current and potential transformers, and comprehensive metering for safe and reliable operation.',
      'Compact, rugged and reliable design with tripping by means of fuses and relays. Reliable arc quenching tested according to IS standards. Mechanical interlocked earth switch available as extra accessory.',
      'Rated short circuit capacity up to 26.3 kA (rms) and make-break up to 630 A. Standard electrical and mechanical materials used as per IS/IEC specification to obtain better electrical and mechanical properties.',
    ],
  },
  {
    id: 'lt-panels',
    title: 'LT Panels',
    description:
      'Low Tension distribution boards providing critical power routing and circuit protection for complex facility networks and heavy machinery clusters.',
    image: images.products.ltPanels,
    imageAlt: 'Low tension distribution panels in a factory setting',
    technicalSpecs: [
      'All types of LT distribution panels',
      'Consumes less space',
      'Complete protection against bird nesting, leakage through bushing and corrosion',
      'Easy operation and maintenance',
      'Live parts are not directly accessible',
      'Loose connections avoided using solid busbar system',
      'On-load protected switching system',
    ],
    bodyParagraphs: [
      'Low Tension distribution panels provide critical power routing and circuit protection for complex facility networks and heavy machinery clusters.',
      'Our LT panels are designed to avoid direct lightning impulse exposure while ensuring live parts are not directly accessible. The solid busbar system eliminates loose connections for reliable long-term operation.',
    ],
  },
  {
    id: 'rmus',
    title: 'RMUs',
    description:
      'Compact, fully enclosed Ring Main Units for secondary distribution networks. Offering superior protection in minimal spatial footprints.',
    image: images.products.rmu,
    imageAlt: 'Compact ring main unit switchgear',
    technicalSpecs: [
      'Load Break Switches or SFU: 11 KV and 33 KV',
      'Vacuum Circuit Breakers (VCB): 11 KV and 33 KV',
      'Ring Main Unit: 11 KV and 33 KV',
      'Load Break Switch 630 A, 26.3 kA with Earth Switch and Interlock',
      'Earth Fault Indicator with CBCT as per EB Standard',
      'VCB Type Optional',
    ],
    bodyParagraphs: [
      'Ring Main Unit (RMU) is a compact, enclosed and sealed type of switchgear used for medium voltage power distribution. It is a complete switchgear in itself — an assembly of required switching devices, protection devices, and metering devices.',
      'RMUs of different voltage (mostly 12 kV and 24 kV) and current ratings are available. Indoor as well as outdoor types of Ring Main Units are available. A self-powered protection device with microprocessor-based numerical relay provides over current and earth fault protection.',
      'In distribution systems, RMU is widely used as it is a complete package and only needs installation and cable connection. Everything else is within the package, greatly reducing commissioning time.',
    ],
  },
]
