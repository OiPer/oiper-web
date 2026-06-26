import * as React from 'react'
globalThis.React = React

import { OiPerLogo } from '@oiper/logo'
import fs from 'fs'
import path from 'path'
import { renderToStaticMarkup } from 'react-dom/server'
import sharp from 'sharp'
import ico from 'sharp-ico'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const icoSizes = [16, 32, 48, 64]
const pngSizes = [128, 256, 512, 1024]
const contents = [
  { name: 'black', fillColor: '#000000' },
  { name: 'white', fillColor: '#FFFFFF' },
  { name: 'red', fillColor: '#FF0000' },
  { name: 'blue', fillColor: '#0000FF' },
  { name: 'cyan', fillColor: '#00FFFF' },
  { name: 'green', fillColor: '#00FF00' },
  { name: 'yellow', fillColor: '#FFFF00' },
  { name: 'purple', fillColor: '#FF00FF' },
]

void (async () => {
  for (const key in contents) {
    const { name, fillColor } = contents[key]

    const dirName = path.join(__dirname, '../../public/logo')
    if (!fs.existsSync(dirName)) {
      fs.mkdirSync(dirName, { recursive: true })
    }

    const svgHtml = renderToStaticMarkup(
      <OiPerLogo brandColor={fillColor} width="1006" height="1006" />
    )

    fs.writeFileSync(path.join(dirName, `${name}.svg`), svgHtml)

    for (const size of pngSizes) {
      const pngBuffer = await sharp(Buffer.from(svgHtml))
        .resize(size, size)
        .png()
        .toBuffer()

      fs.writeFileSync(path.join(dirName, `${name}-${size}.png`), pngBuffer)
    }
  }

  const faviconSvgHtml = renderToStaticMarkup(
    <OiPerLogo brandColor="#FFFFFF" width="1006" height="1006" />
  )

  const faviconIcoBuffer = await Promise.all(
    icoSizes.map((size) =>
      sharp(Buffer.from(faviconSvgHtml)).resize(size, size).png().toBuffer()
    )
  )

  fs.writeFileSync(
    path.join(__dirname, '../../public/favicon-main.ico'),
    ico.encode(faviconIcoBuffer)
  )

  const faviconDarkSvgHtml = renderToStaticMarkup(
    <OiPerLogo brandColor="#000000" width="1006" height="1006" />
  )

  const faviconDarkIcoBuffer = await Promise.all(
    icoSizes.map((size) =>
      sharp(Buffer.from(faviconDarkSvgHtml)).resize(size, size).png().toBuffer()
    )
  )

  fs.writeFileSync(
    path.join(__dirname, '../../public/favicon-black.ico'),
    ico.encode(faviconDarkIcoBuffer)
  )

  const faviconLightSvgHtml = renderToStaticMarkup(
    <OiPerLogo brandColor="#FFFFFF" width="1006" height="1006" />
  )

  const faviconLightIcoBuffer = await Promise.all(
    icoSizes.map((size) =>
      sharp(Buffer.from(faviconLightSvgHtml))
        .resize(size, size)
        .png()
        .toBuffer()
    )
  )

  fs.writeFileSync(
    path.join(__dirname, '../../public/favicon-white.ico'),
    ico.encode(faviconLightIcoBuffer)
  )
})()
