import { useProductDetail } from '../../context/ProductDetailContext'
import { Icon } from '../Icon'

export function TechnicalParametersTable() {
  const { technicalParameters } = useProductDetail()
  return (
    <section className="col-span-4 md:col-span-12 mb-space-16">
      <h2 className="font-h2 text-h2 text-primary uppercase mb-space-6 border-b-2 border-gray-100 pb-space-2 flex items-center gap-space-2">
        <Icon name="tune" className="text-secondary" filled={false} />
        Technical Parameters
      </h2>
      <div className="bg-white border border-gray-100 rounded-lg overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b border-gray-300">
            <tr>
              <th className="py-space-3 px-space-4 font-label text-label text-gray-700 uppercase tracking-wider w-1/3">
                Parameter
              </th>
              <th className="py-space-3 px-space-4 font-label text-label text-gray-700 uppercase tracking-wider">
                Value / Specification
              </th>
            </tr>
          </thead>
          <tbody className="font-body-sm text-body-sm text-gray-700">
            {technicalParameters.map((row, index) => (
              <tr
                key={row.parameter}
                className={`border-b border-gray-100 last:border-0 ${
                  index % 2 === 1 ? 'bg-gray-50' : ''
                }`}
              >
                <td className="py-space-3 px-space-4 font-medium">
                  {row.parameter}
                </td>
                <td className="py-space-3 px-space-4 font-mono-data text-mono-data">
                  {row.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
