import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';

// Check actual production HTML, so a changed inline script cannot silently break CSP.
const config = JSON.parse(readFileSync('vercel.json', 'utf8'));
const headers = Object.fromEntries(config.headers.find(rule => rule.source === '/(.*)').headers.map(h => [h.key, h.value]));
const policy = headers['Content-Security-Policy'];
const directives = Object.fromEntries(policy.split(';').map(s => { const [key, ...values] = s.trim().split(/\s+/); return [key, values]; }));
assert(!directives['script-src'].includes("'unsafe-inline'"));
assert(!directives['script-src'].includes("'unsafe-eval'"));
for (const key of ['object-src', 'frame-ancestors', 'base-uri', 'form-action', 'script-src-attr']) assert.deepEqual(directives[key], ["'none'"]);
const html = readFileSync('dist/index.html', 'utf8');
for (const [, attrs, body] of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)) {
  const src = attrs.match(/\bsrc="([^"]+)"/);
  if (src) assert(src[1].startsWith('/') && !src[1].startsWith('//'), 'Scripts must be same-origin');
  else if (body.trim()) {
    const hash = "'sha256-" + createHash('sha256').update(body).digest('base64') + "'";
    assert(directives['script-src'].includes(hash), 'Inline script hash must match production HTML');
  }
}
assert.equal(headers['X-Frame-Options'], 'DENY');
assert.equal(headers['X-Content-Type-Options'], 'nosniff');
assert(!readdirSync('dist/assets').some(f => f.endsWith('.map')), 'Do not publish source maps');
assert(readFileSync('dist/theme-init.js', 'utf8').includes("['dark','light','forest','sunset','plum']"));
console.log('Production CSP, script hashes, security headers and source-map checks passed.');
