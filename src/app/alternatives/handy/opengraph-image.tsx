import { OG_SIZE } from '@/features/seo/app-pages'
import { ogImage } from '@/features/seo/og-card'

export const alt = 'A Handy alternative with profiles and AI formatting'
export const size = OG_SIZE
export const contentType = 'image/png'

export default function Image() {
  return ogImage('/alternatives/handy', 'vs Handy')
}
