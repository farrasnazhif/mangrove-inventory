"use client";

import { useMemo, useState } from "react";
import { Download, ListFilter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover } from "@/components/ui/popover";
import { Select } from "@/components/ui/select";
import { Typography } from "@/components/ui/typography";
import { downloadCsv } from "../api/export.ts";

type Column<T> = { id: string; label: string; get: (row: T) => string | null };
type Option<T> = { key: string; label: string; test: (row: T) => boolean };

const EMPTY = "__empty";
const MAX_VALUES = 8;
const BINS = 5;

// cells are formatted strings ("31,0"), so numeric columns are detected by parsing them back
const toNumber = (value: string) => Number(value.replace(/\./g, "").replace(",", "."));
const fmt = (value: number) => value.toLocaleString("id-ID", { maximumFractionDigits: 3 });

/** every column becomes a filter field: distinct values when there are few, equal-count ranges for many numbers */
function buildOptions<T>(rows: T[], column: Column<T>): Option<T>[] {
  const values = rows.map(column.get);
  const distinct = [...new Set(values.filter((value): value is string => value !== null))];
  const hasEmpty = values.some((value) => value === null);
  if (distinct.length + (hasEmpty ? 1 : 0) < 2) return [];
  const numeric = distinct.every((value) => Number.isFinite(toNumber(value)));
  const empty: Option<T>[] = hasEmpty ? [{ key: EMPTY, label: "-", test: (row) => column.get(row) === null }] : [];

  if (!numeric || distinct.length <= MAX_VALUES) {
    const sorted = numeric ? distinct.sort((a, b) => toNumber(a) - toNumber(b)) : distinct.sort((a, b) => a.localeCompare(b, "id"));
    return [...sorted.map((value) => ({ key: value, label: value, test: (row: T) => column.get(row) === value })), ...empty];
  }

  const numbers = distinct.map(toNumber).sort((a, b) => a - b);
  const edges = [...new Set(Array.from({ length: BINS + 1 }, (_, i) => numbers[Math.min(numbers.length - 1, Math.round((i * (numbers.length - 1)) / BINS))]))];
  const bins: Option<T>[] = edges.slice(0, -1).map((low, i) => {
    const high = edges[i + 1];
    const last = i === edges.length - 2;
    return {
      key: `${low}-${high}`,
      label: `${fmt(low)} – ${fmt(high)}`,
      test: (row) => {
        const raw = column.get(row);
        const value = raw === null ? NaN : toNumber(raw);
        return value >= low && (last ? value <= high : value < high);
      },
    };
  });
  return [...bins, ...empty];
}

