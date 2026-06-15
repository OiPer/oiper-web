'use client'

import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { useAuth } from '@/features/auth/auth-context'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { AuthCard } from './auth-card'
import { AuthInput, AuthPasswordInput } from './auth-form-input'
import { buildAuthUrl, getCallbackUrl } from './auth-form-utils'
import { getAuthErrorMessage } from './workos-auth-error'

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

  async function onSubmit(values: SignInSchema) {
    setErrorMessage(null)

    await signIn({
      email: values.email,
      password: values.password,
      onError: (error) => setErrorMessage(getAuthErrorMessage(error)),
      onSuccess: (result) => {
        if ('verificationRequired' in result) {
          return router.push(
            buildAuthUrl({
              mode,
              pathname,
              searchParams: currentSearch,
              page: 'verify-email',
              additionalParams: {
                email: result.email,
                token: result.token,
              },
            })
          )
        }

        if (!result.authenticated) {
          return setErrorMessage('Something went wrong!')
        }

        router.push(callbackUrl)
      },
    })
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
          {form.formState.isSubmitting ? <Spinner /> : 'Sign in'}
        </Button>
      </form>
    </AuthCard>
  )
}
