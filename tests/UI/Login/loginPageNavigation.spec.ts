import { test, expect } from '../../../fixtures/basefixture';
import { LoginPage } from '../../../src/pages/loginpage';

test.describe('Page Navigation', () => {
  let loginPage: LoginPage;
  
  test.beforeEach(async ({page}) => {
    await page.goto('/client/#/auth/login');
    loginPage = new LoginPage(page);
  });


  test('should navigate to login page successfully', async ({ page }) => {
    await expect(page).toHaveURL(/auth\/login/);
  });

  test('should display login page correctly', async () => {
    await expect(loginPage.loginForm).toBeVisible();
  });
});