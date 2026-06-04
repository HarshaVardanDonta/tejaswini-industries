const productCategories = [
  { value: 'distribution-transformers', label: 'Distribution Transformers' },
  { value: 'turnkey-projects', label: 'Turnkey Projects' },
  { value: 'maintenance-retrofitting', label: 'Maintenance & Retrofitting' },
] as const

const transformerTypes = [
  { value: '', label: 'Select equipment class...' },
  { value: 'distribution', label: 'Distribution Transformer' },
  { value: 'power', label: 'Power Transformer' },
  { value: 'specialty', label: 'Specialty / Custom Build' },
] as const

const coolingTypes = [
  { value: '', label: 'Select cooling method...' },
  { value: 'onan', label: 'ONAN (Oil Natural Air Natural)' },
  { value: 'onaf', label: 'ONAF (Oil Natural Air Forced)' },
  { value: 'ofaf', label: 'OFAF (Oil Forced Air Forced)' },
] as const

const windingMaterials = [
  { value: 'copper', label: 'Electrolytic Copper' },
  { value: 'aluminum', label: 'High-Grade Aluminum' },
] as const

export type QuoteFormState = {
  company: string
  name: string
  email: string
  phone: string
  category: string
  capacity: string
  transformerType: string
  coolingType: string
  windingMaterial: string
  tapChanger: string
  altitude: string
  maxAmbientTemp: string
  siteDetails: string
  standardsIs: boolean
  standardsIec: boolean
  standardsAnsi: boolean
  technicalRequirements: string
  product: string
  sku: string
}

function labelFor(
  options: readonly { value: string; label: string }[],
  value: string,
) {
  return options.find((option) => option.value === value)?.label ?? value
}

export function buildQuoteMessage(state: QuoteFormState): string {
  const standards = [
    state.standardsIs ? 'IS (Indian Standards)' : null,
    state.standardsIec ? 'IEC Standards' : null,
    state.standardsAnsi ? 'ANSI Standards' : null,
  ].filter(Boolean)

  const sections = [
    state.product || state.sku
      ? [
          '--- Referenced Product ---',
          ...(state.product ? [`Product: ${state.product}`] : []),
          ...(state.sku ? [`SKU: ${state.sku}`] : []),
          '',
        ]
      : [],
    [
      '--- Product Details ---',
      `Category: ${labelFor(productCategories, state.category)}`,
      state.capacity ? `Estimated Capacity/Load (kVA): ${state.capacity}` : null,
      state.transformerType
        ? `Transformer Type: ${labelFor(transformerTypes, state.transformerType)}`
        : null,
      state.coolingType
        ? `Cooling Specification: ${labelFor(coolingTypes, state.coolingType)}`
        : null,
      state.windingMaterial
        ? `Winding Material: ${labelFor(windingMaterials, state.windingMaterial)}`
        : null,
      state.tapChanger ? `Tap Changer Requirements: ${state.tapChanger}` : null,
      '',
    ].filter((line) => line !== null),
    [
      '--- Technical Specifications ---',
      state.altitude ? `Altitude (m): ${state.altitude}` : null,
      state.maxAmbientTemp ? `Max Ambient Temp (°C): ${state.maxAmbientTemp}` : null,
      state.siteDetails ? `Site Conditions: ${state.siteDetails}` : null,
      standards.length ? `Compliance Standards: ${standards.join(', ')}` : null,
      state.technicalRequirements
        ? `Technical Requirements & Site Conditions:\n${state.technicalRequirements}`
        : null,
    ].filter((line) => line !== null),
  ]

  return sections.flat().join('\n').trim()
}

export function quoteFieldsOnly(state: QuoteFormState) {
  const {
    company: _c,
    name: _n,
    email: _e,
    phone: _p,
    ...quote
  } = state
  return quote
}
