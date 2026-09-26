import { findLatest, getReleases } from '@/features/changelog/github-releases'
import { findAsset, PACKAGES } from '@/features/download/platforms'
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
    const latest = findLatest(await getReleases())
    const asset = latest && findAsset(latest.assets, pkg)
    return NextResponse.redirect(asset ? asset.url : fallback)
  } catch {
    return NextResponse.redirect(fallback)
  }
}
