import { test, expect } from '../../../fixtures/basefixture';

test.describe('Page Navigation', () => {

  test('should navigate to login page successfully', async ({ page }) => {
    await expect(page).toHaveURL(/auth\/login/);
  });

  test('should display login page correctly', async ({ loginPage }) => {
    await expect(loginPage.loginForm).toBeVisible();
  });
});