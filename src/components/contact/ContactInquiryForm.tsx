import { useState, type FormEvent } from 'react'
import { contactPage, inquiryTypes } from '../../data/contact'
import { Icon } from '../Icon'

const inputClassName =
  'w-full border border-gray-300 rounded bg-white px-space-3 py-space-2 font-body-sm text-body-sm text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors'

export function ContactInquiryForm() {
  const { form } = contactPage
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="lg:col-span-7 bg-white border border-gray-300 rounded p-space-8 shadow-sm">
      <div className="mb-space-6 border-b border-gray-100 pb-space-4">
        <h2 className="font-h2 text-h2 text-primary uppercase flex items-center gap-space-2">
          <Icon name="mail" size={24} className="text-secondary" />
          {form.title}
        </h2>
      </div>

      {submitted ? (
        <p className="font-body-lg text-body-lg text-gray-700 py-space-8 text-center">
          Thank you for your inquiry. Our engineering team will respond within
          one business day.
        </p>
      ) : (
        <form className="space-y-space-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-6">
            <div className="flex flex-col gap-space-1">
              <label className="font-label text-label text-gray-700 uppercase" htmlFor="name">
                Full Name *
              </label>
              <input
                className={inputClassName}
                id="name"
                name="name"
                required
                type="text"
              />
            </div>
            <div className="flex flex-col gap-space-1">
              <label
                className="font-label text-label text-gray-700 uppercase"
                htmlFor="company"
              >
                Company Name *
              </label>
              <input
                className={inputClassName}
                id="company"
                name="company"
                required
                type="text"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-6">
            <div className="flex flex-col gap-space-1">
              <label className="font-label text-label text-gray-700 uppercase" htmlFor="email">
                Business Email *
              </label>
              <input
                className={inputClassName}
                id="email"
                name="email"
                required
                type="email"
              />
            </div>
            <div className="flex flex-col gap-space-1">
              <label className="font-label text-label text-gray-700 uppercase" htmlFor="phone">
                Phone Number
              </label>
              <input
                className={`${inputClassName} font-mono-data text-mono-data`}
                id="phone"
                name="phone"
                type="tel"
              />
            </div>
          </div>

          <div className="flex flex-col gap-space-1">
            <label className="font-label text-label text-gray-700 uppercase" htmlFor="subject">
              Inquiry Type *
            </label>
            <select
              className={`${inputClassName} appearance-none`}
              id="subject"
              name="subject"
              required
              defaultValue=""
            >
              <option disabled value="">
                Select an option...
              </option>
              {inquiryTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-space-1">
            <label className="font-label text-label text-gray-700 uppercase" htmlFor="message">
              Technical Requirements *
            </label>
            <textarea
              className={`${inputClassName} resize-y`}
              id="message"
              name="message"
              required
              rows={5}
            />
          </div>

          <div className="pt-space-4 border-t border-gray-100 flex justify-end">
            <button
              type="submit"
              className="bg-primary text-on-primary font-label text-label uppercase px-space-6 py-space-3 rounded hover:bg-primary-container transition-colors focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 flex items-center gap-2 group"
            >
              {form.submitLabel}
              <Icon
                name="arrow_forward"
                size={18}
                filled={false}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
