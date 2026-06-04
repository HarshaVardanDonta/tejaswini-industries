import type { QuoteFormState } from '../../lib/buildQuoteMessage'
import { quoteInputClassName } from './quoteFormStyles'

type QuoteStepContactProps = {
  values: QuoteFormState
  errors: Partial<Record<keyof QuoteFormState, string>>
  onChange: (field: keyof QuoteFormState, value: string) => void
}

export function QuoteStepContact({
  values,
  errors,
  onChange,
}: QuoteStepContactProps) {
  return (
    <div className="space-y-space-6">
      <h2 className="font-h3 text-h3 text-primary uppercase border-b-2 border-primary-container pb-space-2 inline-block">
        1. Contact Information
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-6">
        <div className="flex flex-col gap-space-2">
          <label
            className="font-label text-label text-gray-700 uppercase"
            htmlFor="quote-company"
          >
            Company Name *
          </label>
          <input
            className={quoteInputClassName}
            id="quote-company"
            required
            type="text"
            value={values.company}
            onChange={(event) => onChange('company', event.target.value)}
          />
          {errors.company ? (
            <p className="font-body-sm text-body-sm text-red-700">{errors.company}</p>
          ) : null}
        </div>
        <div className="flex flex-col gap-space-2">
          <label
            className="font-label text-label text-gray-700 uppercase"
            htmlFor="quote-name"
          >
            Full Name *
          </label>
          <input
            className={quoteInputClassName}
            id="quote-name"
            required
            type="text"
            value={values.name}
            onChange={(event) => onChange('name', event.target.value)}
          />
          {errors.name ? (
            <p className="font-body-sm text-body-sm text-red-700">{errors.name}</p>
          ) : null}
        </div>
        <div className="flex flex-col gap-space-2">
          <label
            className="font-label text-label text-gray-700 uppercase"
            htmlFor="quote-email"
          >
            Email (Work) *
          </label>
          <input
            className={quoteInputClassName}
            id="quote-email"
            required
            type="email"
            value={values.email}
            onChange={(event) => onChange('email', event.target.value)}
          />
          {errors.email ? (
            <p className="font-body-sm text-body-sm text-red-700">{errors.email}</p>
          ) : null}
        </div>
        <div className="flex flex-col gap-space-2">
          <label
            className="font-label text-label text-gray-700 uppercase"
            htmlFor="quote-phone"
          >
            Phone Number
          </label>
          <input
            className={quoteInputClassName}
            id="quote-phone"
            type="tel"
            value={values.phone}
            onChange={(event) => onChange('phone', event.target.value)}
          />
        </div>
      </div>
    </div>
  )
}
