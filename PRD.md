# Product Requirements Document (PRD)

## Web-Based Information System for Mangrove Carbon Stock Inventory

| Attribute | Detail |
| --- | --- |
| Version | 1.1 — brief organized against the inspected starter |
| Status | Draft for PIC validation; unresolved requirements are not ready for implementation |
| Product | Mangrove Carbon Stock Inventory |
| Platform | Responsive web application |
| Initial context | Mangrove conservation and field inventory in East Surabaya |
| Deliverable stated in brief | Figma prototype; working website scope and deadline require PIC confirmation |
| Review cadence stated in brief | Weekly progress review, every Monday at MCI Lab |

## 1. Sources and decision status

This revision uses the product brief and meeting-note summary already recorded in the previous
PRD. No separate new brief accompanies this request. The original meeting notes and 2026 ITS
proposal are not present in the inspected repository; their summaries are retained as source
notes, not independently verified scientific specifications.

The recorded brief asks for field plot input including species and diameter at breast height
(DBH), automatic AGB/BGB/SOC calculations reported in Mg C/ha, a per-plot dashboard and map,
report and CSV/Excel exports, a visitor education chatbot, a manager plot-data chatbot, a Figma
prototype, existing-system research, improved manual field recording including coordinates,
satellite-connected mapping, and Monday progress reviews.

Requirement status means:

- **Brief:** requested in the recorded brief. Inclusion in a particular release still depends
  on the MVP decision in Q-01.
- **Dependency:** necessary for a brief requirement or inherited from repository guardrails.
  Missing details remain blocked by their listed questions.
- **Proposed:** introduced by the earlier draft rather than established by the brief. No
  implementation commitment exists until PIC decides.

Existing functional IDs **FR-01 through FR-20 retain their meanings**. Added functional,
non-functional, starter-decision, journey, screen, and question IDs are stable references;
retired IDs must not be reassigned. Acceptance criteria below specify what must be demonstrated
once the affected decisions are settled; they are not claims of current functionality.

## 2. Problem, outcome, and MVP boundary

Field tree measurements, coordinates, and soil laboratory results are recorded separately and
then compiled for carbon calculations and reporting. The intended outcome is one traceable
workflow connecting plot observations, approved calculations, spatial results, and exports,
with separate educational and authorized operational chatbot experiences.

The **MVP candidate** is an end-to-end plot workflow: enter plot and tree measurements, provide
soil inputs required by the approved method, calculate carbon components, inspect a plot on the
dashboard/map, and export results. Both chatbot journeys belong to the brief and remain in
planning; their functional versus Figma-only delivery is unresolved. This PRD does not silently
move either chatbot or report export to a later release.

The immediate brief deliverable is a clickable Figma prototype. Whether the first assessed
release also includes a working website, which flows must work, and the deadline are **Q-01**.
There is no approved P0/P1/P2 release allocation. A working release with restricted field data
must include authorization and ownership controls; security cannot be postponed merely because
the earlier draft labeled roles P1.

Success must be demonstrated through the journeys and requirement criteria below. Numeric
targets for entry time, error reduction, scientific tolerance, performance, and final assessment
have not been supplied (Q-04, Q-11, Q-12).

## 3. Users and access needs

These are user needs, not an approved role or permission matrix.

| User ID | User | Need and source status | Unresolved permissions |
| --- | --- | --- | --- |
| USR-01 | Person recording field measurements | Enter plots, species, DBH, and coordinates; field capture is in the brief | Who may create, edit, correct, or delete which records; individual versus shared ownership (Q-02, Q-03, Q-15) |
| USR-02 | Researcher / carbon analyst | Supply soil/lab inputs and validate calculation methods; proposed operational persona supporting the scientific workflow | Whether this is a separate role; access to other surveyors' records; authority over formulas and results (Q-02, Q-04, Q-05) |
| USR-03 | Site manager | Inspect plot results and use the plot-data chatbot; named in the brief | Site/team read access, export rights, approval authority (Q-02, Q-03, Q-08) |
| USR-04 | Ecotourism visitor | Receive mangrove and conservation education through the visitor chatbot; named in the brief | Whether any map, coordinates, or results are public (Q-03, Q-08) |
| USR-05 | Administrator | Manage accounts, reference data, and configuration; proposed in the earlier draft | Whether an admin interface is needed and who operates it (Q-02, Q-04) |

