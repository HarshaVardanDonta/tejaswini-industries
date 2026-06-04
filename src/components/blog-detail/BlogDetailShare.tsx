import { useState } from 'react'
import { Icon } from '../Icon'

export function BlogDetailShare() {
  const [copied, setCopied] = useState(false)

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  function shareByEmail() {
    const subject = encodeURIComponent(document.title)
    const body = encodeURIComponent(window.location.href)
    window.location.href = `mailto:?subject=${subject}&body=${body}`
  }

  return (
    <div className="flex items-center gap-space-4 pt-space-6 border-t border-gray-100 mt-space-8">
      <span className="font-label text-label text-gray-500 uppercase tracking-wider">
        Share Protocol:
      </span>
      <button
        type="button"
        aria-label="Share via Email"
        className="bg-gray-100 hover:bg-gray-300 text-gray-700 p-space-2 rounded transition-colors"
        onClick={shareByEmail}
      >
        <Icon name="mail" size={20} filled={false} />
      </button>
      <button
        type="button"
        aria-label={copied ? 'Link copied' : 'Copy link'}
        className="bg-gray-100 hover:bg-gray-300 text-gray-700 p-space-2 rounded transition-colors"
        onClick={copyLink}
      >
        <Icon name="link" size={20} filled={false} />
      </button>
      {copied ? (
        <span className="font-label text-label text-secondary uppercase tracking-wider">
          Link copied
        </span>
      ) : null}
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
