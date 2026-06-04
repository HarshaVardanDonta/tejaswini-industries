import { contactInfo } from '../constants/contactInfo'

const { lat, lng } = contactInfo.coordinates

/** Opens Google Maps turn-by-turn directions to the office */
export function getGoogleMapsNavigationUrl() {
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`
}

/** Embedded map preview (no API key required) */
export function getGoogleMapsEmbedUrl() {
  return `https://maps.google.com/maps?q=${lat},${lng}&hl=en&z=16&output=embed`
}

/**
 * Static map image fallback when embed is not used.
 * OpenStreetMap — no API key; works when Mappls token is missing or invalid.
 */
export function getOpenStreetMapStaticUrl(width = 840, height = 512, zoom = 16) {
  const params = new URLSearchParams({
    center: `${lat},${lng}`,
    zoom: String(zoom),
    size: `${width}x${height}`,
    markers: `${lat},${lng},red-pushpin`,
  })
  return `https://staticmap.openstreetmap.de/staticmap.php?${params.toString()}`
}
