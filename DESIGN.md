---
version: alpha
name: Clay
source:
  url: https://www.clay.com/
  inspectedAt: 2026-10-14
  scope: public homepage
  measurementStatus: visual-inference-not-css-audit
  note: All hexadecimal colors, fonts, dimensions, and interaction values below are suggested approximations, not verified Clay tokens.
description: |
  An editorial, playful yet enterprise-capable SaaS visual language. Warm off-white
  backgrounds and ink typography create an understated canvas for surreal,
  colorful mechanical illustrations, product screenshots, and strong social proof.
colors:
  primary: '#20231F'
  ink: '#20231F'
  body: '#40443E'
  muted: '#73766E'
  hairline: '#E5E4DC'
  cream: '#FAF9F5'
  surface: '#FFFFFF'
  sage: '#DDE8D7'
  mint: '#CBE8D7'
  forest: '#41634D'
  peach: '#F5D6C4'
  lavender: '#E5DDF4'
  sky: '#DDEAF5'
  yellow: '#F5E5A5'
  coral: '#F1A18B'
typography:
  display-xl: {fontFamily: editorialSans, fontSize: 72px, fontWeight: 600, lineHeight: 1.02, letterSpacing: -2.2px}
  display-lg: {fontFamily: editorialSans, fontSize: 56px, fontWeight: 600, lineHeight: 1.07, letterSpacing: -1.6px}
  display-md: {fontFamily: editorialSans, fontSize: 44px, fontWeight: 600, lineHeight: 1.1, letterSpacing: -1px}
  display-sm: {fontFamily: editorialSans, fontSize: 36px, fontWeight: 600, lineHeight: 1.12, letterSpacing: -0.8px}
  heading-md: {fontFamily: editorialSans, fontSize: 30px, fontWeight: 600, lineHeight: 1.18, letterSpacing: -0.6px}
  heading-sm: {fontFamily: editorialSans, fontSize: 24px, fontWeight: 600, lineHeight: 1.25, letterSpacing: -0.3px}
  heading-xs: {fontFamily: uiSans, fontSize: 18px, fontWeight: 600, lineHeight: 1.35, letterSpacing: -0.1px}
  body-xl: {fontFamily: uiSans, fontSize: 20px, fontWeight: 400, lineHeight: 1.5, letterSpacing: -0.2px}
  body-lg: {fontFamily: uiSans, fontSize: 18px, fontWeight: 400, lineHeight: 1.55, letterSpacing: -0.1px}
  body-md: {fontFamily: uiSans, fontSize: 16px, fontWeight: 400, lineHeight: 1.55, letterSpacing: 0px}
  body-sm: {fontFamily: uiSans, fontSize: 14px, fontWeight: 400, lineHeight: 1.45, letterSpacing: 0px}
  nav: {fontFamily: uiSans, fontSize: 14px, fontWeight: 500, lineHeight: 1.4, letterSpacing: 0px}
  button: {fontFamily: uiSans, fontSize: 14px, fontWeight: 600, lineHeight: 1.4, letterSpacing: 0px}
  caption: {fontFamily: uiSans, fontSize: 12px, fontWeight: 500, lineHeight: 1.4, letterSpacing: 0.2px}
rounded: {none: 0px, xs: 6px, sm: 10px, md: 14px, lg: 20px, xl: 28px, full: 9999px}
spacing: {xxs: 4px, xs: 8px, sm: 12px, md: 16px, lg: 24px, xl: 32px, xxl: 48px, xxxl: 64px, section: 96px, band: 128px}
borderWidths: {thin: 1px, emphasized: 2px}
shadows:
  sm: '0 2px 8px rgba(32,35,31,0.05)'
  md: '0 8px 24px rgba(32,35,31,0.08)'
  lg: '0 20px 60px rgba(32,35,31,0.12)'
elevationStrategy: flat-editorial-with-soft-floating-panels
themes:
  derived: dark
  light: {bg: '#FAF9F5', surface: '#FFFFFF', surfaceRaised: '#F3F3ED', text: '#20231F', textMuted: '#73766E', border: '#E5E4DC', accent: '#20231F', accentFg: '#FFFFFF', focusRing: '#41634D'}
  dark: {bg: '#181B18', surface: '#232823', surfaceRaised: '#303730', text: '#FAF9F5', textMuted: '#B8BDB4', border: '#434B43', accent: '#CBE8D7', accentFg: '#181B18', focusRing: '#CBE8D7'}
