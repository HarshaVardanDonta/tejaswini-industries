import { NavLink } from 'react-router-dom'

import { adminNavGroups } from '../lib/adminNavigation'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `block px-3 py-2 rounded-sm font-body-sm text-body-sm transition-colors ${
    isActive ? 'bg-primary text-on-primary' : 'text-gray-700 hover:bg-gray-100'
  }`

export function AdminSidebar() {
  return (
    <aside className="w-64 shrink-0 border-r border-gray-200 bg-white flex flex-col min-h-screen">
      <div className="px-4 py-5 border-b border-gray-200">
        <p className="font-label text-label text-secondary uppercase tracking-widest">
          Tejaswini
        </p>
        <p className="font-h3 text-h3 text-primary uppercase">Content Admin</p>
      </div>
      <nav className="flex-1 overflow-y-auto p-3 space-y-6">
        {adminNavGroups.map((group) => (
          <div key={group.title}>
            <p className="px-3 mb-2 font-label text-label text-gray-500 uppercase tracking-widest">
              {group.title}
            </p>
            <ul className="space-y-1">
              {group.items.map((item) => (
                <li key={item.path}>
                  <NavLink to={item.path} end={item.path === '/admin'} className={linkClass}>
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-200">
        <a href="/" target="_blank" rel="noreferrer" className="font-label text-label text-primary uppercase hover:underline">
          View live site
        </a>
      </div>
    </aside>
  )
}
