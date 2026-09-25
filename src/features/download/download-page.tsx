import { OiPerLogoText } from '@/components/logo-text'
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

const VISIBLE_PREVIOUS_VERSIONS = 8
const OSES = Object.keys(OS_LABELS) as OS[]

function getBuilds(release: Release) {
  return PACKAGES.flatMap((pkg) => {
    const asset = findAsset(release.assets, pkg)
    return asset ? [{ pkg, asset }] : []
  })
}

const ALL_DOWNLOADS_ID = 'all-downloads'

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
    <main className="min-h-screen overflow-hidden bg-[#0a0a0a] text-white">
      <Wrapper>
        <nav className="flex h-20 items-center justify-between">
          <a href={HOME} className="flex items-center gap-3">
            <OiPerLogoText className="text-[2rem]" />
          </a>
          <AuthNavActions />
        </nav>
      </Wrapper>

      <Wrapper>
        <div className="mx-auto flex max-w-190 flex-col items-center pt-20 pb-28 text-center">
          <h1 className="text-[clamp(2.25rem,7vw,4rem)] font-semibold tracking-[-0.04em]">
            Download OiPer
          </h1>
          <p className="mt-6 max-w-120 text-[clamp(0.95rem,4vw,1.125rem)] leading-relaxed text-white/50">
            Free for Windows, macOS and Linux. Runs fully offline once
            installed.
          </p>
          <DownloadButton
            className="mt-10 h-13 rounded bg-white px-8 text-base font-medium text-[#0a0a0a] hover:bg-white/90"
            iconClassName="size-5"
          />
          {latest && (
            <p className="mt-6 text-sm text-white/40">
              Version {latest.version.replace(/^v/, '')} ·{' '}
              {formatDate(latest.publishedAt)} ·{' '}
              <a
                href={`${CHANGELOG_URL}#${latest.anchor}`}
                className="text-white/60 underline-offset-4 hover:text-white hover:underline"
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
          className="scroll-mt-8 border-t border-white/8 pt-16"
        >
          <h2 className="text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
            All downloads
          </h2>
          <p className="mt-3 text-white/40">
            Pick the build that matches your system.
          </p>
        </div>

        {latest ? (
          <div className="mt-12 grid gap-x-10 gap-y-14 md:grid-cols-3">
            {OSES.map((os) => (
              <PlatformColumn key={os} os={os} release={latest} />
            ))}
          </div>
        ) : (
          <p className="mt-12 text-white/50">
            Couldn&apos;t load releases right now. Grab a build from{' '}
            <a
              href={`${GITHUB_REPO}/releases`}
              className="underline hover:text-white"
            >
              GitHub releases
            </a>
            .
          </p>
        )}
      </Wrapper>

      {previous.length > 0 && (
        <Wrapper className="pb-32">
          <div className="border-t border-white/8 pt-16 text-center">
            <h2 className="text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
              Previous versions
            </h2>
            <p className="mt-3 text-white/40">
              Every release stays available if you need an older build.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-3xl border-t border-white/8">
            {previous.slice(0, VISIBLE_PREVIOUS_VERSIONS).map((release) => (
              <VersionRow
                key={release.version}
                release={release}
                open={release === selected}
              />
            ))}

            {previous.length > VISIBLE_PREVIOUS_VERSIONS && (
              <details
                className="group/older"
                open={selectedIndex >= VISIBLE_PREVIOUS_VERSIONS}
              >
                <summary className="flex cursor-pointer list-none justify-center py-6 text-sm text-white/50 hover:text-white [&::-webkit-details-marker]:hidden">
                  <span className="group-open/older:hidden">
                    Show {previous.length - VISIBLE_PREVIOUS_VERSIONS} older
                    versions
                  </span>
                  <span className="hidden group-open/older:inline">
                    Hide older versions
                  </span>
                </summary>
                <div className="border-t border-white/8">
                  {previous.slice(VISIBLE_PREVIOUS_VERSIONS).map((release) => (
                    <VersionRow
                      key={release.version}
                      release={release}
                      open={release === selected}
                    />
                  ))}
                </div>
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
      <div className="flex items-center gap-3">
        <OSIcon os={os} className="size-5" />
        <h3 className="text-lg font-medium">{OS_LABELS[os]}</h3>
      </div>
      <p className="mt-1.5 text-sm text-white/40">{OS_REQUIREMENTS[os]}</p>

      <ul className="mt-6 border-t border-white/8">
        {builds.map(({ pkg, asset }) => (
          <li key={pkg.id} className="border-b border-white/8">
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
  showOS = false,
}: {
  pkg: Package
  url: string
  size: number
  showOS?: boolean
}) {
  return (
    <a
      href={url}
      className="group/build flex items-center gap-4 py-4 text-white/80 hover:text-white"
    >
      {showOS && <OSIcon os={pkg.os} className="size-4 shrink-0" />}
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-medium">
          {showOS ? `${OS_LABELS[pkg.os]} ${pkg.label}` : pkg.label}
        </span>
        <span className="block text-xs text-white/40">{pkg.detail}</span>
      </span>
      <span className="text-xs text-white/40 tabular-nums">
        {formatFileSize(size)}
      </span>
      <Download className="size-4 shrink-0 text-white/40 group-hover/build:text-white" />
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
      className="group/version scroll-mt-8 border-b border-white/8"
    >
      <summary className="flex cursor-pointer list-none items-center gap-4 py-5 hover:text-white [&::-webkit-details-marker]:hidden">
        <span className="w-24 font-medium">{release.version}</span>
        <span className="flex-1 text-sm text-white/40">
          {formatDate(release.publishedAt)}
        </span>
        <span className="flex items-center gap-2.5 text-white/40">
          {platforms.map((os) => (
            <OSIcon key={os} os={os} className="size-3.5" />
          ))}
        </span>
        <ChevronDown className="size-4 text-white/40 group-open/version:rotate-180" />
      </summary>

      <div className="pb-5">
        {builds.length > 0 ? (
          <ul className="grid gap-x-10 sm:grid-cols-2">
            {builds.map(({ pkg, asset }) => (
              <li key={pkg.id} className="border-t border-white/8">
                <BuildLink pkg={pkg} url={asset.url} size={asset.size} showOS />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-white/40">
            No installers in this release.
          </p>
        )}
        <a
          href={release.url}
          className="mt-3 inline-flex items-center gap-1 text-sm text-white/50 hover:text-white"
        >
          Release notes
          <ArrowUpRight className="size-3.5" />
        </a>
      </div>
    </details>
  )
}
