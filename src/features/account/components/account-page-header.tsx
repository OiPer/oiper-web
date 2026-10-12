import type { ReactNode } from 'react'

export function AccountPageHeader(props: {
  id: string
  title: string
  description: ReactNode
  children: ReactNode
}) {
  return (
    <div id={props.id} className="mx-auto flex w-full flex-col gap-6 md:gap-8">
      <div className="mx-auto grid w-full max-w-6xl gap-0.5">
        <h1 className="text-lg font-semibold">{props.title}</h1>
        <p className="text-muted-foreground text-sm">{props.description}</p>
      </div>

      {props.children}
    </div>
  )
}
