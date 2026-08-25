import { Navigate, Route, Routes } from 'react-router-dom'

import { AdminLayout } from './layout/AdminLayout'
import { AdminDashboard } from './pages/AdminDashboard'
import { PageEditorPage } from './pages/PageEditorPage'
import { BlogListPage } from './pages/blogs/BlogListPage'
import { BlogEditorPage } from './pages/blogs/BlogEditorPage'
import { ProductCategoriesListPage } from './pages/products/ProductCategoriesListPage'
import { ProductCategoryEditPage } from './pages/products/ProductCategoryEditPage'
import { ProjectsListPage } from './pages/projects/ProjectsListPage'
import { ProjectEditPage } from './pages/projects/ProjectEditPage'
import { CommissionsListPage } from './pages/projects/CommissionsListPage'
import { CommissionEditPage } from './pages/projects/CommissionEditPage'
import { TrendingListPage } from './pages/TrendingListPage'
import { TrendingEditPage } from './pages/TrendingEditPage'
import { CredentialsPage } from './pages/settings/CredentialsPage'
import { InquiriesListPage } from './pages/inquiries/InquiriesListPage'
import { InquiryDetailPage } from './pages/inquiries/InquiryDetailPage'

export function AdminApp() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="pages/:pageKey" element={<PageEditorPage />} />
        <Route path="blogs" element={<BlogListPage />} />
        <Route path="blogs/:id" element={<BlogEditorPage />} />
        <Route path="products/categories" element={<ProductCategoriesListPage />} />
        <Route path="products/categories/:id" element={<ProductCategoryEditPage />} />
        <Route path="projects" element={<ProjectsListPage />} />
        <Route path="projects/:id" element={<ProjectEditPage />} />
        <Route path="commissions" element={<CommissionsListPage />} />
        <Route path="commissions/:id" element={<CommissionEditPage />} />
        <Route path="trending" element={<TrendingListPage />} />
        <Route path="trending/:id" element={<TrendingEditPage />} />
        <Route path="inquiries" element={<InquiriesListPage />} />
        <Route path="inquiries/:id" element={<InquiryDetailPage />} />
        <Route path="settings/credentials" element={<CredentialsPage />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Route>
    </Routes>
  )
}
