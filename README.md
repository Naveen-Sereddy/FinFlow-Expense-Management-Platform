# FinFlow

B2B expense management platform shipped privately for an anonymized Series B SaaS client. Three roles touch the same expense at different points: the employee submitting it, the manager approving it, and the finance admin reconciling and reporting on it. 47 desktop screens, an 8-screen employee mobile flow, and a token-driven UI kit.

**Live case study:** [naveensereddy.com/case-finflow](https://naveensereddy.com/case-finflow)

## Screenshots

<img width="1440" height="900" alt="Finance admin dashboard" src="screenshots/hero-dashboard.png" />

<img width="1440" height="900" alt="Expenses list" src="screenshots/hero-expenses.png" />

<img width="1440" height="900" alt="Manager approvals queue with bulk approve" src="screenshots/hero-approvals.png" />

<img width="1440" height="900" alt="Employee spend view" src="screenshots/hero-employee.png" />

<img width="1440" height="900" alt="Reports" src="screenshots/hero-reports.png" />

## Features

- Three role-scoped views (Finance Admin, Manager, Employee), each with its own top-nav destinations and its own dashboard composition. Finance Admin is hero-number-led, Manager is queue-led (the approvals list is the widest column, not a chart), Employee is card-led (a virtual-card graphic anchors the page instead of a KPI grid)
- No sidebar: a single 60px top strip (logo, per-role nav, role switch, search, theme, notifications, avatar). Each role sees only its 5-7 highest-frequency destinations; everything else (Settings, Policies, Team & Roles, Integrations, Audit Log, Notifications, Help) lives behind a grouped "More" dropdown, plus a dedicated row into the same ⌘K screen directory used for search, with real arrow-key navigation and Enter-to-select, not just click
- Deliberately asymmetric layouts instead of the generic four-equal-KPI-card-plus-chart template: one oversized hero stat next to a compact inline stat row, borderless data tables instead of every list wrapped in its own card, hero/hero-ish treatments that vary page to page
- A single category → color mapping (`FF_DATA.categories[].color`) drives every colored-dot category tag and every category-grouped chart, so "Software" is the same blue everywhere it appears: table tags, bar charts, dashboard legends
- Hand-rolled SVG chart components (Sparkline, LineChart, BarChart, AreaChart, Donut, BudgetBar), no charting library. Every chart renders a real `<title>` + `aria-label`; Line and Area charts have hover **and** keyboard-focus tooltips showing the exact value per point, not just approximate gridline reading
- Real empty states (icon, message, primary action) wired into every list screen that can legitimately have zero rows (Vendors, Reimbursements, Approval History, Audit Log, Cards), not just a bare table header over nothing
- Consistent focus-visible ring (one shared token, `box-shadow`-based so it follows each element's own corner radius) across buttons, inputs, and links; icon-only buttons carry real `aria-label`s
- Light/dark theme, persisted per browser
- A case-study canvas (`FinFlow Case Study.html`) covering research through final UI as one scrollable board

## Tech stack

React 18.3 and Babel Standalone from unpkg, with no bundler in the shipped client bundle. A minimal Node-based verification and local server setup lives in `scripts/`; it does not change the runtime architecture. Icons are Phosphor. One typeface system throughout: General Sans (Fontshare) for everything, JetBrains Mono for tabular figures (money, IDs, dates), loaded via `foundations/colors_and_type.css`. Space Grotesk and Fraunces are loaded separately in `index.html` for the wordmark-tweak experiment (`WORDMARK_PRESETS`) only, not the product's type system.

State is a handful of `useLocalStorage`-backed values (`ff-role`, `ff-screen`, `ff-theme`), no state management library. No backend, no database: `ui_kits/finflow/data.js` holds all the mock expenses, approvals, vendors, and categories as plain JS.

## Project structure

```
ui_kits/finflow/
  index.html           # entry point, role/screen state, ⌘K screen directory
  mobile-app.html       # employee mobile flow
  data.js                # mock data (expenses, vendors, categories, cards, ...)
  layout.jsx              # TopNav + shared primitives: PageHead, Card, StatRow,
                           # CategoryTag, StatusBadge, EmptyState, KpiTile, ...
  charts.jsx               # Sparkline, LineChart, BarChart, AreaChart, Donut, BudgetBar
  tweaks-panel.jsx          # dev-only live design-token panel
  screens/                  # dashboards.jsx, expenses.jsx, approvals.jsx, settings.jsx,
                             # mobile.jsx, misc.jsx, reports_cards_vendors.jsx
FinFlow Case Study.html      # case-study canvas viewer
case-study/                   # case-study artifact components (research, personas, wireframes,
                               # design system, accessibility, final UI)
design-canvas.jsx               # shared canvas/artboard components used by the case-study viewer
foundations/
  colors_and_type.css           # design tokens: color, type, spacing, radius, shadow, motion
  components.css                   # component classes
brand/                              # logo lockups, wordmark, logomark (SVG)
preview/                             # design-system reference pages
docs/                                 # business context through outcomes and impact (14 documents)
screenshots/                           # screenshots used in this README
```

## Verification

Run the structural screen and token checks before sharing a change:

```bash
npm run check
```

For a local browser session, start the zero-build server and open the printed URL:

```bash
npm run dev
```

The check confirms the 47 desktop surfaces plus the mobile shelf are registered, required role routes and design tokens exist, local assets resolve, and concept-only framing has not returned to the shipped entry point.

## Architecture

`onRole` and `onNavigate` in `index.html` are the whole router. `REACHABLE` is a plain object mapping each role to the screen IDs it can reach; switching roles checks the current screen against that set and redirects to the role's default if it's not reachable, so you can't get stranded on Vendors after switching to Employee. Screens are plain functions keyed by ID in `SCREEN_REGISTRY` and rendered directly. No route-matching library.

Every category (Software, Travel, Meals, ...) is defined once in `data.js` with a `color` field pointing at a chart token (`var(--ff-chart-1)` etc.). `CategoryTag` and the category-breakdown charts both read that same field instead of deriving color independently, so the mapping can't drift between a table and a chart.

The `tweaks-panel.jsx` component listens for `postMessage` events (`__activate_edit_mode` and friends), a leftover hook for the design tool this was built in that lets an external host toggle a live token-editing panel. It's inert unless something posts those messages.

## Design system

Single top nav, no sidebar: logo, per-role destinations, role switch, search, theme, notifications, avatar, all in one 60px row. Frequency-based: each role's top nav carries its 5-7 most-used destinations; everything else is one click away via the "More" dropdown, or one ⌘K away, searchable by label or group.

One brand hue (slate blue) across primary actions, focus rings, and chart series 1. One typeface (General Sans) at a defined scale, one spacing scale (4px base), one radius scale, one shadow scale, all as CSS custom properties in `foundations/colors_and_type.css`, referenced by name everywhere so the whole app repaints from one file. Seven semantic status groups (success/warning/info/review/action/danger/neutral) back every badge in the product; no component picks its own status color.

Layout composition is deliberately asymmetric page to page: a hero KPI next to a compact stat row instead of four equal cards, a queue as the wide column instead of a chart, borderless tables instead of every list boxed in its own card. A generic dashboard reads as generated, not designed, and the goal here was the opposite.

## Getting started

Run `npm run dev`, then open the printed URL for the desktop app. The employee mobile flow is available at `/ui_kits/finflow/mobile-app.html`. The shipped bundle remains zero-build and can also be opened directly from `ui_kits/finflow/index.html` in a modern browser.

## Future improvements

Honest gaps, not hidden ones:

- No pagination on any table. Every list renders its full dataset. Fine at mock-data scale, needs a real component plus a backend page contract at production scale
- No slide-over drawer for reviewing an approval/card/vendor from its list. Every detail view is a full navigation away and back, which costs real time in a high-volume approval queue
- The date-range control on Expenses is a static label, not a working calendar. Needs a real filtering contract behind it before it's worth building
- Table rows that navigate on click aren't keyboard-focusable yet; this pattern repeats across most list screens and needs a systematic fix, not a one-off
- Replace the hand-rolled `useLocalStorage` role/screen state with real routing if this ever needs deep links to a specific screen

## License

MIT

---

Naveen Sereddy · [naveensereddy.com](https://naveensereddy.com) · [github.com/Naveen-Sereddy](https://github.com/Naveen-Sereddy)
