import { OiPerLogo } from '@oiper/brand'
import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { OG_SIZE, ogCopy } from './app-pages'

export async function ogImage(path: string, eyebrow: string) {
  const { title, description, screenshot } = ogCopy(path)
  function png(file: string) {
    return readFile(join(process.cwd(), file)).then(
      (b) => `data:image/png;base64,${b.toString('base64')}`
    )
  }

  const [hero, windows, macos, linux] = await Promise.all([
    png(`public/hero-${screenshot}.png`),
    png('public/logo/platform-windows-white.png'),
    png('public/logo/platform-macos-white.png'),
    png('public/logo/platform-linux-white.png'),
  ])

  return new ImageResponse(
    <OgCard
      eyebrow={eyebrow}
      title={title}
      description={description}
      screenshot={hero}
      platformLogos={{ windows, macos, linux }}
    />,
    OG_SIZE
  )
}

function OgCard(props: {
  eyebrow: string
  title: string
  description: string
  screenshot: string
  platformLogos: { windows: string; macos: string; linux: string }
}) {
  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        backgroundColor: '#0a0a0a',
        backgroundImage:
          'radial-gradient(ellipse at 20% 0%, rgba(255,255,255,0.09), transparent 55%)',
        color: '#ffffff',
        padding: 72,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: 560,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <OiPerLogo width={56} height={56} />
          <div style={{ fontSize: 40, letterSpacing: -1 }}>OiPer</div>
          <div
            style={{
              marginLeft: 8,
              fontSize: 26,
              color: 'rgba(255,255,255,0.45)',
            }}
          >
            {props.eyebrow}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div
            style={{
              fontSize: 60,
              lineHeight: 1.05,
              letterSpacing: -2,
              whiteSpace: 'nowrap',
            }}
          >
            {props.title}
          </div>
          <div
            style={{
              fontSize: 28,
              lineHeight: 1.35,
              color: 'rgba(255,255,255,0.6)',
            }}
          >
            {props.description}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <img
              src={props.platformLogos.windows}
              alt="Windows"
              width={34}
              height={34}
            />
            <div style={{ fontSize: 26, color: 'rgba(255,255,255,0.6)' }}>
              Windows
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <img
              src={props.platformLogos.macos}
              alt="macOS"
              width={34}
              height={34}
            />
            <div style={{ fontSize: 26, color: 'rgba(255,255,255,0.6)' }}>
              macOS
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <img
              src={props.platformLogos.linux}
              alt="Linux"
              width={34}
              height={34}
            />
            <div style={{ fontSize: 26, color: 'rgba(255,255,255,0.6)' }}>
              Linux
            </div>
          </div>
        </div>
      </div>

      <img
        src={props.screenshot}
        alt=""
        width={680}
        height={402}
        style={{ position: 'absolute', right: -200, bottom: 90 }}
      />
    </div>
  )
}
