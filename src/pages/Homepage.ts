import { type Page, type Locator } from '@playwright/test';
import { HomePageLocators } from '../locators/Home.locators';

export class HomePage {

  readonly page: Page;
  readonly locators: HomePageLocators;
  readonly myOrdersButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.locators = new HomePageLocators(page);
    this.myOrdersButton = this.locators.myOrdersButton;

  }

  async clickMyOrdersButton() {
    await this.myOrdersButton.click();
  }

}