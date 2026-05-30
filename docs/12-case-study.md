# 12 · Case Study

> **FinFlow — designing the workspace for Series B finance teams**
> Senior Product Designer · 12-week solo project · concept → design system → 30+ screens → mobile flow → engineering handoff

---

## Project Overview

FinFlow is an expense management workspace built for Series B SaaS companies. It collapses four disconnected tools — corporate cards, approvals, reimbursements, and finance reporting — into a single role-aware product anchored on the Finance Admin's calendar.

I owned the project end-to-end: discovery, IA, brand identity, token-first design system, every screen, and the engineering handoff package.

- **30+ desktop screens** + a 6-step mobile flow
- **Light + dark themes** defined as design tokens from day one
- **Plum + citron palette**, Modern Grotesk typography — deliberately not the green/blue every fintech defaults to
- **89% first-try completion** on the main flow (Maze, n=12)
- **WCAG 2.1 AA** across both themes

---

## Problem

Series B SaaS companies sit in the awkward middle of the expense market:

- Too many transactions for the founder-era shoebox stack
- Too few for an enterprise ERP like NetSuite or Coupa
- A two-to-four-person finance team, with one Director of Finance owning everything

They typically run on four disconnected tools: corporate cards (Brex / Mercury), expense submission (a spreadsheet or a tab in Slack), reimbursement (manual ACH out of the bank portal), and reporting (Excel + QuickBooks). Each tool is decent in isolation. The seams between them are where the Finance Admin's week disappears.

The Finance Admin we designed for spends six hours per month chasing receipts in Slack and another four hours rebuilding the monthly close packet by hand. The Manager approvals queue is whatever happens in Slack DMs, lossy by design. Employees forget to submit because the receipt photo sits in their phone library for two weeks.

The product brief: **collapse the four tools into one workspace, designed around the Finance Admin's morning routine, without becoming an ERP.**

---

## Business Context

| Constraint | Impact |
|---|---|
| Must not look like Brex / Ramp / Mercury | Forced a distinct typographic + color decision |
| SOC 2 + audit trail required from day one | Audit log promoted to top-level product surface |
| Single engineering sprint per area | Component-led IA, no exotic patterns |
| Both themes from day one | Token-first design system, not a recolor |
| 30+ desktop screens + mobile flow | Pattern reuse across surfaces |

The wedge — companies between 100 and 500 employees with $50K–$300K monthly OpEx through cards — is large enough to support a venture-scale business but underserved by incumbents biased to either smaller or larger segments.

---

## Research

I ran a three-week discovery phase covering:

- **Stakeholder interviews** with leadership and engineering to surface business + feasibility constraints
- **Persona interviews** with three Finance Admins at Series B SaaS companies
- **Workflow shadowing** during two 90-minute sessions watching real receipt-chase and monthly close work
- **Competitive teardown** across Brex, Ramp, Mercury, Airbase, Pleo, and Navan
- **Two rounds of Maze usability testing** (n=12 each — 4 Finance Admins, 4 Managers, 4 Employees) against a mid-fi prototype, then the hi-fi build

The research output produced a four-principle compass:

1. **Quiet density** — Finance Admins want dense; everyone else wants quiet
2. **Trust through type** — money deserves type that respects it
3. **Status never lies** — every state explicit, never inferred from color
4. **One workspace, three voices** — same brand, different defaults per role

---

## Key Insights

| Insight | Implication for design |
|---|---|
| Finance Admins open the dashboard daily between 7:45 and 8:00 AM | The dashboard must answer "what should I do today?" in ≤ 6 seconds |
| Managers want to *approve*, not review | Bulk-approve with policy result inline becomes the primary pattern |
| Employees want certainty, not features | Status timeline > rich submission UX |
| Auditors want immutability, not interactivity | Append-only audit log, exportable, filterable |
| Every persona scans amount first | Tabular figures + right-aligned money columns become the highest-leverage typographic choice |

---

## Personas

Three primary personas drove the design (Auditor is supported but never primary). Each has its own role-aware experience inside the same workspace.

- **Iris Chen** — Senior PMM, Employee. 5 submissions/month. Mobile-first.
- **Theo Vasquez** — Head of Sales, Manager. 8–14 approvals/week. Speed-first.
- **Maren Okafor** — Director of Finance, primary user. 4+ hours/day in product. Density-first, keyboard-first.

Full persona definitions live in `03-personas.md`.

---

## Journey Maps

Three journeys mapped end-to-end with actions, thoughts, emotions, frustrations, and opportunities — see `04-user-journeys.md`. The highest-leverage findings:

- Iris's friction lives in *uncertainty*, not in form fields — the design responds with explicit status surfaces (submission success screen names the approver + ETA; status timeline shows current step)
- Theo's friction lives in *open-each-item* — design responds with policy result inline and a persistent bulk action bar
- Maren's friction lives in *cross-tool* — design responds by collapsing the four tools and promoting the audit log out of Settings

---

## Information Architecture

Three role-aware sidebars share one workspace. Switching role re-renders the sidebar but preserves the topbar, the global search, and the ⌘K screen directory.

The single highest-impact IA decision was **promoting the audit log out of Settings to a top-level surface**. Round-2 testing showed the "find the audit log" task completion jumping from 50% to 92% on the strength of that change alone.

Full IA, sitemap, and navigation rationale live in `05-information-architecture.md`.

---

## Wireframes

Mid-fidelity wireframes were used for IA validation in round 1 of testing. The key wireframe explorations were:

- **Dashboard layout** — 6×2 KPI grid vs. 4-up strip + hero (4-up won)
- **Approvals queue** — Kanban vs. dense list (dense list won)
- **Reports** — builder-first vs. saved-templates-first (templates-first won)
- **Mobile submission** — multi-step wizard vs. single-screen form (single-screen won)

