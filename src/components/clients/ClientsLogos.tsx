import { clientsPage } from '../../data/clients'

export function ClientsLogos() {
  const { logos } = clientsPage

  return (
    <section className="mb-space-16">
      <div className="mb-space-8 flex items-center justify-between border-b border-gray-300 pb-space-2">
        <h2 className="font-h2 text-h2 text-on-background uppercase">{logos.title}</h2>
        <span className="font-label text-label text-gray-500 hidden sm:inline">
          {logos.subtitle}
        </span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-space-4">
        {logos.items.map((logo) => (
          <div
            key={logo.name}
            className="bg-white border border-gray-100 p-space-6 flex items-center justify-center hover:border-gray-300 transition-colors h-32"
          >
            <img
              src={logo.image}
              alt={logo.name}
              className="max-h-full max-w-full object-contain mix-blend-multiply opacity-80"
            />
          </div>
        ))}
      </div>
    </section>
  )
}
