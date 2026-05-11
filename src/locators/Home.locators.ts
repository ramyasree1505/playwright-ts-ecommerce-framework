import { type Locator, type Page } from '@playwright/test';

export class HomePageLocators {
  readonly myOrdersButton: Locator;

  constructor(page: Page) {
    this.myOrdersButton = page.locator('button[routerlink*=\"myorders\"]');
  }
}
