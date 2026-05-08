import { getAuthEnv } from '@/lib/auth/env'
import { redirect } from 'next/navigation'

type WorkosUserPayload = {
  id: string
  email?: string | null
  firstName?: string | null
  lastName?: string | null
}

type DesktopCodeResponse = {
  code: string
  expiresAt: string
}

export async function createDesktopExchangeCode(input: {
  state: string
  workosAccessToken: string
  workosUser: WorkosUserPayload
}): Promise<DesktopCodeResponse> {
  const { OIPER_SERVER_BASE_URL } = getAuthEnv()

  const response = await fetch(
    new URL('/v1/auth/desktop/code', OIPER_SERVER_BASE_URL),
    {
      method: 'POST',
      cache: 'no-store',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${input.workosAccessToken}`,
      },
      body: JSON.stringify({
        state: input.state,
        workosUser: input.workosUser,
      }),
    }
  )

  if (!response.ok) {
    const errorText = await response.text()

    console.error('desktop bridge failed', {
      status: response.status,
      statusText: response.statusText,
      body: errorText,
    })

    redirect('/account?error=desktop-bridge-failed')
  }

  return await response.json()
}
