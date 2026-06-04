import {
  useCallback,
  useLayoutEffect,
  useState,
  type RefObject,
} from 'react'

const DESKTOP_COMPACT_FALLBACK = 72
const MOBILE_COMPACT_FALLBACK = 164
const EXPANDED_MAX = 1280

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
  return Math.min(EXPANDED_MAX, available)
}

function measureCompactWidth(
  shell: HTMLElement,
  variant: 'desktop' | 'mobile',
) {
  const row = shell.querySelector('.header-shell-row')
  const compactLogo = shell.querySelector('.header-logo-layer--compact a')
  const menu = shell.querySelector('.header-menu-btn')

  if (!row || !compactLogo) {
    return variant === 'mobile' ? MOBILE_COMPACT_FALLBACK : DESKTOP_COMPACT_FALLBACK
  }

  const rowStyles = getComputedStyle(row)
  const shellStyles = getComputedStyle(shell)
  const compactBorder =
    parseFloat(shellStyles.borderLeftWidth) +
    parseFloat(shellStyles.borderRightWidth)
  const gap =
    variant === 'mobile' ? parseFloat(rowStyles.columnGap) || 6 : 0

  let contentWidth = compactLogo.getBoundingClientRect().width

  if (variant === 'mobile' && menu) {
    contentWidth += gap + menu.getBoundingClientRect().width
  }

  return Math.ceil(contentWidth + compactBorder)
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

    const row = shell.querySelector('.header-shell-row')
    const shellStyles = getComputedStyle(shell)
    const contentWidth = row
      ? Math.ceil(row.scrollWidth) +
        parseFloat(shellStyles.borderLeftWidth) +
        parseFloat(shellStyles.borderRightWidth)
      : expanded

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
