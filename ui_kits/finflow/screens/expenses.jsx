/* Shared desktop/mobile capture and canonical expense views. */
const currentDemoRole = () => FF_STORE.getRole();
const DetailRow = ({ label, children }) => (
  <div>
    <div className="ff-eyebrow">{label}</div>
    <div>{children}</div>
  </div>
);
const Field = ({ id, label, error, children }) => (
  <div className="ff-field">
    <label htmlFor={id} className="ff-label">
      {label}
    </label>
    {React.cloneElement(children, {
      id,
      "aria-invalid": Boolean(error),
      "aria-describedby": error ? `${id}-error` : undefined,
    })}
    {error && (
      <p id={`${id}-error`} className="ff-form-error">
        {error}
      </p>
    )}
  </div>
);
const TableRegion = ({ children, label = "Records" }) => (
  <div
    className="ff-table-region"
    role="region"
    aria-label={label}
    tabIndex="0"
  >
    {children}
  </div>
);
const MissingRecord = () => (
  <EmptyState
    icon="warning"
    title="Record unavailable"
    body="This record does not exist or is outside your current demo role."
    action={
      <button className="ff-btn" onClick={() => ffGo("expenses")}>
        Back to expenses
      </button>
    }
  />
);
const ExpenseLink = ({ expense, destination = "expense-detail", children }) => (
  <a
    className="ff-record-link"
    href={`#screen=${destination}&expenseId=${encodeURIComponent(expense.id)}`}
    onClick={(event) => {
      event.preventDefault();
      ffGo(destination, { expenseId: expense.id });
    }}
  >
    {children || expense.merchant}
  </a>
);

