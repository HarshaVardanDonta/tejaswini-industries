import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppLayout } from './components/layout/AppLayout'
import { AboutPage } from './pages/AboutPage'
import { ContactPage } from './pages/ContactPage'
import { BlogDetailPage } from './pages/BlogDetailPage'
import { BlogsPage } from './pages/BlogsPage'
import { DistributionTransformer250KvaPage } from './pages/DistributionTransformer250KvaPage'
import { DistributionTransformersPage } from './pages/DistributionTransformersPage'
import { LandingPage } from './pages/LandingPage'
import { ProductsPage } from './pages/ProductsPage'
import { ProjectsPage } from './pages/ProjectsPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route
            path="products/distribution-transformers"
            element={<DistributionTransformersPage />}
          />
          <Route
            path="products/distribution-transformers/250-kva"
            element={<DistributionTransformer250KvaPage />}
          />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="blogs" element={<BlogsPage />} />
          <Route
            path="blogs/transformer-maintenance-guide"
            element={<BlogDetailPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
