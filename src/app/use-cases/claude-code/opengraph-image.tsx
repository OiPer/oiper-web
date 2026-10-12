import { OG_SIZE } from '@/features/seo/app-pages'
import { ogImage } from '@/features/seo/og-card'

export const alt = 'Voice to text for Claude Code'
export const size = OG_SIZE
export const contentType = 'image/png'

export default function Image() {
  return ogImage('/use-cases/claude-code', 'Claude Code')
}
