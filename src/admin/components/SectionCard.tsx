import { useState, type ReactNode } from 'react'

export function SectionCard({
  title,
  defaultOpen = true,
  children,
}: {
  title: string
  defaultOpen?: boolean
  children: ReactNode
}) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <section className="border border-gray-200 rounded-sm bg-white overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200 text-left"
      >
        <span className="font-h3 text-h3 text-primary uppercase">{title}</span>
        <span className="font-label text-label text-gray-500">{open ? '−' : '+'}</span>
      </button>
      {open ? <div className="p-4 space-y-4">{children}</div> : null}
    </section>
  )
}
