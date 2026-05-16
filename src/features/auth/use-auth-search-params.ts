'use client'

import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'

export function useAuthSearchParams() {
  const searchParams = useSearchParams()

  const actions = useMemo(
    () => ({
      set(values: Record<string, string | undefined | null>) {
        const url = new URL(window.location.href)

        for (const [key, value] of Object.entries(values)) {
          if (value === undefined || value === null || value === '') {
            url.searchParams.delete(key)
            continue
          }

          url.searchParams.set(key, value)
        }

        window.history.replaceState({}, '', url.toString())
      },
      remove(keys: string | string[]) {
        const url = new URL(window.location.href)
        const keysToRemove = Array.isArray(keys) ? keys : [keys]

        for (const key of keysToRemove) {
          url.searchParams.delete(key)
        }

        window.history.replaceState({}, '', url.toString())
      },
    }),
    []
  )

  return [searchParams, actions] as const
}
