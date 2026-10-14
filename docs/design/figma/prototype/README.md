# Mangrove Figma prototype

[Open the Figma file](https://www.figma.com/design/Z3Sxbn2kJFoa5uQf6jcUft/Mangrove-Inventory).

The editable prototype follows the accepted neutral direction in DESIGN.md. Clay informs
spacing and hierarchy; existing Inter, UI tokens, controls and Lucide icons supply the visual
language. It does not copy reference branding.

## Contents

- `Base UI · DESIGN.md`: 240 component variants, including all five shared Button variants,
  four sizes, loading/disabled/focus states, form controls, cards and notices.
- `App prototype · DESIGN.md`: all 12 documented screens at desktop 1440 px and mobile
  360 px in light and dark themes, plus seven state examples per theme and width (76 frames).
- Four field journey starting points and clickable navigation between sample screens.
- `Dashboard content · supplied references`: 20 additional frames covering summary, field
  entry, AGB/BGB, bulk-density/SOC and total-stock recap in both widths and themes.
  Indonesian labels are prototype copy; final localization remains unresolved.
- The completion pass moves earlier generated attempts under `Archived generator drafts`
  while preserving their layers and original user pages.

The library represents controls visually. Base UI keyboard behavior, focus return, semantic
links and persistent SSR theme cookies remain responsibilities of the existing React code.
Figma theme switches navigate to counterpart frames; they do not simulate browser cookies.

## Run locally

The dependency-free `code.js` is source, not generated output. No install or build is needed.
In Figma Desktop choose **Plugins → Development → Import plugin from manifest**, select
this directory's `manifest.json`, then run **Mangrove DESIGN.md prototype** in a Design file.
Do not publish the development plugin. It has no network access.

Reruns preserve completed pages. If an interrupted attempt has all 76 screens, the generator
repairs its navigation and moves earlier generated drafts into an archive. It does not
regenerate or overwrite completed user edits. Use a separate file to create a fresh version.

Run the repository contract check with:

```sh
pnpm test
```

## Limits and open decisions

All plot records, carbon figures, map shapes and chatbot responses are marked illustrative.
Missing SOC leaves the total incomplete. No validated equation, real geographic coordinates,
map service, export output, AI service, permissions or database model is selected here.
Scientific methods, roles, routes, lab fields, export formats and content approval remain the
questions recorded in PRD.md and DESIGN.md. The mobile navigation is a visual proposal.

Token values are snapshots from the current CSS; later token changes require deliberate
Figma updates. The current sandbox still contains all 81 live component demos; its Figma
screen is a summary rather than a reproduction of every demo.

Beautiful UI and Lucide/Feather attribution is retained in `LICENSE`.

## Verification status — 2026-10-14

Native Figma inspection confirms the shared component library, original product screens and
new dashboard content page exist. Desktop summary, field entry and AGB/BGB panels were visually
inspected. The generator contract test checks both widths/themes, all 96 screen frames and
navigation destinations. Native canvas input intermittently returns `noWindowsAvailable`;
prototype interaction, complete mobile/dark visual review and the archive completion pass
remain unverified in the live file. Duplicate generated page pairs may remain visible.

Repository typecheck, lint and 26 tests passed. A webpack production build passed; the default
Turbopack build fails because the environment prevents its helper from binding a port.
Live authentication, RLS and deployment were not tested by this UI/prototype task.
