'use client'

import { Button } from '@/components/ui/button'
import { verifyEmailForWebAuth } from '@/lib/auth-api'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { z } from 'zod'
import { AuthCard } from './auth-card'
import { AuthInput } from './auth-form-input'
import { getAuthErrorMessage } from './workos-auth-error'

const verificationSchema = z.object({
  code: z.string().min(4, 'Verification code must be at least 4 characters'),
})

type VerificationFormProps = {
  mode: 'modal' | 'page'
  type: 'signin' | 'signup'
}

function resolveCallbackPath(searchParams: URLSearchParams): string {
  const callbackPath = searchParams.get('callbackPath')

  if (!callbackPath || !callbackPath.startsWith('/')) {
    return '/'
  }

  if (callbackPath.startsWith('//')) {
    return '/'
  }

  return callbackPath
}

export function EmailVerificationForm({ mode, type }: VerificationFormProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [verificationCode, setVerificationCode] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)

  const callbackPath = resolveCallbackPath(
    new URLSearchParams(searchParams.toString())
  )

  const pendingToken = searchParams.get('pendingToken')
  const email = searchParams.get('email')

  if (!pendingToken) {
    router.push(type === 'signin' ? '/auth/signin' : '/auth/signup')
    return null
  }

  async function handleEmailVerification() {
    setErrorMessage(null)
    setIsVerifying(true)

    try {
      const session = await verifyEmailForWebAuth({
        code: verificationCode.trim(),
        pendingAuthenticationToken: pendingToken!,
      })

      if (!session.authenticated) {
        setErrorMessage('Something went wrong. Please try again.')
        return
      }

      router.push(callbackPath)
    } catch (error) {
      setErrorMessage(getAuthErrorMessage(error))
    } finally {
      setIsVerifying(false)
    }
  }

  const title = 'Verify your email'
  const description = 'Enter the verification code sent to your email'

  return (
    <AuthCard
      mode={mode}
      page={type}
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
          value={verificationCode}
          onChange={(event) => setVerificationCode(event.target.value)}
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
          disabled={verificationCode.trim().length < 4 || isVerifying}
        >
          {isVerifying ? 'Verifying...' : 'Verify email'}
        </Button>

        <p className="text-center text-xs text-white/60">
          Didn&lsquo;t receive the code? [Resend Code]
        </p>
      </div>
    </AuthCard>
  )
}
