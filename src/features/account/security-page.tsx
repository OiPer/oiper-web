'use client'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Spinner } from '@/components/ui/spinner'
import { useAuth } from '@/features/auth/auth-context'
import { $api } from '@/lib/api/client'
import { toast } from 'sonner'

function PasswordReset() {
  const { currentUser } = useAuth()
  const requestResetMutation = $api.useMutation(
    'post',
    '/v1/auth/web/password-reset/request'
  )

  if (!currentUser) {
    throw new Error('Account security requires an authenticated user')
  }

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
      toast.error('Could not send password reset email')
    }
  }

  return (
    <section
      id="change-password"
      className="bg-card text-card-foreground flex flex-col justify-between gap-6 rounded-xl border pt-4 shadow-sm [--x-padding:theme(spacing.4)] sm:pt-6 sm:[--x-padding:theme(spacing.6)]"
    >
      <div className="px-[var(--x-padding)]">
        <Label className="text-base select-auto">Password</Label>
        <p className="text-muted-foreground text-sm">
          Send a reset link to change your password.
        </p>
      </div>

      <div className="max-w-lg space-y-4 px-[var(--x-padding)]">
        <div className="bg-muted/35 rounded-lg border px-4 py-3 text-sm">
          <div className="font-medium">{email}</div>
          <div className="text-muted-foreground mt-1">
            We will send a password reset link to this email address.
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 border-t px-[var(--x-padding)] py-4">
        <p className="text-muted-foreground text-sm text-balance">
          Use the link in the email to open the reset page and create a new
          password
        </p>

        <Button
          type="button"
          disabled={requestResetMutation.isPending}
          onClick={() => void handleSendResetEmail()}
        >
          {requestResetMutation.isPending ? <Spinner /> : 'Send reset email'}
        </Button>
      </div>
    </section>
  )
}

export function SecurityPage() {
  return (
    <div id="settings" className="mx-auto flex w-full flex-col gap-6 md:gap-8">
      <div className="mx-auto grid w-full max-w-6xl gap-0.5">
        <h1 className="text-lg font-semibold">Account Security</h1>
        <p className="text-muted-foreground text-sm">
          Manage your account security settings
        </p>
      </div>

      <PasswordReset />
    </div>
  )
}
