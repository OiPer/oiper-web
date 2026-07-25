'use client'

import { OiPerLogoText } from '@/components/logo-text'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { buttonVariants } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Wrapper } from '@/components/wrapper'
import { getUserInitials, getUserLabel } from '@/features/account/utils'
import { useAuth } from '@/features/auth/auth-context'
import { cn } from '@/lib/utils'
import { CreditCard, LogOut, Settings2 } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

function LoadingActions() {
  return (
    <div className="flex items-center gap-3">
      <div className="bg-muted/60 h-9 w-24 animate-pulse rounded-md border" />
      <div className="bg-muted/60 h-10 w-10 animate-pulse rounded-full border" />
    </div>
  )
}

function SignedOutActions() {
  return (
    <div className="flex items-center gap-2">
      <Link
        href="/?auth-page=signin"
        className={cn(
          buttonVariants({ variant: 'ghost', size: 'sm' }),
          'text-muted-foreground hover:text-foreground'
        )}
      >
        Sign in
      </Link>

      <Link
        href="/?auth-page=signup"
        className={buttonVariants({ size: 'sm' })}
      >
        Create account
      </Link>
    </div>
  )
}

function SignedInActions() {
  const { currentUser, signOut } = useAuth()

  if (!currentUser) return null

  const label = getUserLabel(currentUser)
  const initials = getUserInitials(currentUser)

  async function handleSignOut() {
    try {
      const result = await signOut()
      window.location.assign(result.logoutUrl)
    } catch {
      toast.error('Failed to sign out')
    }
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="ring-offset-background hover:border-foreground/15 hover:bg-accent border-border/70 bg-background inline-flex size-10 items-center justify-center rounded-full border p-1 text-sm transition-colors outline-none focus-visible:ring-2 sm:h-10 sm:w-auto sm:justify-start sm:gap-3 sm:pr-3"
          aria-label={`Open account menu for ${label}`}
        >
          <Avatar size="default" className="size-8">
            <AvatarImage
              alt={label}
              src={currentUser.profilePictureUrl ?? undefined}
            />
            <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div className="hidden min-w-0 text-left sm:block">
            <div className="truncate font-medium">{label}</div>
            <div className="text-muted-foreground truncate text-xs">
              {currentUser.email}
            </div>
          </div>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="min-w-60">
        <DropdownMenuLabel className="px-3 py-2">
          <div className="truncate text-sm font-medium">{label}</div>
          <div className="text-muted-foreground truncate text-xs font-normal">
            {currentUser.email}
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild className="cursor-pointer gap-3 px-3 py-2">
          <Link href="/account/settings">
            <Settings2 className="size-4" />
            Settings
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild className="cursor-pointer gap-3 px-3 py-2">
          <Link href="/account/billing">
            <CreditCard className="size-4" />
            Billing
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="cursor-pointer gap-3 px-3 py-2"
          variant="destructive"
          onSelect={(event) => {
            event.preventDefault()
            void handleSignOut()
          }}
        >
          <LogOut className="size-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function HeaderActions() {
  const { currentUser, isLoading } = useAuth()

  if (isLoading) {
    return <LoadingActions />
  }

  if (currentUser) {
    return <SignedInActions />
  }

  return <SignedOutActions />
}

export function Header() {
  return (
    <header className="bg-background/95 border-border/70 supports-[backdrop-filter]:bg-background/80 sticky top-0 z-20 border-b backdrop-blur">
      <Wrapper className="relative z-10 flex h-16 items-center gap-6">
        <div className="flex min-w-0 flex-1 items-center">
          <Link href="/" className="block w-fit">
            <OiPerLogoText className="text-[2rem]" />
          </Link>
        </div>

        <HeaderActions />
      </Wrapper>
    </header>
  )
}
