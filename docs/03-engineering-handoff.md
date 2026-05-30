# 03 · Engineering Handoff

> Next.js architecture, RBAC, API, schema, GitHub repo plan, deployment.

## 1. Stack at a glance

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 14 (App Router)** | RSC + Server Actions, mature TS, fast dev loop |
| Language | **TypeScript strict** | Money + access — types non-negotiable |
| Styling | **Vanilla CSS variables** (no Tailwind in v1) | Tokens map 1:1 to Figma; no rebuild for theme swap |
| UI primitives | Project's own `@finflow/ui` package | Owns tokens + component CSS |
| Forms | **react-hook-form** + **zod** | Schema-driven; share zod with API |
| Tables | **TanStack Table v8** | Headless, virtualized for >5K rows |
| Charts | Custom SVG (see `charts.jsx`) | No d3 dep; print-friendly |
| State | **Server-first** (RSC + Server Actions); **Zustand** for client UI state | Don't fetch from client unless interactive |
| ORM | **Drizzle ORM** | TS-native, edge-friendly, no codegen |
| DB | **Postgres (Neon)** | Branching for dev/PR previews |
| Auth | **WorkOS** (SSO + SCIM + Audit Log API) | Solves SOC 2 fast |
| Cards | **Stripe Issuing** (v1.1: dual w/ Lithic) | Quickest path to live cards |
| Payments | **Stripe Treasury** (ACH out) | Or Modern Treasury later |
| OCR | **AWS Textract** + custom merchant model | Textract for fields, fine-tune for receipts |
| Bg jobs | **Inngest** | Approvals, ACH batches, OCR pipeline |
| Hosting | **Vercel** (web) + **Neon** (db) + **AWS** (OCR) | |
| Observability | **Sentry**, **Datadog**, **PostHog** | Errors / infra / product |

## 2. Repo layout (monorepo, pnpm + Turborepo)

```
finflow/
├── apps/
│   ├── web/                  # Next.js app
│   ├── docs/                 # Docusaurus (these docs)
│   └── workers/              # Inngest functions
├── packages/
│   ├── ui/                   # @finflow/ui — components + CSS tokens
│   ├── db/                   # Drizzle schema + migrations
│   ├── policy/               # Policy engine (pure TS)
│   ├── ocr/                  # OCR + merchant normalization
│   ├── auth/                 # WorkOS wrappers
│   └── config/               # tsconfig, eslint, prettier
├── infra/
│   ├── terraform/            # Neon, S3, IAM
│   └── github/               # CODEOWNERS, workflows
└── tools/
    └── scripts/              # Seed data, demo company
```

## 3. App routes (Next.js App Router)

```
app/
├── (auth)/
│   ├── sign-in/page.tsx
│   ├── sso/page.tsx
│   ├── forgot/page.tsx
│   └── reset/[token]/page.tsx
├── (onboarding)/
│   ├── connect-bank/page.tsx
│   ├── invite-team/page.tsx
│   └── set-policy/page.tsx
├── (app)/                          # Layout = sidebar + topbar
│   ├── layout.tsx                  # auth required; loads workspace
│   ├── page.tsx                    # → /dashboard
│   ├── dashboard/page.tsx          # role-aware
│   ├── expenses/
│   │   ├── page.tsx
│   │   ├── new/page.tsx
│   │   ├── import/page.tsx
│   │   └── [id]/page.tsx
│   ├── approvals/
│   │   ├── page.tsx
│   │   ├── history/page.tsx
│   │   └── [id]/page.tsx
│   ├── reimbursements/
│   │   ├── page.tsx
│   │   ├── schedule/page.tsx
│   │   └── [id]/page.tsx
│   ├── reports/
│   │   ├── page.tsx
│   │   ├── new/page.tsx            # Builder
│   │   ├── [id]/page.tsx
│   │   └── [id]/export/page.tsx
│   ├── cards/
│   │   ├── page.tsx
│   │   ├── new/page.tsx
│   │   └── [id]/page.tsx
│   ├── vendors/
│   │   ├── page.tsx
│   │   └── [id]/page.tsx
│   ├── audit/page.tsx
│   ├── notifications/page.tsx
│   ├── help/page.tsx
│   └── settings/
│       ├── layout.tsx              # left tabs nav
│       ├── profile/page.tsx
│       ├── security/page.tsx
│       ├── team/page.tsx
│       ├── policies/page.tsx
│       ├── integrations/page.tsx
│       ├── billing/page.tsx
│       └── notifications/page.tsx
└── api/
    ├── webhooks/stripe/route.ts
    ├── webhooks/workos/route.ts
    └── webhooks/inngest/route.ts
```

