import { getAuthEnv } from '@/lib/auth/env'

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
    `${OIPER_SERVER_BASE_URL}/v1/auth/desktop/code`,
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${input.workosAccessToken}`,
      },
      body: JSON.stringify({
        state: input.state,
        workosUser: input.workosUser,
      }),
      cache: 'no-store',
    }
  )

  const data = (await response.json().catch(() => null)) as
    | { code: string; expiresAt: string }
    | { error?: { code?: string; message?: string } }
    | null

  if (!response.ok || !data || !('code' in data)) {
    const message =
      data && 'error' in data && data.error?.message
        ? data.error.message
        : 'Failed to create desktop exchange code'

    throw new Error(message)
  }

  return {
    code: data.code,
    expiresAt: data.expiresAt,
  }
}