gradients:
  - {context: pastel-feature, kind: linear, value: 'linear-gradient(135deg, #DDE8D7 0%, #DDEAF5 55%, #E5DDF4 100%)'}
  - {context: warm-illustration, kind: radial, value: 'radial-gradient(circle at 65% 30%, #F5E5A5, #F5D6C4 60%, transparent 100%)'}
components:
  button-primary: {backgroundColor: '#20231F', textColor: '#FFFFFF', height: 44px, padding: '0 20px', rounded: 9999px, typography: '{typography.button}'}
  button-secondary: {backgroundColor: '#FFFFFF', textColor: '#20231F', border: '1px solid #D9DAD2', height: 44px, padding: '0 20px', rounded: 9999px}
  button-text: {backgroundColor: transparent, textColor: '#20231F', height: 40px, padding: '0 8px'}
  card: {backgroundColor: '#FFFFFF', border: '1px solid #E5E4DC', rounded: 20px, padding: 24px}
  feature-panel: {backgroundColor: '#DDE8D7', rounded: 28px, padding: 32px}
  input: {backgroundColor: '#FFFFFF', border: '1px solid #D9DAD2', rounded: 10px, height: 44px, padding: '0 14px'}
  navigation: {backgroundColor: '#FAF9F5', height: 72px, padding: '0 32px'}
states:
  button-hover: {target: button, state: hover, transform: 'translateY(-1px)', transition: '180ms ease'}
  card-hover: {target: card, state: hover, transform: 'translateY(-3px)', transition: '220ms ease'}
  input-focus: {target: input, state: focus-visible, outline: '2px solid #41634D', outlineOffset: 2px}
breakpoints:
  - {width: 375, containerWidth: 'calc(100% - 40px)', gridColumns: 4, menuToggleVisible: true, headingPx: 40, bodyPx: 16, sectionPaddingX: 20}
  - {width: 768, containerWidth: 'calc(100% - 64px)', gridColumns: 8, menuToggleVisible: true, headingPx: 56, bodyPx: 16, sectionPaddingX: 32}
  - {width: 1024, containerWidth: 'calc(100% - 96px)', gridColumns: 12, menuToggleVisible: false, headingPx: 64, bodyPx: 16, sectionPaddingX: 48}
  - {width: 1440, containerWidth: 1280, gridColumns: 12, menuToggleVisible: false, headingPx: 72, bodyPx: 16, sectionPaddingX: 80}
coverage:
  pagesAnalyzed: 1
  cssMeasurementsVerified: false
  fontFamiliesVerified: false
  interactionStatesVerified: false
  authenticatedProductAnalyzed: false
---

# Design System Inspired by Clay

