import { useEffect, useMemo } from 'react'
import { ProductsShell } from '../components/layout/ProductsShell'
import { PageLoading } from '../components/PageLoading'
import { CorporateProfileGlance } from '../components/corporate-profile/CorporateProfileGlance'
import { CorporateProfileHero } from '../components/corporate-profile/CorporateProfileHero'
import { CorporateProfilePageProvider } from '../context/PageDataContext'
import { corporateProfilePage } from '../data/corporateProfile'
import { useSanityQuery } from '../hooks/useSanityQuery'
import { mapCorporateProfilePage } from '../sanity/mappers'
import { queries } from '../sanity/queries'

export function CorporateProfilePage() {
  const { data, loading } = useSanityQuery(queries.corporateProfilePage, {}, null)
  const pageData = useMemo(
    () => mapCorporateProfilePage(data as Record<string, unknown> | null, corporateProfilePage as unknown as import('../sanity/pageTypes').CorporateProfilePageData),
    [data]
  )

  useEffect(() => {
    document.title =
      'Corporate Profile - Tejaswini Industries | Precision Engineering for Global Power Infrastructure'
  }, [])

  if (loading) return <ProductsShell className="bg-background"><PageLoading embedded /></ProductsShell>

  return (
    <CorporateProfilePageProvider value={pageData}>
      <ProductsShell className="bg-background" footerVariant="default">
        <main className="grow w-full">
          <CorporateProfileHero />
          <CorporateProfileGlance />
        </main>
      </ProductsShell>
    </CorporateProfilePageProvider>
  )
}
