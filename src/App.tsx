import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from './components/layout/AppLayout'
import { AboutPage } from './pages/AboutPage'
import { CorporateProfilePage } from './pages/CorporateProfilePage'
import { ContactPage } from './pages/ContactPage'
import { BlogDetailPage } from './pages/BlogDetailPage'
import { BlogsPage } from './pages/BlogsPage'
import { DistributionTransformer250KvaPage } from './pages/DistributionTransformer250KvaPage'
import { DistributionTransformersPage } from './pages/DistributionTransformersPage'
import { TransformerSpecificationComparisonPage } from './pages/TransformerSpecificationComparisonPage'
import { LandingPage } from './pages/LandingPage'
import { ProductsPage } from './pages/ProductsPage'
import { ProjectsPage } from './pages/ProjectsPage'
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
  return (
    <div className="min-h-screen flex items-center justify-center font-body-sm text-body-sm text-gray-500">
      Loading admin…
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
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
            path="products/distribution-transformers"
            element={<DistributionTransformersPage />}
          />
          <Route
            path="products/distribution-transformers/compare"
            element={<TransformerSpecificationComparisonPage />}
          />
          <Route
            path="products/distribution-transformers/:slug"
            element={<DistributionTransformer250KvaPage />}
          />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="corporate-profile" element={<CorporateProfilePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="blogs" element={<BlogsPage />} />
          <Route path="blogs/:slug" element={<BlogDetailPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
