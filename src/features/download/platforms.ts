export type OS = 'windows' | 'macos' | 'linux'

export const OS_LABELS: Record<OS, string> = {
  windows: 'Windows',
  macos: 'macOS',
  linux: 'Linux',
}

export const PACKAGES = [
  {
    id: 'windows',
    os: 'windows',
    label: 'Installer',
    details: ['x64'],
    suffix: '_x64-setup.exe',
  },
  {
    id: 'macos',
    os: 'macos',
    label: 'Apple Silicon',
    details: ['M1 or later'],
    suffix: '_aarch64.dmg',
  },
  {
    id: 'macos-intel',
    os: 'macos',
    label: 'Intel',
    details: ['x64'],
    suffix: '_x64.dmg',
  },
  {
    id: 'linux',
    os: 'linux',
    label: 'AppImage',
    details: ['x64', 'Any distro'],
    suffix: '_amd64.AppImage',
  },
  {
    id: 'linux-deb',
    os: 'linux',
    label: 'Debian / Ubuntu',
    details: ['x64'],
    suffix: '_amd64.deb',
  },
  {
    id: 'linux-rpm',
    os: 'linux',
    label: 'Fedora / RHEL',
    details: ['x86_64'],
    suffix: '.x86_64.rpm',
  },
] as const satisfies {
  id: string
  os: OS
  label: string
  details: readonly string[]
  suffix: string
}[]

export type Package = (typeof PACKAGES)[number]

export function findAsset<T extends { name: string }>(
  assets: T[],
  pkg: Package
) {
  return assets.find((asset) => asset.name.endsWith(pkg.suffix))
}

export function detectPackage(
  userAgent: string,
  maxTouchPoints: number
): Package['id'] | null {
  if (/android|iphone|ipad|ipod|cros/i.test(userAgent)) return null
  if (/windows/i.test(userAgent)) return 'windows'

  if (/mac os x|macintosh/i.test(userAgent)) {
    return maxTouchPoints > 1 ? null : 'macos'
  }

  if (/linux|x11/i.test(userAgent)) {
    if (/aarch64|armv/i.test(userAgent)) return null
    if (/ubuntu|debian/i.test(userAgent)) return 'linux-deb'
    if (/fedora/i.test(userAgent)) return 'linux-rpm'
    return 'linux'
  }

  return null
}
