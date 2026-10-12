import { OG_SIZE } from '@/features/seo/app-pages'
import { ogImage } from '@/features/seo/og-card'

export const alt = 'An offline alternative to Windows voice typing'
export const size = OG_SIZE
export const contentType = 'image/png'

export default function Image() {
  return ogImage(
    '/alternatives/windows-voice-typing',
    'vs Windows Voice Typing'
  )
}
