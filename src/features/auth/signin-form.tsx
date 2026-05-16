'use client'

import { Button } from '@/components/ui/button'
import { signInWithPassword, verifyEmailForWebAuth } from '@/lib/auth-api'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { AuthCard } from './auth-card'
import { AuthInput, AuthPasswordInput } from './auth-form-input'
import {
  getAuthErrorMessage,
  getEmailVerificationState,
} from './workos-auth-error'

const signInSchema = z.object({
  email: z.string().trim().email('Enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

type SignInSchema = z.infer<typeof signInSchema>

type SignInFormProps = {
  mode: 'modal' | 'page'
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

export function SignInForm({ mode }: SignInFormProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [verificationState, setVerificationState] = useState<{
    pendingAuthenticationToken: string
    email?: string
  } | null>(null)
  const [verificationCode, setVerificationCode] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)

  const callbackPath = useMemo(
    () => resolveCallbackPath(new URLSearchParams(searchParams.toString())),
    [searchParams]
  )

  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: searchParams.get('email') ?? '',
      password: '',
    },
  })

  const forgotHref = useMemo(() => {
    const next = new URLSearchParams(searchParams.toString())
    next.set('email', form.getValues('email'))

    if (mode === 'modal') {
      next.set('auth-page', 'forgot-password')
      const query = next.toString()
      return query ? `${pathname}?${query}` : pathname
    }

    next.delete('auth-page')
    const query = next.toString()
    return query ? `/auth/forgot-password?${query}` : '/auth/forgot-password'
  }, [form, mode, pathname, searchParams])

  async function onSubmit(values: SignInSchema) {
    setErrorMessage(null)
    setVerificationState(null)

    try {
      const session = await signInWithPassword(values)

      if (!session.authenticated) {
        setErrorMessage('Something went wrong. Please try again.')
        return
      }

      router.push(callbackPath)
    } catch (error) {
      const verification = getEmailVerificationState(error)

      if (verification) {
        setVerificationState(verification)
        return
      }

      setErrorMessage(getAuthErrorMessage(error))
    }
  }

  async function handleEmailVerification() {
    if (!verificationState) {
      return
    }

    setErrorMessage(null)
    setIsVerifying(true)

    try {
      const session = await verifyEmailForWebAuth({
        code: verificationCode.trim(),
        pendingAuthenticationToken:
          verificationState.pendingAuthenticationToken,
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

  return (
    <AuthCard
      mode={mode}
      page="signin"
      title="Welcome back"
      description="Sign in to your account to continue."
    >
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <AuthInput
          type="email"
          label="Email"
          autoComplete="email"
          {...form.register('email')}
          error={form.formState.errors.email?.message}
        />

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-medium text-white">Password</p>
            <Link
              href={forgotHref}
              className="text-xs text-white/65 underline underline-offset-4 hover:text-white"
              scroll={false}
            >
              Forgot password?
            </Link>
          </div>
          <AuthPasswordInput
            placeholder="Password"
            autoComplete="current-password"
            {...form.register('password')}
            error={form.formState.errors.password?.message}
          />
        </div>

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
          {form.formState.isSubmitting ? 'Signing in...' : 'Sign in'}
        </Button>
      </form>

      {verificationState ? (
        <div className="mt-5 space-y-3 rounded-lg border border-white/15 bg-white/5 p-3">
          <p className="text-sm text-white/80">
            Enter the verification code sent to{' '}
            <span className="font-medium text-white">
              {verificationState.email ?? form.getValues('email')}
            </span>
            .
          </p>
          <AuthInput
            type="text"
            inputMode="numeric"
            maxLength={12}
            value={verificationCode}
            onChange={(event) => setVerificationCode(event.target.value)}
            placeholder="Verification code"
          />
          <Button
            type="button"
            variant="outline"
            className="h-9 w-full border-white/20 bg-transparent text-white hover:bg-white/10"
            onClick={handleEmailVerification}
            disabled={verificationCode.trim().length < 4 || isVerifying}
          >
            {isVerifying ? 'Verifying...' : 'Verify email'}
          </Button>
        </div>
      ) : null}
    </AuthCard>
  )
}
