import { Link } from 'react-router-dom'
import { type ReactNode } from 'react'

export function ListTable({
  title,
  description,
  addHref,
  addLabel = 'Add new',
  headerControls,
  columns,
  rows,
  emptyMessage = 'No items yet.',
}: {
  title: string
  description?: string
  addHref?: string
  addLabel?: string
  headerControls?: ReactNode
  columns: string[]
  rows: { id: string; cells: string[]; editHref: string }[]
  emptyMessage?: string
}) {
  return (
    <div className="p-6 space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-h1 text-h1 text-primary uppercase">{title}</h1>
          {description ? (
            <p className="font-body-sm text-body-sm text-gray-500 mt-1">{description}</p>
          ) : null}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {headerControls ?? null}
          {addHref ? (
            <Link
              to={addHref}
              className="bg-primary text-on-primary px-4 py-2 rounded-sm font-label text-label uppercase"
            >
              {addLabel}
            </Link>
          ) : null}
        </div>
      </div>
      <div className="border border-gray-200 rounded-sm overflow-hidden bg-white">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {columns.map((col) => (
                <th
                  key={col}
                  className="px-4 py-3 font-label text-label text-gray-700 uppercase tracking-wide"
                >
                  {col}
                </th>
              ))}
              <th className="px-4 py-3 font-label text-label text-gray-700 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="px-4 py-8 text-center text-gray-500 font-body-sm">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50/50">
                  {row.cells.map((cell, i) => (
                    <td key={i} className="px-4 py-3 font-body-sm text-body-sm text-gray-700">
                      {cell}
                    </td>
                  ))}
                  <td className="px-4 py-3">
                    <Link
                      to={row.editHref}
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
