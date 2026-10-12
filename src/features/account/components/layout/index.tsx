'use client'

import { Spinner } from '@/components/ui/spinner'
import { useAuth } from '@/features/auth/auth-context'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { Sidenav } from './layout'

function AccountLayoutLoading() {
  return (
    <div className="bg-background flex min-h-screen justify-center pt-[28vh]">
      <Spinner className="text-muted-foreground size-5" />
    </div>
  )
}

export function AccountLayoutClientWrapper({
  children,
}: React.PropsWithChildren) {
  const { currentUser, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (isLoading || currentUser) return

    const query = searchParams.toString()
    const callbackUrl = query ? `${pathname}?${query}` : pathname
    router.replace(
      `/auth/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`
    )
  }, [currentUser, isLoading, pathname, router, searchParams])

  if (isLoading || !currentUser) return <AccountLayoutLoading />

  return <Sidenav>{children}</Sidenav>
}
