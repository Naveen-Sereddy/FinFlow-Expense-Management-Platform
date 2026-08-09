/* global React */
// Accessibility audit artboard — WCAG 2.1 AA, contrast review, fixes shipped.

function ArtboardAccessibility() {
  const contrast = [
    { pair: "Status badge text on its own background", v: "≥7:1", level: "AAA" },
    { pair: "Primary button (white on slate blue)", v: "6.75:1", level: "AA" },
    { pair: "Near-black text on the same slate blue (rejected)", v: "2.93:1", level: "fail — why fg is white" },
  ];
  const fixes = [
    { item: "One focus-ring token everywhere", note: "buttons, inputs, and links used to disagree — inputs had their own ad hoc ring; unified on a single box-shadow token so the ring follows each element's own corner radius" },
    { item: "Every chart gets a real accessible name", note: "Sparkline, LineChart, BarChart, AreaChart, Donut render <title> + role=\"img\" + aria-label — previously an unlabeled <svg>, invisible to screen readers" },
    { item: "Line/Area charts are keyboard-operable", note: "each data point is a focusable hit target; the same tooltip mouse hover reveals now also opens on Tab-focus" },
    { item: "Icon-only buttons carry aria-label", note: "row overflow menus, close/back controls, notification settings — audited and fixed one by one, not batch-guessed" },
  ];
  const planned = [
    { item: "Keyboard-focusable table rows", sev: "Medium", when: "systemic — repeats across most list screens" },
    { item: "Real pagination + drawer components", sev: "Medium", when: "needed before production scale" },
    { item: "Working date-range picker", sev: "Low", when: "currently a static label" },
  ];

  return (
    <div className="ab">
      <div className="ab-head">
        <div className="ab-head__left">
          <div className="ab-eyebrow"><span className="num" style={{background:"var(--c-surface-2)"}}>07</span>Design · Accessibility</div>
          <h1 className="ab-title">Fixed one by one, not batch-guessed.</h1>
          <div className="ab-sub">A production-readiness pass over the shipped build — every finding traced to a specific file and line, verified in-browser after the fix, not assumed.</div>
        </div>
        <div className="ab-head__right">
          <div className="ab-meta"><span className="ab-meta__k">Target</span><span className="ab-meta__v">WCAG 2.1 AA</span></div>
          <div className="ab-meta"><span className="ab-meta__k">Screens swept</span><span className="ab-meta__v">47 / 47</span></div>
        </div>
      </div>

      <div className="ab-body" style={{overflow:"hidden"}}>
        <div style={{display:"grid", gridTemplateColumns:"0.85fr 1.1fr 0.85fr", gap:20, height:"100%"}}>

          <div style={{display:"flex", flexDirection:"column", gap:8, minHeight:0}}>
            <div style={{fontFamily:"var(--f-mono)", fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--c-ink-4)"}}>Contrast — as documented in the tokens</div>
            <div style={{background:"var(--c-surface)", border:"1px solid var(--c-line)", borderRadius:10, padding:"4px 14px", flex:1, overflow:"auto"}}>
              {contrast.map((c, i) => (
                <div key={i} style={{display:"flex", alignItems:"center", justifyContent:"space-between", padding:"10px 0", borderBottom: i < contrast.length-1 ? "1px solid var(--c-line)" : "none", gap:10}}>
                  <span style={{fontSize:11.5, color:"var(--c-ink)"}}>{c.pair}</span>
                  <div style={{display:"flex", alignItems:"center", gap:8, flexShrink:0}}>
                    <span style={{fontFamily:"var(--f-mono)", fontSize:11, color:"var(--c-ink-3)"}}>{c.v}</span>
                    <span style={{
                      fontFamily:"var(--f-mono)", fontSize:9.5, fontWeight:600, padding:"2px 7px", borderRadius:999,
                      background: c.level.startsWith("AAA") ? "var(--c-success-bg)" : c.level.startsWith("AA") ? "var(--c-accent-tint)" : "var(--c-error-bg)",
                      color: c.level.startsWith("AAA") ? "var(--c-success)" : c.level.startsWith("AA") ? "var(--c-accent-2)" : "var(--c-error)",
                    }}>{c.level}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{display:"flex", flexDirection:"column", gap:10}}>
            <div style={{fontFamily:"var(--f-mono)", fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--c-ink-4)"}}>Fixed in the production pass</div>
            {fixes.map((f, i) => (
              <div key={i} style={{
                background:"var(--c-success-bg)", border:"1px solid var(--c-success-bg)", borderRadius:10,
                padding:"11px 13px", display:"flex", flexDirection:"column", gap:4,
              }}>
                <div style={{fontSize:12, fontWeight:600, color:"var(--c-success)"}}>{f.item}</div>
                <div style={{fontSize:11, color:"var(--c-ink-3)", lineHeight:1.4}}>{f.note}</div>
              </div>
            ))}
          </div>

          <div style={{display:"flex", flexDirection:"column", gap:10}}>
            <div style={{fontFamily:"var(--f-mono)", fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--c-ink-4)"}}>Known gaps — not hidden</div>
            {planned.map((p, i) => (
              <div key={i} style={{
                background:"var(--c-surface)", border:"1px solid var(--c-line)", borderRadius:10,
                padding:"10px 13px", display:"flex", alignItems:"center", justifyContent:"space-between", gap:8,
              }}>
                <div style={{fontSize:11.5, color:"var(--c-ink)", lineHeight:1.4}}>{p.item}</div>
                <div style={{display:"flex", flexDirection:"column", alignItems:"flex-end", gap:3, flexShrink:0}}>
                  <span style={{fontFamily:"var(--f-mono)", fontSize:9, color:"var(--c-ink-4)"}}>{p.sev}</span>
                  <span style={{fontFamily:"var(--f-mono)", fontSize:9, color:"var(--c-accent-2)"}}>{p.when}</span>
                </div>
              </div>
            ))}
            <div style={{
              marginTop:"auto", padding:"10px 13px", background:"var(--c-surface-2)", border:"1px solid var(--c-line)",
              borderRadius:8, fontSize:11, color:"var(--c-ink-4)", lineHeight:1.4, fontFamily:"var(--f-mono)",
            }}>44px min touch targets · prefers-reduced-motion respected · every status pairs icon + label, never color alone.</div>
          </div>

        </div>
      </div>

      <div className="ab-foot">
        <div className="brand"><span className="dot"></span> FinFlow · Concept Case Study · 2026</div>
        <div>Design · Accessibility</div>
      </div>
    </div>
  );
}

window.ArtboardAccessibility = ArtboardAccessibility;
