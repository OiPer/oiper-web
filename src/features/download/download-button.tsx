'use client'

import { DOWNLOAD_URL } from '@/features/landing-page/constants/links'
import { cn } from '@/lib/utils'
import { Download } from 'lucide-react'
import { useSyncExternalStore } from 'react'
import { OSIcon } from './os-icons'
import { detectOS, OS_LABELS } from './platforms'

function subscribe() {
  return function unsubscribe() {
    return undefined
  }
}

export function useOS() {
  return useSyncExternalStore(
    subscribe,
    () => detectOS(navigator.userAgent),
    () => null
  )
}

export function DownloadButton({
  className,
  iconClassName = 'size-4',
}: {
  className?: string
  iconClassName?: string
}) {
  const os = useOS()

  return (
    <a
      href={os ? `${DOWNLOAD_URL}/${os}` : DOWNLOAD_URL}
      className={cn(
        'inline-flex items-center justify-center gap-2.5',
        className
      )}
    >
      {os ? (
        <OSIcon os={os} className={iconClassName} />
      ) : (
        <Download className={iconClassName} />
      )}
      {os ? `Download for ${OS_LABELS[os]}` : 'Download OiPer'}
    </a>
  )
}
