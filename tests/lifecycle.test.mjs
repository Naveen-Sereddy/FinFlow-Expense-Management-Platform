import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
const sources = ["data.js", "store.js"].map((name) =>
  fs.readFileSync(
    new URL(`../ui_kits/finflow/${name}`, import.meta.url),
    "utf8",
  ),
);
function boot(storage = new Map(), failWrite = false) {
  const context = {
    console,
    Date,
    localStorage: {
      getItem: (key) => storage.get(key) || null,
      setItem: (key, value) => {
        if (failWrite) throw Error("quota");
        storage.set(key, value);
      },
    },
    addEventListener() {},
  };
  context.window = context;
  vm.createContext(context);
  sources.forEach((source) => vm.runInContext(source, context));
  return context.FF_STORE;
}
const draft = (store, extra = {}) => ({
  merchant: "Audit Supplies",
  amount: "123.45",
  date: store.today(),
  cat: "of",
  memo: "Changed memo",
  paymentSource: "personal",
  receipt: {
    name: "sample",
    url: "assets/starbucks-market-st.jpg",
    sample: true,
  },
  ...extra,
});
function submit(store, extra) {
  store.actions.setRole("employee");
  return store.actions.submitExpense(draft(store, extra));
}

test("seed arithmetic, unique identities, and personal reimbursement references reconcile", () => {
  const store = boot();
  store.assert(store.getState());
  assert.equal(
    new Set(store.getState().expenses.map((e) => e.id)).size,
    store.getState().expenses.length,
  );
  assert.notEqual(
    store.getState().expenses[0].merchant,
    store.getState().expenses[1].merchant,
  );
});
test("input validation catches blank, negative, fractional cents, overflow and impossible dates", () => {
  const store = boot();
  store.actions.setRole("employee");
  for (const amount of [
    "",
    "-1",
    "NaN",
    "Infinity",
    "1.001",
    "1e4",
    "1000000.01",
  ])
    assert.ok(store.validateExpense(draft(store, { amount })).amount, amount);
  assert.ok(store.validateExpense(draft(store, { date: "2026-02-30" })).date);
  assert.ok(store.validateExpense(draft(store, { merchant: "" })).merchant);
});
test("draft, exact fields, file context and unique submission persist through reload", () => {
  const storage = new Map();
  let store = boot(storage);
  store.actions.setRole("employee");
  const form = draft(store);
  store.actions.saveDraft(form);
  store = boot(storage);
  store.actions.setRole("employee");
  assert.equal(
    store.getState().drafts["Corey Anderson:new"].memo,
    "Changed memo",
  );
  const { expense } = store.actions.submitExpense(form);
  assert.equal(expense.amountCents, 12345);
  assert.equal(expense.merchant, "Audit Supplies");
  assert.equal(store.getState().drafts["Corey Anderson:new"], undefined);
  const second = store.actions.submitExpense(form);
  assert.notEqual(expense.id, second.expense.id);
  store = boot(storage);
  assert.equal(
    store.getState().expenses.find((e) => e.id === expense.id).receipt.name,
    "sample",
  );
});
test("employee self scope, manager Sales scope and reviewer self-decision restrictions", () => {
  const store = boot();
  store.actions.setRole("employee");
  assert.ok(
    store.selectors.expenses().every((e) => e.who === "Corey Anderson"),
  );
  assert.throws(
    () => store.actions.decideExpenses(["EXP-2841"], "approved"),
    /scope/,
  );
  store.actions.setRole("manager");
  assert.ok(
    store.selectors
      .expenses()
      .every((e) =>
        ["Xavier Bartlett", "Jordan Lee", "Alex Morgan", "Sam Curran"].includes(
          e.who,
        ),
      ),
  );
  assert.throws(
    () => store.actions.decideExpenses(["EXP-2829"], "approved"),
    /scope/,
  );
  assert.throws(
    () => store.actions.decideExpenses(["EXP-2836"], "approved"),
    /scope/,
  );
  store.actions.setRole("finance");
  assert.ok(store.selectors.expenses().length > 4);
});
test("correction requires a reason and only the owner can resubmit the same record", () => {
  const store = boot();
  const { expense } = submit(store);
  store.actions.setRole("finance");
  assert.throws(
    () => store.actions.decideExpenses([expense.id], "needs-info"),
    /reason/,
  );
  store.actions.decideExpenses([expense.id], "needs-info", "Clarify purpose");
  assert.throws(
    () => store.actions.submitExpense(draft(store), expense.id),
    /your expenses/,
  );
  store.actions.setRole("employee");
  store.actions.submitExpense(
    draft(store, { merchant: "Corrected Supplies", amount: "20.01" }),
    expense.id,
  );
  assert.equal(
    store.getState().expenses.find((e) => e.id === expense.id).merchant,
    "Corrected Supplies",
  );
  assert.equal(
    store.getState().events.filter((e) => e.expenseId === expense.id).length,
    3,
  );
});
test("card approval never creates reimbursement, reconciliation is a separate transition", () => {
  const store = boot();
  const { expense } = submit(store, { paymentSource: "card" });
  const before = store.getState().reimbursements.length;
  store.actions.setRole("finance");
  store.actions.decideExpenses([expense.id], "approved");
  assert.equal(store.getState().reimbursements.length, before);
  assert.equal(
    store.getState().expenses.find((e) => e.id === expense.id).accountingState,
    "awaiting-reconciliation",
  );
  store.actions.reconcile(expense.id);
  assert.equal(
    store.getState().expenses.find((e) => e.id === expense.id).accountingState,
    "ready",
  );
  assert.throws(
    () =>
      store.actions.decideExpenses([expense.id], "rejected", "Changed mind"),
    /eligible/,
  );
});
test("personal payout is exact, requires finance and valid date, cannot be scheduled twice", () => {
  const storage = new Map();
  const store = boot(storage);
  const { expense } = submit(store);
  store.actions.setRole("finance");
  store.actions.decideExpenses([expense.id], "approved");
  const payout = store
    .getState()
    .reimbursements.find((r) => r.expenseIds.includes(expense.id));
  assert.equal(payout.amountCents, 12345);
  store.actions.setRole("manager");
  assert.throws(
    () => store.actions.schedulePayout([payout.id], store.today(), ""),
    /finance/,
  );
  store.actions.setRole("finance");
  assert.throws(
    () => store.actions.schedulePayout([payout.id], "2020-01-01", ""),
    /future/,
  );
  const operation = store.actions.schedulePayout(
    [payout.id],
    store.today(),
    "Approved claim",
  );
  assert.equal(operation.ids.join(), payout.id);
  assert.throws(
    () => store.actions.schedulePayout([payout.id], store.today(), ""),
    /already/,
  );
  assert.equal(
    boot(storage)
      .getState()
      .reimbursements.find((r) => r.id === payout.id).status,
    "scheduled",
  );
});
test("batch operations are atomic and cannot act on zero, duplicate, or ineligible IDs", () => {
  const store = boot();
  const before = store.getState().events.length;
  for (const ids of [[], ["EXP-2841", "EXP-2841"], ["EXP-2841", "EXP-2840"]])
    assert.throws(() => store.actions.decideExpenses(ids, "approved"));
  assert.equal(
    store.getState().expenses.find((e) => e.id === "EXP-2841").status,
    "pending",
  );
  assert.equal(store.getState().events.length, before);
});
test("policy stays independent of review, overrides and rejection require recorded reasons", () => {
  const store = boot();
  assert.throws(
    () => store.actions.decideExpenses(["EXP-2839"], "approved"),
    /reason/,
  );
  store.actions.decideExpenses(["EXP-2839"], "approved", "Approved exception");
  const e = store.getState().expenses.find((e) => e.id === "EXP-2839");
  assert.equal(e.policy, "over");
  assert.equal(e.status, "approved");
  assert.equal(e.decisionNote, "Approved exception");
});
test("storage failure prevents false success and mutation", () => {
  const store = boot(new Map(), true);
  store.actions.setRole("employee");
  const count = store.getState().expenses.length;
  assert.throws(
    () => store.actions.submitExpense(draft(store)),
    /Could not save/,
  );
  assert.equal(store.getState().expenses.length, count);
});
test("sequential tabs reload latest storage before mutating and preserve both records", () => {
  const storage = new Map();
  const a = boot(storage),
    b = boot(storage);
  const first = submit(a);
  const second = submit(b, { merchant: "Second tab" });
  assert.notEqual(first.expense.id, second.expense.id);
  const loaded = boot(storage);
  assert.ok(loaded.getState().expenses.some((e) => e.id === first.expense.id));
  assert.ok(loaded.getState().expenses.some((e) => e.id === second.expense.id));
});
test("malformed saved storage is preserved and blocks mutations instead of silently resetting", () => {
  const storage = new Map([["ff-demo-state-v3", "{broken"]]);
  const store = boot(storage);
  assert.match(store.getStorageError(), /preserved/);
  assert.throws(() => store.actions.saveDraft({}), /preserved/);
  assert.equal(storage.get("ff-demo-state-v3"), "{broken");
});

