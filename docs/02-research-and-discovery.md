# 02 · Research & Discovery

## Discovery Process

Discovery ran across three weeks and produced the persona definitions, problem statements, and competitive baseline used to scope v1. The process was:

1. **Stakeholder interviews** with leadership and the engineering lead to surface business and feasibility constraints
2. **Customer-style interviews** with three target-persona contacts (Finance Admins at Series B SaaS) to validate pain points
3. **Workflow shadowing** — two 90-minute sessions watching real receipt-chase and monthly-close work
4. **Competitive audit** across Brex, Ramp, Mercury, Airbase, Pleo, and Navan
5. **Synthesis workshop** to consolidate findings into the opportunity-area map

## Stakeholder Interviews

| Stakeholder | Key takeaway |
|---|---|
| CEO | "Don't ship a generic SaaS look. We need to look like finance, not like everyone else." |
| Eng Lead | "RBAC, audit, and the policy engine have to be designed up-front, not bolted on." |
| Head of GTM | "Sales needs a 7-minute demo path that ends at a close packet." |
| Customer Success (existing customer) | "When something breaks, the Finance Admin wants the audit log inside the product, not as a CSV export." |

## Research Objectives

1. Identify the highest-leverage tasks the Finance Admin performs each week
2. Quantify time-loss in the current four-tool workflow
3. Determine which competitor patterns are well-loved vs. well-tolerated
4. Surface accessibility, density, and trust signals that build Finance-Admin confidence

## User Research Approach

| Method | n | Purpose |
|---|---|---|
| Persona interviews | 3 | Pains, goals, daily workflow |
| Workflow shadowing | 2 | Behavioral observation |
| Competitive teardown | 6 products | Pattern library + gap analysis |
| Maze prototype test (round 1, mid-fi) | 12 | Task completion baseline |
| Maze prototype test (round 2, hi-fi) | 12 | Iteration impact |

## Assumptions

| Assumption | Verified? |
|---|---|
| Finance Admins are the primary daily user | Yes — confirmed in interviews |
| Managers approve mostly on mobile | Partially — desktop more common in interviews than expected |
| Receipt OCR is table-stakes | Yes |
| Companies want one bank/card integration first, not many | Yes (Mercury or Brex named in 5/6 cases) |
| Dark mode matters | Yes — 4/6 interviewees explicitly mentioned it |

## User Pain Points

### Finance Admin

- "I close the month by chasing people in Slack." (×4 mentions across interviews)
- Monthly close packet rebuilt from scratch every month
- No single place to see policy violations as they happen
- Auditor sampling = manual receipt export, CSV by hand
- Cards live in a separate vendor portal

### Manager

- 5–20 approvals per week, batched and ignored until end of week
- "I don't know which ones I can approve without thinking and which need a second look"
- Slack approvals lose context (no receipt thumbnail, no policy result)

### Employee

- "I forget which form goes where"
- Receipt photos sit in Photos for weeks before being submitted
- Reimbursement timing is opaque ("Did it actually get paid?")

## Existing Workflow Problems

1. **Tool fragmentation** — 4 systems, none aware of each other
2. **Policy is a PDF** — discovered violations after the fact, not before swipe
3. **Approval context loss** — Slack DMs lack receipts, amounts, history
4. **Close packet drift** — every month rebuilt from scratch
5. **Audit prep** — 1–2 weeks of manual receipt sampling per quarter

## Behavioral Observations (workflow shadowing)

- Finance Admin opens the same 3 tabs every morning before standup
- Receipt review takes 7–12 seconds per item when the receipt is attached, 60+ seconds when it isn't
- Managers use the "amount" column as the primary scan key before any other field
- Employees re-photograph receipts ≈ 18% of the time due to poor lighting / glare
- All three personas explicitly verbalize wanting to "see the trend" before making decisions

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
| Finance Admins read the dashboard between 7:45–8:00 AM daily | Hero numerals must be scannable in < 6 seconds |
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

The synthesis workshop produced four design principles that drove every subsequent decision:

1. **Quiet density** — Finance Admins want dense; everyone else wants quiet. Design for both.
2. **Trust through type** — money deserves type that respects it; tabular figures everywhere.
3. **Status never lies** — every state surfaced explicitly, never inferred from color alone.
4. **One workspace, three voices** — same brand, different defaults per role.
