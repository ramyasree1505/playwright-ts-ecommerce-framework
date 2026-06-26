import { type Locator, type Page } from '@playwright/test';

export class HeaderComponent {
  constructor(private page: Page) {}

  readonly ordersButton =
    this.page.getByRole('button', { name: 'ORDERS' });

  async clickOrders() {
    await this.ordersButton.click();
  }
}