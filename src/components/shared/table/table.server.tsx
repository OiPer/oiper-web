'use client'

import { useDebouncedState } from '@/hooks/use-debounced-state'
import { useUrlSearchParams } from '@/hooks/use-search-params'
import { ColumnDef } from '@tanstack/react-table'
import { useCallback, useEffect } from 'react'
import z from 'zod'
import { DataTable } from './table'

interface PaginationResponse<Row extends Record<string, unknown>> {
  values: Row[]
  total: number
  cursor: number
  limit: number
}

interface ServerTableProps<Row extends Record<string, unknown>> {
  columns: ColumnDef<Row>[]
  initiallyHiddenColumns?: string[]
  value: PaginationResponse<Row>
  loading?: boolean
}

const SearchParamSchema = z.object({
  cursor: z.coerce.number().positive().default(1),
  limit: z.coerce.number().positive().default(10),
  query: z.string().optional(),
  'sort-by': z.string().optional(),
})

export function ServerTable<Row extends Record<string, unknown>>({
  columns,
  value,
  initiallyHiddenColumns = [],
  loading = false,
}: ServerTableProps<Row>) {
  const [searchQueryParams, updateSearchParams] = useUrlSearchParams()
  const searchParams = SearchParamSchema.parse(
    Object.fromEntries(searchQueryParams.entries())
  )

  const [searchQuery, setSearchQuery, debouncedSearchQuery] =
    useDebouncedState('')

  const onPaginationChange = useCallback(
    (page: number, pageSize: number) =>
      updateSearchParams.set({
        cursor: page,
        limit: pageSize,
      }),
    [updateSearchParams]
  )

  const onSortingChange = useCallback(
    (sortingField: string | undefined) =>
      updateSearchParams.set({ 'sort-by': sortingField }),
    [updateSearchParams]
  )

  useEffect(() => {
    if (!debouncedSearchQuery) {
      return updateSearchParams.remove('query')
    }

    updateSearchParams.set({ query: debouncedSearchQuery })
  }, [debouncedSearchQuery, updateSearchParams])

  return (
    <div className="container mx-auto py-10 pr-0">
      <DataTable
        columns={columns}
        data={value.values}
        pageSize={searchParams.limit}
        currentPage={searchParams.cursor}
        totalRows={value.total}
        onSortingChange={onSortingChange}
        onPaginationChange={onPaginationChange}
        onSearchChange={setSearchQuery}
        searchValue={searchQuery}
        loading={loading}
        initiallyHiddenColumns={initiallyHiddenColumns}
      />
    </div>
  )
}
