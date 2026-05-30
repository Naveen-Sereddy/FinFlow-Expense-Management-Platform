# 02 · Figma Handoff

> Figma file plan, page-by-page anatomy, export tables, and what lives where (components vs variants vs tokens vs assets).

## 1. Files & permissions

| File | Purpose | Edit | View |
|---|---|---|---|
| `FinFlow / Foundations` | Tokens, type, color, spacing | Design Systems team | All |
| `FinFlow / UI Kit` | Components, variants, states | Design Systems team | All |
| `FinFlow / Product` | Screens, flows, prototypes | Product Design | Eng, PM |
| `FinFlow / Brand` | Marks, lockups, assets | Brand | Marketing |
| `FinFlow / Marketing site` | Out of scope for this handoff | Marketing | — |

## 2. Foundations file — page plan

- **Cover** — file's purpose, owner, last-updated, deprecation notes
- **Tokens — Colors** — primitive scales + role tokens (light + dark) as Figma styles
- **Tokens — Type** — text styles for the scale (display, body, eyebrow, mono)
- **Tokens — Spacing/Radius/Shadow** — local styles + variables
- **Themes** — Figma modes: `Light`, `Dark` (Variables → Mode 1/2)
- **Iconography** — Phosphor (regular + bold + fill) imported as components

### 2.1 Color tokens — primitive → role

```
Primitives:
  plum/50…900            citron/100…700
  ink/50…950             paper, surface, surface-2
  approved, pending, rejected, flagged (each with -bg)

Roles (read by components):
  --ff-bg / --ff-fg / --ff-fg-muted / --ff-fg-subtle
  --ff-border / --ff-border-strong
  --ff-card / --ff-card-2 / --ff-input-bg / --ff-hover
  --ff-primary / --ff-primary-hover / --ff-primary-fg
  --ff-accent / --ff-accent-fg
  --ff-chart-1…6 / --ff-chart-grid / --ff-chart-axis
```

In Figma: primitives are **collection: Primitives**; roles are **collection: Semantic** mapping to primitives via mode (light/dark). Components ONLY reference Semantic — never primitives directly.

### 2.2 Type styles

| Token | Family | Size | Weight | Use |
|---|---|---|---|---|
| `display/2xl` | Instrument Serif | 64 | 400 | Page hero numerals |
| `display/lg` | Instrument Serif | 40 | 400 | Page title |
| `display/sm` | Instrument Serif italic | 38 | 400 italic | Empty-state hero |
| `title/2xl` | Geist | 24 | 600 | Card title |
| `title/lg` | Geist | 17 | 600 | Section title |
| `body/md` | Geist | 14 | 400 | Default body |
| `body/sm` | Geist | 13 | 400 | Dense table |
| `meta/xs` | Geist | 12 | 400 | Captions, table meta |
| `eyebrow` | Geist | 11 | 500 | Uppercase labels (UCASE, 0.08em) |
| `mono/sm` | JetBrains Mono | 12 | 400 | IDs, card numbers |
| `mono/lg` | JetBrains Mono | 18 | 500 | Card PAN |

## 3. UI Kit file — page plan

- **Cover**
- **Primitives** — Button, Badge, Chip, Avatar, Kbd, Spinner, Switch, Segmented, Progress, Step
- **Inputs** — Input, Select, Textarea, Search, Date picker
- **Surfaces** — Card, KPI tile, Card sectioned (head/body/foot), Empty state, Skeleton
- **Feedback** — Alert, Toast, Banner, Modal, Tooltip
- **Navigation** — Sidebar, TopBar, Tabs, Breadcrumbs, ChipBar
- **Data display** — Table (compact/comfortable), Receipt thumb, Status badge
- **Charts** — Line, Bar, Area, Donut, Sparkline, KPI tile
- **Brand** — BrandMark variants (mark, wordmark, horizontal, stacked)
- **Mobile** — Status bar, Tab bar, Mobile card, Mobile button
- **Patterns** — Approval row, Expense row, Expense detail layout, Auth split-screen

## 4. Components vs Variants vs Tokens vs Assets

