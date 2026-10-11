'use client'

import { api } from '@/lib/api/client'
import { env } from '@/lib/env'
import { importSPKI, jwtVerify, type JWSHeaderParameters } from 'jose'
import { useEffect } from 'react'

const EMAIL_TOKEN_PARAM = 'e'
const EMAIL_TRACKING_AUDIENCE = 'email-tracking'
const LINK_PATTERN = /^[a-z0-9_]{1,64}$/

async function emailTrackingPublicKey(header: JWSHeaderParameters) {
  const key = header.kid
    ? env.EMAIL_TRACKING_PUBLIC_KEYS.get(header.kid)
    : undefined

  if (!key) throw new Error(`Unknown email tracking key id ${header.kid}`)

  return await importSPKI(
    `-----BEGIN PUBLIC KEY-----\n${key}\n-----END PUBLIC KEY-----`,
    'EdDSA'
  )
}

async function isOurEmailToken(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, emailTrackingPublicKey, {
      algorithms: ['EdDSA'],
      audience: EMAIL_TRACKING_AUDIENCE,
    })

    return true
  } catch {
    return false
  }
}

async function reportEmailClick(token: string, link: string | null) {
  if (!(await isOurEmailToken(token))) return

  await api.POST('/v1/email/clicks', { body: { token, link } })
}

export function EmailClickReporter() {
  useEffect(() => {
    const url = new URL(window.location.href)
    const token = url.searchParams.get(EMAIL_TOKEN_PARAM)

    if (!token) return

    const content = url.searchParams.get('utm_content')
    const link = content && LINK_PATTERN.test(content) ? content : null

    url.searchParams.delete(EMAIL_TOKEN_PARAM)
    window.history.replaceState(null, '', url.pathname + url.search + url.hash)

    void reportEmailClick(token, link)
  }, [])

  return null
}
