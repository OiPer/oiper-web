'use client'

import { ResponsiveDialog } from '@/components/shared/responsive-dialog'
import { Button } from '@/components/ui/button'
import { DialogFooter, DialogHeader } from '@/components/ui/dialog'
import { ChevronDown } from 'lucide-react'
import { useEffect, useState } from 'react'

const MAC_BUILDS = { macos: 'Mac Silicon', 'macos-intel': 'Mac Intel' }
type MacBuild = keyof typeof MAC_BUILDS

const BYPASS_GUIDE_URL =
  'https://support.apple.com/guide/mac-help/open-a-mac-app-from-an-unknown-developer-mh40616/mac'

// Mac download links opt in with `data-mac-build` (+ optional `data-mac-alt`,
// the other build's URL). Clicks are intercepted here so server components
// can stay plain anchors.
export function MacDownloadDialog() {
  const [urls, setUrls] = useState<Partial<Record<MacBuild, string>>>({})
  const [build, setBuild] = useState<MacBuild>('macos')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (event.button !== 0 || event.metaKey || event.ctrlKey) return
      const link = (event.target as Element).closest<HTMLAnchorElement>(
        'a[data-mac-build]'
      )
      if (!link) return

      event.preventDefault()
      const current = link.dataset.macBuild as MacBuild
      const other = current === 'macos' ? 'macos-intel' : 'macos'
      setUrls({ [current]: link.href, [other]: link.dataset.macAlt })
      setBuild(current)
      setOpen(true)
    }

    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [])

  const builds = (Object.keys(MAC_BUILDS) as MacBuild[]).filter((b) => urls[b])

  return (
    <ResponsiveDialog open={open} onOpenChange={setOpen}>
      <ResponsiveDialog.Content>
        <DialogHeader className="text-left">
          <ResponsiveDialog.Title>
            Mac build not signed by Apple
          </ResponsiveDialog.Title>
          <ResponsiveDialog.Description>
            Apple Developer accounts aren&apos;t available to us from Bangladesh
            so the{' '}
            <span className="text-foreground relative inline-block border-b border-dotted border-current font-medium">
              <select
                aria-label="Mac build"
                value={build}
                disabled={builds.length < 2}
                onChange={(event) => setBuild(event.target.value as MacBuild)}
                className="focus-visible:ring-ring/50 field-sizing-content cursor-pointer appearance-none bg-transparent pr-4 outline-none focus-visible:ring-2 disabled:cursor-default disabled:pr-0"
              >
                {builds.map((b) => (
                  <option
                    key={b}
                    value={b}
                    className="bg-popover text-popover-foreground"
                  >
                    {MAC_BUILDS[b]}
                  </option>
                ))}
              </select>
              {builds.length > 1 && (
                <ChevronDown className="pointer-events-none absolute top-1/2 right-0 size-3.5 -translate-y-1/2" />
              )}
            </span>{' '}
            build you&apos;re trying to download isn&apos;t signed by Apple and
            macOS may block it. If you still want to use the app follow{' '}
            <a
              href={BYPASS_GUIDE_URL}
              target="_blank"
              rel="noreferrer"
              className="text-foreground underline underline-offset-4"
            >
              these steps to bypass the warning
            </a>
            .
          </ResponsiveDialog.Description>
        </DialogHeader>

        <DialogFooter className="group-data-[vaul-drawer-direction=bottom]/drawer-content:flex-col-reverse">
          <ResponsiveDialog.Close asChild>
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </ResponsiveDialog.Close>
          <Button variant="destructive" asChild>
            <a href={urls[build]} onClick={() => setOpen(false)}>
              Yes, download
            </a>
          </Button>
        </DialogFooter>
      </ResponsiveDialog.Content>
    </ResponsiveDialog>
  )
}
