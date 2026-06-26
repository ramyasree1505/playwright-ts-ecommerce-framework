import { type Locator, type Page } from '@playwright/test';

export class CartPageLocators {
  readonly CartList: Locator;
  readonly CartSection: Locator;

  constructor(page: Page) {
      this.CartList = page.locator('div li');
      this.CartSection = page.locator('[class="cartSection"]');
  }
}
