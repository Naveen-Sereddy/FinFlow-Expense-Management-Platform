# 04 · User Journeys

Three journey maps drove screen priority and composition. Each covers actions, thoughts, emotions, frictions, and the opportunities they pointed to in the design.

---

## Journey 1 · Expense Submission (Corey, Employee)

**Context:** Corey just bought $42.80 of team coffee at Starbucks on a Tuesday afternoon. They want to submit and forget it.

| Stage | Actions | Thoughts | Emotions | Frustrations (prior tool) | Opportunities (designed for) |
|---|---|---|---|---|---|
| **Trigger** | Pays at register, opens phone | "Don't lose this receipt." | Neutral | Receipt photo + email reminder → forgets for 2 weeks | One-tap snap from home screen |
| **Capture** | Opens FinFlow → tab "Snap receipt" | "Just point and shoot." | Mild stress (will OCR work?) | Manual entry of merchant, amount, date | OCR auto-fills; confidence visible |
| **Review** | Confirms category, memo, payment | "Did it get the amount right?" | Reassured | Had to type all fields | Pre-filled with confidence chip |
| **Submit** | Taps Submit | "How long until Xavier approves?" | Confident | No status visibility | Submission success screen names approver + ETA |
| **Wait** | Goes about their day | "I'll forget about this until reimbursement hits." | Neutral | Status hidden | Push notif on approval + payout |
| **Resolve** | Sees "Approved" notification | "That was painless." | Satisfied | Often had to re-submit | Single source of truth |

**Designed-for opportunities:**
- Sub-minute submission is the target, not a measured result
- Status timeline screen that explicitly names *who* is next, not just "pending"
- Push notifications at every state change

---

## Journey 2 · Approval Workflow (Xavier, Manager)

**Context:** Monday 9 AM. Xavier has 8 items in his approval queue from the weekend.

| Stage | Actions | Thoughts | Emotions | Frustrations (prior tool) | Opportunities (designed for) |
|---|---|---|---|---|---|
| **Open queue** | Clicks Approvals (8) in the top nav | "How many of these are easy?" | Mild dread | Items mixed; no policy result inline | Policy status visible per row |
| **Triage** | Scans amounts + status badges | "Bulk the in-policy ones." | Focused | Had to open each item | Selection bar always visible, running total |
| **Bulk approve** | Selects 5 in-policy → Approve | "Done fast." | Energized | No bulk action available | One-click bulk approve |
| **Drill in** | Opens flagged Marriott item | "Why is this flagged?" | Curious | Reason buried in details | Inline policy result + override note |
| **Decide** | Approves with override note | "Note explains the why." | Confident | No audit trail of override reason | Override note saved to audit log |
| **Close out** | Queue is empty | "Could not be easier." | Satisfied | Used to take 30+ minutes | Minutes, not tabs of Slack scrollback |

**Designed-for opportunities:**
- Persistent selection bar with running total, not an action bar that only appears after selecting
- Policy-result chip inline in the row
- Override note as a first-class field, not a comment

---

## Journey 3 · Finance Review / Monthly Close (Marcus, Finance Admin)

**Context:** First Monday of the month. Marcus needs the close packet emailed to the CFO and Board by 10 AM.

| Stage | Actions | Thoughts | Emotions | Frustrations (prior tool) | Opportunities (designed for) |
|---|---|---|---|---|---|
| **Pre-flight** | Opens dashboard 7:45 AM | "Anything pending I need to chase?" | Vigilant | Multiple tabs to check status | Hero KPI + inline stats tell the story fast |
| **Sweep** | ⌘K → Audit log | "Did anyone override anything weird?" | Cautious | Audit buried 3 clicks into Settings | One search away, same as every low-frequency page |
| **Close pending** | Approves last 2 reimbursements | "Clear the deck." | Focused | Reimbursements a separate tool | Same workspace, two clicks |
| **Generate** | Opens "Monthly close packet" saved report | "Let's hope last month's template still works." | Hopeful | Rebuilt template every month | Saved reports persist |
| **Review** | Skims line items + variance vs plan | "Variance looks right." | Confident | Manual cross-check vs budget | Inline variance column |
| **Export** | PDF + QBO sync, email to board | "Sent." | Triumphant | CSV → Excel → PDF → email | One click; all formats |

**Designed-for opportunities:**
- Saved reports that survive month-over-month
- Audit log reachable in one search, not buried in a settings sub-tab
- One-click multi-format export (PDF / CSV / QBO)
