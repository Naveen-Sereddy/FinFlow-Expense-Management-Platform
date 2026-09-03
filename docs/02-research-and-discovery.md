# 02 · Research & Discovery

FinFlow was shipped privately for an anonymized Series B SaaS client. Discovery combined 12 structured interviews across the three core roles with competitive analysis and teardown work; the client and participant details are anonymized here under NDA.

## Discovery Process

1. **Structured interviews** with 12 client stakeholders across Employee, Department Manager, and Finance Admin workflows over four weeks
2. **Competitive teardown** across Brex, Ramp, Mercury, Airbase, Pleo, and Navan — onboarding flows, dashboard layouts, approval patterns, and audit experiences
3. **Public community research** — G2, Reddit r/financeops, and LinkedIn discussions from Finance Admins at Series B companies surfacing recurring pain patterns
4. **Heuristic analysis** of the standard four-tool stack (corporate cards, spreadsheet approvals, manual ACH, Excel reporting)
5. **Persona synthesis** to consolidate the interview findings into the three role models and their daily pressure points

## Research Objectives

1. Identify the highest-leverage tasks the Finance Admin performs each week
2. Determine which competitor patterns are well-loved vs. well-tolerated
3. Surface the specific anti-pattern to avoid — the four-equal-KPI-card-plus-chart dashboard every competitor ships
4. Map accessibility, density, and trust signals that build Finance-Admin confidence

## User Pain Points (from interviews, public research, and competitive analysis)

### Finance Admin
- Monthly close packet effectively rebuilt from scratch every cycle
- No single place to see policy violations as they happen
- Card issuance living in a separate vendor portal from everything else

### Manager
- Approvals batched and ignored until end of week
- No way to tell which items need real review without opening each one
- Slack-based approvals lose receipt and policy context

### Employee
- Receipt photos sit in the camera roll for weeks before being submitted
- Reimbursement timing is opaque

## Competitive Analysis

| Competitor | Strength | Gap |
|---|---|---|
| Brex | Bold visual identity, card-first | Density too low for Finance Admin power users |
| Ramp | Best-in-class control surface | Approval flow buries context |
| Mercury | Cohesive type system, calm UI | No first-class expense module |
| Airbase | Strong audit log + close packet | Visual identity reads "enterprise SaaS" |
| Pleo | Mobile-first | Desktop dashboards underbuilt |
| Navan | Travel-first | Categorization weak for non-travel spend |

**Pattern takeaways:**
- Every one of them ships the same skeleton — sidebar, four equal KPI cards, a chart, a table
- All treat status as icon + label, not color alone
- The best approval flows show receipt and policy result inline in the queue row, not behind a click

## Key Findings

1. The Finance Admin is the highest-leverage user; the product should optimize for their morning routine
2. A dashboard built from four equal cards forces comparison before it delivers an answer — one dominant number reads faster
3. A 12-item sidebar solves discoverability by never hiding anything, at the cost of giving daily and quarterly destinations equal permanent weight
4. Manager experience succeeds or fails on the bulk-decision pattern
5. A distinctive visual identity is worth the editorial risk — every incumbent looks similar

## Research Synthesis

Four principles drove every subsequent decision:

1. **Quiet density** — Finance Admins want dense; everyone else wants quiet. Design for both, at the role level.
2. **Trust through type** — money deserves type that respects it; tabular figures everywhere quantity matters.
3. **Status never lies** — every state surfaced explicitly, never inferred from color alone.
4. **One workspace, three voices** — same brand and components, different defaults per role.
