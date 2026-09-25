import { OiPerLogoText } from '@/components/logo-text'
import { buttonVariants } from '@/components/ui/button'
import { Wrapper } from '@/components/wrapper'
import { findLatest, type Release } from '@/features/changelog/github-releases'
import { AuthNavActions } from '@/features/landing-page/components/auth-nav-actions'
import { FooterSection } from '@/features/landing-page/components/footer-section'
import {
  CHANGELOG_URL,
  GITHUB_REPO,
  HOME,
} from '@/features/landing-page/constants/links'
import { formatFileSize, formatPaddedDate } from '@/lib/format'
import { cn } from '@/lib/utils'
import { ArrowUpRight, ChevronDown, Download } from 'lucide-react'
import { Fragment } from 'react'
import { DownloadButton } from './download-button'
import { OSIcon } from './os-icons'
import {
  findAsset,
  OS_LABELS,
  PACKAGES,
  type OS,
  type Package,
} from './platforms'

const VISIBLE_VERSIONS = 7
const OSES = Object.keys(OS_LABELS) as OS[]

function getBuilds(release: Release) {
  return PACKAGES.flatMap((pkg) => {
    const asset = findAsset(release.assets, pkg)
    return asset ? [{ pkg, asset }] : []
  })
}

export function DownloadPage({
  releases,
  version,
}: {
  releases: Release[]
  version?: string
}) {
  const latest = findLatest(releases)
  const selected = releases.find((release) => release.version === version)
  const ordered = selected
    ? [selected, ...releases.filter((release) => release !== selected)]
    : releases

  return (
    <main className="dark bg-background text-foreground min-h-screen overflow-hidden">
      <Wrapper>
        <nav className="flex h-20 items-center justify-between">
          <a href={HOME} className="flex items-center gap-3">
            <OiPerLogoText className="text-[2rem]" />
          </a>
          <AuthNavActions />
        </nav>
      </Wrapper>

      <Wrapper>
        <div className="mx-auto flex max-w-190 flex-col items-center pt-24 pb-16 text-center">
          <h1 className="text-[clamp(2.25rem,7vw,4rem)] font-semibold tracking-[-0.04em]">
            Download OiPer
          </h1>
          <p className="text-muted-foreground mt-3 text-[clamp(0.95rem,4vw,1.125rem)] leading-relaxed">
            Get the right build for Windows, macOS, or Linux and start speaking
          </p>
          <DownloadButton
            className={cn(
              buttonVariants({ size: 'lg' }),
              'mt-10 h-12 px-7 text-base'
            )}
            iconClassName="size-5"
          />
          {latest && (
            <p className="text-muted-foreground mt-6 flex items-center gap-3 text-sm">
              Version {latest.version.replace(/^v/, '')}
              <Separator />
              {formatPaddedDate(latest.publishedAt)}
              <Separator />
              <a
                href={`${CHANGELOG_URL}#${latest.anchor}`}
                className="text-foreground underline-offset-4 hover:underline"
              >
                What&apos;s new
              </a>
            </p>
          )}
        </div>
      </Wrapper>

      <Wrapper className="pb-40">
        {latest ? (
          <div className="divide-border mx-auto max-w-3xl divide-y">
            {ordered.slice(0, VISIBLE_VERSIONS).map((release) => (
              <VersionRow
                key={release.version}
                release={release}
                latest={release === latest}
                open={release === (selected ?? latest)}
                pinned={release === selected}
              />
            ))}

            {ordered.length > VISIBLE_VERSIONS && (
              <details className="group/older">
                <summary className="text-muted-foreground hover:text-foreground flex cursor-pointer list-none justify-center pt-10 pb-2 text-sm group-open/older:hidden [&::-webkit-details-marker]:hidden">
                  Show {ordered.length - VISIBLE_VERSIONS} older versions
                </summary>
                <div className="divide-border divide-y">
                  {ordered.slice(VISIBLE_VERSIONS).map((release) => (
                    <VersionRow
                      key={release.version}
                      release={release}
                      latest={release === latest}
                    />
                  ))}
                </div>
              </details>
            )}
          </div>
        ) : (
          <p className="text-muted-foreground mt-12">
            Couldn&apos;t load releases right now. Grab a build from{' '}
            <a
              href={`${GITHUB_REPO}/releases`}
              className="text-foreground underline underline-offset-4"
            >
              GitHub releases
            </a>
            .
          </p>
        )}
      </Wrapper>

      <FooterSection />
    </main>
  )
}

