import { OG_SIZE } from '@/features/seo/app-pages'
import { ogImage } from '@/features/seo/og-card'

export const alt = 'Offline speech to text on your desktop'
export const size = OG_SIZE
export const contentType = 'image/png'

export default function Image() {
  return ogImage('/offline-speech-to-text', 'Offline')
}
