import { env } from '../../../src/config/env';
import { test, expect } from '../../../fixtures/basefixture';
import { LoginPage } from '../../../src/pages/loginpage';

test.describe('Form Input Validation', () => {
  let loginPage: LoginPage;
  
  test.beforeEach(async ({page}) => {
    await page.goto('/client/#/auth/login');
    loginPage = new LoginPage(page);
  });


  test('should accept valid email input', async () => {
    await loginPage.enterEmail(env.username);
    await expect(loginPage.emailInput).toHaveValue(env.username);
  });

  test('should accept password input', async () => {
    await loginPage.enterPassword(env.password);
    await expect(loginPage.passwordInput).toHaveValue(env.password);
  });

  test('should clear form fields successfully', async () => {
    await loginPage.enterEmail(env.username);
    await loginPage.enterPassword(
      env.password
    );

    await loginPage.clearForm();
    await expect(loginPage.emailInput).toHaveValue('');
    await expect(loginPage.passwordInput).toHaveValue('');
  });
});
