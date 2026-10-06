'use client'

import { env } from '@/lib/env'
import { useEffect } from 'react'

export function ServiceWorker() {
  useEffect(() => {
    if (env.NODE_ENV !== 'production') return
    if (!('serviceWorker' in navigator)) return

    void navigator.serviceWorker.register('/sw.js', {
      scope: '/',
      updateViaCache: 'none',
    })
  }, [])

  return null
}
