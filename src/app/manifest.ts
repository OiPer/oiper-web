import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: '/',
    name: 'OiPer',
    short_name: 'OiPer',
    description:
      'Private voice dictation for Windows, macOS and Linux. Hold a hotkey, speak, and your words appear in any app.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    lang: 'en',
    categories: ['productivity', 'utilities'],
    background_color: '#0a0a0a',
    theme_color: '#0a0a0a',
    icons: [
      { src: '/icon/192', sizes: '192x192', type: 'image/png' },
      { src: '/icon/512', sizes: '512x512', type: 'image/png' },
      { src: '/apple-icon', sizes: '180x180', type: 'image/png' },
    ],
    screenshots: [
      {
        src: '/hero-1.png',
        sizes: '2544x1504',
        type: 'image/png',
        form_factor: 'wide',
        label: 'Transcription overview',
      },
      {
        src: '/hero-2.png',
        sizes: '2548x1504',
        type: 'image/png',
        form_factor: 'wide',
        label: 'Profile with hotkey and speech model',
      },
    ],
  }
}
