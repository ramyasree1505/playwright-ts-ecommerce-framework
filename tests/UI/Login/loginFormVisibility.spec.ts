import { test, expect } from '../../../fixtures/basefixture';
import { LoginPage } from '../../../src/pages/loginpage';

test.describe('Login Form Visibility', () => {
  let loginPage: LoginPage;
  
  test.beforeEach(async ({page}) => {
    await page.goto('/client/#/auth/login');
    loginPage = new LoginPage(page);
  });


  test('should load login form successfully', async () => {
    await expect(loginPage.loginForm).toBeVisible();
  });

  test('should display email input field', async () => {
    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.emailInput).toBeEditable();
  });

  test('should display password input field', async () => {
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeEditable();
  });

  test('should display enabled login button', async () => {
    await expect(loginPage.loginButton).toBeVisible();
    await expect(loginPage.loginButton).toBeEnabled();
  });
});