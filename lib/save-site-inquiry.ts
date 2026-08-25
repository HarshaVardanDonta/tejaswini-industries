import { randomUUID } from 'node:crypto'

import type { InquiryPayload } from './contact-inquiry.js'
import {
  isSanityServerWriteConfigured,
  sanityServerWriteClient,
} from './sanity-server.js'

export type SiteInquirySource = 'quote' | 'contact'

export type SiteInquiryDocument = {
  _id: string
  _type: 'siteInquiry'
  source: SiteInquirySource
  responded: boolean
  submittedAt: string
  name: string
  company: string
  email: string
  phone: string
  inquiryLabel: string
  message: string
  quote?: Record<string, unknown>
}

export type SaveSiteInquiryResult =
  | { ok: true; id: string }
  | { ok: false; error: 'not_configured' | 'save_failed'; message: string }

function newInquiryId() {
  return `siteInquiry-${randomUUID()}`
}

export async function createSiteInquiryFromContact(
  payload: InquiryPayload,
): Promise<SaveSiteInquiryResult> {
  return createSiteInquiry({
    source: 'contact',
    name: payload.name,
    company: payload.company,
    email: payload.email,
    phone: payload.phone,
    inquiryLabel: payload.inquiryLabel,
    message: payload.message,
  })
}

async function createSiteInquiry(
  input: Omit<SiteInquiryDocument, '_id' | '_type' | 'responded' | 'submittedAt'>,
): Promise<SaveSiteInquiryResult> {
  if (!isSanityServerWriteConfigured) {
    return {
      ok: false,
      error: 'not_configured',
      message:
        'Form storage is not configured. Set SANITY_WRITE_TOKEN on the server.',
    }
  }

  const doc: SiteInquiryDocument = {
    _id: newInquiryId(),
    _type: 'siteInquiry',
    responded: false,
    submittedAt: new Date().toISOString(),
    ...input,
  }

  try {
    await sanityServerWriteClient.create(doc)
    return { ok: true, id: doc._id }
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to save form submission.'
    console.error('[site-inquiry] save failed:', message)
    return { ok: false, error: 'save_failed', message }
  }
}