/** multi-field filters built from the table data, CSV export of the result, and paging; shared by all record tables */
export function useTableTools<T>(rows: T[], columns: Column<T>[], filename: string, pageSize = 10) {
  const [selected, setSelected] = useState<Record<string, string[]>>({});
  const [page, setPage] = useState(1);

  // columns are recreated every render; the rows decide the fields
  const built = useMemo(
    () =>
      columns
        .map((column) => ({
          id: column.id,
          label: column.label,
          options: buildOptions(rows, column).map((option) => ({ ...option, count: rows.filter(option.test).length })),
        }))
        .filter((field) => field.options.length),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [rows],
  );
  // the row tests stay inside the hook, the menu only needs labels and counts
  const fields = built.map((field) => ({ ...field, options: field.options.map(({ key, label, count }) => ({ key, label, count })) }));

  const filtered = useMemo(() => {
    return rows.filter((row) =>
      built.every((field) => {
        const keys = selected[field.id];
        return !keys?.length || field.options.some((option) => keys.includes(option.key) && option.test(row));
      }),
    );
  }, [rows, selected, built]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const current = Math.min(page, pageCount);
  const update = (next: Record<string, string[]>) => {
    setSelected(next);
    setPage(1);
  };
  return {
    fields,
    selected,
    activeCount: Object.values(selected).reduce((total, keys) => total + keys.length, 0),
    toggleOption: (fieldId: string, key: string) => {
      const keys = selected[fieldId] ?? [];
      update({ ...selected, [fieldId]: keys.includes(key) ? keys.filter((item) => item !== key) : [...keys, key] });
    },
    clearFilters: (fieldId?: string) => update(fieldId ? { ...selected, [fieldId]: [] } : {}),
    page: current,
    setPage,
    pageCount,
    filtered,
    visible: filtered.slice((current - 1) * pageSize, current * pageSize),
    exportCsv: () => downloadCsv(filename, columns.map((column) => column.label), filtered.map((row) => columns.map((column) => column.get(row)))),
  };
}

type Tools = ReturnType<typeof useTableTools>;

function FilterMenu({ tools }: { tools: Tools }) {
  const [fieldId, setFieldId] = useState<string | null>(null);
  const field = tools.fields.find((item) => item.id === fieldId) ?? tools.fields[0];
  const chosen = field ? tools.selected[field.id] ?? [] : [];
  return (
    <Popover
      title="Filter"
      trigger={
        <Button variant="secondary">
          <ListFilter size={14} aria-hidden />
          Filter
          {tools.activeCount > 0 && <span className="rounded-chip bg-ink px-1.5 py-0.5 text-[10px] text-surface">{tools.activeCount}</span>}
        </Button>
      }
    >
      {!field ? (
        <Typography as="p" variant="bs" className="w-72 max-w-full text-ink-2">Belum ada data untuk difilter.</Typography>
      ) : (
      <div className="flex w-72 max-w-full flex-col gap-3">
        <Select
          options={tools.fields.map((item) => ({ value: item.id, label: `${item.label}${tools.selected[item.id]?.length ? ` (${tools.selected[item.id].length})` : ""}` }))}
          value={field.id}
          onValueChange={(value) => value && setFieldId(value)}
          triggerProps={{ "aria-label": "Filter berdasarkan" }}
        />
        <ul aria-label={`Pilihan ${field.label}`} className="flex max-h-60 flex-col gap-1 overflow-y-auto">
          {field.options.map((option) => (
            <li key={option.key}>
              <label className="flex cursor-pointer items-center gap-2 rounded-control px-1.5 py-1.5 text-[12.5px] hover:bg-hover-2">
                <Checkbox checked={chosen.includes(option.key)} onCheckedChange={() => tools.toggleOption(field.id, option.key)} aria-label={option.label} />
                <span className="min-w-0 flex-1 truncate">{option.label}</span>
                <span className="text-ink-3">{option.count}</span>
              </label>
            </li>
          ))}
        </ul>
        <div className="flex justify-between gap-2 border-t border-line pt-3">
          <Button size="sm" variant="quiet" disabled={!chosen.length} onClick={() => tools.clearFilters(field.id)}>Reset {field.label}</Button>
          <Button size="sm" variant="quiet" disabled={!tools.activeCount} onClick={() => tools.clearFilters()}>Reset semua</Button>
        </div>
      </div>
      )}
    </Popover>
  );
}

export function TableFilters({ tools }: { tools: Tools }) {
  return <FilterMenu tools={tools} />;
}

/** one removable chip per active filter value */
export function TableActiveFilters({ tools }: { tools: Tools }) {
  if (!tools.activeCount) return null;
  return (
    <div className="flex flex-wrap items-center gap-2" aria-label="Filter aktif">
      {tools.fields.flatMap((field) =>
        (tools.selected[field.id] ?? []).map((key) => {
          const option = field.options.find((item) => item.key === key);
          return (
            <button
              key={`${field.id}-${key}`}
              type="button"
              onClick={() => tools.toggleOption(field.id, key)}
              aria-label={`Hapus filter ${field.label}: ${option?.label ?? key}`}
              className="inline-flex items-center gap-1 rounded-chip bg-hover-2 px-2 py-1 text-[12px] hover:bg-line-strong"
            >
              <Typography as="span" variant="c" className="text-ink-3">{field.label}:</Typography>
              <Typography as="span" variant="c">{option?.label ?? key}</Typography>
              <X size={12} aria-hidden />
            </button>
          );
        }),
      )}
      <Button size="xs" variant="quiet" onClick={() => tools.clearFilters()}>Reset semua</Button>
    </div>
  );
}

export function ExportButton({ tools }: { tools: Pick<Tools, "exportCsv"> }) {
  return (
    <Button variant="secondary" onClick={tools.exportCsv}>
      <Download size={14} aria-hidden />
      Export
    </Button>
  );
}
