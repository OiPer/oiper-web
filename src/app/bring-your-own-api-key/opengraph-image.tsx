import { OG_SIZE } from '@/features/seo/app-pages'
import { ogImage } from '@/features/seo/og-card'

export const alt = 'Dictation with your own API key'
export const size = OG_SIZE
export const contentType = 'image/png'

export default function Image() {
  return ogImage('/bring-your-own-api-key', 'Your Own API Key')
}
