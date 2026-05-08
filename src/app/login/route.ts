import { getSignInUrl } from '@workos-inc/authkit-nextjs'
import { redirect } from 'next/navigation'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const returnPathname = url.searchParams.get('returnPathname') ?? '/account'

  const signInUrl = await getSignInUrl({
    returnPathname,
  })

  return redirect(signInUrl)
}
