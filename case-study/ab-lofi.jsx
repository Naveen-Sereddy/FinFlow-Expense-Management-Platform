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
        { h: 100, label: "Hero KPI (1.7fr) · KPI · KPI · KPI" },
        { h: 150, label: "Spend over time (1.8fr)" },
        { h: 150, label: "Budget bars + category legend (1fr)" },
        { h: 70, label: "Pending approvals — borderless table" },
        { h: 70, label: "Recent activity — borderless table" },
      ],
    },
    {
      name: "Expenses",
      blocks: [
        { h: 36, label: "Eyebrow · Title · New expense" },
        { h: 32, label: "Status chips · search · category · date · columns" },
        { h: 32, label: "Bulk toolbar (on select)" },
        { h: 244, label: "Borderless table · density toggle" },
      ],
    },
    {
      name: "Approvals",
      blocks: [
        { h: 36, label: "Eyebrow · Title · Bulk approve" },
        { h: 32, label: "Selection bar — always visible, running total" },
        { h: 280, label: "Row list · receipt thumb + policy chip per row" },
      ],
    },
  ];

  return (
    <div className="ab">
      <div className="ab-head">
        <div className="ab-head__left">
          <div className="ab-eyebrow"><span className="num" style={{background:"var(--c-surface-2)"}}>04</span>Design · Low-fi wireframes</div>
          <h1 className="ab-title">Layout before pixels.</h1>
          <div className="ab-sub">Grayscale blocking locks in hierarchy and grid for the three highest-traffic screens — asymmetric on purpose, not a KPI-card grid repeated three times.</div>
        </div>
        <div className="ab-head__right">
          <div className="ab-meta"><span className="ab-meta__k">Grid</span><span className="ab-meta__v">Hero + inline stats</span></div>
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
