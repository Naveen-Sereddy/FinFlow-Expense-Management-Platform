/* FinFlow Screens — Auth, Onboarding, Audit, Notif Center, Help, States */

/* ---------- Auth ---------- */

const AuthLayout = ({ children, title, sub, foot }) => (
  <div style={{
    display:'grid', gridTemplateColumns:'1fr 1fr', minHeight:'100%',
    background:'var(--ff-bg)'
  }}>
    <aside style={{
      padding:'56px 56px',
      background:'var(--ff-plum-900)',
      color:'#FBF5E8',
      display:'flex', flexDirection:'column', justifyContent:'space-between',
      position:'relative', overflow:'hidden'
    }}>
      <BrandMark variant="horizontal" theme="dark" size={28}/>
      <div style={{maxWidth:520, zIndex:1}}>
        <div style={{
          fontFamily:'var(--ff-font-sans)', fontWeight:700,
          fontSize:56, lineHeight:1.05, letterSpacing:'-0.04em',
          color:'#FBF5E8'
        }}>
          The whole company's<br/>spend, in flow.
        </div>
        <p style={{marginTop:24, opacity:0.7, fontSize:14, lineHeight:1.6, maxWidth:380}}>
          Expense submission, approvals, cards, and close packets — one workspace, built for finance teams that move fast.
        </p>
        <div style={{marginTop:32, fontSize:11, opacity:0.5, letterSpacing:'0.08em', textTransform:'uppercase'}}>SOC 2 Type II · PCI DSS · GDPR</div>
      </div>
      {/* Editorial accent: stacked plum bars */}
      <div style={{position:'absolute', right:-100, bottom:-60, opacity:0.18}}>
        <div style={{width:280, height:32, background:'var(--ff-citron-500)', borderRadius:8, marginBottom:14}}/>
        <div style={{width:240, height:32, background:'var(--ff-plum-300)', borderRadius:8, marginBottom:14, marginLeft:40}}/>
        <div style={{width:200, height:32, background:'var(--ff-plum-500)', borderRadius:8, marginLeft:80}}/>
      </div>
      <div style={{fontSize:12, opacity:0.6}}>© FinFlow · {FF_DATA.company.fiscalYear}</div>
    </aside>
    <main style={{display:'flex', alignItems:'center', justifyContent:'center', padding:'40px 24px'}}>
      <div style={{width:'100%', maxWidth:380}}>
        <div className="ff-eyebrow">Workspace</div>
        <h1 style={{fontFamily:'var(--ff-font-sans)', fontWeight:700, fontSize:36, lineHeight:1.1, letterSpacing:'-0.03em', marginTop:8}}>{title}</h1>
        {sub && <p style={{color:'var(--ff-fg-muted)', marginTop:8, fontSize:14}}>{sub}</p>}
        <div style={{marginTop:28}}>{children}</div>
        <div style={{marginTop:24, fontSize:13, color:'var(--ff-fg-muted)'}}>{foot}</div>
      </div>
    </main>
  </div>
);

