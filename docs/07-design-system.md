# 07 · Design System

Production-grade design system for FinFlow. Token-first. Both themes from day one. Components own their states, never the screen.

---

## Design Principles

1. **Quiet density** — Finance Admins want dense; everyone else wants quiet. Choose density at the role level, not the component level.
2. **Trust through type** — money deserves type that respects it; tabular figures everywhere quantity matters.
3. **Status never lies** — every state surfaced explicitly with icon + label, never inferred from color alone.
4. **One workspace, three voices** — same brand, different defaults per role.
5. **No decoration** — no gradients (except the intentional virtual-card mockup), no glassmorphism. Confidence from typography, spacing, and composition, not effects.
6. **Asymmetric on purpose** — a hero number next to inline stats, an uneven chart split, a queue as the wide column instead of a chart. A generic dashboard is four equal cards and a chart; this deliberately isn't that, page after page.

---

## Color System

The palette is intentionally narrow: one brand hue, seven semantic status groups, and a warm neutral ramp.

### Brand
One slate-blue hue carries every primary action, focus ring, and the first chart series — not the electric green or Brex-orange every incumbent defaults to. (Variable names are legacy `--ff-teal-*` for historical reasons; the values are slate blue.)

### Semantic status — 7 groups, not a generic 4
`success` · `warning` · `info` · `review` · `action` · `danger` · `neutral` — each exposing a `-bg` / `-fg` / `-border` token set. Every status string used anywhere in the app resolves through one lookup table to one of these seven; no component picks its own color.

### Category color
Every spend category (Software, Travel, Meals, ...) carries a `color` field in the data model pointing at a chart token. Category tags, category-breakdown bar charts, and dashboard legends all read that same field — a category renders the same color everywhere it appears, by construction, not by convention.

### Neutrals
Warm-tinted ink scale over a cream surface, not cold gray — matches the brand's warmth without competing with it.

### Role Tokens (the layer components read)
Components reference *role tokens*, never primitives directly. Theme swap is a single attribute on `<html>`.

| Token | Purpose |
|---|---|
| `--ff-bg` / `--ff-fg` / `--ff-fg-muted` / `--ff-fg-subtle` | Page background and text hierarchy |
| `--ff-card` / `--ff-card-2` | Surface levels |
| `--ff-border` / `--ff-border-strong` | Hairlines |
| `--ff-primary` / `--ff-primary-hover` / `--ff-primary-pressed` | The one brand action color |
| `--ff-focus-ring` | Single box-shadow ring, used by every focusable element including form inputs |
| `--ff-chart-1…6` | Categorical chart palette; series 1 is the brand hue, 2–6 are distinct |

### Primary button contrast
White text on the primary fill measures 6.75:1 (AA) — the fill is deliberately saturated enough that near-black text on it would fail (2.93:1), which is why the button foreground is white, not the default ink color.

---

## Typography

### Family
**General Sans** — the entire product, one grotesk at different sizes and weights, no separate display/body pairing. **JetBrains Mono** for IDs, card numbers, and tabular money.

### Scale
| Token | Size | Weight | Use |
|---|---|---|---|
| Page title | 34 | 600 | Top of every page |
| Card title | 15 | 600 | Inside cards, section headers |
| Body | 14 | 400 | Default |
| Compact | 13 | 400 | Dense tables |
| Eyebrow | 11 | 500 | UPPERCASE labels, +0.06em tracking |
| Mono | 12 | 400/500 | IDs, card numbers, tabular money |

### Numeric
`font-variant-numeric: tabular-nums lining-nums` on every money or quantity value. Right-aligned in tables.

---

## Spacing System

4px base. The scale runs 4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 / 64 / 80. No off-grid values.

| Context | Spacing |
|---|---|
| Inside a button | 14px horizontal, height fixed |
| Inside a card body | 20px |
| Between cards | 16px (default), 24px (section break) |
| Page padding | 24–28px |

---

## Layout System

No sidebar. A 60px top nav row, then a scrollable page. Composition is deliberately asymmetric per screen instead of one repeated grid.

| Surface | Grid |
|---|---|
| Dashboard | Hero KPI (1.7fr) + 3 inline stats, then an uneven chart split (1.8fr / 1fr) |
| Expenses / Vendors / Reimbursements | Borderless full-width table, no card wrapper |
| Detail | Asymmetric content/sidebar split (varies by screen — 1.6fr/1fr, 1.4fr/1fr) |
| Settings | 220px left tabs / 1fr content — the one screen that still uses a tab rail |
| Mobile | Single column, device-frame width |

Minimum desktop width: 1180px.

---

## Component Library

### Buttons
Four variants: `primary` · `ghost` · `danger` · `accent`. Sizes: `sm` (28px) · `md` (36px, default) · `lg` (44px) · `icon`. Focus via the shared `--ff-focus-ring` token on `:focus-visible` — a mouse click doesn't draw the ring, only real keyboard focus does.

### Forms
- Inputs, selects, and textareas share a single 36px height, 12px padding, and the button radius
- Labels use the eyebrow style
- Focus state: brand-color border + the shared focus-ring token, on `:focus-visible` (not `:focus`)

### Tables
Borderless by default — a table is the content surface, not something wrapped in another card. Tabular figures right-aligned via `.ff-num`. Compact density variant trims row padding.

### Charts
SVG, built from scratch — no charting library. `Sparkline` · `LineChart` · `BarChart` · `AreaChart` · `Donut` · `BudgetBar`. Every chart renders a real `<title>` + `role="img"` + `aria-label`. Line and Area charts have hover **and** keyboard-focus tooltips on every data point — the same information either way, not a mouse-only affordance.

### Status Indicators
Pill badges, icon + label, seven semantic groups. Never color alone.

### StatRow / CategoryTag / EmptyState
Three components that consolidate patterns that had drifted when hand-copied per screen: `StatRow` for the hero-plus-inline-stats pattern (one definition instead of 14 near-identical copies), `CategoryTag` for the colored-dot category label (reads its color from the data model, not a per-screen hue), `EmptyState` for the icon/title/body/action pattern used across every list screen that can legitimately be empty.

### Cards, Avatars, Chips, Tabs, Alerts, Modals, Tooltips, Skeletons, Steps, Progress
All in `foundations/components.css` with consistent radius, spacing, and elevation.

---

## Accessibility Considerations

- Every chart has a real accessible name and keyboard-reachable data points
- Every icon-only button carries a real `aria-label`, audited individually
- One focus-ring token, applied consistently, including to form inputs
- Status always paired with an icon + label
- Tabular figures aid scanning for sighted and assistive-tech users alike
- 44px minimum touch targets on mobile
- `@media (prefers-reduced-motion: reduce)` disables animation
- ⌘K command palette has real arrow-key roving focus and Enter-to-select

---

## Responsive Behavior

- **Desktop (≥ 1180px):** full top-nav + page layout
- **Mobile:** employee-only surface, 8 dedicated screens — not a reflow of the desktop product
