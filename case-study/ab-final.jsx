/* global React */
// Final UI artboard — live embed of the real, working product (ui_kits/finflow).
// Rebuilt entirely in FinFlow's own design system (slate blue + cream + General Sans).

function ArtboardFinalUI() {
  return (
    <div className="ab" style={{background:"var(--p-paper)"}}>
      <div className="ab-head" style={{borderBottom:"1px solid var(--p-line)"}}>
        <div className="ab-head__left">
          <div style={{fontFamily:"var(--f-mono)", fontSize:11, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--p-accent)", display:"flex", alignItems:"center", gap:8, marginBottom:10}}>
            <span style={{background:"var(--p-accent)", color:"#fff", borderRadius:4, padding:"2px 7px", fontWeight:700}}>08</span>Deliver · Final UI
          </div>
          <h1 style={{fontFamily:"var(--p-font)", fontSize:32, fontWeight:600, color:"var(--p-ink)", margin:0, letterSpacing:"-0.01em"}}>Three roles, one system.</h1>
          <div style={{fontFamily:"var(--p-font)", fontSize:14, color:"var(--p-ink-3)", marginTop:8, maxWidth:640, lineHeight:1.5}}>Finance Admin, Manager, and Employee dashboards built on the same component library and tokens, switch roles from the topbar segmented control below.</div>
        </div>
        <div className="ab-head__right">
          <div style={{textAlign:"right", marginBottom:8}}>
            <div style={{fontFamily:"var(--f-mono)", fontSize:9.5, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--p-ink-3)"}}>Company</div>
            <div style={{fontFamily:"var(--p-font)", fontSize:14, fontWeight:600, color:"var(--p-ink)"}}>Client workspace</div>
          </div>
          <div style={{textAlign:"right"}}>
            <div style={{fontFamily:"var(--f-mono)", fontSize:9.5, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--p-ink-3)"}}>Screens</div>
            <div style={{fontFamily:"var(--p-font)", fontSize:14, fontWeight:600, color:"var(--p-ink)"}}>47</div>
          </div>
        </div>
      </div>

      <div className="ab-body" style={{padding:"20px 40px 32px", background:"var(--p-paper)"}}>
        <div style={{
          height:"100%", borderRadius:14, overflow:"hidden",
          border:"1px solid var(--p-line)", background:"#FFFFFF",
        }}>
          <iframe
            src="ui_kits/finflow/index.html"
            title="FinFlow final UI — live"
            style={{ width:"100%", height:"100%", border:"none", display:"block" }}
          />
        </div>
      </div>

      <div className="ab-foot" style={{borderTop:"1px solid var(--p-line)"}}>
        <div className="brand" style={{color:"var(--p-ink-3)"}}><span className="dot" style={{background:"var(--p-accent)"}}></span> FinFlow · Shipped Client Product · 2026</div>
        <div style={{color:"var(--p-ink-3)"}}>Deliver · Final UI · responsive</div>
      </div>
    </div>
  );
}

window.ArtboardFinalUI = ArtboardFinalUI;
