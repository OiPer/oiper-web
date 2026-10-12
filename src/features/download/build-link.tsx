'use client'

import { logClick } from '@/lib/analytics'
import { formatFileSize } from '@/lib/format'
import { Download } from 'lucide-react'
import { Fragment } from 'react'
import { OSIcon } from './os-icons'
import { macDownloadProps, OS_LABELS, type Package } from './platforms'

export function Separator() {
  return (
    <span aria-hidden="true" className="bg-muted-foreground/20 h-2.5 w-px" />
  )
}

export function BuildLink({
  pkg,
  url,
  macAltUrl,
  size,
}: {
  pkg: Package
  url: string
  macAltUrl: string | null
  size: number
}) {
  return (
    <a
      href={url}
      {...macDownloadProps(pkg.id, macAltUrl)}
      className="group/build flex items-center gap-4 px-4 py-3.5"
      onClick={() =>
        logClick('download', 'download_section', { platform: pkg.id })
      }
    >
      <OSIcon os={pkg.os} className="text-muted-foreground size-4 shrink-0" />
      <span className="min-w-0 flex-1 text-sm font-medium">
        {OS_LABELS[pkg.os]} {pkg.label}
        <span className="text-muted-foreground ml-4 hidden items-center gap-3 font-normal group-hover/build:inline-flex">
          {pkg.details.map((detail, index) => (
            <Fragment key={detail}>
              {index > 0 && <Separator />}
              {detail}
            </Fragment>
          ))}
        </span>
      </span>
      <span className="text-muted-foreground text-xs tabular-nums">
        {formatFileSize(size)}
      </span>
      <Download className="text-muted-foreground group-hover/build:text-foreground size-4 shrink-0" />
    </a>
  )
}
