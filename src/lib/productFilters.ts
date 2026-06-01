import type {
  ComparisonCellValue,
  DistributionTransformerProduct,
} from '../data/distributionTransformers'

export type CheckboxFilterGroup = {
  type: 'checkbox'
  key: string
  label: string
  options: { id: string; label: string }[]
}

export type RangeFilterGroup = {
  type: 'range'
  key: string
  label: string
  min: number
  max: number
  unit: string
  step?: number
}

export type FilterGroup = CheckboxFilterGroup | RangeFilterGroup

export type FilterState = {
  checkboxes: Record<string, Record<string, boolean>>
  ranges: Record<string, number>
}

type FilterDef =
  | {
      type: 'checkbox'
      key: string
      defaultLabel: string
      displayLabel?: string
    }
  | {
      type: 'range'
      key: string
      fallbackKey?: string
      defaultLabel: string
      displayLabel?: string
      unit?: string
      step?: number
    }

export const CATEGORY_FILTER_CONFIG: Record<string, FilterDef[]> = {
  'distribution-transformers': [
    {
      type: 'checkbox',
      key: 'voltage',
      defaultLabel: 'Voltage Class',
      displayLabel: 'Voltage Class',
    },
    {
      type: 'range',
      key: 'powerRating',
      fallbackKey: 'capacity',
      defaultLabel: 'Capacity Range (kVA)',
      displayLabel: 'Capacity Range (kVA)',
      unit: 'kVA',
      step: 25,
    },
    {
      type: 'checkbox',
      key: 'coolingType',
      defaultLabel: 'Cooling Type',
      displayLabel: 'Cooling Type',
    },
  ],
}

const COOLING_LABELS: Record<string, string> = {
  ONAN: 'ONAN (Oil Natural Air Natural)',
  ONAF: 'ONAF (Oil Natural Air Forced)',
}

function cellToString(value: ComparisonCellValue | undefined): string {
  if (value === undefined) return ''
  if (typeof value === 'string') return value
  return value.tags.join(' / ')
}

function getComparisonValue(
  product: DistributionTransformerProduct,
  key: string,
  fallbackKey?: string
): string {
  const primary = cellToString(product.comparisonValues[key])
  if (primary) return primary
  if (fallbackKey) return cellToString(product.comparisonValues[fallbackKey])
  return ''
}

export function parseVoltageKv(value: string): number | null {
  if (!value.trim()) return null
  const match = value.match(/(\d+(?:\.\d+)?)\s*k?v/i) ?? value.match(/^(\d+(?:\.\d+)?)/)
  if (!match) return null
  const kv = Number.parseFloat(match[1])
  return Number.isFinite(kv) ? kv : null
}

export function voltageSeriesId(kv: number): string {
  return `${kv}kV Series`
}

export function parseCoolingTokens(value: string): string[] {
  if (!value.trim()) return []
  return [
    ...new Set(
      value
        .split(/[/,]/)
        .map((part) => part.trim().toUpperCase())
        .filter(Boolean)
    ),
  ]
}

export function coolingOptionLabel(token: string): string {
  return COOLING_LABELS[token] ?? token
}

export function parseKvaBounds(value: string): { min: number; max: number } | null {
  if (!value.trim()) return null

  const rangeMatch = value.match(
    /(\d+(?:\.\d+)?)\s*k?va?\s*[-–—]\s*(\d+(?:\.\d+)?)\s*k?va?/i
  )
  if (rangeMatch) {
    const min = Number.parseFloat(rangeMatch[1])
    const max = Number.parseFloat(rangeMatch[2])
    if (Number.isFinite(min) && Number.isFinite(max)) {
      return { min: Math.min(min, max), max: Math.max(min, max) }
    }
  }

  const numbers = [...value.matchAll(/(\d+(?:\.\d+)?)\s*k?va?/gi)].map((m) =>
    Number.parseFloat(m[1])
  )
  if (numbers.length === 0) {
    const plain = Number.parseFloat(value.replace(/[^\d.]/g, ''))
    if (Number.isFinite(plain)) return { min: plain, max: plain }
    return null
  }

  return { min: Math.min(...numbers), max: Math.max(...numbers) }
}

export function getProductVoltageIds(product: DistributionTransformerProduct): string[] {
  const raw = getComparisonValue(product, 'voltage')
  const kv = parseVoltageKv(raw)
  return kv !== null ? [voltageSeriesId(kv)] : []
}