## 4. User journeys

### JRN-01 — Record a field plot

1. Enter through the approved access path; the starter's existing sign-in remains available.
2. Open or create a plot and enter its agreed identifier, survey information, and coordinates.
3. Enter species and DBH for multiple trees, plus inputs required by the approved equations.
4. Check the plot position on the satellite-connected map.
5. Correct validation errors and save; reopen measurements to check persistence.

Invalid inputs identify the affected field. Failed saves retain values and show failure;
pending submission prevents duplicate saves. Manual coordinate entry, GPS assistance, draft
states, and offline persistence require their respective decisions. If map tiles fail, the
measurement form must remain usable. References: FR-01–FR-04, FR-09, FR-21; Q-02–Q-07, Q-15.

### JRN-02 — Produce a carbon result

1. Open a plot's tree measurements and associated soil laboratory inputs.
2. Confirm that all inputs required by the approved method are available and valid.
3. Calculate AGB and BGB biomass, convert biomass to carbon, and calculate SOC.
4. Inspect the component breakdown, units, method reference, and input completeness.
5. Open the same result from the plot dashboard.

Missing soil data must leave total ecosystem carbon incomplete, rather than silently treating
SOC as zero. No approval/publishing state is assumed. References: FR-05–FR-07, FR-09, NFR-02,
NFR-03; Q-03–Q-05.

### JRN-03 — Inspect and export plot information

1. Open the plot dashboard or map and select an accessible plot.
2. Inspect tree information, carbon components, and missing-data indicators.
3. Request the agreed dataset or report export.
4. Open the downloaded file and reconcile its records, units, and results with the plot view.

Empty datasets, inaccessible plots, and failed downloads have explicit states. Search/filter
choices and whether multiple plots may be aggregated remain unresolved. References: FR-04,
FR-07, FR-08, FR-14, FR-21; Q-03, Q-06, Q-09, Q-10.

### JRN-04 — Ask a manager data question

1. Authenticate and open the manager chatbot through the approved access path.
2. Ask about accessible plot data, such as a plot's carbon result.
3. Receive an answer traceable to the relevant plot/result and its completeness.

No accessible data, incomplete results, unavailable service, and unanswerable questions need
explicit responses. The chatbot obeys the same access rules as direct data access and exports.
Supported question types and verification requirements remain open. References: FR-11, FR-12,
FR-21, NFR-01; Q-01–Q-04, Q-08, Q-13.

### JRN-05 — Learn about mangrove conservation

1. Open the visitor education experience without access to internal field records.
2. Ask an educational question about mangroves, ecology, or conservation.
3. Receive an answer supported by approved material, or an explicit indication that the
   material does not support an answer.

The visitor chatbot must never retrieve restricted plots or precise unpublished coordinates.
Public map access is a separate unresolved decision. References: FR-13, FR-21, NFR-01;
Q-01, Q-03, Q-08, Q-13.

## 5. Functional requirements and acceptance criteria

