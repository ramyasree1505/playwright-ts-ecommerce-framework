import { type Locator, type Page } from '@playwright/test';

export class PaymentPageLocators {
  readonly paymentPageHeader: Locator;

  constructor(page: Page) {
      this.paymentPageHeader = page.locator('.payment__title');
  }
}
