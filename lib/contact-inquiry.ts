export type InquiryPayload = {
  name: string
  company: string
  email: string
  phone: string
  inquiryLabel: string
  message: string
}

export type InquiryFieldErrors = Partial<Record<keyof InquiryPayload, string>>

export function parseInquiryPayload(body: unknown): {
  payload?: InquiryPayload
  errors?: InquiryFieldErrors
} {
  if (!body || typeof body !== 'object') {
    return { errors: { name: 'Invalid request body.' } }
  }

  const record = body as Record<string, unknown>
  const name = String(record.name ?? '').trim()
  const company = String(record.company ?? '').trim()
  const email = String(record.email ?? '').trim()
  const phone = String(record.phone ?? '').trim()
  const inquiryLabel = String(record.inquiryLabel ?? '').trim()
  const message = String(record.message ?? '').trim()

  const errors: InquiryFieldErrors = {}

  if (!name) errors.name = 'Full name is required.'
  if (!company) errors.company = 'Company name is required.'
  if (!email) {
    errors.email = 'Business email is required.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Enter a valid email address.'
  }
  if (!inquiryLabel) errors.inquiryLabel = 'Inquiry type is required.'
  if (!message) errors.message = 'Technical requirements are required.'

  if (Object.keys(errors).length > 0) {
    return { errors }
  }

  return {
    payload: { name, company, email, phone, inquiryLabel, message },
  }
}

export function buildInquiryEmailContent(payload: InquiryPayload) {
  const subject = `Project Inquiry: ${payload.inquiryLabel}`
  const text = [
    'New project inquiry from tejaswiniindustries.com',
    '',
    `Full Name: ${payload.name}`,
    `Company: ${payload.company}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone || 'Not provided'}`,
    `Inquiry Type: ${payload.inquiryLabel}`,
    '',
    'Technical Requirements:',
    payload.message,
  ].join('\n')

  const html = text
    .split('\n')
    .map((line) => (line === '' ? '<br>' : `<p>${escapeHtml(line)}</p>`))
    .join('')

  return { subject, text, html }
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}
