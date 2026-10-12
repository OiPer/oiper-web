import { OiPerLogoText } from '@/components/logo-text'
import { NavigationLink } from '@/components/navigation-link'
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
import { cn } from '@/lib/utils'
import { ArrowUpRight } from 'lucide-react'
import { BuildLink, Separator } from './build-link'
import { DownloadButton } from './download-button'
import { OSIcon } from './os-icons'
import { findAsset, OS_LABELS, PACKAGES, type OS } from './platforms'

const OSES = Object.keys(OS_LABELS) as OS[]

export function getBuilds(release: Release, platform?: OS) {
  const builds = PACKAGES.flatMap((pkg) => {
    const asset = findAsset(release.assets, pkg)
    return asset ? [{ pkg, asset }] : []
  })

  return builds.toSorted(
    (a, b) => Number(b.pkg.os === platform) - Number(a.pkg.os === platform)
  )
}

export function DownloadPage({
  release,
  platform,
}: {
  release?: Release
  platform?: OS
}) {
  return (
    <main className="bg-background text-foreground min-h-screen overflow-hidden">
      <Wrapper>
        <nav className="flex h-20 items-center justify-between">
          <NavigationLink
            href={HOME}
            location="header"
            destination="home"
            className="flex items-center gap-3"
          >
            <OiPerLogoText className="text-[2rem]" />
          </NavigationLink>
          <AuthNavActions />
        </nav>
      </Wrapper>

      <Wrapper>
        <div className="mx-auto flex max-w-190 flex-col items-center pt-14 pb-16 text-center sm:pt-24">
          <h1 className="text-[clamp(1.85rem,9vw,4rem)] font-semibold tracking-[-0.04em]">
            Download OiPer
          </h1>
          <p className="text-muted-foreground mt-3 text-[clamp(0.95rem,4vw,1.125rem)] leading-relaxed">
            Get the right build for Windows, macOS, or Linux and start speaking
          </p>
          <DownloadButton
            location="download_section"
            className={cn(
              buttonVariants({ size: 'lg' }),
              'mt-10 h-12 px-7 text-base'
            )}
            iconClassName="size-5"
          />
          {release && (
            <p className="text-muted-foreground mt-6 flex items-center gap-3 text-sm">
              Version {release.version.replace(/^v/, '')}
              <Separator />
              <NavigationLink
                href={`${CHANGELOG_URL}#${release.anchor}`}
                location="download_section"
                destination="changelog"
                className="text-foreground underline-offset-4 hover:underline"
              >
                What&apos;s new
              </NavigationLink>
            </p>
          )}
        </div>
      </Wrapper>

      <Wrapper className="pb-40">
        {release ? (
          <div className="mx-auto max-w-3xl">
            <VersionRow release={release} platform={platform} />
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

function VersionRow({
  release,
  platform,
}: {
  release: Release
  platform?: OS
}) {
  const builds = getBuilds(release, platform)
  const platforms = OSES.filter((os) => builds.some(({ pkg }) => pkg.os === os))

  return (
    <div className="bg-muted/50 border-border rounded-2xl border-b">
      <div className="flex items-center gap-4 px-5 py-4">
        <span className="flex-1 font-medium">{release.version}</span>
        <span className="text-muted-foreground hidden items-center gap-2.5 sm:flex">
          {platforms.map((os) => (
            <OSIcon key={os} os={os} className="size-3.5" />
          ))}
        </span>
      </div>

      <div className="px-2 pb-3">
        {builds.length > 0 ? (
          <ul>
            {builds.map(({ pkg, asset }) => (
              <li
                key={pkg.id}
                className="hover:bg-muted before:via-border relative rounded-xl before:absolute before:inset-x-4 before:top-0 before:h-px before:bg-linear-to-r before:from-transparent before:to-transparent first:before:hidden hover:before:opacity-0 [li:hover+&]:before:opacity-0"
              >
                <BuildLink
                  pkg={pkg}
                  url={asset.url}
                  macAltUrl={
                    builds.find(
                      (build) => build.pkg.os === 'macos' && build.pkg !== pkg
                    )?.asset.url ?? null
                  }
                  size={asset.size}
                />
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
    </div>
  )
}
