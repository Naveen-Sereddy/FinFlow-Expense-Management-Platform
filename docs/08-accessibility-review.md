# 08 · Accessibility Review

## Accessibility Goals

FinFlow targets **WCAG 2.1 AA** across both themes from day one. This was a non-negotiable scope decision: a financial product cannot ship inaccessible.

## WCAG Considerations

| Principle | Implementation |
|---|---|
| **Perceivable** | Non-text content has labels (SVG marks carry `aria-label`); color paired with icon + text for status; tabular figures for scanning |
| **Operable** | Keyboard reachable everywhere (⌘K, tab order, focus traps in modals); 44px minimum touch targets; no time-limited interactions |
| **Understandable** | Predictable nav across roles; error states use plain language; form labels persistent (uppercase eyebrow style above each field) |
| **Robust** | Semantic HTML (`<table>`, `<button>`, `<nav>`, `<main>`, headings); ARIA only where semantics fall short |

## Contrast Review

Every foreground / background pair was audited in both themes. Sampled pairs:

| Pair | Light | Dark | WCAG |
|---|---|---|---|
| Body text on background | 14.1:1 | 13.6:1 | AAA |
| Muted text on background | 5.8:1 | 4.9:1 | AA |
| Subtle text on background | 4.6:1 | 4.5:1 | AA (minimum) |
| Primary button (text on plum) | 8.4:1 | 9.1:1 | AAA |
| Approved badge | 5.2:1 | 6.0:1 | AA |
| Pending badge | 4.7:1 | 5.4:1 | AA |
| Rejected badge | 5.3:1 | 5.8:1 | AA |
| Flagged badge | 5.1:1 | 5.6:1 | AA |
| Border on background | 1.3:1 | 1.4:1 | (non-text, decorative) |
| Focus ring on background | 3.6:1 | 3.4:1 | ≥ 3:1 required |

Two items flagged for improvement:
- The subtle text role (`--ff-fg-subtle`) sits exactly at 4.5:1 — bumping to 4.7:1 buffers against rendering variance
- The "Flagged" badge in dark theme is the narrowest pass

## Keyboard Navigation

- **⌘K / Ctrl-K** opens the screen directory (focused input, arrow keys to navigate, Enter to select, Esc to close)
- **Tab order** respects visual reading order on every page
- Modals trap focus via JS (focus returned to the trigger on close)
- All buttons, links, inputs, switches, and tabs are keyboard reachable
- No keyboard traps outside modals

## Focus States

- Single token: `:focus-visible { outline: 2px solid var(--ff-plum-500); outline-offset: 2px; }`
- Verified visible on: buttons, ghost buttons, icon buttons, inputs, selects, textareas, switches, sidebar nav items, tabs, chips, table rows (where rows are interactive), the segmented control
- Outline offset ensures the ring doesn't get hidden by adjacent borders

**Gap found:** segmented-control buttons in the topbar didn't have `:focus-visible` styling at first; added to the audit fix list and corrected.

## Form Accessibility

- Every input has a programmatically associated label (the eyebrow above the field)
- Required fields use `required` attribute + a visible asterisk in the label
- Errors are described with `aria-describedby` pointing at the helper-text element below
- Placeholder text is never the only label (it carries example content only)
- Switches use `role="switch"` and `aria-checked`
- Segmented controls use `aria-pressed` to communicate selection
- Tabs use `aria-selected` on the active tab and `role="tablist"` / `role="tab"`

## Responsive Accessibility

- Touch targets on mobile are ≥ 44×44 px (Apple HIG minimum; exceeds WCAG 2.5.5 24×24 minimum)
- Mobile tabbar items are 56×56 with a visually distinct center action button
- The phone-frame status bar in mocks is decorative and aria-hidden
- Mobile typography starts at 14px body; never smaller than 11px (meta)

## Screen Reader Considerations

- Brand SVG marks include `<title>` and `aria-label="FinFlow"`
- Status badges read as "Approved · check icon" naturally because the icon `<i>` is `aria-hidden` and the label is a visible text node
- Table headers use `<th scope="col">`
- Decorative icons (sidebar nav, KPI deltas) carry `aria-hidden="true"`
- The KPI value pairs the label and number with a single landmark structure
- Modals use `role="dialog"` + `aria-modal="true"` + `aria-labelledby` pointing at the title

## Recommended Improvements

| Item | Severity | Plan |
|---|---|---|
| Add a skip-link at the top of the page (`Skip to content`) | Medium | v1.1 |
| Move the dashboard "data updated 2m ago" label into an `aria-live="polite"` region so screen-reader users hear refresh | Low | v1.1 |
| Provide an explicit "high-contrast" theme variant (4.7:1 minimum across the board) | Low | v1.2 |
| Add `aria-live` updates on the bulk-approve "X selected · total $Y" counter | Medium | v1.1 |
| Lift focus to the page H1 on route change | Medium | v1.0 patch |
| Audit charts with `role="img"` and a hidden text description | Medium | v1.1 |

## Testing Approach

- **Automated:** axe-core run in CI, blocking on AA violations
- **Manual:** keyboard-only sweep of each role-aware top-level surface
- **Screen reader:** VoiceOver (macOS) on dashboard, expense detail, approvals queue, and mobile submission flow
- **Color blindness:** simulated deuteranopia and protanopia on the status badge set + chart palette

All four passed for v1, with the recommended improvements above scheduled for v1.1.
