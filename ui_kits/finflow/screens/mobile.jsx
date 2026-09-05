/* Employee phone surfaces use the same records, draft form and transitions. */
const noop = () => {};
const MobileFrame = ({ children, fullbleed = false }) => (
  <div className={fullbleed ? "ff-phone" : "ff-phone ff-phone--frame"}>
    <main className="ff-phone-content">{children}</main>
  </div>
);
const MobileTabBar = ({ onNav = noop, current }) => (
  <nav className="ff-phone-nav" aria-label="Mobile navigation">
    {[
      ["home", "Home"],
      ["expenses", "Expenses"],
      ["cards", "Card"],
    ].map(([id, label]) => (
      <button
        key={id}
        className="ff-btn ff-btn--ghost"
        aria-current={current === id ? "page" : undefined}
        onClick={() => onNav(id)}
      >
        {label}
      </button>
    ))}
  </nav>
);
const MobileSignIn = ({ onNav = noop, fullbleed = false }) => (
  <MobileFrame fullbleed={fullbleed}>
    <BrandMark variant="horizontal" size={28} />
    <h1>FinFlow employee demo</h1>
    <p>
      Preview Corey Anderson’s expenses. This demonstration uses browser-local
      data and does not sign in to a live account.
    </p>
    <button className="ff-btn ff-btn--primary" onClick={() => onNav("home")}>
      Open employee demo
    </button>
  </MobileFrame>
);
const MobileHome = ({ onNav = noop, fullbleed = false }) => {
  const [data] = useFinFlow();
  const mine = data.expenses.filter(
    (expense) => expense.who === data.me.employee.name,
  );
  return (
    <MobileFrame fullbleed={fullbleed}>
      <h1>Hi, Corey.</h1>
      <Card title="Your recorded expenses">
        <strong style={{ fontSize: 30 }}>
          <Money
            value={mine.reduce((sum, item) => sum + item.amountCents, 0) / 100}
          />
        </strong>
        <p>{mine.length} records · all recorded dates</p>
      </Card>
      <div className="ff-action-row">
        <button className="ff-btn ff-btn--primary" onClick={() => onNav("new")}>
          New expense
        </button>
        <button className="ff-btn" onClick={() => onNav("snap")}>
          Attach receipt
        </button>
      </div>
      <h2>Recent expenses</h2>
      <MobileRecordList expenses={mine.slice(0, 6)} onNav={onNav} />
      <MobileTabBar current="home" onNav={onNav} />
    </MobileFrame>
  );
};
const MobileRecordList = ({ expenses, onNav }) => (
  <div className="ff-stack">
    {expenses.length ? (
      expenses.map((expense) => (
        <button
          className="ff-mobile-record"
          key={expense.id}
          onClick={() => onNav("timeline", expense.id)}
        >
          <span>
            <strong>{expense.merchant}</strong>
            <span className="ff-muted">
              {expense.id} · {fmtDate(expense.date)}
            </span>
          </span>
          <span>
            <Money value={expense.amount} />
            <StatusBadge status={expense.status} />
          </span>
        </button>
      ))
    ) : (
      <p>No matching expenses.</p>
    )}
  </div>
);
const MobileSnapReceipt = ({ onNav = noop, fullbleed = false }) => (
  <MobileFrame fullbleed={fullbleed}>
    <button
      className="ff-btn"
      aria-label="Close receipt capture"
      onClick={() => onNav("home")}
    >
      ← Back
    </button>
    <h1>Receipt capture</h1>
    <p>
      Choose a receipt file in the expense form, or attach the provided sample.
      Live camera recognition and OCR are unavailable.
    </p>
    <img
      className="ff-receipt-image"
      src="assets/starbucks-market-st.jpg"
      alt="Sample Starbucks receipt"
    />
    <button className="ff-btn ff-btn--primary" onClick={() => onNav("new")}>
      Continue to expense
    </button>
  </MobileFrame>
);
const MobileNewExpense = ({ onNav = noop, fullbleed = false, expenseId }) => (
  <MobileFrame fullbleed={fullbleed}>
    <h1>{expenseId ? "Correct expense" : "New expense"}</h1>
    <ExpenseForm
      sample
      expenseId={expenseId}
      onBack={() => onNav("home")}
      onSubmitted={(result) => onNav("success", result.expense.id)}
    />
  </MobileFrame>
);
const MobileSubmitSuccess = ({
  onNav = noop,
  fullbleed = false,
  expenseId,
}) => {
  const [data] = useFinFlow();
  const expense = data.expenses.find(
    (item) =>
      item.id === expenseId &&
      item.who === data.me.employee.name &&
      data.operations.some(
        (operation) =>
          operation.type === "submitted" && operation.ids.includes(item.id),
      ),
  );
  return (
    <MobileFrame fullbleed={fullbleed}>
      <h1>{expense ? "Submitted" : "Submission unavailable"}</h1>
      {expense ? (
        <>
          <p>
            {expense.id} · {expense.merchant} · <Money value={expense.amount} />
          </p>
          <p>
            Submission recorded. Current review status:{" "}
            <StatusBadge status={expense.status} />
          </p>
          <p>
            {expense.paymentSource === "personal"
              ? "Only approved personal expenses are eligible for reimbursement."
              : "Card reconciliation is separate from approval."}
          </p>
          <button
            className="ff-btn ff-btn--primary"
            onClick={() => onNav("timeline", expense.id)}
          >
            Track status
          </button>
        </>
      ) : (
        <p>Choose an expense from your list.</p>
      )}
      <button className="ff-btn" onClick={() => onNav("home")}>
        Back to home
      </button>
    </MobileFrame>
  );
};
const MobileStatusTimeline = ({
  onNav = noop,
  fullbleed = false,
  expenseId,
}) => {
  const [data] = useFinFlow();
  const expense = data.expenses.find(
    (item) => item.id === expenseId && item.who === data.me.employee.name,
  );
  const payout =
    expense &&
    data.reimbursements.find((item) => item.expenseIds.includes(expense.id));
  return (
    <MobileFrame fullbleed={fullbleed}>
      <button className="ff-btn" onClick={() => onNav("expenses")}>
        ← My expenses
      </button>
      <h1>{expense?.merchant || "Record unavailable"}</h1>
      {expense && (
        <>
          <p>
            {expense.id} · <Money value={expense.amount} />
          </p>
          <Card title="Status">
            <StatusBadge status={expense.status} />
            <p>
              {fmtDate(expense.date)} ·{" "}
              {expense.paymentSource === "personal"
                ? "Personal funds"
                : `Card •••• ${expense.cardLast4}`}
            </p>
            <p>
              {data.categories.find((cat) => cat.id === expense.cat)?.name} ·{" "}
              {expense.memo}
            </p>
            <p>
              Policy:{" "}
              {expense.policy === "ok" ? "No exception" : "Review required"}
            </p>
            {expense.decisionNote && (
              <p>Decision reason: {expense.decisionNote}</p>
            )}
            {payout && (
              <p>
                Reimbursement {payout.id}: {payout.status}
                {payout.date && ` · ${fmtDate(payout.date)}`}
              </p>
            )}
            <p>Accounting: {expense.accountingState}</p>
          </Card>
          <ReceiptEvidence expense={expense} />
          {expense.status === "needs-info" && (
            <button
              className="ff-btn ff-btn--primary"
              onClick={() => onNav("new", expense.id)}
            >
              Correct and resubmit
            </button>
          )}
          <h2>Activity</h2>
          {data.events
            .filter((event) => event.expenseId === expense.id)
            .map((event) => (
              <p key={event.id}>
                {event.action} · {event.actor} · {event.note}
              </p>
            ))}
        </>
      )}
    </MobileFrame>
  );
};
const MobileExpenses = ({ onNav = noop, fullbleed = false }) => {
  const [data] = useFinFlow();
  const [filter, setFilter] = React.useState("all");
  const mine = data.expenses.filter(
    (expense) =>
      expense.who === data.me.employee.name &&
      (filter === "all" || expense.status === filter),
  );
  return (
    <MobileFrame fullbleed={fullbleed}>
      <h1>My expenses</h1>
      <Field id="mobile-filter" label="Review status">
        <select
          className="ff-select"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          {["all", "pending", "needs-info", "approved", "rejected"].map(
            (status) => (
              <option key={status}>{status}</option>
            ),
          )}
        </select>
      </Field>
      <MobileRecordList expenses={mine} onNav={onNav} />
      <MobileTabBar current="expenses" onNav={onNav} />
    </MobileFrame>
  );
};
const MobileCards = ({ onNav = noop, fullbleed = false }) => {
  const [data, actions] = useFinFlow();
  const [error, setError] = React.useState("");
  const card = data.cards.find((item) => item.holder === data.me.employee.name);
  return (
    <MobileFrame fullbleed={fullbleed}>
      <h1>My card</h1>
      {card && (
        <Card title={`Card •••• ${card.last4}`}>
          <StatusBadge status={card.status} />
          <p>Demo card control · no provider is connected.</p>
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
      )}
      <MobileTabBar current="cards" onNav={onNav} />
    </MobileFrame>
  );
};
Object.assign(window, {
  MobileSignIn,
  MobileHome,
  MobileSnapReceipt,
  MobileNewExpense,
  MobileSubmitSuccess,
  MobileStatusTimeline,
  MobileExpenses,
  MobileCards,
});