const SignIn = () => (
  <AuthLayout title="Sign in" sub="Welcome back. Sign in to continue to FinFlow."
              foot={<span>New here? <a href="#">Create a workspace</a></span>}>
    <div className="ff-stack" style={{'--ff-stack-gap':'14px'}}>
      <button className="ff-btn ff-btn--lg" style={{width:'100%', justifyContent:'center'}}><Icon name="google-logo" size={16}/> Continue with Google</button>
      <button className="ff-btn ff-btn--lg" style={{width:'100%', justifyContent:'center'}}><Icon name="key" size={16}/> Continue with Okta SSO</button>
      <div style={{display:'flex', alignItems:'center', gap:12, color:'var(--ff-fg-muted)', fontSize:12, margin:'4px 0'}}><hr style={{flex:1, border:0, borderTop:'1px solid var(--ff-border)'}}/> or <hr style={{flex:1, border:0, borderTop:'1px solid var(--ff-border)'}}/></div>
      <div className="ff-field"><label className="ff-label">Work email</label><input className="ff-input ff-input--lg" defaultValue="maren@arcadialabs.co"/></div>
      <div className="ff-field"><label className="ff-label">Password</label><input className="ff-input ff-input--lg" type="password" defaultValue="••••••••••"/></div>
      <div className="ff-row" style={{justifyContent:'space-between', flexWrap:'wrap', gap:8}}>
        <label className="ff-row" style={{gap:6, fontSize:13, whiteSpace:'nowrap'}}><input type="checkbox"/> Remember me</label>
        <a href="#" style={{fontSize:13, whiteSpace:'nowrap'}}>Forgot password?</a>
      </div>
      <button className="ff-btn ff-btn--primary ff-btn--lg" style={{width:'100%'}}>Sign in</button>
    </div>
  </AuthLayout>
);

const SSOWorkspace = () => (
  <AuthLayout title="Find your workspace" sub="Enter your work email or workspace URL."
              foot={<a href="#">← Back to sign in</a>}>
    <div className="ff-stack" style={{'--ff-stack-gap':'14px'}}>
      <div className="ff-field"><label className="ff-label">Workspace URL</label>
        <div style={{display:'flex'}}>
          <input className="ff-input ff-input--lg" defaultValue="arcadialabs" style={{borderTopRightRadius:0, borderBottomRightRadius:0}}/>
          <span style={{display:'flex', alignItems:'center', padding:'0 14px', border:'1px solid var(--ff-border)', borderLeft:0, background:'var(--ff-card-2)', borderRadius:'0 8px 8px 0', fontSize:13, color:'var(--ff-fg-muted)'}}>.finflow.app</span>
        </div>
      </div>
      <button className="ff-btn ff-btn--primary ff-btn--lg" style={{width:'100%'}}>Continue with SSO</button>
      <div className="ff-alert ff-alert--info">
        <Icon name="info" size={18} weight="fill"/>
        <div className="ff-alert__body">
          <div className="ff-alert__title">Arcadia Labs uses Okta</div>
          <div>You'll be redirected to your identity provider.</div>
        </div>
      </div>
    </div>
  </AuthLayout>
);

const ForgotPassword = () => (
  <AuthLayout title="Reset password" sub="We'll email you a secure link."
              foot={<a href="#">← Back to sign in</a>}>
    <div className="ff-stack" style={{'--ff-stack-gap':'14px'}}>
      <div className="ff-field"><label className="ff-label">Work email</label><input className="ff-input ff-input--lg" defaultValue="maren@arcadialabs.co"/></div>
      <button className="ff-btn ff-btn--primary ff-btn--lg" style={{width:'100%'}}>Send reset link</button>
    </div>
  </AuthLayout>
);

const ResetPassword = () => (
  <AuthLayout title="Set a new password" sub="Must be at least 12 characters."
              foot={null}>
    <div className="ff-stack" style={{'--ff-stack-gap':'14px'}}>
      <div className="ff-field"><label className="ff-label">New password</label><input className="ff-input ff-input--lg" type="password" defaultValue="••••••••••••••"/></div>
      <div className="ff-field"><label className="ff-label">Confirm password</label><input className="ff-input ff-input--lg" type="password" defaultValue="••••••••••••••"/></div>
      <div style={{fontSize:12, color:'var(--ff-fg-muted)'}}>
        <div className="ff-row" style={{gap:6, color:'var(--ff-approved)'}}><Icon name="check" size={12}/> 12+ characters</div>
        <div className="ff-row" style={{gap:6, color:'var(--ff-approved)'}}><Icon name="check" size={12}/> Number or symbol</div>
        <div className="ff-row" style={{gap:6}}><Icon name="circle" size={12}/> Not a previous password</div>
      </div>
      <button className="ff-btn ff-btn--primary ff-btn--lg" style={{width:'100%'}}>Update password</button>
    </div>
  </AuthLayout>
);

