import { trendingArticles } from '../../data/blogs'
import { Icon } from '../Icon'

export function BlogsSidebar() {
  return (
    <aside className="lg:col-span-4 space-y-space-8">
      <div className="bg-primary text-on-primary p-space-6 border-t-4 border-secondary">
        <h3 className="font-h2 text-h2 mb-space-2 uppercase">Industrial Bulletin</h3>
        <p className="font-body-sm text-body-sm text-on-primary/80 mb-space-6">
          Subscribe to receive technical specifications, safety alerts, and industry
          insights directly to your inbox.
        </p>
        <form
          className="space-y-space-4"
          onSubmit={(e) => {
            e.preventDefault()
          }}
        >
          <div>
            <label className="block font-label text-label text-on-primary/80 mb-space-1 uppercase">
              Email Address
            </label>
            <input
              type="email"
              placeholder="engineer@company.com"
              className="w-full bg-white border border-gray-300 text-on-surface p-space-2 font-body-sm focus:ring-2 focus:ring-secondary outline-none rounded-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-secondary text-on-secondary font-label text-label uppercase py-space-3 hover:bg-secondary-container transition-colors tracking-widest"
          >
            Subscribe Now
          </button>
        </form>
        <p className="font-mono-data text-mono-data text-[10px] text-on-primary/60 mt-space-4 text-center uppercase">
          Strictly professional content. No spam.
        </p>
      </div>

      <div className="bg-white border border-gray-100 p-space-6">
        <h3 className="font-h3 text-h3 text-primary uppercase mb-space-6 pb-space-2 border-b-2 border-gray-100 flex items-center gap-space-2">
          <Icon name="trending_up" className="text-secondary" filled={false} />
          Most Read
        </h3>
        <ul className="space-y-space-4">
          {trendingArticles.map((article, index) => (
            <li
              key={article.rank}
              className={`group cursor-pointer ${
                index > 0 ? 'border-t border-gray-100 pt-space-4' : ''
              }`}
            >
              <div className="font-mono-data text-mono-data text-secondary mb-1">
                {article.rank}
              </div>
              <h4 className="font-h3 text-h3 text-gray-700 group-hover:text-primary transition-colors leading-tight">
                {article.title}
              </h4>
              <div className="font-label text-label text-gray-500 mt-space-1">
                {article.readTime}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-gray-100 border border-gray-300 p-space-6 text-center flex flex-col items-center justify-center min-h-[250px]">
        <Icon name="precision_manufacturing" className="text-primary mb-space-4" size={40} filled={false} />
        <h3 className="font-h2 text-h2 text-primary uppercase mb-space-2">
          Custom Fabrication
        </h3>
        <p className="font-body-sm text-body-sm text-gray-700 mb-space-4">
          Need engineered solutions tailored to your exact load requirements?
        </p>
        <a
          href="#"
          className="font-label text-label text-secondary underline hover:text-primary uppercase tracking-widest"
        >
          Consult Our Engineers
        </a>
      </div>
    </aside>
  )
}
