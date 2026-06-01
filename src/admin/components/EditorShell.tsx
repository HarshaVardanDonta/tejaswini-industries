import type { ReactNode } from 'react'

import { SaveBar } from './SaveBar'

export function EditorShell({
  title,
  description,
  loading,
  error,
  dirty,
  saving,
  message,
  onSave,
  onDiscard,
  children,
}: {
  title: string
  description?: string
  loading?: boolean
  error?: string | null
  dirty: boolean
  saving: boolean
  message: { type: 'success' | 'error'; text: string } | null
  onSave: () => void
  onDiscard: () => void
  children: ReactNode
}) {
  if (loading) {
    return (
      <div className="p-8 font-body-sm text-body-sm text-gray-500">Loading content…</div>
    )
  }

  if (error) {
    return (
      <div className="p-8">
        <p className="text-secondary font-body-sm text-body-sm">{error}</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-full">
      <div className="px-6 py-6 border-b border-gray-200 bg-white">
        <h1 className="font-h1 text-h1 text-primary uppercase">{title}</h1>
        {description ? (
          <p className="font-body-sm text-body-sm text-gray-500 mt-1">{description}</p>
        ) : null}
      </div>
      <div className="flex-1 p-6 space-y-4 overflow-y-auto">{children}</div>
      <SaveBar
        dirty={dirty}
        saving={saving}
        message={message}
        onSave={onSave}
        onDiscard={onDiscard}
      />
    </div>
  )
}
