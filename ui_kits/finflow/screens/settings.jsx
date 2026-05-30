/* FinFlow Screens — Settings (profile, security, team, policies, integrations, billing, notifications) */

const SettingsShell = ({ active, setActive, children }) => {
  const tabs = [
    { id:"profile",      label:"Profile",      icon:"user" },
    { id:"security",     label:"Security",     icon:"shield-check" },
    { id:"team",         label:"Team & roles", icon:"users-three" },
    { id:"policies",     label:"Policies",     icon:"scales" },
    { id:"integrations", label:"Integrations", icon:"plugs" },
    { id:"billing",      label:"Billing",      icon:"credit-card" },
    { id:"notif-prefs",  label:"Notifications",icon:"bell" }
  ];
  return (
    <>
      <PageHead eyebrow="Settings" title="Workspace settings" sub="Manage your Arcadia Labs workspace"/>
      <div className="ff-grid" style={{gridTemplateColumns:'220px 1fr', gap:24, alignItems:'flex-start'}}>
        <div className="ff-stack" style={{'--ff-stack-gap':'2px'}}>
          {tabs.map(t => (
            <a key={t.id} href="#" onClick={e=>{e.preventDefault();setActive(t.id);}}
               className="ff-nav-item" aria-current={active === t.id ? "page" : undefined}>
              <Icon name={t.icon} size={16}/>{t.label}
            </a>
          ))}
        </div>
        <div>{children}</div>
      </div>
    </>
  );
};

const SettingsProfile = () => (
  <Card title="Profile">
    <div className="ff-row" style={{gap:18, marginBottom:20}}>
      <Avatar initials="MO" size="xl"/>
      <div>
        <div style={{fontSize:18, fontWeight:600}}>Maren Okafor</div>
        <div style={{fontSize:13, color:'var(--ff-fg-muted)'}}>Director of Finance · Joined Mar 2023</div>
        <div className="ff-row" style={{marginTop:10, gap:8}}>
          <button className="ff-btn ff-btn--sm">Upload photo</button>
          <button className="ff-btn ff-btn--sm ff-btn--ghost">Remove</button>
        </div>
      </div>
    </div>
    <div className="ff-grid ff-grid--2" style={{gap:'14px 18px'}}>
      <div className="ff-field"><label className="ff-label">Full name</label><input className="ff-input" defaultValue="Maren Okafor"/></div>
      <div className="ff-field"><label className="ff-label">Preferred name</label><input className="ff-input" defaultValue="Maren"/></div>
      <div className="ff-field"><label className="ff-label">Title</label><input className="ff-input" defaultValue="Director of Finance"/></div>
      <div className="ff-field"><label className="ff-label">Department</label><input className="ff-input" defaultValue="Finance"/></div>
      <div className="ff-field"><label className="ff-label">Work email</label><input className="ff-input" defaultValue="maren@arcadialabs.co"/></div>
      <div className="ff-field"><label className="ff-label">Time zone</label><select className="ff-select"><option>America/Los_Angeles</option><option>America/New_York</option><option>UTC</option></select></div>
    </div>
    <div className="ff-row" style={{marginTop:20, justifyContent:'flex-end', gap:8}}>
      <button className="ff-btn">Cancel</button>
      <button className="ff-btn ff-btn--primary">Save</button>
    </div>
  </Card>
);

const SettingsSecurity = () => (
  <div className="ff-stack" style={{'--ff-stack-gap':'16px'}}>
    <Card title="Two-factor authentication">
      <div className="ff-row" style={{justifyContent:'space-between'}}>
        <div>
          <div style={{fontWeight:500}}>Authenticator app · enabled</div>
          <div style={{fontSize:12, color:'var(--ff-fg-muted)'}}>Last used May 22, 9:04 AM</div>
        </div>
        <button className="ff-btn">Reconfigure</button>
      </div>
      <hr className="ff-divider"/>
      <div className="ff-row" style={{justifyContent:'space-between'}}>
        <div>
          <div style={{fontWeight:500}}>Hardware key (YubiKey)</div>
          <div style={{fontSize:12, color:'var(--ff-fg-muted)'}}>Not configured</div>
        </div>
        <button className="ff-btn ff-btn--primary">Add key</button>
      </div>
    </Card>
    <Card title="Active sessions" padded={false}>
      <table className="ff-table">
        <thead><tr><th>Device</th><th>Location</th><th>Last active</th><th></th></tr></thead>
        <tbody>
          <tr><td><Icon name="laptop" size={14}/> MacBook Pro · Chrome 128</td><td>San Francisco, CA</td><td className="ff-tnum">Now</td><td><span className="ff-badge ff-badge--approved ff-badge--no-dot">Current</span></td></tr>
          <tr><td><Icon name="device-mobile" size={14}/> iPhone 15 · FinFlow iOS</td><td>San Francisco, CA</td><td className="ff-tnum">2h ago</td><td><button className="ff-btn ff-btn--ghost ff-btn--sm">Revoke</button></td></tr>
          <tr><td><Icon name="laptop" size={14}/> Windows · Edge 128</td><td>Austin, TX (VPN)</td><td className="ff-tnum">3d ago</td><td><button className="ff-btn ff-btn--ghost ff-btn--sm">Revoke</button></td></tr>
        </tbody>
      </table>
    </Card>
    <Card title="API keys" action={<button className="ff-btn ff-btn--sm">+ New key</button>}>
      <div className="ff-row" style={{justifyContent:'space-between', fontSize:13}}>
        <div><div style={{fontWeight:500}} className="ff-mono">ff_live_••••91kx</div><div style={{fontSize:11, color:'var(--ff-fg-muted)'}}>QuickBooks sync · created Apr 2</div></div>
        <button className="ff-btn ff-btn--sm ff-btn--ghost">Rotate</button>
      </div>
    </Card>
  </div>
);

