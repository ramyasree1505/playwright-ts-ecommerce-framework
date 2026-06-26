import { type Locator, type Page } from '@playwright/test';

export class OrdersPageLocators {
  readonly OrdersList: Locator;
  readonly CartSection: Locator;

  constructor(page: Page) {
      this.OrdersList = page.locator('tbody tr');
      this.CartSection = page.locator('[class="cartSection"]');
  }
}
