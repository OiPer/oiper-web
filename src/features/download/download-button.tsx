import { DOWNLOAD_URL } from '@/features/landing-page/constants/links'
import { cn } from '@/lib/utils'
import { Download } from 'lucide-react'
import { OSIcon } from './os-icons'
import { detectOS, OS_LABELS, type OS } from './platforms'

export function DetectOSScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `try{var os=(${detectOS})(navigator.userAgent);if(os)document.documentElement.dataset.os=os}catch(e){}`,
      }}
    />
  )
}

const VISIBLE_WHEN: Record<OS, string> = {
  windows: 'in-data-[os=windows]:contents',
  macos: 'in-data-[os=macos]:contents',
  linux: 'in-data-[os=linux]:contents',
}

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
        <a
          href={DOWNLOAD_URL}
          aria-label={compact ? 'Download OiPer' : undefined}
          className={buttonClassName}
        >
          <Download className={iconClassName} aria-hidden="true" />
          {compact ? 'Download' : 'Download OiPer'}
        </a>
      </span>

      {(Object.keys(OS_LABELS) as OS[]).map((os) => {
        const label = `Download for ${OS_LABELS[os]}`
        return (
          <span key={os} className={cn('hidden', VISIBLE_WHEN[os])}>
            <a
              href={`${DOWNLOAD_URL}/${os}`}
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
