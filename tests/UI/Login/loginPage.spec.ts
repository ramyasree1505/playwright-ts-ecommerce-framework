import { env } from '../../../config/env';
import { test, expect } from '../../../fixtures/basefixture';

test.describe('Form Input Validation', () => {

  test('should accept valid email input', async ({ loginPage }) => {
    await loginPage.enterEmail(env.username);
    await expect(loginPage.emailInput).toHaveValue(env.username);
  });

  test('should accept password input', async ({ loginPage }) => {
    await loginPage.enterPassword(env.password);
    await expect(loginPage.passwordInput).toHaveValue(env.password);
  });

  test('should clear form fields successfully', async ({ loginPage }) => {
    await loginPage.enterEmail(env.username);
    await loginPage.enterPassword(
      env.password
    );

    await loginPage.clearForm();
    await expect(loginPage.emailInput).toHaveValue('');
    await expect(loginPage.passwordInput).toHaveValue('');
  });
});
