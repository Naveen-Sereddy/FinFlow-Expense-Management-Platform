/* FinFlow Screens — Approvals, Reimbursements */

const ApprovalsQueue = () => {
  const d = FF_DATA;
  /* Redesign: oldest-first, not insertion-order. A queue is a triage tool —
     the item that's been sitting longest is the one most likely to be
     blocking someone, so it belongs at the top, not wherever it happened to
     land in the data. */
  const items = d.expenses.filter(e => e.status === "pending" || e.status === "flagged").sort((a, b) => a.date.localeCompare(b.date));
  const [selected, setSelected] = React.useState(items.slice(0, 3).map(e => e.id));
  const [compact, setCompact] = React.useState(false);
  const selTotal = items.filter(e => selected.includes(e.id)).reduce((s, e) => s + e.amount, 0);
  const fmtUSD = (n) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
  const allSelected = items.length > 0 && items.every(e => selected.includes(e.id));
  const someSelected = selected.length > 0 && !allSelected;
  const headerCbRef = React.useRef(null);
  React.useEffect(() => { if (headerCbRef.current) headerCbRef.current.indeterminate = someSelected; }, [someSelected]);
  const toggleRow = (id) => setSelected(sel => sel.includes(id) ? sel.filter(x => x !== id) : [...sel, id]);
  const toggleAll = () => setSelected(allSelected ? [] : items.map(e => e.id));
  return (
    <>
      <PageHead
        eyebrow="Approvals"
        title="Approvals queue"
        sub={`${items.length} items awaiting your review`}
        actions={<>
          <DensityToggle compact={compact} onToggle={()=>setCompact(c=>!c)}/>
          <RefreshButton/>
          <button className="ff-btn"><Icon name="funnel" size={14}/> Filter</button>
          <button className="ff-btn ff-btn--accent"><Icon name="lightning" size={14}/> Bulk approve ({items.length})</button>
        </>}
      />

      {/* Toolbar, not a card — a bulk-action bar is a control surface, not
          content, so it doesn't need a container competing with the queue
          for visual weight. */}
      <div style={{padding:'0 0 12px', borderBottom:'1px solid var(--ff-border-strong)', display:'flex', gap:8, alignItems:'center'}}>
        <input ref={headerCbRef} type="checkbox" checked={allSelected} onChange={toggleAll}/> <span style={{fontSize:12, color:'var(--ff-fg-muted)'}}>{selected.length} selected · total {fmtUSD(selTotal)}</span>
        <div style={{flex:1}}/>
        <button className="ff-btn ff-btn--sm" onClick={()=>{alert(`Rejected ${selected.length} items`); setSelected([]);}}>Reject</button>
        <button className="ff-btn ff-btn--sm ff-btn--primary" onClick={()=>{alert(`Approved ${selected.length} items`); ffGo('state-success');}}>Approve</button>
      </div>
      {items.map((e, i) => (
        <div key={e.id} onClick={()=>ffGo('approval-detail')} style={{padding: compact ? '12px 4px' : '18px 4px', borderBottom:'1px solid var(--ff-border)', display:'grid', gridTemplateColumns:'auto 60px 1fr auto auto', gap:16, alignItems:'center', cursor:'pointer'}}>
          <input type="checkbox" checked={selected.includes(e.id)} onChange={()=>toggleRow(e.id)} onClick={ev=>ev.stopPropagation()}/>
          <div className="ff-receipt"><span style={{fontFamily:'var(--ff-font-mono)'}}>{e.cardLast4}</span></div>
          <div>
            <div style={{display:'flex', gap:10, alignItems:'baseline'}}>
              <span className="ff-row" style={{gap:8, alignItems:'center'}}><MerchantIcon name={e.merchant} size={15}/><strong style={{fontSize:16}}>{e.merchant}</strong></span>
              <span style={{fontSize:12, color:'var(--ff-fg-muted)'}} className="ff-mono">{e.id}</span>
              <StatusBadge status={e.status}/>
              {e.policy !== 'ok' && <StatusBadge status={e.policy}/>}
            </div>
            <div style={{fontSize:12, color:'var(--ff-fg-muted)', marginTop:2}}>{e.memo} · {e.who} · {fmtDate(e.date)}</div>
          </div>
          <div style={{textAlign:'right'}}>
            <div style={{fontFamily:'var(--ff-font-sans)', fontWeight:600, fontSize:22, letterSpacing:'-0.02em'}} className="ff-tnum"><Money value={e.amount}/></div>
            <div style={{fontSize:11, color:'var(--ff-fg-muted)'}}>{d.categories.find(c=>c.id===e.cat).name}</div>
          </div>
          <div className="ff-row" onClick={ev=>ev.stopPropagation()}>
            <button className="ff-btn ff-btn--ghost ff-btn--sm">Reject</button>
            <button className="ff-btn ff-btn--primary ff-btn--sm" onClick={()=>ffGo('state-success')}>Approve</button>
          </div>
        </div>
      ))}
    </>
  );
};

