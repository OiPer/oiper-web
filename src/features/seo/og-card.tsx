import { OiPerLogo } from '@oiper/logo'
import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ogCopy } from './og-copy'

export const OG_SIZE = { width: 1200, height: 630 }

export async function ogImage(path: string, eyebrow: string) {
  const { title, description, screenshot } = ogCopy(path)
  const file = await readFile(
    join(process.cwd(), `public/hero-${screenshot}.png`)
  )

  return new ImageResponse(
    <OgCard
      eyebrow={eyebrow}
      title={title}
      description={description}
      screenshot={`data:image/png;base64,${file.toString('base64')}`}
    />,
    OG_SIZE
  )
}

function OgCard(props: {
  eyebrow: string
  title: string
  description: string
  screenshot: string
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

        <div
          style={{
            display: 'flex',
            gap: 28,
            fontSize: 24,
            color: 'rgba(255,255,255,0.45)',
          }}
        >
          <div>oiper.com</div>
          <div>Windows · macOS · Linux</div>
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
