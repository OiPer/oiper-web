'use client'

import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { useAuth } from '@/features/auth/auth-context'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { AuthCard } from './auth-card'
import { AuthInput } from './auth-form-input'
import { getCallbackUrl } from './auth-form-utils'
import { getAuthErrorMessage } from './workos-auth-error'

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

  const token = searchParams.get('token')
  const email = searchParams.get('email')

  const form = useForm<EmailVerificationForm>({
    resolver: zodResolver(emailVerificationSchema),
    defaultValues: {
      otp: '',
    },
  })

  if (!token || !email) return null

  const verificationToken = token
  const verificationEmail = email

  async function handleEmailVerification(values: EmailVerificationForm) {
    setErrorMessage(null)

    try {
      const session = await verifyEmail({
        token: verificationToken,
        otp: values.otp.trim(),
      })

      if (!session.authenticated) {
        return setErrorMessage('Unable to verify email')
      }

      router.push(callbackUrl)
    } catch (error) {
      setErrorMessage(getAuthErrorMessage(error))
    }
  }

  async function handleResend() {
    setErrorMessage(null)
    setIsResending(true)

    try {
      const response = await resendVerification({
        email: verificationEmail,
      })

      if (response.alreadyVerified) toast.info('Email already verified')
      if (!response.alreadyVerified) toast.success('Verification code sent')
    } catch (error) {
      setErrorMessage(getAuthErrorMessage(error))
    } finally {
      setIsResending(false)
    }
  }

  return (
    <AuthCard
      mode={mode}
      page="signup"
      title="Verify your email"
      description="Enter the verification code sent to your email"
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

        {errorMessage ? (
          <p className="rounded-md border border-red-300/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
            {errorMessage}
          </p>
        ) : null}

        <Button
          type="submit"
          className="h-9 bg-white text-black hover:bg-white/90"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? <Spinner /> : 'Verify email'}
        </Button>

        <Button
          type="button"
          variant="ghost"
          className="h-8 text-white/70 hover:bg-white/10 hover:text-white"
          onClick={handleResend}
          disabled={isResending || form.formState.isSubmitting}
        >
          {isResending ? <Spinner /> : 'Resend code'}
        </Button>
      </form>
    </AuthCard>
  )
}
