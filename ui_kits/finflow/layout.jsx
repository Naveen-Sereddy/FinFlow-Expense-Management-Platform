/* FinFlow Layout — App shell, sidebar, topbar, page wrappers, primitives */

const Icon = ({ name, size = 16, weight = "regular", style = {} }) => (
  <i className={`ph${weight === "fill" ? "-fill" : weight === "bold" ? "-bold" : ""} ph-${name}`}
     style={{ fontSize: size, lineHeight: 1, ...style }} aria-hidden="true"/>
);

const Money = ({ value, signed = false, className = "" }) => {
  const sign = signed && value > 0 ? "+" : "";
  const fmt = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 });
  return <span className={`ff-tnum ${className}`}>{sign}{fmt.format(value)}</span>;
};

const StatusBadge = ({ status }) => {
  const map = {
    approved: { label: "Approved",  icon: "check-circle" },
    pending:  { label: "Pending",   icon: "clock" },
    rejected: { label: "Rejected",  icon: "x-circle" },
    flagged:  { label: "Flagged",   icon: "warning" },
    paid:     { label: "Paid",      icon: "check-circle", cls: "approved" },
    scheduled:{ label: "Scheduled", icon: "calendar-blank", cls: "flagged" }
  };
  const m = map[status] || { label: status, icon: "circle" };
  const cls = m.cls || status;
  return (
    <span className={`ff-badge ff-badge--${cls} ff-badge--no-dot`}>
      <Icon name={m.icon} size={12}/> {m.label}
    </span>
  );
};

const Avatar = ({ initials, size = "md", style = {} }) => {
  const cls = size === "lg" ? "ff-avatar ff-avatar--lg" : size === "xl" ? "ff-avatar ff-avatar--xl" : "ff-avatar";
  return <span className={cls} style={style}>{initials}</span>;
};

