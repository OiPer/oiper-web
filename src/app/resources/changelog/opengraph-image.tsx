import { OG_SIZE, OgCard } from '@/features/seo/og-card'
import { ImageResponse } from 'next/og'

export const alt = 'OiPer Desktop changelog'
export const size = OG_SIZE
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    <OgCard
      eyebrow="Changelog"
      title="What's new in OiPer"
      description="Every OiPer Desktop release, newest first: new features, fixes, and improvements."
    />,
    size
  )
}
