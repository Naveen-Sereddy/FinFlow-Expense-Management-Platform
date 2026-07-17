/* global React */
// Clickable prototype artboard — the real app, fully interactive.

function ArtboardPrototype() {
  return (
    <div className="ab">
      <div className="ab-head">
        <div className="ab-head__left">
          <div className="ab-eyebrow"><span className="num" style={{background:"var(--c-surface-2)"}}>09</span>Deliver · Prototype</div>
          <h1 className="ab-title">Fully clickable. Not a Figma flow.</h1>
          <div className="ab-sub">Real screen-to-screen navigation — sign-in through all three role dashboards, expenses, approvals, cards, reports, and settings. Try the bulk-approve flow in Approvals, or ⌘K to jump anywhere.</div>
        </div>
        <div className="ab-head__right">
          <div className="ab-meta"><span className="ab-meta__k">Status</span><span className="ab-meta__v" style={{color:"var(--c-success)"}}>Live · interactive</span></div>
        </div>
      </div>

      <div className="ab-body" style={{padding:"20px 40px 32px"}}>
        <div style={{
          height:"100%", borderRadius:14, overflow:"hidden",
          border:"1px solid var(--c-accent-line)", background:"var(--c-surface)",
          boxShadow:"0 0 0 1px var(--c-accent-tint)",
        }}>
          <iframe
            src="ui_kits/finflow/index.html"
            title="FinFlow clickable prototype"
            style={{ width:"100%", height:"100%", border:"none", display:"block" }}
          />
        </div>
      </div>

      <div className="ab-foot">
        <div className="brand"><span className="dot"></span> FinFlow · Concept Case Study · 2026</div>
        <div>Deliver · Clickable prototype</div>
      </div>
    </div>
  );
}

window.ArtboardPrototype = ArtboardPrototype;
