# 03 · Personas

Three primary personas drove the design. A fourth (Auditor) is supported but never primary.

---

## Persona 1 · Iris Chen — Employee Expense Submitter

### Background
Iris is a Senior Product Marketing Manager at Arcadia Labs. She joined 18 months ago from a smaller startup. She runs marketing programs, attends industry events, and frequently expenses team coffees and small software subscriptions.

### Demographics
- 31 years old, based in San Francisco
- Senior PMM, individual contributor
- Submits ~5 expenses per month, total ~$2,000

### Responsibilities
- Submit expenses promptly so reimbursements aren't delayed
- Tag the right project / campaign / cost center
- Provide receipts on the same day where possible
- Track reimbursement status

### Goals
- Submit a receipt in under a minute
- See exactly when reimbursement will arrive
- Avoid the back-and-forth of missing receipts or wrong categories

### Motivations
- She isn't trying to maximize a perk — she wants the friction gone
- Predictability matters more than features

### Pain Points
- Old tool required her to remember a project code from memory
- Reimbursement timing was opaque — "did it actually get paid?"
- Photo-only OCR often misread amounts; she had to re-edit them

### Daily Workflow
- Snaps a receipt the moment a transaction completes
- Submits batches of 2–3 in the evening
- Checks status mid-morning the next day if anything is over $200
- Almost never uses the desktop product

### Success Criteria
- 30-second submission from the phone
- Status timeline visible at any moment
- One push notification when approved + when paid

### Technology Comfort Level
**High.** Native iOS user, comfortable with biometric auth, expects modern app conventions.

---

## Persona 2 · Theo Vasquez — Department Manager

### Background
Theo runs a 12-person Sales team at Arcadia Labs. Reports to the CRO. Approves an average of 8–14 expense items per week from his team. Spends 70% of his time in Slack, 20% in the CRM, 10% everywhere else.

### Demographics
- 39 years old, Austin, TX
- Head of Sales
- Manages 8 direct reports

### Responsibilities
- Approve / reject team expenses
- Stay within team budget
- Flag policy violations to Finance early
- Coach reps on what's reimbursable

### Goals
- Approve in under 2 clicks per item when in-policy
- Know which items need a second look before he opens them
- Never block a rep on reimbursement

### Motivations
- Speed. He approves at the airport, between meetings, on his phone
- Trust. He wants the system to tell him when something is wrong

### Pain Points
- Old tool buried the receipt behind a click — he had to open every item
- Approving in Slack lost the policy context
- No bulk-approve for clearly-in-policy items
- Couldn't see his team's monthly budget vs. spend at a glance

### Daily Workflow
- Monday 9:00 AM — opens the approvals queue and burns through the weekend's items
- Thursday afternoon — bulk-approves all in-policy items under $100
- Friday — reviews any flagged items with a coffee

### Success Criteria
- Empty queue by end of Monday
- Zero "where is my reimbursement" pings from reports
- Clear policy-result visible inline

### Technology Comfort Level
**Medium-High.** Pragmatic. Doesn't read tooltips. Will give up after 3 clicks if he can't find something.

---

## Persona 3 · Maren Okafor — Finance Administrator (Primary)

### Background
Maren is the Director of Finance at Arcadia Labs, a 248-person Series B SaaS company. She joined three years ago when the company was 80 people. She owns the monthly close, board financials, policy enforcement, card issuance, and the audit relationship. She has one direct report (a junior FP&A analyst) and reports to the CFO.

### Demographics
- 36 years old, San Francisco
- Director of Finance
- Two-person finance team

### Responsibilities
- Close the books each month (typically 4 days after month-end)
- Prepare board materials quarterly
- Enforce expense policy across 248 employees
- Issue and manage corporate cards
- Own the SOC 2 audit relationship
- Approve reimbursement payouts

### Goals
- Close the month in 22 minutes instead of 4+ hours
- Catch policy violations *before* close, not during audit
- Maintain a clean, exportable audit trail
- Get her weekends back during board prep weeks

### Motivations
- Trust signals matter — she's responsible for the number on the board deck
- Density over decoration — she lives in this product 4 hours a day
- Keyboard everywhere — ⌘K, no mouse

### Pain Points
- Previous setup required 4 tools and a spreadsheet to close the month
- Receipt chasing took 6+ hours per cycle
- Policy violations surfaced in audit, not at the time of charge
- Card issuance happened in a separate vendor portal
- Audit prep meant a 2-week receipt-sampling exercise per quarter

### Daily Workflow
- 7:45 AM — opens the dashboard between coffee and standup; scans 4 KPIs in 6 seconds
- 9:00 AM standup — reports any flagged items or close blockers
- 10:00 AM–12:00 PM — approval queue, reimbursement scheduling, card issuance
- 2:00 PM — saved reports, vendor management, integrations
- Quarterly — audit log export, sampling, sign-off

### Success Criteria
- Monthly close packet emailed by 10 AM on close day
- Zero policy violations slipping into audit
- All 4 KPIs scannable above the fold every morning
- Reimbursement cycle paid same-week, every week

### Technology Comfort Level
**Very high.** Power user. Lives in keyboard shortcuts. Will discover ⌘K within 30 seconds. Has strong opinions about dense, scannable UI.

---

## Secondary Persona · Asa Brown — Auditor (read-only)

External auditor at a regional accounting firm. Receives a read-only login for two weeks per quarter during SOC 2 sampling.

- Needs: immutable audit log, receipt download, filtering by date/amount/approver
- Doesn't need: any mutating capability, any visual polish, any non-essential data
- Success: completes the sample in 2 hours instead of 2 weeks
- Comfort: medium — accountant, not a power user
