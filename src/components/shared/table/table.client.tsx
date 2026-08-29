'use client'

import { GlowingEdge } from '@/components/shared/glowing-edge'
import { getHeader } from '@/components/shared/table/utility'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import * as React from 'react'
import { ClientDataTablePagination } from './table-pagination.client'
import { DataTableViewOptions } from './table-view-options'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  isSelectable?: boolean
  initiallyHiddenColumns?: string[]
  loading?: boolean
  toolbarClassName?: string
  tableWrapperClassName?: string
  paginationClassName?: string
  searchInputClassName?: string
}

export function ClientDataTable<TData, TValue>({
  columns,
  data,
  isSelectable = false,
  loading = false,
  initiallyHiddenColumns = [],
  toolbarClassName,
  tableWrapperClassName,
  paginationClassName,
  searchInputClassName,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = React.useState('')
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>(() => {
      const initialVisibility: VisibilityState = {}
      initiallyHiddenColumns.forEach((columnId) => {
        initialVisibility[columnId as string] = false
      })
      return initialVisibility
    })
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )

  const table = useReactTable({
    data,
    columns,
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    enableColumnFilters: true,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
  })

  const canFilterColumns = React.useMemo(
    () =>
      table
        .getAllColumns()
        .filter((c) => c.getCanGlobalFilter())
        .map(getHeader)
        .map((header) => header.toLowerCase()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  return (
    <div>
      <div className={cn('flex items-center py-4', toolbarClassName)}>
        <Input
          placeholder={`Search by ${new Intl.ListFormat().format(canFilterColumns)}`}
          value={globalFilter}
          onChange={(event) => setGlobalFilter(event.target.value)}
          className={cn('max-w-sm', searchInputClassName)}
        />

        <DataTableViewOptions table={table} />
      </div>

      <GlowingEdge size="0.3rem" always={loading}>
        <div
          className={cn(
            'bg-background rounded-md border',
            tableWrapperClassName
          )}
        >
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow className="h-32">
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </GlowingEdge>

      <div className={cn('py-4', paginationClassName)}>
        <ClientDataTablePagination table={table} isSelectable={isSelectable} />
      </div>
    </div>
  )
}
