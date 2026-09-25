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
    detail: 'x64 · .exe',
    suffix: '_x64-setup.exe',
  },
  {
    id: 'windows-msi',
    os: 'windows',
    label: 'MSI package',
    detail: 'x64 · .msi',
    suffix: '_x64_en-US.msi',
  },
  {
    id: 'macos',
    os: 'macos',
    label: 'Apple Silicon',
    detail: 'M1 or later · .dmg',
    suffix: '_aarch64.dmg',
  },
  {
    id: 'macos-intel',
    os: 'macos',
    label: 'Intel',
    detail: 'x64 · .dmg',
    suffix: '_x64.dmg',
  },
  {
    id: 'linux',
    os: 'linux',
    label: 'AppImage',
    detail: 'x64 · any distro',
    suffix: '_amd64.AppImage',
  },
  {
    id: 'linux-deb',
    os: 'linux',
    label: 'Debian / Ubuntu',
    detail: 'x64 · .deb',
    suffix: '_amd64.deb',
  },
  {
    id: 'linux-rpm',
    os: 'linux',
    label: 'Fedora / RHEL',
    detail: 'x86_64 · .rpm',
    suffix: '.x86_64.rpm',
  },
] as const satisfies {
  id: string
  os: OS
  label: string
  detail: string
  suffix: string
}[]

export type Package = (typeof PACKAGES)[number]

export function findAsset<T extends { name: string }>(
  assets: T[],
  pkg: Package
) {
  return assets.find((asset) => asset.name.endsWith(pkg.suffix))
}

export function detectOS(userAgent: string): OS | null {
  if (/android|iphone|ipad|ipod/i.test(userAgent)) return null
  if (/windows/i.test(userAgent)) return 'windows'
  if (/mac os x|macintosh/i.test(userAgent)) return 'macos'
  if (/linux|x11/i.test(userAgent)) return 'linux'
  return null
}
