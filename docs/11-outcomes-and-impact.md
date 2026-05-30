# 11 · Outcomes & Impact

> **Note on terminology.** "Actual outcomes" are observed in research or qualitative validation. "Projected outcomes" are forecasts based on the round-2 prototype tests and target-persona work-pattern analysis, and require post-launch measurement.

---

## ACTUAL OUTCOMES (observed in research)

### Usability testing — Maze, two rounds, n=12 each

| Task | Round 1 (mid-fi Figma) | Round 2 (hi-fi prototype) | Δ |
|---|---|---|---|
| Submit an expense (mobile) | 92% | 100% | +8 |
| Approve a flagged expense | 75% | 92% | +17 |
| Find the audit log | 50% | 92% | +42 |
| Build a custom report | 67% | 83% | +16 |
| Schedule a payout | 83% | 92% | +9 |
| **Composite first-try success** | **73%** | **89%** | **+16** |

### Qualitative signal

- **Finance Admin think-aloud (n=4)** — time-to-answer "what should I do today?" dropped from 22s to 6s after the dashboard density redesign
- **Manager interview pattern (n=4)** — every Manager called out the bulk-approve as the highest-value feature, often before being prompted
- **Employee mobile (n=4)** — 100% completed the submission task on first try in round 2
- **Stakeholder visual review** — "Doesn't look like Brex" reported by 5/6 reviewers, the brief's primary visual goal

### Design system health

- 0 hardcoded colors at v1 freeze (every component reads role tokens)
- 1 documented exception (virtual-card mockup gradient)
- 100% of status indicators paired with icon + label
- 100% of money values use tabular figures

---

## PROJECTED OUTCOMES (post-launch forecasts)

### User benefits

| Benefit | Persona | Magnitude (projected) |
|---|---|---|
| Time saved per month on receipt chasing | Finance Admin | 6 hrs → < 1 hr |
| Time saved per monthly close | Finance Admin | 4 hrs → 22 min |
| Time saved per approval session | Manager | 30 min → 4–8 min |
| Time saved per expense submission | Employee | 3 min → 28 sec |
| Time saved per audit cycle | Auditor | 1–2 weeks → 2 hrs |

### Business benefits

- **Per-customer time saved** — ~14 hours/month for the Finance team; reframes as ~$2,500/month in salary cost at typical Series B comp
- **Faster monthly close** — earlier board reporting; faster reaction time to spend anomalies
- **Lower audit cost** — quarterly audit sampling time drops by ~80% (projected)
- **Reduced churn risk on Managers** — empty-queue cadence keeps the org's most senior approvers from rage-quitting the product

### Workflow improvements

- One workspace replaces four tools (cards, expenses, approvals, reports)
- Policy is checked at swipe, submit, *and* approval — not at audit
- Saved reports survive month-over-month; the close packet template is no longer rebuilt
- Bulk-approve removes the highest-volume friction point in the org

### Efficiency improvements

| Metric | Baseline (projected) | Target | After 90 days (projected) |
|---|---|---|---|
| Median time to first decision on a queue | 9 min | < 2 min | 2 min |
| % of expenses with receipt attached at submit | 71% | > 90% | 94% |
| % of close cycles completed on day 4 or earlier | 33% | > 80% | 78% |
| Audit prep hours per quarter | 60 | < 10 | 8 |

---

## KPI Recommendations (for post-launch tracking)

### Acquisition
- New workspaces / week
- % of workspaces that complete the 3-step onboarding (connect bank → invite team → set policy)

### Activation
- Time to first close packet exported
- Time to first bulk-approve
- Time to first mobile submission

### Engagement (the core retention metric)
- **Daily Active Finance Admin / Total Finance Admin** (target: > 80%)
- Weekly active Manager / Total Manager (target: > 70%)
- Monthly submitting Employee / Total Employee (target: > 75%)

### Quality
- p95 OCR confidence
- % of bulk-approved items later challenged
- Policy violation rate before & after the policy-at-swipe check

### Trust
- Audit log integrity check pass rate (target: 100%)
- Auth/SSO failure rate
- Median time to incident resolution

---

## Adoption Metrics (90-day post-launch projection)

| Cohort | Day 7 | Day 30 | Day 90 |
|---|---|---|---|
| Finance Admins active daily | 70% | 80% | 85% |
| Managers active weekly | 50% | 65% | 75% |
| Employees submitting at least monthly | 40% | 65% | 78% |
| Auditors granted access | n/a | 30% | 55% |

---

## Success Measurement Framework

Three layers, tracked independently:

1. **Usability** — task completion rates from in-product micro-tests + Maze re-tests
2. **Behavioral** — KPIs above, tracked weekly in PostHog
3. **Qualitative** — quarterly Finance Admin interviews; NPS at activation and at month-3

The product is considered successful when the Finance Admin opens FinFlow *before* opening their email each morning — a behavior we'd track via session-start logs.
