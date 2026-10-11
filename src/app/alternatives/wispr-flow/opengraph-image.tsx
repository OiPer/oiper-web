import { OG_SIZE } from '@/features/seo/app-pages'
import { ogImage } from '@/features/seo/og-card'

export const alt = 'OiPer, a Wispr Flow alternative'
export const size = OG_SIZE
export const contentType = 'image/png'

export default function Image() {
  return ogImage('/alternatives/wispr-flow', 'Compare')
}
