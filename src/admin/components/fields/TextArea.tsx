import { FormField, textareaClassName } from './FormField'

export function TextArea({
  label,
  hint,
  value,
  onChange,
  rows = 4,
}: {
  label: string
  hint?: string
  value: string
  onChange: (value: string) => void
  rows?: number
}) {
  return (
    <FormField label={label} hint={hint}>
      <textarea
        className={textareaClassName}
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </FormField>
  )
}
