import { type Page, type Locator } from '@playwright/test';
import { CartPageLocators } from '../locators/Cart.locators';
import { expect } from '@playwright/test';

export class CartPage {

  readonly page: Page;
  readonly locators: CartPageLocators;
  
  constructor(page: Page) {
    this.page = page;
    this.locators = new CartPageLocators(page);
  }
  async verifyCartPage() {
    await expect(this.page).toHaveURL(/\/dashboard\/cart/);
  }

  async verifyMyCartProducts(productName: string) {
    await this.locators.CartList.first().waitFor();
    await expect(this.page.getByText(productName)).toBeVisible();
    await expect(this.locators.CartSection).toContainText(productName);
  }

  async proceedToCheckout() {
    await this.page.getByRole("button", { name: "Checkout" }).click();
  }
}