import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { GoogleAnalytics } from './components/GoogleAnalytics'
import { PageSEO } from './components/seo/PageSEO'
import { ScrollToTop } from './components/ScrollToTop'
import { AppLayout } from './components/layout/AppLayout'
import { AboutPage } from './pages/AboutPage'
import { CareerPage } from './pages/CareerPage'
import { ClientsPage } from './pages/ClientsPage'
import { CorporateProfilePage } from './pages/CorporateProfilePage'
import { ContactPage } from './pages/ContactPage'
import { BlogDetailPage } from './pages/BlogDetailPage'
import { BlogsPage } from './pages/BlogsPage'
import { ProductCategoryPage } from './pages/ProductCategoryPage'
import { InfrastructurePage } from './pages/InfrastructurePage'
import { LandingPage } from './pages/LandingPage'
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage'
import { ProductsPage } from './pages/ProductsPage'
import { ProjectsPage } from './pages/ProjectsPage'
import { QualityPolicyPage } from './pages/QualityPolicyPage'
import { ServiceAreasPage } from './pages/ServiceAreasPage'
import { ServicesPage } from './pages/ServicesPage'

const AdminLoginPage = lazy(() =>
  import('./admin/AdminLoginPage').then((m) => ({ default: m.AdminLoginPage }))
)
const AdminApp = lazy(() =>
  import('./admin/AdminApp').then((m) => ({ default: m.AdminApp }))
)
const AdminGuard = lazy(() =>
  import('./admin/AdminGuard').then((m) => ({ default: m.AdminGuard }))
)

function AdminFallback() {
  const { pathname } = useLocation()
  return (
    <div className="min-h-screen flex items-center justify-center font-body-sm text-body-sm text-gray-500">
      <PageSEO title="Admin" description="Private content admin." path={pathname} noindex />
      <h1 className="font-h1 text-h1 text-primary uppercase">Admin</h1>
    </div>
  )
}

function routerBasename(): string | undefined {
  const base = import.meta.env.BASE_URL
  if (!base || base === '/') return undefined
  return base.replace(/\/$/, '')
}

export function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <GoogleAnalytics />
      <Routes>
        <Route
          path="/admin/login"
          element={
            <Suspense fallback={<AdminFallback />}>
              <AdminLoginPage />
            </Suspense>
          }
        />
        <Route
          path="/admin/*"
          element={
            <Suspense fallback={<AdminFallback />}>
              <AdminGuard>
                <AdminApp />
              </AdminGuard>
            </Suspense>
          }
        />
        <Route element={<AppLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route
            path="products/power-transformers"
            element={<Navigate to="/products/distribution-transformers" replace />}
          />
          <Route
            path="products/copper-wound-transformers"
            element={<Navigate to="/products/distribution-transformers" replace />}
          />
          <Route
            path="products/aluminium-wound-transformers"
            element={<Navigate to="/products/distribution-transformers" replace />}
          />
          <Route
            path="products/crgo-core-transformers"
            element={<Navigate to="/products/distribution-transformers" replace />}
          />
          <Route
            path="products/amorphous-core-transformers"
            element={<Navigate to="/products/distribution-transformers" replace />}
          />
          <Route
            path="products/oil-cooled-transformers"
            element={<Navigate to="/products/distribution-transformers" replace />}
          />
          <Route
            path="products/oltc-transformers"
            element={<Navigate to="/products/distribution-transformers" replace />}
          />
          <Route
            path="products/distribution-transformers/compare"
            element={<Navigate to="/products/distribution-transformers" replace />}
          />
          <Route
            path="products/distribution-transformers/:slug"
            element={<Navigate to="/products/distribution-transformers" replace />}
          />
          <Route path="products/:categoryId" element={<ProductCategoryPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="clients" element={<ClientsPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="corporate-profile" element={<CorporateProfilePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="service-areas" element={<ServiceAreasPage />} />
          <Route path="request-quote" element={<Navigate to="/contact" replace />} />
          <Route path="quality-policy" element={<QualityPolicyPage />} />
          <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="careers" element={<CareerPage />} />
          <Route path="infrastructure" element={<InfrastructurePage />} />
          <Route path="blogs" element={<BlogsPage />} />
          <Route path="blogs/:slug" element={<BlogDetailPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </>
  )
}

function App() {
  return (
    <BrowserRouter basename={routerBasename()}>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
