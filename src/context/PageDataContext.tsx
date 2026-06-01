import { createContext, useContext } from 'react'

import { aboutPage } from '../data/about'
import { contactPage, inquiryTypes } from '../data/contact'
import { corporateProfilePage } from '../data/corporateProfile'
import { servicesPage } from '../data/services'
import type {
  AboutPageData,
  ContactPageData,
  CorporateProfilePageData,
  ServicesPageData,
} from '../sanity/pageTypes'

const ServicesContext = createContext<ServicesPageData>(servicesPage as ServicesPageData)
const AboutContext = createContext<AboutPageData>(aboutPage as AboutPageData)
const ContactContext = createContext<ContactPageData>({
  ...contactPage,
  inquiryTypes: [...inquiryTypes],
})
const CorporateProfileContext = createContext<CorporateProfilePageData>(
  corporateProfilePage as unknown as CorporateProfilePageData
)

export function ServicesPageProvider({
  value,
  children,
}: {
  value: ServicesPageData
  children: React.ReactNode
}) {
  return <ServicesContext.Provider value={value}>{children}</ServicesContext.Provider>
}

export function AboutPageProvider({
  value,
  children,
}: {
  value: AboutPageData
  children: React.ReactNode
}) {
  return <AboutContext.Provider value={value}>{children}</AboutContext.Provider>
}

export function ContactPageProvider({
  value,
  children,
}: {
  value: ContactPageData
  children: React.ReactNode
}) {
  return <ContactContext.Provider value={value}>{children}</ContactContext.Provider>
}

export function CorporateProfilePageProvider({
  value,
  children,
}: {
  value: CorporateProfilePageData
  children: React.ReactNode
}) {
  return <CorporateProfileContext.Provider value={value}>{children}</CorporateProfileContext.Provider>
}

export function useServicesPageData() {
  return useContext(ServicesContext)
}

export function useAboutPageData() {
  return useContext(AboutContext)
}

export function useContactPageData() {
  return useContext(ContactContext)
}

export function useCorporateProfilePageData() {
  return useContext(CorporateProfileContext)
}
