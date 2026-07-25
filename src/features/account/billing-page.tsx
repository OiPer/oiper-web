import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { BillingInvoicesTable } from '@/features/account/billing-invoices-table'

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

export function BillingPage() {
  return (
    <div id="billing" className="mx-auto flex w-full flex-col gap-6 md:gap-8">
      <div className="mx-auto grid w-full max-w-6xl gap-0.5">
        <h1 className="text-lg font-semibold">Billing & Payments</h1>
        <p className="text-muted-foreground text-sm">
          Manage your Oiper subscription and invoices
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <Card id="current-plan" className="gap-0 py-0">
          <CardHeader className="border-b py-6">
            <CardTitle className="text-base">Current Plan</CardTitle>
            <CardDescription>
              Your active Oiper subscription and renewal details.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-5 py-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-2xl font-semibold">Pro</div>
                <p className="text-muted-foreground mt-1 text-sm">
                  More speed, more control, more flexibility.
                </p>
              </div>

              <div className="text-right">
                <div className="text-2xl font-semibold">$12</div>
                <p className="text-muted-foreground text-sm">Per month</p>
              </div>
            </div>

            <div className="grid gap-3 text-sm">
              <div className="flex items-center justify-between rounded-lg border px-4 py-3">
                <span className="text-muted-foreground">Billing cycle</span>
                <span className="font-medium">Monthly</span>
              </div>

              <div className="flex items-center justify-between rounded-lg border px-4 py-3">
                <span className="text-muted-foreground">Next billing date</span>
                <span className="font-medium">August 24, 2026</span>
              </div>

              <div className="flex items-center justify-between rounded-lg border px-4 py-3">
                <span className="text-muted-foreground">Included</span>
                <span className="font-medium">Priority GPU acceleration</span>
              </div>
            </div>
          </CardContent>

          <CardFooter className="border-t py-4">
            <div className="flex w-full justify-end gap-2">
              <Button type="button" variant="outline">
                Change Plan
              </Button>
              <Button type="button">Manage Subscription</Button>
            </div>
          </CardFooter>
        </Card>

        <Card id="payment-method" className="gap-0 py-0">
          <CardHeader className="border-b py-6">
            <CardTitle className="text-base">Payment Method</CardTitle>
            <CardDescription>
              Manage your payment method and billing details in Stripe.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-5 py-6">
            <div className="rounded-xl border p-5">
              <p className="font-medium">Visa ending in 4242</p>
              <p className="text-muted-foreground mt-1 text-sm">
                Expires 08/2028
              </p>
            </div>

            <div className="grid gap-3 text-sm">
              <div className="flex items-center justify-between rounded-lg border px-4 py-3">
                <span className="text-muted-foreground">Portal access</span>
                <span className="font-medium">Available</span>
              </div>

              <div className="flex items-center justify-between rounded-lg border px-4 py-3">
                <span className="text-muted-foreground">Receipts</span>
                <span className="font-medium">Monthly</span>
              </div>
            </div>
          </CardContent>

          <CardFooter className="border-t py-4">
            <div className="flex w-full justify-end">
              <Button type="button">Update Payment Method</Button>
            </div>
          </CardFooter>
        </Card>
      </div>

      <Card id="invoice-history" className="gap-0 py-0">
        <CardHeader className="border-b py-6">
          <CardTitle className="text-base">Billing History</CardTitle>
          <CardDescription>Review your recent Oiper invoices.</CardDescription>
        </CardHeader>

        <CardContent className="pt-4 pb-6">
          <BillingInvoicesTable invoices={[...invoiceHistory]} />
        </CardContent>
      </Card>
    </div>
  )
}
