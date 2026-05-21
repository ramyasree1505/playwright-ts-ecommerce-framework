import { test, expect } from '../../../fixtures/basefixture';

test.describe('Login Form Visibility', () => {

  test('should load login form successfully', async ({ loginPage }) => {
    await expect(loginPage.loginForm).toBeVisible();
  });

  test('should display email input field', async ({ loginPage }) => {
    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.emailInput).toBeEditable();
  });

  test('should display password input field', async ({ loginPage }) => {
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeEditable();
  });

  test('should display enabled login button', async ({ loginPage }) => {
    await expect(loginPage.loginButton).toBeVisible();
    await expect(loginPage.loginButton).toBeEnabled();
  });
});