| ID | Requirement | Status | Acceptance criteria | Open decisions |
| --- | --- | --- | --- | --- |
| FR-01 | Create, view, and edit plot records linked to field measurements | Brief | An authorized user can save and reopen a plot using the agreed identifier and fields; invalid required values are rejected; uniqueness follows the agreed scope | Q-01, Q-02, Q-03, Q-05, Q-15 |
| FR-02 | Record multiple trees per plot, including species and DBH in cm | Brief | Saved trees remain linked to the correct plot/survey; nonpositive DBH is rejected; inputs required by the selected method are validated and retain their units | Q-01, Q-03, Q-04, Q-05 |
| FR-03 | Assist coordinate entry with browser GPS and manual correction | Proposed | If selected, denied/unavailable GPS still allows valid manual coordinates; available accuracy is shown; no location capture occurs without browser permission | Q-01, Q-06, Q-07 |
| FR-04 | Provide an interactive plot map with satellite-connected context | Brief | Selecting a visible plot opens its matching details; failed map loading has an explicit state and does not discard measurements; imagery/source attribution follows approved terms | Q-01, Q-03, Q-06, Q-10, Q-13 |
| FR-05 | Calculate AGB/BGB biomass and corresponding carbon with approved methods | Brief | Approved reference inputs reproduce expected component results within the agreed tolerance; formulas, inputs, units, and versions are identifiable; unsupported/missing inputs cannot produce a successful result | Q-01, Q-04, Q-05 |
| FR-06 | Capture required soil/lab measurements and calculate SOC | Brief | Approved layer/sample inputs reproduce expected SOC; missing mandatory inputs are identified and never substituted with zero; LOI conversion uses only an approved method | Q-01, Q-04, Q-05 |
| FR-07 | Show a per-plot dashboard with carbon components in Mg C/ha | Brief | Displayed results match the selected plot and calculation; biomass and carbon are distinguished; total ecosystem carbon is complete only when all required components are available | Q-01, Q-03, Q-04, Q-05, Q-10, Q-16 |
| FR-08 | Export datasets in CSV/Excel formats | Brief | Agreed CSV and Excel outputs open successfully, identify records and units, match the authorized selection and displayed calculation, and distinguish missing values from zero; failure never reports a successful download | Q-01, Q-03, Q-09, Q-10 |
| FR-09 | Validate field inputs and calculation completeness | Dependency | Errors name the field and required correction; invalid coordinates, nonpositive measurements, and missing method inputs are rejected; validation also occurs at trusted data boundaries; failed save retains input | Q-04, Q-05, Q-06 |
| FR-10 | Deliver a clickable Figma prototype | Brief | Agreed mobile field and desktop management journeys can be demonstrated without dead ends; validation, missing SOC, empty/error states, exports, and chatbot scope are represented; simulated results are labeled | Q-01, Q-10, Q-12, Q-14 |
| FR-11 | Preserve authentication and define product access roles | Dependency | Existing email/password, confirmation retry, session refresh, safe return destinations, and logout remain; every implemented restricted operation enforces approved access rules, including direct requests | Q-02, Q-03 |
| FR-12 | Provide a manager chatbot for authorized plot-data questions | Brief | Supported answers identify source plots/results and missing data; unauthorized plots cannot be retrieved or inferred through answers; unsupported questions and service failures are explicit; queries do not mutate records | Q-01, Q-02, Q-03, Q-04, Q-08, Q-13 |
| FR-13 | Provide a visitor education chatbot | Brief | Supported answers use approved educational material; unsupported questions and service failures are explicit; testing confirms no access to restricted field records | Q-01, Q-03, Q-08, Q-13, Q-14 |
| FR-14 | Export a readable summary report | Brief | Approved report includes selected plot identity, carbon units/results, input completeness, and method references; content agrees with the dataset; format/template and any licensed map imagery are approved | Q-01, Q-03, Q-04, Q-09 |
| FR-15 | Import historical CSV/XLSX data | Proposed | If selected, users preview mapping and row errors before writing; ownership rules apply; invalid rows cannot be silently accepted; partial-import behavior follows the agreed contract | Q-01, Q-03, Q-05, Q-07 |
| FR-16 | Review, approve, reject, and publish data/results | Proposed | If selected, only approved actors perform agreed transitions; changed inputs cannot retain an invalid verification label; review history follows the agreed policy | Q-01, Q-02, Q-03, Q-15 |
| FR-17 | Preserve field drafts offline and synchronize later | Proposed | If selected, drafts survive agreed offline conditions and sync failures; conflicts are visible; no promised offline workflow silently loses measurements | Q-01, Q-07, Q-15 |
| FR-18 | Display additional satellite-derived data layers | Proposed | If selected, layers show source, date, legend, and permitted use; no imagery-derived carbon result is presented without an approved method | Q-01, Q-04, Q-06 |
| FR-19 | Compare repeated surveys over time | Proposed | If selected, observations from different dates remain distinguishable and comparisons use compatible methods/units; earlier results are not overwritten | Q-01, Q-04, Q-05, Q-15 |
| FR-20 | Attach field photographs | Proposed | If selected, files link to the correct plot/tree, obey access rules, and receive trusted file validation; failed uploads do not create false success | Q-01, Q-03, Q-13, Q-15 |
| FR-21 | Define and enforce ownership for all product records | Dependency | Approved matrix covers view/create/edit/delete/export/chatbot access; unauthorized cross-owner access is denied, including direct requests; linked measurements and derived results cannot bypass plot access; public responses expose only permitted fields | Q-02, Q-03, Q-08, Q-15 |
| FR-22 | Preserve the starter foundation while product adaptation is undecided | Dependency | Starter behavior satisfies the keep decisions in section 9; examples and sandbox samples are not presented as scientific product records or live services | Q-02, Q-10, Q-14, Q-16 |
| FR-23 | Research existing systems and product differentiation | Brief | Team records dated references, evidenced capabilities, workflow gaps, and unverified claims; no novelty claim relies only on an unverified feature list | Q-12 |
| FR-24 | Demonstrate weekly progress at Monday MCI Lab reviews | Brief | Each review records completed work, demo/Figma links when available, decisions, blockers, and next actions; assessment targets and participants are confirmed rather than invented | Q-01, Q-12 |

