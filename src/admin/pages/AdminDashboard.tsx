import { Link } from 'react-router-dom'

import { adminNavGroups } from '../lib/adminNavigation'

export function AdminDashboard() {
  const sections = adminNavGroups.filter((g) => g.title !== 'Overview')

  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="font-h1 text-h1 text-primary uppercase">Dashboard</h1>
        <p className="font-body-lg text-body-lg text-gray-700 mt-2 max-w-2xl">
          Manage all website content structured by section. Changes are saved to Sanity and appear on
          the public site after you refresh.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {sections.flatMap((group) =>
          group.items.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="block border border-gray-200 rounded-sm bg-white p-5 hover:border-primary hover:shadow-sm transition-all"
            >
              <p className="font-label text-label text-gray-500 uppercase">{group.title}</p>
              <p className="font-h3 text-h3 text-primary uppercase mt-1">{item.label}</p>
              {item.description ? (
                <p className="font-body-sm text-body-sm text-gray-500 mt-2">{item.description}</p>
              ) : null}
            </Link>
          ))
        )}
      </div>
    </div>
  )
}
