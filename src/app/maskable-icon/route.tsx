import { OiPerLogo } from '@oiper/logo'
import { ImageResponse } from 'next/og'

export const dynamic = 'force-static'

export function GET() {
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
      <OiPerLogo width={280} height={280} />
    </div>,
    { width: 512, height: 512 }
  )
}
