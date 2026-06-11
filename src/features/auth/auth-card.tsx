'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { buildWebAuthStartUrl } from '@/lib/auth-api'
import { X } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import type { PropsWithChildren } from 'react'

const PAGE_SWITCH = {
  signin: 'signup',
  signup: 'signin',
  'forgot-password': 'signin',
} as const

const PAGE_FOOTER = {
  signin: { text: "Don't have an account?", linkLabel: 'Sign up' },
  signup: { text: 'Already have an account?', linkLabel: 'Sign in' },
  'forgot-password': { text: 'Remember your password?', linkLabel: 'Sign in' },
} as const

type AuthPageName = keyof typeof PAGE_SWITCH

type AuthCardProps = PropsWithChildren<{
  page: AuthPageName
  mode: 'modal' | 'page'
  title: string
  description: string
  showOAuth?: boolean
}>

function buildHrefWithSearchParams(
  pathname: string,
  params: URLSearchParams
): string {
  const query = params.toString()

  if (!query) {
    return pathname
  }

  return `${pathname}?${query}`
}

function createQueryWithoutAuthPage(
  searchParams: URLSearchParams
): URLSearchParams {
  const next = new URLSearchParams(searchParams.toString())
  next.delete('auth-page')
  next.delete('code')
  next.delete('token')
  return next
}

function resolveSafePath(path: string | null): string {
  if (!path || !path.startsWith('/')) {
    return '/'
  }

  if (path.startsWith('//')) {
    return '/'
  }

  return path
}

export function AuthCard({
  page,
  mode,
  title,
  description,
  children,
  showOAuth = true,
}: AuthCardProps) {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  const footer = PAGE_FOOTER[page]
  const nextPage = PAGE_SWITCH[page]

  const currentSearch = new URLSearchParams(searchParams.toString())
  const modalSearch = createQueryWithoutAuthPage(searchParams)
  modalSearch.set('auth-page', nextPage)

  const pageSearch = createQueryWithoutAuthPage(currentSearch)
  const closeTargetPath = resolveSafePath(pageSearch.get('callbackUrl'))

  let switchHref: string

  if (mode === 'modal') {
    switchHref = buildHrefWithSearchParams(pathname, modalSearch)
  } else if (mode === 'page') {
    switchHref = buildHrefWithSearchParams(`/auth/${nextPage}`, pageSearch)
  } else {
    throw new Error('Invalid auth mode')
  }

  const callbackUrl = buildHrefWithSearchParams(
    pathname,
    createQueryWithoutAuthPage(currentSearch)
  )

  const googleStartUrl = buildWebAuthStartUrl({
    callbackUrl,
  })

  return (
    <Card className="relative w-full border-white/15 bg-black/45 text-white shadow-2xl shadow-black/30 backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="text-lg leading-none font-bold text-white">
          {title}
        </CardTitle>
        <CardDescription className="text-white/65">
          {description}
        </CardDescription>
      </CardHeader>

      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="absolute top-3 right-3 text-white/60 hover:bg-white/10 hover:text-white"
        onClick={() => {
          if (mode === 'modal') {
            const params = createQueryWithoutAuthPage(currentSearch)
            router.replace(buildHrefWithSearchParams(pathname, params), {
              scroll: false,
            })
            return
          }

          router.push(closeTargetPath)
        }}
      >
        <X className="size-4" />
        <span className="sr-only">Close</span>
      </Button>

      <CardContent className="space-y-5">
        {children}

        {showOAuth ? (
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/15" />
              </div>
              <div className="relative flex justify-center text-sm text-white/45">
                <span className="bg-black px-3">Or continue with</span>
              </div>
            </div>

            <a
              href={googleStartUrl}
              className="inline-flex h-9 w-full items-center justify-center rounded-md border border-white/20 bg-white/5 px-4 text-sm font-medium text-white transition hover:border-white/40 hover:bg-white/10"
            >
              Continue with Google
            </a>
          </div>
        ) : null}
      </CardContent>

      <CardFooter className="pt-0">
        <p className="w-full text-center text-sm text-white/65">
          {footer.text}{' '}
          <Link
            href={switchHref}
            className="font-medium text-white underline underline-offset-4"
            scroll={false}
          >
            {footer.linkLabel}
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