## 6. Screens and navigation

Screen IDs describe required experiences, not an approved sitemap or promise of separate pages.
The supplied dashboard references select prototype content groups (DEC-12 / DESIGN DES-11).
New product routes, grouping in the working app, filters, summary metric definitions and
dashboard-wide aggregation still require Q-10. Public entry routing also depends on Q-14.

| Screen ID | Experience | Essential content and states | Requirements |
| --- | --- | --- | --- |
| SCR-01 | Existing starter landing `/` | One centered button to `/sandbox`; no shared branded header | FR-22 |
| SCR-02 | Existing sign-in, registration, confirmation | `/login`, `/register`, `/auth/confirm`, `/auth/callback`; validation, expired-link retry, unconfigured auth, session failure | FR-11, FR-22 |
| SCR-03 | Plot list/selection | Accessible plots, entry to create/open a plot, loading/empty/error/unavailable states; search and filters undecided | FR-01, FR-09, FR-21 |
| SCR-04 | Plot and tree entry | Plot fields, coordinates, repeatable species/DBH inputs, visible units, validation, save/pending/failure states | FR-01–FR-03, FR-09 |
| SCR-05 | Soil/laboratory input | Required soil measurements with units and plot/survey links; invalid and incomplete input states | FR-06, FR-09 |
| SCR-06 | Plot detail/carbon dashboard | Tree context, AGB/BGB carbon, SOC, complete/incomplete total, method/provenance and calculation errors; additional metrics/charts undecided | FR-05–FR-07 |
| SCR-07 | Interactive map | Plot selection, satellite context, accessible plot details, map loading/failure; basemap toggle, boundaries and filters undecided | FR-04 |
| SCR-08 | Export interaction | Authorized selection, agreed CSV/Excel/report choices, progress, empty selection, download and failure states; separate export center undecided | FR-08, FR-14 |
| SCR-09 | Manager chatbot | Supported plot question, source results, incomplete/unavailable answer and service error | FR-11, FR-12, FR-21 |
| SCR-10 | Visitor education chatbot | Approved educational content, unsupported-answer/service-error states; no private data | FR-13, FR-21 |
| SCR-11 | Existing public sandbox `/sandbox` | All 81 demos, searchable alphabetical catalog, local sample state, theme control | FR-22 |
| SCR-12 | Existing project examples | `/dashboard`, `/projects`, `/projects/[id]`; protected project overview and private CRUD remain while adaptation is undecided | FR-11, FR-22 |

Admin, review/publishing, import, historical comparison, and attachment screens are conditional
on approval of their proposed requirements. This PRD does not add a marketing homepage,
customization page, workspace preview, or instructional design panel.

## 7. Data, science, and ownership

### 7.1 Minimum conceptual data

This is a data inventory for decision-making, not an approved database schema. The recorded
proposal summary mentions stations/plots, DBH, species, height, wood density, sediment cores,
and laboratory LOI. Required versus optional fields, allowed ranges, identifiers, survey
repetition, and scientific input rules must be settled through Q-04 and Q-05.

