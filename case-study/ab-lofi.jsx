/* global React */
// Low-fidelity wireframes — grayscale layout blocking before any visual design.

function WireBlock({ h, label, fill }) {
  return (
    <div style={{
      height: h, borderRadius: 4, border: "1px dashed var(--c-ink-4)",
      background: fill ? "var(--c-surface-2)" : "transparent",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "var(--f-mono)", fontSize: 9.5, color: "var(--c-ink-4)", letterSpacing: "0.04em",
    }}>{label}</div>
  );
}

function ArtboardLoFi() {
  const screens = [
    {
      name: "Dashboard",
      blocks: [
        { h: 36, label: "Eyebrow · Title · Subtitle" },
        { h: 56, label: "KPI · KPI · KPI · KPI" },
        { h: 130, label: "Spend over time (2fr)" },
        { h: 130, label: "Budget vs spent (1fr)" },
        { h: 90, label: "Pending approvals" },
        { h: 90, label: "Spend by category" },
      ],
    },
    {
      name: "Expenses",
      blocks: [
        { h: 36, label: "Eyebrow · Title · New expense" },
        { h: 32, label: "Filter chips" },
        { h: 280, label: "Dense table · sticky header" },
      ],
    },
    {
      name: "Approvals",
      blocks: [
        { h: 36, label: "Eyebrow · Title · Bulk approve" },
        { h: 36, label: "Bulk-action bar (on select)" },
        { h: 280, label: "Dense list · policy chip per row" },
      ],
    },
  ];

  return (
    <div className="ab">
      <div className="ab-head">
        <div className="ab-head__left">
          <div className="ab-eyebrow"><span className="num" style={{background:"var(--c-surface-2)"}}>04</span>Design · Low-fi wireframes</div>
          <h1 className="ab-title">Layout before pixels.</h1>
          <div className="ab-sub">Grayscale blocking locks in hierarchy and grid for the three highest-traffic screens before any color, type, or component decisions.</div>
        </div>
        <div className="ab-head__right">
          <div className="ab-meta"><span className="ab-meta__k">Grid</span><span className="ab-meta__v">KPI strip · 2-col hero</span></div>
        </div>
      </div>

      <div className="ab-body" style={{overflow:"hidden"}}>
        <div style={{display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:20, height:"100%"}}>
          {screens.map((s, i) => (
            <div key={i} style={{display:"flex", flexDirection:"column", gap:8, minHeight:0}}>
              <div style={{fontFamily:"var(--f-mono)", fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--c-ink-4)"}}>{s.name}</div>
              <div style={{
                flex:1, background:"var(--c-surface)", border:"1px solid var(--c-line)", borderRadius:12,
                padding:14, display:"flex", flexDirection:"column", gap:8, overflow:"auto",
              }}>
                {s.blocks.map((b, bi) => <WireBlock key={bi} {...b} />)}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="ab-foot">
        <div className="brand"><span className="dot"></span> FinFlow · Concept Case Study · 2026</div>
        <div>Design · Low-fi wireframes</div>
      </div>
    </div>
  );
}

window.ArtboardLoFi = ArtboardLoFi;
