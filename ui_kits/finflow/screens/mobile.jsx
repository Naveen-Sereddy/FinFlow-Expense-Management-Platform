/* FinFlow Screens — Mobile (employee POV, inside iOS frame chrome) */
/* 8 screens: Sign in · Home · Snap receipt · New expense · Submission success · Status timeline · My expenses · My card */
/* Every screen accepts an optional onNav(screen, payload) prop. In the desktop gallery
   (MobileShelf) screens render with no onNav, so taps are inert — unchanged from before.
   The standalone mobile-app.html passes a real onNav that drives screen-state, so the
   same components become a genuinely tappable app on an actual phone. */
const noop = () => {};

const MobileStatusBar = ({ theme = "light" }) => (
  <div style={{
    height:44, display:'flex', alignItems:'center', justifyContent:'space-between',
    padding:'0 22px', fontSize:14, fontWeight:600,
    color: theme === "dark" ? '#fff' : '#15181c'
  }}>
    <span className="ff-tnum">9:41</span>
    <span style={{display:'flex', gap:4, alignItems:'center'}}>
      <i className="ph-bold ph-signal-high" style={{fontSize:13}}/>
      <i className="ph-bold ph-wifi-high" style={{fontSize:13}}/>
      <i className="ph-fill ph-battery-full" style={{fontSize:15}}/>
    </span>
  </div>
);

const MobileFrame = ({ children, theme = "light", scrollable = true, fullbleed = false }) => (
  <div style={fullbleed ? {
    width:'100vw', height:'100dvh', flexShrink:0
  } : {
    width:360, height:760, borderRadius:42, padding:8,
    background: theme === 'dark' ? '#000' : '#15181c',
    boxShadow:'0 24px 60px -20px rgba(0,0,0,0.35)',
    flexShrink: 0
  }}>
    <div data-theme={theme === 'dark' ? 'dark' : 'light'} style={{
      width:'100%', height:'100%', borderRadius: fullbleed ? 0 : 34, overflow:'hidden', position:'relative',
      background:'var(--ff-bg)',
      display:'flex', flexDirection:'column'
    }}>
      {/* On a real phone the OS already shows a real status bar — the faux one
          (fake "9:41", fake battery) is only for the desktop gallery mockup. */}
      {fullbleed ? null : <MobileStatusBar theme={theme}/>}
      <div className="ff-scroll" style={{
        flex:1, overflow: scrollable ? 'auto' : 'hidden',
        paddingTop: fullbleed ? 'env(safe-area-inset-top)' : 0
      }}>{children}</div>
    </div>
  </div>
);

