import { Link } from 'react-router-dom'
import { contactInfo } from '../../constants/contactInfo'
import { images } from '../../constants/images'
import { quoteSidebar } from '../../data/quote'
import { Icon } from '../Icon'

export function QuoteSidebar() {
  return (
    <aside className="md:col-span-4 space-y-space-6">
      <div className="bg-surface-container-lowest border border-gray-100 rounded-lg p-space-6 shadow-sm border-l-[3px] border-l-secondary">
        <h3 className="font-h2 text-h2 text-primary uppercase mb-space-4 flex items-center gap-space-2">
          <Icon name="verified_user" size={24} className="text-secondary" />
          {quoteSidebar.commitment.title}
        </h3>
        <ul className="space-y-space-4 font-body-sm text-body-sm text-gray-700">
          {quoteSidebar.commitment.items.map((item) => (
            <li key={item.title} className="flex items-start gap-space-3">
              <Icon
                name="check_circle"
                size={20}
                className="text-secondary mt-0.5 shrink-0"
              />
              <div>
                <strong className="block text-on-surface mb-1">{item.title}</strong>
                {item.description}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-surface-container-lowest border border-gray-100 rounded-lg p-space-6 shadow-sm flex flex-col items-center text-center">
        <h4 className="font-label text-label text-gray-500 uppercase tracking-widest mb-space-4 border-b border-gray-300 pb-space-2 w-full">
          Certifications
        </h4>
        <div className="flex gap-space-4 justify-center items-center h-24">
          <div className="border border-primary text-primary px-space-3 py-space-2 rounded-sm font-label text-label uppercase font-bold text-center leading-tight bg-blue-light/20">
            ISO
            <br />
            9001:2015
            <br />
            <span className="text-[8px] font-normal tracking-normal text-gray-700">
              CERTIFIED
            </span>
          </div>
          <img
            src={images.bisCertification}
            alt="BIS Certification Mark"
            className="h-16 w-auto mix-blend-multiply object-contain"
          />
        </div>
      </div>

      <div className="bg-primary text-on-primary rounded-lg p-space-6 shadow-sm">
        <h4 className="font-label text-label uppercase tracking-widest mb-space-4 opacity-80">
          Direct Line
        </h4>
        <a
          href={contactInfo.phoneHref}
          className="font-display-lg text-display-lg mb-space-1 block hover:underline"
        >
          {contactInfo.phone}
        </a>
        <a
          href={`mailto:${contactInfo.email}`}
          className="font-body-sm text-body-sm opacity-90 hover:underline"
        >
          {contactInfo.email}
        </a>
        <Link
          to="/contact"
          className="mt-space-4 font-label text-label uppercase tracking-wider text-on-primary/90 hover:text-on-primary inline-flex items-center gap-1"
        >
          Contact Technical Sales
          <Icon name="arrow_outward" size={14} />
        </Link>
      </div>
    </aside>
  )
}
