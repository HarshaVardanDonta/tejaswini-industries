import { useCommissionRows } from '../../context/ProjectsPageContext'

export function CommissionsTable() {
  const commissionRows = useCommissionRows()
  return (
    <div className="md:col-span-2 lg:col-span-3 bg-surface-container-lowest border border-gray-100 rounded-xl overflow-hidden mt-space-6">
      <div className="bg-gray-50 p-space-4 border-b border-gray-100">
        <h3 className="font-h3 text-h3 text-primary uppercase">
          Recent Turnkey Commissions
        </h3>
      </div>
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 font-label text-label text-gray-700 uppercase border-b border-gray-300">
              <th className="p-space-4 font-semibold">Project ID</th>
              <th className="p-space-4 font-semibold">Client Sector</th>
              <th className="p-space-4 font-semibold">Core Deliverable</th>
              <th className="p-space-4 font-semibold">Location</th>
              <th className="p-space-4 font-semibold text-right">Status</th>
            </tr>
          </thead>
          <tbody className="font-body-sm text-body-sm text-on-surface">
            {commissionRows.map((row, index) => (
              <tr
                key={row.id}
                className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                  index === 1 ? 'bg-gray-50 hover:bg-gray-100' : ''
                }`}
              >
                <td className="p-space-4 font-mono-data text-mono-data">{row.id}</td>
                <td className="p-space-4">{row.sector}</td>
                <td className="p-space-4">{row.deliverable}</td>
                <td className="p-space-4">{row.location}</td>
                <td className="p-space-4 text-right">
                  {row.status === 'active' ? (
                    <span className="inline-flex items-center gap-1 text-[#25D366] font-label text-label uppercase">
                      <span className="w-2 h-2 rounded-full bg-[#25D366]" />
                      Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-gray-500 font-label text-label uppercase">
                      <span className="w-2 h-2 rounded-full bg-gray-500" />
                      Closed
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
