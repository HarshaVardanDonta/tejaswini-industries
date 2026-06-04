import type { QuoteFormState } from './build-quote-message.js'

export type QuoteFieldErrors = Partial<Record<keyof QuoteFormState, string>>

export function parseQuotePayload(body: unknown): {
  payload?: QuoteFormState
  errors?: QuoteFieldErrors
} {
  if (!body || typeof body !== 'object') {
    return { errors: { name: 'Invalid request body.' } }
  }

  const record = body as Record<string, unknown>
  const bool = (key: keyof QuoteFormState) => record[key] === true

  const state: QuoteFormState = {
    company: String(record.company ?? '').trim(),
    name: String(record.name ?? '').trim(),
    email: String(record.email ?? '').trim(),
    phone: String(record.phone ?? '').trim(),
    category: String(record.category ?? 'distribution-transformers').trim(),
    capacity: String(record.capacity ?? '').trim(),
    transformerType: String(record.transformerType ?? '').trim(),
    coolingType: String(record.coolingType ?? '').trim(),
    windingMaterial: String(record.windingMaterial ?? 'copper').trim(),
    tapChanger: String(record.tapChanger ?? '').trim(),
    altitude: String(record.altitude ?? '').trim(),
    maxAmbientTemp: String(record.maxAmbientTemp ?? '').trim(),
    siteDetails: String(record.siteDetails ?? '').trim(),
    standardsIs: bool('standardsIs') || record.standardsIs === undefined,
    standardsIec: bool('standardsIec'),
    standardsAnsi: bool('standardsAnsi'),
    technicalRequirements: String(record.technicalRequirements ?? '').trim(),
    product: String(record.product ?? '').trim(),
    sku: String(record.sku ?? '').trim(),
  }

  const errors: QuoteFieldErrors = {}

  if (!state.company) errors.company = 'Company name is required.'
  if (!state.name) errors.name = 'Full name is required.'
  if (!state.email) {
    errors.email = 'Business email is required.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email)) {
    errors.email = 'Enter a valid email address.'
  }
  if (!state.transformerType) {
    errors.transformerType = 'Transformer type is required.'
  }
  if (!state.coolingType) {
    errors.coolingType = 'Cooling specification is required.'
  }
  if (!state.technicalRequirements) {
    errors.technicalRequirements = 'Technical requirements are required.'
  }

  if (Object.keys(errors).length > 0) {
    return { errors }
  }

  return { payload: state }
}
