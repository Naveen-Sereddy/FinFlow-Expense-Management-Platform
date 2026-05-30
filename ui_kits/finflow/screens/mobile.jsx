/* FinFlow Screens — Mobile (employee POV, inside iOS frame chrome) */
/* 6 screens: Sign in · Home · Snap receipt · New expense · Submission success · Status timeline */

const MobileStatusBar = ({ theme = "light" }) => (
  <div style={{
    height:44, display:'flex', alignItems:'center', justifyContent:'space-between',
    padding:'0 22px', fontSize:14, fontWeight:600,
    color: theme === "dark" ? '#FBF5E8' : '#15131A'
  }}>
    <span className="ff-tnum">9:41</span>
    <span style={{display:'flex', gap:4, alignItems:'center'}}>
      <i className="ph-bold ph-signal-high" style={{fontSize:13}}/>
      <i className="ph-bold ph-wifi-high" style={{fontSize:13}}/>
      <i className="ph-fill ph-battery-full" style={{fontSize:15}}/>
    </span>
  </div>
);

const MobileFrame = ({ children, theme = "light", scrollable = true }) => (
  <div style={{
    width:360, height:760, borderRadius:42, padding:8,
    background: theme === 'dark' ? '#000' : '#15131A',
    boxShadow:'0 24px 60px -20px rgba(0,0,0,0.35)',
    flexShrink: 0
  }}>
    <div data-theme={theme === 'dark' ? 'dark' : 'light'} style={{
      width:'100%', height:'100%', borderRadius:34, overflow:'hidden', position:'relative',
      background:'var(--ff-bg)',
      display:'flex', flexDirection:'column'
    }}>
      <MobileStatusBar theme={theme}/>
      <div className="ff-scroll" style={{flex:1, overflow: scrollable ? 'auto' : 'hidden'}}>{children}</div>
    </div>
  </div>
);

