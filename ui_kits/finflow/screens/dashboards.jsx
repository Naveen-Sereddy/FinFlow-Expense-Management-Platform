/* FinFlow Screens — Dashboards (Finance Admin, Manager, Employee) */

const FinanceDashboard = () => {
  const d = FF_DATA;
  const [compact, setCompact] = React.useState(false);
  return (
    <>
      <PageHead
        eyebrow="Workspace · Finance Admin"
        title="Good morning, Marcus."
        sub="Spend across Reyonal · Fiscal week 22, FY 2026"
        actions={<>
          <RefreshButton/>
          <button className="ff-btn"><Icon name="download-simple" size={14}/> Export</button>
          <button className="ff-btn ff-btn--primary" onClick={()=>ffGo('report-build')}><Icon name="plus" size={14}/> New report</button>
        </>}
      />

      {/* Hero row — one dominant number, not four equal tiles. The mind
          reads "what's the one thing that matters today" faster than it
          audits a symmetric grid. */}
      <div className="ff-grid" style={{gridTemplateColumns:'1.7fr 1fr 1fr 1fr'}}>
        <KpiTile {...d.kpis.finance[0]} spark={d.spendOverTime} hero/>
        {d.kpis.finance.slice(1).map((k, i) => <KpiTile key={i} {...k}/>)}
      </div>

      {/* Chart split — wide trend line vs. a stacked column of two smaller,
          differently-shaped blocks (budget bars + category legend), not a
          second matching chart card. Uneven on purpose. */}
      <div className="ff-grid" style={{gridTemplateColumns:'1.8fr 1fr', marginTop:20, alignItems:'start'}}>
        <Card title="Spend over time" action={
          <div className="ff-segmented">
            <button>4W</button><button aria-pressed="true">12W</button><button>YTD</button>
          </div>
        }>
          <LineChart data={d.spendOverTime} height={260} unit="$" label="Weekly spend over the last 12 weeks"/>
          <div style={{display:'flex', gap:24, marginTop:12, fontSize:12, color:'var(--ff-fg-muted)'}}>
            <span><span style={{display:'inline-block', width:10, height:10, background:'var(--ff-chart-1)', borderRadius:2, marginRight:6}}/>Spend (K)</span>
            <span className="ff-tnum">Peak · $67.2K · W22</span>
            <span className="ff-tnum">Avg · $51.4K / wk</span>
          </div>
        </Card>

        <div className="ff-stack" style={{'--ff-stack-gap':'20px'}}>
          <Card title="Budget vs. spent" action={<span style={{fontSize:12, color:'var(--ff-fg-muted)'}}>42% elapsed</span>}>
            <div className="ff-stack" style={{'--ff-stack-gap':'14px'}}>
              {d.budgets.map((b, i) => <BudgetBar key={i} {...b}/>)}
            </div>
          </Card>

          {/* Borderless — a legend is a list, not a card. */}
          <div>
            <div className="ff-row" style={{justifyContent:'space-between', marginBottom:10}}>
              <span style={{fontSize:13, fontWeight:600}}>Spend by category</span>
              <span style={{fontSize:11, color:'var(--ff-fg-muted)'}}>YTD</span>
            </div>
            <div className="ff-stack" style={{'--ff-stack-gap':'8px'}}>
              {d.categoryBreakdown.map((c, i) => {
                const cat = d.categories.find(x => x.id === c.cat);
                const total = d.categoryBreakdown.reduce((s,x) => s+x.value, 0);
                return (
                  <div key={i} style={{display:'flex', justifyContent:'space-between', alignItems:'center', fontSize:12.5}}>
                    <span className="ff-row" style={{gap:8}}>
                      <span style={{width:8, height:8, background:cat.color, borderRadius:999}}/>
                      {cat.name}
                    </span>
                    <span className="ff-tnum" style={{color:'var(--ff-fg-muted)'}}>${c.value.toFixed(1)}K · {(c.value/total*100).toFixed(0)}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Data regions — the table is the surface, no card wrapper around it. */}
      <div className="ff-row" style={{justifyContent:'space-between', alignItems:'baseline', marginTop:32, marginBottom:10}}>
        <span style={{fontSize:15, fontWeight:600}}>Pending approvals</span>
        <a href="#" className="ff-row" style={{fontSize:12, gap:4}} onClick={(e)=>{e.preventDefault(); ffGo('approvals');}}>View all <Icon name="arrow-right" size={12}/></a>
      </div>
      <table className="ff-table">
        <thead>
          <tr><th>ID</th><th>Merchant</th><th>Owner</th><th>Submitted</th><th className="ff-num">Amount</th><th>Status</th></tr>
        </thead>
        <tbody>
          {d.expenses.filter(e => e.status === "pending" || e.status === "flagged").slice(0, 6).map(e => (
            <tr key={e.id}>
              <td><span className="ff-mono" style={{fontSize:12}}>{e.id}</span></td>
              <td><span className="ff-row" style={{gap:8}}><MerchantIcon name={e.merchant} size={14}/> {e.merchant}</span></td>
              <td><span className="ff-row" style={{gap:6}}><Avatar initials={e.who.split(' ').map(x=>x[0]).join('').slice(0,2)} name={e.who}/> {e.who}</span></td>
              <td style={{color:'var(--ff-fg-muted)', fontSize:12}}>{fmtDate(e.date)}</td>
              <td className="ff-num"><Money value={e.amount}/></td>
              <td><StatusBadge status={e.status}/></td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="ff-row" style={{justifyContent:'space-between', alignItems:'baseline', marginTop:32, marginBottom:10}}>
        <span style={{fontSize:15, fontWeight:600}}>Recent activity</span>
        <DensityToggle compact={compact} onToggle={()=>setCompact(c=>!c)}/>
      </div>
      <table className={`ff-table ${compact ? 'ff-table--compact' : ''}`}>
        <thead>
          <tr><th>Time</th><th>Actor</th><th>Action</th><th>Target</th></tr>
        </thead>
        <tbody>
          {d.auditEntries.slice(0, 6).map((a, i) => (
            <tr key={i}>
              <td style={{color:'var(--ff-fg-muted)', fontSize:12}} className="ff-tnum">{a.ts}</td>
              <td>{a.actor}</td>
              <td><span className="ff-badge ff-badge--neutral ff-badge--no-dot">{a.action}</span></td>
              <td style={{color:'var(--ff-fg-muted)'}}>{a.target}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

const ManagerDashboard = () => {
  const d = FF_DATA;
  const pendingMine = d.expenses.filter(e => e.status === "pending" || e.status === "flagged");
  return (
    <>
      <PageHead
        eyebrow="Workspace · Manager"
        title={`${d.me.manager.name.split(' ')[0]}'s team — Sales`}
        sub="8 direct reports · $48.2K spent this month · 82% of monthly budget"
        actions={<>
          <RefreshButton/>
          <button className="ff-btn"><Icon name="chats" size={14}/> Message team</button>
          <button className="ff-btn ff-btn--primary" onClick={()=>ffGo('approvals')}><Icon name="check-square" size={14}/> Review {pendingMine.length} approvals</button>
        </>}
      />

      {/* Manager reads differently from Finance Admin — a compact inline
          stat strip, not four cards, because the numbers here are context
          for the queue below, not the headline. */}
      <StatRow items={d.kpis.manager} style={{paddingBottom:20, marginBottom:20, borderBottom:'1px solid var(--ff-border)'}}/>

      {/* Queue-first, not chart-first — the approvals list is the wide
          dominant column since that's what a manager actually acts on;
          the chart is supporting context, narrower. Flips FinanceDashboard's
          chart-left/detail-right split on purpose. */}
      <div className="ff-grid" style={{gridTemplateColumns:'1.6fr 1fr'}}>
        <Card title="Approvals queue" action={<a href="#" style={{fontSize:12}} onClick={(e)=>{e.preventDefault(); ffGo('approvals');}}>Open queue</a>} padded={false}>
          <div className="ff-stack" style={{'--ff-stack-gap':'0', padding:'6px 0'}}>
            {pendingMine.slice(0, 5).map(e => (
              <div key={e.id} style={{padding:'12px 20px', borderBottom:'1px solid var(--ff-border)', display:'flex', gap:12, alignItems:'center'}}>
                <Avatar initials={e.who.split(' ').map(x=>x[0]).join('').slice(0,2)} name={e.who}/>
                <div style={{flex:1, minWidth:0}}>
                  <div className="ff-row" style={{gap:6, fontSize:13, fontWeight:500}}><MerchantIcon name={e.merchant} size={13}/> {e.merchant}</div>
                  <div style={{fontSize:11, color:'var(--ff-fg-muted)'}}>{e.who} · {e.id}</div>
                </div>
                <div style={{textAlign:'right'}}>
                  <div className="ff-tnum" style={{fontWeight:500}}><Money value={e.amount}/></div>
                  <StatusBadge status={e.status}/>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Team spend by member" action={<span style={{fontSize:12, color:'var(--ff-fg-muted)'}}>This month</span>}>
          <BarChart data={d.employees.map(e => ({ cat: e.initials, value: e.spend/1000 }))} height={230} unit="$" colorByIndex={false} color="var(--ff-chart-1)" label="Team spend by member this month"/>
        </Card>
      </div>

      <div className="ff-grid ff-grid--3" style={{marginTop:16}}>
        <Card title="Quick approve" action={<Icon name="lightning" size={14}/>}>
          <p style={{color:'var(--ff-fg-muted)', fontSize:13, marginTop:0}}>Approve all pending under $100 with no policy flags.</p>
          {(() => {
            const quick = pendingMine.filter(e => e.amount < 100 && e.policy === "ok");
            const quickTotal = quick.reduce((s, e) => s + e.amount, 0);
            return (
              <div className="ff-row" style={{marginTop:12, gap:8}}>
                <button className="ff-btn ff-btn--primary ff-btn--sm" onClick={()=>ffGo('approvals')}>Approve {quick.length} item{quick.length === 1 ? '' : 's'} · {new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(quickTotal)}</button>
                <button className="ff-btn ff-btn--sm" onClick={()=>ffGo('approvals')}>Review first</button>
              </div>
            );
          })()}
        </Card>
        <Card title="Budget snapshot">
          <BudgetBar label="Team — May" budget={60} spent={48.2}/>
          <div style={{height:12}}/>
          <BudgetBar label="Travel — May" budget={28} spent={26.4}/>
        </Card>
        <Card title="Policy reminders">
          <ul style={{margin:0, paddingLeft:18, fontSize:13, color:'var(--ff-fg-muted)', lineHeight:1.7}}>
            <li>Hotel cap for domestic stays is <strong>$300/night</strong></li>
            <li>Per diem meals: <strong>$75/day</strong></li>
            <li>Anything over $500 in advertising → CMO sign-off</li>
          </ul>
        </Card>
      </div>
    </>
  );
};

const EmployeeDashboard = () => {
  const d = FF_DATA;
  const mine = d.expenses.filter(e => e.who === "Corey Anderson");
  const [compact, setCompact] = React.useState(false);
  return (
    <>
      <PageHead
        eyebrow="My spend"
        title={`Hi, ${d.me.employee.name.split(' ')[0]}.`}
        sub="Your expenses and reimbursements this month"
        actions={<>
          <RefreshButton/>
          <button className="ff-btn" onClick={()=>ffGo('ocr')}><Icon name="upload-simple" size={14}/> Upload receipt</button>
          <button className="ff-btn ff-btn--primary" onClick={()=>ffGo('new-expense')}><Icon name="plus" size={14}/> New expense</button>
        </>}
      />

      {/* Card-led, not number-led or queue-led — the third distinct
          composition of the three dashboards. An employee's mental model
          of "my spend" starts with the physical card, not a KPI grid. */}
      <div className="ff-grid" style={{gridTemplateColumns:'1fr 1.3fr'}}>
        <div>
          <div style={{
            padding:'22px', borderRadius:14, maxWidth:360, aspectRatio:'1.586 / 1',
            background:'linear-gradient(135deg, var(--ff-blue-700), var(--ff-blue-900))',
            color:'#fff', display:'flex', flexDirection:'column', justifyContent:'space-between', gap:16, position:'relative'
          }}>
            <div style={{fontSize:11, letterSpacing:'0.1em', textTransform:'uppercase', opacity:0.75}}>FinFlow · Virtual</div>
            <div className="ff-mono" style={{fontSize:19, letterSpacing:'0.12em'}}>•••• •••• •••• 9032</div>
            <div className="ff-row" style={{justifyContent:'space-between'}}>
              <div>
                <div style={{fontSize:10, opacity:0.7, textTransform:'uppercase'}}>Holder</div>
                <div style={{fontSize:13}}>Corey Anderson</div>
              </div>
              <div>
                <div style={{fontSize:10, opacity:0.7, textTransform:'uppercase'}}>Exp</div>
                <div className="ff-mono" style={{fontSize:13}}>11/28</div>
              </div>
            </div>
            <div style={{position:'absolute', top:20, right:20}}>
              <BrandMark variant="mark" size={28} theme="dark"/>
            </div>
          </div>
          <div style={{marginTop:14}}>
            <BudgetBar label="Card used this month" budget={5} spent={2.69}/>
          </div>
        </div>

        {/* Compact stat rows, not KPI cards — supporting context beside
            the card, not competing tiles. */}
        <div className="ff-stack" style={{'--ff-stack-gap':'0'}}>
          {d.kpis.employee.map((k, i) => (
            <div key={i} className="ff-row" style={{justifyContent:'space-between', padding:'12px 0', borderBottom: i < d.kpis.employee.length-1 ? '1px solid var(--ff-border)' : 0}}>
              <span style={{fontSize:13, color:'var(--ff-fg-muted)'}}>{k.label}</span>
              <span className="ff-row" style={{gap:8}}>
                <span style={{fontSize:16, fontWeight:600}} className="ff-tnum">{k.value}</span>
                <span className={`ff-kpi__delta ff-kpi__delta--${k.trend}`} style={{fontSize:11}}>{k.delta}</span>
              </span>
            </div>
          ))}
          <div style={{marginTop:16, padding:'14px 16px', background:'var(--ff-card-2)', border:'1px solid var(--ff-border)', borderRadius:'var(--ff-radius-md)'}}>
            <div className="ff-row" style={{justifyContent:'space-between', marginBottom:6}}>
              <span style={{fontSize:12, color:'var(--ff-fg-muted)'}}>Reimbursement</span>
              <StatusBadge status="scheduled"/>
            </div>
            <div className="ff-tnum" style={{fontWeight:700, fontSize:24, letterSpacing:'-0.02em'}}>$320.40</div>
            <div style={{color:'var(--ff-fg-muted)', fontSize:12, marginTop:4}}>RB-104 · Direct deposit · arrives May 30</div>
          </div>
        </div>
      </div>

      <div className="ff-row" style={{justifyContent:'space-between', alignItems:'baseline', marginTop:32, marginBottom:10}}>
        <span style={{fontSize:15, fontWeight:600}}>My recent expenses</span>
        <div className="ff-row" style={{gap:12}}>
          <DensityToggle compact={compact} onToggle={()=>setCompact(c=>!c)}/>
          <a href="#" style={{fontSize:12}} onClick={(e)=>{e.preventDefault(); ffGo('expenses');}}>View all</a>
        </div>
      </div>
      <table className={`ff-table ${compact ? 'ff-table--compact' : ''}`}>
        <thead><tr><th>Date</th><th>Merchant</th><th className="ff-num">Amount</th><th>Status</th></tr></thead>
        <tbody>
          {mine.map(e => (
            <tr key={e.id}>
              <td style={{color:'var(--ff-fg-muted)'}} className="ff-tnum">{e.date.slice(5)}</td>
              <td><span className="ff-row" style={{gap:8}}><MerchantIcon name={e.merchant} size={14}/> {e.merchant}</span><div style={{fontSize:11, color:'var(--ff-fg-muted)'}}>{e.memo}</div></td>
              <td className="ff-num"><Money value={e.amount}/></td>
              <td><StatusBadge status={e.status}/></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

Object.assign(window, { FinanceDashboard, ManagerDashboard, EmployeeDashboard });
