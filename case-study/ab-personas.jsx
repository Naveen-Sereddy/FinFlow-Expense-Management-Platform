/* global React DASHMOCK */
// Personas artboard — three primary roles anchoring the design.

function ArtboardPersonas() {
  const personas = [
    {
      tag: "Employee",
      name: "Iris Chen",
      role: "Senior PMM · Individual contributor",
      age: "31 · San Francisco",
      goal: "Submit a receipt in under a minute and know exactly when reimbursement lands — predictability over features.",
      pain: "Old tool needed a project code from memory; reimbursement timing was a black box; OCR misread amounts she had to fix by hand.",
      workflow: "Snaps a receipt the moment a transaction completes, submits batches of 2–3 in the evening, almost never opens the desktop product.",
      tech: "High — native iOS, expects modern app conventions.",
      stat: { k: "Submits / month", v: "~5 · $2,000" },
    },
    {
      tag: "Manager",
      name: "Theo Vasquez",
      role: "Head of Sales · 8 direct reports",
      age: "39 · Austin, TX",
      goal: "Approve in under 2 clicks when in-policy, and know which items need a second look before he even opens them.",
      pain: "Receipt buried behind a click on every item; approving in Slack lost policy context; no bulk-approve for clean items.",
      workflow: "Monday 9am burns through the weekend's queue, Thursday bulk-approves everything under $100, Friday reviews flags with coffee.",
      tech: "Medium-high — pragmatic, skips tooltips, gives up after 3 clicks.",
      stat: { k: "Approvals / week", v: "8–14 items" },
    },
    {
      tag: "Finance admin · Primary",
      name: "Maren Okafor",
      role: "Director of Finance · 2-person team",
      age: "36 · San Francisco",
      goal: "Close the month in 22 minutes instead of 4+ hours, and catch policy violations before close, not during audit.",
      pain: "Old setup needed 4 tools + a spreadsheet to close; receipt chasing took 6+ hours a cycle; card issuance lived in a separate vendor portal.",
      workflow: "7:45am scans 4 KPIs in 6 seconds → standup → approval queue & card issuance → 2pm reports & vendors. ⌘K everywhere, no mouse.",
      tech: "Very high — power user, discovers shortcuts within 30 seconds.",
      stat: { k: "Time-to-close target", v: "4hrs → 22 min" },
    },
  ];

  return (
    <div className="ab">
      <div className="ab-head">
        <div className="ab-head__left">
          <div className="ab-eyebrow"><span className="num" style={{background:"var(--c-surface-2)"}}>01</span>Discovery · Personas</div>
          <h1 className="ab-title">Three roles, three workdays.</h1>
          <div className="ab-sub">Maren is the primary design target — her workflow touches every other role's output. Theo and Iris define the speed and friction bars she has to clear.</div>
        </div>
        <div className="ab-head__right">
          <div className="ab-meta"><span className="ab-meta__k">Primary persona</span><span className="ab-meta__v">Maren Okafor</span></div>
          <div className="ab-meta"><span className="ab-meta__k">Secondary</span><span className="ab-meta__v">Auditor (read-only)</span></div>
        </div>
      </div>

      <div className="ab-body">
        <div style={{display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:20, height:"100%"}}>
          {personas.map((p, i) => (
            <div key={i} style={{
              background:"var(--c-surface)", border:"1px solid var(--c-line)", borderRadius:14,
              padding:"20px 20px 18px", display:"flex", flexDirection:"column", gap:14,
            }}>
              <div style={{display:"flex", alignItems:"center", gap:12}}>
                <div style={{
                  width:44, height:44, borderRadius:"50%", flexShrink:0,
                  background:"var(--c-accent-tint)", border:"1px solid var(--c-accent-line)",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontFamily:"var(--f-serif)", fontStyle:"italic", fontSize:17, color:"var(--c-accent-2)",
                }}>{p.name.split(" ").map(n => n[0]).join("")}</div>
                <div>
                  <div style={{fontSize:15, fontWeight:600, color:"var(--c-ink)"}}>{p.name}</div>
                  <div style={{fontSize:11.5, color:"var(--c-ink-4)"}}>{p.age}</div>
                </div>
              </div>

              <span style={{
                display:"inline-flex", alignSelf:"flex-start", padding:"3px 10px", borderRadius:999,
                background:"var(--c-accent-tint)", border:"1px solid var(--c-accent-line)",
                color:"var(--c-accent-2)", fontFamily:"var(--f-mono)", fontSize:10, fontWeight:600,
                letterSpacing:"0.06em", textTransform:"uppercase",
              }}>{p.tag}</span>

              <div style={{fontSize:12, color:"var(--c-ink-3)", lineHeight:1.4}}>{p.role}</div>

              <div style={{display:"flex", flexDirection:"column", gap:10, flex:1}}>
                <div>
                  <div style={{fontFamily:"var(--f-mono)", fontSize:9.5, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--c-ink-4)", marginBottom:4}}>Goal</div>
                  <div style={{fontSize:12, color:"var(--c-ink)", lineHeight:1.5}}>{p.goal}</div>
                </div>
                <div>
                  <div style={{fontFamily:"var(--f-mono)", fontSize:9.5, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--c-ink-4)", marginBottom:4}}>Pain</div>
                  <div style={{fontSize:12, color:"var(--c-ink-3)", lineHeight:1.5}}>{p.pain}</div>
                </div>
                <div>
                  <div style={{fontFamily:"var(--f-mono)", fontSize:9.5, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--c-ink-4)", marginBottom:4}}>Daily workflow</div>
                  <div style={{fontSize:12, color:"var(--c-ink-3)", lineHeight:1.5}}>{p.workflow}</div>
                </div>
              </div>

              <div style={{
                marginTop:"auto", paddingTop:12, borderTop:"1px solid var(--c-line)",
                display:"flex", alignItems:"center", justifyContent:"space-between",
              }}>
                <div>
                  <div style={{fontFamily:"var(--f-mono)", fontSize:9.5, color:"var(--c-ink-4)"}}>{p.stat.k}</div>
                  <div style={{fontSize:13, fontWeight:600, color:"var(--c-ink)"}}>{p.stat.v}</div>
                </div>
                <div style={{fontSize:10.5, color:"var(--c-ink-4)", textAlign:"right", maxWidth:"50%", lineHeight:1.3}}>Tech comfort: {p.tech}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="ab-foot">
        <div className="brand"><span className="dot"></span> FinFlow · Concept Case Study · 2026</div>
        <div>Discovery · Personas</div>
      </div>
    </div>
  );
}

window.ArtboardPersonas = ArtboardPersonas;
