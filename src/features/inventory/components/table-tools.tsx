"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/search-input";
import { downloadCsv } from "../api/export.ts";

type Column<T> = { label: string; get: (row: T) => string | null };

/** text filter over every column, CSV export of the filtered rows, and paging; shared by all record tables */
export function useTableTools<T>(rows: T[], columns: Column<T>[], filename: string, pageSize = 10) {
  const [query, setQuery] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [page, setPage] = useState(1);
  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return needle ? rows.filter((row) => columns.some((column) => column.get(row)?.toLowerCase().includes(needle))) : rows;
    // columns are recreated every render; rows and query decide the result
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows, query]);
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const current = Math.min(page, pageCount);
  return {
    query,
    setQuery: (value: string) => {
      setQuery(value);
      setPage(1);
    },
    filterOpen,
    toggleFilter: () => setFilterOpen((open) => !open),
    page: current,
    setPage,
    pageCount,
    filtered,
    visible: filtered.slice((current - 1) * pageSize, current * pageSize),
    exportCsv: () => downloadCsv(filename, columns.map((column) => column.label), filtered.map((row) => columns.map((column) => column.get(row)))),
  };
}

type Tools = ReturnType<typeof useTableTools>;

export function TableButtons({ tools }: { tools: Pick<Tools, "exportCsv" | "toggleFilter" | "filterOpen"> }) {
  return (
    <>
      <Button variant="secondary" onClick={tools.exportCsv}>Export</Button>
      <Button variant="secondary" aria-expanded={tools.filterOpen} onClick={tools.toggleFilter}>Filter</Button>
    </>
  );
}

export function TableFilter({ tools }: { tools: Pick<Tools, "filterOpen" | "query" | "setQuery"> }) {
  if (!tools.filterOpen) return null;
  return (
    <SearchInput
      label="Cari di tabel"
      placeholder="Cari di semua kolom"
      value={tools.query}
      onChange={(event) => tools.setQuery(event.target.value)}
      onClear={() => tools.setQuery("")}
    />
  );
}
