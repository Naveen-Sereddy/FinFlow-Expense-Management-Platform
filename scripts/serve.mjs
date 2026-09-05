import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const port = Number(process.env.PORT || 4173);
const mime = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.jsx': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
};

const server = http.createServer((request, response) => {
  let requestPath;
  try { requestPath = decodeURIComponent((request.url || '/').split('?')[0]); } catch { response.writeHead(400); response.end('Invalid URL'); return; }
  if (requestPath === '/') { response.writeHead(302, { Location: '/ui_kits/finflow/' }); response.end(); return; }
  // Serve the product from its repository path so the relative JSX, data, and
  // foundation imports in index.html resolve exactly as they do when opened
  // from the source tree. The root URL remains a convenient shortcut.
  const relativePath = requestPath.endsWith('/') ? `${requestPath}index.html` : requestPath;
  const absolutePath = path.resolve(root, `.${relativePath}`);
  if (!absolutePath.startsWith(`${root}${path.sep}`)) {
    response.writeHead(403);
    response.end('Forbidden');
    return;
  }
  fs.stat(absolutePath, (error, stats) => {
    if (error || !stats.isFile()) {
      response.writeHead(404);
      response.end('Not found');
      return;
    }
    response.writeHead(200, { 'Content-Type': mime[path.extname(absolutePath).toLowerCase()] || 'application/octet-stream' });
    fs.createReadStream(absolutePath).pipe(response);
  });
});

server.listen(port, () => {
  console.log(`FinFlow running at http://localhost:${port}/ui_kits/finflow/`);
});
