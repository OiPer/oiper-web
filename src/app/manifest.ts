import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: '/',
    name: 'OiPer',
    short_name: 'OiPer',
    description:
      'Hold a hotkey, speak, and your words appear in any app. Private by default on Windows, macOS and Linux.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    lang: 'en',
    categories: ['productivity', 'utilities'],
    background_color: '#0a0a0a',
    theme_color: '#0a0a0a',
    icons: [
      { src: '/icon/192', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icon/512', sizes: '512x512', type: 'image/png', purpose: 'any' },
      {
        src: '/maskable-icon',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/apple-icon',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'any',
      },
    ],
    screenshots: [
      {
        src: '/hero-1.png',
        sizes: '2544x1504',
        type: 'image/png',
        form_factor: 'wide',
        label: 'Your dictation activity at a glance',
      },
      {
        src: '/hero-2.png',
        sizes: '2548x1504',
        type: 'image/png',
        form_factor: 'wide',
        label: 'Set a hotkey, language and speech model for each profile',
      },
      {
        src: '/hero-3.png',
        sizes: '2548x1504',
        type: 'image/png',
        form_factor: 'wide',
        label: 'Clean up and format your words with AI',
      },
      {
        src: '/hero-4.png',
        sizes: '2548x1504',
        type: 'image/png',
        form_factor: 'wide',
        label: 'Use hosted OiPer models for faster results',
      },
      {
        src: '/hero-5.png',
        sizes: '2548x1504',
        type: 'image/png',
        form_factor: 'wide',
        label: 'Expand short spoken shortcuts into longer text',
      },
    ],
    shortcuts: [
      {
        name: 'Download OiPer',
        short_name: 'Download',
        url: '/download',
        icons: [{ src: '/icon/192', sizes: '192x192', type: 'image/png' }],
      },
      {
        name: 'Documentation',
        short_name: 'Docs',
        url: '/docs',
        icons: [{ src: '/icon/192', sizes: '192x192', type: 'image/png' }],
      },
    ],
  }
}
