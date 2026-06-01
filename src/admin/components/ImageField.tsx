import { useRef, useState } from 'react'

import { resolveImageUrl } from '../../sanity/image'
import type { SanityImageWithUrl } from '../types/adminDocuments'
import { uploadImageFile } from '../lib/uploadImage'
import { FormField, inputClassName } from './fields/FormField'

export function ImageField({
  label,
  value,
  onChange,
}: {
  label: string
  value?: SanityImageWithUrl | null
  onChange: (value: SanityImageWithUrl) => void
}) {
  const fileRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const preview = resolveImageUrl(value ?? undefined, value?.url || '')

  const update = (patch: Partial<SanityImageWithUrl>) => {
    onChange({ _type: 'imageWithUrl', ...value, ...patch })
  }

  const handleUpload = async (file: File) => {
    setUploading(true)
    setError(null)
    try {
      const uploaded = await uploadImageFile(file)
      onChange({ ...uploaded, alt: value?.alt || uploaded.alt })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  return (
    <FormField label={label} hint="Upload to Sanity or paste an external image URL.">
      <div className="space-y-3 border border-gray-200 rounded-sm p-3 bg-gray-50">
        {preview ? (
          <img src={preview} alt={value?.alt || ''} className="max-h-40 rounded-sm object-cover border border-gray-200" />
        ) : (
          <div className="h-24 flex items-center justify-center text-gray-500 font-body-sm text-body-sm border border-dashed border-gray-300 rounded-sm bg-white">
            No image
          </div>
        )}
        <div className="flex flex-wrap gap-2">
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) void handleUpload(file)
              e.target.value = ''
            }}
          />
          <button
            type="button"
            disabled={uploading}
            onClick={() => fileRef.current?.click()}
            className="bg-primary text-on-primary px-3 py-2 rounded-sm font-label text-label uppercase disabled:opacity-60"
          >
            {uploading ? 'Uploading…' : 'Upload image'}
          </button>
          {value?.asset?.asset?._ref ? (
            <button
              type="button"
              onClick={() => update({ asset: undefined })}
              className="border border-gray-300 px-3 py-2 rounded-sm font-label text-label uppercase text-gray-700"
            >
              Clear upload
            </button>
          ) : null}
        </div>
        <input
          className={inputClassName}
          placeholder="https://…"
          value={value?.url || ''}
          onChange={(e) => update({ url: e.target.value })}
        />
        <input
          className={inputClassName}
          placeholder="Alt text"
          value={value?.alt || ''}
          onChange={(e) => update({ alt: e.target.value })}
        />
        {error ? <p className="text-secondary font-body-sm text-body-sm">{error}</p> : null}
      </div>
    </FormField>
  )
}
