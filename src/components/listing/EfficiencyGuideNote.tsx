import { Icon } from '../Icon'

export function EfficiencyGuideNote() {
  return (
    <section className="mt-space-8 bg-blue-light border border-primary-fixed-dim rounded-lg p-space-6 md:p-space-8 flex flex-col md:flex-row items-center gap-space-6">
      <div className="shrink-0 bg-white p-4 rounded-full shadow-sm border border-primary-fixed-dim">
        <Icon name="energy_savings_leaf" className="text-primary" size={48} />
      </div>
      <div>
        <h3 className="font-h2 text-h2 text-primary uppercase mb-space-2">
          Understanding IS 1180 Star Ratings
        </h3>
        <p className="font-body-sm text-body-sm text-gray-700 max-w-3xl">
          Our distribution transformers comply with the latest IS 1180 (Part 1)
          specifications regarding energy efficiency levels. Upgrading to a Level
          2 or Level 3 (equivalent to 4 or 5 Star) transformer significantly reduces
          core and copper losses, leading to substantial long-term operational cost
          savings.
        </p>
      </div>
      <div className="md:ml-auto shrink-0 w-full md:w-auto mt-space-4 md:mt-0">
        <button
          type="button"
          className="w-full md:w-auto bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white font-label text-label uppercase px-space-6 py-space-3 rounded transition-colors"
        >
          Read Efficiency Guide
        </button>
      </div>
    </section>
  )
}
