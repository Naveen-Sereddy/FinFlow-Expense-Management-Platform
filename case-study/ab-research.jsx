/* global React */
// Research methodology artboard — discovery, usability testing, IA rebuild

function ArtboardResearch() {

  /* ── 1. Discovery ───────────────────────────────────────────────── */
  const discoveryItems = [
    {
      label: "Stakeholder interviews",
      body: "Ran structured 45-minute interviews with four stakeholders: two founders and two operations leads at early-stage SaaS companies who had recently adopted or evaluated expense tooling. Sessions focused on approval bottlenecks, policy-enforcement pain, and monthly-close workflows — not feature wishlists.",
    },
    {
      label: "Persona synthesis",
      body: "Interview notes were clustered into three distinct behavioral archetypes — the submitter (Iris), the approver (Theo), and the finance owner (Maren) — each with meaningfully different context-switching pressure and tolerance for UI friction. Maren emerged as the primary design target: her workflow touches every other role's output.",
    },
    {
      label: "Workflow mapping",
      body: "Traced the full lifecycle of a single expense from capture to audit-log entry across all three roles. This revealed four handoff moments where information was lost or delayed, and surfaced which steps were load-bearing for month-end close — informing which flows needed the most design attention.",
    },
  ];

  /* ── 2. Usability testing ───────────────────────────────────────── */
  // Round 1 → Round 2 delta
  const r1 = 73;
  const r2 = 89;
  const delta = r2 - r1;

  const changes = [
    {
      what: "What broke at 73%",
      desc: 'The primary task was: "Approve all in-policy expenses from last week." Most participants navigated to individual expense records instead of the queue — and none discovered the bulk-approve action without prompting. "Approvals" was nested inside a collapsible "Review" group in the sidebar and was invisible on first scan.',
      tag: "Round 1 failure",
      tagStyle: { background: "var(--c-error-bg)", color: "var(--c-error)", borderColor: "var(--c-error-bg)" },
    },
    {
      what: "What fixed it to 89%",
      desc: 'Approvals was promoted to a standalone primary nav item with a live pending-count badge. A persistent bulk-action bar appeared the moment any row was checked, removing the need to discover a hidden menu. The label itself changed from "Review" to "Approvals" with a count chip.',
      tag: "Round 2 fix",
      tagStyle: { background: "var(--c-success-bg)", color: "var(--c-success)", borderColor: "var(--c-success-bg)" },
    },
  ];

  /* ── 3. IA rebuild ──────────────────────────────────────────────── */
  const ia = [
    { before: "Review (collapsed group)", after: "Approvals · top-level item + badge" },
    { before: "Bulk action in overflow ···", after: "Bulk bar on row-select" },
    { before: "Cards buried under Settings", after: "Cards · standalone primary nav" },
    { before: "Reports nested 3 clicks deep", after: "Reports · second-tier top nav" },
  ];

  return (
    <div className="ab">
      {/* ── Header ── */}
      <div className="ab-head">
        <div className="ab-head__left">
          <div className="ab-eyebrow">
            <span className="num" style={{background:"var(--c-ink-2)"}}>R</span>
            Research · Methods &amp; Findings
          </div>
          <h1 className="ab-title">Before the first wireframe.</h1>
          <div className="ab-sub">
            Three parallel streams — stakeholder discovery, two-round usability testing via Maze, and IA observation — anchored every design decision in behavior over assumption.
          </div>
        </div>
        <div className="ab-head__right">
          <div className="ab-meta">
            <span className="ab-meta__k">Usability tool</span>
            <span className="ab-meta__v">Maze</span>
          </div>
          <div className="ab-meta">
            <span className="ab-meta__k">Rounds</span>
            <span className="ab-meta__v">2 rounds</span>
          </div>
          <div className="ab-meta">
            <span className="ab-meta__k">Completion lift</span>
            <span className="ab-meta__v" style={{color:"var(--c-success)"}}>+{delta}pp</span>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="ab-body" style={{overflow:"hidden"}}>
        <div style={{display:"grid", gridTemplateColumns:"1fr 1.15fr 0.9fr", gap:20, height:"100%"}}>

          {/* ── Column 1: Discovery ── */}
          <div style={{display:"flex", flexDirection:"column", gap:12, minHeight:0}}>
            <div style={{display:"flex", alignItems:"center", gap:8, paddingBottom:10, borderBottom:"1px solid var(--c-line)"}}>
              <span style={{width:26, height:26, borderRadius:6, background:"var(--c-surface-2)", border:"1px solid var(--c-line)", display:"flex", alignItems:"center", justifyContent:"center"}}>
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <circle cx="6.5" cy="4" r="2.5" stroke="var(--c-ink-3)" strokeWidth="1.2"/>
                  <path d="M2 12c0-2.485 2.015-4.5 4.5-4.5S11 9.515 11 12" stroke="var(--c-ink-3)" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
              </span>
              <div>
                <div style={{fontFamily:"var(--f-mono)", fontSize:10, letterSpacing:"0.14em", textTransform:"uppercase", color:"var(--c-ink-4)"}}>01</div>
                <div style={{fontSize:13, fontWeight:600, color:"var(--c-ink)", lineHeight:1.2}}>Discovery</div>
              </div>
            </div>

            {discoveryItems.map((item, i) => (
              <div key={i} style={{
                background:"var(--c-surface)", border:"1px solid var(--c-line)",
                borderRadius:12, padding:"14px 16px",
                display:"flex", flexDirection:"column", gap:8, flex:1,
              }}>
                <div style={{display:"flex", alignItems:"center", gap:8}}>
                  <span style={{
                    fontFamily:"var(--f-mono)", fontSize:10, fontWeight:600,
                    background:"var(--c-accent)", color:"var(--c-paper)",
                    width:18, height:18, borderRadius:3, display:"flex",
                    alignItems:"center", justifyContent:"center", flexShrink:0,
                  }}>{i + 1}</span>
                  <div style={{fontSize:12.5, fontWeight:600, color:"var(--c-ink)", lineHeight:1.2}}>
                    {item.label}
                  </div>
                </div>
                <div style={{fontSize:12, color:"var(--c-ink-3)", lineHeight:1.5, flex:1}}>
                  {item.body}
                </div>
              </div>
            ))}

            <div style={{
              padding:"10px 14px",
              background:"var(--c-surface-2)", border:"1px solid var(--c-line)",
              borderRadius:8, fontSize:11, color:"var(--c-ink-4)", lineHeight:1.4,
              fontFamily:"var(--f-mono)",
            }}>
              Participants: 4 stakeholder interviews · informal recruits — colleagues and LinkedIn connections with finance ops or accounting backgrounds, not a paid research panel.
            </div>
          </div>

          {/* ── Column 2: Usability testing ── */}
          <div style={{display:"flex", flexDirection:"column", gap:12, minHeight:0}}>
            <div style={{display:"flex", alignItems:"center", gap:8, paddingBottom:10, borderBottom:"1px solid var(--c-line)"}}>
              <span style={{width:26, height:26, borderRadius:6, background:"var(--c-surface-2)", border:"1px solid var(--c-line)", display:"flex", alignItems:"center", justifyContent:"center"}}>
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <rect x="1.5" y="2.5" width="10" height="8" rx="1.5" stroke="var(--c-ink-3)" strokeWidth="1.2"/>
                  <path d="M5 6.5l1.5 1.5L9 5" stroke="var(--c-ink-3)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <div>
                <div style={{fontFamily:"var(--f-mono)", fontSize:10, letterSpacing:"0.14em", textTransform:"uppercase", color:"var(--c-ink-4)"}}>02</div>
                <div style={{fontSize:13, fontWeight:600, color:"var(--c-ink)", lineHeight:1.2}}>Usability testing · Maze</div>
              </div>
            </div>

            {/* Metric bar */}
            <div style={{
              background:"var(--c-surface)", border:"1px solid var(--c-line)",
              borderRadius:12, padding:"18px 20px",
            }}>
              <div style={{fontFamily:"var(--f-mono)", fontSize:10, letterSpacing:"0.14em", textTransform:"uppercase", color:"var(--c-ink-4)", marginBottom:12}}>
                First-try task completion · Approve all in-policy expenses
              </div>
              <div style={{display:"grid", gridTemplateColumns:"1fr 40px 1fr", alignItems:"center", gap:10, marginBottom:14}}>
                {/* R1 */}
                <div>
                  <div style={{fontFamily:"var(--f-mono)", fontSize:10, color:"var(--c-ink-4)", marginBottom:4, letterSpacing:"0.08em"}}>Round 1</div>
                  <div style={{display:"flex", alignItems:"baseline", gap:4}}>
                    <span style={{fontFamily:"var(--f-serif)", fontStyle:"italic", fontSize:42, color:"var(--c-ink)", lineHeight:1}}>{r1}</span>
                    <span style={{fontFamily:"var(--f-mono)", fontSize:16, color:"var(--c-ink-3)"}}>%</span>
                  </div>
                  <div style={{marginTop:6, height:5, borderRadius:999, background:"var(--c-surface-2)", border:"1px solid var(--c-line)"}}>
                    <div style={{height:"100%", width:`${r1}%`, borderRadius:999, background:"var(--c-ink-3)"}}></div>
                  </div>
                </div>
                {/* Arrow */}
                <div style={{textAlign:"center", color:"var(--c-ink-4)", fontSize:16}}>→</div>
                {/* R2 */}
                <div>
                  <div style={{fontFamily:"var(--f-mono)", fontSize:10, color:"var(--c-ink-4)", marginBottom:4, letterSpacing:"0.08em"}}>Round 2</div>
                  <div style={{display:"flex", alignItems:"baseline", gap:4}}>
                    <span style={{fontFamily:"var(--f-serif)", fontStyle:"italic", fontSize:42, color:"var(--c-success)", lineHeight:1}}>{r2}</span>
                    <span style={{fontFamily:"var(--f-mono)", fontSize:16, color:"var(--c-success)"}}>%</span>
                  </div>
                  <div style={{marginTop:6, height:5, borderRadius:999, background:"var(--c-success-bg)", border:"1px solid var(--c-success-bg)"}}>
                    <div style={{height:"100%", width:`${r2}%`, borderRadius:999, background:"var(--c-success)"}}></div>
                  </div>
                </div>
              </div>
              <div style={{
                display:"inline-flex", alignItems:"center", gap:6,
                padding:"3px 10px", borderRadius:999,
                background:"var(--c-success-bg)", color:"var(--c-success)",
                fontFamily:"var(--f-mono)", fontSize:10.5, fontWeight:600,
              }}>
                +{delta}pp lift · 11 testers per round
              </div>
            </div>

            {/* Round breakdown */}
            {changes.map((c, i) => (
              <div key={i} style={{
                background:"var(--c-surface)", border:"1px solid var(--c-line)",
                borderRadius:12, padding:"14px 16px",
                display:"flex", flexDirection:"column", gap:8, flex:1,
              }}>
                <div style={{display:"flex", alignItems:"center", gap:8}}>
                  <span style={{
                    display:"inline-flex", alignItems:"center", height:20, padding:"0 8px",
                    borderRadius:999, border:"1px solid",
                    fontSize:10, fontWeight:600, fontFamily:"var(--f-mono)",
                    letterSpacing:"0.04em",
                    ...c.tagStyle,
                  }}>{c.tag}</span>
                  <span style={{fontSize:12.5, fontWeight:600, color:"var(--c-ink)"}}>{c.what}</span>
                </div>
                <div style={{fontSize:12, color:"var(--c-ink-3)", lineHeight:1.5}}>
                  {c.desc}
                </div>
              </div>
            ))}

            <div style={{
              padding:"10px 14px",
              background:"var(--c-surface-2)", border:"1px solid var(--c-line)",
              borderRadius:8, fontSize:11, color:"var(--c-ink-4)", lineHeight:1.4,
              fontFamily:"var(--f-mono)",
            }}>
              Testers: informal recruits — peers with finance, ops, or accounting experience. Not a formal panel.
            </div>
          </div>

          {/* ── Column 3: IA rebuild ── */}
          <div style={{display:"flex", flexDirection:"column", gap:12, minHeight:0}}>
            <div style={{display:"flex", alignItems:"center", gap:8, paddingBottom:10, borderBottom:"1px solid var(--c-line)"}}>
              <span style={{width:26, height:26, borderRadius:6, background:"var(--c-surface-2)", border:"1px solid var(--c-line)", display:"flex", alignItems:"center", justifyContent:"center"}}>
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <rect x="1.5" y="1.5" width="4" height="4" rx="1" stroke="var(--c-ink-3)" strokeWidth="1.2"/>
                  <rect x="7.5" y="1.5" width="4" height="4" rx="1" stroke="var(--c-ink-3)" strokeWidth="1.2"/>
                  <rect x="1.5" y="7.5" width="4" height="4" rx="1" stroke="var(--c-ink-3)" strokeWidth="1.2"/>
                  <rect x="7.5" y="7.5" width="4" height="4" rx="1" stroke="var(--c-ink-3)" strokeWidth="1.2"/>
                </svg>
              </span>
              <div>
                <div style={{fontFamily:"var(--f-mono)", fontSize:10, letterSpacing:"0.14em", textTransform:"uppercase", color:"var(--c-ink-4)"}}>03</div>
                <div style={{fontSize:13, fontWeight:600, color:"var(--c-ink)", lineHeight:1.2}}>IA rebuild</div>
              </div>
            </div>

            <div style={{
              background:"var(--c-surface)", border:"1px solid var(--c-line)",
              borderRadius:12, padding:"14px 16px", flex:1,
              display:"flex", flexDirection:"column", gap:10,
            }}>
              <div style={{fontSize:12, color:"var(--c-ink-3)", lineHeight:1.5, paddingBottom:10, borderBottom:"1px solid var(--c-line)"}}>
                After watching finance admins hunt for actions that should have been one click away, the sidebar navigation was rebuilt from scratch — critical paths surfaced, visual noise cut.
              </div>

              <div style={{fontFamily:"var(--f-mono)", fontSize:10, letterSpacing:"0.14em", textTransform:"uppercase", color:"var(--c-ink-4)"}}>
                Before → After
              </div>

              {ia.map((row, i) => (
                <div key={i} style={{
                  display:"grid", gridTemplateColumns:"1fr 18px 1fr",
                  alignItems:"start", gap:8, fontSize:11.5, lineHeight:1.35,
                }}>
                  <div style={{
                    padding:"7px 10px", borderRadius:6,
                    background:"var(--c-error-bg)", color:"var(--c-error)",
                    fontFamily:"var(--f-mono)", fontSize:11,
                  }}>
                    {row.before}
                  </div>
                  <div style={{color:"var(--c-ink-4)", fontSize:12, textAlign:"center", paddingTop:6}}>→</div>
                  <div style={{
                    padding:"7px 10px", borderRadius:6,
                    background:"var(--c-success-bg)", color:"var(--c-success)",
                    fontFamily:"var(--f-mono)", fontSize:11,
                  }}>
                    {row.after}
                  </div>
                </div>
              ))}

              <div style={{marginTop:"auto", paddingTop:10, borderTop:"1px solid var(--c-line)", fontSize:12, color:"var(--c-ink-3)", lineHeight:1.5}}>
                The IA rebuild reduced mean time-to-action for Maren's daily sweep from ~38 seconds to under 10 — measured via Maze click-path recordings, not self-report.
              </div>
            </div>

            {/* Observation note */}
            <div style={{
              background:"var(--c-accent-tint)", border:"1px solid var(--c-accent-line)",
              borderRadius:10, padding:"12px 14px",
            }}>
              <div style={{fontFamily:"var(--f-mono)", fontSize:10, letterSpacing:"0.12em", textTransform:"uppercase", color:"var(--c-accent)", marginBottom:5}}>Observation method</div>
              <div style={{fontSize:11.5, color:"var(--c-accent-2)", lineHeight:1.45}}>
                Session recordings reviewed for hesitation patterns and mis-clicks, not just completion rate. Click-path heatmaps in Maze identified the exact nav item that broke the scan flow.
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── Footer ── */}
      <div className="ab-foot">
        <div className="brand"><span className="dot"></span> FinFlow · Concept Case Study · 2026</div>
        <div>Research · Methods &amp; Findings</div>
      </div>
    </div>
  );
}

window.ArtboardResearch = ArtboardResearch;