const Sidebar = ({ role, current, onNavigate }) => {
  const groups = {
    finance: [
      { label: "Workspace", items: [
        { id: "dashboard",   icon: "house",          label: "Dashboard" },
        { id: "expenses",    icon: "receipt",        label: "Expenses",      count: 14 },
        { id: "approvals",   icon: "check-square",   label: "Approvals",     count: 37 },
        { id: "reimburse",   icon: "arrows-clockwise", label: "Reimbursements" }
      ]},
      { label: "Finance", items: [
        { id: "reports",     icon: "chart-bar",      label: "Reports" },
        { id: "cards",       icon: "credit-card",    label: "Cards" },
        { id: "vendors",     icon: "buildings",      label: "Vendors" },
        { id: "audit",       icon: "list-magnifying-glass", label: "Audit log" }
      ]},
      { label: "Configure", items: [
        { id: "policies",    icon: "scales",         label: "Policies" },
        { id: "team",        icon: "users-three",    label: "Team & roles" },
        { id: "integrations",icon: "plugs",          label: "Integrations" },
        { id: "settings",    icon: "gear-six",       label: "Settings" }
      ]}
    ],
    manager: [
      { label: "Workspace", items: [
        { id: "dashboard-mgr", icon: "house",        label: "Team overview" },
        { id: "approvals",   icon: "check-square",   label: "Approvals", count: 8 },
        { id: "expenses",    icon: "receipt",        label: "Team expenses" }
      ]},
      { label: "Insights", items: [
        { id: "reports",     icon: "chart-bar",      label: "Reports" },
        { id: "budgets",     icon: "scales",         label: "Budgets" }
      ]},
      { label: "Account", items: [
        { id: "notif",       icon: "bell",           label: "Notifications" },
        { id: "settings",    icon: "gear-six",       label: "Settings" }
      ]}
    ],
    employee: [
      { label: "My work", items: [
        { id: "dashboard-emp", icon: "house",        label: "My spend" },
        { id: "new-expense", icon: "plus-circle",    label: "New expense" },
        { id: "my-expenses", icon: "receipt",        label: "My expenses" },
        { id: "my-reimburse",icon: "arrows-clockwise", label: "Reimbursements" }
      ]},
      { label: "Account", items: [
        { id: "my-cards",    icon: "credit-card",    label: "My cards" },
        { id: "notif",       icon: "bell",           label: "Notifications" },
        { id: "help",        icon: "lifebuoy",       label: "Help" }
      ]}
    ]
  };

  const user = FF_DATA.me[role];
  return (
    <aside className="ff-sidebar ff-scroll" style={{overflow:'auto'}}>
      <div className="ff-sidebar__brand">
        <BrandMark variant="mark" size={28}/>
        <BrandMark variant="wordmark" size={20}/>
      </div>
      <div style={{padding:'0 10px 6px'}}>
        <div className="ff-row" style={{
          padding:'8px 10px', borderRadius:8, background:'var(--ff-hover)',
          border:'1px solid var(--ff-border)'
        }}>
          <Avatar initials={user.initials}/>
          <div style={{flex:1, minWidth:0}}>
            <div style={{fontSize:13, fontWeight:600, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{user.name}</div>
            <div style={{fontSize:11, color:'var(--ff-fg-muted)'}}>{user.title}</div>
          </div>
        </div>
      </div>
      {groups[role].map((g, gi) => (
        <div key={gi} className="ff-sidebar__group">
          <div className="ff-sidebar__label">{g.label}</div>
          {g.items.map(it => (
            <a key={it.id}
               className="ff-nav-item"
               aria-current={current === it.id ? "page" : undefined}
               onClick={(e) => { e.preventDefault(); onNavigate(it.id); }}
               href="#">
              <Icon name={it.icon} size={16} style={{color:'inherit'}}/>
              <span>{it.label}</span>
              {it.count !== undefined && <span className="ff-nav-item__count ff-tnum">{it.count}</span>}
            </a>
          ))}
        </div>
      ))}
      <div style={{flex:1}}/>
      <div style={{padding:'12px 16px', borderTop:'1px solid var(--ff-border)', fontSize:11, color:'var(--ff-fg-muted)'}}>
        {FF_DATA.company.name} · {FF_DATA.company.fiscalYear}
      </div>
    </aside>
  );
};

const TopBar = ({ role, theme, onTheme, onRole, onSearch, onNotif }) => {
  return (
    <div className="ff-topbar">
      <div className="ff-search" style={{maxWidth:360, flex:1}}>
        <Icon name="magnifying-glass" size={14}/>
        <input placeholder="Search expenses, vendors, people…"/>
        <span className="ff-kbd">⌘K</span>
      </div>
      <div style={{flex:1}}/>
      <div className="ff-segmented" role="tablist" aria-label="Viewing role">
        {[
          { id: "finance",  label: "Finance Admin" },
          { id: "manager",  label: "Manager" },
          { id: "employee", label: "Employee" }
        ].map(r => (
          <button key={r.id} aria-pressed={role === r.id} onClick={() => onRole(r.id)}>{r.label}</button>
        ))}
      </div>
      <button className="ff-btn ff-btn--ghost ff-btn--icon" onClick={onTheme} aria-label="Toggle theme">
        <Icon name={theme === "dark" ? "sun" : "moon"} size={16}/>
      </button>
      <button className="ff-btn ff-btn--ghost ff-btn--icon" onClick={onNotif} aria-label="Notifications" style={{position:'relative'}}>
        <Icon name="bell" size={16}/>
        <span style={{position:'absolute', top:6, right:6, width:6, height:6, background:'var(--ff-rejected)', borderRadius:999}}/>
      </button>
    </div>
  );
};

/* PageHead — title + actions */
const PageHead = ({ eyebrow, title, sub, actions, children }) => (
  <div className="ff-page__head">
    <div>
      {eyebrow && <div className="ff-eyebrow" style={{marginBottom:8}}>{eyebrow}</div>}
      <h1 className="ff-page__title">{title}</h1>
      {sub && <div className="ff-page__sub">{sub}</div>}
      {children}
    </div>
    <div className="ff-row" style={{gap:8}}>{actions}</div>
  </div>
);

/* KPI tile */
const KpiTile = ({ label, value, delta, trend, spark }) => (
  <div className="ff-kpi">
    <div className="ff-kpi__label">{label}</div>
    <div className="ff-kpi__value">{value}</div>
    <div className="ff-row" style={{justifyContent:'space-between'}}>
      <div className={`ff-kpi__delta ff-kpi__delta--${trend === "up" ? "up" : trend === "down" ? "down" : ""}`}>
        {trend === "up" && <Icon name="trend-up" size={12}/>}
        {trend === "down" && <Icon name="trend-down" size={12}/>}
        {delta}
      </div>
      {spark && <Sparkline data={spark} width={80} height={28}/>}
    </div>
  </div>
);

const Card = ({ title, action, children, padded = true, style = {} }) => (
  <section className="ff-card" style={style}>
    {(title || action) && (
      <header className="ff-card__head">
        <div className="ff-card__title">{title}</div>
        {action}
      </header>
    )}
    <div style={{padding: padded ? 20 : 0}}>{children}</div>
  </section>
);

/* Filter chip row */
const ChipBar = ({ items, value, onChange }) => (
  <div className="ff-row" style={{flexWrap:'wrap'}}>
    {items.map(it => (
      <button key={it.id} className="ff-chip" aria-pressed={value === it.id} onClick={() => onChange(it.id)}>
        {it.label}{it.count !== undefined && <span style={{color:'var(--ff-fg-muted)'}}>· {it.count}</span>}
      </button>
    ))}
  </div>
);

Object.assign(window, { Icon, Money, StatusBadge, Avatar, Sidebar, TopBar, PageHead, KpiTile, Card, ChipBar });
