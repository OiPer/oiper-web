'use client'

import { ResponsiveDialog } from '@/components/shared/responsive-dialog'
import { Button } from '@/components/ui/button'
import { DialogFooter } from '@/components/ui/dialog'
import { Slot } from 'radix-ui'
import { Fragment, useRef, useState } from 'react'

interface AccountAvatarModalProps {
  children: React.ReactNode
  maxSize?: number
  allow?: string[]
}

export function AccountAvatarModal({
  children,
  maxSize = 2,
  allow = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'],
}: AccountAvatarModalProps) {
  const [open, setOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  function handleAvatarClick() {
    fileInputRef.current?.click()
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    if (!allow.includes(file.type)) {
      return
    }

    if (file.size > maxSize * 1024 * 1024) {
      return
    }

    setSelectedFile(file)
    setOpen(true)
  }

  function clearSelection() {
    setSelectedFile(null)

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) {
      clearSelection()
    }

    setOpen(nextOpen)
  }

  return (
    <Fragment>
      <input
        ref={fileInputRef}
        type="file"
        accept={allow.join(',')}
        onChange={handleInputChange}
        className="hidden"
      />

      <Slot.Root onClick={handleAvatarClick}>{children}</Slot.Root>

      <ResponsiveDialog open={open} onOpenChange={handleOpenChange}>
        <ResponsiveDialog.Content>
          <div className="space-y-1">
            <ResponsiveDialog.Title>Update Avatar</ResponsiveDialog.Title>
            <ResponsiveDialog.Description>
              Use a clean square image for your Oiper account profile.
            </ResponsiveDialog.Description>
          </div>

          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="bg-muted relative size-44 overflow-hidden rounded-2xl border">
                {selectedFile ? (
                  <img
                    src={URL.createObjectURL(selectedFile)}
                    alt="Avatar preview"
                    className="size-full object-cover object-center"
                  />
                ) : (
                  <div className="text-muted-foreground flex size-full items-center justify-center text-sm">
                    Select an image
                  </div>
                )}
              </div>
            </div>

            <div className="text-muted-foreground rounded-lg border border-dashed px-4 py-3 text-sm">
              PNG, JPG, and WebP work best. Keep it under {maxSize}MB for a
              sharp, fast-loading profile image.
            </div>

            <DialogFooter className="gap-2">
              <ResponsiveDialog.Close asChild>
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </ResponsiveDialog.Close>

              <Button type="button" onClick={() => setOpen(false)}>
                Save Avatar
              </Button>
            </DialogFooter>
          </div>
        </ResponsiveDialog.Content>
      </ResponsiveDialog>
    </Fragment>
  )
}
