import { useState } from 'react'
import { productDetail250Kva } from '../../data/productDetail250Kva'
import { Icon } from '../Icon'

type GalleryImage = {
  id: string
  src: string
  alt: string
}

const galleryImages: GalleryImage[] = [
  { id: 'main', ...productDetail250Kva.images.main },
  { id: 'front', ...productDetail250Kva.images.front },
  { id: 'detail', ...productDetail250Kva.images.detail },
]

export function ProductDetailGallery() {
  const [activeId, setActiveId] = useState('main')
  const activeImage =
    galleryImages.find((img) => img.id === activeId) ?? galleryImages[0]

  return (
    <div className="md:col-span-7 flex flex-col gap-space-4">
      <div className="bg-white border border-gray-100 rounded-lg overflow-hidden aspect-video relative flex items-center justify-center">
        <img
          alt={activeImage.alt}
          className="object-cover w-full h-full"
          src={activeImage.src}
        />
        <div className="absolute bottom-4 right-4 bg-primary/90 text-on-primary px-space-3 py-space-1 rounded font-label text-label uppercase border border-primary-container shadow-md backdrop-blur-sm">
          ISO 9001:2015 Certified
        </div>
      </div>
      <div className="grid grid-cols-4 gap-space-4">
        {galleryImages.map((image) => (
          <button
            key={image.id}
            type="button"
            onClick={() => setActiveId(image.id)}
            className={`bg-white rounded cursor-pointer overflow-hidden aspect-square transition-colors ${
              activeId === image.id
                ? 'border-2 border-primary'
                : 'border border-gray-100 hover:border-gray-300'
            }`}
          >
            <img
              alt={image.alt}
              className={`object-cover w-full h-full transition-opacity ${
                activeId === image.id
                  ? 'opacity-90 hover:opacity-100'
                  : 'opacity-70 hover:opacity-100'
              }`}
              src={image.src}
            />
          </button>
        ))}
        <div className="bg-white border border-gray-100 rounded overflow-hidden aspect-square hover:border-gray-300 transition-colors">
          <div className="w-full h-full bg-gray-50 flex flex-col items-center justify-center text-gray-500 hover:text-primary transition-colors">
            <Icon name="play_circle" size={32} filled={false} className="mb-1" />
            <span className="font-label text-label uppercase">View Video</span>
          </div>
        </div>
      </div>
    </div>
  )
}
