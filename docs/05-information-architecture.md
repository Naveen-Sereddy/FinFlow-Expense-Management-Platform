# 05 · Information Architecture

## Product Structure

FinFlow's IA is organized around three role-aware experiences sharing one workspace. The same brand, type system, and components serve all three; only the *defaults* change — which screen lands first, which destinations appear in the top nav, which element dominates the dashboard.

```
FinFlow Workspace
├── Onboarding (workspace creation, first run — includes sign-up, no separate auth surfaces)
└── App
    ├── Dashboard           (role-aware composition)
    ├── Expenses
    ├── Approvals           (Manager + Finance Admin)
    ├── Reimbursements
    ├── Reports
    ├── Cards
    ├── Vendors
    ├── Audit log           (behind ⌘K for every role)
    ├── Notifications
    ├── Help
    └── Settings (7 tabs, behind ⌘K)
```

## Navigation Model

There is no sidebar. A single 60px top nav row carries the logo, the role's top-level destinations, the role switch, search, theme toggle, notifications, and avatar. Each role's top nav is capped at its 5–7 highest-frequency destinations — everything else is one ⌘K search away, with real arrow-key navigation and Enter-to-select, not just a click target.

### Finance Admin — top nav (7 items)
Dashboard · Expenses · Approvals · Reimbursements · Reports · Cards · Vendors

### Manager — top nav (5 items)
Team overview · Approvals · Team expenses · Reports · Budgets

### Employee — top nav (5 items)
My spend · New expense · My expenses · My cards · Reimbursements

### Behind ⌘K, same set for every role
Settings (7 tabs) · Policies · Team & roles · Integrations · Audit log · Notifications · Help

## Sitemap

| Area | Routes |
|---|---|
| Onboarding | /workspace · /company · /connect · /invite · /policy · /success |
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

1. **Top-level → detail** — list pages link to entity detail pages (Expenses → Expense detail, Cards → Card detail)
2. **Cross-entity links** — every expense detail deep-links back to the vendor, the cardholder, and the approval chain
3. **Persistent global UI** — the top nav, search, and ⌘K screen directory are always reachable, except on the full-bleed onboarding flow, which uses its own persistent step sidebar instead

## User Flows (high-level)

### Employee · submit expense
Snap receipt → OCR review → confirm → submit → success → status timeline

### Manager · clear queue
Open approvals → triage with status chips → bulk approve in-policy items → drill into flagged item → approve with override note → empty queue

### Finance Admin · close month
Open dashboard → scan hero KPI + stats → ⌘K to audit log → close pending reimbursements → open saved close-packet report → export → email

### Finance Admin · issue card
Open Cards → Issue → choose type → assign holder → set limits → confirm → audit row written

## Navigation Rationale

- **No sidebar.** A 12-item sidebar solves discoverability by never hiding anything — which means it gives a once-a-quarter destination the same permanent visual weight as a daily one. That's the actual problem, not which specific item is buried.
- **Frequency-based top nav.** Each role's nav is capped at what real sessions actually touch — 5 to 7 destinations. Everything else routes through search instead of competing for chrome space.
- **Same behind-search set for every role.** Settings, Policies, Integrations, Audit Log, and Help get identical treatment regardless of role — low-frequency isn't hidden, it's reachable by search instead of permanent nav.
- **One workspace, three top navs.** Switching role via the segmented control swaps the nav row and the dashboard's dominant composition; search and ⌘K don't change.
- **⌘K screen directory.** A real command palette — typed query, arrow-key roving focus, Enter to select — not a decorative search box.

## Content Hierarchy

Each page follows the same content order:

1. **Eyebrow** — context label (e.g. "Workspace · Finance Admin")
2. **Page title** — short, declarative ("Good morning, Marcus.")
3. **Subtitle** — orienting metadata ("Spend across Reyonal · Fiscal week 22")
4. **Actions** — top-right; secondary action(s) + a single primary action
5. **Hero + stats** — one dominant number, then a compact inline stat row — not a grid of equal cards
6. **Primary content** — chart, table, or asymmetric split layout
7. **Secondary content** — supporting borderless tables, supplementary cards
