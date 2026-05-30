/* FinFlow Screens — Expenses (list, detail, new, OCR review, flagged, import) */

const ExpenseList = () => {
  const d = FF_DATA;
  const [status, setStatus] = React.useState("all");
  const [cat, setCat] = React.useState("all");
  const filtered = d.expenses.filter(e =>
    (status === "all" || e.status === status) &&
    (cat === "all" || e.cat === cat)
  );
  const total = filtered.reduce((s, e) => s + e.amount, 0);

  return (
    <>
      <PageHead
        eyebrow="Expenses"
        title="All expenses"
        sub={`${filtered.length} items · total ${new Intl.NumberFormat('en-US', { style:'currency', currency:'USD' }).format(total)}`}
        actions={<>
          <button className="ff-btn"><Icon name="upload-simple" size={14}/> Import CSV</button>
          <button className="ff-btn"><Icon name="download-simple" size={14}/> Export</button>
          <button className="ff-btn ff-btn--primary"><Icon name="plus" size={14}/> New expense</button>
        </>}
      />

      <div className="ff-row" style={{justifyContent:'space-between', marginBottom:14, flexWrap:'wrap', gap:12}}>
        <div className="ff-row" style={{gap:8, flexWrap:'wrap'}}>
          <ChipBar items={[
            { id: "all",     label: "All",     count: d.expenses.length },
            { id: "pending", label: "Pending", count: d.expenses.filter(e=>e.status==="pending").length },
            { id: "approved",label: "Approved",count: d.expenses.filter(e=>e.status==="approved").length },
            { id: "flagged", label: "Flagged", count: d.expenses.filter(e=>e.status==="flagged").length },
            { id: "rejected",label: "Rejected",count: d.expenses.filter(e=>e.status==="rejected").length }
          ]} value={status} onChange={setStatus}/>
        </div>
        <div className="ff-row" style={{gap:8}}>
          <div className="ff-search" style={{width:240}}>
            <Icon name="magnifying-glass" size={14}/>
            <input placeholder="Search expenses…"/>
          </div>
          <select className="ff-select" style={{width:140}} value={cat} onChange={e=>setCat(e.target.value)}>
            <option value="all">All categories</option>
            {d.categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <button className="ff-btn"><Icon name="calendar-blank" size={14}/> May 2026</button>
        </div>
      </div>

      <Card padded={false}>
        <table className="ff-table">
          <thead>
            <tr>
              <th style={{width:32}}><input type="checkbox" aria-label="Select all"/></th>
              <th>ID</th>
              <th>Date</th>
              <th>Merchant / memo</th>
              <th>Owner</th>
              <th>Category</th>
              <th className="ff-num">Amount</th>
              <th>Status</th>
              <th style={{width:40}}></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(e => {
              const cat = d.categories.find(c => c.id === e.cat);
              return (
                <tr key={e.id}>
                  <td><input type="checkbox"/></td>
                  <td><span className="ff-mono" style={{fontSize:12, color:'var(--ff-fg-muted)'}}>{e.id}</span></td>
                  <td className="ff-tnum" style={{color:'var(--ff-fg-muted)', fontSize:12}}>{e.date}</td>
                  <td>
                    <div style={{fontWeight:500}}>{e.merchant}</div>
                    <div style={{fontSize:11, color:'var(--ff-fg-muted)'}}>{e.memo}</div>
                  </td>
                  <td><span className="ff-row" style={{gap:6}}><Avatar initials={e.who.split(' ').map(x=>x[0]).join('').slice(0,2)}/>{e.who}</span></td>
                  <td><span className="ff-badge ff-badge--neutral ff-badge--no-dot">{cat.name}</span></td>
                  <td className="ff-num"><Money value={e.amount}/></td>
                  <td><StatusBadge status={e.status}/></td>
                  <td><button className="ff-btn ff-btn--ghost ff-btn--sm ff-btn--icon"><Icon name="dots-three" size={16}/></button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </>
  );
};

const ExpenseDetail = () => {
  const d = FF_DATA;
  const e = d.expenses.find(x => x.id === "EXP-2841");
  return (
    <>
      <div className="ff-row" style={{gap:8, marginBottom:12, color:'var(--ff-fg-muted)', fontSize:13, whiteSpace:'nowrap'}}>
        <a href="#" style={{color:'inherit'}}>Expenses</a>
        <Icon name="caret-right" size={12}/>
        <span style={{color:'var(--ff-fg)'}} className="ff-mono">{e.id}</span>
      </div>
      <PageHead
        title={e.merchant}
        sub={`${e.id} · Submitted by ${e.who} on ${e.date}`}
        actions={<>
          <button className="ff-btn"><Icon name="chat-text" size={14}/> Comment</button>
          <button className="ff-btn"><Icon name="x" size={14}/> Reject</button>
          <button className="ff-btn ff-btn--primary"><Icon name="check" size={14}/> Approve</button>
        </>}
      />

      <div className="ff-grid" style={{gridTemplateColumns:'1.6fr 1fr'}}>
        <div className="ff-stack" style={{'--ff-stack-gap':'16px'}}>
          <Card title="Summary">
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px 28px'}}>
              <DetailRow label="Amount"><span style={{fontFamily:'var(--ff-font-sans)', fontWeight:700, fontSize:28, letterSpacing:'-0.025em'}} className="ff-tnum"><Money value={e.amount}/></span></DetailRow>
              <DetailRow label="Status"><StatusBadge status={e.status}/></DetailRow>
              <DetailRow label="Category">{d.categories.find(c=>c.id===e.cat).name}</DetailRow>
              <DetailRow label="Date"><span className="ff-tnum">{e.date}</span></DetailRow>
              <DetailRow label="Payment"><span className="ff-mono">•••• {e.cardLast4}</span></DetailRow>
              <DetailRow label="Memo">{e.memo}</DetailRow>
            </div>
          </Card>

          <Card title="Receipt" action={<button className="ff-btn ff-btn--sm ff-btn--ghost"><Icon name="download-simple" size={12}/> Download</button>}>
            <div style={{
              background:'var(--ff-card-2)', border:'1px dashed var(--ff-border)', borderRadius:10,
              padding:32, display:'flex', flexDirection:'column', alignItems:'center', gap:12
            }}>
              <div style={{
                width:200, height:280,
                background:`repeating-linear-gradient(0deg, var(--ff-border) 0 1px, transparent 1px 12px), var(--ff-card)`,
                border:'1px solid var(--ff-border)', borderRadius:6, position:'relative'
              }}>
                <div style={{position:'absolute', top:14, left:0, right:0, textAlign:'center', fontFamily:'var(--ff-font-mono)', fontSize:10, color:'var(--ff-fg-muted)'}}>UNITED · receipt.pdf</div>
                <div style={{position:'absolute', bottom:14, left:0, right:0, textAlign:'center', fontFamily:'var(--ff-font-display)', fontSize:22, fontStyle:'italic'}} className="ff-tnum">$842.50</div>
              </div>
              <div style={{fontSize:11, color:'var(--ff-fg-muted)'}}>1 of 1 · receipt_2026-05-22_united.pdf · 248 KB</div>
            </div>
          </Card>

          <Card title="Activity" padded={false}>
            <div className="ff-stack" style={{'--ff-stack-gap':'0'}}>
              {[
                { who: "Luna Park",       act: "Submitted expense",  ts: "May 22, 9:12 AM" },
                { who: "System",          act: "Policy check passed", ts: "May 22, 9:12 AM" },
                { who: "Theo Vasquez",    act: "Routed for approval", ts: "May 22, 9:15 AM" },
                { who: "Maren Okafor",    act: "Viewing now",         ts: "Just now" }
              ].map((a, i, arr) => (
                <div key={i} style={{padding:'14px 20px', borderBottom: i < arr.length - 1 ? '1px solid var(--ff-border)' : '0', display:'flex', gap:12, alignItems:'center'}}>
                  <Avatar initials={a.who.split(' ').map(x=>x[0]).join('').slice(0,2)}/>
                  <div style={{flex:1}}>
                    <div style={{fontSize:13}}><strong>{a.who}</strong> · {a.act}</div>
                    <div style={{fontSize:11, color:'var(--ff-fg-muted)'}} className="ff-tnum">{a.ts}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="ff-stack" style={{'--ff-stack-gap':'16px'}}>
          <Card title="Approval chain">
            <div className="ff-stack" style={{'--ff-stack-gap':'12px'}}>
              {[
                { name:"Theo Vasquez", title:"Head of Sales", status:"approved" },
                { name:"Maren Okafor", title:"Finance",       status:"pending" }
              ].map((s, i) => (
                <div key={i} className="ff-row" style={{justifyContent:'space-between', gap:8}}>
                  <div className="ff-row" style={{gap:10, minWidth:0, flex:1}}>
                    <Avatar initials={s.name.split(' ').map(x=>x[0]).join('').slice(0,2)}/>
                    <div style={{minWidth:0}}>
                      <div style={{fontSize:13, fontWeight:500, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{s.name}</div>
                      <div style={{fontSize:11, color:'var(--ff-fg-muted)'}}>{s.title}</div>
                    </div>
                  </div>
                  <StatusBadge status={s.status}/>
                </div>
              ))}
            </div>
          </Card>

          <div className="ff-alert ff-alert--info">
            <Icon name="info" size={18} weight="fill" style={{color:'inherit'}}/>
            <div className="ff-alert__body">
              <div className="ff-alert__title">Within policy</div>
              <div>Airfare under domestic cap ($1,000). Receipt attached. Tax ID matches vendor.</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const DetailRow = ({ label, children }) => (
  <div>
    <div className="ff-eyebrow" style={{marginBottom:4}}>{label}</div>
    <div style={{fontSize:14}}>{children}</div>
  </div>
);

const NewExpense = () => {
  const d = FF_DATA;
  return (
    <>
      <PageHead
        eyebrow="Expenses"
        title="New expense"
        sub="Submit a business expense for approval"
        actions={<>
          <button className="ff-btn">Save draft</button>
          <button className="ff-btn ff-btn--primary">Submit for approval</button>
        </>}
      />

      <div className="ff-grid" style={{gridTemplateColumns:'1.5fr 1fr', gap:24}}>
        <Card>
          <div className="ff-stack" style={{'--ff-stack-gap':'18px'}}>
            <div className="ff-grid ff-grid--2">
              <div className="ff-field"><label className="ff-label">Merchant</label><input className="ff-input" defaultValue="United Airlines"/></div>
              <div className="ff-field"><label className="ff-label">Date</label><input className="ff-input" type="text" defaultValue="2026-05-22"/></div>
            </div>
            <div className="ff-grid ff-grid--2">
              <div className="ff-field"><label className="ff-label">Amount (USD)</label><input className="ff-input ff-tnum" defaultValue="842.50"/></div>
              <div className="ff-field"><label className="ff-label">Category</label>
                <select className="ff-select" defaultValue="tr">
                  {d.categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
            </div>
            <div className="ff-field"><label className="ff-label">Memo</label><textarea className="ff-textarea" defaultValue="SF → Austin (sales kickoff)"/></div>
            <div className="ff-grid ff-grid--2">
              <div className="ff-field"><label className="ff-label">Project / cost center</label>
                <select className="ff-select"><option>Sales — FY26</option><option>Marketing</option><option>R&amp;D</option></select>
              </div>
              <div className="ff-field"><label className="ff-label">Payment</label>
                <select className="ff-select"><option>FinFlow Card · •••• 4112</option><option>Personal — request reimbursement</option></select>
              </div>
            </div>
          </div>
        </Card>

        <div className="ff-stack" style={{'--ff-stack-gap':'16px'}}>
          <Card title="Receipt">
            <div style={{
              border:'1.5px dashed var(--ff-border-strong)', borderRadius:10, padding:'24px 20px',
              display:'flex', flexDirection:'column', alignItems:'center', gap:8, textAlign:'center'
            }}>
              <div className="ff-empty__icon"><Icon name="upload-simple" size={22}/></div>
              <div style={{fontSize:14, fontWeight:500}}>Drop a receipt</div>
              <div style={{fontSize:12, color:'var(--ff-fg-muted)'}}>PDF or image · OCR fills the form automatically</div>
              <button className="ff-btn ff-btn--sm" style={{marginTop:6}}>Choose file</button>
            </div>
          </Card>
          <Card title="Approval preview">
            <div style={{fontSize:13, color:'var(--ff-fg-muted)', marginBottom:10}}>This expense will be routed to:</div>
            <div className="ff-stack" style={{'--ff-stack-gap':'8px'}}>
              <div className="ff-row" style={{gap:8}}><Avatar initials="TV"/><span>Theo Vasquez · Head of Sales</span></div>
              <div className="ff-row" style={{gap:8}}><Avatar initials="MO"/><span>Maren Okafor · Finance</span></div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

const OcrReview = () => {
  return (
    <>
      <PageHead
        eyebrow="Receipt OCR"
        title="Review extracted data"
        sub="We've parsed the receipt — confirm the fields below."
        actions={<>
          <button className="ff-btn">Re-scan</button>
          <button className="ff-btn ff-btn--primary">Save expense</button>
        </>}
      />
      <div className="ff-grid" style={{gridTemplateColumns:'1fr 1fr', gap:24}}>
        <Card padded={false}>
          <div style={{padding:20}}>
            <div style={{
              background:'var(--ff-card-2)', border:'1px solid var(--ff-border)', borderRadius:8,
              height:540, position:'relative', overflow:'hidden'
            }}>
              {/* faux receipt */}
              <div style={{position:'absolute', inset:24, background:'#fff', borderRadius:4, boxShadow:'var(--ff-shadow-md)', padding:'24px 20px', color:'#15131A', fontSize:11, fontFamily:'var(--ff-font-mono)'}}>
                <div style={{textAlign:'center', fontFamily:'var(--ff-font-display)', fontSize:22, marginBottom:14}}>MARRIOTT</div>
                <div style={{textAlign:'center', marginBottom:18, color:'#666'}}>Austin, TX · Folio 4471</div>
                <div style={{display:'flex', justifyContent:'space-between', marginBottom:4}}><span>Room 412 — 3 nights</span><span>$1,140.00</span></div>
                <div style={{display:'flex', justifyContent:'space-between', marginBottom:4}}><span>Resort fee</span><span>$45.00</span></div>
                <div style={{display:'flex', justifyContent:'space-between', marginBottom:4}}><span>Tax</span><span>$55.00</span></div>
                <hr style={{margin:'10px 0', border:'0', borderTop:'1px dashed #ccc'}}/>
                <div style={{display:'flex', justifyContent:'space-between', fontWeight:600}}><span>TOTAL</span><span>$1,240.00</span></div>
                <div style={{marginTop:18, textAlign:'center', color:'#888'}}>VISA •••• 4112 · 05/21/26 14:08</div>
                {/* Highlights */}
                <div style={{position:'absolute', top:78, left:14, right:14, height:18, background:'oklch(0.72 0.14 75 / 0.25)', border:'1px solid oklch(0.72 0.14 75)', borderRadius:3}}/>
                <div style={{position:'absolute', top:180, left:14, right:14, height:18, background:'oklch(0.72 0.14 75 / 0.25)', border:'1px solid oklch(0.72 0.14 75)', borderRadius:3}}/>
              </div>
              <div style={{position:'absolute', top:10, right:10, background:'var(--ff-card)', border:'1px solid var(--ff-border)', borderRadius:6, padding:'4px 8px', fontSize:11, color:'var(--ff-fg-muted)', display:'flex', gap:8, alignItems:'center'}}>
                <Icon name="sparkle" size={12}/> OCR confidence · 94%
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="ff-stack" style={{'--ff-stack-gap':'14px'}}>
            <OcrField label="Merchant" value="Marriott Austin" confidence={98}/>
            <OcrField label="Date" value="2026-05-21" confidence={99}/>
            <OcrField label="Amount" value="$1,240.00" confidence={97} highlight/>
            <OcrField label="Tax" value="$55.00" confidence={88}/>
            <OcrField label="Card" value="VISA •••• 4112" confidence={96}/>
            <OcrField label="Category (predicted)" value="Travel · Lodging" confidence={91}/>
          </div>
          <div className="ff-alert ff-alert--warn" style={{marginTop:18}}>
            <Icon name="warning" size={18} weight="fill"/>
            <div className="ff-alert__body">
              <div className="ff-alert__title">Policy: over hotel cap</div>
              <div>3 nights at $413/night exceeds the $300/night domestic cap. This expense will be flagged.</div>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

const OcrField = ({ label, value, confidence, highlight }) => (
  <div className="ff-field">
    <div className="ff-row" style={{justifyContent:'space-between'}}>
      <label className="ff-label">{label}</label>
      <span style={{fontSize:11, color: confidence > 90 ? 'var(--ff-approved)' : 'var(--ff-pending)'}}>{confidence}% confidence</span>
    </div>
    <input className={"ff-input " + (highlight ? "ff-tnum" : "")} defaultValue={value} style={highlight ? {fontWeight:600} : {}}/>
  </div>
);

const FlaggedExpense = () => {
  return (
    <>
      <PageHead
        eyebrow="Expense · Policy violation"
        title="Marriott Austin — flagged"
        sub="EXP-2839 · Luna Park · May 21, 2026"
        actions={<>
          <button className="ff-btn"><Icon name="chat-text" size={14}/> Ask for info</button>
          <button className="ff-btn ff-btn--danger"><Icon name="x" size={14}/> Reject</button>
          <button className="ff-btn ff-btn--primary"><Icon name="check" size={14}/> Approve override</button>
        </>}
      />
      <div className="ff-alert ff-alert--error" style={{marginBottom:16}}>
        <Icon name="warning-octagon" size={20} weight="fill"/>
        <div className="ff-alert__body">
          <div className="ff-alert__title">3 policy violations detected</div>
          <div>Hotel rate $413/night (cap $300) · Stay extended past sanctioned trip window · Missing project code</div>
        </div>
      </div>

      <div className="ff-grid" style={{gridTemplateColumns:'1.6fr 1fr', gap:16}}>
        <Card title="Receipt + transcription">
          <div className="ff-grid ff-grid--2">
            <div style={{height:300, background:'var(--ff-card-2)', border:'1px solid var(--ff-border)', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--ff-font-mono)', fontSize:11, color:'var(--ff-fg-muted)'}}>receipt.jpg</div>
            <div style={{fontSize:13, lineHeight:1.6}}>
              <DetailRow label="Total"><span style={{fontFamily:'var(--ff-font-sans)', fontWeight:700, fontSize:24, letterSpacing:'-0.025em'}} className="ff-tnum">$1,240.00</span></DetailRow>
              <div style={{height:12}}/>
              <DetailRow label="Nights">3 × $413.33</DetailRow>
              <div style={{height:12}}/>
              <DetailRow label="Policy cap">$300/night</DetailRow>
              <div style={{height:12}}/>
              <DetailRow label="Overage"><span style={{color:'var(--ff-rejected)'}} className="ff-tnum">+$340.00</span></DetailRow>
            </div>
          </div>
        </Card>
        <Card title="Override note">
          <textarea className="ff-textarea" defaultValue="Customer offsite — only room block available. Approving as one-time exception."/>
          <div style={{fontSize:12, color:'var(--ff-fg-muted)', marginTop:10}}>Override will be recorded in audit log under Maren Okafor (Finance Admin).</div>
        </Card>
      </div>
    </>
  );
};

const BulkImport = () => (
  <>
    <PageHead eyebrow="Expenses" title="Bulk import" sub="Upload a CSV of expenses to import in one batch."/>
    <div className="ff-grid" style={{gridTemplateColumns:'1.5fr 1fr', gap:24}}>
      <Card>
        <div style={{border:'1.5px dashed var(--ff-border-strong)', borderRadius:12, padding:48, textAlign:'center'}}>
          <div className="ff-empty__icon" style={{margin:'0 auto'}}><Icon name="file-csv" size={26}/></div>
          <div style={{fontSize:16, fontWeight:600, marginTop:12}}>Drop your CSV here</div>
          <div style={{fontSize:13, color:'var(--ff-fg-muted)', marginTop:4}}>Up to 5,000 rows · UTF-8 · max 10 MB</div>
          <button className="ff-btn ff-btn--primary" style={{marginTop:18}}><Icon name="upload-simple" size={14}/> Choose file</button>
          <div style={{marginTop:12, fontSize:12}}><a href="#">Download CSV template</a></div>
        </div>
      </Card>
      <Card title="Expected columns">
        <table className="ff-table ff-table--compact">
          <thead><tr><th>Column</th><th>Required</th></tr></thead>
          <tbody>
            {[
              ["date", "Yes"], ["merchant", "Yes"], ["amount", "Yes"],
              ["category", "Yes"], ["memo", "No"], ["card_last4", "No"],
              ["owner_email", "No"], ["project_code", "No"]
            ].map(([k, r], i) => (
              <tr key={i}><td className="ff-mono" style={{fontSize:12}}>{k}</td><td>{r}</td></tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  </>
);

Object.assign(window, { ExpenseList, ExpenseDetail, NewExpense, OcrReview, FlaggedExpense, BulkImport });
