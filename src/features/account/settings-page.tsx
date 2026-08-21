'use client'

import { ResponsiveDialog } from '@/components/shared/responsive-dialog'
import { SectionCard, SectionHeading } from '@/components/shared/section-card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button, Loading } from '@/components/ui/button'
import { DialogFooter } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { AccountPageHeader } from '@/features/account/components/account-page-header'
import {
  formatMemberSince,
  getUserInitials,
  getUserLabel,
} from '@/features/account/utils'
import { useRequiredUser } from '@/features/auth/auth-context'
import { getAccountMutationHeaders } from '@/features/auth/web-session'
import { $api } from '@/lib/api/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { Trash2, TriangleAlert } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { clearAccountSession, syncAccountProfileInSession } from './account-api'
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

          <DialogFooter className="flex-row gap-2 *:flex-1 sm:*:flex-none">
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
              <Loading loading={isDeleting}>Delete</Loading>
            </Button>
          </DialogFooter>
        </div>
      </ResponsiveDialog.Content>
    </ResponsiveDialog>
  )
}

function ConfigureAccount() {
  const currentUser = useRequiredUser('Account settings')
  const queryClient = useQueryClient()
  const updateProfileMutation = $api.useMutation('patch', '/v1/account/profile')

  const profile = useMemo(() => {
    return {
      label: getUserLabel(currentUser),
      email: currentUser.email,
      initials: getUserInitials(currentUser),
      image: currentUser.profilePictureUrl ?? undefined,
      memberSince: formatMemberSince(currentUser.createdAt),
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
      toast.error("Couldn't update your account")
    }
  }

  async function handleAvatarSave(profilePictureUrl: string) {
    try {
      await updateProfile({ profilePictureUrl })
      toast.success('Avatar updated successfully')
    } catch (error) {
      toast.error("Couldn't update your avatar")
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

          <div className="flex flex-col space-y-0.5">
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

      <SectionCard
        as="form"
        id="account-name"
        onSubmit={form.handleSubmit(handleUpdate)}
        noValidate
      >
        <SectionHeading
          title="Account name"
          description="This name appears across your Oiper settings and billing emails."
        />

        <div className="max-w-lg space-y-4 px-(--x-padding)">
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
            <div className="text-muted-foreground">
              Primary email for login, receipts, and subscription updates.
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 border-t px-(--x-padding) py-4">
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
            <Loading loading={updateProfileMutation.isPending}>Save</Loading>
          </Button>
        </div>
      </SectionCard>
    </div>
  )
}

function AccountDangerZone() {
  const currentUser = useRequiredUser('Account danger zone')
  const queryClient = useQueryClient()
  const deleteAccountMutation = $api.useMutation('delete', '/v1/account')

  const confirmationText = `DELETE ${getUserLabel(currentUser)}`

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
      toast.error("Couldn't delete account")
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
    <AccountPageHeader
      id="settings"
      title="Account Settings"
      description="Manage your account settings"
    >
      <ConfigureAccount />
      <Separator />
      <AccountDangerZone />
    </AccountPageHeader>
  )
}
