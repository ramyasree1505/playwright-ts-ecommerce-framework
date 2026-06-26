import { type Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { OrdersPageLocators } from '../locators/Orders.locators';

export class OrdersPage {

  readonly page: Page;
  readonly ordersPageLocators: OrdersPageLocators;
  
  constructor(page: Page)
  {
    this.page = page;
    this.ordersPageLocators = new OrdersPageLocators(page);
  }

  async verifyOrderPage() {
    await expect(this.page).toHaveURL(/\/dashboard\/myorders/);
  }
  
  async verifyOrderDetails(orderId: string) {
    await this.page.locator("tbody").waitFor();
    const orderRow = this.page.locator("tbody tr").filter({ hasText: orderId });
    await expect(orderRow).toHaveCount(1);
    await orderRow.getByRole('button', { name: 'View' }).click();

    // Verify the order details on the order summary page
    await expect(this.page.locator(".col-text")).toContainText(orderId);
  }

}