const ExpenseList = ({ route = {} }) => {
  const [data] = useFinFlow();
  const expenses = FF_STORE.selectors.expenses(data);
  const [query, setQuery] = React.useState(route.q || "");
  const [status, setStatus] = React.useState(route.status || "all");
  const [category, setCategory] = React.useState(route.cat || "all");
  const [selected, setSelected] = React.useState([]);
  const filtered = expenses.filter(
    (expense) =>
      (status === "all" ||
        (status === "flagged"
          ? expense.policy !== "ok"
          : expense.status === status)) &&
      (category === "all" || expense.cat === category) &&
      [expense.id, expense.merchant, expense.memo, expense.who].some((value) =>
        value.toLowerCase().includes(query.toLowerCase()),
      ),
  );
  const selectedItems = filtered.filter((expense) =>
    selected.includes(expense.id),
  );
  React.useEffect(() => {
    setSelected([]);
  }, [query, status, category, data.revision]);
  React.useEffect(() => {
    if (!window.ffSaveFilters) return;
    window.ffSaveFilters({ q: query, status, cat: category });
  }, [query, status, category]);
  return (
    <>
      <PageHead
        eyebrow="Expenses"
        title={
          currentDemoRole() === "employee"
            ? "My expenses"
            : currentDemoRole() === "manager"
              ? "Sales team expenses"
              : "All expenses"
        }
        sub={`${filtered.length} records · USD · ${new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(filtered.reduce((sum, e) => sum + e.amountCents, 0) / 100)}`}
        actions={
          <button
            className="ff-btn ff-btn--primary"
            onClick={() => ffGo("new-expense")}
          >
            New expense
          </button>
        }
      />
      <div className="ff-filter-row">
        <Field id="expense-query" label="Search expenses">
          <input
            className="ff-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </Field>
        <Field id="expense-status" label="Status">
          <select
            className="ff-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            {[
              "all",
              "pending",
              "approved",
              "needs-info",
              "rejected",
              "flagged",
            ].map((value) => (
              <option key={value} value={value}>
                {value === "flagged" ? "Policy exceptions" : value}
              </option>
            ))}
          </select>
        </Field>
        <Field id="expense-cat" label="Category">
          <select
            className="ff-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">All categories</option>
            {data.categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <p className="ff-muted" role="status">
        {selectedItems.length} selected ·{" "}
        <Money
          value={selectedItems.reduce((sum, e) => sum + e.amountCents, 0) / 100}
        />
        . Changing filters clears selection.
      </p>
      {filtered.length ? (
        <TableRegion>
          <table className="ff-table">
            <thead>
              <tr>
                <th>
                  <input
                    aria-label="Select all visible expenses"
                    type="checkbox"
                    checked={
                      filtered.length > 0 &&
                      selectedItems.length === filtered.length
                    }
                    onChange={(event) =>
                      setSelected(
                        event.target.checked ? filtered.map((e) => e.id) : [],
                      )
                    }
                  />
                </th>
                <th>Expense</th>
                <th>Owner</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Review</th>
                <th>Policy</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((expense) => (
                <tr key={expense.id}>
                  <td>
                    <input
                      aria-label={`Select ${expense.id}`}
                      type="checkbox"
                      checked={selected.includes(expense.id)}
                      onChange={(event) =>
                        setSelected((ids) =>
                          event.target.checked
                            ? [...ids, expense.id]
                            : ids.filter((id) => id !== expense.id),
                        )
                      }
                    />
                  </td>
                  <td>
                    <ExpenseLink expense={expense} />
                    <div className="ff-mono">{expense.id}</div>
                  </td>
                  <td>{expense.who}</td>
                  <td>{fmtDate(expense.date)}</td>
                  <td>
                    <Money value={expense.amount} />
                  </td>
                  <td>
                    <StatusBadge status={expense.status} />
                  </td>
                  <td>
                    <StatusBadge status={expense.policy} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableRegion>
      ) : (
        <EmptyState
          icon="receipt"
          title="No matching expenses"
          body="Clear the filters or create an expense."
        />
      )}
    </>
  );
};

const ReceiptEvidence = ({ expense }) => (
  <Card title="Receipt evidence">
    {expense.receipt ? (
      <>
        <p>
          {expense.receipt.name}
          {expense.receipt.sample ? " · sample evidence" : ""}
        </p>
        {expense.receipt.url.startsWith("data:application/pdf") ? (
          <a download={expense.receipt.name} href={expense.receipt.url}>
            Download attached PDF
          </a>
        ) : (
          <a href={expense.receipt.url} target="_blank" rel="noreferrer">
            <img
              className="ff-receipt-image"
              src={expense.receipt.url}
              alt={`Receipt attached to ${expense.id}`}
            />
          </a>
        )}
      </>
    ) : (
      <p className="ff-muted">
        {expense.receiptName
          ? `${expense.receiptName}: only the filename survived the earlier demo. Request a new attachment if evidence is required.`
          : "No receipt attached. Review the policy exception before deciding."}
      </p>
    )}
  </Card>
);

const ReviewActions = ({ ids, onDone }) => {
  const [, actions] = useFinFlow();
  const [note, setNote] = React.useState("");
  const [error, setError] = React.useState("");
  const decide = (decision) => {
    try {
      const result = actions.decideExpenses(ids, decision, note);
      setError("");
      onDone(result);
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="ff-stack">
      <Field id="review-note" label="Decision reason / policy override">
        <textarea
          className="ff-textarea"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </Field>
      <p className="ff-muted">
        Required for correction, rejection, or approval of a policy exception.
        Applies to {ids.length} selected record{ids.length === 1 ? "" : "s"}.
      </p>
      {error && (
        <p role="alert" className="ff-form-error">
          {error}
        </p>
      )}
      <div className="ff-action-row">
        <button
          className="ff-btn"
          disabled={!ids.length}
          onClick={() => decide("needs-info")}
        >
          Request correction
        </button>
        <button
          className="ff-btn ff-btn--danger"
          disabled={!ids.length}
          onClick={() => decide("rejected")}
        >
          Reject
        </button>
        <button
          className="ff-btn ff-btn--primary"
          disabled={!ids.length}
          onClick={() => decide("approved")}
        >
          Approve
        </button>
      </div>
    </div>
  );
};

const ExpenseDetail = ({ route = {} }) => {
  const [data, actions] = useFinFlow();
  const [error, setError] = React.useState("");
  const expense = FF_STORE.selectors
    .expenses(data)
    .find((item) => item.id === route.expenseId);
  if (!expense) return <MissingRecord />;
  const reviewer = FF_STORE.selectors.canReview(expense, data);
  const events = data.events.filter((item) => item.expenseId === expense.id);
  return (
    <>
      <button
        className="ff-btn ff-btn--ghost"
        onClick={() => ffGo(reviewer ? "approvals" : "expenses")}
      >
        ← {reviewer ? "Review queue" : "Expenses"}
      </button>
      <PageHead
        title={expense.merchant}
        sub={`${expense.id} · ${expense.who}`}
        actions={
          expense.status === "needs-info" &&
          expense.who === data.me[currentDemoRole()].name && (
            <button
              className="ff-btn ff-btn--primary"
              onClick={() => ffGo("new-expense", { expenseId: expense.id })}
            >
              Correct and resubmit
            </button>
          )
        }
      />
      <div className="ff-grid ff-grid--2">
        <div className="ff-stack">
          <Card title="Expense">
            <div className="ff-detail-fields">
              <DetailRow label="Amount">
                <Money value={expense.amount} />
              </DetailRow>
              <DetailRow label="Date">{fmtDate(expense.date)}</DetailRow>
              <DetailRow label="Review">
                <StatusBadge status={expense.status} />
              </DetailRow>
              <DetailRow label="Policy">
                <StatusBadge status={expense.policy} />
              </DetailRow>
              <DetailRow label="Payment source">
                {expense.paymentSource === "personal"
                  ? "Personal funds"
                  : `Corporate card •••• ${expense.cardLast4}`}
              </DetailRow>
              <DetailRow label="Accounting">
                {expense.accountingState}
              </DetailRow>
              <DetailRow label="Category">
                {data.categories.find((cat) => cat.id === expense.cat)?.name}
              </DetailRow>
              <DetailRow label="Memo">{expense.memo || "—"}</DetailRow>
            </div>
            {expense.decisionNote && (
              <p>
                <strong>Decision reason:</strong> {expense.decisionNote}
              </p>
            )}
          </Card>
          <ReceiptEvidence expense={expense} />
        </div>
        <div className="ff-stack">
          {reviewer && (
            <Card title="Review decision">
              <ReviewActions
                ids={[expense.id]}
                onDone={(result) =>
                  ffGo(
                    result.type === "approved"
                      ? "state-success"
                      : "state-rejected",
                    { operationId: result.id },
                  )
                }
              />
            </Card>
          )}
          {currentDemoRole() === "finance" &&
            expense.status === "approved" &&
            expense.paymentSource === "card" &&
            expense.accountingState !== "ready" && (
              <Card title="Card reconciliation">
                <p>
                  Mark the sample transaction matched to make it
                  accounting-ready. This does not reimburse the employee.
                </p>
                <button
                  className="ff-btn"
                  onClick={() => {
                    try {
                      actions.reconcile(expense.id);
                    } catch (error) {
                      setError(error.message);
                    }
                  }}
                >
                  Reconcile card expense (demo)
                </button>
                {error && <p role="alert">{error}</p>}
              </Card>
            )}
          <Card title="Activity">
            {events.length ? (
              <ol>
                {events.map((event) => (
                  <li key={event.id}>
                    <strong>{event.action}</strong> · {event.actor}
                    <p className="ff-muted">
                      {new Date(event.ts).toLocaleString()}
                    </p>
                    {event.note && <p>{event.note}</p>}
                  </li>
                ))}
              </ol>
            ) : (
              <p>Historical fixture. No detailed event history is available.</p>
            )}
          </Card>
        </div>
      </div>
    </>
  );
};

const ExpenseForm = ({ expenseId, onSubmitted, onBack, sample = false }) => {
  const [data, actions] = useFinFlow();
  const owner = data.me[currentDemoRole()].name;
  const expense = data.expenses.find(
    (item) =>
      item.id === expenseId &&
      item.who === owner &&
      item.status === "needs-info",
  );
  const initial = () =>
    data.drafts[`${owner}:${expenseId || "new"}`] ||
    (expense
      ? { ...expense, amount: String(expense.amount) }
      : {
          merchant: "",
          amount: "",
          date: FF_STORE.today(),
          cat: "",
          memo: "",
          paymentSource: "personal",
          receipt: null,
        });
  const [form, setForm] = React.useState(initial);
  const latestForm = React.useRef(form);
  latestForm.current = form;
  const [errors, setErrors] = React.useState({});
  const [message, setMessage] = React.useState("");
  const [savingError, setSavingError] = React.useState("");
  const [reading, setReading] = React.useState(false);
  const formRef = React.useRef(null);
  const change = (key, value) => {
    const next = { ...latestForm.current, [key]: value };
    latestForm.current = next;
    setForm(next);
    setMessage("");
    try {
      actions.saveDraft(next, expenseId);
      setSavingError("");
    } catch (error) {
      setSavingError(error.message);
    }
  };
  const attach = async (file) => {
    if (!file) return;
    if (
      !["image/jpeg", "image/png", "image/webp", "application/pdf"].includes(
        file.type,
      ) ||
      file.size > 1500000
    ) {
      setSavingError("Choose a JPEG, PNG, WebP or PDF file up to 1.5 MB.");
      return;
    }
    setReading(true);
    try {
      const url = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () =>
          reject(Error("Could not read the receipt. Choose it again."));
        reader.readAsDataURL(file);
      });
      change("receipt", { name: file.name, url });
    } catch (error) {
      setSavingError(error.message);
    } finally {
      setReading(false);
    }
  };
  const submit = (event) => {
    event.preventDefault();
    const invalid = FF_STORE.validateExpense(form);
    setErrors(invalid);
    if (Object.keys(invalid).length) {
      setMessage(
        "Check the highlighted fields. Your other entries are preserved.",
      );
      setTimeout(
        () => formRef.current?.querySelector('[aria-invalid="true"]')?.focus(),
        0,
      );
      return;
    }
    try {
      const result = actions.submitExpense(form, expenseId);
      setSavingError("");
      onSubmitted(result);
    } catch (error) {
      setSavingError(error.message);
    }
  };
  if (expenseId && !expense) return <MissingRecord />;
  return (
    <form ref={formRef} onSubmit={submit} noValidate className="ff-stack">
      <div className="ff-action-row">
        <button type="button" className="ff-btn ff-btn--ghost" onClick={onBack}>
          ← Back
        </button>
        <span className="ff-muted">Draft retained in this browser.</span>
      </div>
      {sample && (
        <p className="ff-muted">
          Receipt capture uses a sample or file picker; live OCR is not
          connected.
        </p>
      )}
      {(message || savingError) && (
        <p role="alert" className="ff-form-error">
          {savingError || message}
        </p>
      )}
      <div className="ff-grid ff-grid--2">
        <Field id="capture-merchant" label="Merchant" error={errors.merchant}>
          <input
            className="ff-input"
            value={form.merchant}
            onChange={(e) => change("merchant", e.target.value)}
          />
        </Field>
        <Field id="capture-amount" label="Amount (USD)" error={errors.amount}>
          <input
            className="ff-input"
            inputMode="decimal"
            value={form.amount}
            onChange={(e) => change("amount", e.target.value)}
          />
        </Field>
        <Field id="capture-date" label="Date" error={errors.date}>
          <input
            className="ff-input"
            type="date"
            max={FF_STORE.today()}
            value={form.date}
            onChange={(e) => change("date", e.target.value)}
          />
        </Field>
        <Field id="capture-category" label="Category" error={errors.cat}>
          <select
            className="ff-select"
            value={form.cat}
            onChange={(e) => change("cat", e.target.value)}
          >
            <option value="">Choose a category</option>
            {data.categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <Field id="capture-memo" label="Business purpose / memo">
        <textarea
          className="ff-textarea"
          value={form.memo}
          onChange={(e) => change("memo", e.target.value)}
        />
      </Field>
      <Field
        id="capture-payment"
        label="Payment source"
        error={errors.paymentSource}
      >
        <select
          className="ff-select"
          value={form.paymentSource}
          onChange={(e) => change("paymentSource", e.target.value)}
        >
          <option value="personal">Personal — request reimbursement</option>
          <option value="card">Corporate card</option>
        </select>
      </Field>
      <Field
        id="capture-receipt"
        label="Receipt (JPEG, PNG, WebP or PDF; up to 1.5 MB)"
      >
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp,application/pdf"
          onChange={(e) => attach(e.target.files[0])}
        />
      </Field>
      {form.receipt && (
        <div>
          <p>{form.receipt.name}</p>
          <button
            type="button"
            className="ff-btn"
            onClick={() => change("receipt", null)}
          >
            Remove receipt
          </button>
        </div>
      )}
      <button
        type="button"
        className="ff-btn"
        onClick={() =>
          change("receipt", {
            name: "Starbucks sample receipt",
            url: "assets/starbucks-market-st.jpg",
            sample: true,
          })
        }
      >
        Attach sample receipt
      </button>
      <p className="ff-muted">
        No receipt creates a policy exception. Reviewers must record a reason to
        override it.
      </p>
      <div className="ff-action-row">
        <button
          type="button"
          className="ff-btn"
          onClick={() => {
            try {
              actions.saveDraft(form, expenseId);
              setSavingError("");
              setMessage("Draft saved.");
            } catch (error) {
              setSavingError(error.message);
            }
          }}
        >
          Save draft
        </button>
        <button
          className="ff-btn ff-btn--primary"
          disabled={reading}
          type="submit"
        >
          {expense ? "Resubmit for approval" : "Submit for approval"}
        </button>
      </div>
    </form>
  );
};
const NewExpense = ({ route = {} }) => (
  <>
    <PageHead
      title={route.expenseId ? "Correct expense" : "New expense"}
      sub="Enter the expense and attach its evidence."
    />
    <Card>
      <ExpenseForm
        expenseId={route.expenseId}
        onBack={() => ffGo("expenses")}
        onSubmitted={(result) =>
          ffGo("expense-detail", { expenseId: result.expense.id })
        }
      />
    </Card>
  </>
);
const OcrReview = () => (
  <>
    <p className="ff-muted">
      Live OCR is unavailable. Attach a receipt and enter its values.
    </p>
    <NewExpense />
  </>
);
const FlaggedExpense = ({ route = {} }) =>
  route.expenseId ? (
    <ExpenseDetail route={route} />
  ) : (
    <ExpenseList route={{ status: "flagged" }} />
  );
const BulkImport = () => (
  <EmptyState
    icon="file-csv"
    title="CSV import is not connected"
    body="Create an expense manually. Batch import is outside this demonstration."
    action={
      <button className="ff-btn" onClick={() => ffGo("new-expense")}>
        New expense
      </button>
    }
  />
);
Object.assign(window, {
  ExpenseList,
  ExpenseDetail,
  NewExpense,
  OcrReview,
  FlaggedExpense,
  BulkImport,
});