const MobileSignIn = () => (
  <MobileFrame theme="dark">
    <div style={{
      flex:1, display:'flex', flexDirection:'column',
      padding:'48px 24px 32px',
      background:'var(--ff-plum-900)', color:'#FBF5E8', height:'100%'
    }}>
      <BrandMark variant="horizontal" theme="dark" size={28}/>
      <div style={{flex:1}}/>
      <div style={{fontFamily:'var(--ff-font-sans)', fontWeight:700, fontSize:36, lineHeight:1.1, letterSpacing:'-0.03em'}}>
        Welcome<br/>back, Iris.
      </div>
      <p style={{opacity:0.7, fontSize:13, marginTop:12}}>Sign in to submit and track your expenses.</p>
      <div className="ff-stack" style={{'--ff-stack-gap':'10px', marginTop:24}}>
        <input className="ff-input ff-input--lg" placeholder="Work email" defaultValue="iris@arcadialabs.co" style={{background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.18)', color:'#FBF5E8'}}/>
        <input className="ff-input ff-input--lg" type="password" placeholder="Password" defaultValue="••••••••••" style={{background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.18)', color:'#FBF5E8'}}/>
        <button className="ff-btn ff-btn--accent ff-btn--lg" style={{width:'100%', marginTop:8}}>Sign in</button>
        <button className="ff-btn ff-btn--ghost" style={{color:'#FBF5E8', width:'100%'}}><Icon name="fingerprint" size={16}/> Use Face ID</button>
      </div>
      <div style={{textAlign:'center', fontSize:12, opacity:0.6, marginTop:24}}>Arcadia Labs · SSO available</div>
    </div>
  </MobileFrame>
);

const MobileHome = () => {
  const d = FF_DATA;
  return (
    <MobileFrame>
      <div style={{padding:'8px 20px 100px'}}>
        <div className="ff-row" style={{justifyContent:'space-between', marginTop:8}}>
          <div>
            <div style={{fontSize:12, color:'var(--ff-fg-muted)'}}>Tuesday</div>
            <div style={{fontFamily:'var(--ff-font-sans)', fontWeight:700, fontSize:26, lineHeight:1.1, letterSpacing:'-0.025em', marginTop:2, whiteSpace:'nowrap'}}>Hi, Iris.</div>
          </div>
          <Avatar initials="IC" size="lg"/>
        </div>

        <div style={{marginTop:20, padding:18, borderRadius:14, background:'linear-gradient(135deg, var(--ff-plum-700), var(--ff-plum-900))', color:'#FBF5E8', position:'relative'}}>
          <div style={{fontSize:11, opacity:0.7, textTransform:'uppercase', letterSpacing:'0.1em'}}>My spend · May</div>
          <div style={{fontFamily:'var(--ff-font-sans)', fontWeight:700, fontSize:34, lineHeight:1.0, letterSpacing:'-0.03em', marginTop:6}} className="ff-tnum">$2,184</div>
          <div style={{fontSize:12, opacity:0.7, marginTop:6}}>$316 under your avg · 6 expenses</div>
          <div style={{position:'absolute', top:14, right:14}}><BrandMark variant="mark" size={24} theme="dark"/></div>
        </div>

        <div className="ff-grid ff-grid--2" style={{marginTop:14, gap:10}}>
          <button className="ff-btn ff-btn--lg" style={{flexDirection:'column', height:80, gap:6}}>
            <Icon name="camera" size={22} weight="bold"/>
            <span style={{fontSize:13}}>Snap receipt</span>
          </button>
          <button className="ff-btn ff-btn--lg ff-btn--primary" style={{flexDirection:'column', height:80, gap:6}}>
            <Icon name="plus" size={22} weight="bold"/>
            <span style={{fontSize:13}}>New expense</span>
          </button>
        </div>

        <div style={{marginTop:24}}>
          <div className="ff-row" style={{justifyContent:'space-between', marginBottom:10}}>
            <div className="ff-eyebrow">Recent</div>
            <a href="#" style={{fontSize:12}}>See all</a>
          </div>
          <div className="ff-stack" style={{'--ff-stack-gap':'8px'}}>
            {d.expenses.filter(e => e.who === "Iris Chen").map(e => (
              <div key={e.id} style={{padding:'12px 14px', background:'var(--ff-card)', border:'1px solid var(--ff-border)', borderRadius:10, display:'flex', gap:12, alignItems:'center'}}>
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
      <MobileTabBar current="home"/>
    </MobileFrame>
  );
};

const MobileTabBar = ({ current }) => (
  <div style={{
    position:'absolute', bottom:0, left:0, right:0,
    height:72, paddingBottom:16,
    display:'flex', alignItems:'center', justifyContent:'space-around',
    background:'var(--ff-card)', borderTop:'1px solid var(--ff-border)'
  }}>
    {[
      {id:"home", icon:"house", label:"Home"},
      {id:"expenses", icon:"receipt", label:"Expenses"},
      {id:"snap", icon:"camera", label:""},
      {id:"cards", icon:"credit-card", label:"Cards"},
      {id:"profile", icon:"user", label:"Profile"}
    ].map(t => (
      t.id === "snap" ? (
        <div key={t.id} style={{width:54, height:54, borderRadius:999, background:'var(--ff-primary)', color:'var(--ff-primary-fg)', display:'grid', placeItems:'center', marginTop:-10, boxShadow:'var(--ff-shadow-md)'}}>
          <Icon name={t.icon} size={22} weight="bold"/>
        </div>
      ) : (
        <a key={t.id} href="#" style={{display:'flex', flexDirection:'column', alignItems:'center', gap:2, color: current === t.id ? 'var(--ff-primary)' : 'var(--ff-fg-muted)'}}>
          <Icon name={t.icon} size={20}/>
          <span style={{fontSize:10, fontWeight:500}}>{t.label}</span>
        </a>
      )
    ))}
  </div>
);

const MobileSnapReceipt = () => (
  <MobileFrame theme="dark" scrollable={false}>
    <div style={{flex:1, background:'#0a0808', position:'relative', overflow:'hidden', color:'#FBF5E8'}}>
      {/* Faux camera view */}
      <div style={{position:'absolute', inset:0, background:'radial-gradient(circle at 50% 60%, oklch(0.30 0.02 30), #0a0808 70%)'}}/>
      {/* Receipt placeholder centered */}
      <div style={{position:'absolute', top:'18%', left:'14%', right:'14%', bottom:'22%', background:'#FBF5E8', color:'#15131A', borderRadius:8, padding:24, fontFamily:'var(--ff-font-mono)', fontSize:10, transform:'rotate(-2deg)', boxShadow:'0 18px 40px rgba(0,0,0,0.5)'}}>
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
      {/* Bottom controls */}
      <div style={{position:'absolute', bottom:30, left:0, right:0, display:'flex', alignItems:'center', justifyContent:'space-around', padding:'0 32px'}}>
        <button style={{background:'rgba(255,255,255,0.1)', color:'#FBF5E8', width:48, height:48, borderRadius:999, border:'1px solid rgba(255,255,255,0.18)'}}><Icon name="image-square" size={20}/></button>
        <button style={{background:'#FBF5E8', width:72, height:72, borderRadius:999, border:'4px solid rgba(255,255,255,0.3)'}}/>
        <button style={{background:'rgba(255,255,255,0.1)', color:'#FBF5E8', width:48, height:48, borderRadius:999, border:'1px solid rgba(255,255,255,0.18)'}}><Icon name="lightning" size={20}/></button>
      </div>
      <div style={{position:'absolute', top:14, left:14}}>
        <button style={{background:'rgba(255,255,255,0.1)', color:'#FBF5E8', width:36, height:36, borderRadius:999, border:'1px solid rgba(255,255,255,0.18)'}}><Icon name="x" size={16}/></button>
      </div>
    </div>
  </MobileFrame>
);

const CaptureCorners = () => {
  const corner = {
    position:'absolute', width:32, height:32,
    borderColor:'#D9BE57', borderStyle:'solid', borderWidth:0
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

const MobileNewExpense = () => (
  <MobileFrame>
    <div style={{padding:'10px 20px 100px'}}>
      <div className="ff-row" style={{justifyContent:'space-between'}}>
        <button className="ff-btn ff-btn--ghost ff-btn--icon"><Icon name="x" size={18}/></button>
        <div style={{fontWeight:600, fontSize:15}}>New expense</div>
        <button className="ff-btn ff-btn--ghost" style={{color:'var(--ff-fg-muted)'}}>Save</button>
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
            <div style={{width:34, height:22, borderRadius:3, background:'var(--ff-plum-700)'}}/>
            <div style={{flex:1, fontSize:13}}><div style={{fontWeight:500}}>FinFlow card</div><div className="ff-mono" style={{fontSize:11, color:'var(--ff-fg-muted)'}}>•••• 9032</div></div>
            <Icon name="check-circle" size={18} weight="fill" style={{color:'var(--ff-approved)'}}/>
          </div>
        </div>
      </div>
    </div>
    <div style={{position:'absolute', bottom:0, left:0, right:0, padding:'14px 20px 28px', background:'var(--ff-card)', borderTop:'1px solid var(--ff-border)'}}>
      <button className="ff-btn ff-btn--primary ff-btn--lg" style={{width:'100%'}}>Submit for approval</button>
    </div>
  </MobileFrame>
);

const MobileSubmitSuccess = () => (
  <MobileFrame>
    <div style={{height:'100%', padding:'32px 24px', display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center', justifyContent:'center', gap:14}}>
      <div style={{width:80, height:80, borderRadius:999, background:'var(--ff-approved-bg)', color:'var(--ff-approved)', display:'grid', placeItems:'center'}}>
        <Icon name="check-circle" size={40} weight="fill"/>
      </div>
      <div style={{fontFamily:'var(--ff-font-sans)', fontWeight:700, fontSize:30, lineHeight:1.1, letterSpacing:'-0.025em', marginTop:8}}>Submitted.</div>
      <p style={{color:'var(--ff-fg-muted)', fontSize:14, maxWidth:280}}>EXP-2842 · Blue Bottle Coffee · <strong className="ff-tnum">$42.80</strong> · Sent to Theo for approval.</p>
      <div style={{padding:'14px 16px', background:'var(--ff-card-2)', border:'1px solid var(--ff-border)', borderRadius:10, width:'100%', marginTop:16, textAlign:'left'}}>
        <div className="ff-eyebrow" style={{marginBottom:8}}>What's next</div>
        <ul style={{margin:0, paddingLeft:18, fontSize:13, color:'var(--ff-fg-muted)', lineHeight:1.7}}>
          <li>Theo Vasquez (Manager) reviews</li>
          <li>You'll be notified within ~6h</li>
          <li>Charge already on your card</li>
        </ul>
      </div>
      <div style={{flex:1}}/>
      <button className="ff-btn ff-btn--primary ff-btn--lg" style={{width:'100%'}}>Track status</button>
      <button className="ff-btn ff-btn--ghost" style={{width:'100%'}}>Back to home</button>
    </div>
  </MobileFrame>
);

const MobileStatusTimeline = () => (
  <MobileFrame>
    <div style={{padding:'10px 20px 100px'}}>
      <div className="ff-row" style={{justifyContent:'space-between'}}>
        <button className="ff-btn ff-btn--ghost ff-btn--icon"><Icon name="arrow-left" size={18}/></button>
        <div style={{fontWeight:600, fontSize:15}}>EXP-2841</div>
        <button className="ff-btn ff-btn--ghost ff-btn--icon"><Icon name="dots-three" size={18}/></button>
      </div>

      <div style={{padding:16, marginTop:14, borderRadius:12, background:'var(--ff-card)', border:'1px solid var(--ff-border)'}}>
        <div className="ff-row" style={{justifyContent:'space-between', alignItems:'flex-start'}}>
          <div>
            <div style={{fontSize:11, color:'var(--ff-fg-muted)', textTransform:'uppercase', letterSpacing:'0.08em'}}>Travel · Airfare</div>
            <div style={{fontWeight:600, fontSize:16, marginTop:4}}>United Airlines</div>
          </div>
          <StatusBadge status="pending"/>
        </div>
        <div style={{fontFamily:'var(--ff-font-sans)', fontWeight:700, fontSize:30, lineHeight:1.0, letterSpacing:'-0.025em', marginTop:14}} className="ff-tnum">$842.50</div>
        <div style={{fontSize:12, color:'var(--ff-fg-muted)', marginTop:2}}>SF → Austin · May 22 · Card •••• 4112</div>
      </div>

      <div className="ff-eyebrow" style={{marginTop:24, marginBottom:12}}>Timeline</div>
      <div style={{position:'relative', paddingLeft:30}}>
        <div style={{position:'absolute', left:14, top:8, bottom:8, width:1, background:'var(--ff-border)'}}/>
        {[
          { icon:"paper-plane-tilt", title:"Submitted", who:"You", ts:"May 22 · 9:12 AM", done:true },
          { icon:"shield-check", title:"Policy check passed", who:"System", ts:"May 22 · 9:12 AM", done:true },
          { icon:"user", title:"Awaiting Theo Vasquez", who:"Manager", ts:"Now", active:true },
          { icon:"user", title:"Finance review", who:"Maren Okafor", ts:"Next", done:false },
          { icon:"check", title:"Approved & posted", who:"—", ts:"—", done:false }
        ].map((s, i) => (
          <div key={i} style={{display:'flex', gap:12, marginBottom:18, opacity: s.done || s.active ? 1 : 0.5}}>
            <div style={{
              position:'absolute', left:0, width:30, height:30, borderRadius:999,
              background: s.done ? 'var(--ff-approved-bg)' : s.active ? 'var(--ff-pending-bg)' : 'var(--ff-card-2)',
              color: s.done ? 'var(--ff-approved)' : s.active ? 'var(--ff-pending)' : 'var(--ff-fg-subtle)',
              display:'grid', placeItems:'center',
              border:'2px solid var(--ff-bg)'
            }}>
              <Icon name={s.done ? "check" : s.icon} size={13}/>
            </div>
            <div style={{flex:1}}>
              <div style={{fontWeight:500, fontSize:14}}>{s.title}</div>
              <div style={{fontSize:11, color:'var(--ff-fg-muted)'}}>{s.who} · {s.ts}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </MobileFrame>
);

Object.assign(window, { MobileSignIn, MobileHome, MobileSnapReceipt, MobileNewExpense, MobileSubmitSuccess, MobileStatusTimeline });
