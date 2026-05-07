import { type Locator, type Page } from '@playwright/test';

export class LoginPageLocators {
  readonly loginForm: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly emailErrorMessage: Locator;
  readonly passwordErrorMessage: Locator;
  readonly loginTitle: Locator;

  constructor(page: Page) {
    this.loginForm = page.locator('form:has(#login)');
    this.emailInput = page.locator('input[type="email"]');
    this.passwordInput = page.locator('input[type="password"]');
    this.loginButton = page.locator('input[type="submit"]');
    this.errorMessage = page.locator('[class*=\"error\"], [class*=\"alert-danger\"]');
    this.emailErrorMessage = page.locator('div[class*=\"form-group\"]:has(input[type=\"email\"]) ~ div[class*=\"error\"]');
    this.passwordErrorMessage = page.locator('div[class*=\"form-group\"]:has(input[type=\"password\"]) ~ div[class*=\"error\"]');
    this.loginTitle = page.locator('h1, h2, .login-title');
  }
}
