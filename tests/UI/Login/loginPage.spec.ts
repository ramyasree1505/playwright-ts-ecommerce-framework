import { test, expect } from '../../../fixtures/basefixture';
import { loginTestData } from '../../../src/testData/login.testdata';

test.describe('Form Input Validation', () => {

  test('should accept valid email input', async ({ loginPage }) => {
    await loginPage.enterEmail(loginTestData.validEmail);
    await expect(loginPage.emailInput).toHaveValue(loginTestData.validEmail);
  });

  test('should accept password input', async ({ loginPage }) => {
    await loginPage.enterPassword(loginTestData.validPassword);
    await expect(loginPage.passwordInput).toHaveValue(loginTestData.validPassword);
  });

  test('should clear form fields successfully', async ({ loginPage }) => {
    await loginPage.enterEmail(loginTestData.validEmail);
    await loginPage.enterPassword(
      loginTestData.validPassword
    );

    await loginPage.clearForm();
    await expect(loginPage.emailInput).toHaveValue('');
    await expect(loginPage.passwordInput).toHaveValue('');
  });
});
