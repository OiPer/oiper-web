import { OiPerLogo } from '@oiper/logo'
import { ImageResponse } from 'next/og'

export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    <OiPerLogo width={size.width} height={size.height} />,
    { ...size }
  )
}