export function getProductCoolingIds(product: DistributionTransformerProduct): string[] {
  const raw = getComparisonValue(product, 'coolingType')
  return parseCoolingTokens(raw)
}

export function getProductKvaBounds(
  product: DistributionTransformerProduct,
  key: string,
  fallbackKey?: string
): { min: number; max: number } | null {
  const raw = getComparisonValue(product, key, fallbackKey)
  return parseKvaBounds(raw)
}

function resolveGroupLabel(
  def: FilterDef,
  comparisonParameters: { key: string; label: string }[]
): string {
  if (def.displayLabel) return def.displayLabel
  const param = comparisonParameters.find((p) => p.key === def.key)
  return param?.label ?? def.defaultLabel
}

export function buildFilterGroups(
  categoryId: string,
  products: DistributionTransformerProduct[],
  comparisonParameters: { key: string; label: string }[] = []
): FilterGroup[] {
  const defs = CATEGORY_FILTER_CONFIG[categoryId]
  if (!defs?.length || products.length === 0) return []

  const groups: FilterGroup[] = []

  for (const def of defs) {
    if (def.type === 'checkbox') {
      const optionIds = new Set<string>()
      for (const product of products) {
        const ids =
          def.key === 'voltage'
            ? getProductVoltageIds(product)
            : def.key === 'coolingType'
              ? getProductCoolingIds(product)
              : []
        for (const id of ids) optionIds.add(id)
      }

      if (optionIds.size < 2) continue

      const options = [...optionIds]
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
        .map((id) => ({
          id,
          label:
            def.key === 'coolingType'
              ? coolingOptionLabel(id)
              : id,
        }))

      groups.push({
        type: 'checkbox',
        key: def.key,
        label: resolveGroupLabel(def, comparisonParameters),
        options,
      })
      continue
    }

    if (def.type === 'range') {
      let globalMin = Infinity
      let globalMax = -Infinity
      let hasData = false

      for (const product of products) {
        const bounds = getProductKvaBounds(product, def.key, def.fallbackKey)
        if (!bounds) continue
        hasData = true
        globalMin = Math.min(globalMin, bounds.min)
        globalMax = Math.max(globalMax, bounds.max)
      }

      if (!hasData || !Number.isFinite(globalMin) || !Number.isFinite(globalMax)) continue

      const min = Math.floor(globalMin)
      const max = Math.ceil(globalMax)
      if (min >= max) continue

      groups.push({
        type: 'range',
        key: def.key,
        label: resolveGroupLabel(def, comparisonParameters),
        min,
        max: Math.max(max, min + (def.step ?? 25)),
        unit: def.unit ?? 'kVA',
        step: def.step,
      })
    }
  }

  return groups
}

export function createDefaultFilterState(groups: FilterGroup[]): FilterState {
  const checkboxes: FilterState['checkboxes'] = {}
  const ranges: FilterState['ranges'] = {}

  for (const group of groups) {
    if (group.type === 'checkbox') {
      checkboxes[group.key] = Object.fromEntries(
        group.options.map((opt) => [opt.id, true])
      )
    } else {
      ranges[group.key] = group.min
    }
  }

  return { checkboxes, ranges }
}

function getRangeFallbackKey(categoryId: string, rangeKey: string): string | undefined {
  const def = CATEGORY_FILTER_CONFIG[categoryId]?.find(
    (d) => d.type === 'range' && d.key === rangeKey
  )
  return def && def.type === 'range' ? def.fallbackKey : undefined
}

export function applyFilters(
  products: DistributionTransformerProduct[],
  groups: FilterGroup[],
  state: FilterState,
  categoryId: string
): DistributionTransformerProduct[] {
  if (groups.length === 0) return products

  return products.filter((product) =>
    groups.every((group) => {
      if (group.type === 'checkbox') {
        const selected = group.options
          .filter((opt) => state.checkboxes[group.key]?.[opt.id])
          .map((opt) => opt.id)
        if (selected.length === 0) return false

        const productIds =
          group.key === 'voltage'
            ? getProductVoltageIds(product)
            : group.key === 'coolingType'
              ? getProductCoolingIds(product)
              : []

        if (productIds.length === 0) return false
        return productIds.some((id) => selected.includes(id))
      }

      const fallbackKey = getRangeFallbackKey(categoryId, group.key)
      const bounds = getProductKvaBounds(product, group.key, fallbackKey)
      if (!bounds) return false

      const minRequired = state.ranges[group.key] ?? group.min
      return bounds.max >= minRequired
    })
  )
}
