import { OG_SIZE } from '@/features/seo/app-pages'
import { ogImage } from '@/features/seo/og-card'

export const alt = 'A Whisper desktop app for Windows, Mac and Linux'
export const size = OG_SIZE
export const contentType = 'image/png'

export default function Image() {
  return ogImage('/whisper-desktop-app', 'Whisper Desktop')
}
