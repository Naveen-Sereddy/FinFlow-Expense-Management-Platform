/* global React DASHMOCK */
// Personas artboard — three primary roles anchoring the design.
// Rebuilt entirely in FinFlow's own design system (slate blue + cream + General Sans).

function ArtboardPersonas() {
  const personas = [
    {
      tag: "Employee",
      name: "Corey Anderson",
      role: "Senior PMM · Individual contributor",
      age: "31 · San Francisco",
      goal: "Submit a receipt in under a minute and know exactly when reimbursement lands, predictability over features.",
      pain: "Old tool needed a project code from memory; reimbursement timing was a black box; OCR misread amounts they had to fix by hand.",
      workflow: "Snaps a receipt the moment a transaction completes, submits batches of 2 to 3 in the evening, almost never opens the desktop product.",
      tech: "High, native iOS, expects modern app conventions.",
      stat: { k: "Submits / month", v: "~5 · $2,000" },
    },
    {
      tag: "Manager",
      name: "Xavier Bartlett",
      role: "VP Sales · 8 direct reports",
      age: "39 · Austin, TX",
      goal: "Approve in under 2 clicks when in-policy, and know which items need a second look before he even opens them.",
      pain: "Receipt buried behind a click on every item; approving in Slack lost policy context; no bulk-approve for clean items.",
      workflow: "Monday 9am burns through the weekend's queue, Thursday bulk-approves everything under $100, Friday reviews flags with coffee.",
      tech: "Medium-high, pragmatic, skips tooltips, gives up after 3 clicks.",
      stat: { k: "Approvals / week", v: "8-14 items" },
    },
    {
      tag: "Finance admin · Primary",
      name: "Marcus Stoinis",
      role: "Head of Finance · 2-person team",
      age: "36 · San Francisco",
      goal: "Close the month in 22 minutes instead of 4+ hours, and catch policy violations before close, not during audit.",
      pain: "Old setup needed 4 tools plus a spreadsheet to close; receipt chasing took 6+ hours a cycle; card issuance lived in a separate vendor portal.",
      workflow: "7:45am scans 4 KPIs in 6 seconds, standup, approval queue and card issuance, 2pm reports and vendors. ⌘K everywhere, no mouse.",
      tech: "Very high, power user, discovers shortcuts within 30 seconds.",
      stat: { k: "Time-to-close target", v: "4hrs → 22 min" },
    },
  ];

  return (
    <div className="ab" style={{background:"var(--p-paper)"}}>
      <div className="ab-head" style={{borderBottom:"1px solid var(--p-line)"}}>
        <div className="ab-head__left">
          <div style={{fontFamily:"var(--f-mono)", fontSize:11, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--p-accent)", display:"flex", alignItems:"center", gap:8, marginBottom:10}}>
            <span style={{background:"var(--p-accent)", color:"#fff", borderRadius:4, padding:"2px 7px", fontWeight:700}}>01</span>Discovery · Personas
          </div>
          <h1 style={{fontFamily:"var(--p-font)", fontSize:32, fontWeight:600, color:"var(--p-ink)", margin:0, letterSpacing:"-0.01em"}}>Three roles, three workdays.</h1>
          <div style={{fontFamily:"var(--p-font)", fontSize:14, color:"var(--p-ink-3)", marginTop:8, maxWidth:600, lineHeight:1.5}}>Marcus is the primary design target, their workflow touches every other role's output. Xavier and Corey define the speed and friction bars they have to clear.</div>
        </div>
        <div className="ab-head__right">
          <div style={{textAlign:"right", marginBottom:8}}>
            <div style={{fontFamily:"var(--f-mono)", fontSize:9.5, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--p-ink-3)"}}>Primary persona</div>
            <div style={{fontFamily:"var(--p-font)", fontSize:14, fontWeight:600, color:"var(--p-ink)"}}>Marcus Stoinis</div>
          </div>
          <div style={{textAlign:"right"}}>
            <div style={{fontFamily:"var(--f-mono)", fontSize:9.5, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--p-ink-3)"}}>Secondary</div>
            <div style={{fontFamily:"var(--p-font)", fontSize:14, fontWeight:600, color:"var(--p-ink)"}}>Auditor (read-only)</div>
          </div>
        </div>
      </div>

      <div className="ab-body" style={{background:"var(--p-paper)"}}>
        <div style={{display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:20, height:"100%", fontFamily:"var(--p-font)"}}>
          {personas.map((p, i) => (
            <div key={i} style={{
              background:"#FFFFFF", border:"1px solid var(--p-line)", borderRadius:14,
              padding:"20px 20px 18px", display:"flex", flexDirection:"column", gap:14,
            }}>
              <div style={{display:"flex", alignItems:"center", gap:12}}>
                <div style={{
                  width:44, height:44, borderRadius:"50%", flexShrink:0,
                  background:"#EDF3FC", border:"1px solid var(--p-line)",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:15, fontWeight:600, color:"var(--p-accent)",
                }}>{p.name.split(" ").map(n => n[0]).join("")}</div>
                <div>
                  <div style={{fontSize:15, fontWeight:600, color:"var(--p-ink)"}}>{p.name}</div>
                  <div style={{fontSize:11.5, color:"var(--p-ink-3)"}}>{p.age}</div>
                </div>
              </div>

              <span style={{
                display:"inline-flex", alignSelf:"flex-start", padding:"3px 10px", borderRadius:999,
                background:"#EDF3FC", border:"1px solid var(--p-line)",
                color:"var(--p-accent)", fontFamily:"var(--f-mono)", fontSize:10, fontWeight:600,
                letterSpacing:"0.06em", textTransform:"uppercase",
              }}>{p.tag}</span>

              <div style={{fontSize:12, color:"var(--p-ink-3)", lineHeight:1.4}}>{p.role}</div>

              <div style={{display:"flex", flexDirection:"column", gap:10, flex:1}}>
                <div>
                  <div style={{fontFamily:"var(--f-mono)", fontSize:9.5, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--p-ink-3)", marginBottom:4}}>Goal</div>
                  <div style={{fontSize:12, color:"var(--p-ink)", lineHeight:1.5}}>{p.goal}</div>
                </div>
                <div>
                  <div style={{fontFamily:"var(--f-mono)", fontSize:9.5, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--p-ink-3)", marginBottom:4}}>Pain</div>
                  <div style={{fontSize:12, color:"var(--p-ink-3)", lineHeight:1.5}}>{p.pain}</div>
                </div>
                <div>
                  <div style={{fontFamily:"var(--f-mono)", fontSize:9.5, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--p-ink-3)", marginBottom:4}}>Daily workflow</div>
                  <div style={{fontSize:12, color:"var(--p-ink-3)", lineHeight:1.5}}>{p.workflow}</div>
                </div>
              </div>

              <div style={{
                marginTop:"auto", paddingTop:12, borderTop:"1px solid var(--p-line)",
                display:"flex", alignItems:"center", justifyContent:"space-between",
              }}>
                <div>
                  <div style={{fontFamily:"var(--f-mono)", fontSize:9.5, color:"var(--p-ink-3)"}}>{p.stat.k}</div>
                  <div style={{fontSize:13, fontWeight:600, color:"var(--p-ink)"}}>{p.stat.v}</div>
                </div>
                <div style={{fontSize:10.5, color:"var(--p-ink-3)", textAlign:"right", maxWidth:"50%", lineHeight:1.3}}>Tech comfort: {p.tech}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="ab-foot" style={{borderTop:"1px solid var(--p-line)"}}>
        <div className="brand" style={{color:"var(--p-ink-3)"}}><span className="dot" style={{background:"var(--p-accent)"}}></span> FinFlow · Concept Case Study · 2026</div>
        <div style={{color:"var(--p-ink-3)"}}>Discovery · Personas</div>
      </div>
    </div>
  );
}

window.ArtboardPersonas = ArtboardPersonas;
