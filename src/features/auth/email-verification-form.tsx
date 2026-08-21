'use client'

import { Button, Loading } from '@/components/ui/button'
import { useAuth } from '@/features/auth/auth-context'
import { getAppErrorCode } from '@/lib/api/error'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { AuthCard } from './auth-card'
import { AuthFormError, AuthInput, AuthSubmitButton } from './auth-form-input'
import { getCallbackUrl } from './auth-form-utils'

type VerificationFormProps = {
  mode: 'modal' | 'page'
}

const emailVerificationSchema = z.object({
  otp: z
    .string()
    .trim()
    .min(4, 'Verification code must be at least 4 characters')
    .max(12, 'Verification code is too long'),
})

type EmailVerificationForm = z.infer<typeof emailVerificationSchema>

export function EmailVerificationForm({ mode }: VerificationFormProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { resendVerification, verifyEmail } = useAuth()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isResending, setIsResending] = useState(false)
  const currentSearch = new URLSearchParams(searchParams.toString())
  const callbackUrl = getCallbackUrl(currentSearch)

  const pendingAuthenticationToken = searchParams.get('pat')
  const email = searchParams.get('email')
  const emailVerificationId = searchParams.get('evid')

  const form = useForm<EmailVerificationForm>({
    resolver: zodResolver(emailVerificationSchema),
    defaultValues: {
      otp: '',
    },
  })

  if (!pendingAuthenticationToken || !email) return null

  const verificationEmail = email
  const verificationToken = pendingAuthenticationToken

  async function handleEmailVerification(values: EmailVerificationForm) {
    setErrorMessage(null)

    try {
      const session = await verifyEmail({
        pat: verificationToken,
        otp: values.otp.trim(),
      })

      if (!session.authenticated) {
        return setErrorMessage('Unable to verify email')
      }

      router.push(callbackUrl)
    } catch (error) {
      const code = getAppErrorCode<'post', '/v1/auth/web/verify-email'>(error)
      switch (code) {
        case 'AUTH_INVALID_VERIFICATION_CODE':
          return setErrorMessage('Invalid verification code')
        default:
          return setErrorMessage('Something went wrong')
      }
    }
  }

  async function handleResend() {
    setErrorMessage(null)
    setIsResending(true)

    try {
      if (!emailVerificationId) {
        return toast.info('Restart sign-in to get a new code')
      }

      const response = await resendVerification({ evid: emailVerificationId })

      if (response.alreadyVerified) {
        toast.info('Email already verified. Sign in again to continue')
      }
      if (!response.alreadyVerified) toast.success('Verification code sent')
    } catch {
      setErrorMessage("Couldn't resend the code")
    } finally {
      setIsResending(false)
    }
  }

  return (
    <AuthCard
      mode={mode}
      page="signup"
      title="Verify your email"
      description="Enter the code we emailed to finish signing you in."
      showOAuth={false}
    >
      <form
        onSubmit={form.handleSubmit(handleEmailVerification)}
        className="flex flex-col gap-4"
      >
        <div className="rounded-lg border border-white/15 bg-white/5 p-4">
          <p className="text-sm text-white/80">
            Code Sent to{' '}
            <span className="font-medium text-white">{verificationEmail}</span>
          </p>
        </div>

        <AuthInput
          type="text"
          label="Verification code"
          inputMode="numeric"
          maxLength={12}
          placeholder="Enter your code"
          {...form.register('otp')}
          error={form.formState.errors.otp?.message}
        />

        <AuthFormError message={errorMessage} />

        <AuthSubmitButton loading={form.formState.isSubmitting}>
          Verify email
        </AuthSubmitButton>

        <Button
          type="button"
          variant="ghost"
          className="h-8 text-white/70 hover:bg-white/10 hover:text-white"
          onClick={handleResend}
          disabled={isResending || form.formState.isSubmitting}
        >
          <Loading loading={isResending}>Resend code</Loading>
        </Button>
      </form>
    </AuthCard>
  )
}
