import { complianceStandards } from '../../data/quote'
import type { QuoteFormState } from '../../lib/buildQuoteMessage'
import { Icon } from '../Icon'
import { quoteMonoInputClassName, quoteTextareaClassName } from './quoteFormStyles'

type QuoteStepTechnicalProps = {
  values: QuoteFormState
  errors: Partial<Record<keyof QuoteFormState, string>>
  onChange: (field: keyof QuoteFormState, value: string | boolean) => void
}

export function QuoteStepTechnical({
  values,
  errors,
  onChange,
}: QuoteStepTechnicalProps) {
  return (
    <div className="space-y-space-8">
      <div className="bg-surface-container-lowest border border-gray-100 rounded-lg p-space-6 shadow-sm">
        <h2 className="font-h2 text-h2 text-primary border-b border-gray-300 pb-space-2 mb-space-6 flex items-center gap-space-2">
          <Icon name="thermostat" size={22} className="text-primary" />
          Environmental &amp; Site Conditions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-6 mb-space-6">
          <div className="flex flex-col gap-space-1">
            <label
              className="font-label text-label text-gray-700 uppercase"
              htmlFor="quote-altitude"
            >
              Altitude (m above sea level)
            </label>
            <input
              className={quoteMonoInputClassName}
              id="quote-altitude"
              placeholder="e.g. 1000"
              type="number"
              value={values.altitude}
              onChange={(event) => onChange('altitude', event.target.value)}
            />
          </div>
          <div className="flex flex-col gap-space-1">
            <label
              className="font-label text-label text-gray-700 uppercase"
              htmlFor="quote-temp"
            >
              Max Ambient Temp (°C)
            </label>
            <input
              className={quoteMonoInputClassName}
              id="quote-temp"
              placeholder="e.g. 50"
              type="number"
              value={values.maxAmbientTemp}
              onChange={(event) => onChange('maxAmbientTemp', event.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col gap-space-1">
          <label
            className="font-label text-label text-gray-700 uppercase"
            htmlFor="quote-site-details"
          >
            Additional Site Conditions / Constraints
          </label>
          <textarea
            className={quoteTextareaClassName}
            id="quote-site-details"
            placeholder="Describe humidity levels, dust conditions, or physical space constraints..."
            rows={4}
            value={values.siteDetails}
            onChange={(event) => onChange('siteDetails', event.target.value)}
          />
        </div>
      </div>

      <div className="bg-surface-container-lowest border border-gray-100 rounded-lg p-space-6 shadow-sm">
        <h2 className="font-h2 text-h2 text-primary border-b border-gray-300 pb-space-2 mb-space-6 flex items-center gap-space-2">
          <Icon name="rule" size={22} className="text-primary" />
          Compliance Standards
        </h2>
        <p className="font-body-sm text-body-sm text-gray-500 mb-space-4">
          Select all applicable manufacturing and testing standards required for this
          project.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-4">
          {complianceStandards.map((standard) => (
            <label
              key={standard.id}
              className="flex items-start gap-space-2 cursor-pointer p-space-3 border border-gray-100 rounded hover:bg-gray-50 transition-colors"
            >
              <input
                checked={values[standard.id]}
                className="mt-1 border-gray-300 text-primary focus:ring-primary rounded-sm w-4 h-4"
                type="checkbox"
                onChange={(event) => onChange(standard.id, event.target.checked)}
              />
              <span className="flex flex-col">
                <span className="font-label text-label text-gray-700 font-bold">
                  {standard.label}
                </span>
                <span className="font-body-sm text-[11px] text-gray-500">
                  {standard.description}
                </span>
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="bg-surface-container-lowest border border-gray-100 rounded-lg p-space-6 shadow-sm">
        <h2 className="font-h2 text-h2 text-primary border-b border-gray-300 pb-space-2 mb-space-6 flex items-center gap-space-2">
          <Icon name="description" size={22} className="text-primary" />
          Technical Requirements
        </h2>
        <div className="flex flex-col gap-space-2">
          <label
            className="font-label text-label text-gray-700 uppercase"
            htmlFor="quote-specs"
          >
            Technical Requirements &amp; Site Conditions *
          </label>
          <textarea
            className={quoteTextareaClassName}
            id="quote-specs"
            placeholder="Describe voltage levels, load profile, installation environment, delivery timeline, or reference any attached documentation details..."
            required
            rows={5}
            value={values.technicalRequirements}
            onChange={(event) =>
              onChange('technicalRequirements', event.target.value)
            }
          />
          {errors.technicalRequirements ? (
            <p className="font-body-sm text-body-sm text-red-700">
              {errors.technicalRequirements}
            </p>
          ) : null}
        </div>
        <p className="font-body-sm text-body-sm text-gray-500 mt-space-4">
          For detailed SLD or BOQ documents, email them to{' '}
          <a
            className="text-primary hover:underline"
            href="mailto:info@tejaswiniindustries.com"
          >
            info@tejaswiniindustries.com
          </a>{' '}
          after submitting this form.
        </p>
      </div>
    </div>
  )
}
