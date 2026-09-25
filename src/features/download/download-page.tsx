import { OiPerLogoText } from '@/components/logo-text'
import { Wrapper } from '@/components/wrapper'
import type { Release } from '@/features/changelog/github-releases'
import { AuthNavActions } from '@/features/landing-page/components/auth-nav-actions'
import { FooterSection } from '@/features/landing-page/components/footer-section'
import { GITHUB_REPO, HOME } from '@/features/landing-page/constants/links'
import { formatDate } from '@/lib/format'
import { Download } from 'lucide-react'
import { DownloadButton } from './download-button'
import { OSIcon } from './os-icons'
import { findAsset, OS_LABELS, PACKAGES, type OS } from './platforms'
import { VersionSelect } from './version-select'

interface DownloadPageProps {
  release: Release | undefined
  versions: string[]
}

export function DownloadPage({ release, versions }: DownloadPageProps) {
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
        <div className="mx-auto flex max-w-190 flex-col items-center pt-20 pb-24 text-center">
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
        </div>
      </Wrapper>

      <Wrapper className="pb-32">
        <div className="flex flex-col gap-6 border-t border-white/8 pt-16 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
              All platforms
            </h2>
            {release && (
              <p className="mt-3 text-sm text-white/40">
                {release.version} · released {formatDate(release.publishedAt)} ·{' '}
                <a href={release.url} className="underline hover:text-white/70">
                  Release notes
                </a>
              </p>
            )}
          </div>
          {release && (
            <VersionSelect versions={versions} value={release.version} />
          )}
        </div>

        {release ? (
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {(Object.keys(OS_LABELS) as OS[]).map((os) => (
              <PlatformCard key={os} os={os} release={release} />
            ))}
          </div>
        ) : (
          <p className="mt-10 text-white/50">
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

      <FooterSection />
    </main>
  )
}

function PlatformCard({ os, release }: { os: OS; release: Release }) {
  const packages = PACKAGES.flatMap((pkg) => {
    if (pkg.os !== os) return []
    const asset = findAsset(release.assets, pkg)
    return asset ? [{ ...pkg, url: asset.url }] : []
  })

  return (
    <div className="rounded-lg border border-white/8 bg-white/[0.02] p-6">
      <div className="flex items-center gap-3">
        <OSIcon os={os} className="size-6" />
        <h3 className="text-lg font-medium">{OS_LABELS[os]}</h3>
      </div>

      {packages.length === 0 ? (
        <p className="mt-6 text-sm text-white/40">
          Not available for this version.
        </p>
      ) : (
        <ul className="mt-6 space-y-2">
          {packages.map((pkg) => (
            <li key={pkg.id}>
              <a
                href={pkg.url}
                className="flex items-center justify-between gap-4 rounded-md border border-white/8 px-4 py-3 hover:border-white/20 hover:bg-white/5"
              >
                <span>
                  <span className="block text-sm font-medium">{pkg.label}</span>
                  <span className="block text-xs text-white/40">
                    {pkg.detail}
                  </span>
                </span>
                <Download className="size-4 shrink-0 text-white/50" />
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
