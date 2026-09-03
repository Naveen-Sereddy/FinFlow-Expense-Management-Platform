# 03 · Engineering Handoff Notes

> Design-to-dev notes for the FinFlow Expense Management Platform. Component names map directly
> to the shipped client surface and the CSS design system.

---

## Shipped architecture and next-step stack

The shipped client surface runs as a self-contained HTML bundle with React 18, Babel Standalone,
and the tokenized CSS system. It has no bundler or application server in this repository. If the
client takes the product beyond the current shipped surface, the component structure and
role-based routing map naturally to:

- **Frontend:** Next.js (App Router) + React + TypeScript
- **Styling:** the existing token system (CSS custom properties) maps cleanly to either
  Tailwind configured from the same tokens, or a small utility layer on top of the component CSS
- **Auth:** a role-aware auth provider (three distinct roles — Finance Admin, Manager, Employee —
  with meaningfully different navigation and permissions)
- **Charts:** the shipped hand-rolled SVG charts (Sparkline, LineChart, BarChart, AreaChart,
  Donut) are the interaction spec — including hover/keyboard tooltips and real `aria-label`s.
  Recharts or Visx would be reasonable production replacements if a library is preferred
- **Icons:** Phosphor (the exact set used throughout the shipped product, via `@phosphor-icons/web`)

---

## Navigation architecture

This is the most important thing to get right before writing routing logic. There is no sidebar.
A single top nav row carries logo, per-role destinations, role switch, search, theme, and avatar.
Each role sees only its 5–7 highest-frequency destinations; everything else — Settings, Policies,
Team, Integrations, Audit Log, Help — is reachable through the same ⌘K screen directory used for
search, with real arrow-key navigation and Enter-to-select.

| Role | Default landing | Top-nav destinations |
|---|---|---|
| **Finance Admin** | Dashboard | Dashboard, Expenses, Approvals, Reimbursements, Reports, Cards, Vendors |
| **Manager** | Approvals queue | Team overview, Approvals, Team expenses, Reports, Budgets |
| **Employee** | My spend | My spend, New expense, My expenses, My cards, Reimbursements |

Switching role swaps the top-nav item set and the dashboard's dominant composition; the search bar,
⌘K, and theme toggle are shared and unchanged.

---

## Component inventory

**Layout:** `TopNav` (role-aware), `PageHead`, `Card`

**Primitives:** `Button` (4 variants × 4 sizes), `Badge`/`StatusBadge` (7 semantic groups),
`Chip`, `KpiTile`, `StatItem`/`StatRow`, `CategoryTag` (color sourced from the category's own
data field, not re-derived per component), `Field` (input, select), `Switch`, `SegmentedControl`,
`Tabs`

**Data display:** borderless data tables (no card wrapper around primary lists), `EmptyState`,
`ChartShell`-equivalent (each chart component handles its own empty-data guard and accessible name)

**Overlays:** `Modal`, `Tooltip` (`:focus-within` in addition to `:hover`), Command palette (⌘K,
real keyboard navigation)

**States:** `Skeleton`, `EmptyState`, error and success full-page states — wired into every list
screen that can legitimately have zero rows (Vendors, Reimbursements, Approval History, Audit Log,
Cards), not just a demo screen.

---

## Token usage

Both light and dark themes are defined as CSS custom properties. All components reference role
tokens, not primitives — theme swap is a single attribute on `<html>`.

Key conventions:

- **Money and quantities:** `font-variant-numeric: tabular-nums` + right-aligned columns
  everywhere. Highest-leverage typographic decision in the whole system.
- **Status:** always badge + icon + label, never color alone. Seven semantic groups
  (success/warning/info/review/action/danger/neutral) cover every status string in the app.
- **Category color:** every category (Software, Travel, Meals, ...) carries a `color` field in the
  data model pointing at a chart token. Category tags and category-breakdown charts both read that
  field — a category can't render a different color in a table than it does in a chart.
- **Focus ring:** one token, `--ff-focus-ring`, applied via `box-shadow` on `:focus-visible` so it
  follows each element's own corner radius instead of a fixed outline.
- **Brand:** one hue (slate blue), used for primary actions, focus rings, and chart series 1 —
  not green or orange, deliberately distinct from the incumbents.

---

## Navigation and discoverability

Low-frequency destinations (Audit Log, Settings, Policies, Integrations, Help) get no permanent
nav chrome for any role — they're reachable through ⌘K, same as search. This is a deliberate
trade: a 12-item sidebar solves discoverability by never hiding anything, at the cost of giving
daily and quarterly destinations equal visual weight. Capping the top nav at each role's real
highest-frequency items and routing the rest through search fixes that trade without promoting
individual items one at a time.

Audit log requirements for the build:
- Append-only — no edits, no deletes
- Every financial record read and write gets logged (who, what, when, IP)
- Exportable as CSV with date range + actor + action filters

---

## Accessibility requirements

- **Focus rings:** the shared `--ff-focus-ring` token via `:focus-visible` on every interactive
  element, including form inputs (not just buttons)
- **Touch targets:** 44px minimum on mobile (Employee flow)
- **Status:** icon + label always paired with color — never color alone
- **Charts:** every chart renders `<title>` + `role="img"` + `aria-label`; Line and Area chart
  data points are keyboard-focusable and show the same tooltip on focus as on hover
- **Icon-only buttons:** every one carries a real `aria-label` — audited individually, not assumed
- **Keyboard:** ⌘K screen directory with real arrow-key roving focus; tab order follows visual
  order; modals should trap focus
- **Reduced motion:** all transitions honor `prefers-reduced-motion`

**Known gap, not hidden:** table rows that navigate on click aren't yet keyboard-focusable. It's a
systemic pattern across most list screens, not a one-off — needs a coordinated fix, not a patch
per screen.

---

## Shipped product reference

The self-contained HTML bundle in the repo root runs offline with no bundler. It covers all
47 desktop screens across three roles, the 8-screen mobile submission flow (Employee), and all
explicit states (loading, empty, error, success, confirmation). Use it as the interaction
source of truth.
