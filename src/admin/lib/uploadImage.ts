import { sanityWriteClient } from '../../sanity/client'
import type { SanityImageWithUrl } from '../types/adminDocuments'

export async function uploadImageFile(file: File): Promise<SanityImageWithUrl> {
  if (!import.meta.env.VITE_SANITY_WRITE_TOKEN) {
    throw new Error('VITE_SANITY_WRITE_TOKEN is required for image uploads.')
  }

  const asset = await sanityWriteClient.assets.upload('image', file, {
    filename: file.name,
    contentType: file.type,
  })

  return {
    _type: 'imageWithUrl',
    asset: {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id,
      },
    },
    alt: file.name.replace(/\.[^.]+$/, ''),
  }
}