> **Source:** [clay.com](https://www.clay.com/) · **Reviewed:** October 14, 2026. This is an implementation-ready *inspired-by* system, not an official Clay brand specification. The public homepage was inspected for content structure, imagery descriptions, and UI archetypes. Numeric design tokens, font families, and responsive values are proposed approximations rather than extracted CSS measurements.

## 1. Visual Theme & Atmosphere

Clay blends serious B2B software positioning with an expressive, almost toy-like visual world. Large editorial headlines and a quiet light canvas establish clarity; colorful, surreal 3D illustrations add memorability. On the inspected homepage, a whimsical machine of tubes, balls, magnets, and funnels sits against green hills and a blue sky. Other sections use a magnifying glass, robot, puzzle cube, and mechanical lever to make abstract data workflows tangible.

**Key characteristics**
- Editorial, high-contrast typography with generous negative space.
- Warm, soft neutral canvas supporting green, peach, lavender, sky, and yellow accents.
- Playful, sculptural 3D illustrations rather than generic SaaS icon grids.
- Product UI imagery: tables, filters, scoring rules, workflow builders, and email previews.
- Alternation between aspirational illustration, concrete product demonstrations, and customer proof.
- Pill-like calls to action, simple navigation, and clear section hierarchy.

**Important distinction:** the pastel token palette below is a *cohesive interpretation* of the visual direction, not a measured or official Clay palette. Clay's actual illustrations use more saturated colors than a purely muted sage-green site.

## 2. Color Palette & Roles

| Token | Suggested hex | Role |
|---|---|---|
| `primary` | `#20231F` | Primary buttons, prominent text |
| `ink` | `#20231F` | Display headlines |
| `body` | `#40443E` | Paragraphs |
| `muted` | `#73766E` | Metadata, secondary labels |
| `hairline` | `#E5E4DC` | Borders and separators |
| `cream` | `#FAF9F5` | Page background |
| `surface` | `#FFFFFF` | Product mockups and cards |
| `sage` | `#DDE8D7` | Green feature sections |
| `mint` | `#CBE8D7` | Friendly accent surfaces |
| `forest` | `#41634D` | Accessible green focus and accent |
| `peach` | `#F5D6C4` | Illustration background |
| `lavender` | `#E5DDF4` | Secondary pastel background |
| `sky` | `#DDEAF5` | Blue pastel background |
| `yellow` | `#F5E5A5` | Warm highlights |
| `coral` | `#F1A18B` | Illustration details |

**Palette rules:** Use warm cream for the default page, ink for the strongest hierarchy, and white for data-heavy product screenshots. Apply pastels to large feature areas and illustration backdrops, not every button. Limit each section to one dominant pastel plus a few supporting colors. Use forest green on cream or white for legible interactive text; pale mint is not a suitable small-text color on white.

**Semantic states (proposed, not observed):** success `#32704A`, warning `#9C641D`, error `#B4443B`, information `#2E638D`. Test foreground/background contrast before shipping.

## 3. Typography Rules

### Font families

- **Display:** `editorialSans` is a role name, not a confirmed font. Suggested substitutes: `Manrope`, `DM Sans`, or `Inter Tight` with sans-serif fallbacks.
- **Body/UI:** `uiSans` is a role name. Suggested substitutes: `Inter` or `DM Sans` with system-ui fallbacks.
- **Optional editorial accent:** a restrained serif such as `Instrument Serif` can be used in an *adaptation*, but is not claimed to be Clay's font.

### Hierarchy

| Role | Size desktop | Weight | Line height | Tracking | Use |
|---|---:|---:|---:|---:|---|
| `display-xl` | 72px | 600 | 1.02 | -2.2px | Hero headline |
| `display-lg` | 56px | 600 | 1.07 | -1.6px | Major sections |
| `display-md` | 44px | 600 | 1.10 | -1px | Feature headings |
| `display-sm` | 36px | 600 | 1.12 | -0.8px | Subsections |
| `heading-md` | 30px | 600 | 1.18 | -0.6px | Large cards |
| `heading-sm` | 24px | 600 | 1.25 | -0.3px | Card titles |
| `heading-xs` | 18px | 600 | 1.35 | -0.1px | Tertiary headings |
| `body-xl` | 20px | 400 | 1.50 | -0.2px | Hero support copy |
| `body-lg` | 18px | 400 | 1.55 | -0.1px | Intro paragraphs |
| `body-md` | 16px | 400 | 1.55 | Standard text |
| `body-sm` | 14px | 400 | 1.45 | Dense UI |
| `nav` / `button` | 14px | 500–600 | 1.4 | 0 | Navigation and CTAs |
| `caption` | 12px | 500 | 1.4 | +0.2px | Labels |

### Principles

Use one strong headline per section. Keep display copy short and deliberate; avoid using giant typography for routine feature descriptions. Pair tight, assertive headlines with relaxed paragraph line height. Limit long text columns to approximately 60–72 characters. Scale display type down to 40px on small mobile screens.

## 4. Component Stylings

### Buttons

**Primary CTA**: ink `#20231F` background, white text, 44px height, 20px horizontal padding, fully rounded pill, 14px semibold text. Use for “Start free trial” and equivalent high-intent actions.

**Secondary CTA**: white background, ink text, 1px neutral border, 44px height, 20px horizontal padding, pill shape. Use for “Get a demo” and lower-priority paths.

**Text action**: transparent background, ink text, optional arrow icon. Use for “Explore…” or “Learn more” actions in feature sections.

**States (proposed):** on hover, slightly darken or lift the primary button by 1px; on focus-visible, show a 2px high-contrast ring; on disabled, reduce contrast but retain readable text. Respect reduced-motion settings.

### Cards & containers

**Default card**: white background, `1px solid #E5E4DC`, 20px radius, 24px padding, flat by default. Use for testimonials, product examples, and compact content.

**Feature panel**: pastel sage, peach, lavender, or sky background; 28px radius; 32–48px padding. Use a single large illustration or screenshot as the main visual anchor.

**Product screenshot frame**: white surface with neutral border and a soft shadow. Screenshots should be crisp and recognizable as real software: tables, search filters, lead scores, workflow nodes, or outreach previews.

**Proof block**: combine customer identity, a specific outcome, and optional metric. The inspected site presents customer quotes and outcomes such as pipeline improvements and enrichment coverage; preserve the hierarchy without inventing results.

### Inputs & forms

44px height, white fill, 1px neutral border, 10px radius, 14px horizontal padding, 16px body text. Focus-visible uses a 2px forest-green outline with 2px offset. Labels sit above fields; validation messages use both text and icon, never color alone.

### Navigation

Suggested 72px desktop height, cream background, brand at left, concise category navigation, and trial/demo actions at right. The inspected homepage has Product, Solutions, Resources, Company, Pricing, login, demo, and trial actions, with extensive grouped dropdown content. On smaller screens, collapse category links into an accessible menu; do not attempt to preserve all desktop mega-menu content inline.

### Illustration system

The illustrations are a defining characteristic. Favor sculptural, tactile, surreal 3D objects with gentle lighting, toy-like forms, and purposeful metaphors: funnels for enrichment, magnets for matching, pathways for orchestration, levers for activation, and robots for agents. Mix saturated object colors with quiet backgrounds. Do not replace these with random stock photos or generic gradient blobs.

## 5. Layout Principles

### Spacing system

| Token | Value | Use |
|---|---:|---|
| `xxs` | 4px | Micro alignment |
| `xs` | 8px | Icon gaps |
| `sm` | 12px | Compact controls |
| `md` | 16px | Standard element spacing |
| `lg` | 24px | Card padding |
| `xl` | 32px | Feature group spacing |
| `xxl` | 48px | Large component gaps |
| `xxxl` | 64px | Section internals |
| `section` | 96px | Vertical section padding |
| `band` | 128px | Hero and full-width transitions |

### Grid & container

Use a proposed 12-column desktop grid, with a content maximum around 1280px, and generous outer margins. Pair editorial copy and illustration in approximately 5/7 or 6/6 splits. Use full-width product demo bands where dense screenshots need more room. Avoid placing every feature in identical three-column cards.

### Homepage composition

The observed public homepage flows through: navigation; hero with primary/secondary CTAs and whimsical illustration; customer proof; interactive GTM use-case tabs; prompt-like discovery UI; data marketplace; agents; orchestration; activation; rep productivity; customer stories; learning resources; final conversion CTA; and a detailed footer. This alternation between narrative, visuals, and proof is more important than reproducing exact section heights.

### Border radii

0px for strict table/grid internals, 6–10px for compact controls, 14–20px for cards, 28px for larger feature panels, and 9999px for pills. This is an adaptation scale, not a measured Clay rule.

## 6. Depth & Elevation

Favor flat editorial backgrounds and only subtle depth for product UI. Suggested shadow scale:

| Level | CSS | Use |
|---|---|---|
| Flat | `none` | Main sections |
| Small | `0 2px 8px rgba(32,35,31,.05)` | Small UI cards |
| Medium | `0 8px 24px rgba(32,35,31,.08)` | Product screenshots |
| Large | `0 20px 60px rgba(32,35,31,.12)` | Floating visual compositions |

Avoid making all surfaces float. Large illustrations should achieve depth through lighting and materiality; UI panels should remain readable and restrained.

**Opacity guidance (proposed):** 0.45–0.6 for disabled decorative content, 0.7–0.85 for noncritical secondary imagery, 1.0 for primary text. Do not dim readable text solely to create hierarchy.

**Layering (proposed):** base 0, sticky navigation 20, dropdown 30, overlay 40, modal 50, toast 60. Ensure dropdowns remain keyboard accessible and modals trap focus appropriately.

## 7. Do's and Don'ts

### Do

1. Lead with confident editorial typography and simple product value.
2. Combine warm neutral backgrounds with one dominant pastel per section.
3. Use custom conceptual 3D illustrations with recognizable metaphors.
4. Show authentic, legible software UI alongside aspirational artwork.
5. Alternate large visual bands with concise explanatory copy and real customer proof.
6. Give CTAs obvious contrast and maintain generous whitespace.
7. Keep cards quieter than the illustrations; use soft borders and minimal shadows.
8. Use motion sparingly and provide a reduced-motion fallback.

### Don't

1. Don't interpret Clay as an exclusively sage-green or muted-pastel brand; its illustrations are often vibrant.
2. Don't copy Clay's proprietary artwork, logo, or customer testimonials into a different product.
3. Don't use multiple unrelated pastel backgrounds in the same small component.
4. Don't bury actual product capabilities beneath abstract illustrations.
5. Don't make all corners extremely rounded; keep dense UI controlled.
6. Don't claim guessed font families, exact pixels, or tokens are official.
7. Don't use gradients or shadows as substitutes for strong content hierarchy.
8. Don't assume the public marketing site reflects authenticated product UI.

## 8. Responsive Behavior

The following are **recommended implementation targets**, not measurements from Clay's CSS.

| Viewport | Container | Grid | Hero heading | Section horizontal padding | Navigation |
|---|---|---:|---:|---:|---|
| 375px | width - 40px | 4 | 40px | 20px | Collapsed |
| 768px | width - 64px | 8 | 56px | 32px | Collapsed |
| 1024px | width - 96px | 12 | 64px | 48px | Expanded |
| 1440px | max 1280px | 12 | 72px | 80px | Expanded |

At mobile sizes, stack headline above illustration and turn complex product comparisons into horizontal scrolling regions with clear affordances. Preserve data-table labels and avoid shrinking them until illegible. Use 44px minimum interactive targets, test keyboard access, and respect `prefers-reduced-motion`.

## 9. Agent Prompt Guide

### Quick color reference

- Background: `#FAF9F5` warm cream
- Text/CTA: `#20231F` dark ink
- Body: `#40443E`
- Border: `#E5E4DC`
- Sage: `#DDE8D7`
- Mint: `#CBE8D7`
- Forest: `#41634D`
- Peach: `#F5D6C4`
- Lavender: `#E5DDF4`
- Sky: `#DDEAF5`
- Yellow: `#F5E5A5`

### Implementation prompt

> Create a modern SaaS marketing website inspired by Clay's editorial and playful visual approach, not a direct clone. Use a warm cream canvas, deep ink typography, soft sage/mint/peach/lavender/sky feature backgrounds, generous whitespace, and carefully placed colorful surreal 3D illustrations. Keep product demonstrations concrete and legible with white data-table or workflow screenshots. Use large, tightly tracked headlines, restrained body typography, pill-shaped high-contrast calls to action, subtle borders, minimal shadows, and accessible interaction states. Alternate storytelling, product demos, and genuine customer proof. Make the layout responsive, keyboard accessible, and respectful of reduced motion. Do not copy Clay's artwork, logo, customer claims, or proprietary copy.

### Iteration guide

1. Build the page in cream, white, and ink first.
2. Establish display hierarchy and section rhythm before adding decoration.
3. Add one carefully chosen pastel surface per major feature band.
4. Place one purposeful illustration or authentic UI demo in each feature section.
5. Keep UI screenshot chrome neutral and crisp.
6. Add social proof only where sourced and verifiable.
7. Test mobile text wrapping, navigation, table overflow, and CTA visibility.
8. Validate contrast, focus rings, and reduced-motion behavior.
9. Compare the visual balance against the live site, not against token guesses.
10. Customize enough to create an original brand identity.

## 10. Known Gaps

- **No CSS token extraction:** Color hex values, dimensions, border radii, shadows, and font roles here are inferred design recommendations.
- **Font identity unverified:** Suggested font substitutes are not presented as Clay's actual fonts.
- **Interaction behavior unverified:** Hover, focus, motion, and menu timing were not measured.
- **Only public homepage inspected:** No authenticated Clay app surfaces were audited.
- **Responsive values are recommendations:** No actual breakpoint CSS or mobile screenshot measurements were obtained.
- **Dark theme is derived:** The dark palette is a proposed extension, not an observed Clay mode.
- **Artwork ownership:** Use original or licensed illustrations; do not reproduce Clay's signature imagery without permission.
- **Accessibility untested:** WCAG conformance requires a separate audit.
- **Live-site changes:** Clay's site and messaging may evolve after the inspection date.

---

**End of Design System Inspired by Clay**
