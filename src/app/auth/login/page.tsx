import { redirect } from 'next/navigation'

type AuthLoginPageProps = {
  searchParams?: Record<string, string | string[] | undefined>
}

function buildQueryString(
  searchParams: AuthLoginPageProps['searchParams']
): string {
  if (!searchParams) {
    return ''
  }

  const query = new URLSearchParams()

  for (const [key, value] of Object.entries(searchParams)) {
    if (typeof value === 'undefined') {
      continue
    }

    if (Array.isArray(value)) {
      for (const item of value) {
        query.append(key, item)
      }

      continue
    }

    query.set(key, value)
  }

  return query.toString()
}

export default function AuthLoginPage({ searchParams }: AuthLoginPageProps) {
  const queryString = buildQueryString(searchParams)
  const target = queryString ? `/auth/signin?${queryString}` : '/auth/signin'
  redirect(target)
}
