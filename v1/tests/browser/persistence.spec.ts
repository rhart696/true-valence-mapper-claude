import { test, expect } from '@playwright/test';
const fixture = { coacheeName: 'Synthetic Executive', currentStep: 'map', relationships: [{ id: 'rel-1-test', name: 'Synthetic Colleague', outbound: 'high', inbound: 'unscored', note: 'Synthetic note' }] };

test('saved map survives mount, resume, reload and explicit start fresh', async ({ page }) => {
  await page.addInitScript(({ fixture }) => {
    if (!localStorage.getItem('fixture-seeded')) {
      localStorage.setItem('tvm_session_v1', JSON.stringify(fixture));
      localStorage.setItem('tvm-onboarding-v1-complete', '1');
      localStorage.setItem('fixture-seeded', '1');
    }
  }, { fixture });
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Resume last session', exact: true })).toBeVisible();
  expect(await page.evaluate(() => localStorage.getItem('tvm_session_v1'))).not.toBeNull();
  await page.getByRole('button', { name: 'Resume last session', exact: true }).click();
  await expect(page.getByText('Synthetic Colleague', { exact: true }).first()).toBeVisible();
  await page.reload();
  await expect(page.getByRole('button', { name: 'Resume last session', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Start fresh', exact: true }).click();
  await expect.poll(() => page.evaluate(() => localStorage.getItem('tvm_session_v1'))).toBeNull();
});

test('malformed map stays intact until user chooses a fresh map', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('tvm_session_v1', '{broken'));
  await page.goto('/');
  await expect(page.getByRole('alert').filter({ hasText: 'saved map could not be read' })).toBeVisible();
  expect(await page.evaluate(() => localStorage.getItem('tvm_session_v1'))).toBe('{broken');
});

test('blocked browser storage surfaces recovery guidance', async ({ page }) => {
  await page.addInitScript(() => Object.defineProperty(window, 'localStorage', { get: () => { throw new Error('synthetic blocked storage'); } }));
  await page.goto('/');
  await expect(page.getByRole('alert').filter({ hasText: 'Saved maps are unavailable' })).toBeVisible();
});

test('welcome does not erase a saved map', async ({ page }) => {
  await page.addInitScript(({ fixture }) => localStorage.setItem('tvm_session_v1', JSON.stringify(fixture)), { fixture });
  await page.goto('/');
  await expect(page.getByRole('dialog', { name: 'Welcome — True Valence Relationship Mapper' })).toBeVisible();
  expect(await page.evaluate(() => localStorage.getItem('tvm_session_v1'))).not.toBeNull();
  await page.getByRole('button', { name: 'Skip introduction' }).click();
  await expect(page.getByRole('button', { name: 'Resume last session', exact: true })).toBeVisible();
});

test('quota failure after resume preserves prior map and shows export guidance', async ({ page }) => {
  await page.addInitScript(({ fixture }) => {
    localStorage.setItem('tvm_session_v1', JSON.stringify(fixture));
    localStorage.setItem('tvm-onboarding-v1-complete', '1');
    Storage.prototype.setItem = () => { throw new Error('synthetic quota'); };
  }, { fixture });
  await page.goto('/');
  await page.getByRole('button', { name: 'Resume last session', exact: true }).click();
  await expect(page.getByRole('alert').filter({ hasText: 'Changes could not be saved' })).toBeVisible();
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('tvm_session_v1')!).coacheeName)).toBe(fixture.coacheeName);
});

test('incoming shared map waits for consent and dismissal preserves saved map', async ({ page }) => {
  await page.addInitScript(({ fixture }) => {
    localStorage.setItem('tvm_session_v1', JSON.stringify(fixture));
    localStorage.setItem('tvm-onboarding-v1-complete', '1');
  }, { fixture });
  // Synthetic API response only: no database writes or client data.
  await page.route('**/rest/v1/shared_sessions*', route => route.fulfill({ json: { session: { ...fixture, coacheeName: 'Incoming Synthetic Map' } } }));
  await page.goto('/?share=ABCDEF');
  // Without local Supabase public configuration there is no client request.
  // This test uses dummy public values supplied by the test server environment.
  await expect(page.getByRole('button', { name: 'Load session', exact: true })).toBeVisible();
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('tvm_session_v1')!).coacheeName)).toBe(fixture.coacheeName);
  await page.getByRole('button', { name: 'Dismiss', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Resume last session', exact: true })).toBeVisible();
});
