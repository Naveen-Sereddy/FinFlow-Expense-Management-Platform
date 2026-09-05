/* Browser-local demo domain. Production authorization and money movement are
   deliberately absent. Mutations validate scope and transitions before saving. */
window.FF_STORE = (() => {
  const key = "ff-demo-state-v3";
  const clone = (value) => JSON.parse(JSON.stringify(value));
  const seed = clone(window.FF_DATA);
  const today = () => new Date().toISOString().slice(0, 10);
  const timestamp = () => new Date().toISOString();
  let role = "finance";
  let storageError = "";
  const listeners = new Set();
  const cents = (value) => {
    const text = String(value).trim();
    if (!/^\d+(\.\d{1,2})?$/.test(text)) return null;
    const [whole, fraction = ""] = text.split(".");
    const result = Number(whole) * 100 + Number(fraction.padEnd(2, "0"));
    return Number.isSafeInteger(result) && result > 0 && result <= 100000000
      ? result
      : null;
  };
  const validDate = (date) =>
    /^\d{4}-\d{2}-\d{2}$/.test(date || "") &&
    !Number.isNaN(Date.parse(date)) &&
    new Date(date).toISOString().slice(0, 10) === date;
  const idFor = (items, prefix, minimum) =>
    `${prefix}-${Math.max(minimum, ...items.map((item) => Number(item.id.split("-")[1]) || 0)) + 1}`;
  const normalize = (data) => {
    if (data?.schema && ![2, 3].includes(data.schema))
      throw Error("Unsupported demo schema.");
    const migrating = data?.schema !== 3;
    if (
      !data ||
      !Array.isArray(data.expenses) ||
      !Array.isArray(data.reimbursements) ||
      !Array.isArray(data.cards)
    )
      throw Error("Unreadable saved demo data.");
    data = {
      ...clone(seed),
      ...data,
      schema: 3,
      revision: data.revision || 0,
      drafts: data.drafts || {},
      operations: data.operations || [],
      events: data.events || [],
    };
    data.expenses.forEach((expense) => {
      expense.amountCents = expense.amountCents ?? cents(expense.amount);
      if (migrating) expense.amount = expense.amountCents / 100;
      expense.currency = "USD";
      expense.paymentSource ||= "card";
      if (expense.status === "flagged") expense.status = "pending";
      expense.accountingState ||= "unreconciled";
      if (migrating && !expense.receipt && expense.id === "EXP-2839")
        expense.receipt = {
          name: "Marriott Austin sample receipt",
          url: "assets/marriott-austin.jpg",
          sample: true,
        };
      if (migrating && !expense.receipt && expense.id === "EXP-2838")
        expense.receipt = {
          name: "Starbucks sample receipt",
          url: "assets/starbucks-market-st.jpg",
          sample: true,
        };
    });
    // Historical reimbursement fixtures have distinct ledger IDs, never reuse a
    // corporate-card record to make their totals appear to reconcile.
    data.reimbursements.forEach((payout) => {
      if (!payout.expenseIds?.length) {
        if (!migrating) throw Error("Missing reimbursement linkage.");
        const id = `EXP-RB-${payout.id.slice(3)}`;
        if (!data.expenses.some((expense) => expense.id === id))
          data.expenses.push({
            id,
            date: "2026-05-15",
            merchant: "Historical personal expense",
            who: payout.who,
            amount: payout.amount,
            amountCents: cents(payout.amount),
            currency: "USD",
            cat: "tr",
            status: "approved",
            policy: "ok",
            paymentSource: "personal",
            cardLast4: null,
            memo: `Historical ledger item for ${payout.id}`,
            accountingState:
              payout.status === "paid" ? "ready" : "awaiting-payment",
          });
        payout.expenseIds = [id];
      }
      if (migrating)
        payout.amountCents = payout.expenseIds.reduce(
          (sum, id) =>
            sum +
            (data.expenses.find((expense) => expense.id === id)?.amountCents ||
              0),
          0,
        );
      if (migrating) payout.amount = payout.amountCents / 100;
    });
    return data;
  };
  const assert = (data) => {
    for (const list of [data.expenses, data.reimbursements, data.cards])
      if (new Set(list.map((item) => item.id)).size !== list.length)
        throw Error("Duplicate record IDs.");
    const reimbursed = new Set();
    data.expenses.forEach((expense) => {
      if (
        !Number.isSafeInteger(expense.amountCents) ||
        expense.amountCents <= 0 ||
        expense.amount !== expense.amountCents / 100 ||
        !["pending", "needs-info", "approved", "rejected"].includes(
          expense.status,
        ) ||
        !["card", "personal"].includes(expense.paymentSource) ||
        !validDate(expense.date)
      )
        throw Error("Invalid saved expense values.");
    });
    data.reimbursements.forEach((payout) => {
      let total = 0;
      payout.expenseIds.forEach((id) => {
        const expense = data.expenses.find((item) => item.id === id);
        if (
          !expense ||
          expense.who !== payout.who ||
          expense.paymentSource !== "personal" ||
          expense.status !== "approved" ||
          reimbursed.has(id)
        )
          throw Error("Inconsistent reimbursement linkage.");
        reimbursed.add(id);
        total += expense.amountCents;
      });
      if (
        !total ||
        total !== payout.amountCents ||
        payout.amount !== total / 100 ||
        !["pending", "scheduled", "paid"].includes(payout.status)
      )
        throw Error("Reimbursement total mismatch.");
    });
  };
  let state;
  try {
    const saved =
      localStorage.getItem(key) || localStorage.getItem("ff-demo-state-v2");
    state = normalize(saved ? JSON.parse(saved) : seed);
    assert(state);
  } catch (error) {
    state = normalize(seed);
    storageError =
      "Saved demo data could not be read. Existing storage was preserved; changes are disabled until you reset the demo.";
  }
  const emit = () => {
    window.FF_DATA = state;
    listeners.forEach((listener) => listener());
  };
  const person = (data = state) => data.me[role];
  const inScope = (expense, activeRole = role, data = state) =>
    activeRole === "finance" ||
    expense.who === data.me[activeRole].name ||
    (activeRole === "manager" &&
      data.employees.some(
        (employee) =>
          employee.name === expense.who && employee.team === "Sales",
      ));
  const canReview = (expense, data = state) =>
    role !== "employee" &&
    inScope(expense, role, data) &&
    expense.who !== person(data).name &&
    expense.status === "pending";
  const transact = (change) => {
    if (storageError) throw Error(storageError);
    // Read the latest revision before each mutation, including when a storage
    // event has not yet reached this tab. localStorage is still not a database.
    const saved = localStorage.getItem(key);
    const next = saved ? normalize(JSON.parse(saved)) : clone(state);
    const result = change(next);
    assert(next);
    next.revision += 1;
    try {
      localStorage.setItem(key, JSON.stringify(next));
    } catch {
      throw Error(
        "Could not save in this browser. Free browser storage, then retry. Your form is still open.",
      );
    }
    state = next;
    emit();
    return result;
  };
  const event = (next, action, expense, note = "") => {
    const entry = {
      id: `EV-${next.revision + 1}-${next.events.length + 1}`,
      ts: timestamp(),
      actor: person(next).name,
      action,
      expenseId: expense.id,
      owner: expense.who,
      note,
      target: `${expense.id} · ${expense.merchant}`,
    };
    next.events.unshift(entry);
  };
  const operation = (next, type, ids) => {
    const result = {
      id: `OP-${next.revision + 1}-${next.operations.length + 1}`,
      type,
      ids: [...ids],
      actor: person(next).name,
      ts: timestamp(),
    };
    next.operations.unshift(result);
    return result;
  };
  const validateExpense = (input) => {
    const errors = {};
    if (!input.merchant?.trim()) errors.merchant = "Enter the merchant.";
    if (cents(input.amount) === null)
      errors.amount =
        "Enter an amount from $0.01 to $1,000,000 with at most two decimals.";
    if (!validDate(input.date) || input.date > today())
      errors.date = "Enter a valid date that is not in the future.";
    if (!state.categories.some((item) => item.id === input.cat))
      errors.cat = "Choose a category.";
    if (!["personal", "card"].includes(input.paymentSource))
      errors.paymentSource = "Choose a payment source.";
    if (
      input.paymentSource === "card" &&
      !state.cards.some(
        (card) => card.holder === person().name && card.status === "active",
      )
    )
      errors.paymentSource = "You need an active card, or choose Personal.";
    return errors;
  };
  const actions = {
    setRole(nextRole) {
      if (!seed.me[nextRole]) throw Error("Unknown demo role.");
      role = nextRole;
    },
    reset() {
      localStorage.setItem(key, JSON.stringify(normalize(seed)));
      storageError = "";
      state = normalize(seed);
      emit();
    },
    saveDraft(input, expenseId = "new") {
      return transact((next) => {
        next.drafts[`${person(next).name}:${expenseId}`] = clone(input);
      });
    },
    submitExpense(input, expenseId) {
      const errors = validateExpense(input);
      if (Object.keys(errors).length)
        throw Error(Object.values(errors).join(" "));
      return transact((next) => {
        let expense =
          expenseId && next.expenses.find((item) => item.id === expenseId);
        if (
          expenseId &&
          (!expense ||
            expense.who !== person(next).name ||
            expense.status !== "needs-info")
        )
          throw Error(
            "Only your expenses awaiting correction can be resubmitted.",
          );
        const resubmitted = Boolean(expense);
        if (!expense) {
          expense = {
            id: idFor(next.expenses, "EXP", 2841),
            who: person(next).name,
          };
          next.expenses.unshift(expense);
        }
        const card = next.cards.find(
          (item) => item.holder === expense.who && item.status === "active",
        );
        if (input.paymentSource === "card" && !card)
          throw Error(
            "Your card is no longer active. Choose Personal or retry after unfreezing.",
          );
        Object.assign(expense, {
          merchant: input.merchant.trim(),
          date: input.date,
          amountCents: cents(input.amount),
          amount: cents(input.amount) / 100,
          currency: "USD",
          cat: input.cat,
          memo: input.memo?.trim() || "",
          paymentSource: input.paymentSource,
          cardLast4: input.paymentSource === "card" ? card.last4 : null,
          receipt: input.receipt || null,
          status: "pending",
          policy: input.receipt ? "ok" : "needs",
          accountingState: "unreconciled",
          decisionNote: null,
        });
        delete next.drafts[`${expense.who}:${expenseId || "new"}`];
        event(next, resubmitted ? "Resubmitted" : "Submitted", expense);
        const result = operation(next, "submitted", [expense.id]);
        return { expense, operation: result };
      });
    },
    decideExpenses(ids, decision, note = "") {
      return transact((next) => {
        if (
          !ids.length ||
          new Set(ids).size !== ids.length ||
          !["approved", "needs-info", "rejected"].includes(decision)
        )
          throw Error("Choose eligible expenses and a valid decision.");
        const expenses = ids.map((id) =>
          next.expenses.find((expense) => expense.id === id),
        );
        if (expenses.some((expense) => !expense || !canReview(expense, next)))
          throw Error(
            "An expense is no longer eligible or is outside your review scope. Refresh the selection.",
          );
        if (
          (decision !== "approved" ||
            expenses.some((expense) => expense.policy !== "ok")) &&
          !note.trim()
        )
          throw Error("Enter a reason for this decision or policy override.");
        expenses.forEach((expense) => {
          Object.assign(expense, {
            status: decision,
            decidedAt: timestamp(),
            decidedBy: person(next).name,
            decisionNote: note.trim(),
            accountingState:
              decision === "approved"
                ? expense.paymentSource === "personal"
                  ? "awaiting-payment"
                  : "awaiting-reconciliation"
                : "unreconciled",
          });
          event(
            next,
            decision === "approved"
              ? "Approved"
              : decision === "needs-info"
                ? "Correction requested"
                : "Rejected",
            expense,
            note.trim(),
          );
          if (decision === "approved" && expense.paymentSource === "personal")
            next.reimbursements.unshift({
              id: idFor(next.reimbursements, "RB", 104),
              who: expense.who,
              amountCents: expense.amountCents,
              amount: expense.amount,
              expenseIds: [expense.id],
              status: "pending",
              date: null,
            });
        });
        return operation(next, decision, ids);
      });
    },
    schedulePayout(ids, date, memo) {
      return transact((next) => {
        if (role !== "finance")
          throw Error("Only finance can schedule reimbursements.");
        if (!ids.length || new Set(ids).size !== ids.length)
          throw Error("Select at least one eligible reimbursement.");
        if (!validDate(date) || date < today())
          throw Error("Choose today or a future schedule date.");
        const payouts = ids.map((id) =>
          next.reimbursements.find((item) => item.id === id),
        );
        if (payouts.some((payout) => !payout || payout.status !== "pending"))
          throw Error(
            "A selected reimbursement has already been scheduled or paid.",
          );
        payouts.forEach((payout) => {
          Object.assign(payout, {
            status: "scheduled",
            date,
            memo: memo.trim(),
          });
          payout.expenseIds.forEach((id) =>
            event(
              next,
              "Reimbursement scheduled",
              next.expenses.find((expense) => expense.id === id),
              `${payout.id} · ${date}`,
            ),
          );
        });
        return operation(next, "payout-scheduled", ids);
      });
    },
    reconcile(id) {
      return transact((next) => {
        const expense = next.expenses.find((item) => item.id === id);
        if (
          role !== "finance" ||
          !expense ||
          expense.status !== "approved" ||
          expense.paymentSource !== "card" ||
          expense.accountingState === "ready"
        )
          throw Error("This record cannot be reconciled.");
        expense.accountingState = "ready";
        event(next, "Card reconciled (demo)", expense);
      });
    },
    setCardStatus(id, status) {
      return transact((next) => {
        const card = next.cards.find((item) => item.id === id);
        if (
          !card ||
          (role !== "finance" && card.holder !== person(next).name) ||
          !["active", "frozen"].includes(status)
        )
          throw Error("This card action is unavailable.");
        card.status = status;
        next.events.unshift({
          id: `EV-${next.revision + 1}`,
          ts: timestamp(),
          actor: person(next).name,
          owner: card.holder,
          action: `Card ${status} (demo)`,
          cardId: card.id,
          target: `Card •••• ${card.last4}`,
        });
      });
    },
  };
  window.addEventListener("storage", (event) => {
    if (event.key !== key || !event.newValue) return;
    try {
      const next = normalize(JSON.parse(event.newValue));
      assert(next);
      storageError = "";
      state = next;
      emit();
    } catch {
      storageError =
        "Saved data changed incompatibly in another tab. Reload to inspect it.";
      state = { ...state };
      emit();
    }
  });
  emit();
  return {
    getState: () => state,
    getRole: () => role,
    getStorageError: () => storageError,
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    actions,
    today,
    cents,
    validDate,
    validateExpense,
    assert,
    selectors: {
      inScope,
      canReview,
      expenses: (data = state) =>
        data.expenses.filter((expense) => inScope(expense, role, data)),
      reimbursements: (data = state) =>
        data.reimbursements.filter(
          (payout) => role === "finance" || payout.who === person(data).name,
        ),
      cards: (data = state) =>
        data.cards.filter(
          (card) => role === "finance" || card.holder === person(data).name,
        ),
    },
  };
})();