const MobileSignIn = ({ onNav = noop, fullbleed = false }) => (
  <MobileFrame theme="dark" fullbleed={fullbleed}>
    <div style={{
      flex:1, display:'flex', flexDirection:'column',
      padding:'48px 24px 32px',
      background:'var(--ff-teal-900)', color:'#fff', height:'100%'
    }}>
      <BrandMark variant="horizontal" theme="dark" size={28} style={{alignSelf:'center'}}/>
      <div style={{flex:1}}/>
      <div style={{fontFamily:'var(--ff-font-sans)', fontWeight:700, fontSize:36, lineHeight:1.1, letterSpacing:'-0.03em'}}>
        Welcome<br/>back, Corey.
      </div>
      <p style={{opacity:0.7, fontSize:13, marginTop:12}}>Sign in to submit and track your expenses.</p>
      <div className="ff-stack" style={{'--ff-stack-gap':'10px', marginTop:24}}>
        <input className="ff-input ff-input--lg" placeholder="Work email" defaultValue="corey.anderson@reyonal.com" style={{background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.18)', color:'#fff'}}/>
        <input className="ff-input ff-input--lg" type="password" placeholder="Password" defaultValue="••••••••••" style={{background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.18)', color:'#fff'}}/>
        <button className="ff-btn ff-btn--accent ff-btn--lg" style={{width:'100%', marginTop:8}} onClick={() => onNav('home')}>Sign in</button>
        <button className="ff-btn ff-btn--ghost" style={{color:'#fff', width:'100%'}} onClick={() => onNav('home')}><Icon name="fingerprint" size={16}/> Use Face ID</button>
      </div>
      <div style={{textAlign:'center', fontSize:12, opacity:0.6, marginTop:24}}>Reyonal · SSO available</div>
    </div>
  </MobileFrame>
);

const MobileHome = ({ onNav = noop, fullbleed = false }) => {
  const d = FF_DATA;
  return (
    <MobileFrame fullbleed={fullbleed}>
      <div style={{padding:'8px 20px 100px'}}>
        <div className="ff-row" style={{justifyContent:'space-between', marginTop:8}}>
          <div>
            <div style={{fontSize:12, color:'var(--ff-fg-muted)'}}>Tuesday</div>
            <div style={{fontFamily:'var(--ff-font-sans)', fontWeight:700, fontSize:26, lineHeight:1.1, letterSpacing:'-0.025em', marginTop:2, whiteSpace:'nowrap'}}>Hi, Corey.</div>
          </div>
          <Avatar initials="CA" size="lg"/>
        </div>

        <div style={{marginTop:20, padding:18, borderRadius:14, background:'linear-gradient(135deg, var(--ff-teal-700), var(--ff-teal-900))', color:'#fff', position:'relative'}}>
          <div style={{fontSize:11, opacity:0.7, textTransform:'uppercase', letterSpacing:'0.1em'}}>My spend · May</div>
          <div style={{fontFamily:'var(--ff-font-sans)', fontWeight:700, fontSize:34, lineHeight:1.0, letterSpacing:'-0.03em', marginTop:6}} className="ff-tnum">$2,184</div>
          <div style={{fontSize:12, opacity:0.7, marginTop:6}}>$316 under your avg · 6 expenses</div>
          <div style={{position:'absolute', top:14, right:14}}><BrandMark variant="mark" size={24} theme="dark"/></div>
        </div>

        <div className="ff-grid ff-grid--2" style={{marginTop:14, gap:10}}>
          <button className="ff-btn ff-btn--lg" style={{flexDirection:'column', height:80, gap:6}} onClick={() => onNav('snap')}>
            <Icon name="camera" size={22} weight="bold"/>
            <span style={{fontSize:13}}>Snap receipt</span>
          </button>
          <button className="ff-btn ff-btn--lg ff-btn--primary" style={{flexDirection:'column', height:80, gap:6}} onClick={() => onNav('new')}>
            <Icon name="plus" size={22} weight="bold"/>
            <span style={{fontSize:13}}>New expense</span>
          </button>
        </div>

        <div style={{marginTop:24}}>
          <div className="ff-row" style={{justifyContent:'space-between', marginBottom:10}}>
            <div className="ff-eyebrow">Recent</div>
            <a href="#" onClick={(e) => { e.preventDefault(); onNav('expenses'); }} style={{fontSize:12}}>See all</a>
          </div>
          <div className="ff-stack" style={{'--ff-stack-gap':'8px'}}>
            {d.expenses.filter(e => e.who === "Corey Anderson").map(e => (
              <div key={e.id} onClick={() => onNav('timeline', e.id)} style={{padding:'12px 14px', background:'var(--ff-card)', border:'1px solid var(--ff-border)', borderRadius:10, display:'flex', gap:12, alignItems:'center', cursor:'pointer'}}>
                <div style={{width:36, height:36, borderRadius:8, background:'var(--ff-card-2)', display:'grid', placeItems:'center'}}>
                  <Icon name={e.cat === 'me' ? 'coffee' : e.cat === 'sw' ? 'app-window' : e.cat === 'ad' ? 'megaphone' : 'tag'} size={16}/>
                </div>
                <div style={{flex:1, minWidth:0}}>
                  <div style={{fontWeight:500, fontSize:14}}>{e.merchant}</div>
                  <div style={{fontSize:11, color:'var(--ff-fg-muted)'}}>{e.date.slice(5)} · {FF_DATA.categories.find(c=>c.id===e.cat).name}</div>
                </div>
                <div style={{textAlign:'right'}}>
                  <div className="ff-tnum" style={{fontWeight:500}}><Money value={e.amount}/></div>
                  <StatusBadge status={e.status}/>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <MobileTabBar current="home" onNav={onNav}/>
    </MobileFrame>
  );
};

const MobileTabBar = ({ current, onNav = noop }) => (
  <div style={{
    position:'absolute', bottom:0, left:0, right:0,
    height:72, paddingBottom:'calc(16px + env(safe-area-inset-bottom))',
    display:'flex', alignItems:'center', justifyContent:'space-around',
    background:'var(--ff-card)', borderTop:'1px solid var(--ff-border)'
  }}>
    {[
      {id:"home", icon:"house", label:"Home"},
      {id:"expenses", icon:"receipt", label:"Expenses"},
      {id:"snap", icon:"camera", label:""},
      {id:"cards", icon:"credit-card", label:"Card"},
      {id:"profile", icon:"user", label:"Profile"}
    ].map(t => (
      t.id === "snap" ? (
        <div key={t.id} onClick={() => onNav('snap')} style={{width:54, height:54, borderRadius:999, background:'var(--ff-primary)', color:'var(--ff-primary-fg)', display:'grid', placeItems:'center', marginTop:-10, boxShadow:'var(--ff-shadow-md)', cursor:'pointer'}}>
          <Icon name={t.icon} size={22} weight="bold"/>
        </div>
      ) : (
        <a key={t.id} href="#" onClick={(e) => { e.preventDefault(); if (t.id !== "profile") onNav(t.id); }} style={{display:'flex', flexDirection:'column', alignItems:'center', gap:2, color: current === t.id ? 'var(--ff-primary)' : 'var(--ff-fg-muted)'}}>
          <Icon name={t.icon} size={20}/>
          <span style={{fontSize:10, fontWeight:500}}>{t.label}</span>
        </a>
      )
    ))}
  </div>
);

const MobileSnapReceipt = ({ onNav = noop, fullbleed = false }) => (
  <MobileFrame theme="dark" scrollable={false} fullbleed={fullbleed}>
    <div style={{height:'100%', background:'#0c0e10', position:'relative', overflow:'hidden', color:'#fff'}}>
      {/* Faux camera view */}
      <div style={{position:'absolute', inset:0, background:'radial-gradient(circle at 50% 60%, oklch(0.30 0.02 30), #0c0e10 70%)'}}/>
      {/* Rule-of-thirds guide */}
      <div style={{position:'absolute', inset:0, opacity:0.12}}>
        <div style={{position:'absolute', left:'33.3%', top:0, bottom:0, width:1, background:'#fff'}}/>
        <div style={{position:'absolute', left:'66.6%', top:0, bottom:0, width:1, background:'#fff'}}/>
        <div style={{position:'absolute', top:'33.3%', left:0, right:0, height:1, background:'#fff'}}/>
        <div style={{position:'absolute', top:'66.6%', left:0, right:0, height:1, background:'#fff'}}/>
      </div>
      {/* Receipt placeholder centered */}
      <div style={{position:'absolute', top:'18%', left:'14%', right:'14%', bottom:'22%', background:'#fff', color:'#15181c', borderRadius:8, padding:24, fontFamily:'var(--ff-font-mono)', fontSize:10, transform:'rotate(-2deg)', boxShadow:'0 18px 40px rgba(0,0,0,0.5)'}}>
        <div style={{textAlign:'center', fontFamily:'var(--ff-font-display)', fontSize:22}}>BLUE BOTTLE</div>
        <div style={{textAlign:'center', color:'#666', marginBottom:18}}>SF · Hayes Valley</div>
        <div style={{display:'flex', justifyContent:'space-between'}}><span>Latte ×2</span><span>14.00</span></div>
        <div style={{display:'flex', justifyContent:'space-between'}}><span>Pastry ×3</span><span>15.50</span></div>
        <div style={{display:'flex', justifyContent:'space-between'}}><span>Tax</span><span>3.20</span></div>
        <hr style={{margin:'10px 0', border:0, borderTop:'1px dashed #ccc'}}/>
        <div style={{display:'flex', justifyContent:'space-between', fontWeight:600}}><span>TOTAL</span><span>$42.80</span></div>
      </div>
      {/* Capture frame corners */}
      <CaptureCorners/>
      {/* Top instruction */}
      <div style={{position:'absolute', top:14, left:0, right:0, textAlign:'center', fontSize:13, opacity:0.85}}>
        Hold steady — align receipt in frame
      </div>
      {/* Live detection status */}
      <div style={{position:'absolute', top:46, left:0, right:0, display:'flex', justifyContent:'center'}}>
        <span style={{display:'flex', alignItems:'center', gap:6, background:'rgba(61,155,143,0.22)', border:'1px solid rgba(61,155,143,0.5)', color:'var(--ff-teal-300)', borderRadius:999, padding:'4px 10px', fontSize:11, fontWeight:500}}>
          <Icon name="check-circle" size={12} weight="fill"/> Document detected
        </span>
      </div>
      {/* Flash mode label */}
      <div style={{position:'absolute', bottom:88, right:32, fontSize:10, opacity:0.6, textAlign:'center'}}>Auto</div>
      {/* Bottom controls */}
      <div style={{position:'absolute', bottom:'calc(30px + env(safe-area-inset-bottom))', left:0, right:0, display:'flex', alignItems:'center', justifyContent:'space-around', padding:'0 32px'}}>
        <button style={{background:'rgba(255,255,255,0.1)', color:'#fff', width:48, height:48, borderRadius:999, border:'1px solid rgba(255,255,255,0.18)'}}><Icon name="image-square" size={20}/></button>
        <button onClick={() => onNav('new')} style={{background:'#fff', width:72, height:72, borderRadius:999, border:'4px solid rgba(255,255,255,0.3)'}}/>
        <button style={{background:'rgba(255,255,255,0.1)', color:'#fff', width:48, height:48, borderRadius:999, border:'1px solid rgba(255,255,255,0.18)'}}><Icon name="lightning" size={20}/></button>
      </div>
      <div style={{position:'absolute', top:'calc(14px + env(safe-area-inset-top))', left:14}}>
        <button onClick={() => onNav('home')} style={{background:'rgba(255,255,255,0.1)', color:'#fff', width:36, height:36, borderRadius:999, border:'1px solid rgba(255,255,255,0.18)'}}><Icon name="x" size={16}/></button>
      </div>
    </div>
  </MobileFrame>
);

const CaptureCorners = () => {
  const corner = {
    position:'absolute', width:32, height:32,
    borderColor:'var(--ff-teal-500)', borderStyle:'solid', borderWidth:0
  };
  return (
    <>
      <div style={{...corner, top:'14%', left:'10%', borderTopWidth:3, borderLeftWidth:3, borderTopLeftRadius:6}}/>
      <div style={{...corner, top:'14%', right:'10%', borderTopWidth:3, borderRightWidth:3, borderTopRightRadius:6}}/>
      <div style={{...corner, bottom:'18%', left:'10%', borderBottomWidth:3, borderLeftWidth:3, borderBottomLeftRadius:6}}/>
      <div style={{...corner, bottom:'18%', right:'10%', borderBottomWidth:3, borderRightWidth:3, borderBottomRightRadius:6}}/>
    </>
  );
};

const MobileNewExpense = ({ onNav = noop, fullbleed = false }) => (
  <MobileFrame fullbleed={fullbleed}>
    <div style={{padding:'10px 20px 100px'}}>
      <div className="ff-row" style={{justifyContent:'space-between'}}>
        <button className="ff-btn ff-btn--ghost ff-btn--icon" onClick={() => onNav('home')}><Icon name="x" size={18}/></button>
        <div style={{fontWeight:600, fontSize:15}}>New expense</div>
        <button className="ff-btn ff-btn--ghost" style={{color:'var(--ff-fg-muted)'}} onClick={() => onNav('home')}>Save</button>
      </div>
      <div style={{marginTop:20, padding:14, borderRadius:10, background:'var(--ff-card-2)', border:'1px solid var(--ff-border)', display:'flex', gap:12, alignItems:'center'}}>
        <div style={{width:54, height:68, background:'var(--ff-card)', border:'1px solid var(--ff-border)', borderRadius:6, background:`repeating-linear-gradient(0deg, var(--ff-border) 0 1px, transparent 1px 8px), var(--ff-card)`}}/>
        <div style={{flex:1}}>
          <div style={{fontWeight:600, fontSize:13}}>Receipt attached</div>
          <div style={{fontSize:11, color:'var(--ff-fg-muted)'}}>bluebottle_42.80.jpg · OCR 96%</div>
        </div>
        <button className="ff-btn ff-btn--ghost ff-btn--sm">Replace</button>
      </div>
      <div className="ff-stack" style={{'--ff-stack-gap':'14px', marginTop:20}}>
        <div className="ff-field"><label className="ff-label">Merchant</label><input className="ff-input ff-input--lg" defaultValue="Blue Bottle Coffee"/></div>
        <div className="ff-field"><label className="ff-label">Amount</label><input className="ff-input ff-input--lg ff-tnum" defaultValue="$42.80" style={{fontFamily:'var(--ff-font-sans)', fontWeight:600, fontSize:20, letterSpacing:'-0.02em', height:54}}/></div>
        <div className="ff-grid ff-grid--2">
          <div className="ff-field"><label className="ff-label">Date</label><input className="ff-input ff-input--lg ff-tnum" defaultValue="May 21"/></div>
          <div className="ff-field"><label className="ff-label">Category</label><select className="ff-select ff-input--lg"><option>Meals</option><option>Travel</option><option>Software</option></select></div>
        </div>
        <div className="ff-field"><label className="ff-label">Memo</label><textarea className="ff-textarea" defaultValue="Q2 review with marketing team"/></div>
        <div className="ff-field"><label className="ff-label">Payment</label>
          <div style={{padding:14, border:'1px solid var(--ff-border)', borderRadius:10, display:'flex', gap:12, alignItems:'center'}}>
            <div style={{width:34, height:22, borderRadius:3, background:'var(--ff-teal-700)'}}/>
            <div style={{flex:1, fontSize:13}}><div style={{fontWeight:500}}>FinFlow card</div><div className="ff-mono" style={{fontSize:11, color:'var(--ff-fg-muted)'}}>•••• 9032</div></div>
            <Icon name="check-circle" size={18} weight="fill" style={{color:'var(--ff-approved)'}}/>
          </div>
        </div>
      </div>
    </div>
    <div style={{position:'absolute', bottom:0, left:0, right:0, padding:'14px 20px calc(28px + env(safe-area-inset-bottom))', background:'var(--ff-card)', borderTop:'1px solid var(--ff-border)'}}>
      <button className="ff-btn ff-btn--primary ff-btn--lg" style={{width:'100%'}} onClick={() => onNav('success')}>Submit for approval</button>
    </div>
  </MobileFrame>
);

const MobileSubmitSuccess = ({ onNav = noop, fullbleed = false }) => (
  <MobileFrame fullbleed={fullbleed}>
    <div style={{height:'100%', padding:'32px 24px', display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center', justifyContent:'center', gap:14}}>
      <div style={{width:80, height:80, borderRadius:999, background:'var(--ff-approved-bg)', color:'var(--ff-approved)', display:'grid', placeItems:'center'}}>
        <Icon name="check-circle" size={40} weight="fill"/>
      </div>
      <div style={{fontFamily:'var(--ff-font-sans)', fontWeight:700, fontSize:30, lineHeight:1.1, letterSpacing:'-0.025em', marginTop:8}}>Submitted.</div>
      <p style={{color:'var(--ff-fg-muted)', fontSize:14, maxWidth:280}}>EXP-2842 · Blue Bottle Coffee · <strong className="ff-tnum">$42.80</strong> · Sent to Xavier for approval.</p>
      <div style={{padding:'14px 16px', background:'var(--ff-card-2)', border:'1px solid var(--ff-border)', borderRadius:10, width:'100%', marginTop:16, textAlign:'left'}}>
        <div className="ff-eyebrow" style={{marginBottom:8}}>What's next</div>
        <ul style={{margin:0, paddingLeft:18, fontSize:13, color:'var(--ff-fg-muted)', lineHeight:1.7}}>
          <li>Xavier Bartlett (Manager) reviews</li>
          <li>You'll be notified within ~6h</li>
          <li>Charge already on your card</li>
        </ul>
      </div>
      <div style={{flex:1}}/>
      <button className="ff-btn ff-btn--primary ff-btn--lg" style={{width:'100%'}} onClick={() => onNav('timeline', 'EXP-2842')}>Track status</button>
      <button className="ff-btn ff-btn--ghost" style={{width:'100%'}} onClick={() => onNav('home')}>Back to home</button>
    </div>
  </MobileFrame>
);

/* EXP-2842 doesn't exist in the seed data — it's the expense the user just
   submitted in this session (MobileSubmitSuccess), so it's synthesized here
   to match that screen's copy exactly instead of falling back to nothing. */
const JUST_SUBMITTED_EXPENSE = {
  id: "EXP-2842", merchant: "Blue Bottle Coffee", amount: 42.80, cat: "me",
  date: "2026-05-22", status: "pending", cardLast4: "9032", memo: "Q2 review with marketing team"
};

const MobileStatusTimeline = ({ onNav = noop, fullbleed = false, expenseId = "EXP-2841" }) => {
  const expense = expenseId === JUST_SUBMITTED_EXPENSE.id
    ? JUST_SUBMITTED_EXPENSE
    : (FF_DATA.expenses.find(e => e.id === expenseId) || FF_DATA.expenses.find(e => e.id === "EXP-2841"));
  const catName = FF_DATA.categories.find(c => c.id === expense.cat)?.name || "Other";
  const expenseDate = fmtDate(expense.date);
  const timelineSteps = expense.status === "approved"
    ? [
        { icon:"paper-plane-tilt", title:"Submitted", who:"You", ts:expenseDate, done:true },
        { icon:"shield-check", title:"Policy check passed", who:"System", ts:expenseDate, done:true },
        { icon:"user", title:"Manager approved", who:expense.who === "Corey Anderson" ? "Xavier Bartlett" : expense.who, ts:expenseDate, done:true },
        { icon:"check", title:"Approved & posted", who:"", ts:"Reimbursed", done:true }
      ]
    : expense.status === "flagged" || expense.status === "rejected"
    ? [
        { icon:"paper-plane-tilt", title:"Submitted", who:"You", ts:expenseDate, done:true },
        { icon:"warning", title: expense.status === "flagged" ? "Policy flag — over limit" : "Rejected", who:"System", ts:expenseDate, active:true },
        { icon:"user", title:"Manager review", who:"Xavier Bartlett", ts:"Blocked", done:false }
      ]
    : [
        { icon:"paper-plane-tilt", title:"Submitted", who:"You", ts:"May 22 · 9:12 AM", done:true },
        { icon:"shield-check", title:"Policy check passed", who:"System", ts:"May 22 · 9:12 AM", done:true },
        { icon:"user", title:"Awaiting Xavier Bartlett", who:"Manager", ts:"Now", active:true },
        { icon:"user", title:"Finance review", who:"Marcus Stoinis", ts:"Next", done:false },
        { icon:"check", title:"Approved & posted", who:"", ts:"Pending finance review", done:false }
      ];
  return (
  <MobileFrame fullbleed={fullbleed}>
    <div style={{padding:'10px 20px 100px'}}>
      <div className="ff-row" style={{justifyContent:'space-between'}}>
        <button className="ff-btn ff-btn--ghost ff-btn--icon" onClick={() => onNav('home')}><Icon name="arrow-left" size={18}/></button>
        <div style={{fontWeight:600, fontSize:15}}>{expense.id}</div>
        <button className="ff-btn ff-btn--ghost ff-btn--icon"><Icon name="dots-three" size={18}/></button>
      </div>

      <div style={{padding:16, marginTop:14, borderRadius:12, background:'var(--ff-card)', border:'1px solid var(--ff-border)'}}>
        <div className="ff-row" style={{justifyContent:'space-between', alignItems:'flex-start'}}>
          <div>
            <div style={{fontSize:11, color:'var(--ff-fg-muted)', textTransform:'uppercase', letterSpacing:'0.08em'}}>{catName}</div>
            <div style={{fontWeight:600, fontSize:16, marginTop:4}}>{expense.merchant}</div>
          </div>
          <StatusBadge status={expense.status}/>
        </div>
        <div style={{fontFamily:'var(--ff-font-sans)', fontWeight:700, fontSize:30, lineHeight:1.0, letterSpacing:'-0.025em', marginTop:14}} className="ff-tnum"><Money value={expense.amount}/></div>
        <div style={{fontSize:12, color:'var(--ff-fg-muted)', marginTop:2}}>{fmtDate(expense.date)} · Card •••• {expense.cardLast4}</div>
      </div>

      <div className="ff-eyebrow" style={{marginTop:24, marginBottom:12}}>Timeline</div>
      <div style={{position:'relative', paddingLeft:30}}>
        <div style={{position:'absolute', left:14, top:8, bottom:8, width:1, background:'var(--ff-border)'}}/>
        {timelineSteps.map((s, i) => (
          <div key={i} style={{position:'relative', display:'flex', marginBottom:18, opacity: s.done || s.active ? 1 : 0.5}}>
            <div style={{
              position:'absolute', left:-30, top:0, width:30, height:30, borderRadius:999,
              background: s.done ? 'var(--ff-approved-bg)' : s.active ? 'var(--ff-pending-bg)' : 'var(--ff-card-2)',
              color: s.done ? 'var(--ff-approved)' : s.active ? 'var(--ff-pending)' : 'var(--ff-fg-subtle)',
              display:'grid', placeItems:'center',
              border:'2px solid var(--ff-bg)'
            }}>
              <Icon name={s.done ? "check" : s.icon} size={13}/>
            </div>
            <div style={{flex:1}}>
              <div style={{fontWeight:500, fontSize:14}}>{s.title}</div>
              <div style={{fontSize:11, color:'var(--ff-fg-muted)'}}>{s.who ? `${s.who} · ${s.ts}` : s.ts}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </MobileFrame>
  );
};

const MobileExpenses = ({ onNav = noop, fullbleed = false }) => {
  const [filter, setFilter] = React.useState("all");
  const mine = FF_DATA.expenses.filter(e => e.who === "Corey Anderson");
  const filtered = filter === "all" ? mine : mine.filter(e => e.status === filter);
  const filters = [
    { id: "all", label: "All" },
    { id: "pending", label: "Pending" },
    { id: "approved", label: "Approved" },
    { id: "flagged", label: "Flagged" }
  ];
  return (
    <MobileFrame fullbleed={fullbleed}>
      <div style={{padding:'10px 20px 100px'}}>
        <div style={{fontFamily:'var(--ff-font-sans)', fontWeight:700, fontSize:24, letterSpacing:'-0.02em'}}>My expenses</div>

        <div style={{marginTop:16}}>
          <ChipBar items={filters} value={filter} onChange={setFilter}/>
        </div>

        <div className="ff-stack" style={{'--ff-stack-gap':'8px', marginTop:16}}>
          {filtered.length === 0 ? (
            <div style={{textAlign:'center', padding:'40px 20px', color:'var(--ff-fg-muted)', fontSize:13}}>
              No {filter === 'all' ? '' : filter} expenses.
            </div>
          ) : filtered.map(e => (
            <div key={e.id} onClick={() => onNav('timeline', e.id)} style={{padding:'12px 14px', background:'var(--ff-card)', border:'1px solid var(--ff-border)', borderRadius:10, display:'flex', gap:12, alignItems:'center', cursor:'pointer'}}>
              <div style={{width:36, height:36, borderRadius:8, background:'var(--ff-card-2)', display:'grid', placeItems:'center', flexShrink:0}}>
                <Icon name={e.cat === 'me' ? 'coffee' : e.cat === 'sw' ? 'app-window' : e.cat === 'ad' ? 'megaphone' : 'tag'} size={16}/>
              </div>
              <div style={{flex:1, minWidth:0}}>
                <div style={{fontWeight:500, fontSize:14}}>{e.merchant}</div>
                <div style={{fontSize:11, color:'var(--ff-fg-muted)'}}>{fmtDate(e.date)} · {e.id}</div>
              </div>
              <div style={{textAlign:'right'}}>
                <div className="ff-tnum" style={{fontWeight:500}}><Money value={e.amount}/></div>
                <StatusBadge status={e.status}/>
              </div>
            </div>
          ))}
        </div>
      </div>
      <MobileTabBar current="expenses" onNav={onNav}/>
    </MobileFrame>
  );
};

const MobileCards = ({ onNav = noop, fullbleed = false }) => {
  const [frozen, setFrozen] = React.useState(false);
  const card = FF_DATA.cards.find(c => c.holder === "Corey Anderson") || FF_DATA.cards.find(c => c.last4 === "9032");
  const pct = Math.round((card.spent / card.limit) * 100);
  const recent = FF_DATA.expenses.filter(e => e.who === "Corey Anderson" && e.cardLast4 === card.last4).slice(0, 4);
  return (
    <MobileFrame fullbleed={fullbleed}>
      <div style={{padding:'10px 20px 100px'}}>
        <div style={{fontFamily:'var(--ff-font-sans)', fontWeight:700, fontSize:24, letterSpacing:'-0.02em'}}>My card</div>

        <div style={{marginTop:18, padding:20, borderRadius:16, background: frozen ? 'var(--ff-card-2)' : 'linear-gradient(135deg, var(--ff-teal-700), var(--ff-teal-900))', color: frozen ? 'var(--ff-fg)' : '#fff', position:'relative', opacity: frozen ? 0.6 : 1, transition:'all 200ms'}}>
          <div className="ff-row" style={{justifyContent:'space-between', alignItems:'flex-start'}}>
            <div style={{fontSize:11, opacity:0.7, textTransform:'uppercase', letterSpacing:'0.1em'}}>Virtual · FinFlow</div>
            <BrandMark variant="mark" size={22} theme="dark"/>
          </div>
          <div className="ff-tnum" style={{fontFamily:'var(--ff-font-mono)', fontSize:19, letterSpacing:'0.08em', marginTop:28}}>•••• •••• •••• {card.last4}</div>
          <div className="ff-row" style={{justifyContent:'space-between', marginTop:18}}>
            <div>
              <div style={{fontSize:10, opacity:0.65}}>CARDHOLDER</div>
              <div style={{fontSize:13, fontWeight:500, marginTop:2}}>Corey Anderson</div>
            </div>
            {frozen && (
              <span style={{display:'flex', alignItems:'center', gap:4, fontSize:11, fontWeight:600}}>
                <Icon name="snowflake" size={14}/> Frozen
              </span>
            )}
          </div>
        </div>

        <button className="ff-btn ff-btn--lg" style={{width:'100%', marginTop:14}} onClick={() => setFrozen(f => !f)}>
          <Icon name={frozen ? "play" : "snowflake"} size={18}/> {frozen ? "Unfreeze card" : "Freeze card"}
        </button>

        <div style={{marginTop:20, padding:16, borderRadius:12, background:'var(--ff-card)', border:'1px solid var(--ff-border)'}}>
          <div className="ff-row" style={{justifyContent:'space-between', marginBottom:10}}>
            <div className="ff-eyebrow">Spend this month</div>
            <span style={{fontSize:12, fontWeight:500}} className="ff-tnum">{pct}%</span>
          </div>
          <div style={{height:6, borderRadius:999, background:'var(--ff-card-2)', overflow:'hidden'}}>
            <div style={{height:'100%', width:`${Math.min(pct,100)}%`, background: pct > 90 ? 'var(--ff-flagged)' : 'var(--ff-primary)', borderRadius:999}}/>
          </div>
          <div className="ff-row" style={{justifyContent:'space-between', marginTop:8}}>
            <span className="ff-tnum" style={{fontSize:13, fontWeight:600}}><Money value={card.spent}/> spent</span>
            <span className="ff-tnum" style={{fontSize:12, color:'var(--ff-fg-muted)'}}>of <Money value={card.limit}/> limit</span>
          </div>
        </div>

        <div style={{marginTop:20}}>
          <div className="ff-eyebrow" style={{marginBottom:10}}>Recent on this card</div>
          <div className="ff-stack" style={{'--ff-stack-gap':'8px'}}>
            {recent.map(e => (
              <div key={e.id} onClick={() => onNav('timeline', e.id)} style={{padding:'12px 14px', background:'var(--ff-card)', border:'1px solid var(--ff-border)', borderRadius:10, display:'flex', gap:12, alignItems:'center', cursor:'pointer'}}>
                <div style={{flex:1, minWidth:0}}>
                  <div style={{fontWeight:500, fontSize:14}}>{e.merchant}</div>
                  <div style={{fontSize:11, color:'var(--ff-fg-muted)'}}>{fmtDate(e.date)}</div>
                </div>
                <div className="ff-tnum" style={{fontWeight:500}}><Money value={e.amount}/></div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <MobileTabBar current="cards" onNav={onNav}/>
    </MobileFrame>
  );
};

Object.assign(window, { MobileSignIn, MobileHome, MobileSnapReceipt, MobileNewExpense, MobileSubmitSuccess, MobileStatusTimeline, MobileExpenses, MobileCards });