## 4. RBAC

Roles: `employee` < `manager` < `finance_admin` < `owner`. Plus `auditor` (read-only, scoped).

```ts
type Role = 'employee' | 'manager' | 'finance_admin' | 'owner' | 'auditor';

const can = {
  'expense.submit':     ['employee','manager','finance_admin','owner'],
  'expense.view.own':   ['employee','manager','finance_admin','owner','auditor'],
  'expense.view.team':  ['manager','finance_admin','owner','auditor'],
  'expense.view.all':   ['finance_admin','owner','auditor'],
  'expense.approve':    ['manager','finance_admin','owner'],
  'expense.override':   ['finance_admin','owner'],
  'card.issue':         ['finance_admin','owner'],
  'card.freeze':        ['finance_admin','owner'],
  'policy.write':       ['finance_admin','owner'],
  'payout.schedule':    ['finance_admin','owner'],
  'audit.read':         ['finance_admin','owner','auditor'],
  'team.invite':        ['owner','finance_admin'],
  'integration.write':  ['owner','finance_admin'],
  'billing.read':       ['owner','finance_admin'],
  'billing.write':      ['owner']
} satisfies Record<string, Role[]>;
```

Auditor role is enforced by middleware that rewrites mutating requests → 403 *before* the handler.

Manager scope is **team-bounded**: a manager sees only their direct reports' expenses. Enforced at the DB query layer via Drizzle's row-level filter helper.

## 5. Data model (selected tables)

```sql
-- Workspace (one per customer company)
workspaces (id, name, plan, created_at, country, default_currency)

-- Users in a workspace; role is per-workspace
workspace_members (workspace_id, user_id, role, manager_id, team_id, status)

-- The whole catalogue
categories         (id, workspace_id, name, default_gl_code)
vendors            (id, workspace_id, name, ein, tax_type, w9_url, payment_terms)
policies           (id, workspace_id, name, scope_type, scope_id, rule_jsonb, version)

-- Money flow
cards              (id, workspace_id, holder_id, last4, limit_cents, type, status,
                    issued_at, frozen_at, processor, processor_card_id)
expenses           (id, workspace_id, code TEXT UNIQUE, owner_id, merchant_id, vendor_id,
                    category_id, project_code, amount_cents, currency, date,
                    memo, card_id, source ENUM('card','manual','import','ocr'),
                    status ENUM('draft','pending','approved','flagged','rejected'),
                    policy_result_jsonb, ocr_jsonb, receipt_urls TEXT[],
                    submitted_at, decided_at, decided_by)
expense_approvals  (id, expense_id, approver_id, sequence, status, decided_at, note)

reimbursements     (id, workspace_id, code TEXT UNIQUE, status, scheduled_for, sent_at,
                    method, bank_account_last4, total_cents)
reimbursement_items(reimbursement_id, expense_id, amount_cents)

reports            (id, workspace_id, name, definition_jsonb, schedule_cron, owner_id)
report_runs       (id, report_id, run_at, status, artifact_url)

-- Audit (immutable, append-only)
audit_log          (id, workspace_id, ts, actor_id, actor_kind, action, target_kind,
                    target_id, target_label, ip, user_agent, payload_jsonb)
  -- Postgres: REVOKE UPDATE, DELETE for the app role. Backup-only retention 7 years.
```

All money stored as `bigint` cents. All timestamps `timestamptz`. All `id` are `uuid v7`.

## 6. Policy engine

`@finflow/policy` is a pure TS function:

```ts
type PolicyContext = {
  expense: ExpenseDraft;
  workspace: Workspace;
  policies: Policy[];
  member: WorkspaceMember;
};

type PolicyResult = {
  status: 'ok' | 'flagged' | 'rejected';
  violations: Array<{ policy_id: string; rule: string; severity: 'soft' | 'hard'; message: string }>;
};

export function evaluate(ctx: PolicyContext): PolicyResult;
```

- Runs at three points: **at swipe** (Stripe Issuing real-time auth), **at submit**, **at approval**.
- Soft violations → status: `flagged` (still routable, requires override note from Finance).
- Hard violations → status: `rejected` (must be re-submitted or escalated).
- Audit log gets a row for every evaluate() call.

## 7. Server Actions (Next.js)

