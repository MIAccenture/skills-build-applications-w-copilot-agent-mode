const test = require('node:test');
const assert = require('node:assert/strict');

process.env.NODE_ENV = 'test';
const { app, getApiBaseUrl } = require('../dist/server.js');

test('getApiBaseUrl uses localhost by default', () => {
  delete process.env.CODESPACE_NAME;
  delete process.env.API_URL;
  assert.equal(getApiBaseUrl(), 'http://localhost:8000');
});

test('getApiBaseUrl uses the Codespaces URL when CODESPACE_NAME is set', () => {
  process.env.CODESPACE_NAME = 'octofit-demo';
  assert.equal(getApiBaseUrl(), 'https://octofit-demo-8000.app.github.dev');
});

test('health endpoint returns a successful payload', async () => {
  const server = app.listen(0);
  const address = await new Promise((resolve, reject) => {
    server.once('listening', () => resolve(server.address()));
    server.once('error', reject);
  });

  const response = await fetch(`http://127.0.0.1:${address.port}/api/health`);
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.status, 'ok');
  assert.equal(body.service, 'octofit-backend');

  await new Promise((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())));
});
