export type ContactInquiryInput = {
  name: string
  company: string
  email: string
  phone: string
  inquiryLabel: string
  message: string
}

export type SubmitContactInquiryResult =
  | { ok: true }
  | { ok: false; message: string; fields?: Record<string, string> }

export async function submitContactInquiry(
  input: ContactInquiryInput,
): Promise<SubmitContactInquiryResult> {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })

  let data: { error?: string; fields?: Record<string, string> } = {}
  try {
    data = (await response.json()) as typeof data
  } catch {
    // non-JSON error response
  }

  if (!response.ok) {
    return {
      ok: false,
      message:
        data.error ??
        'We could not send your inquiry. Please try again or email us directly.',
      fields: data.fields,
    }
  }

  return { ok: true }
}
