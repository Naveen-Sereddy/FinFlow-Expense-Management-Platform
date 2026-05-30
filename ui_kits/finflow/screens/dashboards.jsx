/* FinFlow Screens — Dashboards (Finance Admin, Manager, Employee) */

const FinanceDashboard = () => {
  const d = FF_DATA;
  return (
    <>
      <PageHead
        eyebrow="Workspace · Finance Admin"
        title="Good morning, Maren."
        sub="Spend across Arcadia Labs · Fiscal week 22, FY 2026"
        actions={<>
          <button className="ff-btn"><Icon name="download-simple" size={14}/> Export</button>
          <button className="ff-btn ff-btn--primary"><Icon name="plus" size={14}/> New report</button>
        </>}
      />

      <div className="ff-grid ff-grid--kpis">
        {d.kpis.finance.map((k, i) => (
          <KpiTile key={i} {...k} spark={i < 2 ? d.spendOverTime : null}/>
        ))}
      </div>

      <div className="ff-grid" style={{gridTemplateColumns:'2fr 1fr', marginTop:16}}>
        <Card title="Spend over time" action={
          <div className="ff-segmented">
            <button>4W</button><button aria-pressed="true">12W</button><button>YTD</button>
          </div>
        }>
          <LineChart data={d.spendOverTime} height={260} unit="$" />
          <div style={{display:'flex', gap:24, marginTop:12, fontSize:12, color:'var(--ff-fg-muted)'}}>
            <span><span style={{display:'inline-block', width:10, height:10, background:'var(--ff-chart-1)', borderRadius:2, marginRight:6}}/>Spend (K)</span>
            <span className="ff-tnum">Peak · $67.2K · W22</span>
            <span className="ff-tnum">Avg · $51.4K / wk</span>
          </div>
        </Card>

        <Card title="Budget vs. spent" action={<span style={{fontSize:12, color:'var(--ff-fg-muted)'}}>FY26 · 42% elapsed</span>}>
          <div className="ff-stack" style={{'--ff-stack-gap':'14px'}}>
            {d.budgets.map((b, i) => <BudgetBar key={i} {...b}/>)}
          </div>
        </Card>
      </div>

      <div className="ff-grid" style={{gridTemplateColumns:'1.4fr 1fr', marginTop:16}}>
        <Card title="Pending approvals" action={<a href="#" className="ff-row" style={{fontSize:12, gap:4}}>View all <Icon name="arrow-right" size={12}/></a>} padded={false}>
          <table className="ff-table">
            <thead>
              <tr><th>ID</th><th>Merchant</th><th>Owner</th><th>Submitted</th><th className="ff-num">Amount</th><th>Status</th></tr>
            </thead>
            <tbody>
              {d.expenses.filter(e => e.status === "pending" || e.status === "flagged").slice(0, 6).map(e => (
                <tr key={e.id}>
                  <td><span className="ff-mono" style={{fontSize:12}}>{e.id}</span></td>
                  <td>{e.merchant}</td>
                  <td><span className="ff-row" style={{gap:6}}><Avatar initials={e.who.split(' ').map(x=>x[0]).join('').slice(0,2)} /> {e.who}</span></td>
                  <td style={{color:'var(--ff-fg-muted)', fontSize:12}}>{e.date}</td>
                  <td className="ff-num"><Money value={e.amount}/></td>
                  <td><StatusBadge status={e.status}/></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card title="Spend by category" action={<span style={{fontSize:12, color:'var(--ff-fg-muted)'}}>YTD</span>}>
          <div style={{display:'grid', gridTemplateColumns:'auto 1fr', gap:24, alignItems:'center'}}>
            <Donut data={d.categoryBreakdown.map(c => ({ label: d.categories.find(x=>x.id===c.cat).name, value: c.value }))} size={170} thickness={22}/>
            <div className="ff-stack" style={{'--ff-stack-gap':'8px'}}>
              {d.categoryBreakdown.map((c, i) => {
                const cat = d.categories.find(x => x.id === c.cat);
                const total = d.categoryBreakdown.reduce((s,x) => s+x.value, 0);
                return (
                  <div key={i} style={{display:'flex', justifyContent:'space-between', alignItems:'center', fontSize:13}}>
                    <span className="ff-row" style={{gap:8}}>
                      <span style={{width:10, height:10, background:`var(--ff-chart-${i+1})`, borderRadius:2}}/>
                      {cat.name}
                    </span>
                    <span className="ff-tnum" style={{color:'var(--ff-fg-muted)'}}>${c.value.toFixed(1)}K · {(c.value/total*100).toFixed(0)}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>
      </div>

      <Card title="Recent activity" style={{marginTop:16}} padded={false} action={<button className="ff-btn ff-btn--sm ff-btn--ghost"><Icon name="funnel" size={12}/> Filter</button>}>
        <table className="ff-table ff-table--compact">
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
      </Card>
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
          <button className="ff-btn"><Icon name="chats" size={14}/> Message team</button>
          <button className="ff-btn ff-btn--primary"><Icon name="check-square" size={14}/> Review 8 approvals</button>
        </>}
      />

      <div className="ff-grid ff-grid--kpis">
        {d.kpis.manager.map((k, i) => <KpiTile key={i} {...k} spark={i === 0 ? d.spendOverTime : null}/>)}
      </div>

      <div className="ff-grid" style={{gridTemplateColumns:'2fr 1fr', marginTop:16}}>
        <Card title="Team spend by member" action={<span style={{fontSize:12, color:'var(--ff-fg-muted)'}}>This month</span>}>
          <BarChart data={d.employees.map(e => ({ cat: e.initials, value: e.spend/1000 }))} height={260} unit="$" colorByIndex={false} color="var(--ff-chart-1)"/>
        </Card>

        <Card title="Approvals queue" action={<a href="#" style={{fontSize:12}}>Open queue</a>} padded={false}>
          <div className="ff-stack" style={{'--ff-stack-gap':'0', padding:'6px 0'}}>
            {pendingMine.slice(0, 5).map(e => (
              <div key={e.id} style={{padding:'12px 20px', borderBottom:'1px solid var(--ff-border)', display:'flex', gap:12, alignItems:'center'}}>
                <Avatar initials={e.who.split(' ').map(x=>x[0]).join('').slice(0,2)}/>
                <div style={{flex:1, minWidth:0}}>
                  <div style={{fontSize:13, fontWeight:500}}>{e.merchant}</div>
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
      </div>

      <div className="ff-grid ff-grid--3" style={{marginTop:16}}>
        <Card title="Quick approve" action={<Icon name="lightning" size={14}/>}>
          <p style={{color:'var(--ff-fg-muted)', fontSize:13, marginTop:0}}>Approve all pending under $100 with no policy flags.</p>
          <div className="ff-row" style={{marginTop:12, gap:8}}>
            <button className="ff-btn ff-btn--primary ff-btn--sm">Approve 3 items · $208.40</button>
            <button className="ff-btn ff-btn--sm">Review first</button>
          </div>
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
  const mine = d.expenses.filter(e => e.who === "Iris Chen");
  return (
    <>
      <PageHead
        eyebrow="My spend"
        title={`Hi, ${d.me.employee.name.split(' ')[0]}.`}
        sub="Your expenses and reimbursements this month"
        actions={<>
          <button className="ff-btn"><Icon name="upload-simple" size={14}/> Upload receipt</button>
          <button className="ff-btn ff-btn--primary"><Icon name="plus" size={14}/> New expense</button>
        </>}
      />

      <div className="ff-grid ff-grid--kpis">
        {d.kpis.employee.map((k, i) => <KpiTile key={i} {...k}/>)}
      </div>

      <div className="ff-grid" style={{gridTemplateColumns:'1.5fr 1fr', marginTop:16}}>
        <Card title="My recent expenses" padded={false} action={<a href="#" style={{fontSize:12}}>View all</a>}>
          <table className="ff-table">
            <thead><tr><th>Date</th><th>Merchant</th><th className="ff-num">Amount</th><th>Status</th></tr></thead>
            <tbody>
              {mine.map(e => (
                <tr key={e.id}>
                  <td style={{color:'var(--ff-fg-muted)'}} className="ff-tnum">{e.date.slice(5)}</td>
                  <td>{e.merchant}<div style={{fontSize:11, color:'var(--ff-fg-muted)'}}>{e.memo}</div></td>
                  <td className="ff-num"><Money value={e.amount}/></td>
                  <td><StatusBadge status={e.status}/></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <div className="ff-stack" style={{'--ff-stack-gap':'16px'}}>
          <Card title="My virtual card">
            <div style={{
              padding:'20px', borderRadius:12,
              background:'linear-gradient(135deg, var(--ff-plum-700), var(--ff-plum-900))',
              color:'#FBF5E8', display:'flex', flexDirection:'column', gap:14, position:'relative'
            }}>
              <div style={{fontSize:11, letterSpacing:'0.1em', textTransform:'uppercase', opacity:0.75}}>FinFlow · Virtual</div>
              <div className="ff-mono" style={{fontSize:18, letterSpacing:'0.12em'}}>•••• •••• •••• 9032</div>
              <div className="ff-row" style={{justifyContent:'space-between'}}>
                <div>
                  <div style={{fontSize:10, opacity:0.7, textTransform:'uppercase'}}>Holder</div>
                  <div style={{fontSize:13}}>Iris Chen</div>
                </div>
                <div>
                  <div style={{fontSize:10, opacity:0.7, textTransform:'uppercase'}}>Exp</div>
                  <div className="ff-mono" style={{fontSize:13}}>11/28</div>
                </div>
              </div>
              <div style={{position:'absolute', top:18, right:18}}>
                <BrandMark variant="mark" size={28} theme="dark"/>
              </div>
            </div>
            <div style={{marginTop:14}}>
              <BudgetBar label="Used" budget={5} spent={2.69}/>
            </div>
          </Card>

          <Card title="Reimbursement" action={<StatusBadge status="scheduled"/>}>
            <div className="ff-tnum" style={{fontFamily:'var(--ff-font-sans)', fontWeight:700, fontSize:30, lineHeight:1.1, letterSpacing:'-0.025em'}}>$320.40</div>
            <div style={{color:'var(--ff-fg-muted)', fontSize:13, marginTop:6}}>RB-104 · Direct deposit · arrives May 30</div>
          </Card>
        </div>
      </div>
    </>
  );
};

Object.assign(window, { FinanceDashboard, ManagerDashboard, EmployeeDashboard });
