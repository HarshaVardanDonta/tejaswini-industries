import type { ReactNode } from 'react'

export function FormField({
  label,
  hint,
  children,
}: {
  label: string
  hint?: string
  children: ReactNode
}) {
  return (
    <label className="block space-y-1">
      <span className="font-label text-label text-gray-700 uppercase tracking-wide">
        {label}
      </span>
      {hint ? <span className="block font-body-sm text-body-sm text-gray-500">{hint}</span> : null}
      {children}
    </label>
  )
}

export const inputClassName =
  'w-full border border-gray-300 rounded-sm px-3 py-2 font-body-sm text-body-sm text-on-surface bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none'

export const textareaClassName = `${inputClassName} min-h-[88px] resize-y`
