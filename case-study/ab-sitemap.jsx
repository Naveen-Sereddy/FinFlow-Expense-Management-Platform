/* global React */
// Information architecture artboard — one top nav per role, everything else behind ⌘K.

function ArtboardSitemap() {
  const navs = [
    { role: "Finance admin", items: ["Dashboard", "Expenses", "Approvals", "Reimbursements", "Reports", "Cards", "Vendors"] },
    { role: "Manager", items: ["Team overview", "Approvals", "Team expenses", "Reports", "Budgets"] },
    { role: "Employee", items: ["My spend", "New expense", "My expenses", "My cards", "Reimbursements"] },
  ];

  const behindSearch = ["Settings (7 tabs)", "Policies", "Team & roles", "Integrations", "Audit log", "Notifications", "Help"];

  const rationale = [
    "No sidebar — a 12-item sidebar has room for everything, which is exactly the problem. It doesn't force the question of what actually gets used daily.",
    "Each role's top nav caps at 5–7 items: the destinations that account for nearly all real navigation. Everything else is one ⌘K away, not buried three clicks deep.",
    "Audit log, Settings, Policies, Integrations, Help — same treatment for all three roles. Low-frequency doesn't mean hidden, it means reachable by search instead of permanent chrome.",
    "One workspace, three top navs — switching role swaps the nav row and the dashboard composition, but topbar, search, and ⌘K stay in place.",
  ];

  return (
    <div className="ab">
      <div className="ab-head">
        <div className="ab-head__left">
          <div className="ab-eyebrow"><span className="num" style={{background:"var(--c-surface-2)"}}>03</span>Discovery · Information architecture</div>
          <h1 className="ab-title">One workspace, three top navs.</h1>
          <div className="ab-sub">Same brand, type system, and components serve all three roles — only the nav row and the dashboard's dominant element change per role.</div>
        </div>
        <div className="ab-head__right">
          <div className="ab-meta"><span className="ab-meta__k">Nav items per role</span><span className="ab-meta__v">5–7</span></div>
        </div>
      </div>

      <div className="ab-body" style={{overflow:"hidden"}}>
        <div style={{display:"grid", gridTemplateColumns:"repeat(3, 1fr) 1.1fr", gap:18, height:"100%"}}>
          {navs.map((s, i) => (
            <div key={i} style={{
              background:"var(--c-surface)", border:"1px solid var(--c-line)", borderRadius:12,
              padding:"16px 16px 14px", display:"flex", flexDirection:"column", gap:12,
            }}>
              <div style={{fontSize:12.5, fontWeight:600, color:"var(--c-ink)", paddingBottom:8, borderBottom:"1px solid var(--c-line)"}}>{s.role}</div>
              <div style={{display:"flex", flexDirection:"column", gap:5}}>
                <div style={{fontFamily:"var(--f-mono)", fontSize:9.5, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--c-ink-4)"}}>Top nav</div>
                {s.items.map((it, ii) => (
                  <div key={ii} style={{fontSize:11.5, color:"var(--c-ink-3)", padding:"5px 8px", borderRadius:6}}>{it}</div>
                ))}
              </div>
              <div style={{marginTop:"auto", paddingTop:8, borderTop:"1px solid var(--c-line)", fontSize:10.5, color:"var(--c-accent-2)", fontFamily:"var(--f-mono)"}}>+ ⌘K for everything else</div>
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
            <div style={{marginTop:"auto", paddingTop:10, borderTop:"1px solid var(--c-accent-line)", fontSize:11, color:"var(--c-ink-3)", lineHeight:1.5}}>
              Same behind-search set for every role: {behindSearch.join(" · ")}.
            </div>
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
