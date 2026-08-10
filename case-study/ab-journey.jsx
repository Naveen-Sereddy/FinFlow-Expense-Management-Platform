/* global React */
// Journey map artboard — three journeys that drove IA and screen priority.
// Rebuilt entirely in FinFlow's own design system (slate blue + cream + General Sans).

function ArtboardJourney() {
  const journeys = [
    {
      who: "Corey · Employee",
      title: "Expense submission",
      context: "Buys $42.80 of team coffee on a Tuesday. Wants to submit and forget it.",
      stages: [
        { stage: "Trigger", action: "Pays, opens phone", emotion: "Neutral", before: "Forgets receipt for 2 weeks", after: "One-tap snap from home screen" },
        { stage: "Capture", action: "Snap receipt", emotion: "Mild stress", before: "Manual entry of every field", after: "OCR auto-fills, confidence shown" },
        { stage: "Submit", action: "Taps Submit", emotion: "Confident", before: "No status visibility", after: "Success screen names approver + ETA" },
        { stage: "Resolve", action: "Sees Approved", emotion: "Satisfied", before: "Often had to re-submit", after: "Push notif at every state change" },
      ],
      metric: { k: "Target submission time", v: "30 sec" },
    },
    {
      who: "Xavier · Manager",
      title: "Approval workflow",
      context: "Monday 9am, 8 items waiting from the weekend.",
      stages: [
        { stage: "Open queue", action: "Clicks Approvals (8)", emotion: "Mild dread", before: "Items mixed, no policy result inline", after: "Policy status visible per row" },
        { stage: "Triage", action: "Scans amounts + badges", emotion: "Focused", before: "Had to open each item", after: "Bulk-select with running total" },
        { stage: "Bulk approve", action: "Selects 5, Approve", emotion: "Energized", before: "No bulk action existed", after: "Done in ~10 seconds" },
        { stage: "Close out", action: "Queue empty", emotion: "Satisfied", before: "Used to take 30+ minutes", after: "Minutes, not tabs of Slack scrollback" },
      ],
      metric: { k: "Queue clear time", v: "30+ min → minutes" },
    },
    {
      who: "Marcus · Finance admin",
      title: "Monthly close",
      context: "First Monday of the month, packet due to the board by 10am.",
      stages: [
        { stage: "Pre-flight", action: "Opens dashboard 7:45am", emotion: "Vigilant", before: "Multiple tabs to check status", after: "4 KPIs tell the story in 6 sec" },
        { stage: "Sweep", action: "⌘K → Audit log", emotion: "Cautious", before: "Buried 3 clicks into Settings", after: "One search away, same as every low-frequency page" },
        { stage: "Generate", action: "Opens saved close packet", emotion: "Hopeful", before: "Rebuilt template every month", after: "Saved reports persist + schedule" },
        { stage: "Export", action: "PDF + QBO sync, emails board", emotion: "Triumphant", before: "CSV → Excel → PDF → email", after: "One click, all formats" },
      ],
      metric: { k: "Time-to-close", v: "4+ hrs → 22 min" },
    },
  ];

  return (
    <div className="ab" style={{background:"var(--p-paper)"}}>
      <div className="ab-head" style={{borderBottom:"1px solid var(--p-line)"}}>
        <div className="ab-head__left">
          <div style={{fontFamily:"var(--f-mono)", fontSize:11, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--p-accent)", display:"flex", alignItems:"center", gap:8, marginBottom:10}}>
            <span style={{background:"var(--p-accent)", color:"#fff", borderRadius:4, padding:"2px 7px", fontWeight:700}}>02</span>Discovery · Journey maps
          </div>
          <h1 style={{fontFamily:"var(--p-font)", fontSize:32, fontWeight:600, color:"var(--p-ink)", margin:0, letterSpacing:"-0.01em"}}>Where time and trust were lost.</h1>
          <div style={{fontFamily:"var(--p-font)", fontSize:14, color:"var(--p-ink-3)", marginTop:8, maxWidth:600, lineHeight:1.5}}>Mapping each role's full lifecycle, actions, emotion, friction, surfaced the handoff moments that became this product's highest-leverage screens.</div>
        </div>
        <div className="ab-head__right">
          <div style={{textAlign:"right"}}>
            <div style={{fontFamily:"var(--f-mono)", fontSize:9.5, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--p-ink-3)"}}>Maps</div>
            <div style={{fontFamily:"var(--p-font)", fontSize:15, fontWeight:600, color:"var(--p-ink)"}}>3 roles</div>
          </div>
        </div>
      </div>

      <div className="ab-body" style={{overflow:"hidden", background:"var(--p-paper)"}}>
        <div style={{display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:18, height:"100%", fontFamily:"var(--p-font)"}}>
          {journeys.map((j, i) => (
            <div key={i} style={{display:"flex", flexDirection:"column", gap:10, minHeight:0}}>
              <div style={{paddingBottom:8, borderBottom:"1px solid var(--p-line)"}}>
                <div style={{fontFamily:"var(--f-mono)", fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--p-ink-3)"}}>{j.who}</div>
                <div style={{fontSize:14, fontWeight:600, color:"var(--p-ink)"}}>{j.title}</div>
                <div style={{fontSize:11, color:"var(--p-ink-3)", lineHeight:1.4, marginTop:3}}>{j.context}</div>
              </div>

              <div style={{display:"flex", flexDirection:"column", gap:8, flex:1}}>
                {j.stages.map((s, si) => (
                  <div key={si} style={{
                    background:"#FFFFFF", border:"1px solid var(--p-line)", borderRadius:10,
                    padding:"10px 12px", display:"flex", flexDirection:"column", gap:5,
                  }}>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                      <span style={{fontSize:11.5, fontWeight:600, color:"var(--p-ink)"}}>{s.stage}</span>
                      <span style={{fontFamily:"var(--f-mono)", fontSize:9.5, color:"var(--p-ink-3)"}}>{s.emotion}</span>
                    </div>
                    <div style={{fontSize:10.5, color:"var(--p-ink-3)"}}>{s.action}</div>
                    <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:6, marginTop:2}}>
                      <div style={{
                        padding:"5px 7px", borderRadius:6, background:"#FFE4DF", color:"#97000F",
                        fontFamily:"var(--f-mono)", fontSize:9.5, lineHeight:1.3,
                      }}>{s.before}</div>
                      <div style={{
                        padding:"5px 7px", borderRadius:6, background:"#DEFBE2", color:"#005603",
                        fontFamily:"var(--f-mono)", fontSize:9.5, lineHeight:1.3,
                      }}>{s.after}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{
                marginTop:"auto", background:"#EDF3FC", border:"1px solid var(--p-line)",
                borderRadius:10, padding:"10px 12px", display:"flex", alignItems:"baseline", justifyContent:"space-between",
              }}>
                <span style={{fontFamily:"var(--f-mono)", fontSize:9.5, color:"var(--p-accent)"}}>{j.metric.k}</span>
                <span style={{fontSize:13, fontWeight:600, color:"var(--p-accent)"}}>{j.metric.v}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="ab-foot" style={{borderTop:"1px solid var(--p-line)"}}>
        <div className="brand" style={{color:"var(--p-ink-3)"}}><span className="dot" style={{background:"var(--p-accent)"}}></span> FinFlow · Concept Case Study · 2026</div>
        <div style={{color:"var(--p-ink-3)"}}>Discovery · Journey maps</div>
      </div>
    </div>
  );
}

window.ArtboardJourney = ArtboardJourney;
