import { type Page, type Locator } from '@playwright/test';
import { expect } from '@playwright/test';
import { PaymentPageLocators } from '../locators/paymentMethod.locators';
import { paymentTestData } from '../../src/testData/PaymentMethod.testdata';
import { env } from '../../config/env';

export class PaymentPage {
    readonly page: Page;
    readonly locators: PaymentPageLocators;
    
  constructor(page: Page) {
    this.page = page;
    this.locators = new PaymentPageLocators(page);
  }
  async verifyPaymentPage() {
    await expect(this.locators.paymentPageHeader).toBeVisible();
  }

  async proceedToPlaceOrder() {

    await this.page.getByPlaceholder(paymentTestData.selectCountry).pressSequentially(paymentTestData.selectCountryInput);
    const dropdown = this.page.locator(".ta-results");
    await dropdown.waitFor();
    await dropdown.locator("button").filter({ hasText: paymentTestData.selectCountryName }).nth(1).click();     
    //await this.page.getByRole("button", { name: "India" }).nth(1).click();

    expect(this.page.locator(".user__name label[type='text']")).toHaveText(env.username);
    await this.page.getByText(paymentTestData.placeOrderButton).click();
  }
}