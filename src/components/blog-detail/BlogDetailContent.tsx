import { transformerMaintenanceGuide } from '../../data/blogDetailTransformerMaintenance'
import { Icon } from '../Icon'

export function BlogDetailContent() {
  const { intro, sections } = transformerMaintenanceGuide

  return (
    <div className="font-body-lg text-body-lg text-on-surface space-y-space-6 max-w-none">
      <p className="text-[18px] leading-relaxed font-semibold text-gray-700 border-l-2 border-gray-300 pl-space-4">
        {intro}
      </p>

      {sections.map((section) => (
        <div key={section.id}>
          <h2
            id={section.id}
            className="font-h2 text-h2 text-primary uppercase border-b-2 border-gray-100 pb-space-2 mt-space-8 scroll-mt-24"
          >
            {section.title}
          </h2>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className="mt-space-6">
              {paragraph}
            </p>
          ))}

          {section.subsections?.map((subsection) => (
            <div key={subsection.id}>
              <h3
                id={subsection.id}
                className="font-h3 text-h3 text-tertiary mt-space-6 scroll-mt-24"
              >
                {subsection.title}
              </h3>
              <ul className="list-none space-y-space-2 pl-0 mt-space-4">
                {subsection.checklist.map((item) => (
                  <li
                    key={item.label}
                    className="flex items-start gap-space-2"
                  >
                    <Icon
                      name="check_circle"
                      size={20}
                      filled={false}
                      className="text-secondary mt-[2px] shrink-0"
                    />
                    <span>
                      <strong>{item.label}</strong> {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {section.table && (
            <div className="w-full overflow-x-auto my-space-6 rounded industrial-border">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-300">
                    {section.table.headers.map((header) => (
                      <th
                        key={header}
                        className="p-space-3 font-label text-label text-gray-700 uppercase tracking-wide"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="font-mono-data text-mono-data text-on-surface">
                  {section.table.rows.map((row, index) => (
                    <tr
                      key={row[0]}
                      className={`border-b border-gray-100 hover:bg-gray-50/50 transition-colors ${
                        index % 2 === 1 ? 'bg-gray-50' : ''
                      }`}
                    >
                      {row.map((cell, cellIndex) => (
                        <td
                          key={cell}
                          className={`p-space-3 ${cellIndex === 0 ? 'font-semibold' : ''}`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {section.alert && (
            <div className="industrial-card industrial-card-critical p-space-4 my-space-6">
              <div className="flex gap-space-3">
                <Icon name="warning" size={24} className="text-secondary shrink-0" />
                <div>
                  <h4 className="font-h3 text-h3 text-on-surface mb-space-1">
                    {section.alert.title}
                  </h4>
                  <p className="font-body-sm text-body-sm text-gray-700 m-0">
                    {section.alert.message}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
