import { OG_SIZE, ogImage } from '@/features/seo/og-card'

export const alt = 'Download OiPer for Windows, macOS and Linux'
export const size = OG_SIZE
export const contentType = 'image/png'

export default function Image() {
  return ogImage('/download', 'Download')
}
