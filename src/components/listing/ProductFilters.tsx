import type { FilterGroup, FilterState } from '../../lib/productFilters'

type ProductFiltersProps = {
  groups: FilterGroup[]
  state: FilterState
  onCheckboxChange: (groupKey: string, optionId: string, checked: boolean) => void
  onRangeChange: (groupKey: string, value: number) => void
  onClear: () => void
}

export function ProductFilters({
  groups,
  state,
  onCheckboxChange,
  onRangeChange,
  onClear,
}: ProductFiltersProps) {
  if (groups.length === 0) return null

  return (
    <aside className="w-full lg:w-1/4 shrink-0">
      <div className="bg-white border border-gray-100 rounded-lg p-space-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] sticky top-[100px]">
        <div className="flex items-center justify-between mb-space-6 pb-space-4 border-b border-gray-100">
          <h2 className="font-h3 text-h3 uppercase text-primary">Filters</h2>
          <button
            type="button"
            onClick={onClear}
            className="text-secondary font-label text-label uppercase hover:underline"
          >
            Clear All
          </button>
        </div>

        {groups.map((group, index) => {
          const isLast = index === groups.length - 1

          if (group.type === 'checkbox') {
            return (
              <div
                key={group.key}
                className={isLast ? 'mb-space-6' : 'mb-space-8'}
              >
                <h3 className="font-label text-label text-gray-700 uppercase mb-space-3">
                  {group.label}
                </h3>
                <div className="space-y-space-2">
                  {group.options.map((option) => (
                    <label
                      key={option.id}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={state.checkboxes[group.key]?.[option.id] ?? false}
                        onChange={(e) =>
                          onCheckboxChange(group.key, option.id, e.target.checked)
                        }
                        className="w-4 h-4 rounded-sm border-gray-300 text-primary focus:ring-primary focus:ring-offset-0 bg-gray-50 cursor-pointer"
                      />
                      <span className="font-body-sm text-body-sm text-on-surface group-hover:text-primary transition-colors">
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )
          }

          const value = state.ranges[group.key] ?? group.min
          const step = group.step ?? 25

          return (
            <div
              key={group.key}
              className={isLast ? 'mb-space-6' : 'mb-space-8'}
            >
              <h3 className="font-label text-label text-gray-700 uppercase mb-space-3">
                {group.label}
              </h3>
              <input
                type="range"
                min={group.min}
                max={group.max}
                step={step}
                value={value}
                onChange={(e) => onRangeChange(group.key, Number(e.target.value))}
                className="capacity-range w-full mb-space-2 accent-primary"
              />
              <div className="flex justify-between font-mono-data text-mono-data text-gray-500">
                <span>
                  {group.min} {group.unit}
                </span>
                <span>
                  {value} {group.unit}
                </span>
                <span>
                  {group.max} {group.unit}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </aside>
  )
}
