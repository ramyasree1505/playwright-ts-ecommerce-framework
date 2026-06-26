import { type Page, type Locator } from '@playwright/test';
import { expect } from '@playwright/test';
import { OrderSummaryPage } from '../../src/locators/OrderSummaryPage.locator';
import { HeaderComponent } from './HeaderComponent';

export class OrderSummary {

  readonly page: Page;
  readonly orderSummaryPage: OrderSummaryPage;
  readonly headerComponent: HeaderComponent;
  
  constructor(page: Page) {
    this.page = page;
    this.orderSummaryPage = new OrderSummaryPage(page);
    this.headerComponent = new HeaderComponent(page);
  }

  async verifyOrderSummary(productName: string, orderSummary: string) {
    await expect(this.orderSummaryPage.OrderSummarySection).toContainText(productName);
    await expect(this.page.getByText(orderSummary)).toBeVisible();
  }

  async getOrderId(): Promise<string> {
    const orderId = await this.page.locator(".em-spacer-1 .ng-star-inserted").textContent();

    if (!orderId) {
      throw new Error('Order ID not found');
    }
    
    return orderId.replace(/\|/g, '').trim();
  }
}