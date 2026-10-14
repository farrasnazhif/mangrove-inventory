import type { ReactNode } from "react";

export type TableColumn<T> = { id: string; label: string; value: (row: T) => string | number; render?: (row: T) => ReactNode };

export function Table<T>({ rows, columns, getRowId, caption, header, sort }: {
  rows: T[]; columns: TableColumn<T>[]; getRowId: (row: T) => string; caption: string;
  header?: (column: TableColumn<T>) => ReactNode; sort?: { id: string; direction: "asc" | "desc" } | null;
}) {
  return <div className="ui-table-scroll" tabIndex={0} role="region" aria-label={caption}><table className="ui-table">
    <caption className="sr-only">{caption}</caption>
    <thead><tr>{columns.map((column) => <th key={column.id} scope="col" aria-sort={sort?.id === column.id ? sort.direction === "asc" ? "ascending" : "descending" : undefined}>{header ? header(column) : column.label}</th>)}</tr></thead>
    <tbody>{rows.map((row) => <tr key={getRowId(row)}>{columns.map((column) => {
      const value = column.value(row);
      return <td key={column.id} className={typeof value === "number" ? "text-right tabular-nums" : undefined}>{column.render ? column.render(row) : value}</td>;
    })}</tr>)}
      {!rows.length && <tr><td colSpan={columns.length} className="!py-8 text-center text-muted">No results found.</td></tr>}
    </tbody>
  </table></div>;
}