const SettingsTeam = () => (
  <Card title="Team & roles" padded={false} action={<button className="ff-btn ff-btn--sm ff-btn--primary"><Icon name="user-plus" size={12}/> Invite</button>}>
    <table className="ff-table">
      <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Last active</th><th></th></tr></thead>
      <tbody>
        {[
          ["Maren Okafor","Finance Admin","maren@arcadialabs.co","Now"],
          ["Theo Vasquez","Manager","theo@arcadialabs.co","12m"],
          ["Iris Chen","Employee","iris@arcadialabs.co","2h"],
          ["Luna Park","Employee","luna@arcadialabs.co","4h"],
          ["Dev Patel","Employee","dev@arcadialabs.co","Yesterday"],
          ["Mira Solberg","Employee","mira@arcadialabs.co","2d"],
          ["Asa Brown","Auditor","asa@arcadialabs.co","1w"]
        ].map(([n, role, em, la], i) => (
          <tr key={i}>
            <td><span className="ff-row" style={{gap:8}}><Avatar initials={n.split(' ').map(x=>x[0]).join('').slice(0,2)}/>{n}</span></td>
            <td style={{color:'var(--ff-fg-muted)'}}>{em}</td>
            <td><span className="ff-badge ff-badge--plum ff-badge--no-dot">{role}</span></td>
            <td className="ff-tnum" style={{color:'var(--ff-fg-muted)'}}>{la}</td>
            <td><button className="ff-btn ff-btn--ghost ff-btn--sm">Edit</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  </Card>
);

const SettingsPolicies = () => {
  const d = FF_DATA;
  return (
    <Card title="Policies" action={<button className="ff-btn ff-btn--sm ff-btn--primary"><Icon name="plus" size={12}/> New policy</button>} padded={false}>
      <table className="ff-table">
        <thead><tr><th>Policy</th><th>Limit / rule</th><th>Scope</th><th>Last edited</th><th></th></tr></thead>
        <tbody>
          {d.policies.map((p, i) => (
            <tr key={i}>
              <td><strong>{p.name}</strong></td>
              <td>{p.limit}</td>
              <td><span className="ff-badge ff-badge--neutral ff-badge--no-dot">{p.scope}</span></td>
              <td className="ff-tnum" style={{color:'var(--ff-fg-muted)'}}>{p.lastEdit}</td>
              <td><button className="ff-btn ff-btn--ghost ff-btn--sm">Edit</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};

const SettingsIntegrations = () => {
  const d = FF_DATA;
  return (
    <div className="ff-grid ff-grid--3">
      {d.integrations.map((i, k) => (
        <Card key={k}>
          <div className="ff-row" style={{justifyContent:'space-between', marginBottom:10}}>
            <div className="ff-row" style={{gap:10}}>
              <div style={{width:36, height:36, borderRadius:8, background:'var(--ff-card-2)', display:'grid', placeItems:'center', border:'1px solid var(--ff-border)'}}><Icon name={i.icon} size={18}/></div>
              <div>
                <div style={{fontWeight:600}}>{i.name}</div>
                <div style={{fontSize:11, color:'var(--ff-fg-muted)'}}>Last sync · {i.lastSync}</div>
              </div>
            </div>
            {i.status === "connected"
              ? <span className="ff-badge ff-badge--approved ff-badge--no-dot"><Icon name="check" size={12}/> Connected</span>
              : <span className="ff-badge ff-badge--neutral ff-badge--no-dot">Available</span>}
          </div>
          <p style={{margin:'8px 0 14px', fontSize:13, color:'var(--ff-fg-muted)'}}>
            {{
              "QuickBooks":"Sync expenses, vendors, and reimbursements to QuickBooks Online.",
              "Mercury":"Pull statements; fund reimbursements from operating account.",
              "Brex":"Import card transactions and statements automatically.",
              "NetSuite":"Sync to NetSuite GL for monthly close.",
              "Slack":"Approve and review expenses inline in Slack.",
              "Okta SSO":"Single sign-on with SCIM provisioning."
            }[i.name]}
          </p>
          <button className={`ff-btn ff-btn--sm ${i.status === "connected" ? "" : "ff-btn--primary"}`} style={{width:'100%'}}>
            {i.status === "connected" ? "Manage" : "Connect"}
          </button>
        </Card>
      ))}
    </div>
  );
};

const SettingsBilling = () => (
  <div className="ff-stack" style={{'--ff-stack-gap':'16px'}}>
    <Card title="Plan">
      <div className="ff-row" style={{justifyContent:'space-between', alignItems:'flex-start'}}>
        <div>
          <div style={{fontFamily:'var(--ff-font-sans)', fontWeight:600, fontSize:24, letterSpacing:'-0.025em'}}>FinFlow Scale</div>
          <div style={{color:'var(--ff-fg-muted)', fontSize:13, marginTop:4}}>$15 / user / month · billed annually</div>
          <div className="ff-row" style={{gap:6, marginTop:10}}>
            <span className="ff-badge ff-badge--approved ff-badge--no-dot"><Icon name="check" size={12}/> Active</span>
            <span className="ff-badge ff-badge--neutral ff-badge--no-dot">Renews Jan 14, 2027</span>
          </div>
        </div>
        <div>
          <button className="ff-btn">Compare plans</button>
          <button className="ff-btn ff-btn--primary" style={{marginLeft:8}}>Add seats</button>
        </div>
      </div>
    </Card>
    <Card title="Payment method">
      <div className="ff-row" style={{justifyContent:'space-between'}}>
        <div className="ff-row" style={{gap:10}}>
          <div style={{width:40, height:28, borderRadius:4, background:'var(--ff-plum-700)'}}/>
          <div>
            <div style={{fontWeight:500}} className="ff-mono">•••• •••• •••• 4242</div>
            <div style={{fontSize:11, color:'var(--ff-fg-muted)'}}>Visa · expires 11/27</div>
          </div>
        </div>
        <button className="ff-btn">Update</button>
      </div>
    </Card>
    <Card title="Invoices" padded={false}>
      <table className="ff-table">
        <thead><tr><th>Invoice</th><th>Date</th><th className="ff-num">Amount</th><th>Status</th><th></th></tr></thead>
        <tbody>
          {[["INV-2026-005","May 14",3720,"paid"],["INV-2026-004","Apr 14",3720,"paid"],["INV-2026-003","Mar 14",3525,"paid"]].map(([id, dt, a, s], i) => (
            <tr key={i}><td className="ff-mono" style={{fontSize:12}}>{id}</td><td>{dt}</td><td className="ff-num"><Money value={a}/></td><td><StatusBadge status={s}/></td><td><button className="ff-btn ff-btn--ghost ff-btn--sm">PDF</button></td></tr>
          ))}
        </tbody>
      </table>
    </Card>
  </div>
);

const SettingsNotifPrefs = () => (
  <Card title="Notification preferences">
    {[
      ["Expense submitted to me", true, true, false],
      ["Policy flag on my expense", true, true, true],
      ["Approval decision", true, false, true],
      ["Reimbursement scheduled", true, true, false],
      ["Weekly digest", true, false, false],
      ["Card transaction over $250", true, true, true]
    ].map(([label, em, sl, push], i, arr) => (
      <div key={i} className="ff-row" style={{padding:'12px 0', borderBottom: i < arr.length-1 ? '1px solid var(--ff-border)' : '0'}}>
        <div style={{flex:1}}>{label}</div>
        <label className="ff-row" style={{gap:6, fontSize:12, minWidth:80}}><input type="checkbox" defaultChecked={em}/> Email</label>
        <label className="ff-row" style={{gap:6, fontSize:12, minWidth:80}}><input type="checkbox" defaultChecked={sl}/> Slack</label>
        <label className="ff-row" style={{gap:6, fontSize:12, minWidth:80}}><input type="checkbox" defaultChecked={push}/> Push</label>
      </div>
    ))}
  </Card>
);

Object.assign(window, { SettingsShell, SettingsProfile, SettingsSecurity, SettingsTeam, SettingsPolicies, SettingsIntegrations, SettingsBilling, SettingsNotifPrefs });
