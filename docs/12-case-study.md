# 12 · Case Study

> **FinFlow — designing the workspace for Series B finance teams**
> Senior Product Designer · solo engagement · discovery → design system → 47 screens → mobile flow → production-readiness pass

---

## Project Overview

FinFlow is an expense management workspace built for Series B SaaS companies. It collapses four disconnected tools — corporate cards, approvals, reimbursements, and finance reporting — into a single role-aware product anchored on the Finance Admin's calendar.

I owned the project end-to-end: information architecture, visual identity, token-first design system, every screen, and a full production-readiness audit after the initial build.

- **47 desktop screens** + an 8-screen mobile flow
- **Light + dark themes** defined as design tokens from day one
- **One brand hue, one typeface** — deliberately not the green/blue/orange every fintech defaults to
- **No sidebar** — a single top nav capped at each role's real highest-frequency destinations, everything else one ⌘K away
- **Zero console errors** across all 47 screens, verified by an automated sweep after every change

---

## Problem

Series B SaaS companies sit in the awkward middle of the expense market:

- Too many transactions for the founder-era shoebox stack
- Too few for an enterprise ERP like NetSuite or Coupa
- A two-to-four-person finance team, with one Head of Finance owning most of it

They typically run on four disconnected tools: corporate cards, expense submission (a spreadsheet or a Slack channel), reimbursement (manual ACH out of the bank portal), and reporting (Excel + QuickBooks). Each tool is fine in isolation. The seams between them are where the Finance Admin's week disappears.

The brief: **collapse the four tools into one workspace, designed around the Finance Admin's morning routine, without becoming an ERP.** The final product shipped privately for the client; company and participant details remain anonymized here under NDA.

---

## Research

Discovery combined 12 structured interviews across the three core roles with competitive analysis and public community research. The client and participant details are anonymized here under NDA:

- **Structured interviews** with 12 client stakeholders across Employee, Department Manager, and Finance Admin workflows over four weeks
- **Competitive teardown** across Brex, Ramp, Mercury, Airbase, Pleo, and Navan — onboarding flows, dashboard layouts, approval patterns, and audit experiences
- **Public community research** — G2, Reddit, and LinkedIn discussions from Finance Admins at Series B companies surfacing recurring pain patterns
- **Heuristic analysis** of the standard four-tool stack, to map where time disappears
- **Persona synthesis** — three behavioral archetypes, each with a different reason to open the product and a different tolerance for friction

The research output produced a four-principle compass:

1. **Quiet density** — Finance Admins want dense; everyone else wants quiet
2. **Trust through type** — money deserves type that respects it
3. **Status never lies** — every state explicit, never inferred from color
4. **One workspace, three voices** — same brand, different defaults per role

The single clearest pattern across every competitor studied: sidebar, four equal KPI cards, a chart, a table. That shared skeleton became the thing to deliberately not build.

---

## Key Insights

| Insight | Implication for design |
|---|---|
| Finance Admins want a fast answer, not four numbers to compare | One hero KPI beats four equal cards |
| A 12-item sidebar solves discoverability by never hiding anything | Frequency-based top nav + search fixes the actual trade-off |
| Managers want to *approve*, not review | Bulk-approve with inline policy result becomes the primary pattern |
| Employees want certainty, not features | Status timeline > rich submission UX |
| Every persona scans amount first | Tabular figures + right-aligned money columns are the highest-leverage typographic choice |

---

## Personas

Three primary personas drove the design. Each has its own role-aware experience inside the same workspace.

- **Corey Anderson** — Senior PMM, Employee. ~5 submissions/month. Mobile-first.
- **Xavier Bartlett** — VP Sales, Manager. 8–14 approvals/week. Speed-first.
- **Marcus Stoinis** — Head of Finance, primary user. Hours a day in product. Density-first, keyboard-first.

Full definitions in `03-personas.md`.

---

## Information Architecture

There is no sidebar. A single top nav row per role, capped at 5–7 highest-frequency destinations; everything else — Settings, Policies, Team, Integrations, Audit Log, Help — is one ⌘K search away, with real arrow-key navigation and Enter-to-select.

The IA decision this replaced: a 12-item sidebar solves discoverability by never hiding anything, which means a once-a-quarter destination gets the same permanent visual weight as a daily one. Capping the nav and routing the rest through search fixes that trade-off structurally, instead of promoting one buried item at a time.

Full IA, sitemap, and navigation rationale in `05-information-architecture.md`.

---

## Wireframes

Low-fidelity blocking locked in the asymmetric grid — hero KPI plus inline stats, not a repeated four-card row — before any color or type decisions. Mid-fidelity validated the two highest-traffic screens (Dashboard, Approvals) with real labels and the tradeoffs behind each option. See `case-study/ab-lofi.jsx` and `case-study/ab-midfi.jsx`, rendered live in the case-study canvas.

---

## Design Exploration

The visual identity settled on a single grotesk (General Sans) at a defined scale, paired with JetBrains Mono for anything tabular — one typographic voice throughout the product, not a display/body split. The brand color is one slate-blue hue, used sparingly: primary actions, focus rings, and the first chart series only.

