'use client'

import { ClientDataTable } from '@/components/shared/table'
import { DataTableColumnHeader } from '@/components/shared/table/table-column-header'
import type { ColumnDef } from '@tanstack/react-table'

interface InvoiceRow {
  invoice: string
  date: string
  amount: string
  status: string
}

const columns: ColumnDef<InvoiceRow>[] = [
  {
    accessorKey: 'invoice',
    enableHiding: false,
    meta: { header: 'Invoice' },
    header: ({ column }) => (
      <DataTableColumnHeader column={column}>Invoice</DataTableColumnHeader>
    ),
  },
  {
    accessorKey: 'date',
    meta: { header: 'Date' },
    header: ({ column }) => (
      <DataTableColumnHeader column={column}>Date</DataTableColumnHeader>
    ),
  },
  {
    accessorKey: 'amount',
    meta: { header: 'Amount' },
    header: ({ column }) => (
      <DataTableColumnHeader column={column}>Amount</DataTableColumnHeader>
    ),
  },
  {
    accessorKey: 'status',
    meta: { header: 'Status' },
    header: ({ column }) => (
      <DataTableColumnHeader column={column}>Status</DataTableColumnHeader>
    ),
  },
] as const

export function BillingInvoicesTable({ invoices }: { invoices: InvoiceRow[] }) {
  return (
    <ClientDataTable
      columns={columns}
      data={invoices}
      toolbarClassName="pt-0 pb-4"
      tableWrapperClassName="bg-card"
      paginationClassName="pt-4 pb-0"
    />
  )
}
