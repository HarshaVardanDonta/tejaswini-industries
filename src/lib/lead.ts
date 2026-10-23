export const LEAD_LIMITS = {
  name: 80,
  company: 120,
  role: 80,
  email: 120,
  phone: 30,
  inquiryLabel: 80,
  kvaRating: 40,
  voltage: 40,
  projectLocation: 120,
  message: 2000,
} as const

export type LeadInput = {
  name: string
  company: string
  role: string
  email: string
  phone: string
  inquiryLabel: string
  kvaRating: string
  voltage: string
  projectLocation: string
  message: string
}

export type LeadFieldErrors = Partial<Record<keyof LeadInput, string>>

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function tooLong(value: string, max: number, label: string): string | undefined {
  if (value.length > max) return `${label} must be ${max} characters or fewer.`
  return undefined
}

export function validateLead(input: LeadInput): {
  payload?: LeadInput
  errors?: LeadFieldErrors
} {
  const name = input.name.trim()
  const company = input.company.trim()
  const role = input.role.trim()
  const email = input.email.trim()
  const phone = input.phone.trim()
  const inquiryLabel = input.inquiryLabel.trim()
  const kvaRating = input.kvaRating.trim()
  const voltage = input.voltage.trim()
  const projectLocation = input.projectLocation.trim()
  const message = input.message.trim()

  const errors: LeadFieldErrors = {}
  if (!name) errors.name = 'Full name is required.'
  else errors.name = tooLong(name, LEAD_LIMITS.name, 'Full name')
  if (!company) errors.company = 'Company name is required.'
  else errors.company = tooLong(company, LEAD_LIMITS.company, 'Company name')
  if (!role) errors.role = 'Role is required.'
  else errors.role = tooLong(role, LEAD_LIMITS.role, 'Role')
  if (!email) errors.email = 'Business email is required.'
  else if (!EMAIL_PATTERN.test(email)) errors.email = 'Enter a valid email address.'
  else errors.email = tooLong(email, LEAD_LIMITS.email, 'Email')
  if (phone) errors.phone = tooLong(phone, LEAD_LIMITS.phone, 'Phone')
  if (!inquiryLabel) errors.inquiryLabel = 'Inquiry type is required.'
  else errors.inquiryLabel = tooLong(inquiryLabel, LEAD_LIMITS.inquiryLabel, 'Inquiry type')
  if (!kvaRating) errors.kvaRating = 'kVA rating is required.'
  else errors.kvaRating = tooLong(kvaRating, LEAD_LIMITS.kvaRating, 'kVA rating')
  if (!voltage) errors.voltage = 'Voltage is required.'
  else errors.voltage = tooLong(voltage, LEAD_LIMITS.voltage, 'Voltage')
  if (!projectLocation) errors.projectLocation = 'Project location in Telangana is required.'
  else errors.projectLocation = tooLong(projectLocation, LEAD_LIMITS.projectLocation, 'Project location')
  if (!message) errors.message = 'Technical requirements are required.'
  else errors.message = tooLong(message, LEAD_LIMITS.message, 'Message')

  for (const key of Object.keys(errors) as (keyof LeadInput)[]) {
    if (!errors[key]) delete errors[key]
  }

  if (Object.keys(errors).length > 0) return { errors }

  return {
    payload: {
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
    },
  }
}