---

## Design System

Production-grade, token-first. Both themes from day one. Components reference role tokens, never primitives — theme swap is a single attribute on `<html>`.

Highlights:

- **Color** — one brand hue, seven semantic status groups, one warm neutral ramp
- **Type** — General Sans for everything in product, JetBrains Mono for IDs and money
- **Category color** — every category carries its own color in the data model; tags and charts both read that field, so a category can't drift between two different colors on two different screens
- **Spacing** — 4px base, 4/8/12/16/20/24/32/40/48/64/80, no off-grid values
- **Components** — buttons (4 variants), badges (7 semantic groups), `StatRow` (replaces 14 hand-copied stat blocks that had already drifted), `CategoryTag`, `EmptyState`, borderless tables, charts (line, bar, area, donut, sparkline) with real accessible names and keyboard-focus tooltips

Full documentation in `07-design-system.md`.

---

## Accessibility

WCAG 2.1 AA target, verified with a real production-readiness pass rather than assumed:

- Every chart carries `<title>` + `role="img"` + `aria-label`; Line and Area charts are keyboard-operable, not mouse-only
- Every icon-only button audited individually for a real `aria-label`
- One focus-ring token everywhere, including form inputs, applied only on `:focus-visible` so a mouse click doesn't draw a keyboard ring
- ⌘K command palette has real arrow-key roving focus and Enter-to-select — it used to advertise this and not implement it
- Primary button contrast: 6.75:1 (AA); status badge text: ≥7:1 (AAA) against its own background

Known gaps, not hidden: table rows that navigate on click aren't keyboard-focusable yet (a systemic pattern, not a one-off), and there's no pagination or slide-over drawer component yet. Full review in `08-accessibility-review.md`.

---

## Final Solution

The shipped product:

- 47 desktop screens covering a 6-step onboarding flow (workspace creation, company details, connect financial systems, invite team, expense policy, success), three role dashboards, expenses (list / detail / new / OCR / flagged / bulk import), approvals (queue / detail / bulk / history), reimbursements (list / detail / schedule), reports (home / builder / saved / export), cards (list / detail / issue), vendors (directory / detail), audit log, notifications, help, settings (7 tabs), and 5 explicit states (loading / empty / error / success / confirmation)
- An 8-screen mobile flow for the Employee persona (sign in, home, snap receipt, new expense, submit success, status timeline, expenses, cards)
- A token-first CSS design system with both themes
- A React component kit + hand-rolled SVG chart primitives
- A single self-contained offline-runnable HTML bundle — no bundler required for the shipped client surface

---

## Outcomes

(Detailed accounting in `11-outcomes-and-impact.md`.)

**Verified (checked against the shipped build):**
- 47/47 screens pass an automated sweep across all 3 roles and both themes — zero console errors, zero broken renders
- A production-readiness audit found and fixed 14 drifted duplicate stat blocks, 2 conflicting color systems, 5+ unlabeled icon buttons, and a command palette that faked keyboard support — all traced to specific files, not batch-guessed

**Projected (require a real launch to confirm):**
- Meaningful reduction in Finance Admin receipt-chase and monthly-close time from consolidating four tools into one
- Faster approval sessions from inline policy results and persistent bulk actions
- Lower audit-prep cost from a filterable, exportable log replacing manual sampling

---

## Lessons Learned

1. **A shared component doesn't stay shared if it's easy to hand-copy instead.** `StatRow` existed and solved this exact problem — and still got hand-copied 14 times before I caught it in an audit, because reaching for a new inline block was less friction than checking whether a component already existed.
2. **"It works" and "it's finished" are different claims for interactive elements.** The command palette rendered a correct-looking keyboard hint for the entire redesign before anyone noticed there was no keyboard handler behind it. Visual completeness hides functional gaps.
3. **Fixing the root cause is a smaller diff than it looks.** A color-token mismatch, once fixed at the data-model level (one `color` field per category), fixed itself everywhere it was used — table tags, charts, legends — instead of needing three separate patches.
4. **Removing an item from a nav is not the same decision as capping the nav.** The instinct when a sidebar feels crowded is to promote the one item someone complained about. The actual fix was structural — cap every role's nav at what real sessions touch, and stop treating "buried" as a per-item problem.
5. **An audit is only as good as what it actually checks.** A scripted sweep across every screen, every role, every theme caught real regressions a manual click-through would have missed by the third screen.

---

## Reflection

The single most valuable thing I did was **audit the shipped build as ruthlessly as I designed it.** A redesign that looks finished in a handful of screenshots can still have a command palette lying about its own keyboard support, a duplicated component quietly drifting in four places, and a stray hardcoded color that was never actually re-verified after a rebrand. None of that shows up in a screenshot. All of it shows up in production.

The thing I'd do differently: build `StatRow` and `CategoryTag` on the first pass through each screen family, not after noticing the drift in an audit. The fix was fast once found — the finding should have been unnecessary.

If I had more time: a real pagination component, a slide-over drawer for reviewing list items without a full navigation, a working date-range filter, and a systemic fix for keyboard-focusable table rows instead of leaving it as a documented gap.
