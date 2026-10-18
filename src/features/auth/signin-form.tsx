'use client'

import { useAuth } from '@/features/auth/auth-context'
import { logClick, logComplete, logError, logSubmit } from '@/lib/analytics'
import { getAppErrorCode } from '@/lib/api/error'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, type ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { AuthCard } from './auth-card'
import {
  AuthFormError,
  AuthInput,
  AuthPasswordInput,
  AuthSubmitButton,
} from './auth-form-input'
import { buildAuthUrl, getCallbackUrl } from './auth-form-utils'

const signInSchema = z.object({
  email: z.string().trim().email('Enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

type SignInSchema = z.infer<typeof signInSchema>

export function SignInForm(props: { checkout?: ReactNode }) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { signIn } = useAuth()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const callbackUrl = getCallbackUrl(searchParams)

  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: searchParams.get('email') ?? '',
      password: '',
    },
  })

  const email = form.watch('email')
  const forgotHref = buildAuthUrl('forgot-password', {
    callbackUrl: searchParams.get('callbackUrl'),
    email,
  })

  async function handleSignIn(values: SignInSchema) {
    setErrorMessage(null)
    logSubmit('signin', 'auth')

    try {
      const result = await signIn({
        email: values.email,
        password: values.password,
      })

      if ('type' in result && result.type === 'email_verification') {
        logComplete('signin', 'auth', { outcome: 'email_verification' })
        return router.push(
          buildAuthUrl('verify-email', {
            callbackUrl: searchParams.get('callbackUrl'),
            email: result.email,
            pat: result.pat,
            evid: result.evid,
          })
        )
      }

      if ('authenticated' in result && !result.authenticated) {
        logError('signin', 'auth', { error_type: 'not_authenticated' })
        return setErrorMessage('Something went wrong')
      }

      logComplete('signin', 'auth')
      router.push(callbackUrl)
    } catch (error) {
      const code = getAppErrorCode<'post', '/v1/auth/web/sign-in/password'>(
        error
      )
      logError('signin', 'auth', { error_type: code ?? 'unknown' })

      switch (code) {
        case 'AUTH_INVALID_CREDENTIALS':
          return setErrorMessage('Incorrect email or password')
        case 'AUTH_AUTH_METHOD_NOT_ALLOWED':
          return setErrorMessage(
            'This account must sign in with a different method'
          )
        default:
          return setErrorMessage('Something went wrong')
      }
    }
  }

  return (
    <AuthCard
      checkout={props.checkout}
      page="signin"
      title="Welcome back"
      description="Sign in to your account to continue."
    >
      <form
        onSubmit={form.handleSubmit(handleSignIn)}
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
              onClick={() => logClick('forgot_password', 'auth')}
              className="text-xs text-white/65 underline underline-offset-[5px] hover:text-white"
            >
              Forgot password?
            </Link>
          </div>
          <AuthPasswordInput
            placeholder="Password"
            aria-label="Password"
            autoComplete="current-password"
            {...form.register('password')}
            error={form.formState.errors.password?.message}
          />
        </div>

        <AuthFormError message={errorMessage} />

        <AuthSubmitButton loading={form.formState.isSubmitting}>
          Sign in
        </AuthSubmitButton>
      </form>
    </AuthCard>
  )
}
