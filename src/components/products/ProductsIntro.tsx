import { Link } from 'react-router-dom'
import { Icon } from '../Icon'

export function ProductsIntro() {
  return (
    <section className="flex flex-col gap-space-4">
      <nav
        aria-label="Breadcrumb"
        className="flex text-gray-500 font-label text-label uppercase"
      >
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              <Icon name="chevron_right" className="text-sm mx-1" size={16} />
              <span className="text-primary font-bold">Products</span>
            </div>
          </li>
        </ol>
      </nav>
      <div className="max-w-3xl border-l-4 border-secondary pl-space-4">
        <h1 className="font-display-lg text-display-lg md:font-display-xl md:text-display-xl text-primary uppercase mb-space-4">
          Transformers and Panels Made in Hyderabad
        </h1>
        <p className="font-body-lg text-body-lg text-gray-700">
          Tejaswini Industries manufactures distribution transformers, power transformers,
          dry-type transformers, oil-cooled ONAN units, copper-wound power transformers,
          OLTC and off-load tap-changer options, HT panels, LT panels and ring main units
          at Mallapur, Hyderabad. Distribution ratings published here are 100 kVA to 5000 kVA
          at 11 kV, 22 kV and 33 kV. ISO 9001:2015 and a BIS Certified mark are shown on this site.
        </p>
      </div>
    </section>
  )
}
