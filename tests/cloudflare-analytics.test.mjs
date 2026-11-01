import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { runInNewContext } from 'node:vm';

const source = await readFile(new URL('../src/scripts/cloudflare-analytics.js', import.meta.url), 'utf8');
const token = 'a'.repeat(32);
function browser(hostname = 'mohamedyousry01.github.io', configuredToken = token, protocol = 'https:') {
  const added = [];
  const context = {
    window: { location: { hostname, protocol } },
    document: {
      currentScript: { dataset: { cloudflareToken: configuredToken } },
      createElement: () => ({ attributes: {}, setAttribute(key, value) { this.attributes[key] = value; } }),
      head: { appendChild(node) { added.push(node); } },
    },
  };
  return { context, added };
}

test('loads one Cloudflare beacon across repeated Astro page transitions', () => {
  const { context, added } = browser();
  runInNewContext(source, context);
  runInNewContext(source, context);
  assert.equal(added.length, 1);
  assert.equal(added[0].src, 'https://static.cloudflareinsights.com/beacon.min.js');
  assert.equal(added[0].type, 'module');
  assert.deepEqual(JSON.parse(added[0].attributes['data-cf-beacon']), { token, spa: true });
});

test('does not send local development or browser-audit traffic to analytics', () => {
  for (const host of ['localhost', '127.0.0.1', '::1', '[::1]', 'preview.localhost', 'portfolio.test']) {
    const { context, added } = browser(host);
    runInNewContext(source, context);
    assert.equal(added.length, 0, host);
  }
});

test('missing and invalid site tokens do not load external code', () => {
  for (const value of ['', undefined, 'not-a-site-token']) {
    const { context, added } = browser('mohamedyousry01.github.io', value);
    if (value === undefined) context.document.currentScript = null;
    runInNewContext(source, context);
    assert.equal(added.length, 0);
  }
});

test('does not load analytics from an offline file preview', () => {
  const { context, added } = browser('', token, 'file:');
  runInNewContext(source, context);
  assert.equal(added.length, 0);
});
