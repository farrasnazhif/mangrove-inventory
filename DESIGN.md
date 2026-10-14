# Mangrove Carbon Stock Inventory — Product Design

| Attribute | Decision |
| --- | --- |
| Status | Product presentation specification; feature scope and content contracts remain subject to PRD decisions |
| Primary reference | Clay for composition; supplied mangrove screenshots for dashboard content (DES-11) |
| Confirmed direction | Keep the current neutral UI; borrow clarity and spacing from the references |
| Foundation | Existing Beautiful UI controls, Base UI behavior, normal Inter, Lucide, shared Button and theme tokens |
| Implementation status | Editable Figma prototype and shared Table/StreamText adjustments; live mangrove features remain planned |

## 1. Direction and source boundaries — DES-01

Use Clay's editorial hierarchy, deliberate whitespace, and clear grouping of explanation with
concrete product information. Translate these qualities into a field-and-data application:
plot identity first, measurements/results second, methods and sources nearby. Keep the neutral
surfaces and compact controls already defined in the repository.

The user's neutral-UI preference and subsequent “use clay” instruction are complementary:
Clay is the primary composition reference; current shared tokens and behavior remain the
product baseline. This does not select Clay's cream/pastel palette, alternate fonts, pill CTAs,
marketing navigation, illustrations, or brand assets.

