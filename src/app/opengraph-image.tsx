import { OG_SIZE, OgCard } from '@/features/seo/og-card'
import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export const alt = 'OiPer: private voice dictation for Windows, macOS and Linux'
export const size = OG_SIZE
export const contentType = 'image/png'

export default async function Image() {
  const screenshot = await readFile(join(process.cwd(), 'public/hero-1.png'))

  return new ImageResponse(
    <OgCard
      eyebrow="Voice to text"
      title="Type at the speed of speech."
      description="Hold a key, speak, and your words appear in any app. Private, local, fast."
      screenshot={`data:image/png;base64,${screenshot.toString('base64')}`}
    />,
    size
  )
}
