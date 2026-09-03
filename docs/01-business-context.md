# 01 · Business Context

## Executive Summary

FinFlow is an expense management workspace built for Series B SaaS companies (typically 100–500 employees) that have outgrown receipt-by-Slack but aren't ready for an enterprise ERP. It collapses four disconnected tools — corporate cards, approvals, reimbursements, and finance reporting — into a single role-aware product anchored on the Finance Admin's calendar.

This document captures the business reasoning behind the project and the constraints the design worked within.

## Business Background

The expense management market sits between two well-served extremes. At the small end, founder-led startups patch together cards (Brex, Mercury), receipts (email), and accounting (QuickBooks). At the upper end, enterprises use Concur or Coupa, configured by professional services teams. The 100–500-employee band is where things break: too many transactions for a spreadsheet, too few for an ERP rollout.

Companies in this band lose real finance-team hours every month to receipt chasing and monthly close, and frequently miss policy violations until quarterly review. They typically run a Finance Admin who owns close, board reporting, and policy enforcement largely alone.

## Industry Context

- Corporate-card spend has grown steadily as a share of company OpEx at Series B SaaS companies
- Manual reconciliation is a consistently cited time drain for finance teams at this stage
- SOC 2 is table-stakes; audit log, RBAC, and immutable records are expected from day one
- Multi-product workflows (cards → expenses → reports → close) are increasingly bundled by incumbents

## Product Vision

> **"The whole company's spend, in flow."**

A workspace that lets a Finance Admin see, decide, and close the month in the same surface — without leaving for QuickBooks, Slack, or Excel. Employees submit in under a minute on mobile. Managers approve in a couple of clicks. Auditors get an immutable trail.

## Stakeholders

| Stakeholder | Interest | Influence |
|---|---|---|
| Finance Admin (primary user) | Time saved on close + audit confidence | High |
| Manager / Approver | Speed of decisioning | High |
| Employee | Friction of submission | Medium |
| Auditor / External | Read-only audit trail | Low–Medium |

## Business Objectives

1. Establish a visual and interaction identity that doesn't read as a generic AI-generated SaaS dashboard
2. Design a Finance Admin–first information architecture for the 100–500-employee wedge
3. Ship a design system disciplined enough that a small engineering team could build from it directly
4. Produce a portfolio-grade artifact that shows the reasoning behind every major decision, not just the pixels

## Scope

**In scope:**
- A 6-step onboarding flow (workspace creation through launch), three role-aware dashboards, expenses, approvals, reimbursements, reports, cards, vendors, settings (7 tabs), audit log, notifications, help, 5 explicit states (loading / empty / error / success / confirmation) — 47 screens total
- Light and dark themes, defined as tokens
- An 8-screen employee mobile flow (sign in, home, snap receipt, new expense, submit success, status timeline, expenses, cards)

**Out of scope (deferred):**
- Multi-currency expenses with FX revalue
- Per-team policy editor UI
- Physical card design picker
- SAP integration (QuickBooks only in v1)
- Marketing site

## Constraints

- **Visual:** No gradients (except the virtual-card mockup), no glassmorphism, no decorative iconography
- **Palette:** One brand hue, used sparingly — not the electric green or near-black every incumbent defaults to
- **Typography:** A single, cohesive grotesk; tabular figures everywhere money or quantity appears
- **Accessibility:** Status never communicated by color alone — icon + label always paired
- **Scope:** Desktop-first power-user surface; mobile is employee POV only

## My Responsibilities

I owned the project end-to-end:

- Information architecture and navigation model
- Visual identity (brand, type, color)
- Token-first design system (CSS custom properties, both themes)
- Component library (primitives, tables, charts, data display)
- All 47 desktop screens + the 8-screen mobile flow
- A production-readiness audit and fix pass (accessibility, consistency, dead code) after the initial build
- This documentation set

## Deliverables

| Deliverable | Format | Status |
|---|---|---|
| Tokens | CSS custom properties (light + dark) | Shipped |
| Brand assets | SVG (mark, wordmark, lockups) + reusable component | Shipped |
| Component library | React/JSX kit, no external UI framework | Shipped |
| Screens — desktop | 47, interactive shipped product surfaces | Shipped |
| Screens — mobile | 8 (employee flow) | Shipped |
| Design system preview catalog | 13 reference pages | Shipped |
| Case study + portfolio pack | This documentation set | Shipped |
| Standalone bundle | Single offline HTML, no build step | Shipped |
