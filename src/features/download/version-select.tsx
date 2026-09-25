'use client'

import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'
import { DOWNLOAD_URL } from '@/features/landing-page/constants/links'
import { useRouter } from 'next/navigation'

export function VersionSelect({
  versions,
  value,
}: {
  versions: string[]
  value: string
}) {
  const router = useRouter()

  return (
    <NativeSelect
      aria-label="Version"
      value={value}
      onChange={(event) => {
        const version = event.target.value
        router.push(
          version === versions[0]
            ? DOWNLOAD_URL
            : `${DOWNLOAD_URL}?version=${encodeURIComponent(version)}`,
          { scroll: false }
        )
      }}
      className="h-10 border-white/14 bg-white/7 text-white hover:bg-white/10 [&>option]:bg-[#0a0a0a]"
    >
      {versions.map((version, index) => (
        <NativeSelectOption key={version} value={version}>
          {index === 0 ? `${version} (latest)` : version}
        </NativeSelectOption>
      ))}
    </NativeSelect>
  )
}
