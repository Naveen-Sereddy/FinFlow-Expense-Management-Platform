# 03 · Engineering Handoff Notes

> Design-to-dev notes for the FinFlow Expense Management Platform. Component names map directly
> to the prototype and the CSS design system.

---

## Recommended stack

The prototype runs as a self-contained HTML bundle. For a production build, the natural stack
given the component structure and role-based routing:

- **Frontend:** Next.js (App Router) + React + TypeScript
- **Styling:** the existing token system (CSS custom properties) maps cleanly to either
  Tailwind configured from the same tokens, or a small utility layer on top of the component CSS
- **Auth:** a role-aware auth provider (the product has three distinct roles — Finance Admin,
  Manager, Employee — with meaningfully different navigation and permissions)
- **Charts:** Recharts or Visx for the line, bar, area, donut, and sparkline charts used in
  reports and the Finance Admin dashboard
- **Icons:** Lucide-react (the same set used throughout the prototype)

---

## Role architecture

This is the most important thing to get right before writing any routing logic. The product has
three roles with different navigation, different default screens, and different data access:

| Role | Default landing | Primary action | Key surfaces |
|---|---|---|---|
| **Finance Admin** | Dashboard | "What do I need to do today?" | Dashboard, Expenses, Reports, Audit Log, Cards, Settings |
| **Manager** | Approvals queue | Bulk approve / reject | Approvals (queue + history), Expenses (read-only) |
| **Employee** | Expense home | Submit expense (mobile) | Expenses (own), Reimbursements (own), Cards (own) |

The sidebar re-renders per role. Everything else — topbar, global search, ⌘K screen directory —
is shared.

---

## Component inventory

The full component set is in the prototype. Core components that span all three role experiences:

**Layout:** `AppShell`, `Sidebar` (role-aware), `TopNav`, `PageShell`

**Primitives:** `Button` (5 variants × 3 sizes), `Badge`, `Chip`, `Card`, `KPITile`,
`Field` (input, select, date, amount), `Switch`, `SegmentedControl`, `Tabs`

**Data display:** `DataTable` (sortable, filterable, selectable rows), `StatusTimeline`,
`BulkActionBar`, `AuditLogRow`, `ChartShell` (wraps all chart types)

**Modals + overlays:** `Modal`, `Drawer`, `Tooltip`, `CommandPalette` (⌘K)

**States:** `Skeleton`, `EmptyState`, `ErrorState`, `SuccessToast` — every table and list view
has all four. Don't skip empty and error states; they're where Finance Admins lose trust.

---

## Token usage

Both light and dark themes are defined from day one as CSS custom properties. All components
reference role tokens, not primitives — theme swap is a single attribute on `<html>`.

Key conventions:

- **Money and quantities:** `font-variant-numeric: tabular-nums` + right-aligned columns
  everywhere. This was the highest-leverage typographic decision in the whole system.
- **Status:** always badge + icon + label, never color alone. Applies to expense status,
  approval status, card status, and audit events.
- **Brand:** plum (`--color-brand`) + citron (`--color-accent`). Don't drift to green or blue —
  the whole point of the palette was to not look like Brex or Ramp.

---

## Audit log requirements

The audit log was promoted to a top-level nav item (not buried in Settings) based on testing —
task completion for "find the audit log" jumped from 50% to 92% with that single change.

Requirements for the build:
- Append-only — no edits, no deletes
- Every financial record read and write gets logged (who, what, when, IP)
- Exportable as CSV with date range + actor + action filters
- The UI for this is in the prototype under the Audit Log screen

---

## Accessibility requirements

- **Focus rings:** 2px plum with 2px offset on all interactive elements via `:focus-visible`
- **Touch targets:** 44px minimum on mobile (Employee flow)
- **Status:** icon + label always paired with color — never color alone
- **Keyboard:** ⌘K screen directory; tab order follows visual order; modals trap focus
- **Reduced motion:** all transitions honor `prefers-reduced-motion`
- Both light and dark themes are AA-verified — don't add new color pairings without checking

---

## Prototype reference

The self-contained HTML bundle in the repo root runs offline with no build step. It covers all
30+ desktop screens across three roles, the 6-screen mobile submission flow (Employee), and all
explicit states (loading, empty, error, success, confirmation). Use it as the interaction
source of truth.
