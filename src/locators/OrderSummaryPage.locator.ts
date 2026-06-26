import { type Locator, type Page } from '@playwright/test';
import { HeaderComponent } from '../pages/HeaderComponent';

export class OrderSummaryPage {
  readonly OrderSummarySection: Locator;
  readonly OrdersButton: Locator;

  constructor(page: Page) {
    this.OrderSummarySection = page.locator('.order-summary');
    this.OrdersButton = page.locator('button[routerlink*="/dashboard/myorders"]');
  }
}
