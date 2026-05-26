import { images } from '../constants/images'

export function CompanyIntro() {
  return (
    <section className="py-space-16 px-margin-mobile md:px-margin-desktop bg-surface max-w-[1280px] mx-auto w-full">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
        <div className="col-span-1 md:col-span-6 order-2 md:order-1">
          <h2 className="font-display-lg text-display-lg text-gray-700 uppercase mb-space-6 flex items-center gap-3">
            <span className="w-8 h-1 bg-primary block" />
            Engineering Authority
          </h2>
          <p className="font-body-lg text-body-lg text-gray-500 mb-space-4">
            Established with a commitment to unyielding quality, Tejaswini
            Industries stands at the forefront of electrical manufacturing. We
            specialize in the design, fabrication, and commissioning of
            heavy-duty transformers and power distribution networks.
          </p>
          <p className="font-body-lg text-body-lg text-gray-500 mb-space-6">
            Our facilities operate under stringent ISO 9001:2015 standards,
            ensuring every unit deployed is a testament to our technical rigor
            and operational excellence. We build the backbone of industrial power.
          </p>
          <div className="grid grid-cols-2 gap-space-4 border-t border-gray-100 pt-space-6">
            <div className="border-l-2 border-secondary pl-space-3">
              <div className="font-mono-data text-display-lg text-primary mb-1">
                25+
              </div>
              <div className="font-label text-label text-gray-700 uppercase">
                Years Experience
              </div>
            </div>
            <div className="border-l-2 border-primary pl-space-3">
              <div className="font-mono-data text-display-lg text-primary mb-1">
                10k+
              </div>
              <div className="font-label text-label text-gray-700 uppercase">
                Units Deployed
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-1 md:col-span-6 order-1 md:order-2 mb-space-8 md:mb-0 relative">
          <div className="absolute inset-0 bg-primary translate-x-4 translate-y-4 rounded-sm -z-10" />
          <img
            alt="Technicians assembling an electrical control panel in a manufacturing facility"
            className="w-full h-auto object-cover rounded-sm border border-gray-100 shadow-sm"
            src={images.facility}
          />
        </div>
      </div>
    </section>
  )
}
