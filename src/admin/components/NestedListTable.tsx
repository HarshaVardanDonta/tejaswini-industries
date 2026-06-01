import { Link } from 'react-router-dom'

/** Same table chrome as ListTable, for use inside expandable category rows. */
export function NestedListTable({
  columns,
  rows,
  emptyMessage = 'No products in this category yet.',
}: {
  columns: string[]
  rows: { id: string; cells: string[]; editHref: string }[]
  emptyMessage?: string
}) {
  return (
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
            <th className="px-4 py-3 font-label text-label text-gray-700 uppercase tracking-wide">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + 1}
                className="px-4 py-8 text-center text-gray-500 font-body-sm"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr
                key={row.id}
                className="border-b border-gray-100 last:border-0 hover:bg-gray-50/50"
              >
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
  )
}
