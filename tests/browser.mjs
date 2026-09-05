/* Run with a local dev server and an installed Playwright module.
   FF_PLAYWRIGHT_MODULE may point to a shared runtime; no runtime code depends on it. */
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import { pathToFileURL } from "node:url";
const moduleName = process.env.FF_PLAYWRIGHT_MODULE || "playwright";
const { chromium } = await import(
  moduleName.startsWith("/") ? pathToFileURL(moduleName).href : moduleName
);
const base =
  process.env.FF_TEST_URL || "http://localhost:4185/ui_kits/finflow/";
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1280, height: 900 },
});
const page = await context.newPage();
const errors = [];
const warnings = [];
context.on("page", (p) => {
  p.on("pageerror", (error) => errors.push(error.message));
  p.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
    if (message.type() === "warning") warnings.push(message.text());
  });
});
page.on("pageerror", (error) => errors.push(error.message));
page.on("console", (message) => {
  if (message.type() === "error") errors.push(message.text());
  if (message.type() === "warning") warnings.push(message.text());
});
const heading = async (text) => {
  await page.getByRole("heading", { name: text, exact: true }).waitFor();
};
const go = async (screen, params = {}) => {
  await page.goto(base + "#" + new URLSearchParams({ screen, ...params }));
  await page.locator(`main[data-screen="${screen}"]`).waitFor();
};
const state = () => page.evaluate(() => FF_STORE.getState());
const role = async (name) => {
  await page.getByRole("button", { name, exact: true }).click();
  await page.waitForFunction(
    (expected) => FF_STORE.getRole() === expected,
    { Admin: "finance", Manager: "manager", Employee: "employee" }[name],
  );
};
const check = (name) => console.log(`PASS ${name}`);
try {
  await go("expense-detail", { expenseId: "EXP-2840" });
  await heading("Figma");
  assert.match(await page.locator("main").innerText(), /James Taylor/);
  assert.match(await page.locator("main").innerText(), /\$180.00/);
  await go("expense-detail", { expenseId: "EXP-2839" });
  await heading("Marriott Austin");
  assert.match(await page.locator("main").innerText(), /\$1,240.00/);
  await go("expense-detail", { expenseId: "missing" });
  assert.match(await page.locator("main").innerText(), /Record unavailable/);
  check("distinct records and unknown-ID state");
  await role("Employee");
  await heading("My expenses overview");
  await go("expenses");
  assert.doesNotMatch(
    await page.locator("main").innerText(),
    /Jordan Lee|James Taylor/,
  );
  await go("approval-detail", { expenseId: "EXP-2841" });
  await heading("Destination unavailable");
  check("employee route and data restrictions");
  await go("new-expense");
  await page
    .getByRole("button", { name: "Submit for approval", exact: true })
    .click();
  assert.match(await page.locator("form").innerText(), /Enter the merchant/);
  await page.waitForFunction(
    () => document.activeElement?.id === "capture-merchant",
  );
  await page.getByLabel("Merchant", { exact: true }).fill("Browser Supplies");
  await page.getByLabel("Amount (USD)", { exact: true }).fill("-12");
  await page.getByLabel("Category", { exact: true }).selectOption("of");
  await page
    .getByLabel("Business purpose / memo")
    .fill("Quarterly review supplies");
  await page
    .getByRole("button", { name: "Submit for approval", exact: true })
    .click();
  assert.equal(
    await page.getByLabel("Merchant", { exact: true }).inputValue(),
    "Browser Supplies",
  );
  await page.getByLabel("Amount (USD)", { exact: true }).fill("123.45");
  await page.getByLabel("Date", { exact: true }).fill("2026-05-24");
  await page
    .getByLabel("Receipt (JPEG, PNG, WebP or PDF; up to 1.5 MB)")
    .setInputFiles({
      name: "business-receipt.png",
      mimeType: "image/png",
      buffer: Buffer.from(
        "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+a1ioAAAAASUVORK5CYII=",
        "base64",
      ),
    });
  await page.waitForFunction(
    () =>
      FF_STORE.getState().drafts["Corey Anderson:new"]?.receipt?.name ===
      "business-receipt.png",
  );
  await page.reload();
  await page.getByLabel("Merchant", { exact: true }).waitFor();
  assert.equal(
    await page.getByLabel("Merchant", { exact: true }).inputValue(),
    "Browser Supplies",
  );
  assert.equal(
    await page.getByLabel("Date", { exact: true }).inputValue(),
    "2026-05-24",
  );
  check(
    "blank and invalid validation, retained draft and receipt across reload",
  );
  await page
    .getByRole("button", { name: "Submit for approval", exact: true })
    .click();
  await heading("Browser Supplies");
  const expenseId = (await state()).expenses.find(
    (e) => e.merchant === "Browser Supplies",
  ).id;
  assert.match(
    await page.locator("main").innerText(),
    /Quarterly review supplies/,
  );
  assert.equal(
    await page.getByRole("button", { name: "Approve", exact: true }).count(),
    0,
  );
  await role("Manager");
  await go("expenses");
  assert.doesNotMatch(
    await page.locator("main").innerText(),
    /Corey Anderson|Jamie Smith/,
  );
  await go("approvals");
  assert.equal(
    await page
      .getByRole("checkbox", { name: "Select EXP-2829", exact: true })
      .count(),
    0,
  );
  await go("approval-detail", { expenseId: "EXP-2839" });
  await page.setViewportSize({ width: 320, height: 900 });
  await page
    .getByLabel("Decision reason / policy override")
    .scrollIntoViewIfNeeded();
  assert.ok(
    await page
      .getByRole("button", { name: "Approve", exact: true })
      .isVisible(),
  );
  assert.ok(
    await page
      .getByRole("img", { name: "Receipt attached to EXP-2839" })
      .evaluate((img) => img.complete && img.naturalWidth > 0),
  );
  await fs.mkdir("/tmp/finflow-review", { recursive: true });
  await page.screenshot({
    path: "/tmp/finflow-review/manager-review-actions-320.png",
  });
  await page.setViewportSize({ width: 1280, height: 900 });
  await go("mobile-flow");
  await heading("Destination unavailable");
  check("manager team scope, self-review exclusion and gallery restrictions");
  await role("Admin");
  await go("expense-detail", { expenseId });
  await heading("Browser Supplies");
  await page
    .getByRole("button", { name: "Request correction", exact: true })
    .click();
  assert.match(await page.getByRole("alert").innerText(), /reason/);
  await page
    .getByLabel("Decision reason / policy override")
    .fill("Add the meeting reference");
  await page
    .getByRole("button", { name: "Request correction", exact: true })
    .click();
  await heading("Correction requested");
  await role("Employee");
  await go("expense-detail", { expenseId });
  await page.getByRole("button", { name: "Correct and resubmit" }).click();
  await page
    .getByLabel("Merchant", { exact: true })
    .fill("Corrected Browser Supplies");
  await page.getByLabel("Amount (USD)", { exact: true }).fill("125.01");
  await page.getByRole("button", { name: "Resubmit for approval" }).click();
  await heading("Corrected Browser Supplies");
  check("reason capture, correction and same-ID resubmission");
  await role("Admin");
  await go("approval-detail", { expenseId });
  await page.getByRole("button", { name: "Approve", exact: true }).click();
  await heading("Approval recorded");
  assert.match(await page.locator("main").innerText(), /125.01/);
  await go("expense-detail", { expenseId });
  await page.reload();
  await heading("Corrected Browser Supplies");
  assert.equal(
    await page.getByRole("button", { name: "Approve", exact: true }).count(),
    0,
  );
  assert.equal(
    (await state()).expenses.find((e) => e.id === expenseId).status,
    "approved",
  );
  check("approval persists and repeated actions disappear");
  await go("schedule-payout");
  const payout = (await state()).reimbursements.find((r) =>
    r.expenseIds.includes(expenseId),
  );
  assert.equal(
    await page
      .getByRole("checkbox", { name: "Select RB-104", exact: true })
      .count(),
    0,
  );
  await page
    .getByRole("checkbox", { name: `Select ${payout.id}`, exact: true })
    .check();
  assert.match(await page.locator("form").innerText(), /125.01/);
  await page.getByLabel("Schedule date", { exact: true }).fill("2020-01-01");
  await page
    .getByRole("button", { name: "Schedule selected payouts (demo)" })
    .click();
  assert.match(await page.getByRole("alert").innerText(), /future/);
  await page
    .getByLabel("Schedule date", { exact: true })
    .fill(await page.evaluate(() => FF_STORE.today()));
  await page
    .getByRole("button", { name: "Schedule selected payouts (demo)" })
    .click();
  await heading("Demo payout scheduled");
  const confirmation = await page.locator("main").innerText();
  assert.match(confirmation, new RegExp(expenseId));
  assert.match(confirmation, /Corey Anderson/);
  assert.match(confirmation, /125.01/);
  assert.doesNotMatch(confirmation, /Jamie Smith|Jordan Lee/);
  await go("schedule-payout");
  assert.equal(
    await page
      .getByRole("checkbox", { name: `Select ${payout.id}`, exact: true })
      .count(),
    0,
  );
  check(
    "exact eligible payout, date validation, matching confirmation and no repeat scheduling",
  );
  await go("approval-detail", { expenseId: "EXP-2841" });
  const before = (await state()).reimbursements.length;
  await page.getByRole("button", { name: "Approve", exact: true }).click();
  await heading("Approval recorded");
  assert.equal((await state()).reimbursements.length, before);
  await go("expense-detail", { expenseId: "EXP-2841" });
  await page
    .getByRole("button", { name: "Reconcile card expense (demo)" })
    .click();
  await page.waitForFunction(
    () =>
      FF_STORE.getState().expenses.find((e) => e.id === "EXP-2841")
        .accountingState === "ready",
  );
  check("card approval and separate reconciliation without reimbursement");
  await go("approvals");
  await page
    .getByRole("checkbox", { name: "Select EXP-2839", exact: true })
    .check();
  await page.getByLabel("Filter review queue").fill("Lyft");
  assert.match(await page.getByRole("status").innerText(), /^0 selected/);
  assert.equal(
    await page.getByRole("button", { name: "Approve", exact: true }).count(),
    0,
  );
  check("filtering clears selection and hides batch actions");
  await go("expenses");
  await page.getByLabel("Search expenses", { exact: true }).fill("Figma");
  await page.getByRole("link", { name: "Figma", exact: true }).click();
  await heading("Figma");
  await page.goBack();
  await page.getByLabel("Search expenses", { exact: true }).waitFor();
  assert.equal(
    await page.getByLabel("Search expenses", { exact: true }).inputValue(),
    "Figma",
  );
  check("browser Back restores list query");
  await go("expenses", { q: "Udemy" });
  assert.equal(
    await page.getByLabel("Search expenses", { exact: true }).inputValue(),
    "Udemy",
  );
  await page.getByRole("link", { name: "Udemy", exact: true }).waitFor();
  check("same-screen URL changes apply their filters");

  await page.getByRole("button", { name: "Demo screens", exact: true }).focus();
  await page.keyboard.press("Enter");
  await page.getByRole("dialog").waitFor();
  for (let i = 0; i < 60; i++) {
    await page.keyboard.press("Tab");
    assert.ok(
      await page
        .getByRole("dialog")
        .evaluate((el) => el.contains(document.activeElement)),
    );
  }
  await page.keyboard.press("Escape");
  assert.ok(
    await page
      .getByRole("button", { name: "Demo screens", exact: true })
      .evaluate((el) => document.activeElement === el),
  );
  check("keyboard dialog containment and trigger restoration");
  await go("approval-detail", { expenseId: "EXP-2836" });
  await page.locator("main").focus();
  let reached = false;
  for (let i = 0; i < 25; i++) {
    await page.keyboard.press("Tab");
    if (
      await page
        .getByRole("button", { name: "Approve", exact: true })
        .evaluate((el) => el === document.activeElement)
    ) {
      reached = true;
      break;
    }
  }
  assert.ok(reached);
  const focus = await page
    .getByRole("button", { name: "Approve", exact: true })
    .evaluate((el) => getComputedStyle(el).outlineStyle);
  assert.notEqual(focus, "none");
  await page.keyboard.press("Enter");
  await heading("Approval recorded");
  check("keyboard-only review and visible action focus");
  for (const width of [320, 390, 768, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    for (const theme of ["light", "dark"]) {
      if ((await page.locator("html").getAttribute("data-theme")) !== theme)
        await page.getByRole("button", { name: "Toggle theme" }).click();
      for (const [screen, params] of [
        ["dashboard", {}],
        ["expenses", {}],
        ["approval-detail", { expenseId: "EXP-2839" }],
        ["new-expense", {}],
        ["schedule-payout", {}],
      ]) {
        await go(screen, params);
        if (screen === "expenses") {
          const colors = await page
            .locator(".ff-record-link")
            .first()
            .evaluate((el) => ({
              link: getComputedStyle(el).color,
              body: getComputedStyle(document.body).color,
            }));
          assert.equal(
            colors.link,
            colors.body,
            `Record links must use readable foreground in ${theme}`,
          );
        }
        const sizes = await page.evaluate(() => ({
          viewport: innerWidth,
          doc: document.documentElement.scrollWidth,
          main: document.querySelector("main").clientWidth,
          scroll: document.querySelector("main").scrollWidth,
        }));
        assert.ok(
          sizes.doc <= sizes.viewport + 1,
          `${screen} shell overflow at ${width}: ${JSON.stringify(sizes)}`,
        );
        assert.ok(
          sizes.scroll <= sizes.main + 1,
          `${screen} main overflow at ${width}: ${JSON.stringify(sizes)}`,
        );
      }
      await go("approvals");
      await page
        .getByRole("button", { name: "Demo screens", exact: true })
        .click();
      const rect = await page.getByRole("dialog").boundingBox();
      assert.ok(rect.width <= width);
      await page.keyboard.press("Escape");
    }
  }
  check(
    "desktop shell, capture, review, payout and dialog at 320/390/768/1280 in light and dark",
  );
  await page.setViewportSize({ width: 1280, height: 900 });
  await role("Employee");
  await go("new-expense");
  await page.getByLabel("Merchant", { exact: true }).fill("Retry supplies");
  await page.getByLabel("Amount (USD)", { exact: true }).fill("7.25");
  await page.getByLabel("Category", { exact: true }).selectOption("of");
  await page.evaluate(() => {
    window.savedSetItem = Storage.prototype.setItem;
    Storage.prototype.setItem = function (key, value) {
      if (key === "ff-demo-state-v3") throw Error("Test quota");
      return window.savedSetItem.call(this, key, value);
    };
  });
  await page
    .getByRole("button", { name: "Submit for approval", exact: true })
    .click();
  assert.match(await page.getByRole("alert").innerText(), /Could not save/);
  assert.equal(
    await page.getByLabel("Merchant", { exact: true }).inputValue(),
    "Retry supplies",
  );
  await page.evaluate(() => {
    Storage.prototype.setItem = window.savedSetItem;
  });
  await page
    .getByRole("button", { name: "Submit for approval", exact: true })
    .click();
  await heading("Retry supplies");
  check("storage failure retains inputs, retry creates a single record");
  const mobile = await context.newPage();
  await mobile.setViewportSize({ width: 390, height: 844 });
  await mobile.goto(base + "mobile-app.html");
  await mobile.getByRole("button", { name: "Open employee demo" }).click();
  await mobile
    .getByRole("button", { name: "New expense", exact: true })
    .click();
  await mobile.getByLabel("Merchant", { exact: true }).fill("Phone Rail");
  await mobile.getByLabel("Amount (USD)", { exact: true }).fill("76.50");
  await mobile.getByLabel("Date", { exact: true }).fill("2026-05-23");
  await mobile.getByLabel("Category", { exact: true }).selectOption("tr");
  await mobile
    .getByLabel("Business purpose / memo")
    .fill("Phone-edited travel memo");
  await mobile
    .getByLabel("Payment source", { exact: true })
    .selectOption("personal");
  await mobile.getByRole("button", { name: "Attach sample receipt" }).click();
  await mobile.reload();
  await mobile.getByLabel("Merchant", { exact: true }).waitFor();
  assert.equal(
    await mobile.getByLabel("Merchant", { exact: true }).inputValue(),
    "Phone Rail",
  );
  await mobile
    .getByRole("button", { name: "Submit for approval", exact: true })
    .click();
  await mobile
    .getByRole("heading", { name: "Submitted", exact: true })
    .waitFor();
  await mobile.getByRole("button", { name: "Track status" }).click();
  await mobile.getByRole("heading", { name: "Phone Rail" }).waitFor();
  assert.match(
    await mobile.locator("main").innerText(),
    /Phone-edited travel memo/,
  );
  assert.match(await mobile.locator("main").innerText(), /76.50/);
  assert.match(await mobile.locator("main").innerText(), /May 23, 2026/);
  for (const width of [320, 390, 768, 1280]) {
    await mobile.setViewportSize({ width, height: 844 });
    assert.ok(
      await mobile.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
    );
  }
  check(
    "mobile changed fields, retained draft, submission and record status at all widths",
  );

  // A mobile card action must update the same record on desktop and survive reload.
  await mobile.goto(base + "mobile-app.html#screen=cards");
  await mobile
    .getByRole("button", { name: "Freeze card", exact: true })
    .click();
  await mobile.reload();
  await mobile
    .getByRole("button", { name: "Unfreeze card", exact: true })
    .waitFor();
  await go("card-detail", { cardId: "c2" });
  await heading("Card •••• 9032");
  await page
    .getByRole("button", { name: "Unfreeze card", exact: true })
    .click();
  await page.reload();
  await page
    .getByRole("button", { name: "Freeze card", exact: true })
    .waitFor();
  await go("new-expense");
  assert.equal(
    await page
      .locator('nav[aria-label="Primary"] [aria-current="page"]')
      .count(),
    1,
  );
  assert.equal(
    await page
      .locator('nav[aria-label="Primary"] [aria-current="page"]')
      .innerText(),
    "New expense",
  );
  check("mobile/desktop card state persistence and unique active navigation");
  await role("Admin");
  await go("reports");
  await page.getByLabel("From", { exact: true }).fill("2026-05-22");
  await page.getByLabel("Through", { exact: true }).fill("2026-05-22");
  const reportItems = (await state()).expenses.filter(
    (e) => e.date === "2026-05-22" && e.status === "approved",
  );
  assert.equal(
    await page.getByRole("link", { name: "Figma", exact: true }).count(),
    1,
  );
  assert.equal(
    await page.getByRole("link", { name: "Udemy", exact: true }).count(),
    0,
  );
  const downloaded = page.waitForEvent("download");
  await page
    .getByRole("button", { name: "Export displayed records (CSV)" })
    .click();
  const download = await downloaded;
  const csv = await fs.readFile(await download.path(), "utf8");
  const lines = csv.split("\r\n");
  assert.equal(lines.length, reportItems.length + 1);
  for (const e of reportItems) {
    assert.ok(csv.includes('"' + e.id + '"'));
    assert.ok(csv.includes('"' + (e.amountCents / 100).toFixed(2) + '"'));
  }
  assert.equal(
    reportItems.reduce((sum, e) => sum + e.amountCents, 0),
    102250,
  );
  assert.match(await page.locator("main").innerText(), /1,022.50/);
  await page.getByLabel("Through", { exact: true }).fill("2026-05-21");
  assert.match(await page.getByRole("alert").innerText(), /interval/);
  assert.ok(
    await page
      .getByRole("button", { name: "Export displayed records (CSV)" })
      .isDisabled(),
  );
  check("report interval, source arithmetic, CSV parity and invalid range");
  for (const vendor of (await state()).vendors.slice(0, 2)) {
    await go("vendor-detail", { vendorId: vendor.id });
    await heading(vendor.name);
    const transactions = (await state()).expenses.filter(
      (e) =>
        e.merchant === vendor.name || e.merchant.startsWith(vendor.name + " "),
    );
    for (const e of transactions)
      assert.match(await page.locator("main").innerText(), new RegExp(e.id));
    assert.equal(
      await page.getByRole("button", { name: /Pay|Schedule/ }).count(),
      0,
    );
  }
  check("selected vendor identity and absence of false vendor payout");
  await go("approvals");
  for (const id of ["EXP-2835", "EXP-2839"])
    await page
      .getByRole("checkbox", { name: `Select ${id}`, exact: true })
      .check();
  assert.match(await page.getByRole("status").innerText(), /2 selected/);
  assert.match(await page.getByRole("status").innerText(), /1,530.00/);
  await page
    .getByLabel("Decision reason / policy override")
    .fill("Evidence does not support these claims");
  await page.getByRole("button", { name: "Reject", exact: true }).click();
  await heading("Rejection recorded");
  assert.match(await page.locator("main").innerText(), /EXP-2835/);
  assert.match(await page.locator("main").innerText(), /EXP-2839/);
  await page.reload();
  await heading("Rejection recorded");
  check("two-record batch amount, exact result and durable rejection");
  await role("Manager");
  await page.setViewportSize({ width: 320, height: 900 });
  await go("approval-detail", { expenseId: "EXP-2839" });
  assert.doesNotMatch(await page.locator("main").innerText(), /Corey Anderson/);
  await fs.mkdir("/tmp/finflow-review", { recursive: true });
  await page.screenshot({
    path: "/tmp/finflow-review/manager-320.png",
    fullPage: true,
  });
  await role("Admin");
  await page.setViewportSize({ width: 1280, height: 900 });
  await go("dashboard");
  await page.screenshot({
    path: "/tmp/finflow-review/finance-1280.png",
    fullPage: true,
  });
  await mobile.setViewportSize({ width: 390, height: 844 });
  await mobile.goto(base + "mobile-app.html#screen=new");
  await mobile.screenshot({
    path: "/tmp/finflow-review/capture-390.png",
    fullPage: true,
  });
  // All registry surfaces must render without runtime exceptions, even when
  // a missing operation/record deliberately produces an unavailable state.
  const entry = await fs.readFile(
    new URL("../ui_kits/finflow/index.html", import.meta.url),
    "utf8",
  );
  const registry = entry.match(/const SCREEN_REGISTRY = \[(.*?)\n    \];/s)[1];
  const routes = [...registry.matchAll(/\{ id:"([^"]+)"/g)].map((m) => m[1]);
  for (const screen of routes) {
    if (screen === "dashboard-mgr") await role("Manager");
    else if (screen === "dashboard-emp") await role("Employee");
    else if ((await page.evaluate(() => FF_STORE.getRole())) !== "finance")
      await role("Admin");
    await go(screen);
    assert.ok(
      (await page.locator("main").first().innerText()).length > 0,
      screen,
    );
    if (screen === "mobile-flow") {
      await page
        .getByRole("button", { name: "Next screens", exact: true })
        .click();
      await page
        .getByRole("button", { name: "Next screens", exact: true })
        .click();
    }
  }
  check("all 48 registered surfaces render without runtime errors");
  await page.evaluate(() =>
    localStorage.setItem("ff-demo-state-v3", "{broken"),
  );
  await page.reload();
  await page
    .getByRole("button", { name: "Reset demo data", exact: true })
    .waitFor();
  assert.match(await page.getByRole("alert").innerText(), /preserved/);
  await mobile.reload();
  await mobile
    .getByRole("button", { name: "Reset demo data", exact: true })
    .waitFor();
  mobile.once("dialog", (dialog) => dialog.accept());
  await mobile
    .getByRole("button", { name: "Reset demo data", exact: true })
    .click();
  await mobile.waitForFunction(() => FF_STORE.getStorageError() === "");
  await page.reload();
  await page.locator("main").first().waitFor();
  assert.equal(
    await page
      .getByRole("button", { name: "Reset demo data", exact: true })
      .count(),
    0,
  );
  check(
    "corrupt storage is preserved and explicit recovery works across both entries",
  );

  assert.equal(errors.length, 0, errors.join("\n"));
  console.log(
    `Console: ${errors.length} errors; ${new Set(warnings).size} distinct warnings (browser Babel warning expected).`,
  );
} catch (error) {
  console.error("Runtime errors:", errors);
  throw error;
} finally {
  await browser.close();
}
