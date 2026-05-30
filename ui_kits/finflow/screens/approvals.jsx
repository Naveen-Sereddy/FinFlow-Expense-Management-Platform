/* FinFlow Screens — Approvals, Reimbursements */

const ApprovalsQueue = () => {
  const d = FF_DATA;
  const items = d.expenses.filter(e => e.status === "pending" || e.status === "flagged");
  return (
    <>
      <PageHead
        eyebrow="Approvals"
        title="Approvals queue"
        sub={`${items.length} items awaiting your review`}
        actions={<>
          <button className="ff-btn"><Icon name="funnel" size={14}/> Filter</button>
          <button className="ff-btn ff-btn--accent"><Icon name="lightning" size={14}/> Bulk approve (5)</button>
        </>}
      />

      <Card padded={false}>
        <div style={{padding:'10px 16px', borderBottom:'1px solid var(--ff-border)', display:'flex', gap:8, alignItems:'center', background:'var(--ff-card-2)'}}>
          <input type="checkbox"/> <span style={{fontSize:12, color:'var(--ff-fg-muted)'}}>3 selected · total $1,063.40</span>
          <div style={{flex:1}}/>
          <button className="ff-btn ff-btn--sm">Reject</button>
          <button className="ff-btn ff-btn--sm ff-btn--primary">Approve</button>
        </div>
        {items.map((e, i) => (
          <div key={e.id} style={{padding:'16px 20px', borderBottom: i < items.length-1 ? '1px solid var(--ff-border)' : '0', display:'grid', gridTemplateColumns:'auto 60px 1fr auto auto', gap:16, alignItems:'center'}}>
            <input type="checkbox" defaultChecked={i < 3}/>
            <div className="ff-receipt"><span style={{fontFamily:'var(--ff-font-mono)'}}>{e.cardLast4}</span></div>
            <div>
              <div style={{display:'flex', gap:10, alignItems:'baseline'}}>
                <strong>{e.merchant}</strong>
                <span style={{fontSize:12, color:'var(--ff-fg-muted)'}} className="ff-mono">{e.id}</span>
                <StatusBadge status={e.status}/>
              </div>
              <div style={{fontSize:12, color:'var(--ff-fg-muted)', marginTop:2}}>{e.memo} · {e.who} · {e.date}</div>
            </div>
            <div style={{textAlign:'right'}}>
              <div style={{fontFamily:'var(--ff-font-sans)', fontWeight:600, fontSize:20, letterSpacing:'-0.02em'}} className="ff-tnum"><Money value={e.amount}/></div>
              <div style={{fontSize:11, color:'var(--ff-fg-muted)'}}>{d.categories.find(c=>c.id===e.cat).name}</div>
            </div>
            <div className="ff-row">
              <button className="ff-btn ff-btn--ghost ff-btn--sm">Reject</button>
              <button className="ff-btn ff-btn--primary ff-btn--sm">Approve</button>
            </div>
          </div>
        ))}
      </Card>
    </>
  );
};

const ApprovalDetail = () => <ExpenseDetail/>;  // Reuses expense detail for approval context

