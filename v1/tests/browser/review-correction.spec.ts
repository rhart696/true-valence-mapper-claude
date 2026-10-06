import { test, expect, type Page } from '@playwright/test';
const fixture = { coacheeName: 'Synthetic Executive', currentStep: 'map', relationships: [{ id: 'rel-1-test', name: 'Synthetic Colleague', outbound: 'high', inbound: 'unscored', note: 'Synthetic note' }] };
async function seed(page: Page) {
  await page.addInitScript(({ fixture }) => {
    if (!localStorage.getItem('review-seeded')) {
      localStorage.setItem('tvm_session_v1', JSON.stringify(fixture));
      localStorage.setItem('tvm-onboarding-v1-complete', '1');
      localStorage.setItem('review-seeded', '1');
    }
  }, { fixture });
}
test('resume keyboard stays modal and retains bytes until safe Escape resume', async ({ page }) => {
  await seed(page); await page.goto('/');
  const resume = page.getByRole('button', { name: 'Resume last session', exact: true });
  await expect(resume).toBeVisible(); await resume.focus();
  for (let i = 0; i < 6; i++) {
    await page.keyboard.press('Shift+Tab');
    expect(await page.evaluate(() => !!document.activeElement?.closest('[role="dialog"],dialog'))).toBe(true);
  }
  await page.evaluate(() => { const button = Array.from(document.querySelectorAll('button')).find(b => b.textContent?.trim() === 'Start Session'); button?.click(); });
  expect(await page.evaluate(() => localStorage.getItem('tvm_session_v1'))).toBe(JSON.stringify(fixture));
  await page.keyboard.press('Escape');
  await expect(page.getByText('Synthetic Colleague', { exact: true }).first()).toBeVisible();
  await page.reload(); await expect(resume).toBeVisible();
});
test('accepted shared map clears stale resume prompt', async ({ page }) => {
  await seed(page);
  await page.route('**/rest/v1/shared_sessions*', route => route.fulfill({ json: { session: { ...fixture, coacheeName: 'Incoming Synthetic Map' } } }));
  await page.goto('/?share=ABCDEF');
  await page.getByRole('button', { name: 'Load session', exact: true }).click();
  await expect.poll(() => page.evaluate(() => { const d = JSON.parse(localStorage.getItem('tvm_session_v1')!); return (d.session ?? d).coacheeName; })).toBe('Incoming Synthetic Map');
  await expect(page.getByRole('dialog', { name: 'Resume last session?' })).toHaveCount(0);
});
test('malformed shared row fails visibly and preserves prior bytes', async ({ page }) => {
  await seed(page);
  await page.route('**/rest/v1/shared_sessions*', route => route.fulfill({ json: { session: { ...fixture, relationships: [null] } } }));
  await page.goto('/?share=ABCDEF');
  await expect(page.getByRole('alert').filter({ hasText: 'shared map could not be loaded' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Load session', exact: true })).toHaveCount(0);
  expect(await page.evaluate(() => localStorage.getItem('tvm_session_v1'))).toBe(JSON.stringify(fixture));
});
test('quota failure during replacement keeps prior map and pending choice', async ({ page }) => {
  await seed(page);
  await page.addInitScript(() => {
    const original = Storage.prototype.setItem;
    Storage.prototype.setItem = function(k, v) { if (k === 'tvm_session_v1' && localStorage.getItem('review-seeded')) throw new Error('synthetic quota'); original.call(this, k, v); };
  });
  await page.route('**/rest/v1/shared_sessions*', route => route.fulfill({ json: { session: { ...fixture, coacheeName: 'Incoming Synthetic Map' } } }));
  await page.goto('/?share=ABCDEF');
  await page.getByRole('button', { name: 'Load session', exact: true }).click();
  await expect(page.getByRole('alert').filter({ hasText: 'Changes could not be saved' })).toBeVisible();
  expect(await page.evaluate(() => localStorage.getItem('tvm_session_v1'))).toBe(JSON.stringify(fixture));
  await expect(page.getByRole('button', { name: 'Load session', exact: true })).toBeVisible();
});
test('failed PDF stays on map without success or automatic print', async ({ page }) => {
  await seed(page); await page.goto('/');
  await page.getByRole('button', { name: 'Resume last session', exact: true }).click();
  await page.evaluate(() => { document.getElementById('hub-spoke-svg')?.remove(); window.print = () => { throw new Error('Automatic print must not run'); }; });
  await page.getByRole('button', { name: 'Export PDF', exact: true }).click();
  await expect(page.getByRole('alert').filter({ hasText: 'PDF could not be prepared' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Export PDF', exact: true })).toBeVisible();
  await expect(page.getByText('PDF Downloaded', { exact: true })).toHaveCount(0);
});

test('successful PDF emits a real nonempty download and retains map', async ({ page }) => {
  await seed(page); await page.goto('/');
  await page.getByRole('button', { name: 'Resume last session', exact: true }).click();
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Export PDF', exact: true }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toMatch(/trust-map.*\.pdf$/);
  expect(await download.failure()).toBeNull();
  const path = await download.path();
  const fs = await import('node:fs/promises');
  const bytes = await fs.readFile(path!);
  expect(bytes.subarray(0, 5).toString()).toBe('%PDF-');
  expect(bytes.length).toBeGreaterThan(1000);
  await expect(page.getByRole('heading', { name: 'PDF prepared' })).toBeVisible();
});
