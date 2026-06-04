import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { contactInfo } from '../../constants/contactInfo'
import { quotePage } from '../../data/quote'
import {
  createInitialQuoteFormState,
  type QuoteFormState,
} from '../../lib/buildQuoteMessage'
import { submitQuoteRequest } from '../../lib/submitQuoteRequest'
import { Icon } from '../Icon'
import { QuoteStepContact } from './QuoteStepContact'
import { QuoteStepIndicator } from './QuoteStepIndicator'
import { QuoteStepProduct } from './QuoteStepProduct'
import { QuoteStepTechnical } from './QuoteStepTechnical'

function validateStep1(values: QuoteFormState) {
  const errors: Partial<Record<keyof QuoteFormState, string>> = {}
  if (!values.company.trim()) errors.company = 'Company name is required.'
  if (!values.name.trim()) errors.name = 'Full name is required.'
  if (!values.email.trim()) {
    errors.email = 'Business email is required.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Enter a valid email address.'
  }
  return errors
}

function validateStep2(values: QuoteFormState) {
  const errors: Partial<Record<keyof QuoteFormState, string>> = {}
  if (!values.transformerType) {
    errors.transformerType = 'Transformer type is required.'
  }
  if (!values.coolingType) {
    errors.coolingType = 'Cooling specification is required.'
  }
  return errors
}

function validateStep3(values: QuoteFormState) {
  const errors: Partial<Record<keyof QuoteFormState, string>> = {}
  if (!values.technicalRequirements.trim()) {
    errors.technicalRequirements = 'Technical requirements are required.'
  }
  return errors
}

export function QuoteWizard() {
  const [searchParams] = useSearchParams()
  const prefill = useMemo(
    () => ({
      product: searchParams.get('product') ?? undefined,
      sku: searchParams.get('sku') ?? undefined,
      category:
        searchParams.get('category') ??
        (searchParams.get('product') ? 'distribution-transformers' : undefined),
    }),
    [searchParams],
  )

  const [currentStep, setCurrentStep] = useState(1)
  const [values, setValues] = useState(() => createInitialQuoteFormState(prefill))
  const [errors, setErrors] = useState<Partial<Record<keyof QuoteFormState, string>>>(
    {},
  )
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  function updateField(field: keyof QuoteFormState, value: string | boolean) {
    setValues((current) => ({ ...current, [field]: value }))
    setErrors((current) => {
      if (!current[field]) return current
      const next = { ...current }
      delete next[field]
      return next
    })
  }

  function goBack() {
    setErrors({})
    setCurrentStep((step) => Math.max(1, step - 1))
  }

  function goNext() {
    const stepErrors =
      currentStep === 1
        ? validateStep1(values)
        : currentStep === 2
          ? validateStep2(values)
          : {}

    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors)
      return
    }

    setErrors({})
    setCurrentStep((step) => Math.min(3, step + 1))
  }

  async function handleSubmit() {
    const stepErrors = validateStep3(values)
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors)
      return
    }

    setSubmitError(null)
    setSubmitting(true)

    const result = await submitQuoteRequest({
      ...values,
      company: values.company.trim(),
      name: values.name.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      technicalRequirements: values.technicalRequirements.trim(),
    })

    setSubmitting(false)

    if (!result.ok) {
      setSubmitError(result.message)
      return
    }

    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="md:col-span-8 bg-surface-container-lowest border border-gray-100 p-space-8 md:p-space-12 rounded-lg shadow-sm text-center">
        <Icon name="check_circle" size={48} className="text-secondary mx-auto mb-space-4" />
        <h2 className="font-h2 text-h2 text-primary uppercase mb-space-4">
          Quote Request Submitted
        </h2>
        <p className="font-body-lg text-body-lg text-gray-700 max-w-xl mx-auto">
          {quotePage.successMessage.replace(
            'Our engineering team',
            `Our engineering team at ${contactInfo.email}`,
          )}
        </p>
      </div>
    )
  }

  return (
    <div className="md:col-span-8 bg-surface-container-lowest border border-gray-100 p-space-6 md:p-space-12 rounded-lg relative shadow-sm">
      <QuoteStepIndicator currentStep={currentStep} />

      {values.product || values.sku ? (
        <div className="mb-space-6 bg-blue-light/30 border border-primary/20 rounded px-space-4 py-space-3 font-body-sm text-body-sm text-gray-700">
          {values.product ? (
            <p>
              <span className="font-label text-label uppercase text-primary">Product:</span>{' '}
              {values.product}
            </p>
          ) : null}
          {values.sku ? (
            <p>
              <span className="font-label text-label uppercase text-primary">SKU:</span>{' '}
              {values.sku}
            </p>
          ) : null}
        </div>
      ) : null}

      {submitError ? (
        <p
          className="font-body-sm text-body-sm text-red-700 bg-red-50 border border-red-200 rounded px-space-3 py-space-2 mb-space-6"
          role="alert"
        >
          {submitError}
        </p>
      ) : null}

      {currentStep === 1 ? (
        <QuoteStepContact values={values} errors={errors} onChange={updateField} />
      ) : null}
      {currentStep === 2 ? (
        <QuoteStepProduct values={values} errors={errors} onChange={updateField} />
      ) : null}
      {currentStep === 3 ? (
        <QuoteStepTechnical values={values} errors={errors} onChange={updateField} />
      ) : null}

      <div className="pt-space-8 flex justify-between items-center border-t border-gray-100 mt-space-8">
        {currentStep > 1 ? (
          <button
            type="button"
            className="font-label text-label text-gray-700 uppercase hover:text-primary transition-colors flex items-center gap-1 px-3 py-2"
            onClick={goBack}
          >
            <Icon name="arrow_back" size={18} />
            Back to Step {currentStep - 1}
          </button>
        ) : (
          <span />
        )}

        {currentStep < 3 ? (
          <button
            type="button"
            className="bg-primary text-on-primary font-label text-label uppercase px-space-6 py-space-3 rounded hover:bg-primary-container transition-colors shadow-sm flex items-center gap-2"
            onClick={goNext}
          >
            {currentStep === 1 ? 'Continue to Product Details' : 'Proceed to Review'}
            <Icon name="arrow_forward" size={18} />
          </button>
        ) : (
          <button
            type="button"
            className="bg-primary text-on-primary font-label text-label uppercase px-space-8 py-space-3 rounded hover:bg-primary-container transition-colors shadow-sm flex items-center gap-2 disabled:opacity-60"
            disabled={submitting}
            onClick={handleSubmit}
          >
            {submitting ? 'Submitting…' : 'Submit Request'}
            <Icon name="send" size={18} />
          </button>
        )}
      </div>
    </div>
  )
}
