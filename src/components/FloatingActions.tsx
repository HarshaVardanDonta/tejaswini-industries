import { Icon } from './Icon'

export function FloatingActions() {
  return (
    <aside className="fixed right-4 bottom-24 flex flex-col gap-4 z-50 md:hidden">
      <a
        href="#"
        aria-label="Request Quote"
        className="bg-secondary text-on-secondary p-4 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform border border-red-900/50"
      >
        <Icon name="request_quote" />
      </a>
      <a
        href="#"
        aria-label="WhatsApp"
        className="bg-primary text-on-primary p-4 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform border border-blue-900/50"
      >
        <Icon name="chat" />
      </a>
    </aside>
  )
}
