"use client";

import { NumberField } from "@base-ui/react/number-field";
import { Minus, Plus } from "lucide-react";
import type { ComponentProps } from "react";
import { Button } from "./button";

export function NumberInput({ inputProps, ...props }: ComponentProps<typeof NumberField.Root> & { inputProps?: Omit<ComponentProps<typeof NumberField.Input>, "className"> }) {
  return <NumberField.Root {...props}><NumberField.Group className="ui-number-group">
    <NumberField.Decrement aria-label="Decrease value" render={<Button variant="quiet" className="!h-6 !px-2" />}><Minus size={14} /></NumberField.Decrement>
    <NumberField.Input className="ui-number-input" {...inputProps} />
    <NumberField.Increment aria-label="Increase value" render={<Button variant="quiet" className="!h-6 !px-2" />}><Plus size={14} /></NumberField.Increment>
  </NumberField.Group></NumberField.Root>;
}
