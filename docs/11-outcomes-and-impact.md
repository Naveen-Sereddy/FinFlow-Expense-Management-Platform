# 11 · Outcomes & Impact

> **Note on terminology.** "Verified outcomes" are things actually checked against the shipped build — a script drove it, or a specific fix was traced to a file and confirmed. "Projected outcomes" are forecasts based on persona-level work-pattern reasoning and require real post-launch measurement to confirm. This project has no commissioned user research, so no completion percentages or user-testing metrics are claimed as fact.

---

## VERIFIED OUTCOMES (checked against the shipped build)

### Automated regression coverage

A script drives every one of the 47 screens across all 3 roles and both themes after every change, checking for console errors and empty renders.

| Check | Result |
|---|---|
| Screens swept | 47 / 47 |
| Console errors found | 0 |
| Empty/broken renders found | 0 |

### Production-readiness audit — findings and fixes

A self-directed audit of the shipped build found and fixed:

- 14 hand-copied "hero + inline stats" blocks that had drifted to 3 different font sizes and 2 different gap values — consolidated into one shared `StatRow` component
- Two unrelated color systems assigning different colors to the same expense category — unified on the category's own data field as the single source of truth
- 5+ icon-only buttons with no accessible name — fixed individually, traced to file and line
- Every chart missing a real accessible name (`<title>`, `role="img"`, `aria-label`) — added to all five chart primitives
- Chart data points reachable only by mouse — added keyboard-focus tooltips alongside hover
- A command palette that advertised keyboard navigation it didn't implement — built the real thing
- A dead CSS class matching the exact four-KPI-card anti-pattern the redesign existed to remove — deleted, confirmed zero remaining usages first

### Design system health

- 0 hardcoded colors bypassing tokens found in the final pass, apart from one documented exception (virtual-card mockup gradients, since fixed to use the neutral ink scale instead of a stray off-brand hue)
- 100% of status indicators paired with icon + label
- 100% of money values use tabular figures

---

## PROJECTED OUTCOMES (forward-looking, unverified without a real launch)

These are reasoned estimates based on the workflow this product replaces, not measured results. They require production deployment and real usage data to confirm.

### User benefits

| Benefit | Persona | Projected magnitude |
|---|---|---|
| Time saved per month on receipt chasing | Finance Admin | Meaningful reduction — receipt chase collapses into one workspace instead of four tools |
| Time saved per monthly close | Finance Admin | Saved reports remove the "rebuild the template" step every cycle |
| Time saved per approval session | Manager | Bulk approve + inline policy result removes the open-each-item step |
| Time saved per expense submission | Employee | OCR removes manual field entry |
| Time saved per audit cycle | Auditor | Immutable, filterable, exportable log replaces manual sampling |

### Business benefits

- **Finance team time saved** — one workspace replacing four disconnected tools removes real coordination overhead, though the exact hours require a live deployment to measure
- **Faster monthly close** — earlier board reporting, faster reaction time to spend anomalies
- **Lower audit cost** — a filterable, exportable audit log is a direct replacement for manual quarterly sampling
- **Reduced churn risk on Managers** — a queue that clears fast is the difference between a tool managers tolerate and one they avoid

### Workflow improvements

- One workspace replaces four tools (cards, expenses, approvals, reports)
- Policy is checked inline, not discovered at audit
- Saved reports survive month-over-month; the close packet template is no longer rebuilt from scratch
- Bulk-approve removes the highest-volume friction point in the approval workflow

---

## KPI Recommendations (for post-launch tracking)

### Activation
- Time to first close packet exported
- Time to first bulk-approve
- Time to first mobile submission

### Engagement (the core retention metric)
- Daily Active Finance Admin / Total Finance Admin
- Weekly active Manager / Total Manager
- Monthly submitting Employee / Total Employee

### Quality
- p95 OCR confidence
- % of bulk-approved items later challenged
- Policy violation rate before and after inline policy checks

### Trust
- Audit log integrity check pass rate
- Median time to incident resolution

---

## Success Measurement Framework

Two layers, tracked independently once live:

1. **Behavioral** — the KPIs above, tracked from real usage
2. **Qualitative** — periodic Finance Admin feedback once there are real users to ask

The product is considered successful when the Finance Admin opens FinFlow before opening email each morning — a behavior that would be tracked via session-start logs post-launch, not claimed here.
