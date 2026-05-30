/* FinFlow Demo Data
   Fictional company: Arcadia Labs (Series B SaaS, 250 people, San Francisco).
   Primary persona: Maren Okafor — Director of Finance.
   All data consistent across screens.
*/

window.FF_DATA = (() => {
  const company = {
    name: "Arcadia Labs",
    employees: 248,
    stage: "Series B",
    fiscalYear: "FY 2026",
    accent: "Plum"
  };

  const me = {
    finance: { name: "Maren Okafor", title: "Director of Finance", initials: "MO", email: "maren@arcadialabs.co", role: "Finance Admin" },
    manager: { name: "Theo Vasquez",  title: "Head of Sales",        initials: "TV", email: "theo@arcadialabs.co",  role: "Manager" },
    employee:{ name: "Iris Chen",     title: "Senior PMM",            initials: "IC", email: "iris@arcadialabs.co",  role: "Employee" }
  };

  const categories = [
    { id: "sw",  name: "Software",       color: "var(--ff-chart-1)" },
    { id: "tr",  name: "Travel",         color: "var(--ff-chart-2)" },
    { id: "me",  name: "Meals",          color: "var(--ff-chart-3)" },
    { id: "ad",  name: "Advertising",    color: "var(--ff-chart-4)" },
    { id: "of",  name: "Office",         color: "var(--ff-chart-5)" },
    { id: "co",  name: "Contractors",    color: "var(--ff-chart-6)" }
  ];

  const vendors = [
    { id: "v1", name: "Figma",            cat: "sw", spend: 18420, change:  4.2 },
    { id: "v2", name: "AWS",              cat: "sw", spend: 41280, change:  9.1 },
    { id: "v3", name: "United Airlines",  cat: "tr", spend: 23715, change: -2.4 },
    { id: "v4", name: "Notion",           cat: "sw", spend:  3960, change:  0.8 },
    { id: "v5", name: "Blue Bottle",      cat: "me", spend:  1820, change: 12.0 },
    { id: "v6", name: "Reforge",          cat: "sw", spend:  8400, change:  0.0 },
    { id: "v7", name: "Marriott",         cat: "tr", spend: 14280, change: -5.5 },
    { id: "v8", name: "Lyft",             cat: "tr", spend:  4810, change:  3.1 },
    { id: "v9", name: "Webflow",          cat: "sw", spend:  2940, change:  6.7 },
    { id: "v10",name: "Eventbrite",       cat: "ad", spend:  6420, change: -1.2 }
  ];

  const employees = [
    { name: "Iris Chen",       initials: "IC", team: "Marketing", spend:  4280 },
    { name: "Dev Patel",       initials: "DP", team: "Eng",       spend:  9120 },
    { name: "Luna Park",       initials: "LP", team: "Sales",     spend: 11840 },
    { name: "Jonas Hale",      initials: "JH", team: "Sales",     spend:  8760 },
    { name: "Mira Solberg",    initials: "MS", team: "Design",    spend:  2940 },
    { name: "Asa Brown",       initials: "AB", team: "Eng",       spend:  6210 },
    { name: "Ren Tanaka",      initials: "RT", team: "Ops",       spend:  3180 },
    { name: "Kai Mendes",      initials: "KM", team: "Sales",     spend:  9890 }
  ];

  // Expenses — consistent IDs used across detail / approvals
  const expenses = [
    { id: "EXP-2841", date: "2026-05-22", merchant: "United Airlines",  amount:  842.50, cat: "tr", who: "Luna Park",      status: "pending",  policy: "ok",      cardLast4: "4112", memo: "SF → Austin (sales kickoff)" },
    { id: "EXP-2840", date: "2026-05-22", merchant: "Figma",             amount:  180.00, cat: "sw", who: "Mira Solberg",   status: "approved", policy: "ok",      cardLast4: "9032", memo: "Pro seats × 2" },
    { id: "EXP-2839", date: "2026-05-21", merchant: "Marriott Austin",   amount: 1240.00, cat: "tr", who: "Luna Park",      status: "flagged",  policy: "over",    cardLast4: "4112", memo: "3 nights — exceeds $300/night cap" },
    { id: "EXP-2838", date: "2026-05-21", merchant: "Blue Bottle",       amount:   42.80, cat: "me", who: "Iris Chen",      status: "approved", policy: "ok",      cardLast4: "9032", memo: "Team coffee, Q2 review" },
    { id: "EXP-2837", date: "2026-05-20", merchant: "AWS",               amount: 3204.18, cat: "sw", who: "Dev Patel",      status: "approved", policy: "ok",      cardLast4: "4112", memo: "Monthly infra" },
    { id: "EXP-2836", date: "2026-05-20", merchant: "Lyft",              amount:   38.60, cat: "tr", who: "Asa Brown",      status: "pending",  policy: "ok",      cardLast4: "4112", memo: "Client visit" },
    { id: "EXP-2835", date: "2026-05-19", merchant: "Webflow",           amount:  290.00, cat: "sw", who: "Mira Solberg",   status: "pending",  policy: "needs",   cardLast4: "9032", memo: "Missing receipt" },
    { id: "EXP-2834", date: "2026-05-19", merchant: "Reforge",           amount:  995.00, cat: "sw", who: "Iris Chen",      status: "approved", policy: "ok",      cardLast4: "9032", memo: "PMM intensive course" },
    { id: "EXP-2833", date: "2026-05-18", merchant: "Notion",            amount:   88.00, cat: "sw", who: "Ren Tanaka",     status: "approved", policy: "ok",      cardLast4: "4112", memo: "Plus seat" },
    { id: "EXP-2832", date: "2026-05-18", merchant: "Eventbrite",        amount:  640.00, cat: "ad", who: "Iris Chen",      status: "rejected", policy: "violate", cardLast4: "9032", memo: "Sponsorship — needs CMO sign-off" },
    { id: "EXP-2831", date: "2026-05-17", merchant: "United Airlines",   amount:  516.00, cat: "tr", who: "Kai Mendes",     status: "approved", policy: "ok",      cardLast4: "4112", memo: "Client onsite — Seattle" },
    { id: "EXP-2830", date: "2026-05-17", merchant: "WeWork",            amount:  220.00, cat: "of", who: "Jonas Hale",     status: "approved", policy: "ok",      cardLast4: "4112", memo: "Day pass, NY office" },
    { id: "EXP-2829", date: "2026-05-16", merchant: "Marriott SF",       amount:  389.00, cat: "tr", who: "Theo Vasquez",   status: "pending",  policy: "ok",      cardLast4: "4112", memo: "Customer summit overflow" },
    { id: "EXP-2828", date: "2026-05-16", merchant: "Slack",             amount:  149.00, cat: "sw", who: "Dev Patel",      status: "approved", policy: "ok",      cardLast4: "4112", memo: "Pro plan add-on" }
  ];

  // Spend over time — last 12 weeks (in thousands)
  const spendOverTime = [
    { w: "W11", v: 38.2 }, { w: "W12", v: 41.7 }, { w: "W13", v: 36.4 },
    { w: "W14", v: 44.9 }, { w: "W15", v: 49.1 }, { w: "W16", v: 47.5 },
    { w: "W17", v: 52.3 }, { w: "W18", v: 58.1 }, { w: "W19", v: 54.6 },
    { w: "W20", v: 61.4 }, { w: "W21", v: 64.8 }, { w: "W22", v: 67.2 }
  ];

  // Category breakdown YTD ($ thousands)
  const categoryBreakdown = [
    { cat: "sw", value: 184.2 },
    { cat: "tr", value: 142.7 },
    { cat: "me", value:  38.1 },
    { cat: "ad", value:  74.6 },
    { cat: "of", value:  22.4 },
    { cat: "co", value:  91.0 }
  ];

  // Cumulative (area)
  const cumulative = [
    { m: "Jan", v: 86  }, { m: "Feb", v: 172 }, { m: "Mar", v: 252 },
    { m: "Apr", v: 348 }, { m: "May", v: 553 }
  ];

  // Budget vs spent
  const budgets = [
    { label: "Software",     budget: 240,  spent: 184.2 },
    { label: "Travel",       budget: 180,  spent: 142.7 },
    { label: "Advertising",  budget:  90,  spent:  74.6 },
    { label: "Contractors",  budget: 100,  spent:  91.0 }
  ];

  const cards = [
    { id: "c1", holder: "Maren Okafor",  last4: "0021", limit: 25000, spent:  8420, status: "active",  type: "physical" },
    { id: "c2", holder: "Iris Chen",     last4: "9032", limit:  5000, spent:  2310, status: "active",  type: "virtual"  },
    { id: "c3", holder: "Luna Park",     last4: "4112", limit: 10000, spent:  7780, status: "active",  type: "physical" },
    { id: "c4", holder: "Vendor: AWS",   last4: "7710", limit:  8000, spent:  3204, status: "active",  type: "virtual"  },
    { id: "c5", holder: "Dev Patel",     last4: "1145", limit:  4000, spent:    62, status: "frozen",  type: "virtual"  },
    { id: "c6", holder: "Mira Solberg",  last4: "6628", limit:  3000, spent:  1820, status: "active",  type: "virtual"  }
  ];

  const reimbursements = [
    { id: "RB-104", who: "Iris Chen",   amount: 320.40, status: "scheduled", date: "2026-05-30" },
    { id: "RB-103", who: "Luna Park",   amount:  82.00, status: "paid",      date: "2026-05-23" },
    { id: "RB-102", who: "Dev Patel",   amount: 218.50, status: "paid",      date: "2026-05-21" },
    { id: "RB-101", who: "Asa Brown",   amount:  64.20, status: "pending",   date: "2026-05-27" }
  ];

  // KPIs
  const kpis = {
    finance: [
      { label: "Spend MTD",       value: "$284,120", delta: "+12.4% vs Apr", trend: "up" },
      { label: "Pending Approvals", value: "37",      delta: "8 over 48h",      trend: "down" },
      { label: "Policy Flags",    value: "9",        delta: "−2 this week",    trend: "up" },
      { label: "Cash Available",  value: "$1.82M",   delta: "62 days runway",  trend: "neutral" }
    ],
    manager: [
      { label: "Team Spend MTD",  value: "$48,210",  delta: "+6.1%",           trend: "up" },
      { label: "Awaiting You",    value: "8",        delta: "Oldest: 2d",      trend: "down" },
      { label: "Avg. Approval",   value: "6h 12m",   delta: "−1h vs last wk",  trend: "up" },
      { label: "Team Budget",     value: "82%",      delta: "$8.6K remaining", trend: "neutral" }
    ],
    employee: [
      { label: "My Spend MTD",    value: "$2,184",   delta: "−$320 vs Apr",    trend: "up" },
      { label: "Reimbursable",    value: "$320.40",  delta: "Scheduled May 30",trend: "neutral" },
      { label: "Card Balance",    value: "$2,690",   delta: "of $5,000 limit", trend: "neutral" },
      { label: "Open Items",      value: "2",        delta: "1 missing receipt",trend: "down" }
    ]
  };

  const policies = [
    { name: "Hotel — domestic",       limit: "$300 / night", scope: "All",       lastEdit: "Apr 12" },
    { name: "Hotel — international",  limit: "$420 / night", scope: "All",       lastEdit: "Apr 12" },
    { name: "Meals — per diem",       limit: "$75 / day",    scope: "All",       lastEdit: "Mar 02" },
    { name: "Software — recurring",   limit: "Admin approval needed", scope: "All", lastEdit: "Feb 19" },
    { name: "Advertising sponsorships", limit: "$500 → CMO sign-off", scope: "Marketing", lastEdit: "May 03" }
  ];

  const integrations = [
    { name: "QuickBooks",  status: "connected", lastSync: "12 min ago", icon: "stack" },
    { name: "Mercury",     status: "connected", lastSync: "Just now",   icon: "bank"  },
    { name: "Brex",        status: "available", lastSync: "—",          icon: "credit-card" },
    { name: "NetSuite",    status: "available", lastSync: "—",          icon: "buildings" },
    { name: "Slack",       status: "connected", lastSync: "8 min ago",  icon: "chats" },
    { name: "Okta SSO",    status: "connected", lastSync: "2 hr ago",   icon: "shield-check" }
  ];

  const auditEntries = [
    { ts: "2026-05-22 14:22", actor: "Maren Okafor",  action: "Approved",        target: "EXP-2840 · Figma · $180.00" },
    { ts: "2026-05-22 14:18", actor: "Theo Vasquez",  action: "Flagged",         target: "EXP-2839 · Marriott Austin · $1,240.00" },
    { ts: "2026-05-22 11:02", actor: "System",        action: "Policy Check",    target: "EXP-2835 · Webflow — receipt missing" },
    { ts: "2026-05-22 09:47", actor: "Iris Chen",     action: "Submitted",       target: "EXP-2838 · Blue Bottle · $42.80" },
    { ts: "2026-05-21 17:33", actor: "Maren Okafor",  action: "Edited Policy",   target: "Advertising sponsorships → $500 → CMO sign-off" },
    { ts: "2026-05-21 16:09", actor: "Maren Okafor",  action: "Issued Card",     target: "Virtual card · Mira Solberg · $3,000 limit" },
    { ts: "2026-05-21 10:14", actor: "Okta SSO",      action: "Sign-in",         target: "Maren Okafor (SSO)" }
  ];

  const notifications = [
    { ts: "12m", kind: "approval",   text: "Luna Park submitted EXP-2841 — $842.50 (Travel)" },
    { ts: "1h",  kind: "policy",     text: "EXP-2839 over hotel cap — Marriott Austin, $1,240" },
    { ts: "3h",  kind: "payout",     text: "Reimbursement RB-104 scheduled for May 30" },
    { ts: "1d",  kind: "card",       text: "AWS virtual card auto-renewed for May" },
    { ts: "2d",  kind: "report",     text: "Monthly close packet ready — April FY26" }
  ];

  return { company, me, categories, vendors, employees, expenses, spendOverTime, categoryBreakdown, cumulative, budgets, cards, reimbursements, kpis, policies, integrations, auditEntries, notifications };
})();
