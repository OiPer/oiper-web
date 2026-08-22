'use client'

import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { Hash } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useMemo, useState } from 'react'

export const sidebarItems = [
  {
    label: 'General',
    href: '/account/settings',
    items: [
      {
        label: 'Avatar',
        href: '/account/settings#account-avatar',
      },
      {
        label: 'Name',
        href: '/account/settings#account-name',
      },
      {
        label: 'Danger Zone',
        href: '/account/settings#danger-zone',
      },
    ],
  },
  {
    label: 'Security',
    href: '/account/security',
    items: [
      {
        label: 'Change Password',
        href: '/account/security#change-password',
      },
    ],
  },
  {
    label: 'Billing',
    href: '/account/billing',
    items: [
      {
        label: 'Current Plan',
        href: '/account/billing#current-plan',
      },
    ],
  },
  {
    label: 'Usage',
    href: '/account/usage',
    items: [],
  },
] as const

function searchSidebarItems(searchTerm: string) {
  const trimmedSearchTerm = searchTerm.trim().toLowerCase()
  const includeChildren = Boolean(trimmedSearchTerm)

  const flattenedItems = sidebarItems.flatMap((item) => [
    item,
    ...(includeChildren ? (item.items ?? []) : []),
  ])

  if (!trimmedSearchTerm) return flattenedItems

  return flattenedItems.filter((item) =>
    [item.label, item.href].some((value) =>
      value.toLowerCase().includes(trimmedSearchTerm)
    )
  )
}

export function SidenavItems(props: React.ComponentProps<'nav'>) {
  const pathname = usePathname()
  const [searchTerm, setSearchTerm] = useState('')

  const results = useMemo(() => searchSidebarItems(searchTerm), [searchTerm])

  return (
    <nav
      {...props}
      className={cn(
        'text-muted-foreground sticky top-22 grid gap-1 text-sm',
        props.className
      )}
    >
      <Input
        placeholder="Search ..."
        className="mb-4 py-2"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />

      <div className="grid gap-1">
        {results.map((item) => {
          const itemPathname = item.href.split('#')[0] ?? item.href
          const isActive = pathname === itemPathname

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'hover:bg-accent flex items-center gap-2 rounded-sm p-2.5 transition-colors duration-150',
                {
                  'text-foreground font-medium': isActive,
                }
              )}
            >
              {item.href.includes('#') && (
                <Hash className="text-muted-foreground size-3.5" />
              )}
              {item.label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
