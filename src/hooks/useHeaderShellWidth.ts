import {
  useCallback,
  useLayoutEffect,
  useState,
  type RefObject,
} from 'react'

const DESKTOP_COMPACT_FALLBACK = 44
const MOBILE_COMPACT_FALLBACK = 120
/** Matches --header-mobile-compact-logo (2rem) */
const MOBILE_COMPACT_LOGO_PX = 32
/** Matches --header-desktop-compact-logo (2.75rem) */
const DESKTOP_COMPACT_LOGO_PX = 44

function readSafeInsets(anchor: Element | null) {
  if (!anchor) {
    return { left: 12, right: 12 }
  }
  const styles = getComputedStyle(anchor)
  const left = parseFloat(styles.getPropertyValue('--header-safe-left')) || 12
  const right = parseFloat(styles.getPropertyValue('--header-safe-right')) || 12
  return { left, right }
}

function measureExpandedWidth(safeLeft: number, safeRight: number) {
  const available = Math.max(
    0,
    Math.round(window.innerWidth - safeLeft - safeRight),
  )
  return available
}

function measureCompactWidth(
  shell: HTMLElement,
  variant: 'desktop' | 'mobile',
) {
  const row = shell.querySelector('.header-shell-row')
  const menu = shell.querySelector('.header-menu-btn')

  if (!row) {
    return variant === 'mobile' ? MOBILE_COMPACT_FALLBACK : DESKTOP_COMPACT_FALLBACK
  }

  const rowStyles = getComputedStyle(row)
  const shellStyles = getComputedStyle(shell)
  const compactBorder =
    parseFloat(shellStyles.borderLeftWidth) +
    parseFloat(shellStyles.borderRightWidth)
  const rowPadding =
    parseFloat(rowStyles.paddingLeft) + parseFloat(rowStyles.paddingRight)
  const gap =
    variant === 'mobile' ? parseFloat(rowStyles.columnGap) || 8 : 0

  if (variant === 'mobile') {
    let contentWidth = MOBILE_COMPACT_LOGO_PX + rowPadding
    if (menu) {
      contentWidth += gap + menu.getBoundingClientRect().width
    }
    return Math.ceil(contentWidth + compactBorder)
  }

  return Math.ceil(DESKTOP_COMPACT_LOGO_PX + compactBorder)
}

function measureExpandedMobileWidth(shell: HTMLElement) {
  const row = shell.querySelector('.header-shell-row')
  const brand = shell.querySelector('.header-brand')
  const menu = shell.querySelector('.header-menu-btn')

  if (!row) return null

  const rowStyles = getComputedStyle(row)
  const shellStyles = getComputedStyle(shell)
  const rowPadding =
    parseFloat(rowStyles.paddingLeft) + parseFloat(rowStyles.paddingRight)
  const gap = parseFloat(rowStyles.columnGap) || 8
  const border =
    parseFloat(shellStyles.borderLeftWidth) +
    parseFloat(shellStyles.borderRightWidth)

  let contentWidth = rowPadding + border
  if (brand) {
    contentWidth += brand.getBoundingClientRect().width
  }
  if (menu) {
    contentWidth += gap + menu.getBoundingClientRect().width
  }

  return Math.ceil(contentWidth)
}

export function useHeaderShellWidth(
  shellRef: RefObject<HTMLElement | null>,
  anchorRef: RefObject<HTMLElement | null>,
  variant: 'desktop' | 'mobile',
  isCompact: boolean,
) {
  const [widthPx, setWidthPx] = useState<number | null>(() => {
    if (typeof window === 'undefined') return null
    return measureExpandedWidth(12, 12)
  })

  const measure = useCallback(() => {
    const shell = shellRef.current
    if (!shell) return

    const { left, right } = readSafeInsets(anchorRef.current)
    const expanded = measureExpandedWidth(left, right)
    const compact = measureCompactWidth(shell, variant)

    if (isCompact) {
      setWidthPx(compact)
      return
    }

    if (variant === 'desktop') {
      setWidthPx(expanded)
      return
    }

    const contentWidth = measureExpandedMobileWidth(shell) ?? expanded
    setWidthPx(Math.min(expanded, Math.max(compact, contentWidth)))
  }, [shellRef, anchorRef, variant, isCompact])

  useLayoutEffect(() => {
    measure()
  }, [measure])

  useLayoutEffect(() => {
    const shell = shellRef.current
    if (!shell) return

    const observer = new ResizeObserver(() => {
      measure()
    })

    observer.observe(shell)
    window.addEventListener('resize', measure)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [shellRef, measure])

  return widthPx
}