| Record | Needed information or method-dependent inputs | Relationship / decision |
| --- | --- | --- |
| Plot | Identifier, coordinates, area for hectare conversion; site/station and survey date as applicable | Identifier uniqueness and site hierarchy undecided |
| Tree measurement | Species, DBH (cm); height (m), wood density (g/cm³) and source where the method requires them | Linked to plot and, if adopted, a survey; tree identity rules undecided |
| Soil sample/layer | Sample identity, depth/thickness, dry mass, core volume or approved bulk density, measured %C or LOI with approved conversion, lab source | Linked to plot/survey; layers linked to a core if that model is approved |
| Method/reference | Equation form, coefficients, applicability, wood-density source, carbon fractions, LOI conversion, units and version | Scientific approver and configuration interface undecided |
| Calculation result | Source plot/survey and inputs, method/version, calculation date, carbon components, completeness and total when valid | Snapshot/history and recalculation policy undecided; result must remain traceable |
| Account/access | Authenticated identity and approved ownership/access relationship | Existing accounts have no product role or site membership model |
| Educational material | Approved mangrove/conservation content and source attribution | Content approver, language, update process and chatbot storage undecided |

Notes, conditions, zones, approval states, audit events, photos, and chat history are not mandatory
fields merely because they appeared in the earlier proposed schema.

### 7.2 Scientific contract

FR-05, FR-06, FR-07, FR-09, and NFR-02/NFR-03 require:

- Approved AGB and BGB equations with required species/DBH/height/wood-density inputs.
- Conversion from biomass to carbon before combining it with SOC.
- Soil inputs sufficient for the approved SOC method; species and DBH alone are insufficient.
- Consistent plot-area and layer-unit conversions, with results in **Mg C/ha**.
- Traceable input values, method references/versions, constants, and calculation date.
- Explicit incomplete results: unavailable SOC is never silently zero and a biomass-only result
  is never labeled complete ecosystem carbon.
- Approved reference examples, precision, rounding, and numeric tolerance before acceptance.

The previous PRD's proposal summary cites Komiyama et al. (2005), Kauffman & Donato (2012),
Malik et al. (2023), and IPCC guidance. Its listed AGB/BGB carbon fractions and CO₂ conversion
values are unvalidated proposal inputs, not implementation defaults. Exact equations, constants,
LOI conversion and applicability remain Q-04. CO₂-equivalent reporting is outside the current
brief scope unless explicitly selected.

### 7.3 Current ownership versus product ownership

The only application data table currently defined is `public.projects`. Each project has
`user_id` defaulting to `auth.uid()`; RLS restricts select/insert/update/delete to that user.
The trigger prevents ownership changes and preserves identity/creation time. Deleting an auth
user cascades deletion of that user's projects. Private query caches are scoped to user identity
and cleared on account changes/logout. No team membership, institutional owner, site permissions,
product roles, or public plot policy exists.

This is **example project ownership**, not an approved ownership policy for mangrove records.
Do not infer that a manager may read all surveyors' data or that creator-only ownership meets
the brief. The data steward, access boundary (individual/site/team/institution), record creator
versus owner, permitted edits, exports, publication, and retention remain Q-02/Q-03/Q-15.

Until those decisions are approved, restricted product records must not be made public. Public
education and sandbox demos use approved public content/sample state. Coordinates, lab data,
tree records, calculation results, exports, and chatbot retrieval obey the same approved access
boundary. New product entities must not inherit the example's account-deletion cascade without
an explicit decision. Retention/deletion of field data, results, uploads and conversations also
require confirmation.

### 7.4 Export contract to settle

The brief includes CSV/Excel datasets and reports. Proposed output content is plot identifiers
and locations, tree species/measurements, soil inputs where included, carbon components and
completeness, units, method/version and calculation date. Exact headers, required columns,
selection/filter behavior, CSV structure, Excel workbook sheets, and report format/template are
Q-09. Verification labels cannot be exported unless FR-16's workflow is approved.

## 8. Non-functional requirements

