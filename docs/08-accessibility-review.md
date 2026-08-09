# 08 · Accessibility Review

## Accessibility Goals

FinFlow targets **WCAG 2.1 AA** across both themes. This review documents a production-readiness pass performed against the shipped build — findings traced to specific files, fixed, and re-verified — not a generic checklist.

## WCAG Considerations

| Principle | Implementation |
|---|---|
| **Perceivable** | Charts carry real `<title>` + `role="img"` + `aria-label`; status pairs icon + text, never color alone; tabular figures for scanning |
| **Operable** | ⌘K with real arrow-key roving focus; icon-only buttons carry `aria-label`; chart data points are keyboard-focusable; 44px minimum touch targets on mobile |
| **Understandable** | Predictable nav across roles; consistent content order on every page; form labels always visible (eyebrow style above each field) |
| **Robust** | Semantic HTML (`<table>`, `<button>`, `<nav>`, headings); a native `<button>` used even for the mobile tab-bar's center action, not a styled `<div>` |

## Contrast — documented in the token file, not estimated

| Pair | Ratio | Result |
|---|---|---|
| Primary button (white text on slate blue) | 6.75:1 | AA |
| Near-black text on the same slate blue | 2.93:1 | Fails — the reason button foreground is white, not the default ink color |
| Status badge foreground on its own background | ≥ 7:1 | AAA, every one of the 7 semantic groups |

## Findings from the production-readiness audit, and what changed

This is the honest version: a self-directed audit of the shipped build surfaced real gaps, each one fixed and re-verified, not assumed away.

| Finding | Fix |
|---|---|
| Focus ring was two different things — buttons used a global outline, inputs had their own separate box-shadow color | Unified on one `--ff-focus-ring` token, applied via `box-shadow` on `:focus-visible` everywhere, including inputs |
| Every chart was an unlabeled `<svg>` | Added `<title>` + `role="img"` + `aria-label` to Sparkline, LineChart, BarChart, AreaChart, Donut |
| Line/Area chart values were only readable by eyeballing gridlines | Added hover **and** keyboard-focus tooltips with the exact value per data point |
| At least 5 icon-only buttons had no accessible name (row overflow menus, mobile close/back controls, notification settings) | Added a specific `aria-label` to each, individually — not a batch guess |
| A mobile tab-bar action was a clickable `<div>`, not keyboard-focusable | Converted to a real `<button>` |
| `.ff-tooltip` only revealed content on `:hover` | Added `:focus-within` so keyboard focus reveals it too |
| Chart components crashed on an empty data array (`Math.max([])` → `NaN`) | Added an explicit empty-state guard to every chart primitive |
| Command palette advertised arrow-key navigation it didn't implement | Built real roving-focus arrow-key navigation + Enter-to-select |

## Keyboard Navigation

- **⌘K / Ctrl-K** opens the screen directory — focused input, real arrow-key roving focus, Enter to select, Esc to close
- Chart data points are individually focusable via Tab, revealing the same tooltip a mouse hover would
- No keyboard traps found outside modals

## Known Gaps — Not Hidden

| Item | Why it's not fixed yet |
|---|---|
| Table rows that navigate on click aren't keyboard-focusable | Repeats across most list screens — needs a coordinated fix, not a patch per screen |
| No pagination on any table | Fine at mock-data scale; needs a real component plus a backend page contract |
| No slide-over drawer for reviewing a list item | Every detail view is a full navigation away and back |
| Date-range control on Expenses is a static label | Not wired to real filtering logic yet |

## Testing Approach

- **Automated:** a scripted sweep drives every one of the 47 screens across all 3 roles and both themes, checking for console errors and empty renders after every change
- **Manual:** keyboard-only pass through the command palette, chart tooltips, and icon-only buttons listed above, confirmed working end to end
- **Contrast:** verified against the values documented directly in `foundations/colors_and_type.css`, not eyeballed
