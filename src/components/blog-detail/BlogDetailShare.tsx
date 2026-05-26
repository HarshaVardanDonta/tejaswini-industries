import { Icon } from '../Icon'

export function BlogDetailShare() {
  return (
    <div className="flex items-center gap-space-4 pt-space-6 border-t border-gray-100 mt-space-8">
      <span className="font-label text-label text-gray-500 uppercase tracking-wider">
        Share Protocol:
      </span>
      <button
        type="button"
        aria-label="Share via Email"
        className="bg-gray-100 hover:bg-gray-300 text-gray-700 p-space-2 rounded transition-colors"
      >
        <Icon name="mail" size={20} filled={false} />
      </button>
      <button
        type="button"
        aria-label="Share via Link"
        className="bg-gray-100 hover:bg-gray-300 text-gray-700 p-space-2 rounded transition-colors"
      >
        <Icon name="link" size={20} filled={false} />
      </button>
      <button
        type="button"
        aria-label="Print Document"
        className="bg-gray-100 hover:bg-gray-300 text-gray-700 p-space-2 rounded transition-colors"
        onClick={() => window.print()}
      >
        <Icon name="print" size={20} filled={false} />
      </button>
    </div>
  )
}
