'use client'

import { ResponsiveDialog } from '@/components/shared/responsive-dialog'
import { Button } from '@/components/ui/button'
import { DialogFooter } from '@/components/ui/dialog'
import { Spinner } from '@/components/ui/spinner'
import { Slot } from 'radix-ui'
import { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import { toast } from 'sonner'

interface AccountAvatarModalProps {
  children: React.ReactNode
  isSaving?: boolean
  maxSize?: number
  allow?: string[]
  onSave(imageUrl: string): Promise<void>
}

export function AccountAvatarModal({
  children,
  isSaving = false,
  maxSize = 2,
  allow = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'],
  onSave,
}: AccountAvatarModalProps) {
  const [open, setOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const previewUrl = useMemo(
    () => (selectedFile ? URL.createObjectURL(selectedFile) : null),
    [selectedFile]
  )

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

  async function readFileAsDataUrl(file: File) {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader()

      reader.onload = () => {
        if (typeof reader.result === 'string') {
          return resolve(reader.result)
        }

        reject(new Error('Could not read avatar file'))
      }

      reader.onerror = () =>
        reject(reader.error ?? new Error('Could not read avatar file'))
      reader.readAsDataURL(file)
    })
  }

  function handleAvatarClick() {
    fileInputRef.current?.click()
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]

    if (!file) return

    if (!allow.includes(file.type)) {
      return toast.error('Unsupported image format')
    }

    if (file.size > maxSize * 1024 * 1024) {
      return toast.error(`Avatar must stay under ${maxSize}MB`)
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

  async function handleSaveAvatar() {
    if (!selectedFile) return

    try {
      const dataUrl = await readFileAsDataUrl(selectedFile)
      await onSave(dataUrl)
      handleOpenChange(false)
    } catch {}
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
                    src={previewUrl ?? undefined}
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
                <Button variant="outline" type="button" disabled={isSaving}>
                  Cancel
                </Button>
              </ResponsiveDialog.Close>

              <Button
                type="button"
                onClick={() => void handleSaveAvatar()}
                disabled={!selectedFile || isSaving}
              >
                {isSaving ? <Spinner /> : 'Save Avatar'}
              </Button>
            </DialogFooter>
          </div>
        </ResponsiveDialog.Content>
      </ResponsiveDialog>
    </Fragment>
  )
}
