import { defineConfig, devices } from '@playwright/test';
import { env } from './config/env';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  timeout: 30000,

  expect: {
    timeout: 5000
  },

  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['list'],
    ['allure-playwright']
  ],

  use: {
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
  ],
});
