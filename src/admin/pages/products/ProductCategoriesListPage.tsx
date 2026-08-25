import { Link } from 'react-router-dom'

import { useAdminDocument } from '../../hooks/useAdminDocument'
import { adminQueries } from '../../lib/adminQueries'

type CategoryRow = {
  _id: string
  id: string
  title?: string
}

export function ProductCategoriesListPage() {
  const { data: categories, loading, error } =
    useAdminDocument<CategoryRow[]>(adminQueries.productCategories)

  if (loading) return <div className="p-6 text-gray-500">Loading…</div>
  if (error) return <div className="p-6 text-secondary">{error}</div>

  return (
    <div className="p-6 space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-h1 text-h1 text-primary uppercase">Product Categories</h1>
          <p className="font-body-sm text-body-sm text-gray-500 mt-1">
            Manage product categories shown on the public products pages.
          </p>
        </div>
        <Link
          to="/admin/products/categories/new"
          className="bg-primary text-on-primary px-4 py-2 rounded-sm font-label text-label uppercase"
        >
          Add category
        </Link>
      </div>

      <div className="border border-gray-200 rounded-sm overflow-hidden bg-white">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 font-label text-label text-gray-700 uppercase">ID</th>
              <th className="px-4 py-3 font-label text-label text-gray-700 uppercase">Title</th>
              <th className="px-4 py-3 font-label text-label text-gray-700 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {(categories ?? []).length === 0 ? (
              <tr>
                <td colSpan={3} className="px-4 py-8 text-center text-gray-500 font-body-sm">
                  No categories yet.
                </td>
              </tr>
            ) : (
              (categories ?? []).map((category) => (
                <tr key={category._id} className="border-b border-gray-100 hover:bg-gray-50/50">
                  <td className="px-4 py-3 font-body-sm text-body-sm text-gray-700">
                    {category.id}
                  </td>
                  <td className="px-4 py-3 font-body-sm text-body-sm text-gray-700">
                    {category.title ?? ''}
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      to={`/admin/products/categories/${encodeURIComponent(category._id)}`}
                      className="font-label text-label text-secondary uppercase hover:underline"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
