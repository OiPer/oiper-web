import { parseDesktopState } from '@/lib/auth/desktop-state'
import { createDesktopExchangeCode } from '@/lib/auth/oiper-server-client'
import { withAuth } from '@workos-inc/authkit-nextjs'
import { redirect } from 'next/navigation'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const state = parseDesktopState(url.searchParams.get('state'))

  if (!state) {
    return redirect('/account?error=invalid-desktop-state')
  }

  const { user, accessToken } = await withAuth()

  if (!user || !accessToken) {
    const returnPathname = `/auth/desktop/complete?state=${encodeURIComponent(state)}`
    return redirect(
      `/login?returnPathname=${encodeURIComponent(returnPathname)}`
    )
  }

  try {
    const result = await createDesktopExchangeCode({
      state,
      workosAccessToken: accessToken,
      workosUser: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    })

    const deepLinkUrl = `oiper://auth/callback?code=${encodeURIComponent(result.code)}&state=${encodeURIComponent(state)}`

    return redirect(deepLinkUrl)
  } catch (error) {
    console.error('desktop bridge failed', error)
    return redirect('/account?error=desktop-bridge-failed')
  }
}
