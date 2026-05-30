# 09 · Before vs After

A side-by-side accounting of what changed between the typical "Series B finance stack" (the user's prior state) and FinFlow.

---

## Workflow Improvements

| Workflow | Before | After |
|---|---|---|
| Receipt capture | Email screenshot to self, type into spreadsheet later | Snap on phone, OCR fills the form, submit in < 30s |
| Approval | Slack DM with screenshot, "lgtm" reply, manual entry into spreadsheet | Inline policy result, bulk approve, audit row written automatically |
| Reimbursement | Manual ACH file built in spreadsheet, uploaded to bank portal | Schedule in 3 clicks; one ACH batch; cancel before 2hr cutoff |
| Monthly close | 4+ hours: collect, categorize, reconcile, format, email | 22 minutes (target): open saved packet, review variance, export, email |
| Audit prep | 1–2 weeks per quarter sampling receipts manually | 2 hours: read-only auditor login, filter, sample, download |
| Card issuance | Separate vendor portal, manual entry, 1–2 day turnaround | Issue virtual card in < 60 seconds in-product |

---

## Navigation Improvements

| Element | Before | After |
|---|---|---|
| Top-level surfaces | "Settings" was a graveyard for 30+ items | 11 top-level surfaces; Settings has 7 focused tabs |
| Audit log discoverability | Buried 3 clicks deep in Settings → Compliance | Top-level sidebar item |
| Bulk actions | Required entering each row | Persistent action bar above any selectable table |
| Role switching | Separate apps or separate logins | Topbar segmented control re-renders sidebar; same workspace |
| Search | Per-page filters | Global ⌘K screen directory + per-page filters |

---

## Visibility Improvements

| Information | Before | After |
|---|---|---|
| What needs my decision today | Sift through Slack | "Pending approvals" card on dashboard |
| Where is my money | Multiple bank tabs | One KPI: "Cash Available · 62 days runway" |
| Is anything off-policy | Found in audit | Real-time policy flags on dashboard + inline on every list |
| Reimbursement timing (employee) | "When will I get paid?" via Slack to Finance | Scheduled-date + status timeline on phone |
| Card balance vs limit | Vendor portal | Per-card progress bar on Cards page + mobile home |

---

## Reporting Improvements

| Report task | Before | After |
|---|---|---|
| Monthly close packet | Excel template rebuilt monthly | Saved report; one-click PDF/CSV/QBO export |
| Custom analysis | Pivot tables in Excel | Report builder with drag-in dimensions + measures |
| Sharing | Email a PDF | Scheduled email digest; share link with view-only access |
| Vendor analysis | Filter spreadsheet | Vendor detail page with spend over time |
| Variance vs. plan | Manual cross-reference | Inline column on saved report |

---

## Approval Improvements

| Approval task | Before | After |
|---|---|---|
| Average decisions per session | 5–8 (manual fatigue) | 8–14 (bulk + inline policy) |
| Clicks per decision | 7 (open → scroll → read policy → return → mark → next) | 2 (status chip + Approve) |
| Time per session | 30+ min | 4–8 min |
| Override note captured | No (DM disappears) | Yes, first-class field, audit-logged |
| Manager budget visibility | Separate spreadsheet | Inline budget snapshot on manager dashboard |

---

## User Confidence Improvements

| Persona | Confidence anchor (before) | Confidence anchor (after) |
|---|---|---|
| Employee | "Did the receipt get through?" → checked email | Status timeline screen; push notifications |
| Manager | "Am I missing a flagged item?" → fear of audit | Inline policy chip + audit log of overrides |
| Finance Admin | "Did anything weird happen overnight?" → 3 tabs to check | Audit log + 4 KPIs above the fold |
| Auditor | "I have to trust the spreadsheet" | Immutable, exportable audit log + receipt deep-links |

---

## Summary Metrics

These are projected outcomes based on round-2 usability testing (n=12) and persona-level work-pattern analysis. Real production outcomes require live deployment.

| Metric | Before | After (projected) | Δ |
|---|---|---|---|
| First-try task completion (composite) | 73% | 89% | +16 pts |
| Visible dashboard elements above fold | 31 | 17 | −45% |
| Time-to-answer "what should I do today?" | 22s | 6s | −73% |
| Manager clicks per decision | 7 | 2 | −71% |
| Monthly close cycle time (Finance Admin) | 4+ hours | 22 minutes | −91% |
| Receipt submission time (Employee, mobile) | ~3 minutes | 28 seconds | −84% |
