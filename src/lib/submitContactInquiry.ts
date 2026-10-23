import { isFirebaseConfigured } from '../cms/config'
import { validateLead, type LeadInput } from './lead'

export type ContactInquiryInput = LeadInput

export type SubmitContactInquiryResult =
  | { ok: true }
  | { ok: false; message: string; fields?: Record<string, string> }

export async function submitContactInquiry(
  input: ContactInquiryInput,
): Promise<SubmitContactInquiryResult> {
  const { payload, errors } = validateLead(input)
  if (!payload || errors) {
    const first = errors ? Object.values(errors)[0] : undefined
    return {
      ok: false,
      message: first ?? 'Check the form and try again.',
      fields: errors,
    }
  }

  if (!isFirebaseConfigured) {
    return {
      ok: false,
      message: 'The form is not connected yet. Please call or use WhatsApp.',
    }
  }

  try {
    const { createLead } = await import('../cms/leads')
    await createLead(payload)
    return { ok: true }
  } catch (error) {
    const code = error && typeof error === 'object' && 'code' in error ? String(error.code) : ''
    return {
      ok: false,
      message:
        code === 'permission-denied'
          ? 'The inquiry was rejected. Shorten the fields and try again, or call us.'
          : 'We could not save your inquiry. Please call or use WhatsApp.',
    }
  }
}
