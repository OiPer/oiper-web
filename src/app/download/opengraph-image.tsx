import { OG_SIZE, OgCard } from '@/features/seo/og-card'
import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export const alt = 'Download OiPer for Windows, macOS and Linux'
export const size = OG_SIZE
export const contentType = 'image/png'

export default async function Image() {
  const screenshot = await readFile(join(process.cwd(), 'public/hero-2.png'))

  return new ImageResponse(
    <OgCard
      eyebrow="Download"
      title="Download OiPer"
      description="Free for Windows, macOS (Apple Silicon and Intel) and Linux (AppImage, .deb, .rpm)."
      screenshot={`data:image/png;base64,${screenshot.toString('base64')}`}
    />,
    size
  )
}
