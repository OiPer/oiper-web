'use client'

import { Input as BaseInput } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { Eye, EyeOff } from 'lucide-react'
import type { ComponentProps } from 'react'
import { useState } from 'react'

type AuthInputProps = ComponentProps<'input'> & {
  label?: string
  error?: string
  wrapperClassName?: string
}

export function AuthInput({
  label,
  error,
  wrapperClassName,
  className,
  ...props
}: AuthInputProps) {
  return (
    <div
      className={cn('flex w-full flex-col gap-2', wrapperClassName)}
      data-invalid={Boolean(error)}
      data-disabled={props.disabled}
    >
      {label ? <Label>{label}</Label> : null}

      <BaseInput
        {...props}
        className={cn(
          'h-9 border-white/20 bg-white/5 text-white placeholder:text-white/45',
          className
        )}
        placeholder={props.placeholder ?? label?.replace(/\s*\*$/, '')}
        aria-invalid={Boolean(error)}
      />

      {error ? <p className="text-sm text-red-300">{error}</p> : null}
    </div>
  )
}

type AuthPasswordInputProps = Omit<ComponentProps<'input'>, 'type'> & {
  label?: string
  error?: string
  wrapperClassName?: string
}

export function AuthPasswordInput({
  label,
  error,
  wrapperClassName,
  className,
  ...props
}: AuthPasswordInputProps) {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div
      className={cn('flex w-full flex-col gap-2', wrapperClassName)}
      data-invalid={Boolean(error)}
      data-disabled={props.disabled}
    >
      {label ? <Label>{label}</Label> : null}

      <div className="relative">
        <BaseInput
          {...props}
          type={isVisible ? 'text' : 'password'}
          className={cn(
            'h-9 border-white/20 bg-white/5 pr-10 text-white placeholder:text-white/45',
            className
          )}
          placeholder={props.placeholder ?? label?.replace(/\s*\*$/, '')}
          aria-invalid={Boolean(error)}
        />

        <button
          type="button"
          onClick={() => setIsVisible((value) => !value)}
          className="absolute top-1/2 right-3 -translate-y-1/2 text-white/60 hover:text-white"
        >
          {isVisible ? (
            <Eye className="size-4" />
          ) : (
            <EyeOff className="size-4" />
          )}
          <span className="sr-only">
            {isVisible ? 'Hide password' : 'Show password'}
          </span>
        </button>
      </div>

      {error ? <p className="text-sm text-red-300">{error}</p> : null}
    </div>
  )
}
