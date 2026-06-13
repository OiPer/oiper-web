'use client'

import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { useAuth } from '@/features/auth/auth-context'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import { AuthCard } from './auth-card'
import { AuthInput } from './auth-form-input'
import { getCallbackUrl } from './auth-form-utils'
import { getAuthErrorMessage } from './workos-auth-error'

type VerificationFormProps = {
  mode: 'modal' | 'page'
}

export function EmailVerificationForm({ mode }: VerificationFormProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { resendVerification, verifyEmail } = useAuth()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [otp, setOtp] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const currentSearch = new URLSearchParams(searchParams.toString())
  const callbackUrl = getCallbackUrl(currentSearch)

  const token = searchParams.get('token')
  const email = searchParams.get('email')

  if (!token || !email) return null

  async function handleEmailVerification() {
    setErrorMessage(null)
    setIsVerifying(true)

    await verifyEmail({
      token: token!,
      otp: otp.trim(),
      finally: () => setIsVerifying(false),
      onError: (error) => setErrorMessage(getAuthErrorMessage(error)),
      onSuccess: (session) => {
        if (!session.authenticated) {
          return setErrorMessage('Something went wrong')
        }

        router.push(callbackUrl)
      },
    })
  }

  async function handleResend() {
    setErrorMessage(null)
    setIsResending(true)

    await resendVerification({
      email: email!,
      finally: () => setIsResending(false),
      onError: (error) => setErrorMessage(getAuthErrorMessage(error)),
      onSuccess: (response) => {
        if (response.alreadyVerified) toast.info('Email already verified')
        if (!response.alreadyVerified) toast.success('Verification code sent')
      },
    })
  }

  return (
    <AuthCard
      mode={mode}
      page="signup"
      title="Verify your email"
      description="Enter the verification code sent to your email"
      showOAuth={false}
    >
      <div className="flex flex-col gap-4">
        <div className="rounded-lg border border-white/15 bg-white/5 p-4">
          <p className="text-sm text-white/80">
            Code Sent to{' '}
            <span className="font-medium text-white">
              {email || 'Your email'}
            </span>
          </p>
        </div>

        <AuthInput
          type="text"
          label="Verification code"
          inputMode="numeric"
          maxLength={12}
          value={otp}
          onChange={(event) => setOtp(event.target.value)}
          placeholder="Enter your code"
        />

        {errorMessage ? (
          <p className="rounded-md border border-red-300/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
            {errorMessage}
          </p>
        ) : null}

        <Button
          type="button"
          className="h-9 bg-white text-black hover:bg-white/90"
          onClick={handleEmailVerification}
          disabled={otp.trim().length < 4 || isVerifying}
        >
          {isVerifying ? <Spinner /> : 'Verify email'}
        </Button>

        <Button
          type="button"
          variant="ghost"
          className="h-8 text-white/70 hover:bg-white/10 hover:text-white"
          onClick={handleResend}
          disabled={isResending || isVerifying}
        >
          {isResending ? <Spinner /> : 'Resend code'}
        </Button>
      </div>
    </AuthCard>
  )
}
