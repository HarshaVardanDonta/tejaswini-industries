import { FormField } from './FormField'

export function ToggleInput({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}) {
  return (
    <FormField label={label}>
      <label className="inline-flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          className="size-4 accent-primary"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span className="font-body-sm text-body-sm text-gray-700">{checked ? 'Yes' : 'No'}</span>
      </label>
    </FormField>
  )
}
