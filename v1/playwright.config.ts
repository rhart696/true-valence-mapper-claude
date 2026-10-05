import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests/browser',
  workers: 1,
  use: { baseURL: 'http://127.0.0.1:3000', headless: true, launchOptions: process.env.TVM_TEST_CHROMIUM ? { executablePath: process.env.TVM_TEST_CHROMIUM, args: ['--no-sandbox', '--disable-dev-shm-usage'] } : {} },
  webServer: { command: 'npm run dev -- --hostname 127.0.0.1', url: 'http://127.0.0.1:3000', reuseExistingServer: false, env: { NEXT_PUBLIC_SUPABASE_URL: 'https://synthetic.invalid', NEXT_PUBLIC_SUPABASE_ANON_KEY: 'synthetic-public-test-key', NEXT_TELEMETRY_DISABLED: '1' }, timeout: 120_000 },
});
