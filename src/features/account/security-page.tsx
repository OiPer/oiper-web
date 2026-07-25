'use client'

import { ResponsiveDialog } from '@/components/shared/responsive-dialog'
import { Button } from '@/components/ui/button'
import { DialogFooter } from '@/components/ui/dialog'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import { Label } from '@/components/ui/label'
import { getOptionalUserLabel } from '@/features/account/utils'
import { useAuth } from '@/features/auth/auth-context'
import { AuthPasswordInput } from '@/features/auth/auth-form-input'
import { cn } from '@/lib/utils'
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp'
import { useEffect, useMemo, useState } from 'react'

function SecurityPassword({ children }: React.PropsWithChildren) {
  return (
    <div
      className={cn(
        'bg-muted/35 rounded-lg border px-4 py-3 font-mono text-sm tracking-[0.22em]',
        'text-foreground/80'
      )}
    >
      {children}
    </div>
  )
}

function PasswordChange() {
  const { currentUser } = useAuth()

  const email = currentUser?.email ?? 'account@oiper.com'
  const name = useMemo(() => getOptionalUserLabel(currentUser), [currentUser])

  const [password, setPassword] = useState('')
  const [code, setCode] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setCode('')
  }, [password])

  return (
    <div className="space-y-6">
      <form
        id="change-password"
        className="bg-card text-card-foreground flex flex-col justify-between gap-6 rounded-xl border pt-4 shadow-sm [--x-padding:theme(spacing.4)] sm:pt-6 sm:[--x-padding:theme(spacing.6)]"
        onSubmit={(event) => {
          event.preventDefault()
          setIsOpen(true)
        }}
        noValidate
      >
        <div className="px-[var(--x-padding)]">
          <Label className="text-base select-auto">Password</Label>
          <p className="text-muted-foreground text-sm">
            Change your password to enhance account security.
          </p>
        </div>

        <div className="max-w-lg px-[var(--x-padding)]">
          <AuthPasswordInput
            id="new-password"
            label="New password"
            placeholder="New Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="border-input text-foreground placeholder:text-muted-foreground bg-transparent pr-10"
            toggleClassName="text-muted-foreground hover:text-foreground"
          />
        </div>

        <div className="flex items-center justify-between gap-2 border-t px-[var(--x-padding)] py-4">
          <p className="text-muted-foreground text-sm">
            We will verify the change by sending a code to {email}.
          </p>

          <Button type="submit" disabled={!password.trim()}>
            Send Code
          </Button>
        </div>
      </form>

      <ResponsiveDialog open={isOpen} onOpenChange={setIsOpen} key={password}>
        <ResponsiveDialog.Content
          onInteractOutside={(event) => event.preventDefault()}
        >
          <div className="space-y-1">
            <ResponsiveDialog.Title>Confirm Password</ResponsiveDialog.Title>
            <ResponsiveDialog.Description>
              We have sent a 6-digit verification code to {email} for {name}.
            </ResponsiveDialog.Description>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <Label>Password</Label>
              <SecurityPassword>
                {password
                  ? '\u2022'.repeat(password.length)
                  : '\u2022'.repeat(8)}
              </SecurityPassword>
            </div>

            <div className="flex flex-col gap-2">
              <Label>One time code</Label>

              <InputOTP
                maxLength={6}
                pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                value={code}
                onChange={setCode}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
          </div>

          <DialogFooter className="flex flex-row justify-end gap-2">
            <Button
              variant="secondary"
              type="button"
              onClick={() => setCode('')}
            >
              Resend code
            </Button>

            <Button
              type="button"
              className="px-6"
              disabled={code.length !== 6}
              onClick={() => setIsOpen(false)}
            >
              Submit
            </Button>
          </DialogFooter>
        </ResponsiveDialog.Content>
      </ResponsiveDialog>
    </div>
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

      <PasswordChange />
    </div>
  )
}
