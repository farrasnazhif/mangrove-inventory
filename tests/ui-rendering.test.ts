import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { createElement, type ComponentType, type ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ts from "typescript";
import { EXTENDED_COMPONENTS } from "../src/features/sandbox/constants/extended-catalog.ts";
import { SANDBOX_COMPONENTS } from "../src/features/sandbox/constants/catalog.ts";
import { Toast } from "@base-ui/react/toast";

// Compile the real JSX modules in memory for Node's strip-types test runner.
const root = fileURLToPath(new URL("../", import.meta.url));
const modules = new Map<string, Record<string, unknown>>();
function load(path: string): Record<string, unknown> {
  const filename = [path, `${path}.tsx`, `${path}.ts`].find(existsSync);
  assert.ok(filename, `Module missing: ${path}`);
  const cached = modules.get(filename);
  if (cached) return cached;
  const exports: Record<string, unknown> = {};
  modules.set(filename, exports);
  const compiled = ts.transpileModule(readFileSync(filename, "utf8"), { compilerOptions: {
    target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true,
  } }).outputText;
  const require = createRequire(filename);
  new Function("require", "exports", compiled)((id: string) => id.startsWith("@/") ? load(resolve(root, "src", id.slice(2))) : id.startsWith(".") ? load(resolve(dirname(filename), id)) : require(id), exports);
  return exports;
}

const ThemeProvider = load(resolve(root, "src/providers/theme-provider")).ThemeProvider as ComponentType<{ initialTheme: "light" | "dark"; children?: ReactNode }>;
const demos = load(resolve(root, "src/features/sandbox/components/extended-demo")).EXTENDED_DEMOS as Record<string, ComponentType>;
const SharedDemo = load(resolve(root, "src/features/sandbox/components/shared-demo")).SharedDemo as ComponentType<{ id: string; onOpenDialog: () => void }>;
const render = (child: ReactNode, theme: "light" | "dark" = "light") => renderToStaticMarkup(createElement(ThemeProvider, { initialTheme: theme }, child));

test("table aligns numeric measurements without treating string identifiers as numbers", () => {
  const Table = load(resolve(root, "src/components/ui/table")).Table as ComponentType<{
    rows: { id: string; dbh: number }[];
    columns: { id: string; label: string; value: (row: { id: string; dbh: number }) => string | number; render?: (row: { id: string; dbh: number }) => ReactNode }[];
    caption: string; getRowId: (row: { id: string }) => string;
  }>;
  const markup = render(createElement(Table, {
    rows: [{ id: "001", dbh: 0 }, { id: "002", dbh: -1.5 }],
    columns: [
      { id: "id", label: "Tree", value: (row) => row.id },
      { id: "dbh", label: "DBH (cm)", value: (row) => row.dbh, render: (row) => `${row.dbh} cm` },
    ],
    caption: "Tree measurements", getRowId: (row) => row.id,
  }));
  assert.match(markup, /<td>001<\/td>/);
  assert.match(markup, /<td class="text-right tabular-nums">0 cm<\/td>/);
  assert.match(markup, /<td class="text-right tabular-nums">-1.5 cm<\/td>/);
  assert.match(markup, /scope="col"[^>]*>DBH \(cm\)/);
  assert.match(markup, /aria-label="Tree measurements"/);
});

test("StreamText shows complete text without timers when reduced motion is enabled", () => {
  const filename = resolve(root, "src/components/ui/stream-text.tsx");
  const compiled = ts.transpileModule(readFileSync(filename, "utf8"), { compilerOptions: {
    target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX,
  } }).outputText;
  const effects: (() => unknown)[] = [];
  let matches = true;
  let timerCount = 0;
  let done = 0;
  let subscribed: (() => void) | undefined;
  let unsubscribed = false;
  let unsubscribe: (() => void) | undefined;
  const exports: Record<string, unknown> = {};
  const require = createRequire(filename);
  new Function("require", "exports", "window", "setInterval", compiled)(
    (id: string) => id === "react" ? {
      useState: (value: unknown) => [value, () => {}],
      useRef: (value: unknown) => ({ current: value }),
      useEffect: (effect: () => unknown) => effects.push(effect),
      useSyncExternalStore: (subscribe: (callback: () => void) => () => void, snapshot: () => boolean, serverSnapshot: () => boolean) => {
        assert.equal(serverSnapshot(), false);
        unsubscribe = subscribe(() => {});
        return snapshot();
      },
    } : require(id), exports,
    { matchMedia: (query: string) => {
      assert.equal(query, "(prefers-reduced-motion: reduce)");
      return { matches, addEventListener: (_: string, fn: () => void) => { subscribed = fn; }, removeEventListener: (_: string, fn: () => void) => { unsubscribed = fn === subscribed; } };
    } },
    () => { timerCount++; return 1; },
  );
  const StreamText = exports.StreamText as (props: { text: string; onDone?: () => void }) => ReactNode;
  let markup = renderToStaticMarkup(StreamText({ text: "Soil carbon unavailable", onDone: () => { done++; } }));
  effects.splice(0).forEach((effect) => effect());
  assert.match(markup, /Soil carbon unavailable/);
  assert.doesNotMatch(markup, /stream-tail|is-streaming/);
  assert.equal(timerCount, 0);
  assert.equal(done, 1);
  unsubscribe?.();
  assert.equal(unsubscribed, true);
  matches = false;
  markup = renderToStaticMarkup(StreamText({ text: "Normal animation" }));
  effects.splice(0).forEach((effect) => effect());
  assert.match(markup, /is-streaming/);
  assert.equal(timerCount, 1);
  unsubscribe?.();
});

test("every additional catalog entry has a real demo that renders in both themes", () => {
  assert.deepEqual(Object.keys(demos).sort(), EXTENDED_COMPONENTS.map((entry) => entry.id).sort());
  for (const theme of ["light", "dark"] as const) {
    for (const entry of EXTENDED_COMPONENTS) {
      const markup = render(createElement(SharedDemo, { id: entry.id, onOpenDialog: () => {} }), theme);
      assert.ok(markup.length > 20, `Empty demo: ${entry.id} (${theme})`);
      assert.ok(!markup.includes("NaN"), `Invalid numbers: ${entry.id}`);
    }
  }
  for (const entry of EXTENDED_COMPONENTS) assert.ok(SANDBOX_COMPONENTS.some((item) => item.id === entry.id));
});

test("new controls retain labels, native validation, disabled, and progress semantics", () => {
  const otp = render(createElement(demos["otp-input"]));
  assert.match(otp, /autoComplete="one-time-code"/);
  assert.match(otp, /pattern="\[0-9\]\{6\}"/);
  assert.match(otp, /maxLength="6"/);
  assert.match(otp, /required=""/);
  const checkbox = render(createElement(demos.checkbox));
  assert.match(checkbox, /aria-checked="mixed"/);
  assert.match(checkbox, /disabled=""/);
  const progress = render(createElement(demos["progress-bar"]));
  assert.match(progress, /role="progressbar"/);
  assert.match(progress, /aria-valuenow="65"/);
  assert.match(progress, /aria-valuenow="100"/);
  assert.match(progress, /data-indeterminate/);
  const calendar = render(createElement(demos.calendar));
  assert.match(calendar, /October 11, 2026/);
  assert.match(calendar, /aria-pressed="true"/);
  assert.match(calendar, /disabled=""/);
  const upload = render(createElement(demos.dropzone));
  assert.match(upload, /type="file"/);
  assert.match(upload, /multiple=""/);
  assert.match(upload, /Browse files/);
  const table = render(createElement(demos["data-table"]));
  assert.match(table, /<caption[^>]*>Team members/);
  assert.match(table, /Sort by Tasks/);
  assert.match(table, /Page 1 of 3/);
});

test("switches keep on/off semantics, disabled states, labels, and form values", () => {
  const Switch = load(resolve(root, "src/components/ui/switch")).Switch as ComponentType<{
    defaultChecked?: boolean; disabled?: boolean; name: string; "aria-label": string;
  }>;
  for (const checked of [false, true]) {
    for (const disabled of [false, true]) {
      const markup = render(createElement(Switch, { defaultChecked: checked, disabled, name: "notifications", "aria-label": "Notifications" }));
      assert.match(markup, /role="switch"/);
      assert.ok(markup.includes(`aria-checked="${checked}"`));
      assert.match(markup, /aria-label="Notifications"/);
      assert.match(markup, /name="notifications"/);
      assert.match(markup, /class="switch-thumb"/);
      if (disabled) {
        assert.match(markup, /data-disabled/);
        assert.match(markup, /aria-disabled="true"/);
        assert.match(markup, /tabindex="-1"/i);
      }
    }
  }
  const demo = render(createElement(SharedDemo, { id: "switches", onOpenDialog: () => {} }));
  assert.equal((demo.match(/role="switch"/g) ?? []).length, 4);
  assert.match(demo, /Disabled off/);
  assert.match(demo, /Disabled on/);
});

test("badges accept arbitrary labels and map project statuses to primary or semantic tones", () => {
  const Badge = load(resolve(root, "src/components/ui/badge")).Badge as ComponentType<{ status?: string; tone?: "primary"; children?: ReactNode }>;
  assert.match(render(createElement(Badge, { status: "draft" })), /badge-neutral[^>]*>draft/);
  assert.match(render(createElement(Badge, { status: "active" })), /badge-primary[^>]*>active/);
  assert.match(render(createElement(Badge, { status: "completed" })), /badge-success[^>]*>completed/);
  assert.match(render(createElement(Badge, null, "Beta")), /badge-neutral[^>]*>Beta/);
  assert.match(render(createElement(Badge, { tone: "primary" }, "New")), /badge-primary[^>]*>New/);
});

test("the full sandbox renders one unified catalog with the extracted controls", () => {
  const Sandbox = load(resolve(root, "src/features/sandbox/components/sandbox")).Sandbox as ComponentType;
  for (const theme of ["light", "dark"] as const) {
    const markup = render(createElement(Sandbox), theme);
    for (const entry of SANDBOX_COMPONENTS) assert.ok(markup.includes(entry.title), `Missing sidebar entry: ${entry.id}`);
    assert.ok(!markup.includes("Workspace preview"));
    assert.ok(!markup.includes("Your code, your design"));
    assert.ok(!markup.includes("Customization"));
    assert.ok(!markup.includes("Simulate save failure"));
    assert.doesNotMatch(markup, /<legend[^>]*>Accent color<\//);
    assert.ok(!markup.includes("Button accent colors"));
    assert.ok(!markup.includes("data-accent="));
    assert.ok(!markup.includes("button-accent"));
    assert.ok(!markup.includes("button-success"));
    assert.match(markup, /button-danger/);
    assert.match(markup, />Destructive<\/button>/);
    assert.ok(!markup.includes("Corner radius"));
    assert.match(markup, /aria-label="Use (light|dark) mode"/);
    assert.match(markup, /Reset sandbox/);
  }
});


test("Accordion and Dropdown destinations render their sidebar entries and actual controls", () => {
  const Sandbox = load(resolve(root, "src/features/sandbox/components/sandbox")).Sandbox as ComponentType<{ initialComponent: string }>;
  const accordion = render(createElement(Sandbox, { initialComponent: "accordion" }));
  assert.match(accordion, /aria-label="Accordion" aria-current="page"/);
  assert.match(accordion, /How do I get started\?/);
  assert.match(accordion, /aria-expanded="true"/);
  const dropdown = render(createElement(Sandbox, { initialComponent: "dropdown-menu" }));
  assert.match(dropdown, /aria-label="Dropdown Menu" aria-current="page"/);
  assert.match(dropdown, /aria-haspopup="menu"/);
  assert.match(dropdown, />Actions /);
});

test("toast types render decorative status icons, readable content, and dismissal", () => {
  const filename = resolve(root, "src/components/ui/toast.tsx");
  const compiled = ts.transpileModule(readFileSync(filename, "utf8"), { compilerOptions: {
    target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true,
  } }).outputText;
  const types = ["success", "error", "warning", "info", "custom", "constructor", "toString", undefined];
  const exports = {} as { ToastProvider: ComponentType<{ children?: ReactNode }> };
  // Portals require a browser; expose their children and seed the manager for SSR.
  const toast = { ...Toast,
    Portal: ({ children }: { children: ReactNode }) => children,
    useToastManager: () => ({ toasts: types.map((type, index) => ({ id: String(index), type, title: `Notice ${index}`, description: "Your input is preserved." })) }),
  };
  const require = createRequire(filename);
  new Function("require", "exports", compiled)((id: string) => id === "@base-ui/react/toast" ? { Toast: toast } : id.startsWith(".") ? load(resolve(dirname(filename), id)) : require(id), exports);
  const markup = renderToStaticMarkup(createElement(exports.ToastProvider));
  for (const icon of ["circle-check", "circle-x", "triangle-alert", "info"]) assert.ok(markup.includes(`lucide-${icon}`));
  assert.equal((markup.match(/class="ui-toast-icon"/g) ?? []).length, types.length);
  assert.match(markup, /aria-hidden="true" class="ui-toast-icon"/);
  assert.match(markup, /Your input is preserved/);
  assert.match(markup, /aria-label="Dismiss notification"/);
});
