import { Link } from 'react-router-dom'
import { Icon } from '../Icon'
import { ShortAnswer } from './ProductSeoBlocks'

export function ProductsIntro({ shortAnswer }: { shortAnswer?: string }) {
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
        {shortAnswer ? (
          <ShortAnswer text={shortAnswer} />
        ) : (
          <>
            <p className="font-body-lg text-body-lg text-gray-700">
              Tejaswini Industries manufactures distribution transformers, dry-type transformers,
              HT panels, LT panels and ring main units at Mallapur, Hyderabad. Distribution
              ratings are 100 kVA to 2000 kVA at 11 kV, 22 kV and 33 kV, oil-cooled (ONAN), with
              an off-load or on-load tap changer. Each unit is built with an aluminium or copper
              winding and a CRGO or amorphous core. ISO 9001:2015 and a BIS Certified mark are
              shown on this site.
            </p>
            <p className="font-body-sm text-body-sm text-gray-700 mt-space-4">
              <Link to="/products/distribution-transformers" className="text-secondary uppercase font-label">
                Distribution transformers
              </Link>
            </p>
          </>
        )}
      </div>
    </section>
  )
}
