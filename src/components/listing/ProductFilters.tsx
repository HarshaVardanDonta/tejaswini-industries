import { useState } from 'react'

const voltageOptions = ['11kV Series', '22kV Series', '33kV Series'] as const
const coolingOptions = [
  'ONAN (Oil Natural Air Natural)',
  'ONAF (Oil Natural Air Forced)',
] as const

export function ProductFilters() {
  const [voltage, setVoltage] = useState<Record<string, boolean>>({
    '11kV Series': true,
    '22kV Series': true,
    '33kV Series': false,
  })
  const [cooling, setCooling] = useState<Record<string, boolean>>({
    'ONAN (Oil Natural Air Natural)': true,
    'ONAF (Oil Natural Air Forced)': false,
  })
  const [capacity, setCapacity] = useState(1000)

  const clearAll = () => {
    setVoltage({ '11kV Series': false, '22kV Series': false, '33kV Series': false })
    setCooling({
      'ONAN (Oil Natural Air Natural)': false,
      'ONAF (Oil Natural Air Forced)': false,
    })
    setCapacity(25)
  }

  return (
    <aside className="w-full lg:w-1/4 shrink-0">
      <div className="bg-white border border-gray-100 rounded-lg p-space-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] sticky top-[100px]">
        <div className="flex items-center justify-between mb-space-6 pb-space-4 border-b border-gray-100">
          <h2 className="font-h3 text-h3 uppercase text-primary">Filters</h2>
          <button
            type="button"
            onClick={clearAll}
            className="text-secondary font-label text-label uppercase hover:underline"
          >
            Clear All
          </button>
        </div>

        <div className="mb-space-8">
          <h3 className="font-label text-label text-gray-700 uppercase mb-space-3">
            Voltage Class
          </h3>
          <div className="space-y-space-2">
            {voltageOptions.map((option) => (
              <label
                key={option}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={voltage[option]}
                  onChange={(e) =>
                    setVoltage((prev) => ({ ...prev, [option]: e.target.checked }))
                  }
                  className="w-4 h-4 rounded-sm border-gray-300 text-primary focus:ring-primary focus:ring-offset-0 bg-gray-50 cursor-pointer"
                />
                <span className="font-body-sm text-body-sm text-on-surface group-hover:text-primary transition-colors">
                  {option}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-space-8">
          <h3 className="font-label text-label text-gray-700 uppercase mb-space-3">
            Capacity Range (kVA)
          </h3>
          <input
            type="range"
            min={25}
            max={2500}
            value={capacity}
            onChange={(e) => setCapacity(Number(e.target.value))}
            className="capacity-range w-full mb-space-2 accent-primary"
          />
          <div className="flex justify-between font-mono-data text-mono-data text-gray-500">
            <span>25 kVA</span>
            <span>{capacity} kVA</span>
            <span>2500 kVA</span>
          </div>
        </div>

        <div className="mb-space-6">
          <h3 className="font-label text-label text-gray-700 uppercase mb-space-3">
            Cooling Type
          </h3>
          <div className="space-y-space-2">
            {coolingOptions.map((option) => (
              <label
                key={option}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={cooling[option]}
                  onChange={(e) =>
                    setCooling((prev) => ({ ...prev, [option]: e.target.checked }))
                  }
                  className="w-4 h-4 rounded-sm border-gray-300 text-primary focus:ring-primary focus:ring-offset-0 bg-gray-50 cursor-pointer"
                />
                <span className="font-body-sm text-body-sm text-on-surface group-hover:text-primary transition-colors">
                  {option}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </aside>
  )
}
