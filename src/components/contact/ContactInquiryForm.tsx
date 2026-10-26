import { useState, type FormEvent } from 'react'
import { contactInfo, getWhatsAppUrl } from '../../constants/contactInfo'
import { useContactPageData } from '../../context/PageDataContext'
import { submitContactInquiry } from '../../lib/submitContactInquiry'
import { Icon } from '../Icon'

function InstantContact() {
  return (
    <div className="flex flex-wrap gap-space-3">
      <a
        href={contactInfo.phoneHref}
        className="inline-flex items-center gap-2 border border-primary text-primary font-label text-label uppercase px-space-4 py-space-2 rounded hover:bg-primary hover:text-on-primary transition-colors"
      >
        <Icon name="call" size={18} />
        Call {contactInfo.phone}
      </a>
      <a
        href={getWhatsAppUrl(contactInfo.whatsappMessages.contact)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 border border-[#128C7E] text-[#128C7E] font-label text-label uppercase px-space-4 py-space-2 rounded hover:bg-[#128C7E] hover:text-white transition-colors"
      >
        <Icon name="chat" size={18} />
        WhatsApp
      </a>
    </div>
  )
}

const inputClassName =
  'w-full border border-gray-300 rounded bg-white px-space-3 py-space-2 font-body-sm text-body-sm text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors'

export function ContactInquiryForm() {
  const { form, inquiryTypes } = useContactPageData()
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)

    const formData = new FormData(event.currentTarget)
    const name = String(formData.get('name') ?? '').trim()
    const company = String(formData.get('company') ?? '').trim()
    const role = String(formData.get('role') ?? '').trim()
    const email = String(formData.get('email') ?? '').trim()
    const phone = String(formData.get('phone') ?? '').trim()
    const inquiryValue = String(formData.get('subject') ?? '')
    const kvaRating = String(formData.get('kvaRating') ?? '').trim()
    const voltage = String(formData.get('voltage') ?? '').trim()
    const projectLocation = String(formData.get('projectLocation') ?? '').trim()
    const technicalNotes = [
      ['IS 1180 efficiency level', String(formData.get('efficiencyLevel') ?? '').trim()],
      ['Tap changer', String(formData.get('tapChanger') ?? '').trim()],
      ['HV / LV terminations', String(formData.get('terminations') ?? '').trim()],
    ]
      .filter(([, value]) => value)
      .map(([label, value]) => `${label}: ${value}`)
    // The optional technical fields are saved inside the message, so the lead record and
    // the Firestore rules do not change.
    const message = [String(formData.get('message') ?? '').trim(), ...technicalNotes]
      .filter(Boolean)
      .join('\n')
    const inquiryLabel =
      inquiryTypes.find((type) => type.value === inquiryValue)?.label ?? inquiryValue

    setSubmitting(true)
    const result = await submitContactInquiry({
      name,
      company,
      role,
      email,
      phone,
      inquiryLabel,
      kvaRating,
      voltage,
      projectLocation,
      message,
    })
    setSubmitting(false)

    if (!result.ok) {
      setError(result.message)
      return
    }

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
        <div className="font-body-lg text-body-lg text-gray-700 py-space-8 text-center space-y-space-4">
          <p>Thank you. Your inquiry is saved. For an immediate reply, call or WhatsApp.</p>
          <InstantContact />
        </div>
      ) : (
        <form className="space-y-space-6" onSubmit={handleSubmit}>
          {error ? (
            <p
              className="font-body-sm text-body-sm text-red-700 bg-red-50 border border-red-200 rounded px-space-3 py-space-2"
              role="alert"
            >
              {error}
            </p>
          ) : null}
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
          <div className="flex flex-col gap-space-1">
            <label className="font-label text-label text-gray-700 uppercase" htmlFor="role">
              Your role *
            </label>
            <input
              className={inputClassName}
              id="role"
              name="role"
              required
              type="text"
              placeholder="Consultant, contractor, builder, utility engineer"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-6">
            <div className="flex flex-col gap-space-1">
              <label className="font-label text-label text-gray-700 uppercase" htmlFor="kvaRating">
                kVA rating *
              </label>
              <input className={inputClassName} id="kvaRating" name="kvaRating" required type="text" />
            </div>
            <div className="flex flex-col gap-space-1">
              <label className="font-label text-label text-gray-700 uppercase" htmlFor="voltage">
                Voltage *
              </label>
              <input
                className={inputClassName}
                id="voltage"
                name="voltage"
                required
                type="text"
                placeholder="11 kV / 33 kV / 433 V"
              />
            </div>
          </div>
          <fieldset className="grid grid-cols-1 md:grid-cols-3 gap-space-6 border border-gray-100 rounded p-space-4">
            <legend className="font-label text-label text-gray-700 uppercase px-space-2">
              Transformer details (optional)
            </legend>
            <div className="flex flex-col gap-space-1">
              <label className="font-label text-label text-gray-700 uppercase" htmlFor="efficiencyLevel">
                IS 1180 level
              </label>
              <select className={`${inputClassName} appearance-none`} id="efficiencyLevel" name="efficiencyLevel" defaultValue="">
                <option value="">Not sure / as per tender</option>
                <option value="Level 1">Level 1</option>
                <option value="Level 2">Level 2</option>
                <option value="Level 3">Level 3</option>
                <option value="Level 4">Level 4</option>
                <option value="Level 5">Level 5</option>
              </select>
            </div>
            <div className="flex flex-col gap-space-1">
              <label className="font-label text-label text-gray-700 uppercase" htmlFor="tapChanger">
                Tap changer
              </label>
              <select className={`${inputClassName} appearance-none`} id="tapChanger" name="tapChanger" defaultValue="">
                <option value="">Not sure</option>
                <option value="Off-load (OFTC)">Off-load (OFTC)</option>
                <option value="On-load (OLTC)">On-load (OLTC)</option>
              </select>
            </div>
            <div className="flex flex-col gap-space-1">
              <label className="font-label text-label text-gray-700 uppercase" htmlFor="terminations">
                HV / LV terminations
              </label>
              <input
                className={inputClassName}
                id="terminations"
                name="terminations"
                type="text"
                maxLength={120}
                placeholder="Bushings, cable box"
              />
            </div>
          </fieldset>
          <div className="flex flex-col gap-space-1">
            <label className="font-label text-label text-gray-700 uppercase" htmlFor="projectLocation">
              Project location in Telangana *
            </label>
            <input
              className={inputClassName}
              id="projectLocation"
              name="projectLocation"
              required
              type="text"
              placeholder="Hyderabad, or another Telangana site"
            />
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

          <div className="pt-space-4 border-t border-gray-100 flex flex-col gap-space-4 sm:flex-row sm:items-center sm:justify-between">
            <InstantContact />
            <button
              type="submit"
              disabled={submitting}
              className="bg-primary text-on-primary font-label text-label uppercase px-space-6 py-space-3 rounded hover:bg-primary-container transition-colors focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 flex items-center gap-2 group disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? 'Saving…' : form.submitLabel}
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
