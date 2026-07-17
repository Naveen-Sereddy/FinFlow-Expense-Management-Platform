/* global React */
// Information architecture artboard — sidebar groups + the audit-log IA win.

function ArtboardSitemap() {
  const sidebars = [
    { role: "Finance admin", groups: [
      { label: "Workspace", items: ["Dashboard", "Expenses", "Approvals", "Reimbursements"] },
      { label: "Finance", items: ["Reports", "Cards", "Vendors", "Audit log"] },
      { label: "Configure", items: ["Policies", "Team & roles", "Integrations", "Settings"] },
    ]},
    { role: "Manager", groups: [
      { label: "Workspace", items: ["Team overview", "Approvals", "Team expenses"] },
      { label: "Insights", items: ["Reports", "Budgets"] },
      { label: "Account", items: ["Notifications", "Settings"] },
    ]},
    { role: "Employee", groups: [
      { label: "My work", items: ["My spend", "New expense", "My expenses", "Reimbursements"] },
      { label: "Account", items: ["My cards", "Notifications", "Help"] },
    ]},
  ];

  const rationale = [
    "Sidebar over top-nav — power users keep up to 12 items in muscle memory; horizontal nav can't hold that many.",
    "Group labels follow the mental model: Workspace (daily) vs. Configure (set up once) vs. Finance (weekly).",
    "Audit log promoted to top level — highest-impact IA decision in round-2 testing.",
    "One workspace, three sidebars — switching role re-renders the sidebar but keeps the user's spatial sense.",
  ];

  return (
    <div className="ab">
      <div className="ab-head">
        <div className="ab-head__left">
          <div className="ab-eyebrow"><span className="num" style={{background:"var(--c-surface-2)"}}>03</span>Discovery · Information architecture</div>
          <h1 className="ab-title">One workspace, three sidebars.</h1>
          <div className="ab-sub">Same brand, type system, and components serve all three roles — only the defaults change: which screen lands first, which density profile applies.</div>
        </div>
        <div className="ab-head__right">
          <div className="ab-meta"><span className="ab-meta__k">Find-audit-log task</span><span className="ab-meta__v" style={{color:"var(--c-success)"}}>50% → 92%</span></div>
        </div>
      </div>

      <div className="ab-body" style={{overflow:"hidden"}}>
        <div style={{display:"grid", gridTemplateColumns:"repeat(3, 1fr) 1.1fr", gap:18, height:"100%"}}>
          {sidebars.map((s, i) => (
            <div key={i} style={{
              background:"var(--c-surface)", border:"1px solid var(--c-line)", borderRadius:12,
              padding:"16px 16px 14px", display:"flex", flexDirection:"column", gap:12,
            }}>
              <div style={{fontSize:12.5, fontWeight:600, color:"var(--c-ink)", paddingBottom:8, borderBottom:"1px solid var(--c-line)"}}>{s.role}</div>
              {s.groups.map((g, gi) => (
                <div key={gi} style={{display:"flex", flexDirection:"column", gap:5}}>
                  <div style={{fontFamily:"var(--f-mono)", fontSize:9.5, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--c-ink-4)"}}>{g.label}</div>
                  {g.items.map((it, ii) => (
                    <div key={ii} style={{
                      fontSize:11.5, color: it === "Audit log" ? "var(--c-accent-2)" : "var(--c-ink-3)",
                      padding:"5px 8px", borderRadius:6,
                      background: it === "Audit log" ? "var(--c-accent-tint)" : "transparent",
                      border: it === "Audit log" ? "1px solid var(--c-accent-line)" : "1px solid transparent",
                    }}>{it}</div>
                  ))}
                </div>
              ))}
            </div>
          ))}

          <div style={{
            background:"var(--c-accent-tint)", border:"1px solid var(--c-accent-line)", borderRadius:12,
            padding:"18px 18px 16px", display:"flex", flexDirection:"column", gap:12,
          }}>
            <div style={{fontFamily:"var(--f-mono)", fontSize:10, letterSpacing:"0.12em", textTransform:"uppercase", color:"var(--c-accent-2)"}}>Navigation rationale</div>
            {rationale.map((r, i) => (
              <div key={i} style={{display:"flex", gap:8, fontSize:12, color:"var(--c-ink)", lineHeight:1.5}}>
                <span style={{color:"var(--c-accent-2)", flexShrink:0}}>{String(i+1).padStart(2,"0")}</span>
                <span>{r}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="ab-foot">
        <div className="brand"><span className="dot"></span> FinFlow · Concept Case Study · 2026</div>
        <div>Discovery · Information architecture</div>
      </div>
    </div>
  );
}

window.ArtboardSitemap = ArtboardSitemap;
