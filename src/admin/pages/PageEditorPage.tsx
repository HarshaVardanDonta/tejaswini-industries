import { Navigate, useParams } from 'react-router-dom'

import { pageKeys, type PageKey } from '../lib/adminNavigation'
import { AboutPageEditor } from '../editors/AboutPageEditor'
import { ContactPageEditor } from '../editors/ContactPageEditor'
import { CorporateProfilePageEditor } from '../editors/CorporateProfilePageEditor'
import { LandingPageEditor } from '../editors/LandingPageEditor'
import { ServicesPageEditor } from '../editors/ServicesPageEditor'

export function PageEditorPage() {
  const { pageKey } = useParams<{ pageKey: string }>()

  if (!pageKey || !pageKeys.includes(pageKey as PageKey)) {
    return <Navigate to="/admin" replace />
  }

  switch (pageKey as PageKey) {
    case 'landing':
      return <LandingPageEditor />
    case 'services':
      return <ServicesPageEditor />
    case 'about':
      return <AboutPageEditor />
    case 'contact':
      return <ContactPageEditor />
    case 'corporate-profile':
      return <CorporateProfilePageEditor />
    default:
      return <Navigate to="/admin" replace />
  }
}
