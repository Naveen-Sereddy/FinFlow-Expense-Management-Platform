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
            <input className="ff-input ff-input--lg" placeholder="Client workspace" value={name}
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
        <div className="ff-field"><label className="ff-label">Company name</label><input className="ff-input" defaultValue="Client workspace"/></div>
        <div className="ff-field"><label className="ff-label">Website</label><input className="ff-input" placeholder="client.example"/></div>
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
          { e: "xavier@client.example", r: "Manager" },
          { e: "corey@client.example", r: "Employee" },
          { e: "sam@client.example",  r: "Employee" },
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
        <p style={{color:'var(--ff-fg-muted)', marginTop:8, fontSize:15}}>Everything is configured. Your client workspace is ready to run on FinFlow.</p>

      <div className="ff-grid ff-grid--3" style={{marginTop:28, textAlign:'left'}}>
        {[
          { k:"Workspace", v:"Client workspace" },
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

const scopedEvents = (data) => {
  const visible = new Set(FF_STORE.selectors.expenses(data).map((item) => item.id));
  return data.events.filter((event) => currentDemoRole() === 'finance' || visible.has(event.expenseId) || event.owner === data.me[currentDemoRole()].name);
};
const EventTable = ({events,data}) => events.length ? <TableRegion label="Recorded activity"><table className="ff-table"><thead><tr><th>Time</th><th>Actor</th><th>Action</th><th>Record</th><th>Reason</th></tr></thead><tbody>{events.map((event) => {
  const expense = data.expenses.find((item) => item.id === event.expenseId);
  return <tr key={event.id}><td>{new Date(event.ts).toLocaleString()}</td><td>{event.actor}</td><td>{event.action}</td><td>{expense ? <ExpenseLink expense={expense}>{expense.id} · {expense.merchant}</ExpenseLink> : event.target}</td><td>{event.note || '—'}</td></tr>;
})}</tbody></table></TableRegion> : <p>No recorded demo activity yet.</p>;
const AuditLog = () => {
  const [data] = useFinFlow();
  const [query,setQuery] = React.useState('');
  const events = scopedEvents(data).filter((event) => `${event.actor} ${event.target} ${event.action} ${event.note || ''}`.toLowerCase().includes(query.toLowerCase()));
  return <><PageHead title="Audit log" sub="Recorded local operations; historical fixtures have no complete event history."/><Field id="audit-search" label="Search activity"><input className="ff-input" value={query} onChange={(event) => setQuery(event.target.value)}/></Field><EventTable data={data} events={events}/></>;
};
const NotificationsCenter = () => {
  const [data] = useFinFlow();
  return <><PageHead title="Notifications" sub="Activity in your current scope. No email or push notification is sent."/><EventTable events={scopedEvents(data)} data={data}/></>;
};

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

const DecisionResult = ({route = {}}) => {
  const [data] = useFinFlow();
  const operation = data.operations.find((item) => item.id === route.operationId && ['approved','rejected','needs-info'].includes(item.type));
  const visible = FF_STORE.selectors.expenses(data);
  if (!operation || operation.ids.some((id) => !visible.some((expense) => expense.id === id))) return <MissingRecord/>;
  const expenses = visible.filter((expense) => operation.ids.includes(expense.id));
  const next = visible.find((expense) => FF_STORE.selectors.canReview(expense,data));
  const title = {approved:'Approval recorded',rejected:'Rejection recorded','needs-info':'Correction requested'}[operation.type];
  return <><PageHead title={title} sub={`${expenses.length} record(s) · ${operation.actor}`}/><Card title="Operation result">{expenses.map((expense) => <p key={expense.id}><ExpenseLink expense={expense}/> · {expense.id} · {expense.who} · <Money value={expense.amount}/> · Current status: <StatusBadge status={expense.status}/></p>)}<p className="ff-muted">Approval is separate from payment. Personal expenses become eligible for reimbursement; card expenses await reconciliation.</p></Card><div className="ff-action-row"><button className="ff-btn" onClick={() => ffGo('approvals')}>Back to queue</button>{next && <button className="ff-btn ff-btn--primary" onClick={() => ffGo('approval-detail',{expenseId:next.id})}>Review next: {next.merchant}</button>}</div></>;
};
const SuccessApproval = (props) => <DecisionResult {...props}/>;
const RejectedState = (props) => <DecisionResult {...props}/>;
const ConfirmReimbursement = ({route = {}}) => {
  const [data] = useFinFlow();
  const operation = data.operations.find((item) => item.id === route.operationId && item.type === 'payout-scheduled');
  if (!operation || currentDemoRole() !== 'finance') return <MissingRecord/>;
  const payouts = data.reimbursements.filter((item) => operation.ids.includes(item.id));
  return <><PageHead title="Demo payout scheduled" sub="No money has been sent."/><Card title="Scheduled selection"><p>{payouts.length} reimbursements · <Money value={payouts.reduce((sum,item) => sum + item.amountCents,0)/100}/></p>{payouts.map((payout) => <p key={payout.id}>{payout.id} · {payout.who} · {payout.expenseIds.join(', ')} · <Money value={payout.amount}/> · {fmtDate(payout.date)} · <StatusBadge status={payout.status}/></p>)}</Card><button className="ff-btn ff-btn--primary" onClick={() => ffGo('reimburse')}>View reimbursements</button></>;
};

Object.assign(window, { WelcomeWorkspace, CompanyDetails, ConnectSystems, InviteTeam, ExpensePolicy, OnboardingSuccess, AuditLog, NotificationsCenter, Help, LoadingDashboard, EmptyExpenses, ErrorState, SuccessApproval, RejectedState, ConfirmReimbursement });
