'use client'

import { ResponsiveDialog } from '@/components/shared/responsive-dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { DialogFooter } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Spinner } from '@/components/ui/spinner'
import {
  formatMemberSince,
  getOptionalUserInitials,
  getOptionalUserLabel,
} from '@/features/account/utils'
import { useAuth } from '@/features/auth/auth-context'
import { $api } from '@/lib/api/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { Trash2, TriangleAlert } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import {
  clearAccountSession,
  getAccountMutationHeaders,
  syncAccountProfileInSession,
} from './account-api'
import { AccountAvatarModal } from './avatar-modal'

const accountConfigureSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(160),
})

function AccountDeleteModal({
  children,
  confirmationText,
  isDeleting,
  onDelete,
}: {
  children: React.ReactNode
  confirmationText: string
  isDeleting: boolean
  onDelete(): Promise<void>
}) {
  const [confirm, setConfirm] = useState('')

  return (
    <ResponsiveDialog onOpenChange={(open) => !open && setConfirm('')}>
      <ResponsiveDialog.Trigger asChild>{children}</ResponsiveDialog.Trigger>

      <ResponsiveDialog.Content>
        <div className="space-y-1">
          <ResponsiveDialog.Title>Account delete</ResponsiveDialog.Title>
          <ResponsiveDialog.Description>
            This action is permanent and cannot be undone.
          </ResponsiveDialog.Description>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium">
            <TriangleAlert className="size-4" />
            <p>Subscription access and billing history will be removed</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-delete">Confirmation *</Label>
            <Input
              id="confirm-delete"
              placeholder={`Type "${confirmationText}" to confirm`}
              value={confirm}
              onChange={(event) => setConfirm(event.target.value)}
            />
          </div>

          <DialogFooter className="flex-row gap-2 [&>*]:flex-1 sm:[&>*]:flex-none">
            <ResponsiveDialog.Close asChild>
              <Button variant="outline" type="button" disabled={isDeleting}>
                Cancel
              </Button>
            </ResponsiveDialog.Close>

            <Button
              type="button"
              variant="destructive"
              disabled={confirm !== confirmationText || isDeleting}
              onClick={() => void onDelete()}
            >
              {isDeleting ? <Spinner /> : 'Delete'}
            </Button>
          </DialogFooter>
        </div>
      </ResponsiveDialog.Content>
    </ResponsiveDialog>
  )
}

