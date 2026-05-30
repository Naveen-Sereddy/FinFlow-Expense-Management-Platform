# 01 · Business Context

## Executive Summary

FinFlow is an expense management workspace built for Series B SaaS companies (typically 100–500 employees) that have outgrown receipt-by-Slack but aren't ready for an enterprise ERP. It collapses four disconnected tools — corporate cards, approvals, reimbursements, and finance reporting — into a single role-aware product anchored on the Finance Admin's calendar.

This document captures the business reasoning behind the engagement, the constraints I designed within, and the outcomes the work was scoped to produce.

## Business Background

The expense management market sits between two well-served extremes. At the small end, founder-led startups patch together cards (Brex, Mercury), receipts (email), and accounting (QuickBooks). At the upper end, enterprises use Concur or Coupa, configured by professional services teams. The 100–500-employee band is where things break: too many transactions for a spreadsheet, too few for an ERP rollout.

Companies in this band lose 6–10 finance-team hours a month to receipt chasing, an additional 4–6 hours per monthly close, and frequently miss policy violations until quarterly review. They typically run a Finance Admin who owns close, board reporting, and policy enforcement single-handedly.

## Industry Context

- Corporate-card spend in the US grew 14% YoY in the last reported period
- Series B SaaS companies typically operate at $50K–$300K monthly OpEx through cards
- 78% of finance teams at this stage report "manual reconciliation" as the largest time drain (industry survey, projected)
- SOC 2 is table-stakes; audit log + RBAC + immutable records expected from day one
- Multi-product workflows (cards → expenses → reports → close) increasingly bundled

## Product Vision

> **"The whole company's spend, in flow."**

A workspace that lets a Finance Admin see, decide, and close the month in the same surface — without leaving for QuickBooks, Slack, or Excel. Employees submit in 30 seconds on mobile. Managers approve in 2 clicks. Auditors get an immutable trail.

## Stakeholders

| Stakeholder | Interest | Influence |
|---|---|---|
| Finance Admin (primary user) | Time saved on close + audit confidence | High |
| Manager / Approver | Speed of decisioning | High |
| Employee | Friction of submission | Medium |
| Auditor / External | Read-only audit trail | Low–Medium |
| Engineering | Stack feasibility, schema, RBAC | High |
| Sales / GTM | Demo path, pricing tier alignment | Medium |
| Leadership | Time-to-market, distinctiveness vs. incumbents | High |

## Business Objectives

1. Establish a defensible visual + interaction identity that signals "built for finance" without copying Brex / Ramp / Mercury
2. Validate the wedge (Series B, 100–500 employees) with a Finance Admin–first IA
3. Ship a design system that engineering can implement in one sprint per area
4. Produce a portfolio-grade artifact that doubles as the company's design source of truth

## Project Goals

- 30+ desktop screens covering submission, approval, cards, reimbursements, reports, settings, audit
- Mobile flow (≥ 6 screens) for the on-the-go employee
- Light + dark themes from day one, defined as tokens
- WCAG 2.1 AA across all surfaces
- Documentation pack that survives a hand-off to a 4-person eng team

## Success Criteria

| Criterion | Measure | Target |
|---|---|---|
| Brand differentiation | Stakeholder review | "Doesn't look like Brex/Ramp" |
| First-try task completion (research) | Maze, n=12 | ≥ 85% composite |
| Engineering feasibility | Architecture review | Approved by eng lead |
| Theme coverage | Token audit | 100% role-token usage |
| Accessibility | Automated + manual | Zero AA violations |
| Documentation completeness | Hand-off review | All 4 partner teams can self-serve |

## Constraints

- **Visual:** No gradients (except virtual-card mockup), no glassmorphism, no decorative iconography invented by the designer
- **Palette:** Distinct from incumbent fintech (no electric green, no Brex orange, no near-black Mercury)
- **Typography:** A single, cohesive grotesk; tabular figures everywhere money or quantity appears
- **Accessibility:** Status never communicated by color alone — icon + label always paired
- **Scope:** Desktop-first power-user surface; mobile is employee POV only

## Risks

| Risk | Severity | Mitigation |
|---|---|---|
| Visual direction perceived as "too editorial" for finance | Medium | Pair display typography with strict, dense layouts; validate with target persona |
| Power-user density alienates employees | Medium | Distinct role-aware experiences; mobile-first for employees |
| Audit / RBAC complexity slips into v1.1 | High | Define schema + middleware in the engineering handoff before design freezes |
| Card issuance vendor lock-in (Stripe Issuing) | Low | Wrap behind a processor adapter |

## Scope Definition

**In scope (v1):**
- Auth, onboarding, dashboards (3 roles), expenses, approvals, reimbursements, reports, cards, vendors, settings (7 tabs), audit log, notifications, help, 5 explicit states (loading / empty / error / success / confirmation)
- Light + dark themes
- Mobile employee flow

**Out of scope (deferred to v1.1+):**
- Multi-currency expenses with FX revalue
- Per-team policy editor UI
- Physical card design picker
- NetSuite integration (QuickBooks ships in v1)
- Marketing site

## My Responsibilities

I owned the project end-to-end:

- Discovery & research synthesis
- Information architecture
- Visual identity (brand, type, color, icon selection)
- Token-first design system (CSS + Figma plan)
- Component library (primitives, charts, data display)
- All screens (desktop + mobile)
- Documentation pack (this set + engineering handoff)
- Stakeholder reviews and iteration

## Deliverables

| Deliverable | Format | Status |
|---|---|---|
| Tokens | CSS variables (light + dark) | Shipped |
| Brand assets | SVG (mark, wordmark, lockups) + reusable component | Shipped |
| Component library | React/JSX kit | Shipped |
| Screens — desktop | 30+, interactive prototype | Shipped |
| Screens — mobile | 6 (employee flow) | Shipped |
| Design system preview cards | 13 (registered to DS catalog) | Shipped |
| Engineering handoff | Architecture + RBAC + schema + CI/CD plan | Shipped |
| Case study + portfolio pack | This documentation set | Shipped |
| Standalone bundle | Single offline HTML | Shipped |
