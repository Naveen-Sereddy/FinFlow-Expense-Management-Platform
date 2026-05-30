/* FinFlow Screens — Reports, Cards, Vendors */

const ReportsHome = () => {
  const d = FF_DATA;
  return (
    <>
      <PageHead
        eyebrow="Reports"
        title="Reports"
        sub="Saved reports and finance close packets"
        actions={<>
          <button className="ff-btn"><Icon name="folder-open" size={14}/> Saved</button>
          <button className="ff-btn ff-btn--primary"><Icon name="plus" size={14}/> Build report</button>
        </>}
      />
      <div className="ff-grid ff-grid--kpis">
        <KpiTile label="YTD Spend" value="$553.0K" delta="+18.4% YoY" trend="up" spark={d.spendOverTime}/>
        <KpiTile label="Burn Rate" value="$108.6K" delta="May avg, monthly" trend="down"/>
        <KpiTile label="Top Vendor" value="AWS" delta="$41.3K · 7.5% of YTD" trend="neutral"/>
        <KpiTile label="Open Reports" value="6" delta="2 due this week" trend="neutral"/>
      </div>
      <div className="ff-grid" style={{gridTemplateColumns:'1fr 1fr', marginTop:16}}>
        <Card title="Cumulative spend — FY26" action={<span className="ff-row" style={{gap:8, fontSize:12, color:'var(--ff-fg-muted)'}}><span style={{width:8, height:8, background:'var(--ff-chart-1)', borderRadius:2}}/>Plan · <span style={{width:8, height:8, background:'var(--ff-chart-2)', borderRadius:2}}/>Actual</span>}>
          <AreaChart data={d.cumulative} height={220} unit="$"/>
        </Card>
        <Card title="Top vendors — YTD" padded={false}>
          <table className="ff-table">
            <thead><tr><th>Vendor</th><th>Category</th><th className="ff-num">Spend</th><th className="ff-num">Δ</th></tr></thead>
            <tbody>
              {d.vendors.slice(0,6).map(v => (
                <tr key={v.id}>
                  <td>{v.name}</td>
                  <td><span className="ff-badge ff-badge--neutral ff-badge--no-dot">{d.categories.find(c=>c.id===v.cat).name}</span></td>
                  <td className="ff-num"><Money value={v.spend}/></td>
                  <td className="ff-num" style={{color: v.change > 0 ? 'var(--ff-rejected)' : v.change < 0 ? 'var(--ff-approved)' : 'var(--ff-fg-muted)'}}>{v.change > 0 ? '+' : ''}{v.change.toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
      <Card title="Saved reports" style={{marginTop:16}} padded={false}>
        <table className="ff-table">
          <thead><tr><th>Name</th><th>Owner</th><th>Schedule</th><th>Last run</th><th></th></tr></thead>
          <tbody>
            {[
              ["Monthly close packet", "Maren O.", "Monthly · 1st", "May 1, 6:00 AM"],
              ["Travel by team",        "Maren O.", "Weekly · Mon",  "May 19, 8:00 AM"],
              ["Software vendors over $1K", "Dev P.", "Quarterly",    "Apr 1, 6:00 AM"],
              ["Marketing spend by campaign", "Iris C.", "Manual",     "May 20, 2:14 PM"]
            ].map(([n,o,s,l], i) => (
              <tr key={i}><td><strong>{n}</strong></td><td>{o}</td><td>{s}</td><td className="ff-tnum" style={{color:'var(--ff-fg-muted)'}}>{l}</td><td><button className="ff-btn ff-btn--sm ff-btn--ghost">Run</button></td></tr>
            ))}
          </tbody>
        </table>
      </Card>
    </>
  );
};

const ReportBuilder = () => (
  <>
    <PageHead eyebrow="Reports · Build" title="Untitled report" sub="Drag dimensions and measures, then save"
      actions={<><button className="ff-btn">Discard</button><button className="ff-btn ff-btn--primary"><Icon name="floppy-disk" size={14}/> Save report</button></>}/>
    <div className="ff-grid" style={{gridTemplateColumns:'260px 1fr 280px', gap:16}}>
      <Card title="Fields">
        <div className="ff-eyebrow" style={{margin:'6px 0'}}>Dimensions</div>
        {["Category","Vendor","Owner","Team","Project","Date"].map(x => <div key={x} className="ff-nav-item" style={{cursor:'grab'}}><Icon name="dots-six-vertical" size={14}/>{x}</div>)}
        <div className="ff-eyebrow" style={{margin:'16px 0 6px'}}>Measures</div>
        {["Amount","Count","Avg per item","Median","% of budget"].map(x => <div key={x} className="ff-nav-item" style={{cursor:'grab'}}><Icon name="dots-six-vertical" size={14}/>{x}</div>)}
      </Card>
      <Card title="Preview">
        <div className="ff-row" style={{gap:8, marginBottom:16, flexWrap:'wrap'}}>
          <span className="ff-chip" aria-pressed="true">Rows: Category</span>
          <span className="ff-chip" aria-pressed="true">Columns: Month</span>
          <span className="ff-chip" aria-pressed="true">Measure: Sum(amount)</span>
          <span className="ff-chip">Filter: Last 90 days</span>
        </div>
        <BarChart data={FF_DATA.categoryBreakdown.map(c=>({cat: FF_DATA.categories.find(x=>x.id===c.cat).name, value:c.value}))} height={260} unit="$"/>
      </Card>
      <Card title="Options">
        <div className="ff-stack" style={{'--ff-stack-gap':'12px'}}>
          <div className="ff-field"><label className="ff-label">Report name</label><input className="ff-input" defaultValue="Spend by category (last 90d)"/></div>
          <div className="ff-field"><label className="ff-label">Schedule</label><select className="ff-select"><option>Weekly · Monday 8am</option><option>Monthly</option><option>Manual</option></select></div>
          <div className="ff-row" style={{justifyContent:'space-between'}}><span>Email me each run</span><span className="ff-switch" role="switch" aria-checked="true"/></div>
          <div className="ff-row" style={{justifyContent:'space-between'}}><span>Share with team</span><span className="ff-switch" role="switch" aria-checked="false"/></div>
        </div>
      </Card>
    </div>
  </>
);

const SavedReport = () => {
  const d = FF_DATA;
  return (
    <>
      <PageHead eyebrow="Report" title="Monthly close packet — April FY26" sub="Generated May 1 · Owned by Maren Okafor"
        actions={<><button className="ff-btn"><Icon name="arrow-clockwise" size={14}/> Re-run</button><button className="ff-btn"><Icon name="share-network" size={14}/> Share</button><button className="ff-btn ff-btn--primary"><Icon name="download-simple" size={14}/> Export PDF</button></>}/>
      <div className="ff-grid ff-grid--kpis">
        <KpiTile label="Total spend" value="$348.0K" delta="+9% vs Mar" trend="up"/>
        <KpiTile label="Reimbursed" value="$42.1K" delta="142 payouts" trend="up"/>
        <KpiTile label="Variance vs plan" value="−2.4%" delta="Under by $8.6K" trend="up"/>
        <KpiTile label="Top category" value="Software" delta="$184.2K · 33%" trend="neutral"/>
      </div>
      <div className="ff-grid" style={{gridTemplateColumns:'1.4fr 1fr', marginTop:16}}>
        <Card title="Spend by week">
          <LineChart data={d.spendOverTime} height={240} unit="$"/>
        </Card>
        <Card title="By category">
          <BarChart data={d.categoryBreakdown.map(c => ({ cat: d.categories.find(x=>x.id===c.cat).name.slice(0,4), value: c.value }))} height={240} unit="$"/>
        </Card>
      </div>
    </>
  );
};

const ExportReport = () => (
  <>
    <PageHead eyebrow="Export" title="Export report" sub="Choose format and recipients"/>
    <div className="ff-grid" style={{gridTemplateColumns:'1fr 1fr', gap:24}}>
      <Card>
        <div className="ff-stack" style={{'--ff-stack-gap':'14px'}}>
          <div className="ff-field"><label className="ff-label">Format</label>
            <div className="ff-segmented" style={{width:'fit-content'}}>
              <button aria-pressed="true">PDF</button><button>CSV</button><button>XLSX</button><button>QBO</button>
            </div>
          </div>
          <div className="ff-field"><label className="ff-label">Date range</label><input className="ff-input ff-tnum" defaultValue="2026-04-01 → 2026-04-30"/></div>
          <div className="ff-field"><label className="ff-label">Include</label>
            <div className="ff-row" style={{gap:16}}>
              <label className="ff-row" style={{gap:6, fontSize:13}}><input type="checkbox" defaultChecked/> Charts</label>
              <label className="ff-row" style={{gap:6, fontSize:13}}><input type="checkbox" defaultChecked/> Line-items</label>
              <label className="ff-row" style={{gap:6, fontSize:13}}><input type="checkbox"/> Receipt images</label>
            </div>
          </div>
          <div className="ff-field"><label className="ff-label">Email to</label><input className="ff-input" defaultValue="maren@arcadialabs.co, board@arcadialabs.co"/></div>
        </div>
      </Card>
      <Card title="Preview">
        <div style={{aspectRatio:'8.5/11', background:'#fff', border:'1px solid var(--ff-border)', borderRadius:6, boxShadow:'var(--ff-shadow-md)', padding:'20px 18px', color:'#15131A', display:'flex', flexDirection:'column', gap:8, fontSize:11}}>
          <div style={{fontFamily:'var(--ff-font-sans)', fontWeight:600, fontSize:18, letterSpacing:'-0.02em'}}>FinFlow · Monthly Close — April FY26</div>
          <div style={{color:'#888'}}>Arcadia Labs · Generated May 1, 2026</div>
          <div style={{height:60, background:'var(--ff-chart-1)', opacity:0.2, borderRadius:4, marginTop:8}}/>
          <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:6}}>
            {["$348K","$42K","−2.4%","6/6"].map((x,i)=>(
              <div key={i} style={{padding:'6px 8px', background:'#F7F4EE', borderRadius:3}}>{x}</div>
            ))}
          </div>
          <div style={{flex:1}}/>
          <div style={{textAlign:'right', color:'#888'}}>Page 1 of 4</div>
        </div>
      </Card>
    </div>
  </>
);

const CardsList = () => {
  const d = FF_DATA;
  return (
    <>
      <PageHead eyebrow="Cards" title="Corporate cards" sub={`${d.cards.length} cards · ${d.cards.filter(c=>c.status==='active').length} active`}
        actions={<><button className="ff-btn"><Icon name="download-simple" size={14}/> Statement</button><button className="ff-btn ff-btn--primary"><Icon name="plus" size={14}/> Issue card</button></>}/>
      <div className="ff-grid" style={{gridTemplateColumns:'repeat(3, 1fr)', gap:16}}>
        {d.cards.map(c => (
          <div key={c.id} className="ff-card" style={{overflow:'hidden'}}>
            <div style={{
              padding:'20px', color:'#FBF5E8',
              background: c.status === 'frozen'
                ? 'linear-gradient(135deg, oklch(0.40 0.02 340), oklch(0.30 0.02 340))'
                : 'linear-gradient(135deg, var(--ff-plum-700), var(--ff-plum-900))',
              display:'flex', flexDirection:'column', gap:12, position:'relative'
            }}>
              <div className="ff-row" style={{justifyContent:'space-between'}}>
                <div style={{fontSize:10, letterSpacing:'0.12em', textTransform:'uppercase', opacity:0.7}}>{c.type === "virtual" ? "Virtual" : "Physical"}</div>
                <BrandMark variant="mark" size={22} theme="dark"/>
              </div>
              <div className="ff-mono" style={{fontSize:15, letterSpacing:'0.1em'}}>•••• •••• •••• {c.last4}</div>
              <div className="ff-row" style={{justifyContent:'space-between', alignItems:'flex-end'}}>
                <div>
                  <div style={{fontSize:9, opacity:0.7, textTransform:'uppercase'}}>Holder</div>
                  <div style={{fontSize:12}}>{c.holder}</div>
                </div>
                {c.status === 'frozen' && <span className="ff-badge ff-badge--no-dot" style={{background:'rgba(255,255,255,0.15)', color:'#FBF5E8'}}><Icon name="snowflake" size={11}/> Frozen</span>}
              </div>
            </div>
            <div style={{padding:16}}>
              <BudgetBar label="Used this month" budget={c.limit/1000} spent={c.spent/1000}/>
              <div className="ff-row" style={{marginTop:14, gap:8}}>
                <button className="ff-btn ff-btn--sm" style={{flex:1}}>View</button>
                <button className="ff-btn ff-btn--sm">{c.status === 'frozen' ? 'Unfreeze' : 'Freeze'}</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

const CardDetail = () => {
  const d = FF_DATA;
  const c = d.cards[2]; // Luna Park's card
  return (
    <>
      <PageHead eyebrow={`Card · ${c.type}`} title={`•••• ${c.last4}`} sub={`${c.holder} · issued Jan 2024`}
        actions={<><button className="ff-btn"><Icon name="snowflake" size={14}/> Freeze</button><button className="ff-btn"><Icon name="pencil" size={14}/> Edit limits</button><button className="ff-btn ff-btn--danger"><Icon name="trash" size={14}/> Cancel card</button></>}/>
      <div className="ff-grid" style={{gridTemplateColumns:'1fr 1fr', gap:16}}>
        <Card title="This card">
          <div style={{padding:'24px', borderRadius:12, background:'linear-gradient(135deg, var(--ff-plum-700), var(--ff-plum-900))', color:'#FBF5E8'}}>
            <div className="ff-row" style={{justifyContent:'space-between'}}><div style={{fontSize:11, letterSpacing:'0.12em', textTransform:'uppercase', opacity:0.7}}>Physical</div><BrandMark variant="mark" size={28} theme="dark"/></div>
            <div className="ff-mono" style={{fontSize:20, letterSpacing:'0.12em', margin:'16px 0'}}>•••• •••• •••• {c.last4}</div>
            <div className="ff-row" style={{justifyContent:'space-between'}}>
              <div><div style={{fontSize:10, opacity:0.7, textTransform:'uppercase'}}>Holder</div><div>{c.holder}</div></div>
              <div><div style={{fontSize:10, opacity:0.7, textTransform:'uppercase'}}>Exp</div><div className="ff-mono">03/27</div></div>
              <div><div style={{fontSize:10, opacity:0.7, textTransform:'uppercase'}}>CVV</div><div className="ff-mono">•••</div></div>
            </div>
          </div>
          <div style={{marginTop:18}}><BudgetBar label="Used this month" budget={c.limit/1000} spent={c.spent/1000}/></div>
        </Card>
        <Card title="Settings">
          <div className="ff-stack" style={{'--ff-stack-gap':'10px'}}>
            <SettingRow label="Monthly limit" value="$10,000"/>
            <SettingRow label="Per-transaction" value="$2,500"/>
            <SettingRow label="Allowed categories" value="Travel, Meals"/>
            <SettingRow label="International" value="Allowed"/>
            <SettingRow label="ATM withdrawals" value="Disabled"/>
            <SettingRow label="Cardholder PIN" value="Set"/>
          </div>
        </Card>
      </div>
      <Card title="Recent transactions" style={{marginTop:16}} padded={false}>
        <table className="ff-table">
          <thead><tr><th>Date</th><th>Merchant</th><th>Memo</th><th className="ff-num">Amount</th><th>Status</th></tr></thead>
          <tbody>
            {d.expenses.filter(e => e.cardLast4 === c.last4).map(e => (
              <tr key={e.id}>
                <td className="ff-tnum" style={{color:'var(--ff-fg-muted)'}}>{e.date}</td>
                <td><strong>{e.merchant}</strong></td>
                <td style={{color:'var(--ff-fg-muted)'}}>{e.memo}</td>
                <td className="ff-num"><Money value={e.amount}/></td>
                <td><StatusBadge status={e.status}/></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </>
  );
};

const SettingRow = ({ label, value }) => (
  <div className="ff-row" style={{justifyContent:'space-between', fontSize:13, padding:'8px 0', borderBottom:'1px solid var(--ff-border)'}}>
    <span style={{color:'var(--ff-fg-muted)'}}>{label}</span>
    <span style={{fontWeight:500}}>{value}</span>
  </div>
);

const IssueCard = () => (
  <>
    <PageHead eyebrow="Cards" title="Issue a new card" sub="Virtual cards are ready instantly. Physical cards arrive in 5–7 days."/>
    <div className="ff-grid" style={{gridTemplateColumns:'1.4fr 1fr', gap:24}}>
      <Card>
        <div className="ff-stack" style={{'--ff-stack-gap':'14px'}}>
          <div className="ff-field"><label className="ff-label">Card type</label>
            <div className="ff-segmented"><button aria-pressed="true">Virtual</button><button>Physical</button></div>
          </div>
          <div className="ff-field"><label className="ff-label">Cardholder</label>
            <select className="ff-select"><option>Iris Chen — Marketing</option><option>Dev Patel — Eng</option><option>Vendor card (no holder)</option></select>
          </div>
          <div className="ff-grid ff-grid--2">
            <div className="ff-field"><label className="ff-label">Monthly limit</label><input className="ff-input ff-tnum" defaultValue="5,000"/></div>
            <div className="ff-field"><label className="ff-label">Per-transaction</label><input className="ff-input ff-tnum" defaultValue="2,500"/></div>
          </div>
          <div className="ff-field"><label className="ff-label">Allowed categories</label>
            <div className="ff-row" style={{flexWrap:'wrap'}}>
              {FF_DATA.categories.map((c, i) => <span key={c.id} className="ff-chip" aria-pressed={i < 3}>{c.name}</span>)}
            </div>
          </div>
          <div className="ff-row" style={{justifyContent:'space-between'}}>
            <div><div style={{fontSize:13, fontWeight:500}}>Notify on each charge</div><div style={{fontSize:12, color:'var(--ff-fg-muted)'}}>Email + Slack</div></div>
            <span className="ff-switch" role="switch" aria-checked="true"/>
          </div>
        </div>
      </Card>
      <Card title="Preview">
        <div style={{padding:'24px', borderRadius:12, background:'linear-gradient(135deg, var(--ff-plum-700), var(--ff-plum-900))', color:'#FBF5E8'}}>
          <div className="ff-row" style={{justifyContent:'space-between'}}><div style={{fontSize:10, letterSpacing:'0.12em', textTransform:'uppercase', opacity:0.7}}>Virtual · New</div><BrandMark variant="mark" size={26} theme="dark"/></div>
          <div className="ff-mono" style={{fontSize:18, letterSpacing:'0.12em', margin:'18px 0'}}>•••• •••• •••• ••••</div>
          <div className="ff-row" style={{justifyContent:'space-between'}}>
            <div><div style={{fontSize:10, opacity:0.7, textTransform:'uppercase'}}>Holder</div><div style={{fontSize:13}}>Iris Chen</div></div>
            <div><div style={{fontSize:10, opacity:0.7, textTransform:'uppercase'}}>Limit</div><div className="ff-tnum" style={{fontSize:13}}>$5,000</div></div>
          </div>
        </div>
        <button className="ff-btn ff-btn--primary ff-btn--lg" style={{width:'100%', marginTop:16}}>Issue card</button>
      </Card>
    </div>
  </>
);

const FreezeCardModal = ({ onClose }) => (
  <div className="ff-modal-backdrop" onClick={onClose}>
    <div className="ff-modal" onClick={e => e.stopPropagation()}>
      <div className="ff-modal__head">
        <div className="ff-modal__title">Freeze card · •••• 4112</div>
        <div className="ff-modal__sub">Luna Park will not be able to charge this card until unfrozen.</div>
      </div>
      <div className="ff-modal__body">
        <div className="ff-field"><label className="ff-label">Reason (optional)</label><textarea className="ff-textarea" placeholder="e.g. Suspicious activity, off-policy charge…"/></div>
        <div className="ff-row" style={{marginTop:12, gap:16}}>
          <label className="ff-row" style={{gap:6, fontSize:13}}><input type="checkbox"/> Notify cardholder</label>
          <label className="ff-row" style={{gap:6, fontSize:13}}><input type="checkbox" defaultChecked/> Add to audit log</label>
        </div>
      </div>
      <div className="ff-modal__foot">
        <button className="ff-btn" onClick={onClose}>Cancel</button>
        <button className="ff-btn ff-btn--primary">Freeze card</button>
      </div>
    </div>
  </div>
);

const VendorsList = () => {
  const d = FF_DATA;
  return (
    <>
      <PageHead eyebrow="Vendors" title="Vendor directory" sub={`${d.vendors.length} vendors active YTD`}
        actions={<><button className="ff-btn"><Icon name="upload-simple" size={14}/> Import W-9s</button><button className="ff-btn ff-btn--primary"><Icon name="plus" size={14}/> Add vendor</button></>}/>
      <Card padded={false}>
        <table className="ff-table">
          <thead><tr><th>Vendor</th><th>Category</th><th className="ff-num">YTD spend</th><th className="ff-num">Δ vs Q1</th><th>Top owner</th><th>Status</th></tr></thead>
          <tbody>
            {d.vendors.map(v => (
              <tr key={v.id}>
                <td><div style={{fontWeight:500}}>{v.name}</div><div style={{fontSize:11, color:'var(--ff-fg-muted)'}}>vendor-{v.id.slice(1).padStart(4, '0')}@arcadialabs.co</div></td>
                <td><span className="ff-badge ff-badge--neutral ff-badge--no-dot">{d.categories.find(c=>c.id===v.cat).name}</span></td>
                <td className="ff-num"><Money value={v.spend}/></td>
                <td className="ff-num" style={{color: v.change > 0 ? 'var(--ff-rejected)' : v.change < 0 ? 'var(--ff-approved)' : 'var(--ff-fg-muted)'}}>{v.change > 0 ? '+' : ''}{v.change.toFixed(1)}%</td>
                <td>Maren O.</td>
                <td><span className="ff-badge ff-badge--approved ff-badge--no-dot"><Icon name="check" size={12}/> W-9 on file</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </>
  );
};

const VendorDetail = () => {
  const d = FF_DATA;
  const v = d.vendors[1];
  // Build a vendor-specific spend over time
  const vendorTrend = d.spendOverTime.map((p, i) => ({ w: p.w, v: Math.round((p.v * 0.7 + i * 1.4) * 10) / 10 }));
  return (
    <>
      <PageHead eyebrow="Vendor" title={v.name} sub="EIN 47-2210331 · Tax type C-Corp · Net-30"
        actions={<><button className="ff-btn"><Icon name="paperclip" size={14}/> Contracts</button><button className="ff-btn"><Icon name="envelope" size={14}/> Message</button><button className="ff-btn ff-btn--primary">Pay vendor</button></>}/>
      <div className="ff-grid ff-grid--kpis">
        <KpiTile label="YTD Spend" value={`$${(v.spend/1000).toFixed(1)}K`} delta={`${v.change>0?'+':''}${v.change}% vs Q1`} trend={v.change > 0 ? "down" : "up"}/>
        <KpiTile label="Transactions" value="38" delta="3 this week" trend="neutral"/>
        <KpiTile label="Avg invoice" value="$1,086" delta="−4% vs Q1" trend="up"/>
        <KpiTile label="Open invoices" value="2" delta="Both within 30d" trend="neutral"/>
      </div>
      <Card title="Spend over time" style={{marginTop:16}}>
        <LineChart data={vendorTrend} height={220} unit="$"/>
      </Card>
      <Card title="Recent transactions" style={{marginTop:16}} padded={false}>
        <table className="ff-table">
          <thead><tr><th>Date</th><th>Memo</th><th>Owner</th><th className="ff-num">Amount</th><th>Status</th></tr></thead>
          <tbody>
            {[
              ["2026-05-20","Monthly infra","Dev Patel",3204.18,"approved"],
              ["2026-04-22","Monthly infra","Dev Patel",3018.40,"approved"],
              ["2026-03-21","Monthly infra","Dev Patel",2964.22,"approved"]
            ].map(([dt,m,w,a,s], i) => (
              <tr key={i}><td className="ff-tnum" style={{color:'var(--ff-fg-muted)'}}>{dt}</td><td>{m}</td><td>{w}</td><td className="ff-num"><Money value={a}/></td><td><StatusBadge status={s}/></td></tr>
            ))}
          </tbody>
        </table>
      </Card>
    </>
  );
};

Object.assign(window, { ReportsHome, ReportBuilder, SavedReport, ExportReport, CardsList, CardDetail, IssueCard, FreezeCardModal, VendorsList, VendorDetail });