const ApprovalDetail = () => <ExpenseDetail/>;  // Reuses expense detail for approval context

const ApprovalHistory = () => {
  const items = [
    { id:"EXP-2840", merchant:"Figma", who:"James Taylor", amount:180.00, status:"approved", decided:"May 22 14:22", by:"Marcus Stoinis" },
    { id:"EXP-2837", merchant:"Google Cloud", who:"Sam Richardson", amount:3204.18, status:"approved", decided:"May 20 11:08", by:"Marcus Stoinis" },
    { id:"EXP-2834", merchant:"Udemy", who:"Corey Anderson", amount:995.00, status:"approved", decided:"May 19 16:42", by:"Marcus Stoinis" },
    { id:"EXP-2832", merchant:"Ticketmaster", who:"Corey Anderson", amount:640.00, status:"rejected", decided:"May 18 17:30", by:"Marcus Stoinis" },
    { id:"EXP-2828", merchant:"Google Chat", who:"Sam Richardson", amount:149.00, status:"approved", decided:"May 16 09:14", by:"Marcus Stoinis" }
  ];
  return (
    <>
      <PageHead eyebrow="Approvals" title="Approval history" sub="Decisions you've made — past 30 days"/>
      {items.length === 0 ? (
        <EmptyState icon="clock-counter-clockwise" title="No decisions yet"
          body="Expenses you approve or reject will show up here with a full audit trail."/>
      ) : (
      <table className="ff-table">
        <thead><tr><th>ID</th><th>Merchant</th><th>Owner</th><th className="ff-num">Amount</th><th>Decision</th><th>Decided at</th><th>By</th></tr></thead>
        <tbody>
          {items.map(e => (
            <tr key={e.id}>
              <td className="ff-mono" style={{fontSize:12}}>{e.id}</td>
              <td><span className="ff-row" style={{gap:8}}><MerchantIcon name={e.merchant} size={14}/> {e.merchant}</span></td>
              <td>{e.who}</td>
              <td className="ff-num"><Money value={e.amount}/></td>
              <td><StatusBadge status={e.status}/></td>
              <td className="ff-tnum" style={{color:'var(--ff-fg-muted)'}}>{e.decided}</td>
              <td>{e.by}</td>
            </tr>
          ))}
        </tbody>
      </table>
      )}
    </>
  );
};