/* ---------- Onboarding ---------- */

const OnboardingShell = ({ step, children, title, sub, next }) => (
  <div style={{maxWidth:840, margin:'0 auto', padding:'40px 24px'}}>
    <div className="ff-row" style={{justifyContent:'space-between', marginBottom:36}}>
      <BrandMark variant="horizontal" size={28}/>
      <div className="ff-steps">
        {["Connect bank","Invite team","Set policy"].map((s, i) => (
          <React.Fragment key={s}>
            <div className={`ff-step ${i < step ? 'ff-step--done' : ''} ${i === step ? 'ff-step--active' : ''}`}>
              <span className="ff-step__bullet">{i < step ? <Icon name="check" size={12}/> : i+1}</span>
              <span>{s}</span>
            </div>
            {i < 2 && <span className="ff-step__line"/>}
          </React.Fragment>
        ))}
      </div>
    </div>
    <div className="ff-eyebrow">Onboarding · {step+1} of 3</div>
    <h1 style={{fontFamily:'var(--ff-font-sans)', fontWeight:700, fontSize:42, lineHeight:1.1, letterSpacing:'-0.03em', marginTop:8}}>{title}</h1>
    {sub && <p style={{color:'var(--ff-fg-muted)', maxWidth:560, marginTop:8}}>{sub}</p>}
    <div style={{marginTop:28}}>{children}</div>
    <div className="ff-row" style={{justifyContent:'space-between', marginTop:28}}>
      <button className="ff-btn ff-btn--ghost">Skip for now</button>
      <button className="ff-btn ff-btn--primary ff-btn--lg">{next}</button>
    </div>
  </div>
);

const ConnectBank = () => (
  <OnboardingShell step={0}
    title="Connect a bank or card program"
    sub="Pull statements automatically and start issuing FinFlow cards. We use read-only access by default."
    next="Continue →">
    <div className="ff-grid ff-grid--3">
      {[
        { name:"Mercury", icon:"bank", desc:"Business checking, ACH out" },
        { name:"Brex",    icon:"credit-card", desc:"Cards, statements" },
        { name:"Chase",   icon:"buildings", desc:"Business banking" },
        { name:"AMEX",    icon:"credit-card", desc:"Card statements" },
        { name:"SVB / First Citizens", icon:"bank", desc:"Wires, FBO accounts" },
        { name:"Plaid · Other", icon:"plugs", desc:"12,000+ institutions" }
      ].map(b => (
        <Card key={b.name}>
          <div className="ff-row" style={{gap:10}}>
            <div style={{width:40, height:40, borderRadius:8, background:'var(--ff-card-2)', border:'1px solid var(--ff-border)', display:'grid', placeItems:'center'}}><Icon name={b.icon} size={18}/></div>
            <div>
              <div style={{fontWeight:600}}>{b.name}</div>
              <div style={{fontSize:11, color:'var(--ff-fg-muted)'}}>{b.desc}</div>
            </div>
          </div>
          <button className="ff-btn ff-btn--sm" style={{width:'100%', marginTop:14}}>Connect</button>
        </Card>
      ))}
    </div>
  </OnboardingShell>
);

