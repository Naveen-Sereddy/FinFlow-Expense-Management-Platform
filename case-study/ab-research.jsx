/* global React */
// Research methodology artboard — discovery, usability testing, IA rebuild

function ArtboardResearch() {

  /* ── 1. Discovery ───────────────────────────────────────────────── */
  const discoveryItems = [
    {
      label: "Competitive teardown",
      body: "Studied onboarding flows, dashboard layouts, approval patterns, and audit experiences across Brex, Ramp, Mercury, Airbase, Pleo, and Navan — looking specifically for the pattern every one of them shares: sidebar, four-equal-KPI-card dashboard, chart, table. That shared skeleton became the thing to deliberately not build.",
    },
    {
      label: "Persona synthesis",
      body: "Three behavioral archetypes anchor the design — the submitter (Corey), the approver (Xavier), and the finance owner (Marcus) — each with a meaningfully different tolerance for UI friction and a different reason to open the product. Marcus is the primary design target: their workflow touches every other role's output.",
    },
    {
      label: "Workflow mapping",
      body: "Traced a single expense's full lifecycle — capture, OCR, submit, approve, reimburse, close — across all three roles to find where the generic dashboard pattern actively worked against each one, informing which screens got the most compositional attention.",
    },
  ];

  /* ── 2. Verification ────────────────────────────────────────────── */
  const changes = [
    {
      what: "What a generic layout gets wrong",
      desc: 'Four equal KPI cards force the eye to compare four numbers before it can decide which one matters. A sidebar with 12 items in muscle memory sounds fine until you notice most sessions only ever touch 5–7 of them — the rest is permanent visual weight for occasional use.',
      tag: "Problem",
      tagStyle: { background: "var(--c-error-bg)", color: "var(--c-error)", borderColor: "var(--c-error-bg)" },
    },
    {
      what: "What replaced it, and how it was checked",
      desc: 'One hero number per dashboard, asymmetric chart splits, borderless tables, a single top nav capped at each role\'s actual highest-frequency items with everything else one ⌘K away. Verified with a scripted sweep of all 47 screens across all 3 roles and both themes — zero console errors, zero broken renders — not eyeballed screen by screen.',
      tag: "Verification",
      tagStyle: { background: "var(--c-success-bg)", color: "var(--c-success)", borderColor: "var(--c-success-bg)" },
    },
  ];

  const auditFindings = [
    "14 hand-copied stat-row blocks had drifted to 3 different font sizes and 2 different gap values — consolidated into one shared component",
    "Icon-only buttons with no accessible name — found and fixed one by one, file and line",
    "Two unrelated color systems assigned different colors to the same expense category — unified on one source of truth",
    "A command palette that documented keyboard navigation it didn't implement — built the real thing",
  ];

  /* ── 3. IA rebuild ──────────────────────────────────────────────── */
  const ia = [
    { before: "12-item sidebar, 3 groups", after: "Single top nav, 5–7 items per role" },
    { before: "Low-frequency pages get permanent chrome", after: "Everything else is one ⌘K away" },
    { before: "Bulk-action bar only after selecting a row", after: "Selection state always visible, running total" },
    { before: "Policy result behind a click", after: "Policy chip inline on every row" },
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
            Discovery combined 12 structured client interviews across the three core roles with competitive teardown. A scripted verification pass and a self-audit against the shipped build shaped what actually held up.
          </div>
        </div>
        <div className="ab-head__right">
          <div className="ab-meta">
            <span className="ab-meta__k">Competitors studied</span>
            <span className="ab-meta__v">6</span>
          </div>
          <div className="ab-meta">
            <span className="ab-meta__k">Screens verified</span>
            <span className="ab-meta__v">47 / 47</span>
          </div>
          <div className="ab-meta">
            <span className="ab-meta__k">Console errors</span>
            <span className="ab-meta__v" style={{color:"var(--c-success)"}}>0</span>
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
              Structured discovery with 12 client stakeholders across Employee, Manager, and Finance Admin workflows, synthesized under NDA.
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
                <div style={{fontSize:13, fontWeight:600, color:"var(--c-ink)", lineHeight:1.2}}>Verification, not vibes</div>
              </div>
            </div>

            {/* Audit findings */}
            <div style={{
              background:"var(--c-surface)", border:"1px solid var(--c-line)",
              borderRadius:12, padding:"14px 16px", display:"flex", flexDirection:"column", gap:8,
            }}>
              <div style={{fontFamily:"var(--f-mono)", fontSize:9.5, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--c-ink-4)"}}>Found in a self-audit of the shipped build</div>
              {auditFindings.map((f, i) => (
                <div key={i} style={{display:"flex", gap:8, fontSize:11.5, color:"var(--c-ink-3)", lineHeight:1.45}}>
                  <span style={{color:"var(--c-accent-2)", flexShrink:0}}>—</span>
                  <span>{f}</span>
                </div>
              ))}
            </div>

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
              Every finding above was traced to a specific file and fixed in the same pass, then re-verified.
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
                The sidebar wasn't rebuilt — it was removed. A single top nav, capped at each role's actual highest-frequency destinations, replaces it entirely.
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
                A 12-item sidebar solves discoverability by never hiding anything — at the cost of giving equal permanent weight to daily and once-a-quarter destinations. Capping the nav and routing the rest through search fixes that trade entirely, instead of promoting one item at a time.
              </div>
            </div>

            {/* Observation note */}
            <div style={{
              background:"var(--c-accent-tint)", border:"1px solid var(--c-accent-line)",
              borderRadius:10, padding:"12px 14px",
            }}>
              <div style={{fontFamily:"var(--f-mono)", fontSize:10, letterSpacing:"0.12em", textTransform:"uppercase", color:"var(--c-accent)", marginBottom:5}}>Verification method</div>
              <div style={{fontSize:11.5, color:"var(--c-accent-2)", lineHeight:1.45}}>
                A script drove every one of the 47 screens across all 3 roles and both themes, checking for console errors and empty renders after every change — not a manual click-through, and not just the screens that seemed likely to break.
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── Footer ── */}
      <div className="ab-foot">
        <div className="brand"><span className="dot"></span> FinFlow · Shipped Client Product · 2026</div>
        <div>Research · Methods &amp; Findings</div>
      </div>
    </div>
  );
}

window.ArtboardResearch = ArtboardResearch;
