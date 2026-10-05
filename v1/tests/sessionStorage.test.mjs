import { test } from 'node:test';
import assert from 'node:assert/strict';
import storage from '../.test-build/lib/sessionStorage.js';
const { parseStoredSession, readStoredSession, writeStoredSession } = storage;
const session = { coacheeName: 'Synthetic Executive', currentStep: 'map', relationships: [{ id: 'rel-1-test', name: 'Synthetic Colleague', outbound: 'high', inbound: 'unscored', note: 'Synthetic note' }] };
test('legacy and versioned maps retain names, categories and notes', () => {
  assert.deepEqual(parseStoredSession(JSON.stringify(session)), session);
  assert.deepEqual(parseStoredSession(JSON.stringify({ schemaVersion: 1, session })), session);
});
test('malformed nested payloads and future schemas fail safely', () => {
  for (const altered of [null, { ...session, currentStep: { toString: 'map' } }, { ...session, relationships: [{ ...session.relationships[0], outbound: { toString: 'high' } }] }, { ...session, currentStep: 'bad' }, { ...session, relationships: [null] }, { ...session, relationships: [{ ...session.relationships[0], outbound: 'diagnosis' }] }, { ...session, relationships: [session.relationships[0], session.relationships[0]] }, { ...session, coacheeName: 'x'.repeat(51) }, { ...session, relationships: [{ ...session.relationships[0], note: 'x'.repeat(4001) }] }, { schemaVersion: 2, session }]) assert.equal(parseStoredSession(JSON.stringify(altered)), null);
  assert.equal(parseStoredSession('{broken'), null);
});
test('read failure preserves malformed bytes and never removes storage', () => {
  const result = readStoredSession({ getItem: () => '{broken' });
  assert.equal(result.session, null); assert.ok(result.error);
});
test('quota and blocked access are visible errors', () => {
  assert.ok(readStoredSession({ getItem: () => { throw new Error('blocked'); } }).error);
  assert.ok(writeStoredSession({ setItem: () => { throw new Error('quota'); }, removeItem: () => {} }, session));
  assert.ok(writeStoredSession({ setItem: () => {}, removeItem: () => { throw new Error('blocked'); } }, { ...session, coacheeName: '', relationships: [] }));
});
test('clear removes only the map key; writes have schema envelope', () => {
  const calls = [];
  const storage = { setItem: (k,v) => calls.push([k,JSON.parse(v)]), removeItem: k => calls.push(k) };
  assert.equal(writeStoredSession(storage, session), null);
  assert.deepEqual(calls[0], ['tvm_session_v1', { schemaVersion: 1, session }]);
  assert.equal(writeStoredSession(storage, { coacheeName: '', relationships: [], currentStep: 'landing' }), null);
  assert.equal(calls[1], 'tvm_session_v1');
});
