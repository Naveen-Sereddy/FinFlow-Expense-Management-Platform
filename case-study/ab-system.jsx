/* global React */
// Design system artboard — principles, color, type, spacing, components.

function ArtboardDesignSystem() {
  const principles = [
    "Quiet density — density chosen at the role level, not the component level.",
    "Trust through type — tabular figures everywhere quantity matters.",
    "Status never lies — every state is icon + label, never color alone.",
    "One workspace, three voices — same brand, different defaults per role.",
    "No decoration — confidence from typography and density, not effects.",
  ];
  const type = [
    { t: "Page title", s: "32 / 700" },
    { t: "Card title", s: "17 / 600" },
    { t: "Body", s: "14 / 400" },
    { t: "Compact", s: "13 / 400" },
    { t: "Eyebrow", s: "11 / 500 · +0.08em" },
    { t: "Mono (IDs, PAN)", s: "12 / 400" },
  ];
  const spacing = [4, 8, 12, 16, 20, 24, 32, 40, 48, 64];
  const components = ["Buttons (5 variants)", "Forms", "Tables", "Charts (SVG, no library)", "Status pills", "KPI tiles", "Avatars", "Chips", "Tabs", "Alerts", "Modals", "Steps"];

  return (
    <div className="ab">
      <div className="ab-head">
        <div className="ab-head__left">
          <div className="ab-eyebrow"><span className="num" style={{background:"var(--c-surface-2)"}}>06</span>Design · System</div>
          <h1 className="ab-title">A narrow, disciplined system.</h1>
          <div className="ab-sub">One brand color, one accent, four semantic states, a warm neutral ramp. Token-first, both themes from day one — components own their states, never the screen.</div>
        </div>
        <div className="ab-head__right">
          <div className="ab-meta"><span className="ab-meta__k">Base unit</span><span className="ab-meta__v">4px grid</span></div>
        </div>
      </div>

      <div className="ab-body" style={{overflow:"hidden"}}>
        <div style={{display:"grid", gridTemplateColumns:"0.9fr 1fr 1.1fr", gap:20, height:"100%"}}>

          <div style={{display:"flex", flexDirection:"column", gap:10}}>
            <div style={{fontFamily:"var(--f-mono)", fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--c-ink-4)"}}>Principles</div>
            {principles.map((p, i) => (
              <div key={i} style={{
                background:"var(--c-surface)", border:"1px solid var(--c-line)", borderRadius:10,
                padding:"10px 12px", fontSize:11.5, color:"var(--c-ink-3)", lineHeight:1.5,
              }}>{p}</div>
            ))}
          </div>

          <div style={{display:"flex", flexDirection:"column", gap:12}}>
            <div>
              <div style={{fontFamily:"var(--f-mono)", fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--c-ink-4)", marginBottom:8}}>Type scale</div>
              <div style={{background:"var(--c-surface)", border:"1px solid var(--c-line)", borderRadius:10, padding:"6px 14px"}}>
                {type.map((t, i) => (
                  <div key={i} style={{display:"flex", justifyContent:"space-between", padding:"8px 0", borderBottom: i < type.length-1 ? "1px solid var(--c-line)" : "none"}}>
                    <span style={{fontSize:12, color:"var(--c-ink)"}}>{t.t}</span>
                    <span style={{fontFamily:"var(--f-mono)", fontSize:11, color:"var(--c-ink-4)"}}>{t.s}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div style={{fontFamily:"var(--f-mono)", fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--c-ink-4)", marginBottom:8}}>Spacing scale (px)</div>
              <div style={{display:"flex", alignItems:"flex-end", gap:6, background:"var(--c-surface)", border:"1px solid var(--c-line)", borderRadius:10, padding:"14px 14px 10px"}}>
                {spacing.map((s, i) => (
                  <div key={i} style={{display:"flex", flexDirection:"column", alignItems:"center", gap:4}}>
                    <div style={{width:14, height:Math.max(6, s*0.6), background:"var(--c-accent)", opacity:0.55+i*0.04, borderRadius:2}}></div>
                    <span style={{fontFamily:"var(--f-mono)", fontSize:8.5, color:"var(--c-ink-4)"}}>{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{display:"flex", flexDirection:"column", gap:12}}>
            <div>
              <div style={{fontFamily:"var(--f-mono)", fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--c-ink-4)", marginBottom:8}}>Status — never color alone</div>
              <div style={{display:"flex", flexWrap:"wrap", gap:8}}>
                {[
                  { l:"Approved", bg:"var(--c-success-bg)", c:"var(--c-success)" },
                  { l:"Pending", bg:"var(--c-accent-tint)", c:"var(--c-accent-2)" },
                  { l:"Rejected", bg:"var(--c-error-bg)", c:"var(--c-error)" },
                  { l:"Flagged", bg:"var(--c-surface-2)", c:"var(--c-ink-3)" },
                ].map((s, i) => (
                  <span key={i} style={{
                    display:"inline-flex", alignItems:"center", gap:5, padding:"5px 11px", borderRadius:999,
                    background:s.bg, color:s.c, fontSize:11.5, fontWeight:600,
                  }}><span style={{width:5,height:5,borderRadius:"50%",background:s.c}}></span>{s.l}</span>
                ))}
              </div>
            </div>
            <div style={{flex:1, minHeight:0}}>
              <div style={{fontFamily:"var(--f-mono)", fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--c-ink-4)", marginBottom:8}}>Component library</div>
              <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:6}}>
                {components.map((c, i) => (
                  <div key={i} style={{
                    fontSize:11.5, color:"var(--c-ink-3)", padding:"7px 10px", borderRadius:7,
                    background:"var(--c-surface)", border:"1px solid var(--c-line)",
                  }}>{c}</div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="ab-foot">
        <div className="brand"><span className="dot"></span> FinFlow · Concept Case Study · 2026</div>
        <div>Design · System</div>
      </div>
    </div>
  );
}

window.ArtboardDesignSystem = ArtboardDesignSystem;