function Separator() {
  return (
    <span aria-hidden="true" className="bg-muted-foreground/20 h-2.5 w-px" />
  )
}

function BuildLink({
  pkg,
  url,
  size,
}: {
  pkg: Package
  url: string
  size: number
}) {
  return (
    <a href={url} className="group/build flex items-center gap-4 px-4 py-3.5">
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

function VersionRow({
  release,
  latest,
  open = false,
  pinned = false,
}: {
  release: Release
  latest: boolean
  open?: boolean
  pinned?: boolean
}) {
  const builds = getBuilds(release)
  const platforms = OSES.filter((os) => builds.some(({ pkg }) => pkg.os === os))

  return (
    <details
      open={open}
      className="group/version hover:bg-muted/50 open:bg-muted/50 rounded-2xl"
    >
      <summary className="flex cursor-pointer list-none items-center gap-4 px-5 py-4 [&::-webkit-details-marker]:hidden">
        <span className="w-24 font-medium">
          <span className="relative">
            {release.version}
            {pinned && (
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                role="img"
                aria-label="Pinned from link"
                className="absolute -top-1 left-full ml-0.5 size-3.5"
              >
                <title>Pinned from link</title>
                <path d="M16.432 4.079a1.25 1.25 0 0 0-2.033.391l-1.76 4.105a4.25 4.25 0 0 0-4.215 1.07L7.067 11a.75.75 0 0 0 0 1.06l2.142 2.143l-5.74 5.739a.75.75 0 1 0 1.061 1.06l5.74-5.739l2.141 2.142a.75.75 0 0 0 1.06 0l1.358-1.356a4.25 4.25 0 0 0 1.069-4.217l4.105-1.76a1.25 1.25 0 0 0 .392-2.032z" />
              </svg>
            )}
          </span>
        </span>
        <span className="text-muted-foreground flex flex-1 items-center gap-3 text-sm tabular-nums">
          {formatPaddedDate(release.publishedAt)}
          {latest && (
            <>
              <Separator />
              Latest
            </>
          )}
          {release.prerelease && (
            <>
              <Separator />
              Pre-release
            </>
          )}
        </span>
        <span className="text-muted-foreground hidden items-center gap-2.5 sm:flex">
          {platforms.map((os) => (
            <OSIcon key={os} os={os} className="size-3.5" />
          ))}
        </span>
        <ChevronDown className="text-muted-foreground size-4 group-open/version:rotate-180" />
      </summary>

      <div className="px-2 pb-3">
        {builds.length > 0 ? (
          <ul>
            {builds.map(({ pkg, asset }) => (
              <li
                key={pkg.id}
                className="hover:bg-muted before:via-border relative rounded-xl before:absolute before:inset-x-4 before:top-0 before:h-px before:bg-linear-to-r before:from-transparent before:to-transparent first:before:hidden hover:before:opacity-0 [li:hover+&]:before:opacity-0"
              >
                <BuildLink pkg={pkg} url={asset.url} size={asset.size} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground px-4 py-3 text-sm">
            No installers in this release.
          </p>
        )}
        <a
          href={release.url}
          className="text-muted-foreground hover:text-foreground mt-1 inline-flex items-center gap-1 px-4 py-2 text-sm"
        >
          Release notes
          <ArrowUpRight className="size-3.5" />
        </a>
      </div>
    </details>
  )
}
