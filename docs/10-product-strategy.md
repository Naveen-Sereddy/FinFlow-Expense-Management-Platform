# 10 · Product Strategy

## Product Vision

> **The whole company's spend, in flow.**

FinFlow becomes the workspace where Series B SaaS finance teams *live* — not a tool they open once a week. The product earns daily-use status through the Finance Admin's morning routine, then expands its surface across the company as Manager and Employee experiences mature.

## Business Strategy

**Wedge:** companies between 100 and 500 employees, $50K–$300K monthly OpEx through cards, with a 2–4 person finance team and no FP&A function. This segment is underserved: too dense for shoebox tools, too informal for ERP rollouts.

**Bundling:** the four functions a customer would otherwise buy as separate tools (cards, expenses, reports, reimbursements) are sold as one workspace. Pricing is per-seat ($15/user/month at the Scale tier shown in the prototype) rather than per-product.

**Differentiation:** distinct visual identity, a Finance-Admin-first IA, policy-engine-at-swipe (not just at submit), and an immutable audit log surfaced as a first-class product area.

**Land-expand:** start with the Finance Admin (they bring the team in). Expand across Manager and Employee through invitations during onboarding. SCIM provisioning via Okta moves the customer up to the Scale tier.

## User Strategy

| Persona | Acquisition | Activation | Retention |
|---|---|---|---|
| Finance Admin | Direct sales, referrals from peers, demo-driven content | First close packet exported in < 1 month | Saved reports + daily dashboard glance |
| Manager | Invited during Finance Admin onboarding | First bulk-approve in < 1 week | Empty-queue cadence; Slack notifications |
| Employee | Bulk invite via SCIM or invite-team flow | First expense submitted in < 14 days | Status visibility; reimbursement speed |
| Auditor | Granted by Finance Admin during SOC 2 prep | First export in < 1 day | Quarterly cycles |

## Growth Opportunities

1. **NetSuite GL integration** — opens up the upmarket band (500–1000 employees) without changing the surface
2. **Per-team policy editor UI** — the schema supports this; UI ships in v1.1 to retain mid-band customers
3. **Card design picker** — physical card customization is a high-perceived-value upgrade with low engineering cost
4. **Approval rules engine UI** — "if amount > X then route to Y" — converts power users into evangelists
5. **Multi-currency** — opens the EU + Latin American expansion

## Future Roadmap

### v1.1 (next quarter)
- Per-team policy editor UI
- Approval rules engine
- Mobile dark theme polish
- Skip-link + aria-live + a11y improvements (see 08)
- Audit-log filter wiring
- NetSuite integration v1

### v1.2 (next half)
- Multi-currency with FX revalue at close
- Card design picker (physical)
- Slack inline approve (in-channel modal)
- Reports builder v2: pivot tables
- Vendor W-9 capture flow

### v2.0 (next year)
- Travel booking (Navan-style integrated travel)
- Procurement requests (Coupa-lite)
- AP / bill pay (Bill.com–style)
- FP&A lite — budget vs actual planning surface

## Product Risks

| Risk | Severity | Mitigation |
|---|---|---|
| Brex / Ramp move downmarket | High | Cohesive visual identity + tight Finance-Admin focus |
| Stripe Issuing pricing changes | Medium | Adapter abstraction; swap to Lithic if needed |
| SOC 2 audit failure (audit log integrity) | High | Append-only DB role; daily integrity checks |
| Mobile usage stays low | Medium | Focus mobile on confidence (status), not features |
| Sales cycle stretches (security review at every customer) | High | SOC 2 Type II ready before GA; trust center site |

## Product Opportunities

1. **Close-day as a product moment** — turn the monthly close into a celebratory ritual (think Spotify Wrapped for finance teams)
2. **Spend-pattern alerts** — proactive: "you're about to blow Software budget this month"
3. **Employee self-service** — let employees see their own historical spend graph + reimbursement history
4. **Vendor scorecards** — surface payment terms, contract end dates, alternates
5. **AI-assisted close prep** — summarize anomalies, suggest journal entries

## Recommended Next Features

In priority order, by leverage:

1. **Per-team policy editor UI** (unblocks mid-segment customers)
2. **Approval rules engine UI** (converts power users to evangelists)
3. **NetSuite integration** (opens upmarket band)
4. **Multi-currency** (unlocks EU expansion)
5. **AI-assisted close prep** (defensible long-term moat)
