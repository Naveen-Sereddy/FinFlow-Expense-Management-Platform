/* FinFlow Screens — Onboarding, Audit, Notif Center, Help, States */

/* ---------- Onboarding — 6-step, sidebar step list ---------- */
/* Sign in / SSO / password recovery were retired: onb-workspace (workspace
   creation) is now the single entry point for the mock flow. */

const ONB_STEPS = [
  { id:"onb-workspace", label:"Workspace" },
  { id:"onb-company",   label:"Company details" },
  { id:"onb-connect",   label:"Connect systems" },
  { id:"onb-invite",    label:"Invite team" },
  { id:"onb-policy",    label:"Expense policy" },
  { id:"onb-success",   label:"Success" },
];

const OnboardingShell = ({ step, children, title, sub, next, nextId, back, backId, skip }) => (
  <div style={{display:'grid', gridTemplateColumns:'25% 75%', minHeight:'100%', background:'var(--ff-bg)'}}>
    <aside style={{
      borderRight:'1px solid var(--ff-border)', padding:'40px 32px',
      display:'flex', flexDirection:'column', justifyContent:'space-between'
    }}>
      <div>
        <BrandMark variant="horizontal" size={26}/>
        <div style={{marginTop:40, display:'flex', flexDirection:'column'}}>
          {ONB_STEPS.map((s, i) => (
            <div key={s.id} style={{display:'flex', gap:12}}>
              <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                <span style={{
                  width:20, height:20, borderRadius:'999px', flexShrink:0,
                  display:'grid', placeItems:'center', fontSize:11, fontWeight:600,
                  background: i < step ? 'var(--ff-primary)' : (i === step ? 'var(--ff-bg)' : 'transparent'),
                  border: i === step ? '2px solid var(--ff-primary)' : (i < step ? 'none' : '1.5px solid var(--ff-border-strong)'),
                  color: i < step ? '#fff' : (i === step ? 'var(--ff-primary)' : 'var(--ff-fg-subtle)'),
                }}>
                  {i < step ? <Icon name="check" size={11} weight="bold"/> : null}
                  {i === step && <span style={{width:7, height:7, borderRadius:'999px', background:'var(--ff-primary)'}}/>}
                </span>
                {i < ONB_STEPS.length - 1 && (
                  <span style={{width:1.5, flex:1, minHeight:22, background: i < step ? 'var(--ff-primary)' : 'var(--ff-border)'}}/>
                )}
              </div>
              <div style={{paddingBottom:22, fontSize:13.5, fontWeight: i === step ? 600 : 500, color: i === step ? 'var(--ff-fg)' : (i < step ? 'var(--ff-fg-muted)' : 'var(--ff-fg-subtle)')}}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{fontSize:12.5, color:'var(--ff-fg-muted)'}}>
        <div style={{fontWeight:500, color:'var(--ff-fg)', marginBottom:4}}>Need help?</div>
        <a href="#" style={{color:'var(--ff-fg-muted)'}}>Contact support →</a>
      </div>
    </aside>
    <main style={{display:'flex', alignItems:'center', padding:'28px 56px'}}>
      <div style={{width:'100%', maxWidth:700, margin:'0 auto'}}>
        <div className="ff-eyebrow">Onboarding · Step {step+1} of {ONB_STEPS.length}</div>
        <h1 style={{fontFamily:'var(--ff-font-sans)', fontWeight:700, fontSize:38, lineHeight:1.1, letterSpacing:'-0.03em', marginTop:8}}>{title}</h1>
        {sub && <p style={{color:'var(--ff-fg-muted)', maxWidth:520, marginTop:8, fontSize:15}}>{sub}</p>}
        <div style={{marginTop:32}}>{children}</div>
        <div className="ff-row" style={{justifyContent:'space-between', marginTop:32}}>
          <span>{back ? <button className="ff-btn ff-btn--ghost" onClick={()=>ffGo(backId)}>{back}</button> : <span/>}</span>
          <div className="ff-row" style={{gap:10}}>
            {skip !== false && <button className="ff-btn ff-btn--ghost" onClick={()=>ffGo(nextId)}>Skip for now</button>}
            <button className="ff-btn ff-btn--primary ff-btn--lg" onClick={()=>ffGo(nextId)}>{next}</button>
          </div>
        </div>
      </div>
    </main>
  </div>
);

/* WelcomeWorkspace needs its own heading + a signup-style CTA row instead of
   the shell's default Continue/Skip footer, so it composes the sidebar
   directly rather than reusing the generic OnboardingShell body. */
const WelcomeWorkspace = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [errors, setErrors] = React.useState({ name: false, email: false });

  const handleContinue = () => {
    const nameOk = name.trim().length > 0;
    const emailOk = email.trim().length > 0;
    if (!nameOk || !emailOk) {
      setErrors({ name: !nameOk, email: !emailOk });
      return;
    }
    ffGo('onb-company');
  };

  const errorStyle = { borderColor: 'var(--ff-rejected)' };

  return (
  <div style={{display:'grid', gridTemplateColumns:'25% 75%', minHeight:'100%', background:'var(--ff-bg)'}}>
    <aside style={{borderRight:'1px solid var(--ff-border)', padding:'40px 32px', display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
      <div>
        <BrandMark variant="horizontal" size={26}/>
        <div style={{marginTop:40, display:'flex', flexDirection:'column'}}>
          {ONB_STEPS.map((s, i) => (
            <div key={s.id} style={{display:'flex', gap:12}}>
              <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                <span style={{
                  width:20, height:20, borderRadius:'999px', flexShrink:0,
                  display:'grid', placeItems:'center',
                  background: i === 0 ? 'var(--ff-bg)' : 'transparent',
                  border: i === 0 ? '2px solid var(--ff-primary)' : '1.5px solid var(--ff-border-strong)',
                }}>
                  {i === 0 && <span style={{width:7, height:7, borderRadius:'999px', background:'var(--ff-primary)'}}/>}
                </span>
                {i < ONB_STEPS.length - 1 && <span style={{width:1.5, flex:1, minHeight:22, background:'var(--ff-border)'}}/>}
              </div>
              <div style={{paddingBottom:22, fontSize:13.5, fontWeight: i === 0 ? 600 : 500, color: i === 0 ? 'var(--ff-fg)' : 'var(--ff-fg-subtle)'}}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{fontSize:12.5, color:'var(--ff-fg-muted)'}}>
        <div style={{fontWeight:500, color:'var(--ff-fg)', marginBottom:4}}>Need help?</div>
        <a href="#" style={{color:'var(--ff-fg-muted)'}}>Contact support →</a>
      </div>
    </aside>
    <main style={{display:'flex', alignItems:'center', padding:'40px 56px'}}>
      <div style={{width:'100%', maxWidth:460, margin:'0 auto'}}>
        <div className="ff-eyebrow">Get started</div>
        <h1 style={{fontFamily:'var(--ff-font-sans)', fontWeight:700, fontSize:38, lineHeight:1.1, letterSpacing:'-0.03em', marginTop:8}}>Welcome to FinFlow</h1>
        <p style={{color:'var(--ff-fg-muted)', marginTop:8, fontSize:15}}>Let's create your finance workspace.</p>

        <div className="ff-stack" style={{'--ff-stack-gap':'14px', marginTop:32}}>
          <div className="ff-field">
            <label className="ff-label">Workspace name</label>
            <input className="ff-input ff-input--lg" placeholder="Reyonal" value={name}
              style={errors.name ? errorStyle : undefined}
              onChange={e=>{setName(e.target.value); if (errors.name) setErrors(x=>({...x, name:false}));}}/>
            {errors.name && <div style={{fontSize:12, color:'var(--ff-rejected)', marginTop:4}}>Enter a workspace name.</div>}
          </div>
          <div className="ff-field">
            <label className="ff-label">Company email</label>
            <input className="ff-input ff-input--lg" placeholder="you@company.com" value={email}
              style={errors.email ? errorStyle : undefined}
              onChange={e=>{setEmail(e.target.value); if (errors.email) setErrors(x=>({...x, email:false}));}}/>
            {errors.email && <div style={{fontSize:12, color:'var(--ff-rejected)', marginTop:4}}>Enter a company email.</div>}
          </div>
          <button className="ff-btn ff-btn--primary ff-btn--lg" style={{width:'100%'}} onClick={handleContinue}>Continue</button>

          <div style={{display:'flex', alignItems:'center', gap:12, color:'var(--ff-fg-muted)', fontSize:12, margin:'6px 0'}}>
            <hr style={{flex:1, border:0, borderTop:'1px solid var(--ff-border)'}}/> or <hr style={{flex:1, border:0, borderTop:'1px solid var(--ff-border)'}}/>
          </div>

          <button className="ff-btn ff-btn--lg" style={{width:'100%', justifyContent:'center'}}><BrandIcon name="google" size={16}/><span>Continue with Google</span></button>
          <button className="ff-btn ff-btn--lg" style={{width:'100%', justifyContent:'center'}}><BrandIcon name="microsoft" size={16}/><span>Continue with Microsoft</span></button>
          <button className="ff-btn ff-btn--lg" style={{width:'100%', justifyContent:'center'}}><BrandIcon name="okta" size={16}/><span>Continue with Okta SSO</span></button>
        </div>

        <div style={{marginTop:28, display:'flex', alignItems:'center', gap:16, fontSize:11, color:'var(--ff-fg-subtle)', letterSpacing:'0.04em', textTransform:'uppercase'}}>
          <span>SOC 2</span><span>·</span><span>PCI DSS</span><span>·</span><span>GDPR</span>
        </div>
        <div style={{marginTop:14, fontSize:12.5, color:'var(--ff-fg-muted)'}}>
          By continuing, you agree to FinFlow's <a href="#">Terms</a> and <a href="#">Privacy Policy</a>.
        </div>
      </div>
    </main>
  </div>
  );
};

const CompanyDetails = () => (
  <OnboardingShell step={1} back="← Back" backId="onb-workspace" nextId="onb-connect" next="Continue →"
    title="Tell us about your company"
    sub="Helps us set sensible defaults for currency, fiscal calendar, and tax handling.">
    <Card>
      <div className="ff-grid ff-grid--2">
        <div className="ff-field"><label className="ff-label">Company name</label><input className="ff-input" defaultValue="Reyonal"/></div>
        <div className="ff-field"><label className="ff-label">Website</label><input className="ff-input" placeholder="reyonal.com"/></div>
        <div className="ff-field"><label className="ff-label">Industry</label>
          <select className="ff-select" defaultValue="Software / SaaS"><option>Software / SaaS</option><option>Financial services</option><option>Healthcare</option><option>Retail</option><option>Manufacturing</option></select>
        </div>
        <div className="ff-field"><label className="ff-label">Company size</label>
          <select className="ff-select" defaultValue="201–500 employees"><option>1–50 employees</option><option>51–200 employees</option><option>201–500 employees</option><option>501–2,000 employees</option><option>2,000+ employees</option></select>
        </div>
        <div className="ff-field"><label className="ff-label">Country</label>
          <select className="ff-select" defaultValue="United States"><option>United States</option><option>Canada</option><option>United Kingdom</option><option>Germany</option><option>Australia</option></select>
        </div>
        <div className="ff-field"><label className="ff-label">Primary currency</label>
          <select className="ff-select" defaultValue="USD">
            <option>USD</option><option>EUR</option><option>GBP</option><option>CAD</option><option>AUD</option>
          </select>
        </div>
        <div className="ff-field"><label className="ff-label">Fiscal year start</label>
          <select className="ff-select" defaultValue="January">
            <option>January</option><option>April</option><option>July</option><option>October</option>
          </select>
        </div>
        <div className="ff-field"><label className="ff-label">Tax region</label><input className="ff-input" placeholder="e.g. US — California"/></div>
      </div>
    </Card>
  </OnboardingShell>
);

const ConnectSystems = () => (
  <OnboardingShell step={2} back="← Back" backId="onb-company" nextId="onb-invite" next="Continue →"
    title="Connect the tools that power FinFlow"
    sub="Read-only access by default. Pull statements, sync the ledger, and issue cards without leaving FinFlow.">
    <div className="ff-stack" style={{'--ff-stack-gap':'14px'}}>
      <div>
        <div style={{fontSize:11, fontWeight:600, color:'var(--ff-fg-muted)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:8}}>Accounting software</div>
        <div className="ff-grid ff-grid--4">
          {[
            { name:"QuickBooks", brand:"quickbooks" }, { name:"Xero", brand:"xero" },
            { name:"SAP", brand:"sap" }, { name:"Sage", brand:"sage" },
          ].map(a => (
            <Card key={a.name} padded={false}>
              <div style={{padding:14}}>
                <div className="ff-row" style={{gap:8}}>
                  <div style={{width:30, height:30, borderRadius:7, background:'var(--ff-card-2)', border:'1px solid var(--ff-border)', display:'grid', placeItems:'center', flexShrink:0}}>
                    {a.brand ? <BrandIcon name={a.brand} size={16}/> : <Icon name={a.icon} size={14}/>}
                  </div>
                  <div style={{fontWeight:600, fontSize:12.5}}>{a.name}</div>
                </div>
                <button className="ff-btn ff-btn--sm" style={{width:'100%', marginTop:10}}>Connect</button>
              </div>
            </Card>
          ))}
        </div>
      </div>
      <div>
        <div style={{fontSize:11, fontWeight:600, color:'var(--ff-fg-muted)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:8}}>Bank &amp; corporate cards</div>
        <div className="ff-grid ff-grid--3">
          {[
            { name:"Wise", brand:"wise", desc:"Business checking, ACH out" },
            { name:"Brex",    brand:"brex", desc:"Cards, statements" },
            { name:"Plaid · Other", icon:"plugs", desc:"12,000+ institutions" },
          ].map(b => (
            <Card key={b.name} padded={false}>
              <div style={{padding:14}}>
                <div className="ff-row" style={{gap:8}}>
                  <div style={{width:30, height:30, borderRadius:7, background:'var(--ff-card-2)', border:'1px solid var(--ff-border)', display:'grid', placeItems:'center', flexShrink:0}}>
                    {b.brand ? <BrandIcon name={b.brand} size={16}/> : <Icon name={b.icon} size={14}/>}
                  </div>
                  <div>
                    <div style={{fontWeight:600, fontSize:12.5}}>{b.name}</div>
                    <div style={{fontSize:10.5, color:'var(--ff-fg-muted)'}}>{b.desc}</div>
                  </div>
                </div>
                <button className="ff-btn ff-btn--sm" style={{width:'100%', marginTop:10}}>Connect</button>
              </div>
            </Card>
          ))}
        </div>
      </div>
      <div className="ff-alert ff-alert--info" style={{padding:'10px 14px'}}>
        <Icon name="lock-key" size={18} weight="fill"/>
        <div className="ff-alert__body">
          <div className="ff-alert__title">Encrypted · Read-only · SOC 2 compliant</div>
          <div>FinFlow never moves money on a connected account without an explicit action from your team.</div>
        </div>
      </div>
    </div>
  </OnboardingShell>
);

const InviteTeam = () => (
  <OnboardingShell step={3} back="← Back" backId="onb-connect" nextId="onb-policy" next="Continue →"
    title="Invite your finance team"
    sub="Send invites by email. Roles can be changed later.">
    <Card>
      <div className="ff-stack" style={{'--ff-stack-gap':'10px'}}>
        {[
          { e: "xavier.bartlett@reyonal.com", r: "Manager" },
          { e: "corey.anderson@reyonal.com", r: "Employee" },
          { e: "sam.richardson@reyonal.com",  r: "Employee" },
          { e: "", r: "Employee" }
        ].map((row, i) => (
          <div key={i} className="ff-row" style={{gap:10}}>
            <input className="ff-input" defaultValue={row.e} placeholder="name@company.com"/>
            <select className="ff-select" style={{width:160}} defaultValue={row.r}>
              <option>Employee</option><option>Manager</option><option>Finance Admin</option><option>Approver</option><option>Accountant</option><option>Purchasing</option>
            </select>
            <button className="ff-btn ff-btn--ghost ff-btn--icon" aria-label={row.e ? `Remove invite for ${row.e}` : "Remove empty invite row"}><Icon name="x" size={14}/></button>
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
    <div style={{marginTop:14, fontSize:12.5, color:'var(--ff-fg-muted)'}}>You can always invite more teammates later.</div>
  </OnboardingShell>
);

const ExpensePolicy = () => (
  <OnboardingShell step={4} back="← Back" backId="onb-invite" nextId="onb-success" next="Finish setup →"
    title="Set your expense policy"
    sub="You can refine these later — these are sensible defaults for a growing SaaS company.">
    <div className="ff-grid ff-grid--2" style={{gap:16, alignItems:'start'}}>
      <Card>
        <div className="ff-stack" style={{'--ff-stack-gap':'12px'}}>
          <div>
            <div style={{fontSize:11, fontWeight:600, color:'var(--ff-fg-muted)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:8}}>Approval workflow</div>
            <div className="ff-stack" style={{'--ff-stack-gap':'6px'}}>
              {["Manager approval","Department approval","Auto-approval under limit"].map((o, i) => (
                <label key={o} className="ff-row" style={{gap:8, fontSize:13, border:'1px solid var(--ff-border)', borderRadius:8, padding:'8px 12px'}}>
                  <input type="radio" name="approval" defaultChecked={i===0}/> {o}
                </label>
              ))}
            </div>
          </div>
          <hr className="ff-divider"/>
          <div>
            <div style={{fontSize:11, fontWeight:600, color:'var(--ff-fg-muted)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:8}}>Receipt requirement</div>
            <div className="ff-stack" style={{'--ff-stack-gap':'6px'}}>
              {["Always","Above amount","Never"].map((o, i) => (
                <label key={o} className="ff-row" style={{gap:8, fontSize:13, border:'1px solid var(--ff-border)', borderRadius:8, padding:'8px 12px'}}>
                  <input type="radio" name="receipts" defaultChecked={i===1}/> {o}
                </label>
              ))}
            </div>
          </div>
        </div>
      </Card>
      <Card>
        <div className="ff-stack" style={{'--ff-stack-gap':'12px'}}>
          <div>
            <div style={{fontSize:11, fontWeight:600, color:'var(--ff-fg-muted)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:8}}>Spend limits</div>
            <div className="ff-grid ff-grid--2" style={{gap:'10px 12px'}}>
              <div className="ff-field"><label className="ff-label">Daily</label><input className="ff-input ff-tnum" defaultValue="$500"/></div>
              <div className="ff-field"><label className="ff-label">Monthly</label><input className="ff-input ff-tnum" defaultValue="$5,000"/></div>
              <div className="ff-field"><label className="ff-label">Per-expense</label><input className="ff-input ff-tnum" defaultValue="$1,000"/></div>
              <div className="ff-field"><label className="ff-label">Receipts required over</label><input className="ff-input ff-tnum" defaultValue="$25"/></div>
            </div>
          </div>
          <hr className="ff-divider"/>
          <div>
            <div style={{fontSize:11, fontWeight:600, color:'var(--ff-fg-muted)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:8}}>Category limits</div>
            <div className="ff-grid ff-grid--2" style={{gap:'10px 12px'}}>
              <div className="ff-field"><label className="ff-label">Travel</label><input className="ff-input ff-tnum" defaultValue="$300 / night"/></div>
              <div className="ff-field"><label className="ff-label">Meals</label><input className="ff-input ff-tnum" defaultValue="$75 / day"/></div>
              <div className="ff-field"><label className="ff-label">Office</label><input className="ff-input ff-tnum" defaultValue="$200 / mo"/></div>
              <div className="ff-field"><label className="ff-label">Software</label><input className="ff-input ff-tnum" defaultValue="$150 / mo"/></div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  </OnboardingShell>
);

const OnboardingSuccess = () => (
  <div style={{minHeight:'100%', display:'flex', flexDirection:'column', padding:'24px 24px 40px'}}>
    <button className="ff-btn ff-btn--ghost" style={{alignSelf:'flex-start'}} onClick={()=>ffGo('onb-policy')}>← Back</button>
    <div style={{flex:1, display:'flex', alignItems:'center', justifyContent:'center'}}>
    <div style={{width:'100%', maxWidth:600, textAlign:'center'}}>
      <div style={{width:56, height:56, borderRadius:'999px', background:'var(--ff-approved-bg)', color:'var(--ff-approved)', display:'grid', placeItems:'center', margin:'0 auto'}}>
        <Icon name="check" size={28} weight="bold"/>
      </div>
      <h1 style={{fontFamily:'var(--ff-font-sans)', fontWeight:700, fontSize:34, lineHeight:1.1, letterSpacing:'-0.03em', marginTop:20}}>Your workspace is ready.</h1>
      <p style={{color:'var(--ff-fg-muted)', marginTop:8, fontSize:15}}>Everything is configured. Reyonal is ready to run on FinFlow.</p>

      <div className="ff-grid ff-grid--3" style={{marginTop:28, textAlign:'left'}}>
        {[
          { k:"Workspace", v:"Reyonal" },
          { k:"Connected bank", v:"Wise" },
          { k:"Accounting", v:"QuickBooks" },
          { k:"Team members", v:"3 invited" },
          { k:"Policies", v:"Configured" },
        ].map(s => (
          <Card key={s.k}>
            <div style={{fontSize:11, color:'var(--ff-fg-muted)', textTransform:'uppercase', letterSpacing:'0.06em'}}>{s.k}</div>
            <div style={{fontWeight:600, marginTop:4}}>{s.v}</div>
          </Card>
        ))}
      </div>

      <div className="ff-row" style={{gap:12, justifyContent:'center', marginTop:28}}>
        <button className="ff-btn ff-btn--ghost">Take product tour</button>
        <button className="ff-btn ff-btn--primary ff-btn--lg" onClick={()=>ffGo('dashboard')}>Go to dashboard →</button>
      </div>

      <div style={{marginTop:32, textAlign:'left'}}>
        <div style={{fontSize:12, fontWeight:600, color:'var(--ff-fg-muted)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:10}}>What's next</div>
        <div className="ff-stack" style={{'--ff-stack-gap':'8px'}}>
          {["Import your first expenses","Issue corporate cards","Create custom approval workflows","View spend analytics"].map(n => (
            <div key={n} className="ff-row" style={{gap:8, fontSize:13.5, color:'var(--ff-fg-muted)'}}><Icon name="arrow-right" size={14}/> {n}</div>
          ))}
        </div>
      </div>
    </div>
    </div>
  </div>
);

/* ---------- Audit ---------- */

/* Audit actions aren't expense/card statuses, but they still read as a
   status column — so they borrow the same seven-group semantic system
   (ff-badge--success/warning/info/review/action/danger/neutral) instead of
   inventing new colors or defaulting every action to one identical badge. */
const AUDIT_ACTION_GROUP = {
  "Approved": "success",
  "Flagged": "review",
  "Policy Check": "info",
  "Submitted": "info",
  "Edited Policy": "neutral",
  "Issued Card": "neutral",
  "Sign-in": "neutral",
};

const AuditLog = () => {
  const d = FF_DATA;
  const entries = d.auditEntries;
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
      {entries.length === 0 ? (
        <EmptyState icon="scroll" title="No activity yet"
          body="Every approval, policy edit, and sign-in in your workspace will show up here, immutably."/>
      ) : (
        <table className="ff-table">
          <thead><tr><th>Timestamp (UTC-7)</th><th>Actor</th><th>Action</th><th>Target</th><th>IP / agent</th></tr></thead>
          <tbody>
            {entries.map((a, i) => (
              <tr key={i}>
                <td className="ff-tnum" style={{color:'var(--ff-fg-muted)', fontSize:12}}>{a.ts}</td>
                <td><span className="ff-row" style={{gap:6}}>{a.actor !== "System" && a.actor !== "Okta SSO" && <Avatar initials={a.actor.split(' ').map(x=>x[0]).join('').slice(0,2)} name={a.actor}/>}{a.actor}</span></td>
                <td><span className={`ff-badge ff-badge--${AUDIT_ACTION_GROUP[a.action] || "neutral"} ff-badge--no-dot`}>{a.action}</span></td>
                <td>{a.target}</td>
                <td className="ff-mono" style={{fontSize:11, color:'var(--ff-fg-muted)'}}>10.0.4.221 · Chrome 128</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

/* ---------- Notif Center ---------- */
const NotificationsCenter = () => {
  const d = FF_DATA;
  return (
    <>
      <PageHead eyebrow="Notifications" title="Inbox" sub="Recent activity across your workspace"
        actions={<><button className="ff-btn"><Icon name="check" size={14}/> Mark all read</button><button className="ff-btn ff-btn--ghost" aria-label="Notification settings"><Icon name="gear-six" size={14}/></button></>}/>
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
          {d.notifications.map((n, i, arr) => (
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
          <div style={{width:36, height:36, borderRadius:8, background:'var(--ff-blue-100)', color:'var(--ff-blue-700)', display:'grid', placeItems:'center', marginBottom:12}}><Icon name={i} size={18}/></div>
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
    <div className="ff-grid" style={{gridTemplateColumns:'1.7fr 1fr 1fr 1fr'}}>
      <div className="ff-kpi" style={{minHeight:120}}>
        <div className="ff-skel" style={{width:90, height:10, marginBottom:16}}/>
        <div className="ff-skel" style={{width:160, height:40, marginBottom:10}}/>
        <div className="ff-skel" style={{width:110, height:10}}/>
      </div>
      {[0,1,2].map(i => (
        <div key={i} className="ff-kpi">
          <div className="ff-skel" style={{width:80, height:10, marginBottom:14}}/>
          <div className="ff-skel" style={{width:100, height:30, marginBottom:10}}/>
          <div className="ff-skel" style={{width:90, height:10}}/>
        </div>
      ))}
    </div>
    <div className="ff-grid" style={{gridTemplateColumns:'1.8fr 1fr', marginTop:20}}>
      <div className="ff-card"><div className="ff-card__head"><div className="ff-skel" style={{width:140, height:14}}/></div><div className="ff-card__body"><div className="ff-skel" style={{width:'100%', height:260}}/></div></div>
      <div className="ff-card"><div className="ff-card__head"><div className="ff-skel" style={{width:120, height:14}}/></div><div className="ff-card__body"><div className="ff-stack" style={{'--ff-stack-gap':'14px'}}>{[0,1,2,3].map(i => <div key={i} className="ff-skel" style={{width:'100%', height:14}}/>)}</div></div></div>
    </div>
  </>
);

const EmptyExpenses = () => (
  <>
    <PageHead eyebrow="Expenses" title="All expenses" sub="0 items"/>
    <div style={{display:'flex', alignItems:'center', justifyContent:'center', minHeight:'55vh'}}>
      <Card style={{width:'100%', maxWidth:520}}>
        <div className="ff-empty">
          <div className="ff-empty__icon"><Icon name="receipt" size={24}/></div>
          <div className="ff-empty__title">No expenses yet</div>
          <div className="ff-empty__body">When teammates submit expenses or your cards are swiped, you'll see them here.</div>
          <div className="ff-row" style={{marginTop:12, gap:8}}>
            <button className="ff-btn" onClick={()=>ffGo('import')}><Icon name="upload-simple" size={14}/> Import CSV</button>
            <button className="ff-btn ff-btn--primary" onClick={()=>ffGo('new-expense')}><Icon name="plus" size={14}/> New expense</button>
          </div>
        </div>
      </Card>
    </div>
  </>
);

const ErrorState = () => (
  <>
    <PageHead eyebrow="Workspace" title="Something went wrong" sub="We couldn't load your dashboard"/>
    <div style={{display:'flex', alignItems:'center', justifyContent:'center', minHeight:'55vh'}}>
      <Card style={{width:'100%', maxWidth:520}}>
      <div className="ff-empty">
        <div className="ff-empty__icon" style={{background:'var(--ff-rejected-bg)', color:'var(--ff-rejected)', borderColor:'transparent'}}><Icon name="warning-octagon" size={24}/></div>
        <div className="ff-empty__title">FinFlow is having trouble</div>
        <div className="ff-empty__body">We've been notified. Try again, or check <a href="#">status.finflow.app</a>.</div>
        <div className="ff-mono" style={{fontSize:11, color:'var(--ff-fg-subtle)', marginTop:6}}>err_id: fff_4b22 · 503</div>
        <div className="ff-row" style={{marginTop:12, gap:8}}>
          <button className="ff-btn" onClick={()=>ffGo('dashboard')}><Icon name="arrow-clockwise" size={14}/> Retry</button>
          <button className="ff-btn ff-btn--primary" onClick={()=>ffGo('help')}>Contact support</button>
        </div>
      </div>
      </Card>
    </div>
  </>
);

const SuccessApproval = () => {
  // EXP-2841 was just approved, so it leaves the open queue.
  const remaining = Math.max(0, FF_DATA.expenses.filter(e => e.status === "pending" || e.status === "flagged").length - 1);
  return (
  <div style={{maxWidth:480, margin:'48px auto', textAlign:'center'}}>
    <div style={{width:72, height:72, borderRadius:999, background:'var(--ff-approved-bg)', color:'var(--ff-approved)', margin:'0 auto', display:'grid', placeItems:'center'}}>
      <Icon name="check-circle" size={36} weight="fill"/>
    </div>
    <h1 style={{fontFamily:'var(--ff-font-sans)', fontWeight:700, fontSize:42, lineHeight:1.1, letterSpacing:'-0.03em', marginTop:24}}>Approved.</h1>
    <p style={{color:'var(--ff-fg-muted)', marginTop:8}}>EXP-2841 · United Airlines · $842.50 approved and routed to Finance for payment.</p>
    <div className="ff-row" style={{justifyContent:'center', marginTop:20, gap:8}}>
      <button className="ff-btn" onClick={()=>ffGo('expense-detail')}>View expense</button>
      <button className="ff-btn ff-btn--primary" onClick={()=>ffGo('approvals')}>Next in queue ({remaining}) →</button>
    </div>
  </div>
  );
};

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
          <tr><td>Corey Anderson</td><td className="ff-num"><Money value={320.40}/></td></tr>
          <tr><td>Jordan Lee</td><td className="ff-num"><Money value={82.00}/></td></tr>
          <tr><td>Sam Richardson</td><td className="ff-num"><Money value={218.50}/></td></tr>
        </tbody>
      </table>
    </Card>
    <div className="ff-row" style={{justifyContent:'center', marginTop:20, gap:8}}>
      <button className="ff-btn">Download ACH receipt</button>
      <button className="ff-btn ff-btn--primary" onClick={()=>ffGo('dashboard')}>Back to dashboard</button>
    </div>
  </div>
);

Object.assign(window, { WelcomeWorkspace, CompanyDetails, ConnectSystems, InviteTeam, ExpensePolicy, OnboardingSuccess, AuditLog, NotificationsCenter, Help, LoadingDashboard, EmptyExpenses, ErrorState, SuccessApproval, ConfirmReimbursement });
