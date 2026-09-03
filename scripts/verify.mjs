import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function fail(message) {
  console.error(`FinFlow verification failed: ${message}`);
  process.exitCode = 1;
}

function read(relativePath) {
  const absolutePath = path.join(root, relativePath);
  if (!fs.existsSync(absolutePath)) {
    fail(`missing required file: ${relativePath}`);
    return '';
  }
  return fs.readFileSync(absolutePath, 'utf8');
}

const entry = read('ui_kits/finflow/index.html');
const researchArtboard = read('case-study/ab-research.jsx');
const tokens = read('foundations/colors_and_type.css');
const componentStyles = read('foundations/components.css');

const registryMatch = entry.match(/const SCREEN_REGISTRY = \[(.*?)\n    \];/s);
if (!registryMatch) {
  fail('SCREEN_REGISTRY is missing from ui_kits/finflow/index.html');
} else {
  const ids = [...registryMatch[1].matchAll(/\{ id:"([^"]+)"/g)].map((match) => match[1]);
  const uniqueIds = new Set(ids);
  if (ids.length !== 48) fail(`expected 48 registered surfaces (47 desktop + 1 mobile shelf), found ${ids.length}`);
  if (uniqueIds.size !== ids.length) fail('SCREEN_REGISTRY contains duplicate IDs');
  for (const requiredId of ['dashboard', 'dashboard-mgr', 'dashboard-emp', 'approvals', 'audit', 'mobile-flow']) {
    if (!uniqueIds.has(requiredId)) fail(`SCREEN_REGISTRY is missing ${requiredId}`);
  }
}

const localScriptRefs = [...entry.matchAll(/(?:src|href)="([^"?#]+)(?:\?[^"#]*)?"/g)]
  .map((match) => match[1])
  .filter((ref) => ref.startsWith('./') || ref.startsWith('../'));
for (const ref of localScriptRefs) {
  const relativePath = path.normalize(path.join('ui_kits/finflow', ref));
  if (!fs.existsSync(path.join(root, relativePath))) fail(`local asset referenced by index.html is missing: ${relativePath}`);
}

const requiredTokens = ['--ff-bg', '--ff-fg', '--ff-primary', '--ff-focus-ring', '--ff-chart-1', '--ff-status-success-fg'];
for (const token of requiredTokens) {
  if (!tokens.includes(token)) fail(`required design token is missing: ${token}`);
}

const tokenDefinitions = (tokens.match(/--ff-[\w-]+\s*:/g) ?? []).length;
if (tokenDefinitions < 50) fail(`expected at least 50 FinFlow token definitions, found ${tokenDefinitions}`);
if (!componentStyles.includes('focus-visible')) fail('shared component focus-visible styling is missing');

const forbiddenLegacyPhrases = [
  'Concept Case Study',
  'This is a concept project.',
  'no commissioned user research',
  'No commissioned interviews',
];
for (const [relativePath, source] of [
  ['ui_kits/finflow/index.html', entry],
  ['case-study/ab-research.jsx', researchArtboard],
]) {
  for (const phrase of forbiddenLegacyPhrases) {
    if (source.includes(phrase)) fail(`legacy product framing remains in ${relativePath}: ${phrase}`);
  }
}

if (process.exitCode) process.exit();
console.log('FinFlow verification passed');
console.log(`- Registered surfaces: 48 (47 desktop + mobile shelf)`);
console.log(`- Design tokens checked: ${tokenDefinitions}`);
console.log('- Local script and stylesheet references: present');
console.log('- Legacy concept-only framing: absent from product and research artboard');
