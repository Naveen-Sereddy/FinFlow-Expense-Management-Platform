# 04 · User Journeys

Three journey maps drove the IA and screen prioritization. Each map covers actions, thoughts, emotions, frictions, and the opportunities they unlocked in the design.

---

## Journey 1 · Expense Submission (Iris, Employee)

**Context:** Iris just bought $42.80 of team coffee at Blue Bottle on a Tuesday afternoon. She wants to submit and forget it.

| Stage | Actions | Thoughts | Emotions | Frustrations (old workflow) | Opportunities (designed for) |
|---|---|---|---|---|---|
| **Trigger** | Pays at register, opens phone | "Don't lose this receipt." | Neutral | Receipt photo + email reminder → forgets for 2 weeks | One-tap snap from home screen |
| **Capture** | Opens FinFlow → tab "Snap receipt" | "Just point and shoot." | Mild stress (will OCR work?) | Manual entry of merchant, amount, date | OCR auto-fills; confidence visible |
| **Review** | Confirms category, memo, payment | "Did it get the amount right?" | Reassured | Had to type all fields | Pre-filled with confidence chip |
| **Submit** | Taps Submit | "How long until Theo approves?" | Confident | No status visibility | Submission success screen names approver + ETA |
| **Wait** | Goes about her day | "I'll forget about this until reimbursement hits." | Neutral | Status hidden | Push notif on approval + payout |
| **Resolve** | Sees "Approved" notification | "That was painless." | Satisfied | Often had to re-submit | Single source of truth |

**Designed-for opportunities:**
- 30-second target submission, measured in the round-2 test
- Status timeline screen that explicitly names *who* is next, not just "pending"
- Push notifications at every state change

---

## Journey 2 · Approval Workflow (Theo, Manager)

**Context:** Monday 9 AM. Theo has 8 items in his approval queue from the weekend.

| Stage | Actions | Thoughts | Emotions | Frustrations (old workflow) | Opportunities (designed for) |
|---|---|---|---|---|---|
| **Open queue** | Clicks Approvals (8) in sidebar | "How many of these are easy?" | Mild dread | Items mixed; no policy result inline | Policy status visible per row |
| **Triage** | Scans amounts + status badges | "Bulk the in-policy ones." | Focused | Had to open each item | Bulk-select with summary total |
| **Bulk approve** | Selects 5 in-policy → Approve | "Done in 10 seconds." | Energized | No bulk action available | Quick approve via accent button |
| **Drill in** | Opens flagged Marriott item | "Why is this flagged?" | Curious | Reason buried in details | Inline policy result + override note |
| **Decide** | Approves with override note | "Note explains the why." | Confident | No audit trail of override reason | Override note saved to audit log |
| **Close out** | Queue is empty | "Could not be easier." | Satisfied | Used to take 30+ minutes | Median: 4 minutes for 8 items |

**Designed-for opportunities:**
- Bulk action bar with running total
- Policy-result chip *inline* in the row
- Override note as a first-class field, not a comment

---

## Journey 3 · Finance Review / Monthly Close (Maren, Finance Admin)

**Context:** First Monday of the month. Maren needs the close packet emailed to the CFO and Board by 10 AM.

| Stage | Actions | Thoughts | Emotions | Frustrations (old workflow) | Opportunities (designed for) |
|---|---|---|---|---|---|
| **Pre-flight** | Opens dashboard 7:45 AM | "Anything pending I need to chase?" | Vigilant | Multiple tabs to check status | 4 KPIs above fold tell the whole story in 6s |
| **Sweep** | Reviews audit log for stragglers | "Did anyone override anything weird?" | Cautious | Audit hidden in Settings | Audit log promoted to top-level nav |
| **Close pending** | Approves last 2 reimbursements | "Clear the deck." | Focused | Reimbursements separate tool | Same workspace, two clicks |
| **Generate** | Opens "Monthly close packet" saved report | "Let's hope last month's template still works." | Hopeful | Rebuilt template every month | Saved reports persist + schedule |
| **Review** | Skims line items + variance vs plan | "Variance looks right." | Confident | Manual cross-check vs budget | Inline variance column |
| **Export** | PDF + QBO sync, email to board | "Sent." | Triumphant | CSV → Excel → PDF → email | One click; all formats |

**Time-to-close (projected outcome):** 4+ hours → 22 minutes

**Designed-for opportunities:**
- Saved reports that survive month-over-month
- Audit log as a top-level surface, not buried
- One-click multi-format export (PDF / CSV / QBO)
