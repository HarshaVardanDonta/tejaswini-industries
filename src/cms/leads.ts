import { addDoc, collection, doc, updateDoc } from 'firebase/firestore'

import type { LeadInput } from '../lib/lead'
import { getFirebaseDb, isFirebaseConfigured } from './firebase'

export async function createLead(input: LeadInput) {
  if (!isFirebaseConfigured) {
    throw new Error('Firebase is not configured.')
  }
  await addDoc(collection(getFirebaseDb(), 'leads'), {
    _type: 'lead',
    source: 'contact',
    handled: false,
    submittedAt: new Date().toISOString(),
    name: input.name,
    company: input.company,
    role: input.role,
    email: input.email,
    phone: input.phone,
    inquiryLabel: input.inquiryLabel,
    kvaRating: input.kvaRating,
    voltage: input.voltage,
    projectLocation: input.projectLocation,
    message: input.message,
  })
}

export async function setLeadHandled(id: string, handled: boolean) {
  await updateDoc(doc(getFirebaseDb(), 'leads', id), {
    handled,
    handledAt: new Date().toISOString(),
  })
}
