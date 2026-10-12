import { OG_SIZE } from '@/features/seo/app-pages'
import { ogImage } from '@/features/seo/og-card'

export const alt = 'Free speech to text in your browser'
export const size = OG_SIZE
export const contentType = 'image/png'

export default function Image() {
  return ogImage('/tools/speech-to-text', 'Free Tool')
}
