import type { QuoteFormState } from './buildQuoteMessage'

export type SubmitQuoteRequestResult =
  | { ok: true }
  | { ok: false; message: string; fields?: Record<string, string> }

export async function submitQuoteRequest(
  input: QuoteFormState,
): Promise<SubmitQuoteRequestResult> {
  const response = await fetch('/api/quote', {
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
        'We could not submit your quote request. Please try again or email us directly.',
      fields: data.fields,
    }
  }

  return { ok: true }
}
