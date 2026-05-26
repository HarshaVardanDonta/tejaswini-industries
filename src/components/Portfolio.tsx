import { Link } from 'react-router-dom'
import { images } from '../constants/images'
import { Icon } from './Icon'

export function Portfolio() {
  return (
    <section className="py-space-16 px-margin-mobile md:px-margin-desktop bg-gray-50 border-y border-gray-100 w-full">
      <div className="max-w-[1280px] mx-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-end mb-space-8 gap-space-4">
          <div>
            <div className="font-label text-label text-secondary uppercase tracking-widest mb-2">
              Core Solutions
            </div>
            <h2 className="font-display-lg text-display-lg text-gray-700 uppercase">
              Industrial Portfolio
            </h2>
          </div>
          <Link
            to="/products"
            className="text-primary font-label text-label uppercase hover:text-primary-container transition-colors flex items-center gap-1"
          >
            View All Products
            <Icon name="arrow_forward" size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-space-4 auto-rows-[250px]">
          <div className="md:col-span-8 row-span-2 group relative overflow-hidden rounded-sm border border-gray-100 bg-white">
            <img
              alt="Power transformers"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              src={images.transformers}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-space-6 w-full">
              <h3 className="font-h1 text-h1 text-white uppercase mb-2">
                Power Transformers
              </h3>
              <p className="font-body-sm text-body-sm text-gray-100 max-w-md hidden md:block border-l-2 border-secondary pl-3">
                High-capacity distribution and power transformers engineered for
                minimal loss and maximum durability in extreme conditions.
              </p>
            </div>
          </div>
          <div className="md:col-span-4 row-span-1 group relative overflow-hidden rounded-sm border border-gray-100 bg-white">
            <img
              alt="Control panels"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              src={images.controlPanels}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-space-4 w-full">
              <h3 className="font-h2 text-h2 text-white uppercase">
                Control Panels
              </h3>
            </div>
          </div>
          <div className="md:col-span-4 row-span-1 group relative overflow-hidden rounded-sm border border-gray-100 bg-white">
            <div className="absolute inset-0 bg-primary-container opacity-90 z-10 mix-blend-multiply" />
            <img
              alt="Ring main units"
              className="absolute inset-0 w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-105"
              src={images.rmu}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-20" />
            <div className="absolute bottom-0 left-0 p-space-4 w-full z-30">
              <h3 className="font-h2 text-h2 text-white uppercase">
                Ring Main Units
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
