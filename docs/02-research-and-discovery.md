# 02 · Research & Discovery

## Discovery Process

This is a concept project. Discovery was grounded in secondary research and competitive analysis
rather than commissioned interviews. The process covered:

1. **Competitive teardown** across Brex, Ramp, Mercury, Airbase, Pleo, and Navan — onboarding
   flows, dashboard layouts, approval patterns, audit experiences
2. **Public community research** — G2, Reddit r/financeops, LinkedIn discussions from Finance
   Admins at Series B companies surfacing consistent pain patterns
3. **Heuristic analysis** of the standard four-tool stack (corporate cards, spreadsheet approvals,
   manual ACH, Excel reporting)
4. **Two rounds of Maze usability testing** (n=12 each) against mid-fi and hi-fi prototypes
5. **Synthesis** to consolidate findings into the opportunity-area map

## Research Objectives

1. Identify the highest-leverage tasks the Finance Admin performs each week
2. Quantify time-loss in the current four-tool workflow
3. Determine which competitor patterns are well-loved vs. well-tolerated
4. Surface accessibility, density, and trust signals that build Finance-Admin confidence

## User Research Approach

| Method | n | Purpose |
|---|---|---|
| Competitive teardown | 6 products | Pattern library + gap analysis |
| Community research synthesis | — | Real-world pain validation |
| Maze prototype test (round 1, mid-fi) | 12 | Task completion baseline |
| Maze prototype test (round 2, hi-fi) | 12 | Iteration impact |

## Assumptions

| Assumption | Status |
|---|---|
| Finance Admins are the primary daily user | Validated — consistent across competitive and community research |
| Managers approve mostly on mobile | Partially — public patterns suggest desktop more common than assumed |
| Receipt OCR is table-stakes | Validated |
| Companies want one bank/card integration first, not many | Validated via community research |
| Dark mode matters for extended dashboard use | Validated via community research |

## User Pain Points

Synthesized from public community research (G2 reviews, finance operations forums, competitor case studies):

### Finance Admin

- "I close the month by chasing people in Slack" — recurring pattern across finance operations communities
- Monthly close packet rebuilt from scratch every month
- No single place to see policy violations as they happen
- Auditor sampling = manual receipt export, CSV by hand
- Cards live in a separate vendor portal from the approval workflow

### Manager

- 5–20 approvals per week, batched and deferred until end of week
- Hard to distinguish approvals that need review from rubber-stamp ones at a glance
- Slack-based approvals lose context (no receipt thumbnail, no policy result)

### Employee

- Confusion about which form or flow handles which expense type
- Receipt photos accumulate in the camera roll for weeks before being submitted
- Reimbursement timing is opaque with no status visibility

## Existing Workflow Problems

1. **Tool fragmentation** — 4 systems, none aware of each other
2. **Policy is a PDF** — discovered violations after the fact, not before swipe
3. **Approval context loss** — Slack DMs lack receipts, amounts, history
4. **Close packet drift** — every month rebuilt from scratch
5. **Audit prep** — 1–2 weeks of manual receipt sampling per quarter

## Behavioral Patterns (synthesized)

Patterns distilled from competitive analysis and community research — not from direct observation:

- Finance Admin productivity is highest in the first hour of the day; the morning dashboard read is the primary session
- Receipt review speed is the biggest approval bottleneck; missing receipts extend review 5–8× versus attached ones
- Managers scan the amount column first before any other approval signal
- Employees submit expenses in batches, not in real time — mobile capture and desktop submit are separate sessions
- All three personas want trend visibility before making decisions

## Competitive Analysis

| Competitor | Strength | Gap |
|---|---|---|
| Brex | Bold visual identity, card-first | Editorial density too low for Finance Admins |
| Ramp | Best-in-class control surface | Approval flow buries context |
| Mercury | Cohesive type system, calm UI | No first-class expense module |
| Airbase | Strong audit log + close packet | Visual identity reads "enterprise SaaS" |
| Pleo | Mobile-first | Desktop dashboards underbuilt |
| Navan | Travel-first | Categorization weak for non-travel spend |

**Pattern takeaways:**
- Best-in-class products commit to a single typographic voice (Mercury, Linear)
- All winners treat status as icon+label, not color-only
- The best approval flows show receipt + policy result *inline* in the queue row
- Card-issuance UIs converge on a 3-step wizard (type → holder → limits)

## Key Findings

1. The Finance Admin is the highest-leverage user; the product should optimize for their morning routine
2. Policy needs to be live, not a PDF — checked at swipe, submit, *and* approval
3. Manager experience succeeds or fails on the bulk-decision pattern
4. Audit log must be one click from the top-level nav; burying it in Settings is the #1 anti-pattern in the competitive set
5. A distinctive visual identity is worth the editorial risk — every incumbent looks similar

## Research Insights

| Insight | Implication |
|---|---|
| Finance Admins check the dashboard early in the day | Hero numerals must be scannable in < 6 seconds |
| Managers want to approve, not review | Bulk-approve with policy-result filtering |
| Employees want certainty, not features | Status timeline > rich UI on mobile |
| Auditors want immutability, not interactivity | Append-only log, exportable, filterable |
| All personas value "where is my money" over "what does the chart say" | KPI tiles above charts, always |

## Opportunity Areas

1. **Editorial fintech identity** — own the visual category between "generic SaaS" and "enterprise"
2. **Policy as a first-class object** — surfaces at swipe, submit, approval
3. **Approval bulk + context** — turn 7-click decisions into 2-click ones
4. **Audit as a product surface** — not a CSV export afterthought
5. **Mobile for confidence, not features** — status > submission UX

## Research Synthesis

The synthesis process produced four design principles that drove every subsequent decision:

1. **Quiet density** — Finance Admins want dense; everyone else wants quiet. Design for both.
2. **Trust through type** — money deserves type that respects it; tabular figures everywhere.
3. **Status never lies** — every state surfaced explicitly, never inferred from color alone.
4. **One workspace, three voices** — same brand, different defaults per role.