| ID | Requirement | Acceptance criteria / pending decision |
| --- | --- | --- |
| NFR-01 | Security and privacy | Authorization protects direct reads/writes, exports, and chatbot retrieval; no cross-owner leak; no privileged credentials in browser config or source; anonymous users cannot obtain restricted coordinates/results (Q-02, Q-03, Q-08, Q-13) |
| NFR-02 | Calculation accuracy | Deterministic outputs pass approved reference examples within agreed tolerance and rounding rules; invalid or unsupported data cannot pass as a valid result (Q-04) |
| NFR-03 | Integrity and provenance | Records retain correct parent links; trusted validation and constraints prevent invalid inputs; displayed/exported results identify methods and source inputs; revision/history rules remain Q-04/Q-05/Q-15 |
| NFR-04 | Recoverable failures | Failed submissions retain input, pending operations prevent duplicates, and failed reads/calculations/exports/services have explicit recovery states; offline guarantees and backup targets remain Q-07/Q-11/Q-15 |
| NFR-05 | Accessibility and responsive use | Agreed field/manager flows work at 360 px and desktop in both themes, with labeled errors, keyboard access, visible focus, dialog focus return and reduced motion; prototype/platform coverage remains Q-01/Q-10/Q-14 |
| NFR-06 | Theme persistence | Retain the year-long site-wide theme cookie and server-applied theme; navigation, sandbox reset, and portaled overlays keep the saved theme; visual conflict remains Q-14 |
| NFR-07 | Dataset and performance limits | Agree plot/tree/sample counts, concurrent users, supported devices/networks, list/map/export response targets and reliability expectations before judging performance (Q-11) |
| NFR-08 | External-source use | Maps/content use approved sources with attribution and permitted access; source dates and limitations are documented; service budgets, quotas and retention are confirmed (Q-06, Q-08, Q-13) |

## 9. Explicit decisions about the starter

These decisions preserve current repository guardrails. A pending adaptation is not permission
to replace or remove an example. No implementation is authorized by this documentation update.

| Decision ID | Starter feature and inspected behavior | Disposition and requirement impact |
| --- | --- | --- |
| DEC-01 | Email/password auth, registration, email confirmation/retry, cookie sessions and logout | **Keep** the existing foundation. Product onboarding, role allocation and open signup versus invitations are unresolved; registration does not grant access to other users' records (FR-11, Q-02/Q-03) |
| DEC-02 | Protected `/dashboard` showing project counts and recent projects | **Keep** the protected route and existing example for now. Carbon dashboard is planned under FR-07; replacing this example or adding a separate product dashboard needs an explicit route decision (Q-10/Q-16) |
| DEC-03 | Private project list/detail/create/edit/delete, `projects` schema and RLS | **Keep** the example and its data. It is not a plot/survey model. No rename, table reuse, deletion, migration of existing records, or replacement is approved (FR-21/FR-22, Q-03/Q-16) |
| DEC-04 | Public `/sandbox`, 81 component demos and sample ProjectForm | **Keep** all demos publicly available and isolated from private data. Search here searches the component catalog; it does not satisfy product plot search (FR-22) |
| DEC-05 | Landing `/` with one centered button linking to `/sandbox` | **Keep** this entry and pages without shared branded headers. Earlier proposed public-information landing conflicts with AGENTS.md; public education entry must be decided explicitly (FR-13/FR-22, Q-14) |
| DEC-06 | Beautiful UI/Base UI controls, Lucide icons and persistent light/dark themes | **Reuse** existing controls and tokens; preserve MIT attribution, shared Button behavior and accessibility. No second UI library or customization screens (FR-22, NFR-05/NFR-06) |
| DEC-07 | Next.js App Router, TypeScript, Supabase SSR, TanStack Query, RHF and Zod | **Keep** existing architecture. New product data follows feature components → hooks → API modules → shared Supabase SDK; earlier separate-backend/PostGIS suggestion is not an approved change |
| DEC-08 | Upload/dropzone controls and upload demos; local Supabase storage disabled | **Keep** sample controls. They do not provide persisted attachments; FR-20 remains proposed and storage/security/retention require approval |
| DEC-09 | AI/chat UI demos and shared Axios client; no live AI integration | **Keep** demos as samples. FR-12/FR-13 are planned with unresolved provider/content/budget choices; an FAQ cannot silently substitute for requested chatbots |
| DEC-10 | Table/search/filter controls; no application plot search/filter data flow | **Reuse** controls if product search/filter scope is approved. Their presence does not approve filters or backend query behavior (Q-10) |
| DEC-11 | No product realtime or offline sync implementation | **Leave unimplemented**. Realtime is not in the recorded brief; offline/import/history/attachments need separate scope decisions (FR-15/FR-17/FR-19/FR-20) |
| DEC-12 | Dashboard content references supplied 2026-10-14 | **Use for Figma content composition**: summary metrics, plot composition/detail, tree/sediment entry, AGB/BGB detail, bulk-density/SOC detail and total-stock recap/report entry. Keep neutral styling. Reference equations, numerical values, branding, identities and sites are not approved product/science contracts (FR-01/FR-02/FR-05–FR-07/FR-10/FR-14; Q-04/Q-05/Q-09/Q-10; DESIGN DES-11) |

