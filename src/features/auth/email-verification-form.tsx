'use client'

import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { useAuth } from '@/features/auth/auth-context'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import { AuthCard } from './auth-card'
import { AuthInput } from './auth-form-input'
import { resolveCallbackUrl } from './auth-form-utils'
import { getAuthErrorMessage } from './workos-auth-error'

type VerificationFormProps = {
  mode: 'modal' | 'page'
}

export function EmailVerificationForm({ mode }: VerificationFormProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { resendSignUpVerification, verifySignUpEmail } = useAuth()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [otp, setOtp] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)
  const [isResending, setIsResending] = useState(false)

  const callbackUrl = resolveCallbackUrl(
    new URLSearchParams(searchParams.toString())
  )

  const signUpCode = searchParams.get('code')
  const email = searchParams.get('email')

  if (!signUpCode) {
    router.push('/auth/signup')
    return null
  }

  async function handleEmailVerification() {
    setErrorMessage(null)
    setIsVerifying(true)

    const [session, error] = await verifySignUpEmail({
      code: signUpCode!,
      otp: otp.trim(),
    })

    if (error) {
      setErrorMessage(getAuthErrorMessage(error))
      return setIsVerifying(false)
    }

    if (!session || !session.authenticated) {
      setErrorMessage('Something went wrong')
      return setIsVerifying(false)
    }

    router.push(callbackUrl)
    setIsVerifying(false)
  }

  async function handleResend() {
    setErrorMessage(null)
    setIsResending(true)

    const [response, error] = await resendSignUpVerification({
      code: signUpCode!,
    })

    if (error) {
      setErrorMessage(getAuthErrorMessage(error))
      return setIsResending(false)
    }

    if (!response) {
      setErrorMessage('Something went wrong!')
      return setIsResending(false)
    }

    if (response.alreadyVerified) toast.info('Email already verified')
    if (!response.alreadyVerified) toast.success('Verification code sent')
    setIsResending(false)
  }

  const title = 'Verify your email'
  const description = 'Enter the verification code sent to your email'

  return (
    <AuthCard
      mode={mode}
      page="signup"
      title={title}
      description={description}
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
