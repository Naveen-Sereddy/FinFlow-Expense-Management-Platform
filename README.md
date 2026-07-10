# FinFlow — B2B Expense Management Platform

**Live case study:** [naveensereddy.com/case-finflow](https://naveensereddy.com/case-finflow)

A UX case study built around a real problem finance teams deal with constantly: expense reports that get stuck in approval limbo, spreadsheets nobody trusts, and finance leads who can't answer "what did we spend this quarter" without a week of digging.

FinFlow is my answer to that — a B2B expense management platform designed for three different people who all touch the same expense: the employee submitting it, the manager approving it, and the finance admin who has to reconcile, audit, and report on all of it.

## Why I built it this way

Most expense tools I looked at design for one persona and bolt the others on. I started from the opposite direction — I mapped all three roles' journeys first, found where they collided (a manager approving 40 line items with no context, an admin unable to trace an approval back to who actually reviewed it), and designed the information architecture around those collision points instead of around a generic "expense object."

That's also why the case study leans heavily on usability testing rather than just visual polish. I ran two rounds — the first surfaced a task-completion rate of 73%, mostly people getting lost in the approval flow. Second round, after restructuring the approval queue and adding inline context, that jumped to 89%.

## What's in this repo

- **`docs/`** — the actual research: business context, discovery notes, personas, user journeys, IA decisions, before/after analysis, and the outcomes writeup
- **`ui_kits/`** — the design system used across all three role-based views (admin dashboard, manager approvals, employee submission flow)
- **A working interactive prototype** — built in React so the flows are actually clickable, not just static Figma frames

## Role I played

Full UX process end to end: competitive research, user interviews, persona development, information architecture, interaction design, the design system, an accessibility pass, and two rounds of moderated usability testing to validate (and then fix) the approval flow.

## Tools

Figma for design, Maze for the usability testing, React for the interactive prototype.

---

Naveen Sereddy — [naveensereddy.com](https://naveensereddy.com) · [github.com/Naveen-Sereddy](https://github.com/Naveen-Sereddy)