No example feature is approved for removal. The inspected starter contains no mangrove plot,
tree/soil model, carbon engine, plot map, product export, role matrix, or live chatbot.

## 10. Out-of-scope and conditional work

The following have no implementation authorization or established requirement in the recorded
brief: automatic DBH measurement/species identification from ordinary photos, SOC inferred only
from species/DBH or imagery, carbon-credit certification/trading/formal MRV accreditation,
nationwide automated monitoring, billing, realtime collaboration, and live CO₂-equivalent reporting.
The latest reference permits a CO₂-equivalent prototype placeholder; it does not approve a
conversion method or working reporting requirement (DEC-12, Q-04/Q-10).
Public disclosure of restricted raw field data is prohibited.

The earlier draft's bulk import, review/publishing workflow, offline sync, satellite-derived
analysis layers, longitudinal comparison, photo attachments, admin screens, and GeoJSON/shapefile
integration remain **conditional proposals**, not an accepted next-release commitment. GPS
capture, normal/satellite toggles, map filters, extra charts, and public maps also require explicit
decisions. CSV/Excel export, report export and both chatbot experiences remain brief requirements;
their release timing is unresolved rather than presumed out of scope.

This task updates only PRD.md. It does not implement features, create tickets, change design or
agent instructions, select dependencies/providers, apply migrations, configure accounts, or
deploy. BACKLOG.md remains the canonical ticket source and currently has no product tickets.

## 11. Unresolved questions and affected requirements

Questions are grouped so PIC/team can resolve a decision once and unblock affected work.
No decision owner is invented; PIC and the team must name accountable approvers.

| ID | Decision needed | Affected requirements |
| --- | --- | --- |
| Q-01 | Is the first deliverable Figma-only or a working website? What are deadline, accepted MVP flows, chatbot/report delivery level, and release allocation? Which proposed features, if any, are selected? | FR-01–FR-20, FR-24; NFR-05 |
| Q-02 | Who records, analyzes, manages, and administers data? Which roles are distinct? Who may invite/register users, assign roles, edit others' records, configure formulas, and approve results? | FR-01, FR-11, FR-12, FR-16, FR-21, FR-22; NFR-01 |
| Q-03 | Who owns/stewards the dataset: individual, site, team, or institution? What is the exact read/create/edit/delete/export matrix? Which records/fields/coordinates can be public, and who approves publication? | FR-01, FR-02, FR-04, FR-07, FR-08, FR-11–FR-16, FR-20–FR-22; NFR-01 |
| Q-04 | Which equations, coefficients, applicability rules, density sources, carbon fractions, LOI conversion, depth conventions, missing-data behavior, precision/rounding and tolerance are approved? Can PIC supply reference inputs and expected results? | FR-02, FR-05–FR-07, FR-09, FR-12, FR-14, FR-18, FR-19; NFR-02/NFR-03 |
| Q-05 | Can we obtain a permitted sample field/lab dataset? What are required fields, numeric limits, duplicate/identifier scopes, site/station hierarchy, survey/tree/core identities and repeat-survey model? | FR-01, FR-02, FR-05–FR-07, FR-09, FR-15, FR-19; NFR-03 |
| Q-06 | Does satellite-connected mean basemap context, imagery analysis, or both? Which provider/terms, coordinate convention, GPS accuracy behavior, basemap toggle and boundary datasets are approved? May atlas data be reused/imported? | FR-03, FR-04, FR-09, FR-18; NFR-08 |
| Q-07 | Is connectivity reliable enough for online entry? Is browser GPS mandatory? Are drafts/offline sync or bulk imports required, and what are supported devices, conflict and partial-failure rules? | FR-03, FR-15, FR-17; NFR-04 |
| Q-08 | Which questions must each chatbot answer, in which language, from which approved sources? Must manager answers use verified data? Is public map access required? Who maintains educational content? | FR-12, FR-13, FR-21; NFR-01/NFR-08 |
| Q-09 | Are both CSV and XLSX required? What are exact columns, sheets/files, selection rules, date/decimal conventions and report format/template? Are PDF and map snapshots required? | FR-08, FR-14 |
| Q-10 | What is the product sitemap and entry navigation? Which screens are separate or combined? Which list/map filters, charts, counts and multi-plot aggregates are required? Where does the product dashboard live? | FR-04, FR-07, FR-08, FR-10, FR-22; NFR-05 |
| Q-11 | What dataset scale, concurrent use, supported browsers/devices, response targets, uptime, backups and recovery targets should the working release satisfy? | NFR-04/NFR-07 |
| Q-12 | What evidence and assessment criteria are needed for Figma usability, scientific correctness, reference research, Monday reviews and final acceptance? Who signs off? | FR-10, FR-23, FR-24 |
| Q-13 | Which map/AI/storage services, hosting environment, funding, quotas/rate limits and secret-management arrangements are approved? What privacy and conversation/file retention rules apply? | FR-04, FR-12, FR-13, FR-20; NFR-01/NFR-08 |
| Q-14 | How should visitors reach education while preserving the centered sandbox landing? Is the Clay reference an accepted product design, and how will its pills, fonts and branded navigation be reconciled with AGENTS.md's shared UI rules? | FR-10, FR-13, FR-22; NFR-05/NFR-06 |
| Q-15 | What may be corrected/deleted, by whom and for how long? Are online draft states, audit trail, result snapshots and invalidation/recalculation required? What happens on account deletion or conflicting updates? | FR-01, FR-16, FR-17, FR-19–FR-21; NFR-03/NFR-04 |
| Q-16 | Should product screens coexist with, adapt, or replace project examples? If replacement is requested, what happens to `/dashboard`, `/projects`, existing project data and sandbox's ProjectForm dependency? | FR-07, FR-22 |

