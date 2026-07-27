import { Column } from '@tanstack/react-table'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getHeader(column: Column<any, unknown>) {
  const meta = column.columnDef.meta
  if (meta && 'header' in meta && typeof meta.header === 'string') {
    return meta.header
  }

  return column.id
}
