import { clientsPage } from '../../data/clients'

export function ClientsHero() {
  const { hero } = clientsPage

  return (
    <header className="bg-surface border-b border-gray-100 py-space-16 md:py-32 px-margin-mobile md:px-margin-desktop relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#1c1b1b 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
        aria-hidden
      />
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center relative z-10">
        <div className="lg:col-span-8">
          <p className="font-label text-label text-secondary mb-space-4 border-l-2 border-secondary pl-2">
            {hero.eyebrow}
          </p>
          <h1 className="font-display-xl-mobile md:font-display-xl text-display-xl-mobile md:text-display-xl text-on-background mb-space-6 tracking-tight uppercase">
            {hero.title}
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
            {hero.description}
          </p>
        </div>
        <div className="lg:col-span-4 hidden lg:block border border-gray-100 bg-white p-space-6 shadow-sm">
          {hero.credentials.map((credential, index) => (
            <div
              key={credential.label}
              className={
                index === 0 ? 'border-b border-gray-100 pb-space-4 mb-space-4' : undefined
              }
            >
              <p className="font-label text-label text-gray-500">{credential.label}</p>
              <p className="font-h3 text-h3 text-primary mt-1">{credential.value}</p>
            </div>
          ))}
        </div>
      </div>
    </header>
  )
}
