'use client'

import { logClick } from '@/lib/analytics'
import Link from 'next/link'
import type { ComponentProps } from 'react'

export function NavigationLink({
  location,
  destination,
  onClick,
  ...props
}: ComponentProps<typeof Link> & { location: string; destination: string }) {
  return (
    <Link
      {...props}
      onClick={(event) => {
        logClick('navigation', location, { destination })
        onClick?.(event)
      }}
    />
  )
}
