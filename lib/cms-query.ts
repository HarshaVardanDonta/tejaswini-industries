export type CmsDoc = {
  _id: string
  _type: string
  [key: string]: unknown
}

function getPath(doc: CmsDoc, path: string): unknown {
  let current: unknown = doc
  for (const part of path.split('.')) {
    if (!current || typeof current !== 'object') return undefined
    current = (current as Record<string, unknown>)[part]
  }
  return current
}

function parseLiteral(raw: string, params: Record<string, unknown>): unknown {
  const value = raw.trim()
  if (value === 'true') return true
  if (value === 'false') return false
  if (value === 'null') return null
  if (value.startsWith('$')) return params[value.slice(1)]
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1)
  }
  return value
}

function matchClause(doc: CmsDoc, clause: string, params: Record<string, unknown>): boolean {
  const trimmed = clause.trim()
  if (!trimmed) return true

  const defined = trimmed.match(/^defined\(([^)]+)\)$/)
  if (defined) {
    const value = getPath(doc, defined[1].trim())
    return value !== undefined && value !== null && value !== ''
  }

  const comparison = trimmed.match(/^([\w.]+)\s*(==|!=)\s*(.+)$/)
  if (!comparison) return true

  const actual = getPath(doc, comparison[1])
  const expected = parseLiteral(comparison[3], params)
  return comparison[2] === '!=' ? actual !== expected : actual === expected
}

function matchFilter(doc: CmsDoc, filter: string, params: Record<string, unknown>): boolean {
  return filter.split('&&').every((clause) => matchClause(doc, clause, params))
}

/**
 * Evaluates the small GROQ subset this site already uses (filters, order, [0], count).
 * Projections are ignored; callers receive full documents.
 */
export function evaluateQuery(
  query: string,
  params: Record<string, unknown>,
  docs: CmsDoc[],
): unknown {
  const trimmed = query.trim()
  if (trimmed === 'null[0]' || trimmed === 'null') return null
  const isCount = trimmed.startsWith('count(') && trimmed.endsWith(')')
  const inner = isCount ? trimmed.slice(6, -1) : trimmed
  const filterMatch = inner.match(/\*\[([^\]]*)\]/)
  if (!filterMatch) {
    throw new Error(`Unsupported content query: ${trimmed.slice(0, 120)}`)
  }

  let results = docs.filter((doc) => matchFilter(doc, filterMatch[1], params))
  const orderMatch = inner.match(/\|\s*order\(([^)]+)\)/)
  if (orderMatch) {
    const [field, direction] = orderMatch[1].trim().split(/\s+/)
    const desc = direction === 'desc'
    results = results.slice().sort((a, b) => {
      const av = String(getPath(a, field) ?? '')
      const bv = String(getPath(b, field) ?? '')
      if (av === bv) return 0
      const cmp = av < bv ? -1 : 1
      return desc ? -cmp : cmp
    })
  }

  if (isCount) return results.length
  if (/\[0\]/.test(inner)) return results[0] ?? null
  return results
}
