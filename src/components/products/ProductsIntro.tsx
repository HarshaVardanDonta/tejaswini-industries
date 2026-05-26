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
          Industrial Power Solutions Range
        </h1>
        <p className="font-body-lg text-body-lg text-gray-700">
          Engineered for rigorous industrial environments, our comprehensive
          portfolio of transformers and control panels ensures uninterrupted power
          distribution and optimal operational efficiency. Every unit is
          manufactured to exacting ISO 9001:2015 standards, providing unmatched
          reliability and structural integrity.
        </p>
      </div>
    </section>
  )
}
