import { OiPerLogoText } from '@/components/logo-text'
import { buttonVariants } from '@/components/ui/button'
import { Wrapper } from '@/components/wrapper'
import type { Release } from '@/features/changelog/github-releases'
import { AuthNavActions } from '@/features/landing-page/components/auth-nav-actions'
import { FooterSection } from '@/features/landing-page/components/footer-section'
import {
  CHANGELOG_URL,
  GITHUB_REPO,
  HOME,
} from '@/features/landing-page/constants/links'
import { formatDate, formatFileSize } from '@/lib/format'
import { cn } from '@/lib/utils'
import { ArrowUpRight, ChevronDown, Download } from 'lucide-react'
import { DownloadButton } from './download-button'
import { OSIcon } from './os-icons'
import {
  findAsset,
  OS_LABELS,
  OS_REQUIREMENTS,
  PACKAGES,
  type OS,
  type Package,
} from './platforms'
import { ScrollIntoView } from './scroll-into-view'

const VISIBLE_PREVIOUS_VERSIONS = 6
const ALL_DOWNLOADS_ID = 'all-downloads'
const OSES = Object.keys(OS_LABELS) as OS[]

function getBuilds(release: Release) {
  return PACKAGES.flatMap((pkg) => {
    const asset = findAsset(release.assets, pkg)
    return asset ? [{ pkg, asset }] : []
  })
}

export function DownloadPage({
  releases,
  selectedVersion,
}: {
  releases: Release[]
  selectedVersion?: string
}) {
  const [latest, ...previous] = releases
  const selected = releases.find(
    (release) => release.version === selectedVersion
  )
  const selectedIndex = selected ? previous.indexOf(selected) : -1
  let scrollTarget = null
  if (selected) {
    scrollTarget = selected === latest ? ALL_DOWNLOADS_ID : selected.anchor
  }

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
        <div className="mx-auto flex max-w-190 flex-col items-center pt-24 pb-32 text-center">
          <h1 className="text-[clamp(2.25rem,7vw,4rem)] font-semibold tracking-[-0.04em]">
            Download OiPer
          </h1>
          <p className="text-muted-foreground mt-6 text-[clamp(0.95rem,4vw,1.125rem)] leading-relaxed">
            Free for Windows, macOS and Linux. Runs fully offline once
            installed.
          </p>
          <DownloadButton
            className={cn(
              buttonVariants({ size: 'lg' }),
              'mt-10 h-12 px-7 text-base'
            )}
            iconClassName="size-5"
          />
          {latest && (
            <p className="text-muted-foreground mt-6 text-sm">
              Version {latest.version.replace(/^v/, '')} ·{' '}
              {formatDate(latest.publishedAt)} ·{' '}
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

      <Wrapper className="pb-32">
        <div
          id={ALL_DOWNLOADS_ID}
          className="border-border scroll-mt-8 border-t pt-16"
        >
          <h2 className="text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
            All downloads
          </h2>
          <p className="text-muted-foreground mt-3">
            Pick the build that matches your system.
          </p>
        </div>

        {latest ? (
          <div className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-3">
            {OSES.map((os) => (
              <PlatformColumn key={os} os={os} release={latest} />
            ))}
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

      {previous.length > 0 && (
        <Wrapper className="pb-40">
          <div className="border-border border-t pt-16 text-center">
            <h2 className="text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
              Previous versions
            </h2>
            <p className="text-muted-foreground mt-3">
              Every release stays available if you need an older build.
            </p>
          </div>

          <div className="divide-border mx-auto mt-12 max-w-3xl divide-y">
            {previous.slice(0, VISIBLE_PREVIOUS_VERSIONS).map((release) => (
              <VersionRow
                key={release.version}
                release={release}
                open={release === selected}
              />
            ))}

            {previous.length > VISIBLE_PREVIOUS_VERSIONS && (
              <details
                className="group/older divide-border divide-y"
                open={selectedIndex >= VISIBLE_PREVIOUS_VERSIONS}
              >
                <summary className="text-muted-foreground hover:text-foreground flex cursor-pointer list-none justify-center py-4 text-sm group-open/older:hidden [&::-webkit-details-marker]:hidden">
                  Show {previous.length - VISIBLE_PREVIOUS_VERSIONS} older
                  versions
                </summary>
                {previous.slice(VISIBLE_PREVIOUS_VERSIONS).map((release) => (
                  <VersionRow
                    key={release.version}
                    release={release}
                    open={release === selected}
                  />
                ))}
              </details>
            )}
          </div>
        </Wrapper>
      )}

      {scrollTarget && <ScrollIntoView id={scrollTarget} />}
      <FooterSection />
    </main>
  )
}

function PlatformColumn({ os, release }: { os: OS; release: Release }) {
  const builds = getBuilds(release).filter(({ pkg }) => pkg.os === os)

  return (
    <div>
      <div className="flex items-center gap-4 px-4 pb-6">
        <OSIcon os={os} className="size-7 shrink-0" />
        <div>
          <h3 className="text-lg font-medium">{OS_LABELS[os]}</h3>
          <p className="text-muted-foreground text-sm">{OS_REQUIREMENTS[os]}</p>
        </div>
      </div>

      <ul className="divide-border divide-y">
        {builds.map(({ pkg, asset }) => (
          <li
            key={pkg.id}
            className="hover:bg-muted/50 rounded-2xl last:border-b"
          >
            <BuildLink pkg={pkg} url={asset.url} size={asset.size} />
          </li>
        ))}
      </ul>
    </div>
  )
}

function BuildLink({
  pkg,
  url,
  size,
  withOS = false,
}: {
  pkg: Package
  url: string
  size: number
  withOS?: boolean
}) {
  return (
    <a href={url} className="group/build flex items-center gap-4 px-4 py-3.5">
      {withOS && (
        <OSIcon os={pkg.os} className="text-muted-foreground size-4 shrink-0" />
      )}
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-medium">
          {withOS ? `${OS_LABELS[pkg.os]} ${pkg.label}` : pkg.label}
        </span>
        {!withOS && (
          <span className="text-muted-foreground block text-xs">
            {pkg.detail}
          </span>
        )}
      </span>
      <span className="text-muted-foreground text-xs tabular-nums">
        {formatFileSize(size)}
      </span>
      <Download className="text-muted-foreground group-hover/build:text-foreground size-4 shrink-0" />
    </a>
  )
}

function VersionRow({ release, open }: { release: Release; open: boolean }) {
  const builds = getBuilds(release)
  const platforms = OSES.filter((os) => builds.some(({ pkg }) => pkg.os === os))

  return (
    <details
      id={release.anchor}
      open={open}
      className="group/version hover:bg-muted/50 open:bg-muted/50 scroll-mt-8 rounded-2xl"
    >
      <summary className="flex cursor-pointer list-none items-center gap-4 px-5 py-4 [&::-webkit-details-marker]:hidden">
        <span className="w-24 font-medium">{release.version}</span>
        <span className="text-muted-foreground flex-1 text-sm">
          {formatDate(release.publishedAt)}
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
                <BuildLink pkg={pkg} url={asset.url} size={asset.size} withOS />
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
