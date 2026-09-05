/* Deliberate review selection and simulated personal-expense reimbursement. */
const ApprovalsQueue = () => {
  const [data] = useFinFlow();
  const [query, setQuery] = React.useState("");
  const [selected, setSelected] = React.useState([]);
  const items = FF_STORE.selectors
    .expenses(data)
    .filter(
      (expense) =>
        FF_STORE.selectors.canReview(expense, data) &&
        `${expense.id} ${expense.merchant} ${expense.who}`
          .toLowerCase()
          .includes(query.toLowerCase()),
    )
    .sort((a, b) => a.date.localeCompare(b.date));
  React.useEffect(() => {
    setSelected([]);
  }, [query, data.revision]);
  const selection = items.filter((item) => selected.includes(item.id));
  return (
    <>
      <PageHead
        title="Approvals queue"
        sub={`${items.length} eligible records · ${currentDemoRole() === "manager" ? "Sales team, excluding your own expenses" : "Workspace, excluding your own expenses"}`}
        actions={
          <button className="ff-btn" onClick={() => ffGo("approval-history")}>
            Decision history
          </button>
        }
      />
      <Field id="review-query" label="Filter review queue">
        <input
          className="ff-input"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </Field>
      <p className="ff-muted" role="status">
        {selection.length} selected ·{" "}
        <Money
          value={
            selection.reduce((sum, item) => sum + item.amountCents, 0) / 100
          }
        />
        . Filtering clears selection.
      </p>
      <label className="ff-row">
        <input
          type="checkbox"
          checked={items.length > 0 && items.length === selection.length}
          onChange={(event) =>
            setSelected(
              event.target.checked ? items.map((item) => item.id) : [],
            )
          }
        />
        Select all visible eligible expenses
      </label>
      {items.length ? (
        items.map((expense) => (
          <div className="ff-review-row" key={expense.id}>
            <input
              type="checkbox"
              aria-label={`Select ${expense.id}`}
              checked={selected.includes(expense.id)}
              onChange={(event) =>
                setSelected((ids) =>
                  event.target.checked
                    ? [...ids, expense.id]
                    : ids.filter((id) => id !== expense.id),
                )
              }
            />
            <div>
              <ExpenseLink expense={expense} destination="approval-detail" />
              <p className="ff-muted">
                {expense.id} · {expense.who} · {fmtDate(expense.date)}
              </p>
              <p>{expense.memo}</p>
            </div>
            <div>
              <Money value={expense.amount} />
              <p>
                <StatusBadge status={expense.policy} />
              </p>
            </div>
            <button
              className="ff-btn"
              onClick={() => ffGo("approval-detail", { expenseId: expense.id })}
            >
              Review
            </button>
          </div>
        ))
      ) : (
        <EmptyState
          icon="check-circle"
          title="No matching review items"
          body="New eligible submissions appear here."
        />
      )}
      {selection.length > 0 && (
        <Card title="Decision for selected records">
          <p>{selection.map((item) => item.id).join(", ")}</p>
          <ReviewActions
            ids={selection.map((item) => item.id)}
            onDone={(operation) =>
              ffGo(
                operation.type === "approved"
                  ? "state-success"
                  : "state-rejected",
                { operationId: operation.id },
              )
            }
          />
        </Card>
      )}
    </>
  );
};
const ApprovalDetail = (props) => <ExpenseDetail {...props} />;
const ApprovalHistory = () => {
  const [data] = useFinFlow();
  const visible = new Set(
    FF_STORE.selectors.expenses(data).map((item) => item.id),
  );
  const events = data.events.filter(
    (event) =>
      visible.has(event.expenseId) &&
      ["Approved", "Rejected", "Correction requested"].includes(event.action),
  );
  return (
    <>
      <PageHead
        title="Decision history"
        sub="Recorded decisions in your current scope"
      />
      {events.length ? (
        <EventTable events={events} data={data} />
      ) : (
        <EmptyState
          icon="clock"
          title="No recorded decisions yet"
          body="Historical fixture statuses are visible on expenses; only recorded demo operations appear here."
        />
      )}
    </>
  );
};
const ReimbursementsList = () => {
  const [data] = useFinFlow();
  const items = FF_STORE.selectors.reimbursements(data);
  const sum = (status) =>
    items
      .filter((item) => item.status === status)
      .reduce((total, item) => total + item.amountCents, 0) / 100;
  return (
    <>
      <PageHead
        title={
          currentDemoRole() === "finance"
            ? "Reimbursements"
            : "My reimbursements"
        }
        sub="Personal expenses · scheduling is simulated; no money moves"
        actions={
          currentDemoRole() === "finance" && (
            <button
              className="ff-btn ff-btn--primary"
              onClick={() => ffGo("schedule-payout")}
            >
              Schedule payout
            </button>
          )
        }
      />
      <StatRow
        items={[
          { label: "Eligible", value: <Money value={sum("pending")} /> },
          { label: "Scheduled", value: <Money value={sum("scheduled")} /> },
          { label: "Historical paid", value: <Money value={sum("paid")} /> },
        ]}
      />
      {items.length ? (
        <TableRegion label="Reimbursements">
          <table className="ff-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Employee</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>
                    <a
                      href={`#screen=payout-detail&reimbursementId=${item.id}`}
                      onClick={(event) => {
                        event.preventDefault();
                        ffGo("payout-detail", { reimbursementId: item.id });
                      }}
                    >
                      {item.id}
                    </a>
                  </td>
                  <td>{item.who}</td>
                  <td>
                    <Money value={item.amount} />
                  </td>
                  <td>
                    <StatusBadge status={item.status} />
                  </td>
                  <td>{item.date ? fmtDate(item.date) : "Not scheduled"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableRegion>
      ) : (
        <EmptyState
          icon="bank"
          title="No reimbursements"
          body="Approved personal expenses appear here."
        />
      )}
    </>
  );
};
const PayoutDetail = ({ route = {} }) => {
  const [data] = useFinFlow();
  const payout = FF_STORE.selectors
    .reimbursements(data)
    .find((item) => item.id === route.reimbursementId);
  if (!payout) return <MissingRecord />;
  const expenses = data.expenses.filter((item) =>
    payout.expenseIds.includes(item.id),
  );
  return (
    <>
      <button
        className="ff-btn ff-btn--ghost"
        onClick={() => ffGo("reimburse")}
      >
        ← Reimbursements
      </button>
      <PageHead
        title={`${payout.id} · ${payout.who}`}
        sub="Simulated payout record"
      />
      <Card title="Payout">
        <div className="ff-detail-fields">
          <DetailRow label="Total">
            <Money value={payout.amount} />
          </DetailRow>
          <DetailRow label="Status">
            <StatusBadge status={payout.status} />
          </DetailRow>
          <DetailRow label="Schedule date">
            {payout.date ? fmtDate(payout.date) : "Not scheduled"}
          </DetailRow>
          <DetailRow label="Memo">{payout.memo || "—"}</DetailRow>
        </div>
      </Card>
      <Card title="Linked approved personal expenses">
        {expenses.map((expense) => (
          <p key={expense.id}>
            <ExpenseLink expense={expense} /> · {expense.id} ·{" "}
            <Money value={expense.amount} />
          </p>
        ))}
      </Card>
    </>
  );
};
const SchedulePayout = () => {
  const [data, actions] = useFinFlow();
  const [selected, setSelected] = React.useState([]);
  const [date, setDate] = React.useState(FF_STORE.today());
  const [memo, setMemo] = React.useState("");
  const [error, setError] = React.useState("");
  const eligible = data.reimbursements.filter(
    (item) => item.status === "pending",
  );
  const chosen = eligible.filter((item) => selected.includes(item.id));
  React.useEffect(() => {
    setSelected((ids) =>
      ids.filter((id) => eligible.some((item) => item.id === id)),
    );
  }, [data.revision]);
  const submit = (event) => {
    event.preventDefault();
    try {
      const operation = actions.schedulePayout(selected, date, memo);
      ffGo("state-confirm", { operationId: operation.id });
    } catch (error) {
      setError(error.message);
    }
  };
  if (currentDemoRole() !== "finance") return <MissingRecord />;
  return (
    <>
      <PageHead
        title="Schedule reimbursement"
        sub="Only pending reimbursements linked to approved personal expenses are eligible."
      />
      <form onSubmit={submit} noValidate className="ff-stack">
        {error && (
          <p role="alert" className="ff-form-error">
            {error}
          </p>
        )}
        {eligible.length ? (
          <TableRegion label="Eligible reimbursements">
            <table className="ff-table">
              <thead>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      aria-label="Select all eligible reimbursements"
                      checked={
                        eligible.length > 0 && chosen.length === eligible.length
                      }
                      onChange={(event) =>
                        setSelected(
                          event.target.checked
                            ? eligible.map((item) => item.id)
                            : [],
                        )
                      }
                    />
                  </th>
                  <th>Recipient</th>
                  <th>Expense IDs</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {eligible.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <input
                        aria-label={`Select ${item.id}`}
                        type="checkbox"
                        checked={selected.includes(item.id)}
                        onChange={(event) =>
                          setSelected((ids) =>
                            event.target.checked
                              ? [...ids, item.id]
                              : ids.filter((id) => id !== item.id),
                          )
                        }
                      />
                    </td>
                    <td>{item.who}</td>
                    <td>{item.expenseIds.join(", ")}</td>
                    <td>
                      <Money value={item.amount} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableRegion>
        ) : (
          <p>No eligible reimbursements.</p>
        )}
        <div className="ff-grid ff-grid--2">
          <Field id="payout-date" label="Schedule date">
            <input
              className="ff-input"
              type="date"
              min={FF_STORE.today()}
              value={date}
              onChange={(event) => setDate(event.target.value)}
            />
          </Field>
          <Field id="payout-memo" label="Memo">
            <input
              className="ff-input"
              value={memo}
              onChange={(event) => setMemo(event.target.value)}
            />
          </Field>
        </div>
        <Card title="Review selection">
          <p role="status">
            {chosen.length} reimbursement{chosen.length === 1 ? "" : "s"} ·{" "}
            <Money
              value={
                chosen.reduce((sum, item) => sum + item.amountCents, 0) / 100
              }
            />
          </p>
          {chosen.map((item) => (
            <p key={item.id}>
              {item.who} · {item.id} · {item.expenseIds.join(", ")} ·{" "}
              <Money value={item.amount} />
            </p>
          ))}
          <p className="ff-muted">
            This schedules a local demo record. It does not send an ACH payment.
          </p>
        </Card>
        <button
          className="ff-btn ff-btn--primary"
          disabled={!chosen.length}
          type="submit"
        >
          Schedule selected payouts (demo)
        </button>
      </form>
    </>
  );
};
Object.assign(window, {
  ApprovalsQueue,
  ApprovalDetail,
  ApprovalHistory,
  ReimbursementsList,
  PayoutDetail,
  SchedulePayout,
});