The source is the [Clay](https://www.clay.com/) reference previously contained in this file and the local
[reference index](docs/design/design-list.md). Its website observations were visual summaries;
its hex values and dimensions were proposals, not measured Clay tokens. Reference material was
read locally; current-site measurements remain unverified.

Concrete measurements below come from the existing CSS/component contracts or apply that
spacing scale to the planned screens. They specify presentation, not new product decisions.
Screen grouping, fields, permissions, formulas, filters and release timing remain governed by
[PRD.md](PRD.md). No unapproved screen or data field becomes mandatory through a layout example.

Use one clear heading per screen, grouped sections with visible units, and quiet dividers.
Avoid decorative hero bands, marketing proof, oversized editorial headlines in field forms,
unsourced testimonials, or invented impact figures. Any future imagery needs approved content
and rights; no Clay logos, copy, artwork, screenshots or proprietary assets are copied.

## 2. Surfaces, tokens, and themes — DES-02

Token sources: [shared globals](src/components/ui/globals.css) and
[app globals](src/app/globals.css). Preserve their existing cascade and semantic aliases.
No token additions or palette changes are specified.

| Role / token | Existing light value | Existing dark value | Product use |
| --- | --- | --- | --- |
| Page `--page` / `--background` | `oklch(0.985 0.001 286.376)` | `oklch(0.209 0.004 264.477)` | Main page backdrop |
| Canvas `--canvas` | `oklch(0.961 0.002 247.84)` | `oklch(0.231 0.004 264.487)` | Existing navigation and quiet surrounding regions |
| Surface `--surface` | `oklch(1 0 0)` | `oklch(0.26 0.006 271.191)` | Cards, result panels, dialogs and drawers |
| Inset `--inset` | `oklch(0.979 0.002 247.839)` | `oklch(0.243 0.004 264.492)` | Fields, table headings, user-message backgrounds |
| Primary text `--ink` / `--foreground` | `oklch(0.247 0.006 258.361)` | `oklch(0.964 0.002 247.839)` | Headings, measurements, primary content |
| Secondary text `--ink-2` / `--muted` | `oklch(0.506 0.01 264.477)` | `oklch(0.731 0.008 260.731)` | Supporting context, units, labels for metadata |
| Rule `--line` | `oklch(0.946 0.003 264.542)` | `oklch(0.308 0.006 258.354)` | Dividers and surface edges |
| Field edge `--line-strong` | `oklch(0.912 0.005 258.326)` | `oklch(0.356 0.007 264.474)` | Input and interactive boundaries |
| Normal primary `--primary` / `--accent` | Aliases `--ink` | Aliases `--ink` | Normal actions, selection and focus |
| Primary foreground `--primary-foreground` | Aliases `--canvas` | Aliases `--canvas` | Text on primary actions |
| Selection `--primary-tint` / `--accent-tint` | Aliases `--hover-2` | Aliases `--hover-2` | Neutral active navigation and highlights |

Semantic feedback uses existing `--green`/`--green-tint`, `--orange`/`--orange-tint`, and
`--red`/`--red-tint`; app aliases `--success` and `--danger` remain intact. Use status text and
icons alongside these tints. Do not use green as the normal action palette or imply that higher
carbon values are scientifically “better” through an invented color scale.

Radius remains `--radius: 10px`: chips 6 px, controls 8 px, cards 10 px, window token 14 px.
The existing Dialog uses the 10 px base radius; do not assume every overlay uses 14 px.
Use `--shadow-card` for cards, `--shadow-overlay` for overlays, and existing button shadows.
Preserve the theme-specific hairline/shadow definitions. Do not add a heavy shadow to every
section or introduce copied pastel backgrounds and gradients.

Theme persistence is part of the design contract (NFR-06): root layout validates the site-wide,
year-long `theme` cookie and applies `data-theme` during SSR; ThemeProvider owns changes.
Use [ThemeToggle](src/components/ui/theme-toggle.tsx) where an approved screen needs a control,
without adding it to the centered landing. Navigation, sandbox reset, refresh, and portaled
popups preserve the saved theme. Invalid or missing cookie values use the existing light default.
Map imagery is provider content: do not invert tiles to simulate dark mode. The surrounding
controls, labels, legend and details use app tokens; any alternate basemap remains Q-06.

## 3. Typography and information hierarchy — DES-03

Use normal Inter through `--font-ui`, with the existing sans-serif fallback. Do not substitute
Inter Tight, Manrope, DM Sans or a serif. Keep ordinary sentence case and normal body tracking.
The hierarchy extends existing `.page-heading`, `.field`, `.ui-table` and overlay styles.

| Role | Specification | Application |
| --- | --- | --- |
| Product page title | Existing `.page-heading h1`: 30 px below 640 px, 36 px from 640 px; weight 600, tight tracking | Plot list, entry, detail, map, export/chat experiences |
| Section title | 18 px / 28 px line height, weight 600 | Plot context, tree measurements, soil inputs, carbon results, sources |
| Dialog title | Existing Dialog: 20 px / 28 px, weight 600 | Focused confirmations/actions |
| Drawer / AlertDialog title | Existing 18 px / 28 px, weight 600 | Read-only plot preview / destructive confirmation |
| Result number | 30 px / 36 px, weight 600, tabular numerals | Approved component results; unit remains adjacent or immediately below |
| Body and field label | 14 px / 20 px; label weight 500, body weight 400 | Instructions, form labels, input text |
| Supporting paragraph | 14 px with relaxed line height | Concise screen context and calculation explanations |
| Metadata / field error | 12 px / 16 px | Method/version/date, source notes, validation |
| Shared table | Existing 12 px / 16 px; headings weight 500 | Read-only tree/soil/result records |
| Shared medium Button | Existing 12.5 px, weight 500, leading-none | Desktop actions; preserve all size-specific styles |

Use one h1, ordered section headings, persistent labels and a short explanation before dense
content. Do not use an eyebrow as the only field label. Scientific names keep their appropriate
capitalization; captions include units such as DBH (cm) and carbon (Mg C/ha). Never shorten
biomass and carbon into an ambiguous shared label.

Align comparable values to the right in tables and use tabular numerals. Keep identifiers and
scientific names readable and allow long labels/sources to wrap. Precision, decimal conventions,
localization and rounding remain Q-04/Q-08/Q-09; no display precision or locale is invented.

## 4. Existing components and interaction rules — DES-04

All reusable controls remain in `src/components/ui/`. Preserve Base UI semantics, Lucide and
MIT attribution; product composition belongs in the assigned feature's category folders.

| Need | Existing component / contract | Design rule |
| --- | --- | --- |
| Actions | [Button](src/components/ui/button.tsx), [IconButton](src/components/ui/icon-button.tsx) | `primary` for the main normal action, `secondary` for alternatives, `ghost`/`quiet` for low-emphasis actions, `danger` for destruction; default variant remains ghost |
| Text and numbers | [Input](src/components/ui/input.tsx), [Textarea](src/components/ui/textarea.tsx), [NumberInput](src/components/ui/number-input.tsx) | `.field` labels above controls; 8 px label/control gap; errors below with `aria-invalid` and description links |
| Reference choices | [Select](src/components/ui/select.tsx), [Combobox](src/components/ui/combobox.tsx), [RadioGroup](src/components/ui/radio-group.tsx) | Use only approved reference lists; Select/RadioGroup support value/label pairs; current Combobox takes string options, not arbitrary record objects |
| Date input | [DatePicker](src/components/ui/date-picker.tsx) | Existing native date Input; no calendar-overlay capability is assumed |
| Surfaces and metadata | [Card](src/components/ui/card.tsx), [DescriptionList](src/components/ui/description-list.tsx) | Card has 20 px padding; DescriptionList rows have 16 px padding and a 120 px desktop label column from 640 px |
| Read-only records | [Table](src/components/ui/table.tsx) | Semantic caption/headers, focusable horizontal-scroll region; normal rows use existing 12 px cell padding |
| Optional local search/sort | [DataTable](src/components/ui/data-table.tsx), [SearchInput](src/components/ui/search-input.tsx) | Use only if Q-10 approves the interactions; DataTable always adds search/sort/pagination over supplied rows and does not fetch product data |
| Grouped navigation | [Breadcrumbs](src/components/ui/breadcrumbs.tsx), [Tabs](src/components/ui/tabs.tsx) | Breadcrumbs need approved destinations; Tabs are optional if Q-10 chooses grouped panels, not a decision to split screens |
| Overlays | [Dialog](src/components/ui/dialog.tsx), [Drawer](src/components/ui/drawer.tsx), [AlertDialog](src/components/ui/alert-dialog.tsx) | Dialog/AlertDialog support busy gating; Drawer is appropriate for read-only preview and has no busy contract |
| Status | [Notice](src/components/ui/notice.tsx), [Badge](src/components/ui/badge.tsx), [EmptyState](src/components/ui/empty-state.tsx), [Spinner](src/components/ui/spinner.tsx), [Skeleton](src/components/ui/skeleton.tsx) | Pair plain-language status with icons/units; Notice supports error/success/info, not an invented warning prop |
| Progress | [ProgressBar](src/components/ui/progress-bar.tsx) | Show a percentage only when the operation supplies real progress; otherwise use a labeled Spinner |

Shared Button sizes remain xs/sm/md/lg at 24/28/32/40 px. Medium uses an 8 px control radius,
6 px gap, 12 px horizontal padding, and 0.98 press scale. Mobile field actions use existing `lg`
where practical; desktop uses `md`. Do not enlarge the shared defaults, add pill variants, add
per-button colors, or weaken disabled/loading behavior. Button-like navigation uses
`nativeButton={false}`, `role="link"`, and `render={<Link href="…" />}`. Inline links and
navigation rows keep their own link presentation.

Inputs retain the existing 38 px minimum height, 12 px horizontal/8 px vertical padding and
8 px control radius. Textarea's existing minimum is 112 px. NumberInput uses Base UI NumberField;
step, min/max and scientific precision are data decisions, not design defaults. Mobile hit-area
and font behavior must be verified rather than declaring the desktop controls field-tested.

Dialog remains `min(520px, 100vw - 32px)`, max height `100dvh - 48px`, with 24 px padding
and 28 px from 640 px. Drawer remains `min(400px, 100vw - 24px)` with 24 px padding.
Preserve keyboard dismissal, focus trapping and return to the trigger. Pending mutations use
Dialog/AlertDialog's busy contract; do not place a mutating form in Drawer and assume it prevents
dismissal. Full tree/soil entry belongs in the main content, not a small modal.

Destructive operations appear only where the approved permission/deletion contract allows them
(Q-03/Q-15). Name the affected record and consequences, offer Cancel, and use the existing
`danger` Button for confirmation. Failure keeps context and input available. Do not add plot,
survey, or dataset deletion merely to mirror the example project screen.

## 5. Layout, spacing, density, and screen mapping — DES-05

### Shared product composition

Retain the existing private AppShell where approved product routes use it. Desktop shell begins
at 1024 px with a 240 px sidebar; below that it uses the existing wrapping navigation above
content. No new shared branded header, workspace preview or customization screen is specified.
Product destinations and changes to the example navigation remain Q-10/Q-16.

Use `.app-content`: maximum container width 1280 px including padding; 24 px horizontal and
36 px vertical padding below 1024 px; 40 px horizontal and 48 px vertical padding on desktop.
The width is within the main region after the sidebar. Keep `min-width: 0` on grid children.
The existing `.page-heading` uses a 20 px gap and 36 px bottom margin; actions wrap beneath
its copy when they do not fit. Do not force a 12-column marketing grid into every data screen.

| Spacing | Use |
| --- | --- |
| 4–6 px | Icon/text and short inline status gaps; use the component's own gap |
| 8 px | Field label/control, control/hint, small action grouping |
| 12 px | Compact related rows, table cell horizontal padding |
| 16 px | Grid/card gaps, metadata padding |
| 20 px | Card padding and normal form-field separation |
| 24 px | Related content sections; mobile outer padding; overlay content separation |
| 28 px | Existing large-screen panel/dialog padding |
| 32–36 px | Major groups and title-to-content separation |
| 40–48 px | Desktop outer padding and vertical breathing room |

Use the existing density, not a new density toggle: readable vertical fields for field entry,
compact read-only tables for inspection, and a small set of result cards for calculation
outputs. Clay's spacing influence lives between sections and around explanations; it does not
inflate every row or replace tables with oversized cards.

### Screen-to-component specification

These are compositions for PRD SCR-01–SCR-12, not new routes. Core data appears only after its
contract and access rules are approved. Combining compositions into one page remains Q-10.

| PRD screen | Layout and content order | Existing controls / feature composition | Requirement and decision dependencies |
| --- | --- | --- | --- |
| SCR-01 — Landing | Preserve full-height centered `Open sandbox` button and 24 px outer padding; no hero, added content, logo or shared header | Existing home page and Button link to `/sandbox` | FR-22, DEC-05 |
| SCR-02 — Auth/confirmation | Preserve existing narrow auth forms and routes, labels, validation, confirmation/retry and configuration notices; no Clay marketing shell | Existing AuthForm/ResendConfirmation, Input, Button, Notice | FR-11/FR-22; Q-02/Q-03 |
| SCR-03 — Plot selection | Page title/context, permitted create action, then accessible plot records. One full-width Table with 16 px surrounding gaps; mobile keeps a labeled scroll region | Table, Button, EmptyState, Spinner/Skeleton, Notice; SearchInput/DataTable only if approved | FR-01/FR-09/FR-21; Q-03/Q-05/Q-10 |
| SCR-04 — Plot/tree entry | Form region max 672 px; plot context first, location second, repeated tree records next, save actions last. Card groups separated by 24 px; fields 20 px apart, one column below 768 px and two above when related fields fit | Card, Input, NumberInput, approved Select/Combobox, DatePicker, Textarea, Button, Notice. Reuse ProjectForm's RHF/error pattern, not its project schema or status field | FR-01–FR-03/FR-09; Q-03–Q-07/Q-15 |
| SCR-05 — Soil input | Preserve plot/survey context, then approved sample/layer groups, then lab inputs and validation. Editable groups max 672 px with the same field spacing; read-only records use Table below, not an unprovided spreadsheet editor | Card, Input/NumberInput, DatePicker as required, Table, Notice, Button; method-required fields only | FR-06/FR-09; Q-03–Q-05 |
| SCR-06 — Carbon detail | Plot context, completeness Notice, component results, total summary, source measurements and methodology. Results use one column below 640 px, two above; up to four at 1024 px only when each card retains at least 160 px width; 16 px gaps, 20 px padding | Card, DescriptionList, Badge, Notice, Table; Accordion for lengthy method detail only with critical completeness text always visible | FR-05–FR-07/NFR-02/NFR-03; Q-04/Q-05/Q-10/Q-16 |
| SCR-07 — Plot map | Page context first, map second, selected-plot summary and an equivalent accessible selection list nearby. From 1024 px use flexible map plus 320 px detail region with 24 px gap; below that stack map, selection and detail. Presentation target: map height 480 px desktop, 320 px mobile | New feature map integration plus existing Card, Button, Table/list links, Notice/Spinner and DescriptionList. Optional read-only Drawer if overlay preview is approved | FR-04/FR-21; Q-03/Q-06/Q-10/Q-13 |
| SCR-08 — Export | Selection/context, approved formats, explanation of included data/methods, export action, operation feedback. Max 672 px interaction region; 20 px field gaps; a separate export-center route is not implied | Select or RadioGroup only for approved format choices, Button, Notice, Spinner, ProgressBar when progress exists | FR-08/FR-14; Q-03/Q-09/Q-10 |
| SCR-09 — Manager chatbot | Title/access context, conversation, source results immediately following relevant answers, composer last. Max 672 px readable conversation; messages 16 px apart; 20 px surface padding; source rows 8 px apart | Feature conversation from Card, Textarea/Input, Button, Notice, Spinner, source links and DescriptionList; existing scripted ChatComposer is not a live conversation controller | FR-11/FR-12/FR-21; Q-02/Q-03/Q-08/Q-13 |
| SCR-10 — Visitor chatbot | Same readable conversation composition with approved educational context and source material; no private shell identity, plot records or manager controls. Public destination remains undecided | Card, Textarea/Input, Button, Notice, Spinner, educational source links; optional theme control in this experience, not an added landing control | FR-13/FR-21; Q-03/Q-08/Q-13/Q-14 |
| SCR-11 — Sandbox | Preserve the public catalog, all 81 demos, existing navigation/mobile dialog, selected demo and theme toggle; no product records | Existing Sandbox, SidebarNav, ComponentPreview, Dialog, ProjectForm sample | FR-22, DEC-04/DEC-06 |
| SCR-12 — Project examples | Preserve current protected overview/list/detail, project counts, cards, forms and confirmed deletion; no conversion to mangrove plots | Existing AppShell, ProjectsView, ProjectCard, ProjectForm, DataState and Dialog | FR-11/FR-22, DEC-02/DEC-03; Q-16 |

### Scientific result and location detail

AGB carbon, BGB carbon and SOC each show a clear label, value when available, and Mg C/ha.
Keep biomass outputs separately labeled if the approved content includes them. Total is a
complete value only when required components exist. If SOC is unavailable, use readable
“Incomplete — soil carbon unavailable” context, “Not calculated” for SOC, and identify any
biomass-only subtotal explicitly. Do not display zero, a fabricated total, a completion percentage,
or a verification badge inferred from missing fields. Required field lists and final wording
await the method/language decisions.

Place plot identity and selected calculation context above values. Methods/sources are available
within the same composition; critical missing-data messages never depend on opening an
Accordion. No cross-plot totals, species counts, charts, carbon rankings, trend lines or review
statuses are selected here. SnapshotChart exists for trend snapshots but cannot invent repeat
surveys or communicate a component breakdown; chart scope remains Q-10/FR-19.

Use a neutral marker/outline to identify the selected plot, with a text identifier in the details.
Do not specify clustering, carbon heatmaps, boundaries, GPS accuracy thresholds or filter chips
before Q-06/Q-10 settle them. Any selected map overlay must keep provider attribution visible;
selecting via an accessible list must reach the same authorized detail as selecting a marker.

## 6. States, accessibility, and motion — DES-06

| State | Presentation and behavior |
| --- | --- |
| Loading | Preserve screen/section identity; use Skeleton for layout and one labeled Spinner/status. Do not show invented numbers while results load |
| Empty | EmptyState with product-specific title/context; create action only when permitted. Distinguish no records from an inaccessible or failed request |
| Unavailable | Neutral explanation with an approved return/retry path; unknown and inaccessible records share the safe unavailable state without leaking private identifiers |
| Validation | Persistent label, visible unit, field error text, `aria-invalid`, linked descriptions, keyboard focus to the failing field/error summary; retain entered values |
| Pending save/export | Loading Button, disabled duplicate action and labeled status; do not announce success before persistence/download succeeds |
| Save/service failure | Inline Notice with a useful retry path; preserve entered form text or unanswered prompt and selected plot context |
| Calculation incomplete | Always-visible completeness text and missing input/component labels; no SOC-as-zero or false total |
| Chat unsupported/no data | Plain response explaining the limit; manager answers identify accessible source results; education answers use approved sources without private retrieval |
| Destruction | Named consequence, semantic danger action and secondary Cancel; cancellation makes no change; failure retains confirmation/context |

Existing DataState contains fixed project copy; retain it for SCR-12. Product states compose
EmptyState, Skeleton/Spinner and Notice instead of presenting “Getting your projects” for
plots. Toasts, if an approved ticket needs them, use the existing neutral ToastProvider surfaces,
status icons and subtle tints without colored borders; ToastProvider is not installed at root.
Use inline Notice for persistent scientific errors and essential save feedback.

Preserve the root skip link, landmarks, semantic table captions/column headers, labels and
units. All icon-only controls need a specific accessible name. Use Lucide icons for product
controls; decorative icons are hidden from assistive technology. Color, position, map imagery
and hover alone must never convey a required status or action.

Retain the existing 2 px neutral focus outline with 3 px offset. Check field/NumberInput focus,
Base UI keyboard selection, dialogs/drawers and focus return. Keep interactive targets at least
the existing 24 px minimum, use the 40 px large Button for mobile field actions, and preserve
spacing between adjacent controls. Do not claim outdoor/touch suitability without field checks.
Text and focus contrast require measured verification in both themes; token names alone are not
proof of accessibility.

Conversation text must be readable and available to assistive technology without per-character
announcements. Use polite status for sending/responding and announce completed answers.
Do not auto-focus the composer on page load or force a user reading an earlier answer to scroll.
Send through the shared Button; no model picker, dictation, uploads or source-tagging workflow
is implied by the sandbox's chat demos. Final input/send conventions and supported language are
DQ-04; expose only approved actions.

Preserve the existing reduced-motion CSS. No decorative lifts, parallax, animated 3D artwork
or required entrance animation. StreamText now displays complete text immediately when
reduced motion is enabled and reacts to preference changes. If answer streaming is later
approved, add accessible completed-answer announcements in the feature; the shared helper
does not establish service or conversation behavior. Static answer text is sufficient for
this specification.

## 7. Justified gaps and reuse limits — DES-07

| Gap / limit found in source | Smallest complete direction | Blocker |
| --- | --- | --- |
| No geographic map or GPS integration | Add the assigned feature's map/location composition around existing controls. Select provider/library and accessible keyboard/list behavior before implementation; do not build or replace a UI library for it | FR-03/FR-04, Q-06/Q-07/Q-13 |
| ChatComposer exposes scripted replies, only the first two messages, preset initial prompt and demo actions | Compose a feature conversation with existing text/input/Button/status controls and genuine result/source state; keep the sandbox demo. No second chat component library or fake service response | FR-12/FR-13, Q-08/Q-13 |
| PromptBar includes unrequested model, attachment and dictation interfaces | Use the simpler shared controls for the product composer; the demo remains in the public catalog | FR-12/FR-13, Q-08 |
| DataState hardcodes project language | Reuse existing configurable EmptyState/Spinner/Notice for product content. A shared-content API change is justified only if a later ticket needs that exact reusable behavior | FR-09/FR-22 |
| Table/DataTable provide cell rendering but no editing or data-change model | Compose repeated field groups from existing controls; do not add spreadsheet editing or remote filtering from an assumed need | FR-02/FR-06, Q-05/Q-10 |
| No domain carbon summary component | Feature composition of Card, DescriptionList, Table and Notice supplies results/provenance; not a missing reusable primitive | FR-05–FR-07, Q-04/Q-05 |
| Input/NumberInput and chat primitives have no proof of mobile field or service accessibility | Include 360 px, zoom, keyboard, touch, focus and reduced-motion verification in the relevant ticket; adjust only a demonstrated issue within approved scope | NFR-05/NFR-06, Q-11/Q-12 |

No map, chart, async species search, form wizard, new layout system, new UI library, paid service
or dependency is selected by this document. Admin/review/import/offline/history/attachment
interfaces remain conditional PRD proposals. The current component gaps do not authorize them.

## 8. Responsive composition — DES-08

These rules use the existing Tailwind/CSS breakpoints and shared sizes; they are product
presentation specifications, not claims of measured Clay responsive behavior.

| Width | Composition |
| --- | --- |
| 360–639 px | 24 px outer horizontal padding; one-column forms and result cards; heading/action rows wrap. Existing navigation appears above content. Map 320 px high, details below. Tables scroll inside their labeled region |
| 640–767 px | Existing title rises to 36 px; result cards may use two columns; overlays use existing 28 px padding. Fields remain stacked |
| 768–1023 px | Related field pairs may use two columns with 16 px gaps; max 672 px form width. Map and details remain stacked; no extra navigation shell |
| 1024 px and above | Existing 240 px sidebar and 40/48 px content padding; map/detail split and result grid follow DES-05; main container remains capped at 1280 px |

At 360 px, 24 px gutters leave 312 px of main content before inner card padding. Cards, controls,
overlays, source URLs and long plot/species labels must fit or wrap; horizontal overflow belongs
only to a deliberate table/map viewport. Never shrink a whole table to illegible text. Stack
DescriptionList labels above values below 640 px using its existing behavior. Stack or wrap
form actions when necessary; keep labels readable rather than truncating them to fit.

Allow normal page scrolling and keyboard visibility for field/chat input. No sticky mobile
composer, persistent footer or full-screen app trap is specified. Maps do not monopolize touch
scrolling; pan/zoom behavior remains a provider/accessibility decision. Overlay content scrolls
within the existing viewport bounds, with the dismiss action reachable at zoom and small sizes.

## 9. Prototype and implementation verification — DES-09

The agreed Figma scope is still Q-01. For included journeys, show mobile field entry at 360 px
and desktop management at 1440 px, plus 768/1024 px transition frames where the composition
changes. Include both themes; use the token roles and shared sizes above. Mark simulated data,
answers and map content as prototype material, not approved scientific results or live services.
Do not add navigation to a proposed feature merely to fill a prototype frame.

Before a relevant implementation can be accepted:

1. Check the assigned PRD requirements, decided content/access contracts and BACKLOG ticket.
2. Verify spacing, typography, focus, error/empty/pending states and small-screen wrapping
   against DES-02–DES-08; preserve the examples and public sandbox.
3. Verify keyboard navigation, table-scroll access, native/Base UI fields, dialog busy handling
   and focus return; check zoom and contrast in both themes.
4. Verify theme on fresh request, refresh, navigation, sandbox reset and portaled overlays.
5. Verify missing SOC, calculation provenance and units; unauthorized plot content must not
   appear in map/details, exports or chat source links.
6. Verify reduced motion for timers and CSS animations, then run the repository's required
   typecheck, lint, tests and build. Perform approved scientific/isolation checks where relevant.

This documentation revision performed source inspection only. It does not establish browser
interaction, theme rendering, contrast compliance, field usability, scientific validity or
service availability. These checks belong to implementation evidence, not reference prose.

## 10. Unresolved decisions and documentation coordination — DES-10

The user has selected Clay as primary inspiration and retained the neutral shared UI. No new
palette, alternate font, pill Button or branded header remains proposed by this specification.
The following decisions remain open; PRD question IDs remain canonical for product behavior.

| Design question | Decision needed | Affected screens / requirements | PRD link |
| --- | --- | --- | --- |
| DQ-01 | Final screen grouping, product destinations, navigation labels and whether examples coexist or are replaced; this document supplies compositions, not a sitemap | SCR-03–SCR-10/SCR-12; FR-07/FR-22 | Q-10/Q-16 |
| DQ-02 | Exact plot/tree/soil fields, required/optional labels, units, duplicate rules, precision, calculation method context and result/history selection | SCR-04–SCR-06; FR-01/FR-02/FR-05–FR-07/FR-09 | Q-04/Q-05/Q-15 |
| DQ-03 | Satellite basemap/analysis distinction, provider, GPS/manual entry behavior, accessible map controls, attribution, public fields and any preview/filter/legend content | SCR-04/SCR-07; FR-03/FR-04/FR-21 | Q-03/Q-06/Q-07/Q-10/Q-13 |
| DQ-04 | Product language and final copy, chatbot scope/questions, source/citation format, input/send conventions, unsupported-answer wording and live versus mocked delivery | SCR-09/SCR-10; FR-12/FR-13 | Q-01/Q-03/Q-08/Q-13 |
| DQ-05 | Dataset/report formats, columns, selection controls, headers/template, Excel/CSV layout and licensed map content in reports | SCR-08; FR-08/FR-14 | Q-09/Q-10 |
| DQ-06 | Roles, onboarding, permitted actions, publication indicators, draft/review states, correction/delete consequences and retention | SCR-02–SCR-10; FR-11/FR-16/FR-21 | Q-02/Q-03/Q-15 |
| DQ-07 | Required summary metrics/charts, search/filter/sort/pagination, accessible data scale and field device/browser support | SCR-03/SCR-06/SCR-07; FR-07/NFR-05/NFR-07 | Q-10/Q-11 |
| DQ-08 | Figma/working-release scope, deadline and prototype/field/accessibility assessment evidence and sign-off | Included product screens; FR-10/FR-24 | Q-01/Q-12 |
| DQ-09 | Visitor education destination and any approved original educational imagery/content; preserve the centered landing and public sandbox | SCR-01/SCR-10; FR-13/FR-22 | Q-08/Q-14 |

[AGENTS.md](AGENTS.md) and PRD.md still describe the previous DESIGN.md as a Clay marketing
reference with conflicting proposals. This revision supersedes those proposals with the user's
neutral-UI/Clay composition direction; it does not edit those other documents. A subsequent
alignment should refresh their description and old section references while retaining their
rules. Q-14's public-entry/content decisions and other product blockers remain unresolved.
No feature tickets, code, tokens, providers, dependencies, routes or services change here.

## 11. Supplied dashboard content preference — DES-11

Accepted 2026-10-14: the user supplied three mangrove dashboard screenshots and requested
“use this as the dashboard content preference.” Retain the neutral visual direction, current
UI library, Inter and tokens from DES-01–DES-04. The green sidebar, gradients, brand/logo,
researcher identity, exact site, study dates and example figures in those images are not
adopted. This decision specifies prototype content grouping; it does not approve scientific
methods, persisted fields, a live aggregate, role changes or replacement of starter routes.

Sources: [summary and entry](docs/design/mangrove-dashboard-reference/overview-and-field-input.png),
[biomass and soil](docs/design/mangrove-dashboard-reference/biomass-and-soil.png),
[total carbon](docs/design/mangrove-dashboard-reference/total-carbon.png).

| Content ID | Preferred content and screen mapping | Existing UI / concrete composition | Remaining contract |
| --- | --- | --- | --- |
| CNT-01 | Ringkasan: study context, mean stock, CO₂ equivalent, site, measured plot count; carbon composition and selectable plot detail (SCR-03 / FR-07) | Neutral Card introduction, four metric Cards with 16 px gaps; desktop composition and plot list in approximately 60/40 columns with 24 px gap; mobile stack in reading order | Q-04/Q-10: mean weighting, included plots, incomplete plots, CO₂ conversion and period definition. Use unavailable values until settled |
| CNT-02 | Input data lapangan: active plot context, repeatable tree measurements, sediment layers (SCR-04/SCR-05 / FR-01/FR-02/FR-06) | Plot context Card, tree section and soil section separated by 24 px; shared Select/NumberInput and semantic Table; neutral Add tree/Add layer Buttons. Desktop table, mobile labeled controls or horizontal read-only Table | Q-04/Q-05/Q-15: height, wood density, depth, LOI, ranges and required versus optional fields. Prototype columns are illustrative, not a schema |
| CNT-03 | Perhitungan AGB & BGB: method context, per-tree breakdown, distinct biomass/carbon and plot subtotals (SCR-06 / FR-05/FR-07) | Two method Cards at 50/50 width with 24 px gap, stacked on mobile; Table beneath; three result Cards for AGB carbon, BGB carbon and combined biomass carbon when approved | Q-04/Q-05: equations, wood-density source, conversion factors, units and precision. Display “method awaiting approval” instead of selecting the pictured equations |
| CNT-04 | Bulk density & SOC: method context, layer profile and summed SOC (SCR-05/SCR-06 / FR-06/FR-07) | Two neutral method Cards, semantic layer Table, input-completeness Notice and profile result. Right-aligned numeric columns with visible units | Q-04/Q-05: layer definitions, dry mass/volume calculation, LOI-to-carbon conversion and summation. Missing laboratory inputs cannot become zero |
| CNT-05 | Stok karbon total: selected plot total, component breakdown, CO₂ equivalent, cross-plot recap and report entry (SCR-06/SCR-08 / FR-07/FR-14) | Prominent neutral result Card plus component Table, desktop 60/40 columns and mobile stack; full-width recap beneath; shared report Button | Q-04/Q-09/Q-10: totals/CO₂ method, report contract and selection. Missing SOC keeps total incomplete; no successful real download in the static prototype |

Prototype labels use Indonesian to echo these supplied content references. Final product
language and decimal localization remain DQ-04/Q-08; this is not a localization commitment.
The five content panels are a navigable Figma proposal, not accepted separate URLs. Plot tabs,
period selection, notifications, user profile and sidebar destinations still require Q-10;
do not add those interactions solely because they appear in the reference.

Composition charts use labels and an accessible table containing the same data. The prototype
shows an incomplete track when SOC is missing, rather than drawing a complete stacked bar.
If a later complete chart uses component colors, supply labels/patterns as well; exact chart
colors remain undecided. Destructive removal retains semantic danger controls and confirmation
once permissions/deletion consequences are accepted.

Figma additions appear on `Dashboard content · supplied references`: five content panels at
1440 px and 360 px, light and dark (20 editable frames). The existing 12-screen prototype is
retained. A Figma frame cannot establish calculation accuracy, persisted entry, authentication,
keyboard behavior or accessibility conformance.

DQ-07 is partially resolved by CNT-01–CNT-05: preferred metrics and content groups are now
known. Aggregate definitions, filters, scale, routes and device verification remain open.
