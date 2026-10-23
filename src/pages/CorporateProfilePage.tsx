import { useMemo } from 'react'
import { ProductsShell } from '../components/layout/ProductsShell'
import { PageLoading } from '../components/PageLoading'
import { CorporateProfileGlance } from '../components/corporate-profile/CorporateProfileGlance'
import { CorporateProfileHero } from '../components/corporate-profile/CorporateProfileHero'
import { PageSEO } from '../components/seo/PageSEO'
import { staticPageMeta } from '../constants/seo'
import { CorporateProfilePageProvider } from '../context/PageDataContext'
import { corporateProfilePage } from '../data/corporateProfile'
import { useCmsQuery } from '../hooks/useCmsQuery'
import { mapCorporateProfilePage } from '../cms/mappers'
import { queries } from '../cms/queries'

export function CorporateProfilePage() {
  const { data, loading } = useCmsQuery(queries.corporateProfilePage, {}, null)
  const pageData = useMemo(
    () => mapCorporateProfilePage(data as Record<string, unknown> | null, corporateProfilePage as unknown as import('../cms/pageTypes').CorporateProfilePageData),
    [data]
  )

  if (loading) return <ProductsShell className="bg-background"><PageLoading embedded /></ProductsShell>

  return (
    <CorporateProfilePageProvider value={pageData}>
      <ProductsShell className="bg-background">
        <PageSEO {...staticPageMeta.corporateProfile} />
        <main className="grow w-full">
          <CorporateProfileHero />
          <CorporateProfileGlance />
        </main>
      </ProductsShell>
    </CorporateProfilePageProvider>
  )
}
