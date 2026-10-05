import type { ReactNode } from 'react'

export function StateTile(props: {
  title: string
  description: string
  note?: string
  children: ReactNode
}) {
  return (
    <div className="border-border/60 bg-card/40 flex flex-col gap-4 rounded-xl border p-5">
      <div className="space-y-1">
        {props.note && (
          <p className="text-muted-foreground/70 text-[11px] font-medium tracking-wide uppercase">
            {props.note}
          </p>
        )}
        <p className="text-sm font-medium">{props.title}</p>
        <p className="text-muted-foreground text-[13px] leading-relaxed">
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
    <section id={props.id} className="flex flex-col gap-6">
      <div className="space-y-1">
        <h2 className="text-base font-semibold tracking-tight">
          {props.title}
        </h2>
        <p className="text-muted-foreground max-w-3xl text-sm leading-relaxed">
          {props.description}
        </p>
      </div>
      {props.children}
    </section>
  )
}
