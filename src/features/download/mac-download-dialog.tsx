'use client'

import { ResponsiveDialog } from '@/components/shared/responsive-dialog'
import { Button } from '@/components/ui/button'
import { DialogHeader } from '@/components/ui/dialog'
import { Check, Copy } from 'lucide-react'
import { useEffect, useState } from 'react'
import { OSIcon } from './os-icons'

const MAC_BUILDS = {
  macos: 'Download for macOS',
  'macos-intel': 'Download for Intel Mac',
}
type MacBuild = keyof typeof MAC_BUILDS

const WHY_UNSIGNED_URL = '/blog/why-oiper-isnt-signed'
const APPLE_GUIDE_URL =
  'https://support.apple.com/guide/mac-help/open-a-mac-app-from-an-unknown-developer-mh40616/mac'
const QUARANTINE_COMMAND =
  'xattr -rd com.apple.quarantine /Applications/OiPer.app'

export function MacDownloadDialog() {
  const [urls, setUrls] = useState<Partial<Record<MacBuild, string>>>({})
  const [build, setBuild] = useState<MacBuild>('macos')
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)

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
      setCopied(false)
      setOpen(true)
    }

    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [])

  const otherBuild = build === 'macos' ? 'macos-intel' : 'macos'

  return (
    <ResponsiveDialog open={open} onOpenChange={setOpen}>
      <ResponsiveDialog.Content className="gap-0 sm:max-w-lg">
        <DialogHeader className="gap-1 text-left">
          <ResponsiveDialog.Title className="text-lg">
            Download OiPer for Mac
          </ResponsiveDialog.Title>
          <ResponsiveDialog.Description>
            Sorry, OiPer may need a little extra setup on Mac for now.
          </ResponsiveDialog.Description>
        </DialogHeader>

        <div className="mt-6 flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <h3 className="text-sm font-medium">
              &ldquo;OiPer is damaged&rdquo; or app not opening?
            </h3>
            <p className="text-muted-foreground text-sm">
              OiPer isn&apos;t{' '}
              <a
                href={APPLE_GUIDE_URL}
                target="_blank"
                rel="noreferrer"
                className="underline decoration-current/40 underline-offset-4 hover:decoration-current"
              >
                signed with Apple
              </a>{' '}
              yet.{' '}
              <a
                href={WHY_UNSIGNED_URL}
                target="_blank"
                rel="noreferrer"
                className="underline decoration-current/40 underline-offset-4 hover:decoration-current"
              >
                Learn more
              </a>
            </p>
            <p className="text-muted-foreground text-sm">
              Run this in Terminal to fix:
            </p>
            <div className="bg-muted mt-2 flex items-center gap-2 rounded-md border py-1 pr-1 pl-3">
              <code className="flex-1 font-mono text-xs break-all">
                {QUARANTINE_COMMAND}
              </code>
              <Button
                variant="ghost"
                size="icon"
                type="button"
                aria-label="Copy command"
                onClick={() => {
                  navigator.clipboard.writeText(QUARANTINE_COMMAND).then(
                    () => setCopied(true),
                    () => setCopied(false)
                  )
                }}
              >
                {copied ? <Check /> : <Copy />}
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <h3 className="text-sm font-medium">
              Permissions not working after update?
            </h3>
            <p className="text-muted-foreground text-sm">
              Remove and re-add OiPer in System Settings &gt; Privacy &amp;
              Security.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-3">
          <Button size="lg" className="h-11 w-full gap-2" asChild>
            <a href={urls[build]}>
              <OSIcon os="macos" className="size-4" />
              {MAC_BUILDS[build]}
            </a>
          </Button>
          {urls[otherBuild] && (
            <a
              href={urls[otherBuild]}
              className="text-muted-foreground hover:text-foreground text-sm underline-offset-4 hover:underline"
            >
              {MAC_BUILDS[otherBuild]}
            </a>
          )}
        </div>
      </ResponsiveDialog.Content>
    </ResponsiveDialog>
  )
}
