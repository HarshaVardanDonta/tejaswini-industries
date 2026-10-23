import { resolveImageUrl } from '../../cms/image'
import type { ContentImage } from '../types/adminDocuments'
import { FormField, inputClassName } from './fields/FormField'

export function ImageField({
  label,
  value,
  onChange,
}: {
  label: string
  value?: ContentImage | null
  onChange: (value: ContentImage) => void
}) {
  const preview = resolveImageUrl(value ?? undefined, value?.url || '')

  const update = (patch: Partial<ContentImage>) => {
    onChange({ _type: 'imageWithUrl', url: value?.url, alt: value?.alt, ...patch })
  }

  return (
    <FormField
      label={label}
      hint="Paste an image URL. File upload is not available on the Firebase Spark plan because Cloud Storage needs Blaze billing. Keep photos in the repo or on an existing URL."
    >
      <div className="space-y-3 border border-gray-200 rounded-sm p-3 bg-gray-50">
        {preview ? (
          <img
            src={preview}
            alt={value?.alt || ''}
            width={320}
            height={160}
            className="max-h-40 rounded-sm object-cover border border-gray-200"
          />
        ) : (
          <div className="h-24 flex items-center justify-center text-gray-500 font-body-sm text-body-sm border border-dashed border-gray-300 rounded-sm bg-white">
            No image
          </div>
        )}
        <input
          className={inputClassName}
          placeholder="https://… or /images/…"
          value={value?.url || ''}
          onChange={(e) => update({ url: e.target.value })}
        />
        <input
          className={inputClassName}
          placeholder="Alt text"
          value={value?.alt || ''}
          onChange={(e) => update({ alt: e.target.value })}
        />
      </div>
    </FormField>
  )
}
