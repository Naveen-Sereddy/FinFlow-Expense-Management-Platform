/* global React */
// Mid-fidelity wireframes — real labels + the decisions behind two key screens.
// Rebuilt entirely in FinFlow's own design system (slate blue + cream + General Sans).

function ArtboardMidFi() {
  const decisions = [
    {
      area: "Dashboard",
      problem: "Four equal KPI cards plus a chart is the layout every competitor ships, it reads as generated, not designed, and doesn't say which number matters most today.",
      options: ["Card-grid of widgets (configurable)", "Four equal KPI cards + one chart", "One hero number + a compact inline stat row"],
      decision: "One oversized hero KPI (spend MTD, with a sparkline) next to a compact three-item stat row, then an asymmetric chart split (trend line wider than the budget/category column), then two borderless tables.",
      impact: "The eye lands on one number first, not four competing for attention, and no two of the three dashboards (Finance Admin, Manager, Employee) share the same skeleton.",
    },
    {
      area: "Approvals",
      problem: "Most approvals are in-policy, low-effort decisions; a few need real review, the UI shouldn't force opening every item to find out which is which.",
      options: ["Kanban (Pending/Approved/Rejected)", "Dense list, bulk bar only after a row is selected", "Dense list, selection state always visible"],
      decision: "A persistent selection bar above the list, running count and total, not just an action bar that appears after the fact, plus a policy-violation chip inline on every row so triage doesn't require opening anything.",
      impact: "The policy result is readable from the row itself; bulk-approving in-policy items never requires a detail view.",
    },
  ];

  return (
    <div className="ab" style={{background:"var(--p-paper)"}}>
      <div className="ab-head" style={{borderBottom:"1px solid var(--p-line)"}}>
        <div className="ab-head__left">
          <div style={{fontFamily:"var(--f-mono)", fontSize:11, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--p-accent)", display:"flex", alignItems:"center", gap:8, marginBottom:10}}>
            <span style={{background:"var(--p-accent)", color:"#fff", borderRadius:4, padding:"2px 7px", fontWeight:700}}>05</span>Design · Mid-fi wireframes
          </div>
          <h1 style={{fontFamily:"var(--p-font)", fontSize:32, fontWeight:600, color:"var(--p-ink)", margin:0, letterSpacing:"-0.01em"}}>Real labels, real tradeoffs.</h1>
          <div style={{fontFamily:"var(--p-font)", fontSize:14, color:"var(--p-ink-3)", marginTop:8, maxWidth:600, lineHeight:1.5}}>Component structure and copy validated against the approval and dashboard flows before final UI, each option weighed against the actual research findings.</div>
        </div>
        <div className="ab-head__right">
          <div style={{textAlign:"right"}}>
            <div style={{fontFamily:"var(--f-mono)", fontSize:9.5, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--p-ink-3)"}}>Decisions documented</div>
            <div style={{fontFamily:"var(--p-font)", fontSize:15, fontWeight:600, color:"var(--p-ink)"}}>2 shown here</div>
          </div>
        </div>
      </div>

      <div className="ab-body" style={{overflow:"hidden", background:"var(--p-paper)"}}>
        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:20, height:"100%", fontFamily:"var(--p-font)"}}>
          {decisions.map((d, i) => (
            <div key={i} style={{
              background:"#FFFFFF", border:"1px solid var(--p-line)", borderRadius:14,
              padding:"18px 20px", display:"flex", flexDirection:"column", gap:12, overflow:"auto",
            }}>
              <div style={{fontSize:14, fontWeight:600, color:"var(--p-ink)"}}>{d.area}</div>
              <div style={{fontSize:12, color:"var(--p-ink-3)", lineHeight:1.5}}>{d.problem}</div>

              <div>
                <div style={{fontFamily:"var(--f-mono)", fontSize:9.5, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--p-ink-3)", marginBottom:6}}>Options considered</div>
                <div style={{display:"flex", flexDirection:"column", gap:5}}>
                  {d.options.map((o, oi) => (
                    <div key={oi} style={{
                      fontSize:11.5, color:"var(--p-ink-3)", padding:"6px 10px", borderRadius:6,
                      background:"var(--p-paper)", border:"1px solid var(--p-line)",
                    }}>{o}</div>
                  ))}
                </div>
              </div>

              <div style={{
                background:"#EDF3FC", border:"1px solid var(--p-line)", borderRadius:10,
                padding:"12px 14px",
              }}>
                <div style={{fontFamily:"var(--f-mono)", fontSize:9.5, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--p-accent)", marginBottom:5}}>Final decision</div>
                <div style={{fontSize:12, color:"var(--p-ink)", lineHeight:1.5}}>{d.decision}</div>
              </div>

              <div style={{marginTop:"auto", paddingTop:10, borderTop:"1px solid var(--p-line)", display:"flex", alignItems:"baseline", justifyContent:"space-between"}}>
                <span style={{fontFamily:"var(--f-mono)", fontSize:9.5, color:"var(--p-ink-3)"}}>Expected impact</span>
                <span style={{fontSize:12, fontWeight:600, color:"#005603"}}>{d.impact}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="ab-foot" style={{borderTop:"1px solid var(--p-line)"}}>
        <div className="brand" style={{color:"var(--p-ink-3)"}}><span className="dot" style={{background:"var(--p-accent)"}}></span> FinFlow · Concept Case Study · 2026</div>
        <div style={{color:"var(--p-ink-3)"}}>Design · Mid-fi wireframes</div>
      </div>
    </div>
  );
}

window.ArtboardMidFi = ArtboardMidFi;
