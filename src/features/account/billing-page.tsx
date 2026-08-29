import { Button } from '@/components/ui/button'
import { BillingInvoicesTable } from '@/features/account/billing-invoices-table'

function Dot() {
  return (
    <svg
      className="size-1 fill-current opacity-70"
      viewBox="0 0 4 4"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="2" cy="2" r="2" />
    </svg>
  )
}

const invoiceHistory = [
  {
    invoice: 'INV-2026-0724',
    date: 'July 24, 2026',
    amount: '$12.00',
    status: 'Paid',
  },
  {
    invoice: 'INV-2026-0624',
    date: 'June 24, 2026',
    amount: '$12.00',
    status: 'Paid',
  },
  {
    invoice: 'INV-2026-0524',
    date: 'May 24, 2026',
    amount: '$12.00',
    status: 'Paid',
  },
] as const

function CurrentPlan() {
  return (
    <section
      id="current-plan"
      className="bg-card text-card-foreground flex flex-col justify-between gap-6 rounded-xl border pt-4 shadow-sm [--x-padding:--spacing(4)] sm:pt-6 sm:[--x-padding:--spacing(6)]"
    >
      <div className="px-(--x-padding)">
        <div className="space-y-0.5">
          <h2 className="text-lg font-semibold">Pro Plan</h2>
          <p className="text-muted-foreground flex items-center gap-2 text-sm">
            $12/month
            <Dot />
            Renews August 24 2026
          </p>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 border-t px-(--x-padding) py-4">
        <Button variant="outline">Manage Subscription</Button>
        <Button>Upgrade Plan</Button>
      </div>
    </section>
  )
}

export function BillingPage() {
  return (
    <div id="billing" className="mx-auto flex w-full flex-col gap-6 md:gap-8">
      <div className="mx-auto grid w-full max-w-6xl gap-0.5">
        <h1 className="text-lg font-semibold">Billing & Payments</h1>
        <p className="text-muted-foreground text-sm">
          Manage your Oiper subscription and invoices
        </p>
      </div>

      <CurrentPlan />

      <section
        id="billing-history"
        className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border p-4 pt-5 shadow-sm sm:p-6 sm:pt-8"
      >
        <BillingInvoicesTable invoices={[...invoiceHistory]} />
      </section>
    </div>
  )
}
