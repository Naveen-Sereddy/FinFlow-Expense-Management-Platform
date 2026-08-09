# 02 · Figma Handoff

> Figma file plan, page-by-page anatomy, and what lives where (components vs variants vs tokens vs assets). The actual prototype was built directly in code — this is the file structure a Figma source-of-truth would use if this shipped as a production Figma → code handoff.

## 1. Files & permissions

| File | Purpose | Edit | View |
|---|---|---|---|
| `FinFlow / Foundations` | Tokens, type, color, spacing | Design Systems team | All |
| `FinFlow / UI Kit` | Components, variants, states | Design Systems team | All |
| `FinFlow / Product` | Screens, flows, prototypes | Product Design | Eng, PM |
| `FinFlow / Brand` | Marks, lockups, assets | Brand | Marketing |

## 2. Foundations file — page plan

- **Cover** — file's purpose, owner, last-updated, deprecation notes
- **Tokens — Colors** — primitive scales + role tokens (light + dark) as Figma styles
- **Tokens — Type** — text styles for the scale (page title, card title, body, eyebrow, mono)
- **Tokens — Spacing/Radius/Shadow** — local styles + variables
- **Themes** — Figma modes: `Light`, `Dark` (Variables → Mode 1/2)
- **Iconography** — Phosphor (regular, bold, fill) imported as components

### 2.1 Color tokens — primitive → role

```
Primitives:
  teal/50…900             (slate-blue brand scale — legacy "teal" var names, current values)
  ink/50…950               paper, surface, surface-2
  status/{success|warning|info|review|action|danger|neutral} (each with -bg / -fg / -border)

Roles (read by components):
  --ff-bg / --ff-fg / --ff-fg-muted / --ff-fg-subtle
  --ff-border / --ff-border-strong
  --ff-card / --ff-card-2 / --ff-input-bg / --ff-hover
  --ff-primary / --ff-primary-hover / --ff-primary-fg
  --ff-focus-ring
  --ff-chart-1…6 / --ff-chart-grid / --ff-chart-axis
```

In Figma: primitives are **collection: Primitives**; roles are **collection: Semantic** mapping to primitives via mode (light/dark). Components reference Semantic only — never primitives directly.

### 2.2 Type styles

| Token | Family | Size | Weight | Use |
|---|---|---|---|---|
| `page-title` | General Sans | 34 | 600 | Top of every page |
| `card-title` | General Sans | 15 | 600 | Inside cards, section headers |
| `body` | General Sans | 14 | 400 | Default |
| `compact` | General Sans | 13 | 400 | Dense tables |
| `eyebrow` | General Sans | 11 | 500 | Uppercase labels (+0.06em tracking) |
| `mono` | JetBrains Mono | 12 | 400 | IDs, card numbers, tabular money |

One typeface for the whole product — no display/body split. JetBrains Mono is reserved for anything that needs to line up in a column.

## 3. UI Kit file — page plan

- **Cover**
- **Primitives** — Button, Badge, Chip, Avatar, Kbd, Switch, Segmented, Progress, Step
- **Inputs** — Input, Select, Textarea, Search
- **Surfaces** — Card, KPI tile, StatRow / hero stat, CategoryTag, EmptyState, Skeleton
- **Feedback** — Alert, Banner, Modal, Tooltip (keyboard-accessible via `:focus-within`)
- **Navigation** — TopNav (single row, no sidebar), Command palette (⌘K), Tabs, ChipBar
- **Data display** — Borderless table (comfortable/compact), Receipt thumb, Status badge (7 semantic groups)
- **Charts** — Line, Bar, Area, Donut, Sparkline — all with real `<title>`/`aria-label` and keyboard-focusable data points
- **Brand** — BrandMark variants (mark, wordmark, horizontal, stacked)
- **Mobile** — Status bar, Tab bar, Mobile card, Mobile button

## 4. Components vs Variants vs Tokens vs Assets

| Concern | What it is | Where it lives | Example |
|---|---|---|---|
| **Token** | A value (color, size, radius) | Figma Variables | `--ff-primary` |
| **Variant** | A *style* of a component | Component property in Figma | `Button / variant=primary` |
| **Component** | A reusable UI piece | Figma main component | `Button` |
| **Asset** | A static file (SVG, image, font) | File assets panel | `logomark.svg` |

## 5. Component inventory (with variants)

| Component | Variants | States |
|---|---|---|
| Button | `primary / ghost / danger / accent` × `sm / md / lg / icon` | default, hover, active, focus-visible, disabled |
| Badge | 7 semantic groups × `no-dot` modifier | — |
| Chip | — | unselected, selected (`aria-pressed`) |
| Input | `md / lg` | default, focus-visible, error, disabled |
| Card | with/without head | — |
| KPI tile / hero stat | with/without sparkline | up / down / neutral delta |
| StatRow | 2–4 items | — |
| CategoryTag | — | color driven by the category's own token, not a separate hue per usage |
| Table row | `default / compact` | hover, selected |
| Avatar | `md / lg / xl` | initials |
| Switch | — | on, off |
| Segmented | 2–3 buttons | per-segment pressed |
| Tabs | — | per-tab selected |
| EmptyState | with/without action | — |
| Command palette | — | roving focus, arrow-key nav, Enter to select |

## 6. Export tables (devs)

### 6.1 SVG marks (from `/brand`)

| Asset | Path | Use |
|---|---|---|
| logomark.svg | `brand/logomark.svg` | App icon, square placements |
| logomark-light.svg | `brand/logomark-light.svg` | Dark surfaces |
| wordmark.svg | `brand/wordmark.svg` | Footer, marketing |
| lockup-horizontal.svg | `brand/lockup-horizontal.svg` | Top nav header |
| lockup-horizontal-dark.svg | `brand/lockup-horizontal-dark.svg` | Dark theme top nav |
| lockup-stacked.svg | `brand/lockup-stacked.svg` | Splash / onboarding |

### 6.2 Icon set
Phosphor v2.1.1 via CDN — `@phosphor-icons/web/src/regular/style.css` (also bold, fill). Sizes 12–22px in this kit.

### 6.3 Fonts to ship
- General Sans — 400, 500, 600, 700 (Fontshare)
- JetBrains Mono — 400, 500, 600

## 7. Naming conventions

- Component names: `PascalCase` (`StatRow`, `CategoryTag`, `EmptyState`)
- Variant property values: `kebab-case` (`variant=ghost-icon`)
- Token names: `--ff-{role|primitive}-{step}` (`--ff-teal-700`, `--ff-status-success-fg`)
- Frame names match screen IDs in `index.html`'s `SCREEN_REGISTRY` (e.g. `dashboard`, `expense-detail`)

## 8. Handoff checklist

- [ ] Every component has all states as variants
- [ ] Themes mode is wired on every screen frame
- [ ] No hard-coded colors — every fill traces to a Semantic token
- [ ] Each variant has a deliberate name (no `Variant=Default`)
