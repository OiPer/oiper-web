import { buildAuthUrl } from '@/features/auth/auth-form-utils'
import { redirect } from 'next/navigation'

type AuthLoginPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export default async function AuthLoginPage({
  searchParams,
}: AuthLoginPageProps) {
  const params = await searchParams

  redirect(
    buildAuthUrl('signin', {
      callbackUrl:
        typeof params.callbackUrl === 'string' ? params.callbackUrl : null,
      email: typeof params.email === 'string' ? params.email : null,
    })
  )
}
