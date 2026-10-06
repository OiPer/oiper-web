import { OG_SIZE, ogImage } from '@/features/seo/og-card'

export const alt = 'OiPer Desktop changelog'
export const size = OG_SIZE
export const contentType = 'image/png'

export default function Image() {
  return ogImage('/resources/changelog', 'Changelog')
}
