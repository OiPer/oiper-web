'use client'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuth } from '@/features/auth/auth-context'
import { cn } from '@/lib/utils'
import { ChevronDown, LogOut } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import { DOWNLOAD_URL } from '../constants/links'

const SIGN_IN_URL = '/?auth-page=signin'
const SIGN_UP_URL = '/?auth-page=signup'

function getUserLabel(
  user: NonNullable<ReturnType<typeof useAuth>['currentUser']>
) {
  const fullName = [user.firstName, user.lastName]
    .filter((name): name is string => Boolean(name))
    .join(' ')

  return fullName || user.email
}

function getUserInitials(
  user: NonNullable<ReturnType<typeof useAuth>['currentUser']>
) {
  const initials = [user.firstName, user.lastName]
    .filter((name): name is string => Boolean(name))
    .map((name) => name[0]?.toUpperCase() ?? '')
    .join('')
    .slice(0, 2)

  if (initials) {
    return initials
  }

  return user.email.slice(0, 2).toUpperCase()
}

function LoadingAvatar() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 items-center">
        <div className="h-10 w-28 animate-pulse rounded-md border border-0 bg-white/7" />
      </div>
      <a
        href={DOWNLOAD_URL}
        className={cn(
          buttonVariants({ size: 'lg' }),
          'h-10 rounded-md bg-white px-5 text-sm font-medium text-[#0a0a0a] hover:bg-white/90'
        )}
      >
        Download
      </a>
    </div>
  )
}

function SignedOutActions() {
  const ref = useRef<HTMLDivElement>(null)
  const [menuWidth, setMenuWidth] = useState<string>()

  useEffect(() => {
    if (!ref.current) {
      return
    }

    setMenuWidth(`${ref.current.clientWidth / 16 + 0.1}rem`)
  }, [])

  return (
    <div className="flex items-center gap-3">
      <div ref={ref} className="flex items-center">
        <a
          href={SIGN_UP_URL}
          className={cn(
            buttonVariants({ size: 'lg' }),
            'h-10 rounded-r-none border border-white/18 border-r-white/28 bg-white/6 px-4 text-sm font-medium text-white hover:bg-white/10 focus-visible:ring-0'
          )}
        >
          Sign up
        </a>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button className="h-10 min-w-9 rounded-l-none border border-l-0 border-white/18 bg-white/6 px-0 text-white hover:bg-white/10 focus-visible:ring-0">
              <ChevronDown className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            style={{ minWidth: menuWidth ?? 'auto' }}
            className="-right-1 border-white/12 bg-[#121212] text-white shadow-2xl"
          >
            <DropdownMenuItem asChild className="cursor-pointer">
              <a href={SIGN_IN_URL}>Sign in</a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <a
        href={DOWNLOAD_URL}
        className={cn(
          buttonVariants({ size: 'lg' }),
          'h-10 rounded-md bg-white px-5 text-sm font-medium text-[#0a0a0a] hover:bg-white/90'
        )}
      >
        Download
      </a>
    </div>
  )
}

function SignedInActions() {
  const { currentUser, signOut } = useAuth()
  const [isSigningOut, setIsSigningOut] = useState(false)

  if (!currentUser) return null

  const label = getUserLabel(currentUser)
  const initials = getUserInitials(currentUser)

  async function handleSignOut() {
    if (isSigningOut) return

    setIsSigningOut(true)

    await signOut({
      onError: () => toast.error('Failed to Signout'),
      finally: () => setIsSigningOut(false),
    })
  }

  return (
    <div className="flex items-center gap-3">
      <a
        href={DOWNLOAD_URL}
        className={cn(
          buttonVariants({ size: 'lg' }),
          'h-10 rounded-md bg-white px-5 text-sm font-medium text-[#0a0a0a] hover:bg-white/90'
        )}
      >
        Download
      </a>

      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="flex size-10 items-center justify-center rounded-full border border-white/14 bg-white/7 outline-none hover:border-white/24 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/35"
            aria-label={`Open account menu for ${label}`}
          >
            <Avatar size="default" className="size-9">
              <AvatarFallback className="bg-white text-sm font-semibold text-[#0a0a0a]">
                {initials}
              </AvatarFallback>
            </Avatar>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="min-w-60 border-white/12 bg-[#121212] text-white shadow-2xl"
        >
          <DropdownMenuLabel className="px-3 py-2">
            <div className="truncate text-sm font-medium text-white">
              {label}
            </div>
            <div className="truncate text-xs font-normal text-white/55">
              {currentUser.email}
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-white/8" />
          <DropdownMenuItem
            className="cursor-pointer gap-3 px-3 py-2"
            variant="destructive"
            disabled={isSigningOut}
            onSelect={(event) => {
              event.preventDefault()
              void handleSignOut()
            }}
          >
            <LogOut className="size-4" />
            {isSigningOut ? 'Signing out...' : 'Sign out'}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export function AuthNavActions() {
  const { currentUser, isLoading } = useAuth()

  if (isLoading) {
    return <LoadingAvatar />
  }

  if (currentUser) {
    return <SignedInActions />
  }

  return <SignedOutActions />
}
