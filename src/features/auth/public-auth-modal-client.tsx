'use client'

import dynamic from 'next/dynamic'

export const PublicAuthModalClientNoSSR = dynamic(
  async () => (await import('./public-auth-modal')).PublicAuthModal,
  {
    ssr: false,
    loading: () => null,
  }
)
