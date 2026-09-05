# Expense lifecycle demonstration contract

This release completes the first audit wave as a browser-local demonstration. No live money movement or account authentication is implemented.

## Scope and transitions

| Role | Read scope | Actions |
|---|---|---|
| Employee | Own expenses, reimbursements, card and activity | Submit, correct returned expenses, freeze/unfreeze own card |
| Manager | Sales team and own expenses; own reimbursements/cards | Review Sales submissions except own; submit own expenses |
| Finance | Workspace | Review except own submissions, schedule eligible reimbursements, reconcile approved card expenses, demo card controls |

New submissions enter pending review. Missing evidence is a policy exception. Review, policy and accounting progress are separate fields. Corrections and rejections require a reason; approving a policy exception also requires a reason. A correction returns the same ID to the owner for editing and resubmission. Rejection is terminal. Approved records cannot be reviewed again.

Corporate-card approval never creates an employee reimbursement. Finance separately marks the sample transaction reconciled and accounting-ready. Approved personal expenses create a linked pending reimbursement. Finance schedules only pending reimbursements; already scheduled or paid records cannot be selected again. Scheduling is simulated and does not mark an expense paid or accounting-ready.

Amounts are validated as integer cents; the `amount` number is a derived compatibility value for display components. Reimbursements must match the sum, owner, personal payment source, and approval state of unique linked expenses. Historical reimbursement fixtures use separate, labeled ledger IDs rather than reusing unrelated card expenses.

## Persistence and feedback

The v3 store saves before emitting success. Drafts are keyed by owner and optional correction ID. Every rendered input participates in draft/submission state. Attachments preserve file contents within the stated local limit. Save failures retain input and permit retry. New actions append timestamped, actor-specific events and operation IDs. Confirmation pages require a matching operation; arbitrary direct visits cannot claim an action succeeded.

Malformed saved data is preserved and blocks writes until an explicit demo reset. Older v2 records and preferences are preserved during migration. Sequential tabs read the latest saved revision before changing it and subscribe to storage events; simultaneous writes are not a production-safe transaction mechanism.

## Navigation and accessibility

Desktop and mobile URLs carry record identity. Desktop lists retain filters through Back; changing filters clears selection. Direct routes and selectors enforce demonstration scope. Detail views fail closed on unknown or inaccessible IDs. Product navigation and the labeled demo screen directory are separate.

The supported workflow uses associated labels, specific validation errors, semantic record links/buttons, named selection, visible keyboard focus, contained/restored dialog focus, and a main landmark. Tables scroll within a named region. Shells, capture, review and payout forms are checked at 320, 390, 768 and 1280 pixels. Native receipt-file selection and sample evidence are supported; live OCR is not.

## Verification

- `npm run check`: fixture invariants, scope and transition tests, persistence, invalid input, receipt context, correction/resubmission, card/reimbursement separation, atomic batch decisions, duplicate scheduling, and storage failure.
- `npm run test:browser` with a running local server and Playwright: actual desktop/mobile inputs, URLs, state, role switching, keyboard review, modal focus, responsive containment, console errors and retry.
- Reports derive categories, counts and CSV records from the same scoped interval; source sums use cents.

The Babel browser-transform warning is expected in this static runtime. Full screen-reader certification, a complete WCAG/contrast audit, production concurrency, provider processing, settlement, refunds, cancellation, and failure recovery are not claimed. Historical screenshots and the separate Portfolio presentation remain unchanged.
