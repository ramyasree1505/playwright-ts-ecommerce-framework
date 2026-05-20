import { defineConfig, devices } from '@playwright/test';
import { env } from './config/env';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  timeout: env.timeout,

  expect: {
    timeout: 5000
  },
  retries: env.retries,
  workers: env.parallelThread,
  reporter: [
    ['html'],
    ['list'],
    ['allure-playwright']
  ],

  use: {
    baseURL: env.baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',

    // Grant permissions for geolocation.
    permissions: ['geolocation'],
    ignoreHTTPSErrors: true

  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // {
    //   name: 'firefox',
    //   use: {
    //     ...devices['Desktop Firefox']
    //   }
    // },
  ],
});
