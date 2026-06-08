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

export function getProductCategoryById(id: string): ProductCategory | undefined {
  return productCategories.find((category) => category.id === id)
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
    technicalSpecs: [
      'Range: 100 KVA to 5000 KVA',
      'Voltage Class: 11 KV, 22 KV, 33 KV',
      'Cooling: ONAN',
      'Taping: OFF Load Tap Changer / On load Tap changer',
    ],
    bodyParagraphs: [
      'Distribution transformers for industrial application are available in 3 or 1 phase version with primary voltages of up to 33 KV and secondary voltages ranging from 433 to 11000 V. The capacity range is up to 10000 KVA. We manufacture single phase distribution transformers, three phase distribution transformers and industrial distribution transformers.',
      'The high quality standards set up by the company are appreciated by our customers in India and abroad. Standards which are applied to development, manufacturing, installing and commissioning of power transformers for power stations, special purpose transformers for industry fields, reactors and accessories.',
      'Our manufacturing facilities are located in Hyderabad. Power transformers up to 63 MVA 132 KV Class are regularly manufactured and supplied. Tejaswini is equipped to manufacture transformers with a wide range of internationally recognized standards.',
      'Setting high standards as a consistent guarantee of the highest quality, the company has achieved ISO 9001 certification for all its transformers. Regular internal and external quality audits ensure full and continuous conformity with international standards.',
    ],
  },
  {
    id: 'power-transformers',
    title: 'Power Transformers',
    description:
      'Heavy-duty transformers engineered for high-voltage transmission networks. Delivering supreme reliability and handling immense loads with minimal energy loss.',
    image: images.products.power,
    imageAlt: 'Large power transformer at an outdoor substation',
    technicalSpecs: [
      'Copper foil winding technology for high current sections',
      'Sustaining short circuit forces without distortion in LV and high current windings',
      'Hot spot in LV windings regulated',
      'No transposition — stray losses are minimal, reducing total copper losses',
      'Reduced copper losses vis-a-vis standard losses, lowering heat dissipating area',
    ],
    bodyParagraphs: [
      'A power transformer is characterized by inner and outer low voltage winding sections and a high voltage winding section disposed there between. The low voltage windings are comprised of a plurality of pancake coils, and the high voltage windings are comprised of a plurality of conductor strands spirally wound for a plurality of coil layers.',
      'A power transformer is an electrical device that transfers energy between two or more circuits through electromagnetic induction. A varying current in the transformer\'s primary winding creates a varying magnetic flux in the core and a varying magnetic field impinging on the secondary winding.',
      'Making use of Faraday\'s Law in conjunction with high magnetic permeability core properties, transformers can thus be designed to efficiently change AC voltages from one voltage level to another within power networks.',
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
      'VPI type (Vacuum Pressure Impregnated Transformer) up to 2.5 MVA',
      'Insulation grade F (155 °C) and H (180 °C)',
      'Protection up to IP56',
      'High mechanical strength with void-free insulation',
      'No temperature fluctuation — easy maintenance, less prone to fire hazard',
    ],
    bodyParagraphs: [
      'A dry type transformer is a type of transformer which never uses any insulating liquid where its winding or core are immersed in liquid. Rather, the windings and core are kept within a sealed tank that is pressurized with air.',
      'We make VPI type (Vacuum Pressure Impregnated Transformer). This type of transformer is available up to 2.5 MVA with insulation grade F (155 °) and H (180 °), with protection up to IP56.',
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