## 12. Conflicts, acceptance gate, and source references

The earlier draft treated authentication as later work while proposing private field workflows;
FR-11/FR-21/NFR-01 now make access control a dependency of any working restricted-data release.
Its public-information landing conflicts with the instruction to preserve `/`'s centered sandbox
button. The user subsequently accepted neutral shared UI with Clay composition; DESIGN.md now
preserves normal Inter, existing Button sizes and shared tokens. The prior font/pill/branding
conflict is resolved; public education entry remains Q-14. Supplied dashboard screenshots
select prototype content under DEC-12, without accepting their scientific methods or figures.

The earlier generic architecture and suggested implementation backlog are superseded by the
inspected starter baseline and BACKLOG.md's canonical planning process. No stack replacement,
new backend, database extension, feature removal or delivery date is decided here.

Before implementation tickets can be Ready, settle their referenced questions, approve their
contracts and acceptance criteria, and align affected design/agent instructions. Working-feature
acceptance requires current typecheck, lint, tests and build results; relevant browser checks in
both themes, keyboard/reduced-motion/360 px checks; and disposable-environment isolation checks
for ownership/schema work. Scientific results require approved calculation fixtures. Prototype
navigation and mocked data do not prove live authentication, isolation, calculations or deployment.
No such runtime checks or acceptance evidence are claimed by this documentation revision.

Reference leads retained from the previous draft for FR-23: [Atlas Sebaran Spesies — Kebun Raya
Mangrove Kota Surabaya](https://realharyotpg-sketch.github.io/spesiesmangrovekrm/),
[Global Mangrove Watch](https://www.globalmangrovewatch.org/), and
[SI-PPEM](https://www.mangroves.app/). Their current capabilities, data access and licensing have
not been checked in this task; no verified novelty claim is made.

Repository evidence inspected: [AGENTS.md](AGENTS.md), [README.md](README.md),
[DESIGN.md](DESIGN.md), [BACKLOG.md](BACKLOG.md), [package.json](package.json),
[routes](src/app/), [auth](src/features/auth/), [project APIs and validation](src/features/projects/),
[ownership migration](supabase/migrations/20261011000000_projects.sql),
[sandbox](src/features/sandbox/), [providers](src/providers/),
[Supabase configuration](supabase/config.toml), and existing contract/catalog tests.
