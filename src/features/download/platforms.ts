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

export function detectOS(userAgent: string): OS | null {
  if (/android|iphone|ipad|ipod/i.test(userAgent)) return null
  if (/windows/i.test(userAgent)) return 'windows'
  if (/mac os x|macintosh/i.test(userAgent)) return 'macos'
  if (/linux|x11/i.test(userAgent)) return 'linux'
  return null
}

export async function isIntelMac() {
  const uaData = (
    navigator as Navigator & {
      userAgentData?: {
        getHighEntropyValues(
          hints: string[]
        ): Promise<{ architecture?: string }>
      }
    }
  ).userAgentData
  if (uaData) {
    const { architecture } = await uaData.getHighEntropyValues(['architecture'])
    return architecture === 'x86'
  }
  const gl = document.createElement('canvas').getContext('webgl')
  const info = gl && gl.getExtension('WEBGL_debug_renderer_info')
  const renderer = info
    ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL))
    : ''
  return /intel|amd|radeon|nvidia/i.test(renderer)
}