const InviteTeam = () => (
  <OnboardingShell step={1}
    title="Invite your team"
    sub="Send invites by email. Roles can be changed later."
    next="Continue →">
    <Card>
      <div className="ff-stack" style={{'--ff-stack-gap':'10px'}}>
        {[
          { e: "theo@arcadialabs.co", r: "Manager" },
          { e: "iris@arcadialabs.co", r: "Employee" },
          { e: "dev@arcadialabs.co",  r: "Employee" },
          { e: "", r: "Employee" }
        ].map((row, i) => (
          <div key={i} className="ff-row" style={{gap:10}}>
            <input className="ff-input" defaultValue={row.e} placeholder="name@company.com"/>
            <select className="ff-select" style={{width:160}} defaultValue={row.r}>
              <option>Employee</option><option>Manager</option><option>Finance Admin</option><option>Auditor</option>
            </select>
            <button className="ff-btn ff-btn--ghost ff-btn--icon"><Icon name="x" size={14}/></button>
          </div>
        ))}
        <button className="ff-btn ff-btn--ghost" style={{justifyContent:'flex-start', marginTop:4}}><Icon name="plus" size={14}/> Add another</button>
      </div>
      <hr className="ff-divider"/>
      <div className="ff-row" style={{justifyContent:'space-between', fontSize:13}}>
        <span style={{color:'var(--ff-fg-muted)'}}>Or bulk-invite via CSV / SCIM (Okta connected)</span>
        <button className="ff-btn ff-btn--sm">Import</button>
      </div>
    </Card>
  </OnboardingShell>
);

const SetPolicy = () => (
  <OnboardingShell step={2}
    title="Set your starter policy"
    sub="You can refine these later — these are sensible defaults for a Series B SaaS company."
    next="Finish setup →">
    <Card>
      <div className="ff-stack" style={{'--ff-stack-gap':'14px'}}>
        <div className="ff-grid ff-grid--2">
          <div className="ff-field"><label className="ff-label">Hotel cap (domestic)</label><input className="ff-input ff-tnum" defaultValue="$300 / night"/></div>
          <div className="ff-field"><label className="ff-label">Hotel cap (international)</label><input className="ff-input ff-tnum" defaultValue="$420 / night"/></div>
          <div className="ff-field"><label className="ff-label">Per diem meals</label><input className="ff-input ff-tnum" defaultValue="$75 / day"/></div>
          <div className="ff-field"><label className="ff-label">Receipts required over</label><input className="ff-input ff-tnum" defaultValue="$25"/></div>
        </div>
        <hr className="ff-divider"/>
        <div className="ff-row" style={{justifyContent:'space-between'}}>
          <div><div style={{fontWeight:500}}>Auto-categorize transactions with AI</div><div style={{fontSize:12, color:'var(--ff-fg-muted)'}}>Pulls merchant + memo, suggests category</div></div>
          <span className="ff-switch" role="switch" aria-checked="true"/>
        </div>
        <div className="ff-row" style={{justifyContent:'space-between'}}>
          <div><div style={{fontWeight:500}}>Block out-of-policy charges at swipe</div><div style={{fontSize:12, color:'var(--ff-fg-muted)'}}>Cards decline if over limit (recommended)</div></div>
          <span className="ff-switch" role="switch" aria-checked="false"/>
        </div>
      </div>
    </Card>
  </OnboardingShell>
);

/* ---------- Audit ---------- */

