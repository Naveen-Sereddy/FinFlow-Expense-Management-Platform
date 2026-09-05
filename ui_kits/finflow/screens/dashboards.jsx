/* Summaries derive from the same scoped ledger as list/detail screens. */
const ScopeOverview = () => {
  const [data] = useFinFlow();
  const role = currentDemoRole();
  const expenses = FF_STORE.selectors.expenses(data);
  const pending = expenses.filter((expense) => expense.status === "pending");
  const corrections = expenses.filter(
    (expense) => expense.status === "needs-info",
  );
  const review = expenses.filter((expense) =>
    FF_STORE.selectors.canReview(expense, data),
  );
  return (
    <>
      <PageHead
        title={
          role === "finance"
            ? "Finance overview"
            : role === "manager"
              ? "Sales team overview"
              : "My expenses overview"
        }
        sub="Browser-local ledger · all recorded dates · USD"
        actions={
          <button
            className="ff-btn ff-btn--primary"
            onClick={() => ffGo("new-expense")}
          >
            New expense
          </button>
        }
      />
      <div className="ff-grid ff-grid--3">
        <Card title="Pending review">
          <strong style={{ fontSize: 28 }}>{pending.length}</strong>
          <p>Submitted expenses awaiting a decision</p>
          <button
            className="ff-btn"
            onClick={() => ffGo("expenses", { status: "pending" })}
          >
            View pending expenses
          </button>
        </Card>
        <Card title="Needs correction">
          <strong style={{ fontSize: 28 }}>{corrections.length}</strong>
          <p>Returned to the submitter with a reason</p>
          <button
            className="ff-btn"
            onClick={() => ffGo("expenses", { status: "needs-info" })}
          >
            View corrections
          </button>
        </Card>
        <Card title="Recorded total">
          <strong style={{ fontSize: 28 }}>
            <Money
              value={
                expenses.reduce((sum, item) => sum + item.amountCents, 0) / 100
              }
            />
          </strong>
          <p>{expenses.length} expenses, including rejected records</p>
          <button className="ff-btn" onClick={() => ffGo("expenses")}>
            View ledger
          </button>
        </Card>
      </div>
      {role !== "employee" && (
        <Card title="Ready for your review">
          {review.length ? (
            review.slice(0, 5).map((expense) => (
              <p key={expense.id}>
                <ExpenseLink expense={expense} destination="approval-detail" />{" "}
                · {expense.id} · {expense.who} ·{" "}
                <Money value={expense.amount} />
              </p>
            ))
          ) : (
            <p>No eligible review items.</p>
          )}
          <button className="ff-btn" onClick={() => ffGo("approvals")}>
            Open review queue
          </button>
        </Card>
      )}
      <Card title="Recent scoped activity">
        <EventTable data={data} events={scopedEvents(data).slice(0, 8)} />
      </Card>
    </>
  );
};
const FinanceDashboard = () => <ScopeOverview />;
const ManagerDashboard = () => <ScopeOverview />;
const EmployeeDashboard = () => <ScopeOverview />;
Object.assign(window, {
  FinanceDashboard,
  ManagerDashboard,
  EmployeeDashboard,
});
