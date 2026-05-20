import { test, expect } from '../../../fixtures/basefixture';
import { LoginPage } from '../../../src/pages/loginpage';
import { env } from '../../../config/env';
import { loginTestData } from '../../../src/testData/login.testdata';

test.describe('Login Functionality', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ loginPage: lp }) => {

    // Assigning the loginPage instance from the fixture to the local variable for use in the tests.
    loginPage = lp;

  });

  test('should login successfully with valid credentials', async ({ page }) => {
    await loginPage.login(
      env.username,
      env.password
    );

    await page.waitForURL('**/dashboard/**');
    await expect(page).toHaveURL(/\/dashboard\/dash$/);
  });

  test('should show error for invalid email address', async ({ page }) => {
    await loginPage.login(
      loginTestData.invalidEmail,
      env.password
    );

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Incorrect');
    await expect(page).toHaveURL(/auth\/login/);
  });

  test('should show error for invalid password', async ({ page }) => {
    await loginPage.login(
      env.username,
      loginTestData.invalidPassword
    );

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Incorrect');
    await expect(page).toHaveURL(/auth\/login/);
  });

  test('should show error for invalid credentials', async ({ page }) => {
    await loginPage.login(
      loginTestData.invalidEmail,
      loginTestData.invalidPassword
    );

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Incorrect');
    await expect(page).toHaveURL(/auth\/login/);
  });
});
