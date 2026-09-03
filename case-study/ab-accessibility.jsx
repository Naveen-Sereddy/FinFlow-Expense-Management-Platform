/* global React */
// Accessibility audit artboard — WCAG 2.1 AA, contrast review, fixes shipped.
// Rebuilt entirely in FinFlow's own design system (slate blue + cream + General Sans).

function ArtboardAccessibility() {
  const contrast = [
    { pair: "Status badge text on its own background", v: "≥7:1", level: "AAA" },
    { pair: "Primary button (white on slate blue)", v: "6.75:1", level: "AA" },
    { pair: "Near-black text on the same slate blue (rejected)", v: "2.93:1", level: "fail" },
  ];
  const fixes = [
    { item: "One focus-ring token everywhere", note: "buttons, inputs, and links used to disagree, inputs had their own ad hoc ring; unified on a single box-shadow token so the ring follows each element's own corner radius" },
    { item: "Every chart gets a real accessible name", note: "Sparkline, LineChart, BarChart, AreaChart, Donut render <title> + role=\"img\" + aria-label, previously an unlabeled <svg>, invisible to screen readers" },
    { item: "Line/Area charts are keyboard-operable", note: "each data point is a focusable hit target; the same tooltip mouse hover reveals now also opens on Tab-focus" },
    { item: "Icon-only buttons carry aria-label", note: "row overflow menus, close/back controls, notification settings, audited and fixed one by one, not batch-guessed" },
  ];
  const planned = [
    { item: "Keyboard-focusable table rows", sev: "Medium", when: "systemic, repeats across most list screens" },
    { item: "Real pagination + drawer components", sev: "Medium", when: "needed before production scale" },
    { item: "Working date-range picker", sev: "Low", when: "currently a static label" },
  ];

  return (
    <div className="ab" style={{background:"var(--p-paper)"}}>
      <div className="ab-head" style={{borderBottom:"1px solid var(--p-line)"}}>
        <div className="ab-head__left">
          <div style={{fontFamily:"var(--f-mono)", fontSize:11, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--p-accent)", display:"flex", alignItems:"center", gap:8, marginBottom:10}}>
            <span style={{background:"var(--p-accent)", color:"#fff", borderRadius:4, padding:"2px 7px", fontWeight:700}}>07</span>Design · Accessibility
          </div>
          <h1 style={{fontFamily:"var(--p-font)", fontSize:32, fontWeight:600, color:"var(--p-ink)", margin:0, letterSpacing:"-0.01em"}}>Fixed one by one, not batch-guessed.</h1>
          <div style={{fontFamily:"var(--p-font)", fontSize:14, color:"var(--p-ink-3)", marginTop:8, maxWidth:600, lineHeight:1.5}}>A production-readiness pass over the shipped build, every finding traced to a specific file and line, verified in-browser after the fix, not assumed.</div>
        </div>
        <div className="ab-head__right">
          <div style={{textAlign:"right", marginBottom:8}}>
            <div style={{fontFamily:"var(--f-mono)", fontSize:9.5, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--p-ink-3)"}}>Target</div>
            <div style={{fontFamily:"var(--p-font)", fontSize:14, fontWeight:600, color:"var(--p-ink)"}}>WCAG 2.1 AA</div>
          </div>
          <div style={{textAlign:"right"}}>
            <div style={{fontFamily:"var(--f-mono)", fontSize:9.5, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--p-ink-3)"}}>Screens swept</div>
            <div style={{fontFamily:"var(--p-font)", fontSize:14, fontWeight:600, color:"var(--p-ink)"}}>47 / 47</div>
          </div>
        </div>
      </div>

      <div className="ab-body" style={{overflow:"hidden", background:"var(--p-paper)"}}>
        <div style={{display:"grid", gridTemplateColumns:"0.85fr 1.1fr 0.85fr", gap:20, height:"100%", fontFamily:"var(--p-font)"}}>

          <div style={{display:"flex", flexDirection:"column", gap:8, minHeight:0}}>
            <div style={{fontFamily:"var(--f-mono)", fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--p-ink-3)"}}>Contrast, as documented in the tokens</div>
            <div style={{background:"#FFFFFF", border:"1px solid var(--p-line)", borderRadius:10, padding:"4px 14px", flex:1, overflow:"auto"}}>
              {contrast.map((c, i) => (
                <div key={i} style={{display:"flex", alignItems:"center", justifyContent:"space-between", padding:"10px 0", borderBottom: i < contrast.length-1 ? "1px solid var(--p-line)" : "none", gap:10}}>
                  <span style={{fontSize:11.5, color:"var(--p-ink)"}}>{c.pair}</span>
                  <div style={{display:"flex", alignItems:"center", gap:8, flexShrink:0}}>
                    <span style={{fontFamily:"var(--f-mono)", fontSize:11, color:"var(--p-ink-3)"}}>{c.v}</span>
                    <span style={{
                      fontFamily:"var(--f-mono)", fontSize:9.5, fontWeight:600, padding:"2px 7px", borderRadius:999,
                      background: c.level==="AAA" ? "#DEFBE2" : c.level==="AA" ? "#EDF3FC" : "#FFE4DF",
                      color: c.level==="AAA" ? "#005603" : c.level==="AA" ? "var(--p-accent)" : "#97000F",
                    }}>{c.level}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{display:"flex", flexDirection:"column", gap:10}}>
            <div style={{fontFamily:"var(--f-mono)", fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--p-ink-3)"}}>Fixed in the production pass</div>
            {fixes.map((f, i) => (
              <div key={i} style={{
                background:"#DEFBE2", border:"1px solid #B7EEC3", borderRadius:10,
                padding:"11px 13px", display:"flex", flexDirection:"column", gap:4,
              }}>
                <div style={{fontSize:12, fontWeight:600, color:"#005603"}}>{f.item}</div>
                <div style={{fontSize:11, color:"var(--p-ink-3)", lineHeight:1.4}}>{f.note}</div>
              </div>
            ))}
          </div>

          <div style={{display:"flex", flexDirection:"column", gap:10}}>
            <div style={{fontFamily:"var(--f-mono)", fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--p-ink-3)"}}>Known gaps, not hidden</div>
            {planned.map((p, i) => (
              <div key={i} style={{
                background:"#FFFFFF", border:"1px solid var(--p-line)", borderRadius:10,
                padding:"10px 13px", display:"flex", alignItems:"center", justifyContent:"space-between", gap:8,
              }}>
                <div style={{fontSize:11.5, color:"var(--p-ink)", lineHeight:1.4}}>{p.item}</div>
                <div style={{display:"flex", flexDirection:"column", alignItems:"flex-end", gap:3, flexShrink:0}}>
                  <span style={{fontFamily:"var(--f-mono)", fontSize:9, color:"var(--p-ink-3)"}}>{p.sev}</span>
                  <span style={{fontFamily:"var(--f-mono)", fontSize:9, color:"var(--p-accent)"}}>{p.when}</span>
                </div>
              </div>
            ))}
            <div style={{
              marginTop:"auto", padding:"10px 13px", background:"var(--p-paper)", border:"1px solid var(--p-line)",
              borderRadius:8, fontSize:11, color:"var(--p-ink-3)", lineHeight:1.4, fontFamily:"var(--f-mono)",
            }}>44px min touch targets · prefers-reduced-motion respected · every status pairs icon + label, never color alone.</div>
          </div>

        </div>
      </div>

      <div className="ab-foot" style={{borderTop:"1px solid var(--p-line)"}}>
        <div className="brand" style={{color:"var(--p-ink-3)"}}><span className="dot" style={{background:"var(--p-accent)"}}></span> FinFlow · Shipped Client Product · 2026</div>
        <div style={{color:"var(--p-ink-3)"}}>Design · Accessibility</div>
      </div>
    </div>
  );
}

window.ArtboardAccessibility = ArtboardAccessibility;
