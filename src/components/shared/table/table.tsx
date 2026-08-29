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
import {
  ColumnDef,
  OnChangeFn,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { Loader2 } from 'lucide-react'
import * as React from 'react'
import { useCallback } from 'react'
import { DataTablePagination } from './table-pagination'
import { DataTableViewOptions } from './table-view-options'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  pageSize: number
  currentPage: number
  totalRows: number
  onPaginationChange: (page: number, pageSize: number) => void
  onSearchChange: (value: string) => void
  onSortingChange?: (sortingField: string | undefined) => void
  loading?: boolean
  searchValue: string
  isSelectable?: boolean
  initiallyHiddenColumns?: string[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pageSize,
  currentPage,
  totalRows,
  onPaginationChange,
  onSearchChange,
  onSortingChange,
  loading = false,
  searchValue,
  isSelectable = false,
  initiallyHiddenColumns = [],
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>(() => {
      const initialVisibility: VisibilityState = {}
      initiallyHiddenColumns.forEach((columnId) => {
        initialVisibility[columnId] = false
      })
      return initialVisibility
    })

  const [rowSelection, setRowSelection] = React.useState({})

  const handleSortingChange: OnChangeFn<SortingState> = React.useCallback(
    (updater) => {
      const newSorting =
        typeof updater === 'function' ? updater(sorting) : updater
      setSorting(newSorting)

      if (onSortingChange && newSorting.length > 0) {
        const sortItem = newSorting[0]
        const sortingField = `${sortItem.id}.${sortItem.desc ? 'desc' : 'asc'}`
        onSortingChange(sortingField)
      } else if (onSortingChange) {
        onSortingChange(undefined)
      }
    },
    [sorting, onSortingChange]
  )

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualSorting: true,
    manualPagination: true,

    pageCount: Math.ceil(totalRows / pageSize),
    onColumnVisibilityChange: setColumnVisibility,
    onSortingChange: handleSortingChange,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      pagination: {
        pageIndex: currentPage - 1,
        pageSize,
      },
    },
  })

  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onSearchChange(event.target.value)
    },
    [onSearchChange]
  )

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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <Input
            placeholder={`Search by ${new Intl.ListFormat().format(canFilterColumns)}`}
            value={searchValue}
            onChange={handleSearchChange}
            className="max-w-sm"
          />
        </div>
        <DataTableViewOptions table={table} />
      </div>

      <GlowingEdge always={loading} size="0.3rem">
        <div className="bg-background relative rounded-md border">
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
              {data.length === 0 ? (
                <TableRow className="h-32">
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    {loading ? (
                      <div className="flex h-full items-center justify-center">
                        <Loader2 className="text-muted-foreground size-8 animate-spin" />
                      </div>
                    ) : (
                      'No results'
                    )}
                  </TableCell>
                </TableRow>
              ) : (
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
              )}
            </TableBody>
          </Table>
        </div>
      </GlowingEdge>

      <DataTablePagination
        table={table}
        totalRows={totalRows}
        pageSize={pageSize}
        currentPage={currentPage}
        onPaginationChange={onPaginationChange}
        isSelectable={isSelectable}
      />
    </div>
  )
}
