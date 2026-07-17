/* global React */
// Accessibility audit artboard — WCAG 2.1 AA, contrast review, fixes shipped.

function ArtboardAccessibility() {
  const contrast = [
    { pair: "Body text on background", v: "13.6:1", level: "AAA" },
    { pair: "Muted text on background", v: "4.9:1", level: "AA" },
    { pair: "Primary button (text on plum)", v: "9.1:1", level: "AAA" },
    { pair: "Approved badge", v: "6.0:1", level: "AA" },
    { pair: "Flagged badge", v: "5.6:1", level: "AA · narrowest" },
    { pair: "Focus ring on background", v: "3.4:1", level: "≥3:1 req." },
  ];
  const fixes = [
    { item: "Bumped subtle-text role from 4.5:1 to 4.7:1", note: "buffers against rendering variance" },
    { item: "Added :focus-visible to segmented-control buttons", note: "gap found in audit — they had none" },
    { item: "Tables use <th scope=\"col\">, modals use role=\"dialog\" + aria-modal", note: "semantic HTML over ARIA patches" },
  ];
  const planned = [
    { item: "Skip-link at top of page", sev: "Medium", when: "v1.1" },
    { item: "aria-live region for bulk-approve counter", sev: "Medium", when: "v1.1" },
    { item: "Lift focus to page H1 on route change", sev: "Medium", when: "v1.0 patch" },
    { item: "High-contrast theme variant (4.7:1 min)", sev: "Low", when: "v1.2" },
  ];

  return (
    <div className="ab">
      <div className="ab-head">
        <div className="ab-head__left">
          <div className="ab-eyebrow"><span className="num" style={{background:"var(--c-surface-2)"}}>07</span>Design · Accessibility</div>
          <h1 className="ab-title">AA, audited — not assumed.</h1>
          <div className="ab-sub">WCAG 2.1 AA across both themes was a non-negotiable scope decision. Every foreground/background pair was measured, not eyeballed.</div>
        </div>
        <div className="ab-head__right">
          <div className="ab-meta"><span className="ab-meta__k">Target</span><span className="ab-meta__v">WCAG 2.1 AA</span></div>
          <div className="ab-meta"><span className="ab-meta__k">Tools</span><span className="ab-meta__v">axe-core · VoiceOver</span></div>
        </div>
      </div>

      <div className="ab-body" style={{overflow:"hidden"}}>
        <div style={{display:"grid", gridTemplateColumns:"1fr 0.9fr 0.9fr", gap:20, height:"100%"}}>

          <div style={{display:"flex", flexDirection:"column", gap:8, minHeight:0}}>
            <div style={{fontFamily:"var(--f-mono)", fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--c-ink-4)"}}>Contrast review (sampled)</div>
            <div style={{background:"var(--c-surface)", border:"1px solid var(--c-line)", borderRadius:10, padding:"4px 14px", flex:1, overflow:"auto"}}>
              {contrast.map((c, i) => (
                <div key={i} style={{display:"flex", alignItems:"center", justifyContent:"space-between", padding:"10px 0", borderBottom: i < contrast.length-1 ? "1px solid var(--c-line)" : "none"}}>
                  <span style={{fontSize:11.5, color:"var(--c-ink)"}}>{c.pair}</span>
                  <div style={{display:"flex", alignItems:"center", gap:8}}>
                    <span style={{fontFamily:"var(--f-mono)", fontSize:11, color:"var(--c-ink-3)"}}>{c.v}</span>
                    <span style={{
                      fontFamily:"var(--f-mono)", fontSize:9.5, fontWeight:600, padding:"2px 7px", borderRadius:999,
                      background: c.level.startsWith("AAA") ? "var(--c-success-bg)" : "var(--c-accent-tint)",
                      color: c.level.startsWith("AAA") ? "var(--c-success)" : "var(--c-accent-2)",
                    }}>{c.level}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{display:"flex", flexDirection:"column", gap:10}}>
            <div style={{fontFamily:"var(--f-mono)", fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--c-ink-4)"}}>Fixed from audit</div>
            {fixes.map((f, i) => (
              <div key={i} style={{
                background:"var(--c-success-bg)", border:"1px solid var(--c-success-bg)", borderRadius:10,
                padding:"11px 13px", display:"flex", flexDirection:"column", gap:4,
              }}>
                <div style={{fontSize:12, fontWeight:600, color:"var(--c-success)"}}>{f.item}</div>
                <div style={{fontSize:11, color:"var(--c-ink-3)", lineHeight:1.4}}>{f.note}</div>
              </div>
            ))}
            <div style={{
              padding:"10px 13px", background:"var(--c-surface-2)", border:"1px solid var(--c-line)",
              borderRadius:8, fontSize:11, color:"var(--c-ink-4)", lineHeight:1.4, fontFamily:"var(--f-mono)",
            }}>44px min touch targets · keyboard reachable everywhere · prefers-reduced-motion respected.</div>
          </div>

          <div style={{display:"flex", flexDirection:"column", gap:10}}>
            <div style={{fontFamily:"var(--f-mono)", fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--c-ink-4)"}}>Planned (v1.1–v1.2)</div>
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
