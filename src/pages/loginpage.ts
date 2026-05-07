import { type Page, type Locator } from '@playwright/test';
import { LoginPageLocators } from '../locators/login.locators';

export class LoginPage {

  readonly page: Page;
  readonly locators: LoginPageLocators;
  readonly loginForm: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.locators = new LoginPageLocators(page);
    this.loginForm = this.locators.loginForm;
    this.emailInput = this.locators.emailInput;
    this.passwordInput = this.locators.passwordInput;
    this.loginButton = this.locators.loginButton;
    this.errorMessage = this.locators.errorMessage;
  }

  async goto(baseUrl: string = '') {
    await this.page.goto(baseUrl);
  }

  async enterEmail(email: string) {
    await this.emailInput.fill(email);
  }

  async enterPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async clickLoginButton() {
    await this.loginButton.click();
  }

  async login(email: string, password: string) {
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }

  async clearForm() {
    await this.emailInput.clear();
    await this.passwordInput.clear();
  }

  async getErrorMessage(): Promise<string> {
    return (await this.errorMessage.textContent()) || '';
  }
}