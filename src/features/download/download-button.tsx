import { DOWNLOAD_URL } from '@/features/landing-page/constants/links'
import { cn } from '@/lib/utils'
import { Download } from 'lucide-react'
import Link from 'next/link'
import { OSIcon } from './os-icons'
import {
  detectOS,
  isIntelMac,
  OS_LABELS,
  type OS,
  type Package,
} from './platforms'

export function DetectOSScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `try{var d=document.documentElement.dataset,os=(${detectOS})(navigator.userAgent);if(os)d.os=os;if(os==='macos')(${isIntelMac})().then(function(x){if(x)d.os='macos-intel'},function(){})}catch(e){}`,
      }}
    />
  )
}

const BUTTONS: { id: Package['id']; os: OS; visibleWhen: string }[] = [
  {
    id: 'windows',
    os: 'windows',
    visibleWhen: 'in-data-[os=windows]:contents',
  },
  { id: 'macos', os: 'macos', visibleWhen: 'in-data-[os=macos]:contents' },
  {
    id: 'macos-intel',
    os: 'macos',
    visibleWhen: 'in-data-[os=macos-intel]:contents',
  },
  { id: 'linux', os: 'linux', visibleWhen: 'in-data-[os=linux]:contents' },
]

export function DownloadButton({
  className,
  iconClassName = 'size-4',
  compact = false,
}: {
  className?: string
  iconClassName?: string
  compact?: boolean
}) {
  const buttonClassName = cn(
    'inline-flex items-center justify-center gap-2.5',
    className
  )

  return (
    <>
      <span className="contents in-data-os:hidden">
        <Link
          href={DOWNLOAD_URL}
          aria-label={compact ? 'Download OiPer' : undefined}
          className={buttonClassName}
        >
          <Download className={iconClassName} aria-hidden="true" />
          {compact ? 'Download' : 'Download OiPer'}
        </Link>
      </span>

      {BUTTONS.map(({ id, os, visibleWhen }) => {
        const label = `Download for ${OS_LABELS[os]}`
        return (
          <span key={id} className={cn('hidden', visibleWhen)}>
            <a
              href={`${DOWNLOAD_URL}/${id}`}
              aria-label={compact ? label : undefined}
              className={buttonClassName}
            >
              <OSIcon os={os} className={iconClassName} />
              {compact ? 'Download' : label}
            </a>
          </span>
        )
      })}
    </>
  )
}