const ApprovalHistory = () => {
  const items = [
    { id:"EXP-2840", merchant:"Figma", who:"Mira Solberg", amount:180.00, status:"approved", decided:"May 22 14:22", by:"Maren Okafor" },
    { id:"EXP-2837", merchant:"AWS", who:"Dev Patel", amount:3204.18, status:"approved", decided:"May 20 11:08", by:"Maren Okafor" },
    { id:"EXP-2834", merchant:"Reforge", who:"Iris Chen", amount:995.00, status:"approved", decided:"May 19 16:42", by:"Maren Okafor" },
    { id:"EXP-2832", merchant:"Eventbrite", who:"Iris Chen", amount:640.00, status:"rejected", decided:"May 18 17:30", by:"Maren Okafor" },
    { id:"EXP-2828", merchant:"Slack", who:"Dev Patel", amount:149.00, status:"approved", decided:"May 16 09:14", by:"Maren Okafor" }
  ];
  return (
    <>
      <PageHead eyebrow="Approvals" title="Approval history" sub="Decisions you've made — past 30 days"/>
      <Card padded={false}>
        <table className="ff-table">
          <thead><tr><th>ID</th><th>Merchant</th><th>Owner</th><th className="ff-num">Amount</th><th>Decision</th><th>Decided at</th><th>By</th></tr></thead>
          <tbody>
            {items.map(e => (
              <tr key={e.id}>
                <td className="ff-mono" style={{fontSize:12}}>{e.id}</td>
                <td>{e.merchant}</td>
                <td>{e.who}</td>
                <td className="ff-num"><Money value={e.amount}/></td>
                <td><StatusBadge status={e.status}/></td>
                <td className="ff-tnum" style={{color:'var(--ff-fg-muted)'}}>{e.decided}</td>
                <td>{e.by}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </>
  );
};

const ReimbursementsList = () => {
  const d = FF_DATA;
  return (
    <>
      <PageHead
        eyebrow="Reimbursements"
        title="Payouts"
        sub="Out-of-pocket expenses owed to employees"
        actions={<>
          <button className="ff-btn"><Icon name="download-simple" size={14}/> Export ACH file</button>
          <button className="ff-btn ff-btn--primary"><Icon name="calendar-plus" size={14}/> Schedule payout</button>
        </>}
      />
      <div className="ff-grid ff-grid--kpis" style={{gridTemplateColumns:'repeat(3, 1fr)'}}>
        <KpiTile label="Owed this cycle" value="$685.10" delta="4 employees" trend="neutral"/>
        <KpiTile label="Scheduled" value="$320.40" delta="May 30" trend="neutral"/>
        <KpiTile label="Paid YTD" value="$48,210" delta="142 payouts" trend="up"/>
      </div>
      <Card padded={false} style={{marginTop:16}}>
        <table className="ff-table">
          <thead><tr><th>ID</th><th>Employee</th><th className="ff-num">Amount</th><th>Status</th><th>Date</th><th>Method</th><th></th></tr></thead>
          <tbody>
            {d.reimbursements.map(r => (
              <tr key={r.id}>
                <td className="ff-mono" style={{fontSize:12}}>{r.id}</td>
                <td><span className="ff-row" style={{gap:6}}><Avatar initials={r.who.split(' ').map(x=>x[0]).join('').slice(0,2)}/>{r.who}</span></td>
                <td className="ff-num"><Money value={r.amount}/></td>
                <td><StatusBadge status={r.status}/></td>
                <td className="ff-tnum" style={{color:'var(--ff-fg-muted)'}}>{r.date}</td>
                <td><span className="ff-badge ff-badge--neutral ff-badge--no-dot">ACH</span></td>
                <td><button className="ff-btn ff-btn--ghost ff-btn--sm">View</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </>
  );
};

const PayoutDetail = () => {
  return (
    <>
      <PageHead
        eyebrow="Reimbursement"
        title="RB-104 — Iris Chen"
        sub="Scheduled · arrives May 30, 2026"
        actions={<>
          <button className="ff-btn ff-btn--danger">Cancel payout</button>
          <button className="ff-btn ff-btn--primary">Pay now</button>
        </>}
      />
      <div className="ff-grid" style={{gridTemplateColumns:'1.4fr 1fr', gap:16}}>
        <Card title="Items in this payout" padded={false}>
          <table className="ff-table">
            <thead><tr><th>Expense</th><th>Date</th><th className="ff-num">Amount</th></tr></thead>
            <tbody>
              <tr><td>Office supplies — Staples<div style={{fontSize:11, color:'var(--ff-fg-muted)'}}>EXP-2820</div></td><td className="ff-tnum">May 12</td><td className="ff-num"><Money value={48.20}/></td></tr>
              <tr><td>Mileage 84 mi @ $0.67<div style={{fontSize:11, color:'var(--ff-fg-muted)'}}>EXP-2826</div></td><td className="ff-tnum">May 15</td><td className="ff-num"><Money value={56.28}/></td></tr>
              <tr><td>Client coffee — Sightglass<div style={{fontSize:11, color:'var(--ff-fg-muted)'}}>EXP-2829</div></td><td className="ff-tnum">May 18</td><td className="ff-num"><Money value={216.00}/></td></tr>
            </tbody>
            <tfoot>
              <tr style={{background:'var(--ff-card-2)'}}><td colSpan="2" style={{textAlign:'right', fontWeight:600}}>Total</td><td className="ff-num" style={{fontWeight:600}}><Money value={320.48}/></td></tr>
            </tfoot>
          </table>
        </Card>
        <Card title="Payout method">
          <DetailRow label="Account">Bank of Marin · •••• 8841</DetailRow>
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

const SchedulePayout = () => (
  <>
    <PageHead eyebrow="Reimbursements" title="Schedule a payout" sub="Choose employees and an arrival date"/>
    <div className="ff-grid" style={{gridTemplateColumns:'1.5fr 1fr', gap:24}}>
      <Card title="Eligible items" padded={false}>
        <table className="ff-table">
          <thead><tr><th><input type="checkbox" defaultChecked/></th><th>Employee</th><th className="ff-num">Owed</th><th>Items</th></tr></thead>
          <tbody>
            <tr><td><input type="checkbox" defaultChecked/></td><td>Iris Chen</td><td className="ff-num"><Money value={320.40}/></td><td>3</td></tr>
            <tr><td><input type="checkbox" defaultChecked/></td><td>Luna Park</td><td className="ff-num"><Money value={82.00}/></td><td>1</td></tr>
            <tr><td><input type="checkbox" defaultChecked/></td><td>Dev Patel</td><td className="ff-num"><Money value={218.50}/></td><td>2</td></tr>
            <tr><td><input type="checkbox"/></td><td>Asa Brown</td><td className="ff-num"><Money value={64.20}/></td><td>1</td></tr>
          </tbody>
        </table>
      </Card>
      <Card title="Schedule">
        <div className="ff-stack" style={{'--ff-stack-gap':'14px'}}>
          <div className="ff-field"><label className="ff-label">Arrival date</label><input className="ff-input ff-tnum" defaultValue="2026-05-30"/></div>
          <div className="ff-field"><label className="ff-label">Funding source</label><select className="ff-select"><option>Mercury · Operating ·  •••• 5512</option></select></div>
          <div className="ff-field"><label className="ff-label">Memo</label><input className="ff-input" defaultValue="FinFlow · May 2026"/></div>
          <div className="ff-card ff-card--flat" style={{background:'var(--ff-card-2)', padding:14, marginTop:6}}>
            <div className="ff-row" style={{justifyContent:'space-between', fontSize:13}}><span>3 payouts</span><span className="ff-tnum">$620.90</span></div>
            <div className="ff-row" style={{justifyContent:'space-between', fontSize:13, color:'var(--ff-fg-muted)'}}><span>ACH fee</span><span className="ff-tnum">$0.00</span></div>
            <hr className="ff-divider" style={{margin:'10px 0'}}/>
            <div className="ff-row" style={{justifyContent:'space-between', fontWeight:600}}><span>Total</span><span className="ff-tnum">$620.90</span></div>
          </div>
          <button className="ff-btn ff-btn--primary ff-btn--lg" style={{width:'100%'}}>Schedule 3 payouts</button>
        </div>
      </Card>
    </div>
  </>
);

Object.assign(window, { ApprovalsQueue, ApprovalDetail, ApprovalHistory, ReimbursementsList, PayoutDetail, SchedulePayout });
