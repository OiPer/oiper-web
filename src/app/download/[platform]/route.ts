import { getRecentReleases } from '@/features/changelog/github-releases'
import {
  findAsset,
  PACKAGES,
  pickDownloadRelease,
} from '@/features/download/platforms'
import { DOWNLOAD_URL } from '@/features/landing-page/constants/links'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ platform: string }> }
) {
  const { platform } = await params
  const pkg = PACKAGES.find((item) => item.id === platform)
  const fallback = new URL(DOWNLOAD_URL, request.url)

  if (!pkg) return NextResponse.redirect(fallback)

  try {
    const releases = await getRecentReleases()
    const release = pickDownloadRelease(releases)

    const asset =
      (release && findAsset(release.assets, pkg)) ??
      releases
        .filter((item) => !item.prerelease)
        .map((item) => findAsset(item.assets, pkg))
        .find((item) => item !== undefined)

    return NextResponse.redirect(asset ? asset.url : fallback)
  } catch {
    return NextResponse.redirect(fallback)
  }
}
