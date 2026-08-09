# 06 · Design Decisions

Each major area below documents the problem, the options considered, the final call, and the rationale for the design.

---

## Dashboard

### Problem
Finance Admins open the dashboard first thing in the morning. They need to know fast: how much we're spending, what needs a decision, what's at risk, how much cash we have — without four numbers of equal visual weight forcing a side-by-side comparison before any of them register.

### Design Challenge
Power-user density without becoming "spreadsheet that learned CSS." The dashboard has to serve the morning glance, the mid-morning queue review, and monthly-close prep — without three different layouts, and without shipping the four-equal-KPI-card template every competitor uses.

### Options Considered
1. **Card-grid of widgets** (configurable) — high flexibility, low default scannability
2. **Four equal KPI cards + chart** — the industry default; reads as generated, not designed
3. **One hero number + compact inline stats** — asymmetric, states a clear priority

### Final Decision
**Option 3.** One oversized hero KPI (spend MTD, with a sparkline) beside a compact three-item stat row. Below: an asymmetric chart split — trend line wider than the budget-bars-and-category-legend column — then two borderless tables (pending approvals, recent activity), not cards.

### Rationale
- A dominant number answers "what matters right now" before the eye has to compare anything
- Each of the three role dashboards (Finance Admin, Manager, Employee) gets a structurally different dominant element — hero-number-led, queue-led, and card-led respectively — so switching roles doesn't feel like a re-skinned copy of the same layout

---

## Expenses

### Problem
A power-user table that needs to stay scannable at real transaction volume. Filters must be obvious, IDs must be scannable, money must line up.

### Design Challenge
Balance the data density a Finance Admin needs against the calm an Employee sees on the same surface (filtered to their own items).

### Options Considered
1. **Kanban** (by status) — visual but slow for bulk actions
2. **Dense list with filter chips + borderless table** — fast, scannable
3. **Hybrid** (chips → grouped sections) — added cognitive overhead without a clear payoff

### Final Decision
**Option 2.** Status chips, search, category filter, and a column-visibility toggle above a borderless table — no card wrapper around the primary data. Tabular figures right-aligned. Mono IDs. Category shown as a colored-dot tag driven by the same token the category charts use, not a separate color per screen. Inline status badges with icon + label.

### Rationale
- Filter chips are direct manipulation; dropdowns hide the current state
- The same borderless-table pattern powers Expenses, Approvals, Reimbursements, and Vendors — one visual language, not four different table styles
- A category tag that's the same color in a table row as it is in a chart removes a whole class of "wait, is that the same category?" hesitation

---

## Approvals

### Problem
Managers approve a mix of trivial in-policy items and a few that need real review. The UI needs to make the trivial ones fast without hiding the ones that matter.

### Design Challenge
The split between "approve without thinking" and "actually read this" demands a UI where the policy result is visible before opening anything.

### Options Considered
1. **Kanban** (Pending / Approved / Rejected) — pretty, slow under load
2. **Dense list, bulk bar only after selecting a row** — still requires a discovery step
3. **Dense list, selection state always visible** — the total and count are never hidden

### Final Decision
**Option 3.** A persistent selection bar above the queue — running count and total shown regardless of whether anything is checked — plus a policy-violation chip inline on every row, so triage never requires opening an item to know which ones are safe to bulk-approve.

### Rationale
- Inline policy result removes the "open it to find out" step entirely
- Override note is a first-class field, not a comment — makes the audit trail richer without extra clicks
- The persistent bar (vs. one that only appears after selection) means the affordance is never something a user has to discover

---

## Reports

### Problem
The monthly close packet is effectively rebuilt from scratch every cycle. Saved reports are table-stakes; a from-scratch builder is a secondary tool, not the primary one.

### Design Challenge
The obvious move is "build a Tableau-style report builder." Finance Admins overwhelmingly want **saved templates** that survive month-over-month, with a builder as the escape valve for the rare custom pull.

### Options Considered
1. **Builder-first** with templates as a secondary library
2. **Templates-first** with the builder behind a dedicated "Build report" action
3. **Templates + an inline editor on the saved report itself**

### Final Decision
**Option 2.** Reports home leads with a hero KPI, inline stats, and a saved-reports table; the builder is a separate screen reached from the primary action button.

### Rationale
- Matches how a Finance Admin actually uses reports — the same close packet, run again, not a new pivot every time
- The builder stays out of the way of the daily/weekly user while still being one click away
- The dashboard's chart language carries into Reports, so the two surfaces feel like one system

---

## Settings

### Problem
Settings is where products bury important things. Audit log, billing, integrations, and security each have their own discoverability problem if handled carelessly.

### Design Challenge
Make 7 sub-areas (Profile, Security, Team, Policies, Integrations, Billing, Notifications) coherent under a single shell without becoming a graveyard.

### Options Considered
1. **Sub-pages with breadcrumbs** — many clicks, poor muscle memory
2. **Left tabs + single-column content** — the Stripe/GitHub/Linear pattern
3. **Modal stack** — fine for forms, bad for browsing

### Final Decision
**Option 2.** A left-tab shell inside the Settings screen itself — the one place in the product that still uses a tab rail, because it's a self-contained sub-application, not the primary navigation. Reached from any role via ⌘K, not permanent top-nav chrome.

### Rationale
- Left tabs are the universal "I'm in settings now" pattern
- Each tab can grow independently without breaking the shell
- Keeping Settings out of the top nav (reachable only via ⌘K) is consistent with the rest of the low-frequency-destination treatment

---

## Mobile Experience

### Problem
Employees do receipts on the go. They need confidence the submission worked, status visibility, and zero feature bloat.

### Design Challenge
Brand consistency without forcing the dense desktop surface onto a narrow screen. The mobile product serves *one persona* — the Employee.

### Options Considered
1. **Mobile-responsive reflow of the desktop product** — slow, generic
2. **A focused, native-feeling mobile experience** for submission, status, and cards
3. **Full desktop parity on mobile** — wasteful, most desktop screens don't apply

### Final Decision
**Option 2 — 8 screens:** sign in, home (my spend), snap receipt, new expense, submit success, status timeline, expenses, cards.

### Rationale
- Employees don't approve, manage cards for others, or build reports — those don't belong on mobile
- Status visibility, not feature parity, is the employee's confidence anchor
- Camera-first capture mirrors how the receipt actually shows up in their hand
