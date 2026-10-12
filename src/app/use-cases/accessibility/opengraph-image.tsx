import { OG_SIZE } from '@/features/seo/app-pages'
import { ogImage } from '@/features/seo/og-card'

export const alt = 'Dictation software for RSI and limited typing'
export const size = OG_SIZE
export const contentType = 'image/png'

export default function Image() {
  return ogImage('/use-cases/accessibility', 'Accessibility')
}
