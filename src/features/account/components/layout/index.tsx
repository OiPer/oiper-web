import { Sidenav } from './layout'

export function AccountLayoutClientWrapper({
  children,
}: React.PropsWithChildren) {
  return <Sidenav>{children}</Sidenav>
}
