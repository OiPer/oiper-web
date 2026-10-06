import { OiPerLogoBackground } from '@oiper/logo'
import { ImageResponse } from 'next/og'

export const size = {
  width: 512,
  height: 512,
}
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    <OiPerLogoBackground width={size.width} height={size.height} />,
    { ...size }
  )
}
