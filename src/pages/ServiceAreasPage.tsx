import { Link } from 'react-router-dom'
import { FaqList, usePageFaqs } from '../components/FaqList'
import { ProductsShell } from '../components/layout/ProductsShell'
import { buildBreadcrumbJsonLd, buildFaqJsonLd, PageSEO } from '../components/seo/PageSEO'
import { staticPageMeta } from '../constants/seo'
import { useCmsQuery } from '../hooks/useCmsQuery'
import { CONTACT_PATH } from '../constants/routes'

type Area = { name: string; detail: string }
type ServiceAreasDoc = {
  title?: string
  description?: string
  paragraphs?: string[]
  areas?: Area[]
}

export function ServiceAreasPage() {
  const { data } = useCmsQuery<ServiceAreasDoc | null>('*[_id == "serviceAreasPage"][0]')
  const faqs = usePageFaqs('service-areas')
  const title = data?.title || staticPageMeta.serviceAreas.title
  const description = data?.description || staticPageMeta.serviceAreas.description

  return (
    <ProductsShell className="bg-background">
      <PageSEO
        title={title}
        description={description}
        path="/service-areas"
        jsonLd={[
          buildBreadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Service areas', path: '/service-areas' },
          ]),
          ...(faqs.length ? [buildFaqJsonLd(faqs)] : []),
        ]}
      />
      <main className="grow w-full max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop py-space-12">
        <nav aria-label="Breadcrumb" className="font-label text-label text-gray-500 uppercase mb-space-6">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span aria-hidden> / </span>
          <span className="text-primary">Service areas</span>
        </nav>
        <h1 className="font-display-lg text-display-lg md:font-display-xl md:text-display-xl text-primary uppercase mb-space-4">
          {title}
        </h1>
        <p className="font-body-lg text-body-lg text-gray-700 max-w-3xl border-l-4 border-secondary pl-space-4 mb-space-8">
          {description}
        </p>
        <div className="flex flex-col gap-space-4 max-w-3xl mb-space-10">
          {(data?.paragraphs || []).map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className="font-body-lg text-body-lg text-gray-700">
              {paragraph}
            </p>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter mb-space-10">
          {(data?.areas || []).map((area) => (
            <section key={area.name} className="border border-gray-200 bg-white p-space-6">
              <h2 className="font-h2 text-h2 text-primary uppercase mb-space-3">{area.name}</h2>
              <p className="font-body-lg text-body-lg text-gray-700">{area.detail}</p>
            </section>
          ))}
        </div>
        <Link
          to={CONTACT_PATH}
          className="inline-flex bg-secondary text-on-secondary px-space-6 py-space-3 font-label text-label uppercase"
        >
          Request a quote
        </Link>
      </main>
      <FaqList page="service-areas" />
    </ProductsShell>
  )
}
