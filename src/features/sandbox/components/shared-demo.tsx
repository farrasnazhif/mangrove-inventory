"use client";

import { useState } from "react";
import { Tabs } from "@/components/ui/tabs";
import { EXTENDED_DEMOS } from "./extended-demo";
import { Select } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Notice } from "@/components/ui/notice";
import { DataState } from "@/components/ui/data-state";
import {
  Typography,
  TYPOGRAPHY_VARIANTS,
  TYPOGRAPHY_WEIGHTS,
  type TypographyVariant,
  type TypographyWeight,
} from "@/components/ui/typography";

export function SharedDemo({
  id,
  onOpenDialog,
}: {
  id: string;
  onOpenDialog: () => void;
}) {
  const [message, setMessage] = useState("");
  const [checked, setChecked] = useState(true);
  const [state, setState] = useState<
    "loading" | "empty" | "error" | "unavailable"
  >("loading");

  if (id === "buttons")
    return (
      <div className="w-full max-w-2xl space-y-7">
        <section aria-label="Button variants" className="space-y-3">
          <h3 className="text-xs font-medium text-muted">Variants</h3>
          <div className="flex flex-wrap gap-3">
            {([
              "primary",
              "secondary",
              "ghost",
              "danger",
              "quiet",
            ] as const).map((variant) => (
              <Button
                key={variant}
                variant={variant}
                onClick={() => setMessage(`${variant} button clicked.`)}
              >
                {variant === "danger" ? "Destructive" : variant.charAt(0).toUpperCase() + variant.slice(1)}
              </Button>
            ))}
          </div>
        </section>
        <section aria-label="Button sizes and states" className="space-y-3">
          <h3 className="text-xs font-medium text-muted">Sizes & states</h3>
          {(["sm", "md", "lg"] as const).map((size) => (
            <div key={size} className="flex flex-wrap items-center gap-3">
              <span className="w-16 text-xs text-muted">
                {size === "sm" ? "Small" : size === "md" ? "Medium" : "Large"}
              </span>
              <Button
                size={size}
                onClick={() => setMessage(`${size} button clicked.`)}
              >
                Continue <ArrowUpRight size={14} />
              </Button>
              <Button size={size} disabled>
                Disabled
              </Button>
              <Button size={size} loading>
                Saving…
              </Button>
            </div>
          ))}
        </section>
        <p role="status" className="text-xs text-muted min-h-4">
          {message}
        </p>
      </div>
    );

  if (id === "inputs")
    return (
      <div className="grid gap-5 w-full max-w-lg">
        <div className="field">
          <label htmlFor="demo-input">Default input</label>
          <Input id="demo-input" placeholder="Type something…" />
        </div>
        <div className="field">
          <label htmlFor="demo-invalid">Invalid input</label>
          <Input
            id="demo-invalid"
            aria-invalid="true"
            aria-describedby="demo-error"
            placeholder="Needs attention"
          />
          <p id="demo-error" className="field-error">
            This field is required.
          </p>
        </div>
        <div className="field">
          <label htmlFor="demo-disabled">Disabled input</label>
          <Input id="demo-disabled" value="Not editable" disabled />
        </div>
      </div>
    );

  if (id === "badges")
    return (
      <div className="flex flex-wrap gap-3">
        <Badge status="draft" />
        <Badge status="active" />
        <Badge status="completed" />
        <Badge>Beta</Badge>
        <Badge tone="primary">New</Badge>
        <Badge tone="success">Verified</Badge>
        <Badge tone="warning">Pending</Badge>
        <Badge tone="danger">Failed</Badge>
      </div>
    );

  if (id === "notices")
    return (
      <div className="space-y-3 w-full max-w-lg">
        <Notice tone="success">Your changes were saved successfully.</Notice>
        <Notice tone="info">You’re viewing sample data in the sandbox.</Notice>
        <Notice>We couldn’t save. Your input is still here.</Notice>
      </div>
    );

  if (id === "dialog")
    return (
      <Button variant="secondary" onClick={onOpenDialog}>
        Open sample dialog
      </Button>
    );

  if (id === "switches")
    return (
      <div className="space-y-5 w-full max-w-xs">
        <label className="flex items-center justify-between gap-4 text-sm">
          Notifications
          <Switch
            checked={checked}
            onCheckedChange={setChecked}
          />
        </label>
        <label className="flex items-center justify-between gap-4 text-sm">
          Off by default
          <Switch />
        </label>
        <label className="flex items-center justify-between gap-4 text-sm text-muted">
          Disabled off
          <Switch disabled />
        </label>
        <label className="flex items-center justify-between gap-4 text-sm text-muted">
          Disabled on
          <Switch defaultChecked disabled />
        </label>
      </div>
    );

  if (id === "tabs")
    return (
      <Tabs label="Project views" defaultValue="overview" className="w-full max-w-md" items={[
        { value: "overview", label: "Overview", content: "Everything you need to start your next project." },
        { value: "activity", label: "Activity", content: "Your sample project was updated just now." },
        { value: "settings", label: "Settings", disabled: true, content: "Settings unavailable." },
      ]} />
    );

  if (id === "data-states")
    return (
      <div className="w-full max-w-lg space-y-4">
        <label className="field text-sm">
          Preview state
          <Select value={state} onValueChange={(value) => { if (value) setState(value as typeof state); }}
            options={["loading", "empty", "error", "unavailable"].map((value) => ({ value, label: value }))} />
        </label>
        <DataState
          state={state}
          onRetry={state === "error" ? () => setState("empty") : undefined}
          action={
            state === "empty" ? (
              <Button variant="primary" onClick={onOpenDialog}>
                New project
              </Button>
            ) : undefined
          }
        />
      </div>
    );

  if (id === "typography")
    return (
      <div className="w-full max-w-2xl space-y-4">
        {(Object.keys(TYPOGRAPHY_VARIANTS) as TypographyVariant[]).map((variant) => (
          <div key={variant} className="flex items-baseline gap-4">
            <Typography as="span" variant="c" className="w-8 shrink-0 text-ink-3">
              {variant}
            </Typography>
            <Typography variant={variant} weight={variant.startsWith("h") ? "semibold" : "regular"}>
              Mangrove carbon stock
            </Typography>
          </div>
        ))}
        <div className="flex flex-wrap gap-x-6 gap-y-1 border-t border-line pt-4">
          {(Object.keys(TYPOGRAPHY_WEIGHTS) as TypographyWeight[]).map((weight) => (
            <Typography key={weight} as="span" variant="bl" weight={weight}>
              {weight}
            </Typography>
          ))}
        </div>
      </div>
    );

  const Demo = EXTENDED_DEMOS[id as keyof typeof EXTENDED_DEMOS];
  return Demo ? <Demo /> : null;
}
