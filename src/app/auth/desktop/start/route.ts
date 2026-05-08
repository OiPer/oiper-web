import { desktopStateSchema } from '@/lib/auth/schema'
import { withAuth } from '@workos-inc/authkit-nextjs'
import { redirect } from 'next/navigation'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const state = desktopStateSchema.safeParse(url.searchParams.get('state')).data

  if (!state) return redirect('/account?error=invalid-desktop-state')

  const completionPath = `/auth/desktop/complete?state=${encodeURIComponent(state)}`

  const { user } = await withAuth()

  if (!user) {
    return redirect(
      `/login?returnPathname=${encodeURIComponent(completionPath)}`
    )
  }

  return redirect(completionPath)
}
