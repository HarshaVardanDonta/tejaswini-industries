import { useEffect, useRef, useState } from 'react'

/** Always show full header when near the top of the page */
const TOP_EXPAND_Y = 24
/** Minimum scroll position before compact mode is allowed */
const COMPACT_MIN_Y = 120
/** Cumulative downward scroll (px) required before shrinking */
const SCROLL_DOWN_THRESHOLD = 56
/** Cumulative upward scroll (px) required before expanding */
const SCROLL_UP_THRESHOLD = 40

export function useCompactHeader(): boolean {
  const [isCompact, setIsCompact] = useState(false)
  const lastScrollY = useRef(0)
  const scrollDownAccum = useRef(0)
  const scrollUpAccum = useRef(0)

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const mobileQuery = window.matchMedia('(max-width: 47.999rem)')

    const updateFromScroll = () => {
      // On small screens, always keep the header shrinked (compact).
      if (mobileQuery.matches) {
        setIsCompact(true)
        scrollDownAccum.current = 0
        scrollUpAccum.current = 0
        lastScrollY.current = window.scrollY
        return
      }

      if (motionQuery.matches) {
        setIsCompact(false)
        scrollDownAccum.current = 0
        scrollUpAccum.current = 0
        return
      }

      const scrollY = window.scrollY
      const previousY = lastScrollY.current
      const delta = scrollY - previousY

      if (scrollY < TOP_EXPAND_Y) {
        setIsCompact(false)
        scrollDownAccum.current = 0
        scrollUpAccum.current = 0
        lastScrollY.current = scrollY
        return
      }

      if (delta > 0) {
        scrollDownAccum.current += delta
        scrollUpAccum.current = 0

        if (
          scrollY > COMPACT_MIN_Y &&
          scrollDownAccum.current >= SCROLL_DOWN_THRESHOLD
        ) {
          setIsCompact(true)
          scrollDownAccum.current = 0
        }
      } else if (delta < 0) {
        scrollUpAccum.current += -delta
        scrollDownAccum.current = 0

        if (scrollUpAccum.current >= SCROLL_UP_THRESHOLD) {
          setIsCompact(false)
          scrollUpAccum.current = 0
        }
      }

      lastScrollY.current = scrollY
    }

    const onMotionChange = () => {
      updateFromScroll()
    }

    const onMobileChange = () => {
      updateFromScroll()
    }

    lastScrollY.current = window.scrollY
    updateFromScroll()

    window.addEventListener('scroll', updateFromScroll, { passive: true })
    motionQuery.addEventListener('change', onMotionChange)
    mobileQuery.addEventListener('change', onMobileChange)

    return () => {
      window.removeEventListener('scroll', updateFromScroll)
      motionQuery.removeEventListener('change', onMotionChange)
      mobileQuery.removeEventListener('change', onMobileChange)
    }
  }, [])

  return isCompact
}