function ConfigureAccount() {
  const { currentUser } = useAuth()
  const queryClient = useQueryClient()
  const updateProfileMutation = $api.useMutation('patch', '/v1/account/profile')

  const profile = useMemo(() => {
    const label = getOptionalUserLabel(currentUser)

    return {
      label,
      email: currentUser?.email ?? 'account@oiper.com',
      initials: getOptionalUserInitials(currentUser),
      image: currentUser?.profilePictureUrl ?? undefined,
      memberSince: formatMemberSince(currentUser?.createdAt),
    }
  }, [currentUser])

  const form = useForm<z.infer<typeof accountConfigureSchema>>({
    defaultValues: {
      name: profile.label,
    },
    resolver: zodResolver(accountConfigureSchema),
    mode: 'onChange',
  })

  const name = form.watch('name')

  useEffect(() => {
    form.reset({
      name: profile.label,
    })
  }, [form, profile.label])

  async function updateProfile(
    body: z.infer<typeof accountConfigureSchema> | { profilePictureUrl: string }
  ) {
    const headers = await getAccountMutationHeaders()
    const updatedProfile = await updateProfileMutation.mutateAsync({
      body,
      params: {
        header: headers,
      },
    })

    syncAccountProfileInSession(queryClient, updatedProfile)
    return updatedProfile
  }

  async function handleUpdate(values: z.infer<typeof accountConfigureSchema>) {
    try {
      await updateProfile(values)
      toast.success('Name updated successfully')
    } catch {
      toast.error('Could not update your account')
    }
  }

  async function handleAvatarSave(profilePictureUrl: string) {
    try {
      await updateProfile({ profilePictureUrl })
      toast.success('Avatar updated successfully')
    } catch (error) {
      toast.error('Could not update your avatar')
      throw error
    }
  }

  return (
    <div className="space-y-6">
      <div
        id="account-avatar"
        className="bg-card text-card-foreground flex justify-between gap-4 rounded-xl border p-4 shadow-sm sm:p-6"
      >
        <div className="flex max-h-max flex-col justify-between gap-5">
          <Label className="text-base select-auto">Avatar</Label>

          <div className="flex flex-col">
            <p className="text-sm font-medium">
              Upload a profile photo for your Oiper account
            </p>
            <p className="text-muted-foreground text-sm">
              Square image of at least 256x256px is recommended
            </p>
          </div>

          <p className="text-muted-foreground text-sm">
            Member since {profile.memberSince}
          </p>
        </div>

        <AccountAvatarModal
          maxSize={0.5}
          isSaving={updateProfileMutation.isPending}
          onSave={handleAvatarSave}
        >
          <button className="cursor-pointer rounded-full transition-opacity hover:opacity-80">
            <Avatar className="size-20">
              <AvatarImage alt={profile.label} src={profile.image} />
              <AvatarFallback className="text-lg font-semibold">
                {profile.initials}
              </AvatarFallback>
            </Avatar>
          </button>
        </AccountAvatarModal>
      </div>

      <form
        id="account-name"
        className="bg-card text-card-foreground flex flex-col justify-between gap-6 rounded-xl border pt-4 shadow-sm [--x-padding:theme(spacing.4)] sm:pt-6 sm:[--x-padding:theme(spacing.6)]"
        onSubmit={form.handleSubmit(handleUpdate)}
        noValidate
      >
        <div className="px-[var(--x-padding)]">
          <Label className="text-base select-auto">Account name</Label>
          <p className="text-muted-foreground text-sm">
            This name appears across your Oiper settings and billing emails.
          </p>
        </div>

        <div className="max-w-lg space-y-4 px-[var(--x-padding)]">
          <div className="space-y-2">
            <Label htmlFor="account-name-input">What should we call you?</Label>
            <Input
              id="account-name-input"
              placeholder="Name"
              disabled={updateProfileMutation.isPending}
              {...form.register('name')}
            />
            {form.formState.errors.name?.message ? (
              <p className="text-destructive text-sm">
                {form.formState.errors.name.message}
              </p>
            ) : null}
          </div>

          <div className="bg-muted/35 rounded-lg border px-4 py-3 text-sm">
            <div className="font-medium">{profile.email}</div>
            <div className="text-muted-foreground mt-1">
              Primary email for login, receipts, and subscription updates.
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 border-t px-[var(--x-padding)] py-4">
          <p className="text-muted-foreground text-sm text-balance">
            Keep your name consistent with the account owner on invoices
          </p>

          <Button
            type="submit"
            disabled={
              updateProfileMutation.isPending ||
              !form.formState.isValid ||
              name.trim() === profile.label
            }
          >
            {updateProfileMutation.isPending ? <Spinner /> : 'Save'}
          </Button>
        </div>
      </form>
    </div>
  )
}

function AccountDangerZone() {
  const { currentUser } = useAuth()
  const queryClient = useQueryClient()
  const deleteAccountMutation = $api.useMutation('delete', '/v1/account')
  const confirmationText = `DELETE ${getOptionalUserLabel(currentUser)}`

  async function handleDeleteAccount() {
    try {
      const headers = await getAccountMutationHeaders()
      await deleteAccountMutation.mutateAsync({
        params: {
          header: headers,
        },
      })

      clearAccountSession(queryClient)
      toast.success('Account deleted successfully')
      window.location.assign('/')
    } catch {
      toast.error('Account deletion failed')
    }
  }

  return (
    <div
      id="danger-zone"
      className="border-destructive/40 bg-destructive/5 flex flex-col gap-6 rounded-lg border p-4 sm:p-6"
    >
      <div className="space-y-0.5">
        <h2 className="text-destructive text-lg font-semibold">Danger Zone</h2>
        <p className="text-muted-foreground text-sm">
          These actions are permanent and cannot be undone.
        </p>
      </div>

      <div className="flex">
        <AccountDeleteModal
          confirmationText={confirmationText}
          isDeleting={deleteAccountMutation.isPending}
          onDelete={handleDeleteAccount}
        >
          <Button variant="destructive">
            <Trash2 className="size-4" />
            Delete Account
          </Button>
        </AccountDeleteModal>
      </div>
    </div>
  )
}

export function SettingsPage() {
  return (
    <div id="settings" className="mx-auto flex w-full flex-col gap-6 md:gap-8">
      <div className="mx-auto grid w-full max-w-6xl gap-0.5">
        <h1 className="text-lg font-semibold">Account Settings</h1>
        <p className="text-muted-foreground text-sm">
          Manage your account settings
        </p>
      </div>

      <ConfigureAccount />
      <Separator />
      <AccountDangerZone />
    </div>
  )
}