const ReimbursementsList = () => {
  const d = FF_DATA;
  const outstanding = d.reimbursements.filter(r => r.status !== "paid");
  const owedTotal = outstanding.reduce((sum, r) => sum + r.amount, 0);
  return (
    <>
      <PageHead
        eyebrow="Reimbursements"
        title="Payouts"
        sub="Out-of-pocket expenses owed to employees"
        actions={<>
          <button className="ff-btn"><Icon name="download-simple" size={14}/> Export ACH file</button>
          <button className="ff-btn ff-btn--primary" onClick={()=>ffGo('schedule-payout')}><Icon name="calendar-plus" size={14}/> Schedule payout</button>
        </>}
      />
      <StatRow items={[
        { label: "Owed this cycle", value: <Money value={owedTotal}/>, delta: `${outstanding.length} employees` },
        { label: "Scheduled", value: "$320.40", delta: "May 30" },
        { label: "Paid YTD", value: "$48,210", delta: "142 payouts", trend: "up" }
      ]} style={{padding:'4px 0 20px'}}/>
      {d.reimbursements.length === 0 ? (
        <EmptyState icon="calendar-check" title="No payouts owed"
          body="Out-of-pocket expenses owed to employees will show up here once submitted and approved."/>
      ) : (
        <table className="ff-table">
          <thead><tr><th>ID</th><th>Employee</th><th className="ff-num">Amount</th><th>Status</th><th>Date</th><th>Method</th><th></th></tr></thead>
          <tbody>
            {d.reimbursements.map(r => (
              <tr key={r.id} onClick={()=>ffGo('payout-detail')} style={{cursor:'pointer'}}>
                <td className="ff-mono" style={{fontSize:12}}>{r.id}</td>
                <td><span className="ff-row" style={{gap:6}}><Avatar initials={r.who.split(' ').map(x=>x[0]).join('').slice(0,2)} name={r.who}/>{r.who}</span></td>
                <td className="ff-num"><Money value={r.amount}/></td>
                <td><StatusBadge status={r.status}/></td>
                <td className="ff-tnum" style={{color:'var(--ff-fg-muted)'}}>{fmtDate(r.date)}</td>
                <td><span className="ff-badge ff-badge--neutral ff-badge--no-dot">ACH</span></td>
                <td><button className="ff-btn ff-btn--ghost ff-btn--sm" onClick={()=>ffGo('payout-detail')}>View</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

const PayoutDetail = () => {
  return (
    <>
      <PageHead
        eyebrow="Reimbursement"
        title="RB-104 — Corey Anderson"
        sub="Scheduled · arrives May 30, 2026"
        actions={<>
          <button className="ff-btn ff-btn--danger" onClick={()=>ffGo('reimburse')}>Cancel payout</button>
          <button className="ff-btn ff-btn--primary" onClick={()=>ffGo('state-confirm')}>Pay now</button>
        </>}
      />
      <div className="ff-grid" style={{gridTemplateColumns:'1.4fr 1fr', gap:16}}>
        <div>
          <div className="ff-row" style={{padding:'0 0 10px'}}><span style={{fontSize:15, fontWeight:600}}>Items in this payout</span></div>
          <table className="ff-table">
            <thead><tr><th>Expense</th><th>Date</th><th className="ff-num">Amount</th></tr></thead>
            <tbody>
              <tr><td>Office supplies — Staples<div style={{fontSize:11, color:'var(--ff-fg-muted)'}}>EXP-2820</div></td><td className="ff-tnum">May 12</td><td className="ff-num"><Money value={48.20}/></td></tr>
              <tr><td>Mileage 84 mi @ $0.67<div style={{fontSize:11, color:'var(--ff-fg-muted)'}}>EXP-2826</div></td><td className="ff-tnum">May 15</td><td className="ff-num"><Money value={56.28}/></td></tr>
              <tr><td>Client coffee — Sightglass<div style={{fontSize:11, color:'var(--ff-fg-muted)'}}>EXP-2829</div></td><td className="ff-tnum">May 18</td><td className="ff-num"><Money value={215.92}/></td></tr>
            </tbody>
            <tfoot>
              <tr style={{background:'var(--ff-card-2)'}}><td colSpan="2" style={{textAlign:'right', fontWeight:600}}>Total</td><td className="ff-num" style={{fontWeight:600}}><Money value={320.40}/></td></tr>
            </tfoot>
          </table>
        </div>
        <Card title="Payout method">
          <DetailRow label="Account"><span className="ff-row" style={{gap:6}}><MerchantIcon name="Chase" size={14}/> Chase · •••• 8841</span></DetailRow>
          <div style={{height:12}}/>
          <DetailRow label="Method">ACH — same day</DetailRow>
          <div style={{height:12}}/>
          <DetailRow label="Memo">FinFlow · RB-104</DetailRow>
          <div style={{height:18}}/>
          <div className="ff-alert ff-alert--info">
            <Icon name="info" size={18} weight="fill"/>
            <div className="ff-alert__body"><div className="ff-alert__title">Estimated arrival May 30</div><div>Cancel up until 2 hours before send.</div></div>
          </div>
        </Card>
      </div>
    </>
  );
};

const PAYOUT_ROWS = [
  { id: "corey", name: "Corey Anderson", amount: 320.40, items: 3 },
  { id: "jordan", name: "Jordan Lee", amount: 82.00, items: 1 },
  { id: "sam", name: "Sam Richardson", amount: 218.50, items: 2 },
  { id: "jamie", name: "Jamie Smith", amount: 64.20, items: 1 },
];

const SchedulePayout = () => {
  const [selected, setSelected] = React.useState(["corey", "jordan", "sam"]);
  const allSelected = selected.length === PAYOUT_ROWS.length;
  const someSelected = selected.length > 0 && !allSelected;
  const headerCbRef = React.useRef(null);
  React.useEffect(() => { if (headerCbRef.current) headerCbRef.current.indeterminate = someSelected; }, [someSelected]);
  const toggleAll = () => setSelected(allSelected ? [] : PAYOUT_ROWS.map(r => r.id));
  const toggleRow = (id) => setSelected(sel => sel.includes(id) ? sel.filter(x => x !== id) : [...sel, id]);
  const selRows = PAYOUT_ROWS.filter(r => selected.includes(r.id));
  const total = selRows.reduce((s, r) => s + r.amount, 0);
  const fmtUSD = (n) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
  return (
    <>
      <PageHead eyebrow="Reimbursements" title="Schedule a payout" sub="Choose employees and an arrival date"/>
      <div className="ff-grid" style={{gridTemplateColumns:'1.5fr 1fr', gap:24}}>
        <div>
          <div className="ff-row" style={{padding:'0 0 10px'}}><span style={{fontSize:15, fontWeight:600}}>Eligible items</span></div>
          <table className="ff-table">
            <thead><tr><th><input ref={headerCbRef} type="checkbox" checked={allSelected} onChange={toggleAll}/></th><th>Employee</th><th className="ff-num">Owed</th><th>Items</th></tr></thead>
            <tbody>
              {PAYOUT_ROWS.map(r => (
                <tr key={r.id}>
                  <td><input type="checkbox" checked={selected.includes(r.id)} onChange={()=>toggleRow(r.id)}/></td>
                  <td>{r.name}</td>
                  <td className="ff-num"><Money value={r.amount}/></td>
                  <td>{r.items}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Card title="Schedule">
          <div className="ff-stack" style={{'--ff-stack-gap':'14px'}}>
            <div className="ff-field"><label className="ff-label">Arrival date</label><input className="ff-input ff-tnum" defaultValue="2026-05-30"/></div>
            <div className="ff-field"><label className="ff-label">Funding source</label><select className="ff-select"><option>Wise · Operating ·  •••• 5512</option></select></div>
            <div className="ff-field"><label className="ff-label">Memo</label><input className="ff-input" defaultValue="FinFlow · May 2026"/></div>
            <div className="ff-card ff-card--flat" style={{background:'var(--ff-card-2)', padding:14, marginTop:6}}>
              <div className="ff-row" style={{justifyContent:'space-between', fontSize:13}}><span>{selRows.length} payouts</span><span className="ff-tnum">{fmtUSD(total)}</span></div>
              <div className="ff-row" style={{justifyContent:'space-between', fontSize:13, color:'var(--ff-fg-muted)'}}><span>ACH fee</span><span className="ff-tnum">$0.00</span></div>
              <hr className="ff-divider" style={{margin:'10px 0'}}/>
              <div className="ff-row" style={{justifyContent:'space-between', fontWeight:600}}><span>Total</span><span className="ff-tnum">{fmtUSD(total)}</span></div>
            </div>
            <button className="ff-btn ff-btn--primary ff-btn--lg" style={{width:'100%'}} disabled={selRows.length===0} onClick={()=>ffGo('state-confirm')}>Schedule {selRows.length} payouts</button>
          </div>
        </Card>
      </div>
    </>
  );
};

Object.assign(window, { ApprovalsQueue, ApprovalDetail, ApprovalHistory, ReimbursementsList, PayoutDetail, SchedulePayout });
