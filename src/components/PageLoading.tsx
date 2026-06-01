import { useEffect, useState } from 'react'
import { images } from '../constants/images'
import { Icon } from './Icon'

const LOADING_MESSAGES = [
  'LOADING SPECIFICATIONS...',
  'CALIBRATING TECHNICAL DATA...',
  'INITIALIZING PROTOCOLS...',
  'VERIFYING TOLERANCES...',
] as const

type PageLoadingProps = {
  /** Fixed status line; when omitted, cycles through industrial status messages */
  label?: string
  /** Fills content area inside ProductsShell instead of full viewport */
  embedded?: boolean
}

export function PageLoading({ label, embedded = false }: PageLoadingProps) {
  const [messageIndex, setMessageIndex] = useState(0)
  const statusText = label ?? LOADING_MESSAGES[messageIndex]

  useEffect(() => {
    if (label) return
    const id = window.setInterval(() => {
      setMessageIndex((i) => (i + 1) % LOADING_MESSAGES.length)
    }, 2500)
    return () => window.clearInterval(id)
  }, [label])

  return (
    <div
      className={`relative flex flex-col items-center justify-center overflow-hidden bg-gray-50 w-full ${
        embedded ? 'flex-1 min-h-[50vh]' : 'min-h-screen'
      }`}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div
        className="absolute inset-0 z-0 opacity-20 pointer-events-none loading-grid-bg"
        aria-hidden
      />

      <div className="relative z-10 flex flex-col items-center p-space-12 max-w-md w-full">
        <div className="mb-space-8 relative">
          <Icon
            name="settings"
            className="text-primary loading-spin-slow block"
            size={80}
          />
          <Icon
            name="trip_origin"
            className="text-secondary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            size={24}
          />
        </div>

        <h1 className="font-h1 text-h1 text-primary uppercase tracking-wider mb-space-2 text-center">
          Tejaswini Industries
        </h1>

        <p className="font-mono-data text-mono-data text-gray-700 uppercase tracking-widest mb-space-8 loading-pulse-text text-center">
          {statusText}
        </p>

        <div className="w-full h-2 bg-gray-300 border border-gray-300 mb-space-12 relative overflow-hidden">
          <div className="h-full bg-secondary loading-progress-bar absolute left-0 top-0" />
        </div>
      </div>

      <div className="absolute bottom-space-8 left-0 right-0 flex justify-center items-center z-10">
        <div className="flex items-center gap-space-4">
          <div className="flex items-center gap-space-2 px-space-4 py-space-2 border border-gray-300 bg-white shadow-sm h-10">
            <Icon name="verified" className="text-primary" size={20} />
            <div className="flex flex-col">
              <span className="font-label text-label text-primary uppercase leading-tight">
                ISO 9001:2015
              </span>
              <span className="font-mono-data text-[10px] text-gray-500 uppercase leading-none">
                Certified
              </span>
            </div>
          </div>
          <div className="flex items-center px-space-2 py-space-1 border border-gray-300 bg-white shadow-sm h-10">
            <img
              src={images.bisCertification}
              alt="BIS Certification"
              className="h-full w-auto object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
