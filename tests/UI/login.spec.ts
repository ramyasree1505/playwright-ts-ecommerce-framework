import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/loginpage';
import { BASE_URL } from '../../config/env';
import { loginTestData } from '../../src/testData/login.testdata';

test.describe('Login Page Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto(BASE_URL); 
  });

  // Grouping tests related to login form visibility and elements
  test.describe('Login Form Visibility', () => {

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

  // Grouping tests related to login functionality
  test.describe('Page Navigation', () => {

    test('should navigate to login page successfully', async ({ page }) => {
      await expect(page).toHaveURL(/auth\/login/);
    });

    test('should display login page correctly', async () => {
      await expect(loginPage.loginForm).toBeVisible();
    });
  });

  // Grouping tests related to login functionality
  test.describe('Login Functionality', () => {

    test('should login successfully with valid credentials', async ({ page }) => {
      await loginPage.login(
        loginTestData.validEmail,
        loginTestData.validPassword
      );

      await page.waitForURL('**/dashboard/**');
      await expect(page).toHaveURL(/\/dashboard\/dash$/);
    });

    test('should show error for invalid email address', async ({ page }) => {
      await loginPage.login(
        loginTestData.invalidEmail,
        loginTestData.validPassword
      );

      await expect(loginPage.errorMessage).toBeVisible();
      await expect(loginPage.errorMessage).toContainText('Incorrect');
      await expect(page).toHaveURL(/auth\/login/);
    });

    test('should show error for invalid password', async ({ page }) => {
      await loginPage.login(
        loginTestData.validEmail,
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

  // Grouping tests related to form input validation
  test.describe('Form Input Validation', () => {

    test('should accept valid email input', async () => {
      await loginPage.enterEmail(loginTestData.validEmail);
      await expect(loginPage.emailInput).toHaveValue(loginTestData.validEmail);
    });

    test('should accept password input', async () => {
      await loginPage.enterPassword(loginTestData.validPassword);
      await expect(loginPage.passwordInput).toHaveValue(loginTestData.validPassword);
    });

    test('should clear form fields successfully', async () => {
      await loginPage.enterEmail(loginTestData.validEmail);
      await loginPage.enterPassword(
        loginTestData.validPassword
      );

      await loginPage.clearForm();
      await expect(loginPage.emailInput).toHaveValue('');
      await expect(loginPage.passwordInput).toHaveValue('');
    });
  });
});