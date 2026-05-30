# 06 · Design Decisions

Each major area below documents the problem, the challenge, the options considered, the final call, and the rationale (both UX and business) for the design.

---

## Dashboard

### Problem
Finance Admins open the dashboard at 7:45 AM. They have ≤ 6 seconds to know: how much we're spending, what needs my decision, what's at risk, how much cash we have.

### Design Challenge
Power-user density without becoming "spreadsheet that learned CSS." The dashboard must serve the morning glance, the mid-morning queue review, *and* the monthly close prep — without three different layouts.

### Options Considered
1. **Card-grid of widgets** (configurable) — high flexibility, low default scannability
2. **KPI strip + two-column hero** — strong default; less flexible
3. **Tabbed dashboard** (Today / Pending / Reports) — clean but adds a click

### Final Decision
**Option 2 — KPI strip + two-column hero**, with the hero being "Spend over time" (left, 2fr) and "Budget vs spent" (right, 1fr). Below: "Pending approvals" (1.4fr) + "Spend by category" (1fr). Recent activity table at the bottom.

### UX Rationale
- 4 KPIs is the recall cap for a 6-second scan (validated in research)
- Spend-over-time is the question Maren is asked first in every standup
- Pending approvals as a separate card converts the dashboard from passive (FYI) to active (CTA)

### Business Rationale
- The dashboard is the screen demos open on — it has to land in one frame
- Saved reports (and the report builder) depend on the same KPI grammar; designing it once pays off across surfaces

### Expected Impact
Time-to-"what should I do today" dropped from 22s to 6s (think-aloud, n=4).

---

## Expenses

### Problem
A power-user table with > 5K rows on a long-running workspace. Filters must be obvious, IDs must be scannable, money must line up.

### Design Challenge
Balance the data density a Finance Admin needs against the calm an Employee sees on the same surface (filtered to their own items).

### Options Considered
1. **Kanban** (by status) — visual but slow for bulk actions
2. **Dense list with filter chips + table** — fast, scannable, harder for novices
3. **Hybrid** (chips → grouped sections) — added cognitive overhead

### Final Decision
**Option 2 — chips + dense table.** Sticky table header. Tabular figures right-aligned. Mono IDs for expense codes. Inline status badges with icon + label. Filter chips above the table.

### UX Rationale
- Filter chips are direct-manipulation; dropdowns hide options
- Tabular figures are the highest-leverage typographic decision in the table
- Sticky header survives long scrolls without re-orienting

### Business Rationale
- A list is the implementation pattern engineering expects; ship cost is 1 sprint, not 3
- The same table component powers Approvals queue and Reimbursements — one investment, three returns

### Expected Impact
Scan-time per row: 1.2s (target was < 2s). Bulk-select interaction adds a Manager-loved capability without changing Finance Admin defaults.

---

## Approvals

### Problem
Managers approve 5–20 items per week. Most are in-policy and need 2 clicks. A few need actual review.

### Design Challenge
The 80/20 split between trivial and non-trivial approvals demands a UI that *makes the trivial ones invisible* without hiding the important ones.

### Options Considered
1. **Kanban** (Pending / Approved / Rejected) — pretty, slow under load
2. **Dense list + bulk-action bar** — power-user surface
3. **Card grid** — visually rich, doesn't scale

### Final Decision
**Option 2 — dense list with persistent bulk-action bar.** When at least one row is selected, an action bar appears above the table with running total, Reject, and Approve. A "Bulk approve" accent button (citron) in the page header offers a one-click "approve all in-policy under $X" macro.

### UX Rationale
- Manager testing showed the *most-loved* feature was the bulk action — saves 3+ minutes per session
- Inline policy result (chip per row) tells the manager which to bulk-approve without opening anything
- Override note is a first-class field, not a comment — makes audit trail richer

### Business Rationale
- The "manager loves the product" path is the one that drives org-wide adoption
- Reduces churn risk: managers blocked on slow approvals are a top-three reported complaint in the segment

### Expected Impact
Clicks per decision: 7 → 2 average. Median queue time: 30 min → 4 min for 8 items.

---

## Reports

### Problem
The monthly close packet is rebuilt every month by hand in Excel. Saved reports are table-stakes; a builder is a nice-to-have; export to QuickBooks is required.

### Design Challenge
Designers default to "build a Tableau-style builder." Finance Admins overwhelmingly want **saved templates** that survive month-over-month, with the builder as escape valve.

### Options Considered
1. **Builder-first** with templates as a secondary library
2. **Templates-first** with the builder behind a "Build report" CTA
3. **Templates + an inline editor on the saved report itself**

### Final Decision
**Option 2.** Reports home leads with KPI tiles + a saved-reports table; the builder is a dedicated route (`/reports/new`) reachable from the primary action button.

### UX Rationale
- Defaults match how Maren *actually* uses reports (always the same close packet)
- The builder gets out of the way of the daily / weekly user
- Charts on the home page double as the "feel" of the product's analytics

### Business Rationale
- Reduces "the builder is too complex" feedback in the segment
- The close-packet template is a sales asset — easy to demo

### Expected Impact
Time-to-close packet: 4+ hrs → 22 min (Maren's projected). Builder usage projected at 1 in 8 sessions; templates 7 in 8.

---

## Settings

### Problem
Settings are where bad products hide important things. Audit log, billing, integrations, and security each have their own discovery problem.

### Design Challenge
Make 7 sub-areas (Profile · Security · Team · Policies · Integrations · Billing · Notifications) coherent under a single shell — without the "Settings is a graveyard" pattern.

### Options Considered
1. **Sub-pages with breadcrumbs** — many clicks, bad muscle memory
2. **Left tabs + single column content** — pattern from Stripe, GitHub, Linear
3. **Modal stack** — okay for forms, bad for browse

### Final Decision
**Option 2.** Left-tabs settings shell, each tab a single column of cards.

### UX Rationale
- Left tabs are the universal "I'm in settings now" pattern
- Each tab page can grow without breaking the shell
- ⌘K can deep-link to any tab

### Business Rationale
- Cuts settings dev time per area to ~1 day each
- Future settings (e.g. per-team policies) slot in without IA disruption

### Expected Impact
"Find a setting" task completion: target 90%+ (vs. 50% on the buried-audit-log baseline).

---

## Mobile Experience

### Problem
Employees do receipts on the go. They need confidence the submission worked, status visibility, and zero feature bloat.

### Design Challenge
Brand consistency without forcing the dense desktop surface onto a 360px wide screen. The mobile product is for *one persona* (Employee).

### Options Considered
1. **Mobile-responsive of the desktop product** — slow, ugly, generic
2. **Native-feeling mobile app for the employee** with status, submission, cards — focused
3. **Mobile parity with desktop** — wasteful

### Final Decision
**Option 2 — mobile is a separate, employee-focused experience.** Six screens: Sign in · Home (my spend) · Snap receipt · New expense · Submit success · Status timeline.

### UX Rationale
- Employees don't approve, manage cards, or build reports — those don't belong on mobile
- Status visibility, not feature parity, is the employee's confidence anchor
- Camera-first capture mirrors how the receipt actually shows up in their hand

### Business Rationale
- 6 mobile screens is half the dev cost of full parity
- Marketing + onboarding stories rest on the "30-second mobile submission" demo

### Expected Impact
Submission task (mobile): 100% completion in round-2 test. Median time: 28 seconds.
