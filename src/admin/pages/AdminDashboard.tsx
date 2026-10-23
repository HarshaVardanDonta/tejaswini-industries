import { Link } from 'react-router-dom'

import { adminNavGroups } from '../lib/adminNavigation'
import { LeadsInbox } from './inquiries/InquiriesListPage'

export function AdminDashboard() {
  const sections = adminNavGroups.filter((g) => g.title !== 'Overview')

  return (
    <div className="space-y-8">
      <div className="px-6 pt-6">
        <h1 className="font-h1 text-h1 text-primary uppercase">Dashboard</h1>
        <p className="font-body-lg text-body-lg text-gray-700 mt-2 max-w-2xl">
          Content edits are saved in Firestore. This site has no server, so a save does not rebuild
          the HTML or send email. Run a new static deploy when crawlers should see the updated copy.
          Visitors who run JavaScript load the latest Firestore content after the page opens.
        </p>
      </div>
      <section id="leads" className="px-6">
        <h2 className="font-h2 text-h2 text-primary uppercase mb-2">Leads inbox</h2>
        <LeadsInbox compact showHeading={false} />
      </section>
      <div className="px-6 pb-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
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
