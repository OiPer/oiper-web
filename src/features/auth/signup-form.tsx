'use client'

import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { useAuth } from '@/features/auth/auth-context'
import { zodResolver } from '@hookform/resolvers/zod'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { AuthCard } from './auth-card'
import { AuthInput, AuthPasswordInput } from './auth-form-input'
import { buildAuthUrl } from './auth-form-utils'
import { getAuthErrorMessage } from './workos-auth-error'

const signUpSchema = z
  .object({
    name: z.string().trim().min(1, 'Name is required'),
    email: z.string().trim().email('Enter a valid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(1, 'Confirm password is required'),
  })
  .superRefine((values, context) => {
    if (values.confirmPassword && values.password !== values.confirmPassword) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Passwords do not match',
        path: ['confirmPassword'],
      })
    }
  })

type SignUpSchema = z.infer<typeof signUpSchema>

type SignUpFormProps = {
  mode: 'modal' | 'page'
}

export function SignUpForm({ mode }: SignUpFormProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()
  const { signUp } = useAuth()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const currentSearch = new URLSearchParams(searchParams.toString())

  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: searchParams.get('email') ?? '',
      password: '',
      confirmPassword: '',
    },
  })

  async function onSubmit(values: SignUpSchema) {
    setErrorMessage(null)

    await signUp({
      name: values.name,
      email: values.email,
      password: values.password,
      onError: (error) => {
        setErrorMessage(getAuthErrorMessage(error))
      },
      onSuccess: (signUpResponse) => {
        const verificationPath = buildAuthUrl({
          mode,
          pathname,
          searchParams: currentSearch,
          page: 'verify-signup',
          additionalParams: {
            code: signUpResponse.code,
            email: signUpResponse.email,
          },
        })

        router.push(verificationPath)
      },
    })
  }

  return (
    <AuthCard
      mode={mode}
      page="signup"
      title="Create an account"
      description="Sign up to start using OiPer."
    >
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <AuthInput
          type="text"
          label="Name"
          autoComplete="name"
          {...form.register('name')}
          error={form.formState.errors.name?.message}
        />

        <AuthInput
          type="email"
          label="Email"
          autoComplete="email"
          {...form.register('email')}
          error={form.formState.errors.email?.message}
        />

        <AuthPasswordInput
          label="Password"
          autoComplete="new-password"
          {...form.register('password')}
          error={form.formState.errors.password?.message}
        />

        <AuthPasswordInput
          label="Confirm password"
          autoComplete="new-password"
          {...form.register('confirmPassword')}
          error={form.formState.errors.confirmPassword?.message}
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
          {form.formState.isSubmitting ? <Spinner /> : 'Sign up'}
        </Button>
      </form>
    </AuthCard>
  )
}
