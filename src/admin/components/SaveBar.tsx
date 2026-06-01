export function SaveBar({
  dirty,
  saving,
  message,
  onSave,
  onDiscard,
}: {
  dirty: boolean
  saving: boolean
  message: { type: 'success' | 'error'; text: string } | null
  onSave: () => void
  onDiscard: () => void
}) {
  return (
    <div className="sticky bottom-0 z-20 border-t border-gray-200 bg-white/95 backdrop-blur px-6 py-4 flex flex-wrap items-center justify-between gap-4">
      <div className="min-h-[1.25rem]">
        {message ? (
          <p
            className={`font-body-sm text-body-sm ${
              message.type === 'success' ? 'text-primary' : 'text-secondary'
            }`}
          >
            {message.text}
          </p>
        ) : dirty ? (
          <p className="font-body-sm text-body-sm text-gray-500">You have unsaved changes.</p>
        ) : (
          <p className="font-body-sm text-body-sm text-gray-500">All changes saved.</p>
        )}
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          disabled={!dirty || saving}
          onClick={onDiscard}
          className="border border-gray-300 px-4 py-2 rounded-sm font-label text-label uppercase text-gray-700 disabled:opacity-50"
        >
          Discard
        </button>
        <button
          type="button"
          disabled={!dirty || saving}
          onClick={onSave}
          className="bg-primary text-on-primary px-4 py-2 rounded-sm font-label text-label uppercase disabled:opacity-50"
        >
          {saving ? 'Saving…' : 'Save changes'}
        </button>
      </div>
    </div>
  )
}
