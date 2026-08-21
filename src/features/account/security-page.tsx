'use client'

import { SectionCard, SectionHeading } from '@/components/shared/section-card'
import { Button, Loading } from '@/components/ui/button'
import { AccountPageHeader } from '@/features/account/components/account-page-header'
import { useRequiredUser } from '@/features/auth/auth-context'
import { $api } from '@/lib/api/client'
import { toast } from 'sonner'

function PasswordReset() {
  const currentUser = useRequiredUser('Account security')
  const requestResetMutation = $api.useMutation(
    'post',
    '/v1/auth/web/password-reset/request'
  )

  const { email } = currentUser

  async function handleSendResetEmail() {
    try {
      await requestResetMutation.mutateAsync({
        body: {
          email,
        },
      })

      toast.success('Password reset email sent')
    } catch {
      toast.error("Couldn't send password reset email")
    }
  }

  return (
    <SectionCard id="change-password">
      <SectionHeading
        title="Password"
        description="Send a reset link to change your password."
      />

      <div className="max-w-lg space-y-4 px-(--x-padding)">
        <div className="bg-muted/35 rounded-lg border px-4 py-3 text-sm">
          <div className="font-medium">{email}</div>
          <div className="text-muted-foreground">
            We will send a password reset link to this email address.
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 border-t px-(--x-padding) py-4">
        <p className="text-muted-foreground text-sm text-balance">
          Use the link in the email to open the reset page and create a new
          password
        </p>

        <Button
          type="button"
          disabled={requestResetMutation.isPending}
          onClick={() => void handleSendResetEmail()}
        >
          <Loading loading={requestResetMutation.isPending}>
            Send reset email
          </Loading>
        </Button>
      </div>
    </SectionCard>
  )
}

export function SecurityPage() {
  return (
    <AccountPageHeader
      id="security"
      title="Account Security"
      description="Manage your account security settings"
    >
      <PasswordReset />
    </AccountPageHeader>
  )
}
