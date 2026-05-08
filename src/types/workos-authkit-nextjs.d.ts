declare module '@workos-inc/authkit-nextjs' {
  export type TAuthUser = {
    id: string
    email?: string | null
    firstName?: string | null
    lastName?: string | null
  }

  export function getSignInUrl(input?: {
    returnPathname?: string
  }): Promise<string>

  export function withAuth(): Promise<{
    user?: TAuthUser
    accessToken?: string
  }>

  export function signOut(): Promise<void>

  export function handleAuth(): (request: Request) => Promise<Response>
  export function authkitMiddleware(): (
    request: Request
  ) => Response | Promise<Response>
}

declare module '@workos-inc/authkit-nextjs/components' {
  import type { PropsWithChildren } from 'react'

  export function AuthKitProvider(props: PropsWithChildren): JSX.Element
}
