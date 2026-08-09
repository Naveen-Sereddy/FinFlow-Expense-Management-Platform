# 09 · Before vs After

A side-by-side accounting of what changed between the typical "Series B finance stack" (the prior state this product replaces) and FinFlow.

---

## Workflow Improvements

| Workflow | Before | After |
|---|---|---|
| Receipt capture | Email screenshot to self, type into spreadsheet later | Snap on phone, OCR fills the form |
| Approval | Slack DM with screenshot, "lgtm" reply, manual spreadsheet entry | Inline policy result, bulk approve, audit row written automatically |
| Reimbursement | Manual ACH file built in a spreadsheet, uploaded to bank portal | Schedule in a few clicks; one ACH batch; cancel before the cutoff |
| Monthly close | Hours: collect, categorize, reconcile, format, email | Minutes: open saved packet, review variance, export, email |
| Audit prep | Weeks per quarter sampling receipts manually | Read-only auditor login, filter, sample, download |
| Card issuance | Separate vendor portal, manual entry, day(s) turnaround | Issue a virtual card in-product, immediately |

---

## Navigation Improvements

| Element | Before | After |
|---|---|---|
| Primary navigation | 12-item sidebar, always visible, 3 groups | Single top nav capped at 5–7 highest-frequency items per role |
| Low-frequency destinations | Settings, Audit, Policies, Integrations — buried at varying depths | Same treatment for all of them: one ⌘K search away, not permanent chrome |
| Bulk actions | Required opening each row | Persistent selection bar, always visible, running total |
| Role switching | Separate apps or separate logins | Segmented control in the top nav swaps the nav row and dashboard composition; same workspace |
| Search | Per-page filters only | Global ⌘K screen directory (real keyboard nav) + per-page filters |

---

## Visibility Improvements

| Information | Before | After |
|---|---|---|
| What needs my decision today | Sift through Slack | Pending approvals surfaced directly on the dashboard |
| Where is my money | Multiple bank tabs | One hero KPI: cash available, with runway |
| Is anything off-policy | Found in audit | Policy chip inline on every relevant row and on the dashboard |
| Reimbursement timing (employee) | "When will I get paid?" via Slack to Finance | Scheduled-date + status timeline on phone |
| Card balance vs limit | Vendor portal | Per-card progress bar on Cards page + mobile home |

---

## Reporting Improvements

| Report task | Before | After |
|---|---|---|
| Monthly close packet | Excel template rebuilt every month | Saved report; one-click PDF/CSV/QBO export |
| Custom analysis | Pivot tables in Excel | Report builder with drag-in dimensions + measures |
| Vendor analysis | Filter a spreadsheet | Vendor detail page with spend over time |
| Variance vs. plan | Manual cross-reference | Inline column on the saved report |

---

## Approval Improvements

| Approval task | Before | After |
|---|---|---|
| Policy visibility | Discovered after the fact, in audit | Inline chip on every row, before the decision |
| Bulk decisions | Not possible; one row at a time | Persistent selection bar, always visible |
| Override note | Lost in a Slack thread | First-class field, saved to the audit log |
| Manager budget visibility | Separate spreadsheet | Inline budget snapshot on the manager dashboard |

---

## User Confidence Improvements

| Persona | Confidence anchor (before) | Confidence anchor (after) |
|---|---|---|
| Employee | "Did the receipt get through?" → checked email | Status timeline screen; push notifications |
| Manager | "Am I missing a flagged item?" → fear of audit | Inline policy chip + audit log of overrides |
| Finance Admin | "Did anything weird happen overnight?" → 3 tabs to check | Hero KPI + audit log one search away |
| Auditor | "I have to trust the spreadsheet" | Immutable, exportable audit log + receipt deep-links |
