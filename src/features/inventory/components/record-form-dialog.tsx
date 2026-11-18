"use client";

import { useState, type FormEvent } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { NumberInput } from "@/components/ui/number-input";
import { Select, type SelectOption } from "@/components/ui/select";
import { Typography } from "@/components/ui/typography";

export type FormField = {
  name: string;
  label: string;
  kind: "text" | "date" | "number" | "select";
  required?: boolean;
  /** number fields: inclusive bounds */
  min?: number;
  max?: number;
  options?: SelectOption[];
};

export type FormValues = Record<string, string | number | null>;

const schemaFor = (fields: FormField[]) =>
  z.object(
    Object.fromEntries(
      fields.map((field) => {
        const message = `${field.label} wajib diisi`;
        if (field.kind === "number") {
          const number = z.number({ error: message }).min(field.min ?? 0, `${field.label} minimal ${field.min ?? 0}`).max(field.max ?? Infinity, `${field.label} maksimal ${field.max}`);
          return [field.name, field.required ? number : number.nullish()];
        }
        const text = z.string({ error: message }).trim();
        return [field.name, field.required ? text.min(1, message) : text.optional()];
      }),
    ),
  );

function FormBody({ fields, initial, submitLabel, onSubmit, onCancel }: {
  fields: FormField[];
  initial: FormValues;
  submitLabel: string;
  onSubmit: (values: FormValues) => string | void;
  onCancel: () => void;
}) {
  const [values, setValues] = useState<FormValues>(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);

  function submit(event: FormEvent) {
    event.preventDefault();
    const parsed = schemaFor(fields).safeParse(values);
    if (!parsed.success) {
      setErrors(Object.fromEntries(parsed.error.issues.map((issue) => [String(issue.path[0]), issue.message])));
      return;
    }
    const error = onSubmit(parsed.data as FormValues);
    if (error) setFormError(error);
  }

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-4">
      {fields.map((field) => {
        const id = `field-${field.name}`;
        const value = values[field.name];
        const set = (next: string | number | null) => setValues((current) => ({ ...current, [field.name]: next }));
        return (
          <div key={field.name} className="flex flex-col gap-1.5">
            <Typography as="label" variant="bs" weight="medium" htmlFor={id}>
              {field.label}{field.required ? "" : " (opsional)"}
            </Typography>
            {(field.kind === "text" || field.kind === "date") && <Input id={id} type={field.kind === "date" ? "date" : "text"} value={String(value ?? "")} onChange={(event) => set(event.target.value)} />}
            {field.kind === "number" && (
              <NumberInput value={typeof value === "number" ? value : null} onValueChange={set} min={field.min} max={field.max} inputProps={{ id }} />
            )}
            {field.kind === "select" && (
              <Select options={field.options ?? []} value={typeof value === "string" && value ? value : null} onValueChange={(next) => set(next)} triggerProps={{ id, "aria-label": field.label }} />
            )}
            {errors[field.name] && <Typography as="p" variant="c" className="text-danger" role="alert">{errors[field.name]}</Typography>}
          </div>
        );
      })}
      {formError && <Typography as="p" variant="bs" className="text-danger" role="alert">{formError}</Typography>}
      <div className="flex justify-end gap-2">
        <Button type="button" variant="secondary" onClick={onCancel}>Batal</Button>
        <Button type="submit" variant="primary">{submitLabel}</Button>
      </div>
    </form>
  );
}

/** form fields are validated with Zod before onSubmit; onSubmit may return an error message to keep the dialog open */
export function RecordFormDialog({ open, onOpenChange, title, description, fields, initial = {}, submitLabel = "Simpan", onSubmit }: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  fields: FormField[];
  initial?: FormValues;
  submitLabel?: string;
  onSubmit: (values: FormValues) => string | void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange} title={title} description={description}>
      <FormBody
        fields={fields}
        initial={initial}
        submitLabel={submitLabel}
        onCancel={() => onOpenChange(false)}
        onSubmit={(values) => {
          const error = onSubmit(values);
          if (!error) onOpenChange(false);
          return error;
        }}
      />
    </Dialog>
  );
}
