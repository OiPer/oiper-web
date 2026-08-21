'use client'

import { useAuth } from '@/features/auth/auth-context'
import { getAppErrorCode } from '@/lib/api/error'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
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

type SignInFormProps = {
  mode: 'modal' | 'page'
}

export function SignInForm({ mode }: SignInFormProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()
  const { signIn } = useAuth()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const currentSearch = new URLSearchParams(searchParams.toString())
  const callbackUrl = getCallbackUrl(currentSearch)

  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: searchParams.get('email') ?? '',
      password: '',
    },
  })

  const email = form.watch('email')
  const forgotHref = buildAuthUrl({
    mode,
    pathname,
    searchParams: currentSearch,
    page: 'forgot-password',
    additionalParams: { email },
  })

  async function handleSignIn(values: SignInSchema) {
    setErrorMessage(null)

    try {
      const result = await signIn({
        email: values.email,
        password: values.password,
      })

      if ('type' in result && result.type === 'email_verification') {
        return router.push(
          buildAuthUrl({
            mode,
            pathname,
            searchParams: currentSearch,
            page: 'verify-email',
            additionalParams: {
              email: result.email,
              pat: result.pat,
              ...(result.evid ? { evid: result.evid } : {}),
            },
          })
        )
      }

      if ('authenticated' in result && !result.authenticated) {
        return setErrorMessage('Something went wrong')
      }

      router.push(callbackUrl)
    } catch (error) {
      const code = getAppErrorCode<'post', '/v1/auth/web/sign-in/password'>(
        error
      )
      switch (code) {
        case 'AUTH_INVALID_CREDENTIALS':
          return setErrorMessage('Invalid credentials')
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
      mode={mode}
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
              className="text-xs text-white/65 underline underline-offset-[5px] hover:text-white"
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

        <AuthFormError message={errorMessage} />

        <AuthSubmitButton loading={form.formState.isSubmitting}>
          Sign in
        </AuthSubmitButton>
      </form>
    </AuthCard>
  )
}
