/* global React */
// Mid-fidelity wireframes — real labels + the decisions behind two key screens.

function ArtboardMidFi() {
  const decisions = [
    {
      area: "Dashboard",
      problem: "Four equal KPI cards plus a chart is the layout every competitor ships — it reads as generated, not designed, and doesn't say which number matters most today.",
      options: ["Card-grid of widgets (configurable)", "Four equal KPI cards + one chart", "One hero number + a compact inline stat row"],
      decision: "One oversized hero KPI (spend MTD, with a sparkline) next to a compact three-item stat row, then an asymmetric chart split (trend line wider than the budget/category column), then two borderless tables.",
      impact: "The eye lands on one number first, not four competing for attention — and no two of the three dashboards (Finance Admin, Manager, Employee) share the same skeleton.",
    },
    {
      area: "Approvals",
      problem: "Most approvals are in-policy, low-effort decisions; a few need real review — the UI shouldn't force opening every item to find out which is which.",
      options: ["Kanban (Pending/Approved/Rejected)", "Dense list, bulk bar only after a row is selected", "Dense list, selection state always visible"],
      decision: "A persistent selection bar above the list — running count and total, not just an action bar that appears after the fact — plus a policy-violation chip inline on every row so triage doesn't require opening anything.",
      impact: "The policy result is readable from the row itself; bulk-approving in-policy items never requires a detail view.",
    },
  ];

  return (
    <div className="ab">
      <div className="ab-head">
        <div className="ab-head__left">
          <div className="ab-eyebrow"><span className="num" style={{background:"var(--c-surface-2)"}}>05</span>Design · Mid-fi wireframes</div>
          <h1 className="ab-title">Real labels, real tradeoffs.</h1>
          <div className="ab-sub">Component structure and copy validated against the approval and dashboard flows before final UI — each option weighed against the actual research findings.</div>
        </div>
        <div className="ab-head__right">
          <div className="ab-meta"><span className="ab-meta__k">Decisions documented</span><span className="ab-meta__v">2 shown here</span></div>
        </div>
      </div>

      <div className="ab-body" style={{overflow:"hidden"}}>
        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:20, height:"100%"}}>
          {decisions.map((d, i) => (
            <div key={i} style={{
              background:"var(--c-surface)", border:"1px solid var(--c-line)", borderRadius:14,
              padding:"18px 20px", display:"flex", flexDirection:"column", gap:12, overflow:"auto",
            }}>
              <div style={{fontSize:14, fontWeight:600, color:"var(--c-ink)"}}>{d.area}</div>
              <div style={{fontSize:12, color:"var(--c-ink-3)", lineHeight:1.5}}>{d.problem}</div>

              <div>
                <div style={{fontFamily:"var(--f-mono)", fontSize:9.5, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--c-ink-4)", marginBottom:6}}>Options considered</div>
                <div style={{display:"flex", flexDirection:"column", gap:5}}>
                  {d.options.map((o, oi) => (
                    <div key={oi} style={{
                      fontSize:11.5, color:"var(--c-ink-3)", padding:"6px 10px", borderRadius:6,
                      background:"var(--c-surface-2)", border:"1px solid var(--c-line)",
                    }}>{o}</div>
                  ))}
                </div>
              </div>

              <div style={{
                background:"var(--c-accent-tint)", border:"1px solid var(--c-accent-line)", borderRadius:10,
                padding:"12px 14px",
              }}>
                <div style={{fontFamily:"var(--f-mono)", fontSize:9.5, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--c-accent-2)", marginBottom:5}}>Final decision</div>
                <div style={{fontSize:12, color:"var(--c-ink)", lineHeight:1.5}}>{d.decision}</div>
              </div>

              <div style={{marginTop:"auto", paddingTop:10, borderTop:"1px solid var(--c-line)", display:"flex", alignItems:"baseline", justifyContent:"space-between"}}>
                <span style={{fontFamily:"var(--f-mono)", fontSize:9.5, color:"var(--c-ink-4)"}}>Expected impact</span>
                <span style={{fontSize:12, fontWeight:600, color:"var(--c-success)"}}>{d.impact}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="ab-foot">
        <div className="brand"><span className="dot"></span> FinFlow · Concept Case Study · 2026</div>
        <div>Design · Mid-fi wireframes</div>
      </div>
    </div>
  );
}

window.ArtboardMidFi = ArtboardMidFi;
