import type { ReactNode } from 'react'

export function StateTile(props: {
  title: string
  description: string
  note?: string
  children: ReactNode
}) {
  return (
    <div className="border-border bg-card/40 flex flex-col gap-3 rounded-xl border p-4">
      <div className="space-y-1">
        {props.note && (
          <p className="text-muted-foreground text-[11px] font-medium tracking-wide uppercase">
            {props.note}
          </p>
        )}
        <p className="text-sm font-semibold">{props.title}</p>
        <p className="text-muted-foreground text-xs leading-relaxed">
          {props.description}
        </p>
      </div>
      <div>{props.children}</div>
    </div>
  )
}

export function StateSection(props: {
  id: string
  title: string
  description: string
  children: ReactNode
}) {
  return (
    <section id={props.id} className="flex flex-col gap-4">
      <div>
        <h2 className="text-base font-semibold">{props.title}</h2>
        <p className="text-muted-foreground text-sm">{props.description}</p>
      </div>
      {props.children}
    </section>
  )
}