const AuditLog = () => {
  const d = FF_DATA;
  return (
    <>
      <PageHead eyebrow="Audit" title="Audit log" sub="Every action, every actor, immutable"
        actions={<><button className="ff-btn"><Icon name="funnel" size={14}/> Filter</button><button className="ff-btn"><Icon name="download-simple" size={14}/> Export CSV</button></>}/>
      <div className="ff-row" style={{gap:8, marginBottom:14, flexWrap:'wrap'}}>
        <ChipBar items={[
          {id:"all", label:"All"}, {id:"approve", label:"Approvals"}, {id:"policy", label:"Policy edits"}, {id:"card", label:"Card events"}, {id:"signin", label:"Sign-ins"}
        ]} value="all" onChange={()=>{}}/>
        <div className="ff-search" style={{width:240, marginLeft:'auto'}}><Icon name="magnifying-glass" size={14}/><input placeholder="Search by actor or target…"/></div>
      </div>
      <Card padded={false}>
        <table className="ff-table">
          <thead><tr><th>Timestamp (UTC-7)</th><th>Actor</th><th>Action</th><th>Target</th><th>IP / agent</th></tr></thead>
          <tbody>
            {d.auditEntries.concat(d.auditEntries.map(e => ({...e, ts: e.ts.replace("2026-05-22", "2026-05-21")}))).slice(0, 12).map((a, i) => (
              <tr key={i}>
                <td className="ff-tnum" style={{color:'var(--ff-fg-muted)', fontSize:12}}>{a.ts}</td>
                <td><span className="ff-row" style={{gap:6}}>{a.actor !== "System" && a.actor !== "Okta SSO" && <Avatar initials={a.actor.split(' ').map(x=>x[0]).join('').slice(0,2)}/>}{a.actor}</span></td>
                <td><span className="ff-badge ff-badge--plum ff-badge--no-dot">{a.action}</span></td>
                <td>{a.target}</td>
                <td className="ff-mono" style={{fontSize:11, color:'var(--ff-fg-muted)'}}>10.0.4.221 · Chrome 128</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </>
  );
};

/* ---------- Notif Center ---------- */
const NotificationsCenter = () => {
  const d = FF_DATA;
  return (
    <>
      <PageHead eyebrow="Notifications" title="Inbox" sub="Recent activity across your workspace"
        actions={<><button className="ff-btn"><Icon name="check" size={14}/> Mark all read</button><button className="ff-btn ff-btn--ghost"><Icon name="gear-six" size={14}/></button></>}/>
      <div className="ff-grid" style={{gridTemplateColumns:'200px 1fr', gap:24}}>
        <div className="ff-stack" style={{'--ff-stack-gap':'2px'}}>
          {[
            {id:"all", label:"All", icon:"tray", count:14},
            {id:"approve", label:"Approvals", icon:"check-square", count:8},
            {id:"policy", label:"Policy", icon:"warning", count:2},
            {id:"payout", label:"Payouts", icon:"arrows-clockwise", count:3},
            {id:"card", label:"Cards", icon:"credit-card", count:1}
          ].map((t, i) => (
            <a key={t.id} className="ff-nav-item" aria-current={i === 0 ? "page" : undefined} href="#">
              <Icon name={t.icon} size={16}/>{t.label}<span className="ff-nav-item__count">{t.count}</span>
            </a>
          ))}
        </div>
        <Card padded={false}>
          {d.notifications.concat(d.notifications).slice(0, 10).map((n, i, arr) => (
            <div key={i} style={{padding:'14px 20px', borderBottom: i < arr.length-1 ? '1px solid var(--ff-border)' : '0', display:'flex', gap:12, alignItems:'flex-start'}}>
              <div style={{width:30, height:30, borderRadius:8, background:'var(--ff-card-2)', display:'grid', placeItems:'center', flexShrink:0, color: i % 4 === 0 ? 'var(--ff-pending)' : 'var(--ff-fg)'}}>
                <Icon name={{approval:"check-square", policy:"warning", payout:"arrows-clockwise", card:"credit-card", report:"file-text"}[n.kind]} size={14}/>
              </div>
              <div style={{flex:1, minWidth:0}}>
                <div style={{fontSize:13}}>{n.text}</div>
                <div style={{fontSize:11, color:'var(--ff-fg-muted)', marginTop:2}}>{n.ts} ago</div>
              </div>
              {i < 3 && <span style={{width:6, height:6, background:'var(--ff-primary)', borderRadius:999, marginTop:8}}/>}
            </div>
          ))}
        </Card>
      </div>
    </>
  );
};

/* ---------- Help ---------- */
const Help = () => (
  <>
    <PageHead eyebrow="Help" title="How can we help?" sub="Search docs or talk to support"/>
    <div style={{maxWidth:640, margin:'0 auto 32px'}}>
      <div className="ff-search ff-input--lg" style={{height:54, fontSize:15}}>
        <Icon name="magnifying-glass" size={18}/>
        <input placeholder="Search FinFlow help…" style={{fontSize:15}}/>
        <span className="ff-kbd">/</span>
      </div>
    </div>
    <div className="ff-grid ff-grid--3">
      {[
        ["Getting started","Connect bank, invite team, set policy","book-open"],
        ["Expenses & receipts","OCR, categories, mileage, policies","receipt"],
        ["Cards","Issue, limits, freezes, statements","credit-card"],
        ["Approvals","Routing, bulk, escalations","check-square"],
        ["Reports & close","Builder, exports, QBO sync","chart-bar"],
        ["Admin & security","SSO, SCIM, audit, retention","shield-check"]
      ].map(([t, s, i]) => (
        <Card key={t}>
          <div style={{width:36, height:36, borderRadius:8, background:'var(--ff-plum-100)', color:'var(--ff-plum-700)', display:'grid', placeItems:'center', marginBottom:12}}><Icon name={i} size={18}/></div>
          <div style={{fontWeight:600, fontSize:15}}>{t}</div>
          <div style={{color:'var(--ff-fg-muted)', fontSize:13, marginTop:4}}>{s}</div>
        </Card>
      ))}
    </div>
    <Card style={{marginTop:24}}>
      <div className="ff-row" style={{justifyContent:'space-between'}}>
        <div>
          <div style={{fontWeight:600, fontSize:16}}>Still stuck? Talk to a human.</div>
          <div style={{color:'var(--ff-fg-muted)', fontSize:13, marginTop:4}}>Average response · 4 minutes during business hours</div>
        </div>
        <div className="ff-row">
          <button className="ff-btn"><Icon name="envelope" size={14}/> Email</button>
          <button className="ff-btn ff-btn--primary"><Icon name="chats" size={14}/> Start chat</button>
        </div>
      </div>
    </Card>
  </>
);

/* ---------- States: loading / empty / error / success / confirmation ---------- */
const LoadingDashboard = () => (
  <>
    <PageHead eyebrow="Workspace · Finance Admin" title="Loading workspace…" sub=" "/>
    <div className="ff-grid ff-grid--kpis">
      {[0,1,2,3].map(i => (
        <div key={i} className="ff-kpi">
          <div className="ff-skel" style={{width:80, height:10, marginBottom:14}}/>
          <div className="ff-skel" style={{width:140, height:36, marginBottom:10}}/>
          <div className="ff-skel" style={{width:100, height:10}}/>
        </div>
      ))}
    </div>
    <div className="ff-grid" style={{gridTemplateColumns:'2fr 1fr', marginTop:16}}>
      <div className="ff-card"><div className="ff-card__head"><div className="ff-skel" style={{width:140, height:14}}/></div><div className="ff-card__body"><div className="ff-skel" style={{width:'100%', height:240}}/></div></div>
      <div className="ff-card"><div className="ff-card__head"><div className="ff-skel" style={{width:120, height:14}}/></div><div className="ff-card__body"><div className="ff-stack" style={{'--ff-stack-gap':'14px'}}>{[0,1,2,3].map(i => <div key={i} className="ff-skel" style={{width:'100%', height:14}}/>)}</div></div></div>
    </div>
  </>
);

const EmptyExpenses = () => (
  <>
    <PageHead eyebrow="Expenses" title="All expenses" sub="0 items"/>
    <Card>
      <div className="ff-empty">
        <div className="ff-empty__icon"><Icon name="receipt" size={24}/></div>
        <div className="ff-empty__title">No expenses yet</div>
        <div className="ff-empty__body">When teammates submit expenses or your cards are swiped, you'll see them here.</div>
        <div className="ff-row" style={{marginTop:12, gap:8}}>
          <button className="ff-btn"><Icon name="upload-simple" size={14}/> Import CSV</button>
          <button className="ff-btn ff-btn--primary"><Icon name="plus" size={14}/> New expense</button>
        </div>
      </div>
    </Card>
  </>
);

const ErrorState = () => (
  <>
    <PageHead eyebrow="Workspace" title="Something went wrong" sub="We couldn't load your dashboard"/>
    <Card>
      <div className="ff-empty">
        <div className="ff-empty__icon" style={{background:'var(--ff-rejected-bg)', color:'var(--ff-rejected)', borderColor:'transparent'}}><Icon name="warning-octagon" size={24}/></div>
        <div className="ff-empty__title">FinFlow is having trouble</div>
        <div className="ff-empty__body">We've been notified. Try again, or check <a href="#">status.finflow.app</a>.</div>
        <div className="ff-mono" style={{fontSize:11, color:'var(--ff-fg-subtle)', marginTop:6}}>err_id: fff_4b22 · 503</div>
        <div className="ff-row" style={{marginTop:12, gap:8}}>
          <button className="ff-btn"><Icon name="arrow-clockwise" size={14}/> Retry</button>
          <button className="ff-btn ff-btn--primary">Contact support</button>
        </div>
      </div>
    </Card>
  </>
);

const SuccessApproval = () => (
  <div style={{maxWidth:480, margin:'48px auto', textAlign:'center'}}>
    <div style={{width:72, height:72, borderRadius:999, background:'var(--ff-approved-bg)', color:'var(--ff-approved)', margin:'0 auto', display:'grid', placeItems:'center'}}>
      <Icon name="check-circle" size={36} weight="fill"/>
    </div>
    <h1 style={{fontFamily:'var(--ff-font-sans)', fontWeight:700, fontSize:42, lineHeight:1.1, letterSpacing:'-0.03em', marginTop:24}}>Approved.</h1>
    <p style={{color:'var(--ff-fg-muted)', marginTop:8}}>EXP-2841 · United Airlines · $842.50 approved and routed to Finance for payment.</p>
    <div className="ff-row" style={{justifyContent:'center', marginTop:20, gap:8}}>
      <button className="ff-btn">View expense</button>
      <button className="ff-btn ff-btn--primary">Next in queue (7) →</button>
    </div>
  </div>
);

const ConfirmReimbursement = () => (
  <div style={{maxWidth:520, margin:'48px auto', textAlign:'center'}}>
    <div style={{width:72, height:72, borderRadius:999, background:'var(--ff-flagged-bg)', color:'var(--ff-flagged)', margin:'0 auto', display:'grid', placeItems:'center'}}>
      <Icon name="calendar-check" size={36} weight="fill"/>
    </div>
    <h1 style={{fontFamily:'var(--ff-font-sans)', fontWeight:700, fontSize:42, lineHeight:1.1, letterSpacing:'-0.03em', marginTop:24}}>Payout scheduled.</h1>
    <p style={{color:'var(--ff-fg-muted)', marginTop:8}}>3 reimbursements totaling <strong className="ff-tnum">$620.90</strong> will be sent to employees via ACH on <strong>May 30, 2026</strong>.</p>
    <Card style={{marginTop:24, textAlign:'left'}}>
      <table className="ff-table ff-table--compact">
        <tbody>
          <tr><td>Iris Chen</td><td className="ff-num"><Money value={320.40}/></td></tr>
          <tr><td>Luna Park</td><td className="ff-num"><Money value={82.00}/></td></tr>
          <tr><td>Dev Patel</td><td className="ff-num"><Money value={218.50}/></td></tr>
        </tbody>
      </table>
    </Card>
    <div className="ff-row" style={{justifyContent:'center', marginTop:20, gap:8}}>
      <button className="ff-btn">Download ACH receipt</button>
      <button className="ff-btn ff-btn--primary">Back to dashboard</button>
    </div>
  </div>
);

Object.assign(window, { SignIn, SSOWorkspace, ForgotPassword, ResetPassword, ConnectBank, InviteTeam, SetPolicy, AuditLog, NotificationsCenter, Help, LoadingDashboard, EmptyExpenses, ErrorState, SuccessApproval, ConfirmReimbursement });