```ts
// app/(app)/expenses/new/actions.ts
'use server';
import { auth } from '@finflow/auth';
import { db } from '@finflow/db';
import { evaluate } from '@finflow/policy';
import { z } from 'zod';

const Schema = z.object({
  merchant: z.string().min(2),
  amount_cents: z.number().int().positive(),
  date: z.string().date(),
  category_id: z.string().uuid(),
  memo: z.string().max(500).optional(),
  card_id: z.string().uuid().optional(),
  receipt_urls: z.array(z.string().url()).max(3)
});

export async function submitExpense(formData: FormData) {
  const session = await auth.requireMember(['employee','manager','finance_admin','owner']);
  const parsed = Schema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.flatten() };

  const policy = await evaluate({ /* … */ });
  const status = policy.status === 'ok' ? 'pending'
                : policy.status === 'flagged' ? 'flagged'
                : 'rejected';

  const expense = await db.transaction(async (tx) => {
    const e = await tx.insert(expenses).values({ ...parsed.data, status, owner_id: session.user.id }).returning();
    await tx.insert(auditLog).values({ action: 'expense.submit', target_id: e[0].id, /* … */ });
    return e[0];
  });

  return { ok: true, id: expense.code };
}
```

## 8. OCR pipeline

1. Upload → S3 (`receipts/{workspace}/{expense_draft_id}/{file}`)
2. Inngest job `ocr.extract` enqueued
3. Textract → JSON; merchant normalizer maps `STARBUCKS #4471` → `Starbucks`
4. Confidence < 0.92 → user must confirm; ≥ 0.92 → auto-fill + still show confidence chip
5. Server Action updates draft with `ocr_jsonb`

## 9. Theming

CSS variables only. Theme is set on `<html data-theme="dark|light">`. We persist user choice in `prefs.theme` and ALSO honor `prefers-color-scheme` for unauth views.

```ts
// app/(app)/layout.tsx
<html data-theme={member.prefs.theme ?? 'system'}>
```

## 10. GitHub setup

- `main` is always deployable. PRs require review + green CI + Vercel preview.
- Conventional Commits. `release-please` cuts changelogs.
- CODEOWNERS map: `packages/policy/` → @finance-eng; `packages/ui/` → @design-systems
- Required checks: `lint`, `type`, `test`, `e2e:critical`, `lighthouse`, `axe`

### Branch protection
- `main`: 2 approvals, no force-push, requires linear history
- `release/*`: 1 approval

## 11. CI workflow (GitHub Actions)

```yaml
name: CI
on: pull_request
jobs:
  ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v3
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: pnpm }
      - run: pnpm install --frozen-lockfile
      - run: pnpm turbo lint type test
      - run: pnpm test:axe                 # accessibility
      - run: pnpm test:e2e:critical        # 6 smoke flows
```

## 12. Deployment

- **Vercel (web)** — preview per PR; production on `main`. Edge runtime where possible; node for DB writes.
- **Neon (db)** — main branch + per-PR ephemeral branch. Migrations via Drizzle CLI gated on a manual approval in CI.
- **Inngest** — managed; envs `dev`, `prod`.
- **AWS (OCR + S3)** — Terraform-managed; least-privilege IAM.

## 13. Environments

| Env | DB | Stripe | Domain |
|---|---|---|---|
| `dev` | Neon dev | Stripe test | `dev.finflow.app` |
| `staging` | Neon staging (refreshed weekly from anonymised prod) | Stripe test | `staging.finflow.app` |
| `prod` | Neon prod | Stripe live | `app.finflow.app` |

Secrets in Vercel + AWS Secrets Manager; mirrored locally via `dotenv-vault`.

## 14. Performance budget

- Initial JS (compressed): **< 130 KB** for `/dashboard`
- LCP (p75): **< 1.8s** on mid-tier laptop, fiber
- Time to interactive on Approvals queue (5K rows): **< 2.5s**
- Lighthouse: ≥ 95 perf / 100 a11y / 100 best-practices

## 15. Observability

- **Sentry** — frontend + server errors; release tags from CI; Source maps uploaded.
- **Datadog** — DB + Vercel + Inngest metrics; SLO dashboard pinned to TV.
- **PostHog** — Product analytics (no PII in events; we log `expense_id` + role).

## 16. v1.1 / v2 backlog (engineering)

- NetSuite GL sync (replaces QBO for upmarket)
- Multi-currency expenses + FX revalue at close
- Per-team policy variants UI
- Physical card design picker
- Approval rules-engine UI ("if amount > X then route to Y")
