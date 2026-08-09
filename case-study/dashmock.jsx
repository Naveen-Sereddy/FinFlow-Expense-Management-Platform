/* global FF_DATA */
// Thin alias over the real FinFlow product data (ui_kits/finflow/data.js,
// loaded as a plain script before this file) so case-study artboards share
// one source of truth with the actual prototype — no invented numbers.
window.DASHMOCK = window.FF_DATA;
