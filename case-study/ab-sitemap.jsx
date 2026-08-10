/* global React */
// Information architecture artboard — one top nav per role, everything else behind ⌘K.
// Rebuilt entirely in FinFlow's own design system (slate blue + cream + General Sans),
// not the case-study deck's presentation identity — this artboard IS a product screen.

function ArtboardSitemap() {
  const navs = [
    { role: "Finance admin", items: ["Dashboard", "Expenses", "Approvals", "Reimbursements", "Reports", "Cards", "Vendors"] },
    { role: "Manager", items: ["Team overview", "Approvals", "Team expenses", "Reports", "Budgets"] },
    { role: "Employee", items: ["My spend", "New expense", "My expenses", "My cards", "Reimbursements"] },
  ];

  const behindSearch = ["Settings (7 tabs)", "Policies", "Team & roles", "Integrations", "Audit log", "Notifications", "Help"];

  const rationale = [
    "No sidebar. A 12-item sidebar has room for everything, which is exactly the problem. It doesn't force the question of what actually gets used daily.",
    "Each role's top nav caps at 5 to 7 items: the destinations that account for nearly all real navigation. Everything else is one ⌘K away, not buried three clicks deep.",
    "Audit log, Settings, Policies, Integrations, Help get the same treatment for all three roles. Low frequency doesn't mean hidden, it means reachable by search instead of permanent chrome.",
    "One workspace, three top navs. Switching role swaps the nav row and the dashboard composition, but topbar, search, and ⌘K stay in place.",
  ];

  return (
    <div className="ab" style={{background:"var(--p-paper)"}}>
      <div className="ab-head" style={{borderBottom:"1px solid var(--p-line)"}}>
        <div className="ab-head__left">
          <div style={{fontFamily:"var(--f-mono)", fontSize:11, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--p-accent)", display:"flex", alignItems:"center", gap:8, marginBottom:10}}>
            <span style={{background:"var(--p-accent)", color:"#fff", borderRadius:4, padding:"2px 7px", fontWeight:700}}>03</span>Discovery · Information architecture
          </div>
          <h1 style={{fontFamily:"var(--p-font)", fontSize:32, fontWeight:600, color:"var(--p-ink)", margin:0, letterSpacing:"-0.01em"}}>One workspace, three top navs.</h1>
          <div style={{fontFamily:"var(--p-font)", fontSize:14, color:"var(--p-ink-3)", marginTop:8, maxWidth:600, lineHeight:1.5}}>Same brand, type system, and components serve all three roles, only the nav row and the dashboard's dominant element change per role.</div>
        </div>
        <div className="ab-head__right">
          <div style={{textAlign:"right"}}>
            <div style={{fontFamily:"var(--f-mono)", fontSize:9.5, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--p-ink-3)"}}>Nav items per role</div>
            <div style={{fontFamily:"var(--p-font)", fontSize:15, fontWeight:600, color:"var(--p-ink)"}}>5–7</div>
          </div>
        </div>
      </div>

      <div className="ab-body" style={{overflow:"hidden", background:"var(--p-paper)"}}>
        <div style={{display:"grid", gridTemplateColumns:"repeat(3, 1fr) 1.1fr", gap:18, height:"100%"}}>
          {navs.map((s, i) => (
            <div key={i} style={{
              background:"#FFFFFF", border:"1px solid var(--p-line)", borderRadius:12,
              padding:"16px 16px 14px", display:"flex", flexDirection:"column", gap:12, fontFamily:"var(--p-font)",
            }}>
              <div style={{fontSize:12.5, fontWeight:600, color:"var(--p-ink)", paddingBottom:8, borderBottom:"1px solid var(--p-line)"}}>{s.role}</div>
              <div style={{display:"flex", flexDirection:"column", gap:5}}>
                <div style={{fontFamily:"var(--f-mono)", fontSize:9.5, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--p-ink-3)"}}>Top nav</div>
                {s.items.map((it, ii) => (
                  <div key={ii} style={{fontSize:11.5, color:"var(--p-ink)", padding:"5px 8px", borderRadius:6}}>{it}</div>
                ))}
              </div>
              <div style={{marginTop:"auto", paddingTop:8, borderTop:"1px solid var(--p-line)", fontSize:10.5, color:"var(--p-accent)", fontFamily:"var(--f-mono)"}}>+ ⌘K for everything else</div>
            </div>
          ))}

          <div style={{
            background:"#FFFFFF", border:"1px solid var(--p-line)", borderRadius:12,
            padding:"18px 18px 16px", display:"flex", flexDirection:"column", gap:12, fontFamily:"var(--p-font)",
          }}>
            <div style={{fontFamily:"var(--f-mono)", fontSize:10, letterSpacing:"0.12em", textTransform:"uppercase", color:"var(--p-accent)"}}>Navigation rationale</div>
            {rationale.map((r, i) => (
              <div key={i} style={{display:"flex", gap:8, fontSize:12, color:"var(--p-ink)", lineHeight:1.5}}>
                <span style={{color:"var(--p-accent)", flexShrink:0}}>{String(i+1).padStart(2,"0")}</span>
                <span>{r}</span>
              </div>
            ))}
            <div style={{marginTop:"auto", paddingTop:10, borderTop:"1px solid var(--p-line)", fontSize:11, color:"var(--p-ink-3)", lineHeight:1.5}}>
              Same behind-search set for every role: {behindSearch.join(" · ")}.
            </div>
          </div>
        </div>
      </div>

      <div className="ab-foot" style={{borderTop:"1px solid var(--p-line)"}}>
        <div className="brand" style={{color:"var(--p-ink-3)"}}><span className="dot" style={{background:"var(--p-accent)"}}></span> FinFlow · Concept Case Study · 2026</div>
        <div style={{color:"var(--p-ink-3)"}}>Discovery · Information architecture</div>
      </div>
    </div>
  );
}

window.ArtboardSitemap = ArtboardSitemap;
