import {
  coolingTypes,
  productCategories,
  transformerTypes,
  windingMaterials,
} from '../../data/quote'
import type { QuoteFormState } from '../../lib/buildQuoteMessage'
import { Icon } from '../Icon'
import {
  quoteMonoInputClassName,
  quoteSelectClassName,
  quoteTextareaClassName,
} from './quoteFormStyles'

type QuoteStepProductProps = {
  values: QuoteFormState
  errors: Partial<Record<keyof QuoteFormState, string>>
  onChange: (field: keyof QuoteFormState, value: string) => void
}

export function QuoteStepProduct({
  values,
  errors,
  onChange,
}: QuoteStepProductProps) {
  return (
    <div className="space-y-space-6">
      <div className="bg-gray-50 border-b border-gray-100 -mx-space-6 md:-mx-space-12 px-space-6 md:px-space-12 py-space-4 mb-space-6 flex justify-between items-center flex-wrap gap-space-2">
        <h2 className="font-h2 text-h2 text-on-surface uppercase flex items-center gap-space-2">
          <Icon name="settings_applications" size={22} className="text-primary" />
          Transformer Configuration
        </h2>
        <span className="font-mono-data text-mono-data text-gray-500 bg-white px-2 py-1 border border-gray-100 rounded">
          REF: TQ-{new Date().getFullYear()}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-space-6 gap-y-space-8">
        <div className="flex flex-col gap-space-2 md:col-span-2 lg:col-span-1">
          <label
            className="font-label text-label text-gray-700 uppercase"
            htmlFor="quote-category"
          >
            Category *
          </label>
          <div className="relative">
            <select
              className={quoteSelectClassName}
              id="quote-category"
              value={values.category}
              onChange={(event) => onChange('category', event.target.value)}
            >
              {productCategories.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <Icon
              name="arrow_drop_down"
              size={20}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
            />
          </div>
        </div>

        <div className="flex flex-col gap-space-2 md:col-span-2 lg:col-span-1">
          <label
            className="font-label text-label text-gray-700 uppercase"
            htmlFor="quote-capacity"
          >
            Estimated Capacity/Load (kVA)
          </label>
          <input
            className={quoteMonoInputClassName}
            id="quote-capacity"
            placeholder="e.g. 500"
            type="text"
            value={values.capacity}
            onChange={(event) => onChange('capacity', event.target.value)}
          />
        </div>

        <div className="col-span-1 md:col-span-2 border-t border-gray-100 my-space-2" />

        <div className="flex flex-col gap-space-2 md:col-span-2 lg:col-span-1">
          <label
            className="font-label text-label text-gray-700 uppercase"
            htmlFor="quote-transformer-type"
          >
            Transformer Type *
          </label>
          <div className="relative">
            <select
              className={quoteSelectClassName}
              id="quote-transformer-type"
              value={values.transformerType}
              onChange={(event) => onChange('transformerType', event.target.value)}
            >
              {transformerTypes.map((option) => (
                <option key={option.value || 'placeholder'} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <Icon
              name="arrow_drop_down"
              size={20}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
            />
          </div>
          {errors.transformerType ? (
            <p className="font-body-sm text-body-sm text-red-700">
              {errors.transformerType}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-space-2 md:col-span-2 lg:col-span-1">
          <label
            className="font-label text-label text-gray-700 uppercase"
            htmlFor="quote-cooling-type"
          >
            Cooling Specification *
          </label>
          <div className="relative">
            <select
              className={quoteSelectClassName}
              id="quote-cooling-type"
              value={values.coolingType}
              onChange={(event) => onChange('coolingType', event.target.value)}
            >
              {coolingTypes.map((option) => (
                <option key={option.value || 'placeholder'} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <Icon
              name="arrow_drop_down"
              size={20}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
            />
          </div>
          {errors.coolingType ? (
            <p className="font-body-sm text-body-sm text-red-700">{errors.coolingType}</p>
          ) : null}
        </div>

        <div className="flex flex-col gap-space-3 col-span-1 md:col-span-2">
          <span className="font-label text-label text-gray-700 uppercase">
            Winding Material Preference *
          </span>
          <div className="flex flex-col sm:flex-row gap-space-6 bg-gray-50 p-space-4 border border-gray-100 rounded">
            {windingMaterials.map((option) => (
              <label
                key={option.value}
                className="flex items-center gap-space-3 cursor-pointer group"
              >
                <input
                  checked={values.windingMaterial === option.value}
                  className="w-4 h-4 border-gray-300 text-primary focus:ring-primary"
                  name="windingMaterial"
                  type="radio"
                  value={option.value}
                  onChange={(event) =>
                    onChange('windingMaterial', event.target.value)
                  }
                />
                <span className="font-body-sm text-body-sm font-medium text-on-surface group-hover:text-primary transition-colors">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-space-2 col-span-1 md:col-span-2">
          <label
            className="font-label text-label text-gray-700 uppercase flex justify-between items-end"
            htmlFor="quote-tap-changer"
          >
            Tap Changer Requirements
            <span className="font-body-sm text-gray-500 font-normal normal-case">
              (Optional)
            </span>
          </label>
          <textarea
            className={quoteTextareaClassName}
            id="quote-tap-changer"
            placeholder="Specify OLTC/OCTC requirements, tapping range (e.g., +5% to -10% in steps of 1.25%), or specific control gear requests."
            rows={4}
            value={values.tapChanger}
            onChange={(event) => onChange('tapChanger', event.target.value)}
          />
        </div>
      </div>
    </div>
  )
}
