# 07 · Design System

Production-grade design system for FinFlow. Token-first. Both themes from day one. Components own their states, never the screen.

---

## Design Principles

1. **Quiet density** — Finance Admins want dense; everyone else wants quiet. Choose density at the role level, not the component level.
2. **Trust through type** — money deserves type that respects it; tabular figures everywhere quantity matters.
3. **Status never lies** — every state surfaced explicitly with icon + label, never inferred from color alone.
4. **One workspace, three voices** — same brand, different defaults per role.
5. **No decoration** — no gradients, no glassmorphism, no AI-slop tropes. Confidence from typography and density, not effects.

---

## Color System

The palette is intentionally narrow: one brand color, one accent, four semantic states, and a warm neutral ramp.

### Brand
- **Plum 700** — `oklch(0.28 0.10 340)` — primary action color
- Full scale: 50 → 900, all in oklch hue 340

### Accent
- **Citron 500** — `oklch(0.78 0.16 95)` — quick-actions, brand moments, ≤ 5% of UI

### Semantic (status)
- **Approved** — green, paired with check-circle icon
- **Pending** — amber, paired with clock icon
- **Rejected** — red, paired with x-circle icon
- **Flagged** — blue, paired with warning icon

Every status uses a colored background, a darker foreground, and an icon — never color alone.

### Neutrals
Warm-tinted (≈ hue 340, very low chroma 0.003–0.012) so they harmonize with plum.

### Role Tokens (the layer screens read)
Components reference *role tokens*, not primitives. Theme swap is a single attribute on `<html>`.

| Token | Light | Dark |
|---|---|---|
| `--ff-bg` | warm paper | plum-tinted ink |
| `--ff-fg` | ink-950 | cream |
| `--ff-fg-muted` | ink-500 | warm gray |
| `--ff-card` | white | ink-800 |
| `--ff-border` | ink-200 | warm-tinted border |
| `--ff-primary` | plum-700 | plum-300 |

### Chart Palette
6 categorical colors, each with light + dark variants, tuned for color-blind safety.

---

## Typography

### Families
- **Geist** — UI, headlines, KPI numerals, body text. The whole product.
- **JetBrains Mono** — IDs, card numbers, tabular data hints

(Instrument Serif is *available* as an editorial accent for marketing surfaces but is not used in the product UI by default.)

### Scale
| Token | Size | Weight | Use |
|---|---|---|---|
| Display 2xl | 64 | 700 | Auth headlines |
| Display lg | 36 | 700 | Empty-state hero |
| Page title | 32 | 700 | Top of every page |
| Card title | 17 | 600 | Inside cards |
| Body | 14 | 400 | Default |
| Compact | 13 | 400 | Dense tables |
| Meta | 12 | 400 | Captions |
| Eyebrow | 11 | 500 | UPPERCASE labels (0.08em tracking) |
| Mono | 12 | 400/500 | IDs, card PAN |

### Numeric
`font-variant-numeric: tabular-nums lining-nums` on every money or quantity value. Right-aligned in tables.

### Tracking
Tight (-0.025 to -0.035em) on display sizes; default on body; uppercase eyebrow at +0.08em.

---

## Spacing System

4px base. The scale runs 0 / 4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 / 64 / 80. No off-grid values.

| Context | Spacing |
|---|---|
| Inside a button | 14px horizontal, 0 vertical (height fixed) |
| Inside a card body | 20px |
| Between cards | 16px (default), 24px (section break) |
| Page padding | 24–28px |

---

## Layout System

Desktop is sidebar + main, with a 240px sidebar. Main is a 56px topbar + scrollable page. The grid is CSS grid + flex, never magic margins.

| Surface | Grid |
|---|---|
| Dashboard | 4-up KPI strip + 2-column hero (2fr / 1fr) + 1.4fr / 1fr secondary |
| Expenses list | Single full-width table |
| Detail | 1.6fr / 1fr (content / sidebar) |
| Settings | 220px tabs / 1fr content |
| Mobile | Single column, 360px design width |

Minimum desktop width: 1280px. Below that, the app scrolls horizontally — intentional for a power-user surface.

---

## Component Library

### Buttons
Five variants: `primary` · `default` · `ghost` · `danger` · `accent` (citron, used sparingly).
Three sizes: `sm` (28px) · `md` (36px, default) · `lg` (44px).
States: default · hover · active · focused · disabled · loading. Focus ring is 2px Plum 500 with 2px offset.

### Forms
- Inputs / selects / textareas share a single 36px height, 12px padding, 8px border-radius
- Labels are the `eyebrow` style (uppercase, 11px, tracked +0.08em)
- Focus state: plum border + 3px soft outer ring
- Error state: red border + 11px helper text below
- Switches: 32×18px pill, brand-color when on

### Tables
Sticky header. 10px / 14px padding. Tabular figures right-aligned via `.ff-num` modifier. Compact variant trims row padding to 8/14.

### Charts
SVG, built from scratch — no chart library dependency. Components: `Sparkline` · `LineChart` · `BarChart` · `AreaChart` · `Donut` · `BudgetBar`. All accept arrays of data and use role tokens for grid + axis colors.

### Status Indicators
Pill badges with icon + label. Modifiers: `approved` · `pending` · `rejected` · `flagged` · `plum` · `neutral`. The `no-dot` modifier replaces the dot indicator with an icon (used in dense tables).

### Cards, KPI tiles, Avatars, Chips, Tabs, Alerts, Modals, Tooltips, Empty states, Skeletons, Steps, Progress
All covered in `foundations/components.css` with consistent radius, spacing, and elevation.

---

## Accessibility Considerations

- All color pairs verified at ≥ 4.5:1 contrast in both themes (3:1 for large text)
- Focus rings on every interactive element via `:focus-visible`
- Status always paired with an icon + label
- Tabular figures aid scanning for both sighted and assistive-tech users
- 44px minimum touch targets on mobile
- `@media (prefers-reduced-motion: reduce)` disables animation
- Keyboard navigation via ⌘K, tab order respects visual order
- Modals trap focus

---

## Responsive Behavior

- **Desktop (≥ 1280px):** full sidebar + main split
- **Tablet (768–1280px):** out of scope for v1; designed against 1280px+
- **Mobile (≤ 480px):** employee-only surface, dedicated screens

The mobile experience is not a reflow of the desktop product — it is a curated set of 6 screens for the Employee persona only.
