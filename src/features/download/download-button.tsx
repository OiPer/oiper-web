import { DOWNLOAD_URL } from '@/features/landing-page/constants/links'
import { cn } from '@/lib/utils'
import { Download } from 'lucide-react'
import Link from 'next/link'
import { Fragment } from 'react'
import { OSIcon } from './os-icons'
import { detectPackage, OS_LABELS, type OS, type Package } from './platforms'

export function DetectOSScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `try{var p=(${detectPackage})(navigator.userAgent,navigator.maxTouchPoints);if(p)document.documentElement.dataset.download=p}catch(e){}`,
      }}
    />
  )
}

const TARGETS: {
  id: Package['id']
  os: OS
  visibleWhen: string
  others: { id: Package['id']; label: string }[]
}[] = [
  {
    id: 'windows',
    os: 'windows',
    visibleWhen: 'in-data-[download=windows]:contents',
    others: [
      { id: 'macos', label: 'macOS' },
      { id: 'linux', label: 'Linux' },
    ],
  },
  {
    id: 'macos',
    os: 'macos',
    visibleWhen: 'in-data-[download=macos]:contents',
    others: [
      { id: 'macos-intel', label: 'macOS Intel' },
      { id: 'linux', label: 'Linux' },
    ],
  },
  {
    id: 'linux',
    os: 'linux',
    visibleWhen: 'in-data-[download=linux]:contents',
    others: [
      { id: 'linux-deb', label: 'Debian / Ubuntu' },
      { id: 'linux-rpm', label: 'Fedora / RHEL' },
    ],
  },
  {
    id: 'linux-deb',
    os: 'linux',
    visibleWhen: 'in-data-[download=linux-deb]:contents',
    others: [
      { id: 'linux', label: 'AppImage' },
      { id: 'linux-rpm', label: 'Fedora / RHEL' },
    ],
  },
  {
    id: 'linux-rpm',
    os: 'linux',
    visibleWhen: 'in-data-[download=linux-rpm]:contents',
    others: [
      { id: 'linux', label: 'AppImage' },
      { id: 'linux-deb', label: 'Debian / Ubuntu' },
    ],
  },
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
      <span className="contents in-data-download:hidden">
        <Link
          href={DOWNLOAD_URL}
          aria-label={compact ? 'Download OiPer' : undefined}
          className={buttonClassName}
        >
          <Download className={iconClassName} aria-hidden="true" />
          {compact ? 'Download' : 'Download OiPer'}
        </Link>
      </span>

      {TARGETS.map(({ id, os, visibleWhen }) => {
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

export function OtherDownloads({
  className,
  linkClassName,
}: {
  className?: string
  linkClassName?: string
}) {
  const separator = (
    <span
      aria-hidden="true"
      className="h-2.5 rounded-full border-l-2 border-current/50"
    />
  )

  return (
    <p className={cn('flex flex-wrap items-center gap-x-2.5', className)}>
      <span className="contents in-data-download:hidden">
        <Link href={DOWNLOAD_URL} className={linkClassName}>
          Other platforms and versions
        </Link>
      </span>

      {TARGETS.map(({ id, visibleWhen, others }) => (
        <span key={id} className={cn('hidden', visibleWhen)}>
          {others.map((other) => (
            <Fragment key={other.id}>
              <a href={`${DOWNLOAD_URL}/${other.id}`} className={linkClassName}>
                {other.label}
              </a>
              {separator}
            </Fragment>
          ))}
          <Link href={DOWNLOAD_URL} className={linkClassName}>
            Other platforms
          </Link>
        </span>
      ))}
    </p>
  )
}
