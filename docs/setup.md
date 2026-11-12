# Mangrove Inventory setup and reference

For the product/team process, follow [the README](../README.md).

## Start locally

Use Node 22.18+ (Node 22 LTS recommended) and pnpm 10.13.1.

```sh
nvm use
pnpm install
pnpm run dev
```

Open http://localhost:3000/sandbox. No environment variables are needed. Browse one searchable sidebar containing all 81 component demos, with a shared preview and variant/replay controls. Direct previews: [Accordion](http://localhost:3000/sandbox?component=accordion) and [Dropdown](http://localhost:3000/sandbox?component=dropdown-menu). Component search stays visible while the sidebar list scrolls. Light/dark mode persists in a cookie across refreshes and navigation.

Dependencies and `pnpm-lock.yaml` are installed. Use `pnpm install --frozen-lockfile` for reproducible team and CI installs.

## Commands

| Command                         | Purpose                                                    |
| ------------------------------- | ---------------------------------------------------------- |
| `pnpm run dev`                  | Local app and sandbox                                      |
| `pnpm run build` / `pnpm start` | Production build / server                                  |
| `pnpm run typecheck`            | Strict TypeScript check                                    |
| `pnpm run lint`                 | ESLint                                                     |
| `pnpm test`                     | Node tests for contracts, theme persistence, chart scaling |

## UI components and styles

All reusable components live in `src/components/ui/`. The button demo shows standard variants, small/medium/large sizes, and disabled/loading states. Use `loading` for async actions, `variant="primary"` for affirmative actions, and `variant="danger"` for destructive actions.

- `src/components/ui/globals.css`: Beautiful UI light/dark design tokens, keyframes, and catalog component CSS.
- `src/app/globals.css`: app token aliases and matching styles for the rest of the app.
- `src/components/ui/`: one flat component library containing the 21 catalog components, shared controls and feedback, tokens, and source license; see [design rules](../DESIGN.md).
- `src/app/sandbox/page.tsx`: thin public gallery route.
- `src/features/sandbox/`: gallery demos in `components/`, catalog data in `constants/`, and component-selection checks in `validations/`.

Change shared colors and radii in the design token files. The sandbox contains component previews and a theme toggle; it has no customization page or live accent/radius controls. The UI uses the neutral primary color for highlights and actions in both themes. Light/dark mode is a saved preference; the root layout reads the cookie and renders the correct theme before hydration. Reading this cookie makes pages render at request time. Keep focus styles, labels, error associations, and Base UI’s keyboard behavior intact. There is no Storybook or separate app to maintain.

## Architecture and reuse

See [architecture and conventions](../AGENTS.md), [product requirements](../PRD.md), and
[team workflow](../docs/team-workflow.md). Replace the example projects feature with your product's
agreed scope. Keep the shared clients, providers, UI, and ownership boundaries unless an explicit
requirement changes them.

Group feature files by purpose: `components/`, `hooks/`, `api/`, `validations/`, `constants/`, and `types/`. Create only the folders a feature needs; import their files directly.

Axios is installed and a shared client is provided in `src/lib/axios.ts` for future Route Handler integrations. The optional AI flow has no placeholder endpoint; specify authorization, quota, origin validation, provider behavior, and failures in the product PRD before implementing it.

## Deploy

Import this repository into Vercel, choose Node 22, and deploy. Deployment requires your own infrastructure configuration; none was provisioned by this source implementation.
