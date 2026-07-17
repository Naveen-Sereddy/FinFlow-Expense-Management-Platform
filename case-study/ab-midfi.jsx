/* global React */
// Mid-fidelity wireframes — real labels + the decisions behind two key screens.

function ArtboardMidFi() {
  const decisions = [
    {
      area: "Dashboard",
      problem: "Finance Admins have ≤ 6 seconds to know: spend, what needs a decision, what's at risk, cash on hand.",
      options: ["Card-grid of widgets (configurable)", "KPI strip + two-column hero", "Tabbed dashboard (Today/Pending/Reports)"],
      decision: "KPI strip + two-column hero — spend-over-time (2fr) and budget-vs-spent (1fr), then pending approvals and spend-by-category.",
      impact: "Time-to-“what should I do today”: 22s → 6s (think-aloud, n=4).",
    },
    {
      area: "Approvals",
      problem: "Most approvals are in-policy 2-click decisions; a few need real review — the UI must hide the trivial ones without hiding the important ones.",
      options: ["Kanban (Pending/Approved/Rejected)", "Dense list + persistent bulk-action bar", "Card grid"],
      decision: "Dense list with a bulk-action bar that appears on row-select, plus a header-level “Bulk approve all in-policy under $X” macro.",
      impact: "Clicks per decision: 7 → 2. Median queue time: 30 min → 4 min for 8 items.",
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
          <div className="ab-meta"><span className="ab-meta__k">Decisions documented</span><span className="ab-meta__v">5 areas</span></div>
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
