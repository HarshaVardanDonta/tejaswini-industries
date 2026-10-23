import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA4_ID

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

export function GoogleAnalytics() {
  const { pathname, search } = useLocation()

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return

    window.dataLayer = window.dataLayer || []
    if (!window.gtag) {
      window.gtag = (...args: unknown[]) => {
        window.dataLayer?.push(args)
      }
    }

    if (!document.querySelector(`script[data-ga4="${GA_MEASUREMENT_ID}"]`)) {
      const script = document.createElement('script')
      script.async = true
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
      script.dataset.ga4 = GA_MEASUREMENT_ID
      document.head.appendChild(script)
      window.gtag('js', new Date())
    }

    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: pathname + search,
    })
  }, [pathname, search])

  return null
}
