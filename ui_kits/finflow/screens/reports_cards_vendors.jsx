/* Period summaries, cards and vendor detail all use the canonical demo ledger. */
const ReportsHome = ({ route = {} }) => {
  const [data] = useFinFlow();
  const [start, setStart] = React.useState(route.start || "2026-05-01");
  const [end, setEnd] = React.useState(route.end || FF_STORE.today());
  const valid =
    FF_STORE.validDate(start) && FF_STORE.validDate(end) && start <= end;
  const items = valid
    ? FF_STORE.selectors
        .expenses(data)
        .filter(
          (expense) =>
            expense.date >= start &&
            expense.date <= end &&
            expense.status === "approved",
        )
    : [];
  const total = items.reduce((sum, item) => sum + item.amountCents, 0);
  const categories = data.categories.map((cat) => ({
    ...cat,
    cents: items
      .filter((expense) => expense.cat === cat.id)
      .reduce((sum, item) => sum + item.amountCents, 0),
  }));
  const exportCsv = () => {
    const escape = (value) =>
      `"${String(value)
        .replace(/^[=+@-]/, "'$&")
        .replaceAll('"', '""')}"`;
    const rows = [
      ["id", "merchant", "owner", "date", "amount_usd", "accounting_state"],
      ...items.map((expense) => [
        expense.id,
        expense.merchant,
        expense.who,
        expense.date,
        (expense.amountCents / 100).toFixed(2),
        expense.accountingState,
      ]),
    ];
    const url = URL.createObjectURL(
      new Blob([rows.map((row) => row.map(escape).join(",")).join("\r\n")], {
        type: "text/csv",
      }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = `finflow-${start}-${end}.csv`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  return (
    <>
      <PageHead
        title="Approved expense report"
        sub="Current demo role · USD · approved expenses in the selected period"
        actions={
          <button
            disabled={!valid || !items.length}
            className="ff-btn ff-btn--primary"
            onClick={exportCsv}
          >
            Export displayed records (CSV)
          </button>
        }
      />
      <div className="ff-filter-row">
        <Field id="report-start" label="From">
          <input
            className="ff-input"
            type="date"
            value={start}
            onChange={(event) => setStart(event.target.value)}
          />
        </Field>
        <Field id="report-end" label="Through">
          <input
            className="ff-input"
            type="date"
            value={end}
            onChange={(event) => setEnd(event.target.value)}
          />
        </Field>
      </div>
      {!valid && (
        <p role="alert" className="ff-form-error">
          Choose a valid date interval.
        </p>
      )}
      <StatRow
        items={[
          { label: "Approved total", value: <Money value={total / 100} /> },
          { label: "Included records", value: items.length },
          {
            label: "Accounting-ready",
            value: items.filter((item) => item.accountingState === "ready")
              .length,
          },
        ]}
      />
      <Card title={`Category totals · ${start} through ${end}`}>
        <TableRegion label="Category totals">
          <table className="ff-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Amount</th>
                <th>Share</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat.id}>
                  <td>{cat.name}</td>
                  <td>
                    <Money value={cat.cents / 100} />
                  </td>
                  <td>
                    {total ? ((cat.cents / total) * 100).toFixed(1) : "0.0"}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableRegion>
      </Card>
      <Card title="Included expenses">
        {items.length ? (
          items.map((expense) => (
            <p key={expense.id}>
              <ExpenseLink expense={expense} /> · {expense.id} ·{" "}
              <Money value={expense.amount} />
            </p>
          ))
        ) : (
          <p>No approved expenses in this period.</p>
        )}
      </Card>
    </>
  );
};
const SavedReport = (props) => <ReportsHome {...props} />;
const ExportReport = (props) => <ReportsHome {...props} />;
const ReportBuilder = () => (
  <EmptyState
    icon="chart-bar"
    title="Custom report builder is not connected"
    body="Use the period report to inspect and export recorded expenses."
    action={
      <button className="ff-btn" onClick={() => ffGo("reports")}>
        Open report
      </button>
    }
  />
);
const CardsList = () => {
  const [data] = useFinFlow();
  const cards = FF_STORE.selectors.cards(data);
  return (
    <>
      <PageHead
        title={currentDemoRole() === "finance" ? "Cards" : "My cards"}
        sub="Demo card records · no issuing provider connected"
      />
      <div className="ff-grid ff-grid--3">
        {cards.map((card) => (
          <Card key={card.id} title={`•••• ${card.last4}`}>
            <p>{card.holder}</p>
            <StatusBadge status={card.status} />
            <p>
              Limit: <Money value={card.limit} />
            </p>
            <button
              className="ff-btn"
              onClick={() => ffGo("card-detail", { cardId: card.id })}
            >
              View card
            </button>
          </Card>
        ))}
      </div>
    </>
  );
};
const CardDetail = ({ route = {} }) => {
  const [data, actions] = useFinFlow();
  const [error, setError] = React.useState("");
  const card = FF_STORE.selectors
    .cards(data)
    .find((item) => item.id === route.cardId);
  if (!card) return <MissingRecord />;
  const items = FF_STORE.selectors
    .expenses(data)
    .filter(
      (expense) =>
        expense.paymentSource === "card" &&
        expense.who === card.holder &&
        expense.cardLast4 === card.last4,
    );
  return (
    <>
      <PageHead title={`Card •••• ${card.last4}`} sub={card.holder} />
      <Card title="Card control">
        <StatusBadge status={card.status} />
        <p>Changes are simulated in this browser.</p>
        <button
          className="ff-btn"
          onClick={() => {
            try {
              actions.setCardStatus(
                card.id,
                card.status === "active" ? "frozen" : "active",
              );
              setError("");
            } catch (error) {
              setError(error.message);
            }
          }}
        >
          {card.status === "active" ? "Freeze card" : "Unfreeze card"}
        </button>
        {error && <p role="alert">{error}</p>}
      </Card>
      <Card title="Linked recorded expenses">
        {items.map((expense) => (
          <p key={expense.id}>
            <ExpenseLink expense={expense} /> · {expense.id} ·{" "}
            <Money value={expense.amount} />
          </p>
        ))}
        {!items.length && <p>No linked expenses.</p>}
      </Card>
    </>
  );
};
const IssueCard = () => (
  <EmptyState
    icon="credit-card"
    title="Card issuance is unavailable"
    body="A card issuing provider is required. Existing demo cards support local freeze and unfreeze."
  />
);
const VendorsList = () => {
  const [data] = useFinFlow();
  return (
    <>
      <PageHead
        title="Vendor directory"
        sub="Recorded expense totals across all dates"
      />
      <TableRegion label="Vendors">
        <table className="ff-table">
          <thead>
            <tr>
              <th>Vendor</th>
              <th>Recorded amount</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.vendors.map((vendor) => (
              <tr key={vendor.id}>
                <td>{vendor.name}</td>
                <td>
                  <Money
                    value={
                      data.expenses
                        .filter(
                          (expense) =>
                            expense.merchant === vendor.name ||
                            expense.merchant.startsWith(vendor.name + " "),
                        )
                        .reduce((sum, item) => sum + item.amountCents, 0) / 100
                    }
                  />
                </td>
                <td>
                  <button
                    className="ff-btn"
                    onClick={() =>
                      ffGo("vendor-detail", { vendorId: vendor.id })
                    }
                  >
                    View {vendor.name}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableRegion>
    </>
  );
};
const VendorDetail = ({ route = {} }) => {
  const [data] = useFinFlow();
  const vendor = data.vendors.find((item) => item.id === route.vendorId);
  if (!vendor) return <MissingRecord />;
  const items = data.expenses.filter(
    (expense) =>
      expense.merchant === vendor.name ||
      expense.merchant.startsWith(vendor.name + " "),
  );
  return (
    <>
      <PageHead title={vendor.name} sub="Expenses recorded for this vendor" />
      <Card title="Transactions">
        {items.map((expense) => (
          <p key={expense.id}>
            <ExpenseLink expense={expense} /> · {expense.id} · {expense.memo} ·{" "}
            <Money value={expense.amount} />
          </p>
        ))}
        {!items.length && <p>No recorded expenses.</p>}
        <p className="ff-muted">
          Vendor invoice payments are outside this expense reimbursement
          demonstration.
        </p>
      </Card>
    </>
  );
};
Object.assign(window, {
  ReportsHome,
  ReportBuilder,
  SavedReport,
  ExportReport,
  CardsList,
  CardDetail,
  IssueCard,
  VendorsList,
  VendorDetail,
});