| Concern | What it is | Where it lives | Example |
|---|---|---|---|
| **Token** | A value (color, size, radius) | Figma Variables | `--ff-primary` |
| **Variant** | A *style* of a component | Component property in Figma | `Button / variant=primary` |
| **Component** | A reusable UI piece | Figma main component | `Button` |
| **Asset** | A static file (SVG, image, font) | File assets panel | `logomark.svg` |

**Rule of thumb**: if it has logic (states, sizes, colors that change with theme), it's a **component with variants**. If it's a single immutable graphic, it's an **asset**. Colors/sizes/radii are **tokens** referenced by both.

## 5. Component inventory (with variants)

| Component | Variants | States |
|---|---|---|
| Button | `primary / default / ghost / danger / accent` × `sm / md / lg / icon` | default, hover, active, focused, disabled, loading |
| Badge | `neutral / plum / approved / pending / rejected / flagged` | dot / no-dot |
| Chip | — | unselected, selected (`aria-pressed`) |
| Input | `md / lg`, with/without prefix-icon | default, focus, error, disabled |
| Select | (same) | (same) |
| Card | `flat / lift`, with/without head/foot | — |
| KPI tile | with/without sparkline | up / down / neutral delta |
| Table row | `default / compact` | hover, selected |
| Status badge | (uses Badge variants) | with-icon (recommended) |
| Avatar | `md / lg / xl` | initials / image |
| Switch | — | on, off, disabled |
| Segmented | 2 / 3 / 4 buttons | per-segment pressed |
| Tabs | — | per-tab selected |
| Alert | `info / success / warn / error` | dismissable / not |
| Sidebar nav item | — | default, hover, current |
| Empty state | with/without action | — |
| Modal | `sm / md / lg` | — |
| Sparkline | — | with/without area fill |
| Donut | — | 2–6 slices |

## 6. Export tables (devs)

### 6.1 SVG marks (from `/brand`)

| Asset | Path | Use |
|---|---|---|
| logomark.svg | `brand/logomark.svg` | App icon, square placements |
| logomark-light.svg | `brand/logomark-light.svg` | Dark surfaces |
| wordmark.svg | `brand/wordmark.svg` | Footer, marketing |
| lockup-horizontal.svg | `brand/lockup-horizontal.svg` | Sidebar header |
| lockup-horizontal-dark.svg | `brand/lockup-horizontal-dark.svg` | Dark sidebar |
| lockup-stacked.svg | `brand/lockup-stacked.svg` | Splash / onboarding |

### 6.2 Icon set
Phosphor v2.1.1 via CDN — `@phosphor-icons/web/src/regular/style.css` (also bold, fill). Sizes 12 / 14 / 16 / 18 / 22 px in this kit.

### 6.3 Font subsets to ship
- Instrument Serif — Regular, Italic (Latin)
- Geist — 300, 400, 500, 600, 700 (Latin + Latin Ext)
- JetBrains Mono — 400, 500, 600 (Latin)

Host via Google Fonts (already linked in `colors_and_type.css`) or self-host with `woff2` subsets for perf.

## 7. Prototype flows in Figma

Set up these 5 connected prototypes:

1. **Sign in → Finance dashboard** (Maren happy path)
2. **Manager approvals** (queue → detail → approve → success)
3. **Employee mobile submit** (snap → form → success → status)
4. **OCR review → flagged → override** (the edge case story)
5. **Schedule payout** (list → schedule → confirmation)

## 8. Naming conventions

- Component names: `PascalCase` (`KpiTile`, `StatusBadge`)
- Variant property values: `kebab-case` (`variant=ghost-icon`)
- Token names: `--ff-{role|primitive}-{step}` (`--ff-plum-700`)
- Page names in Figma: `📐 Foundations`, `🧱 UI Kit`, `📱 Mobile`, `🖥 Desktop`
- Frame names match screen IDs in `index.html`'s registry (e.g. `dashboard`, `expense-detail`).

## 9. Handoff checklist for Figma

- [ ] Every component has Description, Auto Layout, all states as variants
- [ ] Every screen has a flow connector to its next step
- [ ] Themes mode is wired on every screen frame
- [ ] No hard-coded colors — Figma should show "🎨 Color style" in inspect
- [ ] Annotations use the FigJam `Annotations` plugin or Figma's native annotations
- [ ] Each variant has a deliberate name (no `Variant=Default`)
