import { TextInput } from './fields/TextInput'

export function SpecListEditor({
  label,
  specs,
  onChange,
}: {
  label: string
  specs: { label: string; value: string }[]
  onChange: (specs: { label: string; value: string }[]) => void
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="font-label text-label text-gray-700 uppercase">{label}</span>
        <button
          type="button"
          onClick={() => onChange([...specs, { label: '', value: '' }])}
          className="font-label text-label text-secondary uppercase"
        >
          + Add
        </button>
      </div>
      {specs.map((spec, index) => (
        <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-3 border border-gray-100 p-3 rounded-sm">
          <TextInput
            label="Label"
            value={spec.label}
            onChange={(label) => {
              const next = [...specs]
              next[index] = { ...next[index], label }
              onChange(next)
            }}
          />
          <TextInput
            label="Value"
            value={spec.value}
            onChange={(value) => {
              const next = [...specs]
              next[index] = { ...next[index], value }
              onChange(next)
            }}
          />
          <button
            type="button"
            className="md:col-span-2 font-label text-label text-secondary uppercase text-left"
            onClick={() => onChange(specs.filter((_, i) => i !== index))}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  )
}
