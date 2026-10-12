import { Column } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ArrowDownIcon, ArrowUpDownIcon, ArrowUpIcon } from 'lucide-react'

interface DataTableColumnHeaderProps<
  TData,
  TValue,
> extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  children: React.ReactNode
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  children,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{children}</div>
  }

  function getSortIcon() {
    switch (column.getIsSorted()) {
      case 'desc':
        return <ArrowDownIcon className="ml-2 size-4" />
      case 'asc':
        return <ArrowUpIcon className="ml-2 size-4" />
      default:
        return <ArrowUpDownIcon className="ml-2 size-4" />
    }
  }

  const isSorting = !!column.getIsSorted()

  return (
    <div className={cn('flex items-center', className)}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => column.toggleSorting()}
        className={cn(
          'text-foreground/80 hover:text-foreground gap-0.5 px-0! hover:bg-transparent! focus-visible:ring-0 focus-visible:ring-offset-0',
          { 'text-foreground': isSorting }
        )}
      >
        {children}
        {getSortIcon()}
      </Button>
    </div>
  )
}
