import { OiPerLogoBackground } from '@oiper/logo'
import { ImageResponse } from 'next/og'

const sizes = [192, 512]

export function generateImageMetadata() {
  return sizes.map((size) => ({
    id: String(size),
    size: { width: size, height: size },
    contentType: 'image/png',
  }))
}

export default async function Icon({ id }: { id: Promise<string> }) {
  const size = Number(await id)

  return new ImageResponse(<OiPerLogoBackground width={size} height={size} />, {
    width: size,
    height: size,
  })
}
