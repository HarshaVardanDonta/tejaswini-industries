import { Fragment, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import { NestedListTable } from '../../components/NestedListTable'
import { useAdminDocument } from '../../hooks/useAdminDocument'
import { adminQueries } from '../../lib/adminQueries'
import { resolveSlug } from '../../lib/adminMutations'
import { DISTRIBUTION_TRANSFORMERS_CATEGORY_ID } from '../../../constants/productCategories'
import type { SanitySlug } from '../../types/adminDocuments'

type CategoryRow = {
  _id: string
  id: string
  title?: string
}

type ProductDetailRow = {
  _id: string
  categoryId?: string
  slug?: string | SanitySlug
  title?: string
  sku?: string
}

function belongsToCategory(
  categoryId: string | undefined,
  parentCategoryId: string
) {
  const pid = categoryId ?? DISTRIBUTION_TRANSFORMERS_CATEGORY_ID
  return pid === parentCategoryId
}

export function ProductCategoriesListPage() {
  const { data: categories, loading: catLoading, error: catError } =
    useAdminDocument<CategoryRow[]>(adminQueries.productCategories)
  const { data: allProductDetails, loading: detailsLoading, error: detailsError } =
    useAdminDocument<ProductDetailRow[]>(adminQueries.productDetails)

  const [expanded, setExpanded] = useState<Set<string>>(() => new Set())

  const productDetailsByCategory = useMemo(() => {
    const map = new Map<string, ProductDetailRow[]>()
    for (const cat of categories ?? []) {
      map.set(
        cat.id,
        (allProductDetails ?? []).filter((p) => belongsToCategory(p.categoryId, cat.id))
      )
    }
    return map
  }, [categories, allProductDetails])

  const loading = catLoading || detailsLoading
  const error = catError ?? detailsError

  const toggleExpanded = (categoryDocId: string) => {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(categoryDocId)) next.delete(categoryDocId)
      else next.add(categoryDocId)
      return next
    })
  }

  if (loading) return <div className="p-6 text-gray-500">Loading…</div>
  if (error) return <div className="p-6 text-secondary">{error}</div>

  return (
    <div className="p-6 space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-h1 text-h1 text-primary uppercase">Categories &amp; products</h1>
          <p className="font-body-sm text-body-sm text-gray-500 mt-1">
            Choose a category, then add or edit products (slug, title, SKU).
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
              <th className="px-4 py-3 font-label text-label text-gray-700 uppercase w-10" />
              <th className="px-4 py-3 font-label text-label text-gray-700 uppercase">ID</th>
              <th className="px-4 py-3 font-label text-label text-gray-700 uppercase">Title</th>
              <th className="px-4 py-3 font-label text-label text-gray-700 uppercase">Products</th>
              <th className="px-4 py-3 font-label text-label text-gray-700 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {(categories ?? []).length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-500 font-body-sm">
                  No categories yet.
                </td>
              </tr>
            ) : (
              (categories ?? []).map((category) => {
                const isOpen = expanded.has(category._id)
                const products = productDetailsByCategory.get(category.id) ?? []
                return (
                  <Fragment key={category._id}>
                    <tr className="border-b border-gray-100 hover:bg-gray-50/50">
                      <td className="px-4 py-3">
                        <button
                          type="button"
                          aria-expanded={isOpen}
                          onClick={() => toggleExpanded(category._id)}
                          className="font-label text-label text-gray-600 w-8 h-8 flex items-center justify-center border border-gray-200 rounded-sm"
                        >
                          {isOpen ? '−' : '+'}
                        </button>
                      </td>
                      <td className="px-4 py-3 font-body-sm text-body-sm text-gray-700">
                        {category.id}
                      </td>
                      <td className="px-4 py-3 font-body-sm text-body-sm text-gray-700">
                        {category.title ?? ''}
                      </td>
                      <td className="px-4 py-3 font-body-sm text-body-sm text-gray-500">
                        {products.length}
                      </td>
                      <td className="px-4 py-3 space-x-3">
                        <button
                          type="button"
                          onClick={() => toggleExpanded(category._id)}
                          className="font-label text-label text-secondary uppercase hover:underline"
                        >
                          {isOpen ? 'Collapse' : 'View products'}
                        </button>
                        <Link
                          to={`/admin/products/categories/${encodeURIComponent(category._id)}`}
                          className="font-label text-label text-secondary uppercase hover:underline"
                        >
                          Edit category
                        </Link>
                      </td>
                    </tr>
                    {isOpen ? (
                      <tr className="bg-gray-50/80">
                        <td colSpan={5} className="px-4 py-4">
                          <div className="space-y-3 pl-2 border-l-2 border-primary/30">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <p className="font-label text-label text-gray-600 uppercase">
                                Products in {category.title ?? category.id}
                              </p>
                              <Link
                                to={`/admin/products/details/new?categoryId=${encodeURIComponent(category.id)}`}
                                className="font-label text-label text-primary uppercase hover:underline"
                              >
                                + Add product
                              </Link>
                            </div>
                            <NestedListTable
                              columns={['Slug', 'Title', 'SKU']}
                              rows={products.map((product) => ({
                                id: product._id,
                                cells: [
                                  resolveSlug(product.slug),
                                  product.title ?? '',
                                  product.sku ?? '',
                                ],
                                editHref: `/admin/products/details/${encodeURIComponent(product._id)}`,
                              }))}
                            />
                          </div>
                        </td>
                      </tr>
                    ) : null}
                  </Fragment>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
