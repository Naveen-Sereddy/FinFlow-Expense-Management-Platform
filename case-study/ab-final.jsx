/* global React */
// Final UI artboard — live embed of the real, working product (ui_kits/finflow).

function ArtboardFinalUI() {
  return (
    <div className="ab">
      <div className="ab-head">
        <div className="ab-head__left">
          <div className="ab-eyebrow"><span className="num" style={{background:"var(--c-surface-2)"}}>08</span>Deliver · Final UI</div>
          <h1 className="ab-title">Three roles, one system.</h1>
          <div className="ab-sub">Finance Admin, Manager, and Employee dashboards built on the same component library and tokens — switch roles from the topbar segmented control below.</div>
        </div>
        <div className="ab-head__right">
          <div className="ab-meta"><span className="ab-meta__k">Company</span><span className="ab-meta__v">Arcadia Labs</span></div>
          <div className="ab-meta"><span className="ab-meta__k">Screens</span><span className="ab-meta__v">30+</span></div>
        </div>
      </div>

      <div className="ab-body" style={{padding:"20px 40px 32px"}}>
        <div style={{
          height:"100%", borderRadius:14, overflow:"hidden",
          border:"1px solid var(--c-line)", background:"var(--c-surface)",
        }}>
          <iframe
            src="ui_kits/finflow/index.html"
            title="FinFlow final UI — live"
            style={{ width:"100%", height:"100%", border:"none", display:"block" }}
          />
        </div>
      </div>

      <div className="ab-foot">
        <div className="brand"><span className="dot"></span> FinFlow · Concept Case Study · 2026</div>
        <div>Deliver · Final UI · responsive</div>
      </div>
    </div>
  );
}

window.ArtboardFinalUI = ArtboardFinalUI;
