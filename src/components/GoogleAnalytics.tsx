import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const GA_MEASUREMENT_ID = 'G-V5ZMQXCDP0'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

export function GoogleAnalytics() {
  const { pathname, search } = useLocation()

  useEffect(() => {
    window.gtag?.('config', GA_MEASUREMENT_ID, {
      page_path: pathname + search,
    })
  }, [pathname, search])

  return null
}
