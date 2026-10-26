import { Fragment } from 'react'
import { Link } from 'react-router-dom'

const TOKEN = /(\[[^\]]+\]\([^)\s]+\)|\*\*[^*]+\*\*)/g

/**
 * Renders plain article text with two inline marks:
 * [link text](/internal-or-https-url) and **bold**.
 */
export function RichText({ text }: { text: string }) {
  const parts = text.split(TOKEN).filter(Boolean)
  return (
    <>
      {parts.map((part, index) => {
        const link = part.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/)
        if (link) {
          const [, label, href] = link
          const classes = 'text-secondary underline underline-offset-2 hover:text-primary transition-colors'
          return href.startsWith('/') ? (
            <Link key={index} to={href} className={classes}>
              {label}
            </Link>
          ) : (
            <a key={index} href={href} className={classes} rel="noopener">
              {label}
            </a>
          )
        }
        const bold = part.match(/^\*\*([^*]+)\*\*$/)
        if (bold) return <strong key={index}>{bold[1]}</strong>
        return <Fragment key={index}>{part}</Fragment>
      })}
    </>
  )
}
