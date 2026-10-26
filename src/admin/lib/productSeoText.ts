import type {
  ProductFaq,
  ProductSection,
  ProductSpecRow,
} from '../../data/productCategories'

/**
 * Plain-text formats used by the admin editor for the product SEO fields.
 *
 * Sections:  "## Heading", then paragraphs separated by blank lines, "- " lines are bullets.
 *            A line "[table]" shows the specification table here, "[options]" shows the
 *            winding/core/tap changer options. Figures and ids are kept from the saved copy.
 * FAQs:      "Q: question" then "A: answer", blocks separated by a blank line.
 * Specs:     "Label | Value", one per line.
 */

export function slugifyId(value: string): string {
  return (
    value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 80) || 'section'
  )
}

export function sectionsToText(sections: ProductSection[] = []): string {
  return sections
    .map((section) => {
      const lines = [`## ${section.title}`, '']
      for (const paragraph of section.paragraphs) lines.push(paragraph, '')
      if (section.bullets?.length) {
        for (const bullet of section.bullets) lines.push(`- ${bullet}`)
        lines.push('')
      }
      if (section.table) lines.push('[table]', '')
      if (section.options) lines.push('[options]', '')
      for (const paragraph of section.closing ?? []) lines.push(paragraph, '')
      return lines.join('\n').trimEnd()
    })
    .join('\n\n')
}

export function textToSections(text: string, previous: ProductSection[] = []): ProductSection[] {
  const sections: ProductSection[] = []
  let current: ProductSection | null = null
  let sawBlock = false
  let buffer: string[] = []

  const flush = () => {
    if (!current || !buffer.length) {
      buffer = []
      return
    }
    const block = buffer.join(' ').replace(/\s+/g, ' ').trim()
    buffer = []
    if (!block) return
    if (block === '[table]') current.table = true
    else if (block === '[options]') current.options = true
    else if (sawBlock) (current.closing ??= []).push(block)
    else current.paragraphs.push(block)
  }

  for (const rawLine of text.split('\n')) {
    const line = rawLine.trimEnd()
    const heading = line.match(/^##\s+(.+)$/)
    if (heading) {
      flush()
      const title = heading[1].trim()
      const old = previous.find((item) => item.title === title)
      current = { id: old?.id || slugifyId(title), title, paragraphs: [], figure: old?.figure, extraTables: old?.extraTables, extraTablesNote: old?.extraTablesNote }
      sawBlock = false
      sections.push(current)
      continue
    }
    if (!current) continue
    if (!line.trim()) {
      flush()
      continue
    }
    const bullet = line.match(/^-\s+(.+)$/)
    if (bullet) {
      flush()
      ;(current.bullets ??= []).push(bullet[1].trim())
      sawBlock = true
      continue
    }
    if (line.trim() === '[table]' || line.trim() === '[options]') {
      flush()
      buffer.push(line.trim())
      flush()
      sawBlock = true
      continue
    }
    buffer.push(line.trim())
  }
  flush()
  return sections
}

export function faqsToText(faqs: ProductFaq[] = []): string {
  return faqs.map((faq) => `Q: ${faq.question}\nA: ${faq.answer}`).join('\n\n')
}

export function textToFaqs(text: string): ProductFaq[] {
  return text
    .split(/\n\s*\n/)
    .map((block) => {
      const question = block.match(/^Q:\s*(.+)$/m)?.[1]?.trim()
      const answer = block.match(/^A:\s*([\s\S]+)$/m)?.[1]?.replace(/\s*\n\s*/g, ' ').trim()
      return question && answer ? { question, answer } : null
    })
    .filter((item): item is ProductFaq => item !== null)
}

export function specsToText(rows: ProductSpecRow[] = []): string {
  return rows.map((row) => `${row.label} | ${row.value}`).join('\n')
}

export function textToSpecs(text: string): ProductSpecRow[] {
  return text
    .split('\n')
    .map((line) => {
      const index = line.indexOf('|')
      if (index < 1) return null
      const label = line.slice(0, index).trim()
      const value = line.slice(index + 1).trim()
      return label && value ? { label, value } : null
    })
    .filter((item): item is ProductSpecRow => item !== null)
}

export function listToText(items: string[] = []): string {
  return items.join('\n')
}

export function textToList(text: string): string[] {
  return text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
}
