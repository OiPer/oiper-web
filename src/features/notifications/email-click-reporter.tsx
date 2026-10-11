'use client'

import { api } from '@/lib/api/client'
import { env } from '@/lib/env'
import { importSPKI, jwtVerify } from 'jose'
import { useEffect } from 'react'

const EMAIL_TOKEN_PARAM = 'e'
const EMAIL_TRACKING_AUDIENCE = 'email-tracking'
const BUTTON_PATTERN = /^[a-z0-9_]{1,64}$/

async function isOurEmailToken(token: string): Promise<boolean> {
  try {
    const key = await importSPKI(
      `-----BEGIN PUBLIC KEY-----\n${env.EMAIL_TRACKING_PUBLIC_KEY}\n-----END PUBLIC KEY-----`,
      'EdDSA'
    )

    await jwtVerify(token, key, {
      algorithms: ['EdDSA'],
      audience: EMAIL_TRACKING_AUDIENCE,
    })

    return true
  } catch {
    return false
  }
}

async function reportEmailClick(token: string, button: string | null) {
  if (!(await isOurEmailToken(token))) return

  await api.POST('/v1/email/clicks', { body: { token, button } })
}

export function EmailClickReporter() {
  useEffect(() => {
    const url = new URL(window.location.href)
    const token = url.searchParams.get(EMAIL_TOKEN_PARAM)

    if (!token) return

    const content = url.searchParams.get('utm_content')
    const button = content && BUTTON_PATTERN.test(content) ? content : null

    url.searchParams.delete(EMAIL_TOKEN_PARAM)
    window.history.replaceState(null, '', url.pathname + url.search + url.hash)

    void reportEmailClick(token, button)
  }, [])

  return null
}
