# FinFlow

B2B expense management prototype built around three roles that touch the same expense at different points: the employee submitting it, the manager approving it, and the finance admin reconciling and reporting on it. 48 screens, no build step.

**Live case study:** [naveensereddy.com/case-finflow](https://naveensereddy.com/case-finflow)

## Screenshots

<img width="1440" height="900" alt="Finance admin dashboard" src="screenshots/hero-dashboard.png" />

<img width="1440" height="900" alt="Expenses list" src="screenshots/hero-expenses.png" />

<img width="1440" height="900" alt="Manager approvals queue with bulk approve" src="screenshots/hero-approvals.png" />

<img width="1440" height="900" alt="Employee spend view" src="screenshots/hero-employee.png" />

<img width="1440" height="900" alt="Reports" src="screenshots/hero-reports.png" />

## Features

- Three role-scoped views (Finance Admin, Manager, Employee) with a role switcher that redirects to a safe screen if the current one isn't reachable from the new role
- Bulk approve on the manager approvals queue, multi-select with a running total
- Hand-rolled SVG chart components (sparkline, line, bar, area, donut, progress bar), no charting library
- Light/dark theme, persisted per browser
- A full screen board (`board.html`) laying out all 48 screens with design notes on each
- A case-study canvas (`FinFlow Case Study.html`) covering research through final UI as one scrollable board

## Tech stack

React 18.3 and Babel Standalone from unpkg, no bundler, no package.json. Icons are Phosphor, fonts are Space Grotesk and Fraunces, both loaded from Google Fonts.

State is a handful of `useLocalStorage`-backed values (`ff-role`, `ff-screen`, `ff-theme`), no state management library. No backend, no database: `ui_kits/finflow/data.js` holds all the mock expenses, approvals, and vendor data as plain JS.

## Project structure

```
ui_kits/finflow/
  index.html           # entry point, role/screen state, screen directory
  mobile-app.html       # employee mobile flow
  data.js                # mock data
  layout.jsx             # sidebar + top nav
  charts.jsx              # Sparkline, LineChart, BarChart, AreaChart, Donut, ProgressBar
  tweaks-panel.jsx        # dev-only live design-token panel
  screens/                # dashboards.jsx, expenses.jsx, approvals.jsx, settings.jsx, mobile.jsx, misc.jsx, reports_cards_vendors.jsx
board.html               # all 48 screens as one Figma-style board
FinFlow Case Study.html   # case-study canvas viewer
case-study/                # case-study artifact components (research, personas, wireframes, design system, accessibility, final UI)
design-canvas.jsx           # shared canvas/artboard components used by the case-study viewer
foundations/
  colors_and_type.css       # design tokens
  components.css              # component classes
brand/                        # logo lockups, wordmark, logomark (SVG)
preview/                       # design-system reference pages
docs/                           # business context through outcomes and impact (12 documents)
screenshots/                     # screenshots used in this README
```

## Architecture

`onRole` and `onNavigate` in `index.html` are the whole router. `REACHABLE` is a plain object mapping each role to the screen IDs it can reach; switching roles checks the current screen against that set and redirects to the role's default if it's not reachable, so you can't get stranded on Vendors after switching to Employee. Screens are plain functions keyed by ID and rendered directly, no route matching library.

The `tweaks-panel.jsx` component listens for `postMessage` events (`__activate_edit_mode` and friends), a leftover hook for the design tool this was built in that lets an external host toggle a live token-editing panel. It's inert unless something posts those messages.

## Why I built it this way

Most expense tools design for one persona and bolt the others on. I mapped all three roles' journeys first and found where they collided (a manager approving 40 line items with no context, an admin unable to trace an approval back to who reviewed it), then built the navigation and the `REACHABLE` map around those collision points instead of a generic "expense object."

The audit log was originally three levels deep in Settings. Round-1 usability testing found only 50% of finance admins could locate it. I promoted it to a top-level nav item, and round 2 put that at 92%. Composite first-try task success across the product went from 73% to 89% between rounds, documented in full in `docs/11-outcomes-and-impact.md`.

## Getting started

Open `ui_kits/finflow/index.html` in any modern browser for the desktop app, or `ui_kits/finflow/mobile-app.html` for the employee mobile flow. No install, no build.

## Future improvements

- Replace the hand-rolled `useLocalStorage` role/screen state with real routing if this ever needs deep links to a specific screen
- The tweaks-panel `postMessage` protocol only does anything inside its original host tool; it's dead weight if this repo is opened standalone

## License

MIT

---

Naveen Sereddy · [naveensereddy.com](https://naveensereddy.com) · [github.com/Naveen-Sereddy](https://github.com/Naveen-Sereddy)
