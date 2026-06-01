import { useServicesPageData } from '../../context/PageDataContext'
import { Icon } from '../Icon'

export function ServicesProcess() {
  const servicesPage = useServicesPageData()
  return (
    <section className="py-space-16 px-margin-mobile md:px-margin-desktop w-full max-w-[1280px] mx-auto bg-gray-50 border-y border-gray-300">
      <div className="text-center mb-space-12">
        <h2 className="font-display-lg text-display-lg text-primary uppercase">
          Process & Workflow
        </h2>
        <p className="font-body-lg text-body-lg text-gray-700 mt-2">
          A structured, methodological approach to industrial project execution.
        </p>
      </div>
      <div className="relative">
        <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-gray-300 -translate-y-1/2 z-0" />
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative z-10">
          {servicesPage.processSteps.map((step) => (
            <div
              key={step.step}
              className={`bg-white border border-gray-100 rounded-lg p-6 text-center shadow-sm relative ${
                step.highlight ? 'border-b-4 border-b-secondary' : ''
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full text-white font-mono-data text-mono-data flex items-center justify-center mx-auto mb-4 absolute -top-4 left-1/2 -translate-x-1/2 border-4 border-gray-50 ${
                  step.highlight ? 'bg-secondary' : 'bg-primary'
                }`}
              >
                {step.step}
              </div>
              <Icon
                name={step.icon}
                size={32}
                className={`mb-2 mt-2 mx-auto ${step.highlight ? 'text-secondary' : 'text-primary'}`}
                filled={false}
              />
              <h4 className="font-h3 text-h3 text-primary uppercase mb-2">
                {step.title}
              </h4>
              <p className="font-body-sm text-body-sm text-gray-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
