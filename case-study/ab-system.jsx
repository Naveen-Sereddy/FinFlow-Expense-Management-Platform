/* global React */
// Design system artboard — principles, color, type, spacing, components.
// Rebuilt entirely in FinFlow's own design system (slate blue + cream + General Sans).

function ArtboardDesignSystem() {
  const principles = [
    "Quiet density, density chosen at the role level, not the component level.",
    "Trust through type, tabular figures everywhere quantity matters.",
    "Status never lies, every state is icon + label, never color alone.",
    "One workspace, three voices, same brand, different defaults per role.",
    "No decoration, confidence from typography and density, not effects.",
  ];
  const type = [
    { t: "Page title", s: "34 / 600" },
    { t: "Card title", s: "15 / 600" },
    { t: "Body", s: "14 / 400" },
    { t: "Compact", s: "13 / 400" },
    { t: "Eyebrow", s: "11 / 500 · +0.06em" },
    { t: "Mono (IDs, money)", s: "12 / 400 · tabular" },
  ];
  const spacing = [4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80];
  const components = ["Buttons (4 variants)", "Forms", "Borderless tables", "Charts (SVG, keyboard tooltips)", "Status pills (7 semantic groups)", "StatRow / hero KPI", "CategoryTag", "EmptyState", "Avatars", "Chips", "Tabs", "Command palette"];
  const swatches = [
    { l: "Slate Blue 500", h: "#385A9C" },
    { l: "Slate Blue 400", h: "#5E7FBD" },
    { l: "Ink 950", h: "#1C1917" },
    { l: "Ink 500", h: "#7C7468" },
    { l: "Ink 200", h: "#DEDBD3" },
    { l: "Paper", h: "#FBF9F5" },
  ];

  return (
    <div className="ab" style={{background:"var(--p-paper)"}}>
      <div className="ab-head" style={{borderBottom:"1px solid var(--p-line)"}}>
        <div className="ab-head__left">
          <div style={{fontFamily:"var(--f-mono)", fontSize:11, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--p-accent)", display:"flex", alignItems:"center", gap:8, marginBottom:10}}>
            <span style={{background:"var(--p-accent)", color:"#fff", borderRadius:4, padding:"2px 7px", fontWeight:700}}>06</span>Design · System
          </div>
          <h1 style={{fontFamily:"var(--p-font)", fontSize:32, fontWeight:600, color:"var(--p-ink)", margin:0, letterSpacing:"-0.01em"}}>A narrow, disciplined system.</h1>
          <div style={{fontFamily:"var(--p-font)", fontSize:14, color:"var(--p-ink-3)", marginTop:8, maxWidth:600, lineHeight:1.5}}>One brand color, seven semantic status groups, a warm neutral ramp. Token-first, both themes from day one, components own their states, never the screen.</div>
        </div>
        <div className="ab-head__right">
          <div style={{textAlign:"right"}}>
            <div style={{fontFamily:"var(--f-mono)", fontSize:9.5, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--p-ink-3)"}}>Base unit</div>
            <div style={{fontFamily:"var(--p-font)", fontSize:15, fontWeight:600, color:"var(--p-ink)"}}>4px grid</div>
          </div>
        </div>
      </div>

      <div className="ab-body" style={{overflow:"hidden", background:"var(--p-paper)"}}>
        <div style={{display:"grid", gridTemplateColumns:"0.9fr 1fr 1.1fr", gap:20, height:"100%", fontFamily:"var(--p-font)"}}>

          <div style={{display:"flex", flexDirection:"column", gap:10}}>
            <div style={{fontFamily:"var(--f-mono)", fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--p-ink-3)"}}>Principles</div>
            {principles.map((p, i) => (
              <div key={i} style={{
                background:"#FFFFFF", border:"1px solid var(--p-line)", borderRadius:10,
                padding:"10px 12px", fontSize:11.5, color:"var(--p-ink-3)", lineHeight:1.5,
              }}>{p}</div>
            ))}
          </div>

          <div style={{display:"flex", flexDirection:"column", gap:12}}>
            <div>
              <div style={{fontFamily:"var(--f-mono)", fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--p-ink-3)", marginBottom:8}}>Color</div>
              <div style={{display:"flex", gap:6, background:"#FFFFFF", border:"1px solid var(--p-line)", borderRadius:10, padding:10}}>
                {swatches.map((s, i) => (
                  <div key={i} style={{flex:1, display:"flex", flexDirection:"column", gap:5}}>
                    <div style={{height:34, borderRadius:6, background:s.h, border:"1px solid var(--p-line)"}}></div>
                    <span style={{fontFamily:"var(--f-mono)", fontSize:7.5, color:"var(--p-ink-3)", textAlign:"center"}}>{s.h}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div style={{fontFamily:"var(--f-mono)", fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--p-ink-3)", marginBottom:8}}>Type scale</div>
              <div style={{background:"#FFFFFF", border:"1px solid var(--p-line)", borderRadius:10, padding:"6px 14px"}}>
                {type.map((t, i) => (
                  <div key={i} style={{display:"flex", justifyContent:"space-between", padding:"8px 0", borderBottom: i < type.length-1 ? "1px solid var(--p-line)" : "none"}}>
                    <span style={{fontSize:12, color:"var(--p-ink)"}}>{t.t}</span>
                    <span style={{fontFamily:"var(--f-mono)", fontSize:11, color:"var(--p-ink-3)"}}>{t.s}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div style={{fontFamily:"var(--f-mono)", fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--p-ink-3)", marginBottom:8}}>Spacing scale (px)</div>
              <div style={{display:"flex", alignItems:"flex-end", gap:6, background:"#FFFFFF", border:"1px solid var(--p-line)", borderRadius:10, padding:"14px 14px 10px"}}>
                {spacing.map((s, i) => (
                  <div key={i} style={{display:"flex", flexDirection:"column", alignItems:"center", gap:4}}>
                    <div style={{width:14, height:Math.max(6, s*0.6), background:"var(--p-accent)", opacity:0.55+i*0.04, borderRadius:2}}></div>
                    <span style={{fontFamily:"var(--f-mono)", fontSize:8.5, color:"var(--p-ink-3)"}}>{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{display:"flex", flexDirection:"column", gap:12}}>
            <div>
              <div style={{fontFamily:"var(--f-mono)", fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--p-ink-3)", marginBottom:8}}>Status, 7 semantic groups, never color alone</div>
              <div style={{display:"flex", flexWrap:"wrap", gap:8}}>
                {[
                  { l:"Success", bg:"#DEFBE2", c:"#005603" },
                  { l:"Warning", bg:"#FFEDCE", c:"#773000" },
                  { l:"Danger", bg:"#FFE4DF", c:"#97000F" },
                  { l:"Review", bg:"#EFEBFF", c:"#552F9F" },
                  { l:"Info", bg:"#E6F3FF", c:"#004296" },
                  { l:"Action", bg:"#FFE3CE", c:"#8E1E00" },
                  { l:"Neutral", bg:"#F0EAE4", c:"#4B4742" },
                ].map((s, i) => (
                  <span key={i} style={{
                    display:"inline-flex", alignItems:"center", gap:5, padding:"5px 11px", borderRadius:999,
                    background:s.bg, color:s.c, fontSize:11.5, fontWeight:600,
                  }}><span style={{width:5,height:5,borderRadius:"50%",background:s.c}}></span>{s.l}</span>
                ))}
              </div>
            </div>
            <div style={{flex:1, minHeight:0}}>
              <div style={{fontFamily:"var(--f-mono)", fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--p-ink-3)", marginBottom:8}}>Component library</div>
              <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:6}}>
                {components.map((c, i) => (
                  <div key={i} style={{
                    fontSize:11.5, color:"var(--p-ink-3)", padding:"7px 10px", borderRadius:7,
                    background:"#FFFFFF", border:"1px solid var(--p-line)",
                  }}>{c}</div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="ab-foot" style={{borderTop:"1px solid var(--p-line)"}}>
        <div className="brand" style={{color:"var(--p-ink-3)"}}><span className="dot" style={{background:"var(--p-accent)"}}></span> FinFlow · Concept Case Study · 2026</div>
        <div style={{color:"var(--p-ink-3)"}}>Design · System</div>
      </div>
    </div>
  );
}

window.ArtboardDesignSystem = ArtboardDesignSystem;
