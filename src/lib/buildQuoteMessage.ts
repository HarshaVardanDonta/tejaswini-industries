import {
  coolingTypes,
  productCategories,
  transformerTypes,
  windingMaterials,
} from '../data/quote'

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

export function createInitialQuoteFormState(
  prefill?: Partial<Pick<QuoteFormState, 'product' | 'sku' | 'category'>>,
): QuoteFormState {
  return {
    company: '',
    name: '',
    email: '',
    phone: '',
    category: prefill?.category ?? 'distribution-transformers',
    capacity: '',
    transformerType: '',
    coolingType: '',
    windingMaterial: 'copper',
    tapChanger: '',
    altitude: '',
    maxAmbientTemp: '',
    siteDetails: '',
    standardsIs: true,
    standardsIec: false,
    standardsAnsi: false,
    technicalRequirements: '',
    product: prefill?.product ?? '',
    sku: prefill?.sku ?? '',
  }
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
      ? ['--- Referenced Product ---', ...(state.product ? [`Product: ${state.product}`] : []), ...(state.sku ? [`SKU: ${state.sku}`] : []), '']
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