test("v2 migration preserves edited values and new-schema inconsistencies block writes", () => {
  const legacy = JSON.parse(JSON.stringify(boot().getState()));
  legacy.schema = 2;
  legacy.expenses[0].merchant = "Legacy edited airline";
  delete legacy.expenses[0].amountCents;
  const encoded = JSON.stringify(legacy);
  const storage = new Map([["ff-demo-state-v2", encoded]]);
  const migrated = boot(storage);
  assert.equal(migrated.getStorageError(), "");
  assert.equal(
    migrated.getState().expenses[0].merchant,
    "Legacy edited airline",
  );
  migrated.actions.saveDraft(draft(migrated));
  assert.equal(storage.get("ff-demo-state-v2"), encoded);
  assert.equal(JSON.parse(storage.get("ff-demo-state-v3")).schema, 3);
  const corrupt = JSON.parse(storage.get("ff-demo-state-v3"));
  corrupt.reimbursements[0].amountCents += 1;
  storage.set("ff-demo-state-v3", JSON.stringify(corrupt));
  assert.match(boot(storage).getStorageError(), /preserved/);
});
test("batch decisions record every selected ID once and rejection persists with its reason", () => {
  const storage = new Map();
  const store = boot(storage);
  const first = submit(store, { amount: "10.01" });
  const second = submit(store, { amount: "12.02" });
  store.actions.setRole("finance");
  const ids = [first.expense.id, second.expense.id];
  const result = store.actions.decideExpenses(
    ids,
    "rejected",
    "Duplicate business claims",
  );
  assert.equal(result.ids.join(), ids.join());
  const reloaded = boot(storage).getState();
  assert.equal(
    reloaded.events.filter(
      (e) => e.action === "Rejected" && ids.includes(e.expenseId),
    ).length,
    2,
  );
  for (const id of ids) {
    const expense = reloaded.expenses.find((e) => e.id === id);
    assert.equal(expense.status, "rejected");
    assert.equal(expense.decisionNote, "Duplicate business claims");
    assert.ok(!reloaded.reimbursements.some((r) => r.expenseIds.includes(id)));
  }
});
