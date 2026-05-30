# 05 · Information Architecture

## Product Structure

FinFlow's IA is organized around three role-aware experiences sharing one workspace. The same brand, type system, and components serve all three; only the *defaults* (which screen lands first, which density profile applies) change.

```
FinFlow Workspace
├── Auth (shared)
├── Onboarding (Finance Admin only, first run)
└── App
    ├── Dashboard           (role-aware)
    ├── Expenses
    ├── Approvals           (Manager + Finance Admin)
    ├── Reimbursements
    ├── Reports
    ├── Cards
    ├── Vendors
    ├── Audit log           (Finance Admin + Auditor)
    ├── Notifications
    ├── Help
    └── Settings (7 tabs)
```

## Navigation Hierarchy

The sidebar is the primary navigation surface. It is organized into three groups for the Finance Admin, two for the Manager, and two for the Employee. Group labels (Workspace / Finance / Configure) follow the user's mental model of "things I do daily / things I look at weekly / things I set up once."

### Finance Admin sidebar (3 groups, 12 items)
**Workspace:** Dashboard · Expenses · Approvals · Reimbursements
**Finance:** Reports · Cards · Vendors · Audit log
**Configure:** Policies · Team & roles · Integrations · Settings

### Manager sidebar (2 groups, 7 items)
**Workspace:** Team overview · Approvals · Team expenses
**Insights:** Reports · Budgets
**Account:** Notifications · Settings

### Employee sidebar (2 groups, 7 items)
**My work:** My spend · New expense · My expenses · Reimbursements
**Account:** My cards · Notifications · Help

## Sitemap

| Area | Routes |
|---|---|
| Auth | /sign-in · /sso · /forgot · /reset/[token] |
| Onboarding | /connect-bank · /invite-team · /set-policy |
| Dashboard | / (role-routed) |
| Expenses | /expenses · /expenses/new · /expenses/import · /expenses/[id] · /expenses/[id]/ocr |
| Approvals | /approvals · /approvals/[id] · /approvals/history |
| Reimbursements | /reimbursements · /reimbursements/schedule · /reimbursements/[id] |
| Reports | /reports · /reports/new · /reports/[id] · /reports/[id]/export |
| Cards | /cards · /cards/new · /cards/[id] |
| Vendors | /vendors · /vendors/[id] |
| Audit | /audit |
| Notifications | /notifications |
| Help | /help |
| Settings | /settings/profile · /security · /team · /policies · /integrations · /billing · /notifications |

## Screen Relationships

Three navigation patterns hold the IA together:

1. **Top-level → detail** — list pages link to entity detail pages (Expenses → Expense detail, Cards → Card detail).
2. **Cross-entity links** — every expense card on the detail surfaces deep-links back to the vendor, the cardholder, and the approval chain.
3. **Persistent global UI** — the sidebar, topbar, and ⌘K screen directory are always reachable, including from full-bleed surfaces (auth, onboarding).

## User Flows (high-level)

### Employee · submit expense
Snap receipt → OCR review → confirm → submit → success → status timeline

### Manager · clear queue
Open approvals → triage with status chips → bulk approve in-policy items → drill into flagged item → approve with override note → empty queue

### Finance Admin · close month
Open dashboard → scan KPIs → check audit log → close pending reimbursements → open saved close-packet report → export → email

### Finance Admin · issue card
Open Cards → Issue → choose type → assign holder → set limits → confirm → audit row written

## Navigation Rationale

- **Sidebar over top-nav.** Power users keep up to 12 nav items in muscle memory; horizontal nav can't hold that many.
- **Group labels.** The "Workspace / Finance / Configure" split tells the user where to *live* (Workspace) vs. where to *visit* (Configure).
- **Audit log at top level.** This was the highest-impact IA decision in the round-2 test: completion on the "find the audit log" task went from 50% → 92% when it was promoted out of Settings.
- **Three sidebars, one workspace.** Switching role via the topbar segmented control re-renders the sidebar but keeps the user's spatial sense; the topbar, search, and ⌘K are unchanged.
- **⌘K screen directory.** A power-user escape hatch; muscle-memory keyboard surface for the Finance Admin.

## Content Hierarchy

Each page follows the same content order:

1. **Eyebrow** — context label (e.g. "Workspace · Finance Admin")
2. **Page title** — short, declarative ("Good morning, Maren.")
3. **Subtitle** — orienting metadata ("Spend across Arcadia Labs · Fiscal week 22")
4. **Actions** — top-right; secondary action(s) + a single primary action
5. **KPI strip** — 4 tiles, scannable in ≤ 6 seconds
6. **Primary content** — chart, table, or split layout
7. **Secondary content** — supporting tables, supplementary cards