For each, the losing direction taught more than the winning one — Kanban dragging slowed Managers down by 3x, and a multi-step wizard buried OCR confidence one screen too deep.

---

## Design Exploration

The visual identity went through three rounds:

1. **Editorial italic display** — Instrument Serif italic for numerals and headlines, paired with a clean grotesk. Premium, distinctive, but flagged as "feels nostalgic for a finance tool."
2. **Mixed family lockup** — "Fin" in grotesk, "Flow" in serif italic. Visually interesting but read as a typo in product chrome.
3. **Single-family Modern Grotesk** (final) — Geist 700 across wordmark, page titles, and KPI numerals. Tight tracking (-0.025 to -0.04em). Confident, cohesive, in the family of Linear, Ramp, and Mercury without being any of them.

The plum + citron palette held through all three rounds; only the typography iterated.

---

## Design System

Production-grade, token-first. Both themes from day one. Components reference role tokens, never primitives — theme swap is a single attribute on `<html>`.

Highlights:

- **Color** — one brand (plum), one accent (citron), four semantic states, one warm neutral ramp
- **Type** — Geist for everything in product, JetBrains Mono for IDs
- **Tabular figures everywhere** money or quantity appears
- **Spacing** — 4px base, no off-grid values
- **Radius** — restrained; 8px dominates
- **Elevation** — four soft levels; no glassmorphism
- **Components** — buttons (5 variants × 3 sizes), badges, chips, cards, KPI tiles, tables, forms (inputs, selects, switches, segmented controls, tabs), alerts, modals, tooltips, empty states, skeletons, steps, progress, charts (line, bar, area, donut, sparkline)

Full system documentation in `07-design-system.md`.

---

## Accessibility

WCAG 2.1 AA verified across both themes.

- **Contrast** — every foreground/background pair audited; lowest pass at 4.5:1
- **Focus rings** — 2px Plum 500 with 2px offset on every interactive element via `:focus-visible`
- **Status never color-only** — icon + label always paired
- **Keyboard** — ⌘K screen directory; tab order respects visual order; modals trap focus
- **Touch targets** — 44px minimum on mobile
- **Reduced motion** — animation disabled when the user prefers

Open improvements (skip-link, aria-live on bulk-action counters, lift focus on route change) are scheduled for v1.1. Full review in `08-accessibility-review.md`.

---

## Final Solution

The shipped product:

- 30+ desktop screens covering auth, onboarding, three role dashboards, expenses (list / detail / new / OCR / flagged / bulk import), approvals (queue / detail / bulk / history), reimbursements (list / detail / schedule), reports (home / builder / saved / export), cards (list / detail / issue / freeze), vendors (directory / detail), audit log, notifications center, help, settings (7 tabs), and 5 explicit states (loading / empty / error / success / confirmation)
- A 6-screen mobile flow for the Employee persona (sign in → home → snap receipt → new expense → submit success → status timeline)
- A token-first CSS design system with both themes
- A React component kit + reusable chart primitives
- A full engineering handoff package (Next.js, Drizzle, WorkOS, Stripe Issuing, schema, RBAC, CI/CD)
- A single self-contained offline-runnable HTML bundle of the prototype

---

## Outcomes

(Detailed accounting in `11-outcomes-and-impact.md`.)

**Actual (observed in research):**
- Composite first-try task completion: 73% → 89% across two rounds (n=12 each)
- Time-to-answer "what should I do today?" — 22s → 6s (think-aloud, n=4)
- 5/6 stakeholders explicitly said the visual identity "doesn't look like Brex"

**Projected (post-launch):**
- 6 hrs/month → < 1 hr/month receipt chase
- 4 hrs → 22 min monthly close
- 7 clicks → 2 clicks per approval decision
- 1–2 weeks → 2 hrs per quarterly audit cycle

---

## Lessons Learned

1. **Commit to a typographic voice on day one.** I lost two rounds to iterating on "should the wordmark be editorial or grotesk?" — should have run that choice as the very first stakeholder review.
2. **Test the failure modes early.** The flagged-vs-rejected confusion was a one-day fix in round 2 but cost me 4 hours of round-1 frustration trying to debug "why isn't this read?"
3. **Saved templates beat builders.** Designers default to building Tableau-style builders; users overwhelmingly want one button that runs the report they always run.
4. **Bulk operations are not optional for power users.** Every interactive surface I designed got 10x better the moment I added a bulk action.
5. **The engineering handoff is part of the design.** Writing the RBAC table and the policy-engine TS contract changed how I shaped the policy UX. Designers who ship don't hand off — they write the handoff.

---

## Reflection

The single most valuable thing I did was **anchor the entire product to the Finance Admin's morning routine.** Every design decision, large or small, gets back-validated by the question "would Maren look at this between 7:45 and 8:00 AM?" If yes, it lives on the dashboard. If no, it lives one click deeper. That principle dissolved 90% of the layout debates I would otherwise have had with myself.

The thing I'd do differently: I'd run one more research round on the **report builder** before calling it done. It's the weakest surface in the system. Users complete tasks on it but not fluidly. With another two weeks, I'd test a templated-with-tweaks pattern (start from a saved report, click "modify") against the cold builder I shipped.

If I had three more months: per-team policy editor UI, NetSuite integration UI, an AI-assisted "close prep" surface, and a tablet experience for the Finance Admin who reviews on the couch.

The product itself is portfolio-strong. The thing I'm proudest of is that the design system holds — token-first, both themes from day one, components owning their states — and an engineering team could build it from the handoff without me in the room.
