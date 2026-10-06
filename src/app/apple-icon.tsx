import { OiPerLogo } from '@oiper/logo'
import { ImageResponse } from 'next/og'

export const size = {
  width: 180,
  height: 180,
}
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: '#0a0a0a',
      }}
    >
      <OiPerLogo width={112} height={112} />
    </div>,
    { ...size }
  )
}
