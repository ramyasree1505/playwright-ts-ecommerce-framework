import { type Locator, type Page } from '@playwright/test';

export class HomePageLocators {
  readonly myOrdersButton: Locator;
  readonly homePageHeader: Locator;
  readonly numberOfProducts: Locator;
  readonly productName: Locator;
  readonly addToCartButton: Locator;
  readonly successToast: Locator;
  
  constructor(page: Page) {
    this.myOrdersButton = page.locator('button[routerlink*=\"myorders\"]');
    this.homePageHeader = page.locator('h3:has-text("Automation")');
    this.numberOfProducts = page.locator('[id="products"] .card');
    this.productName = page.locator('.card');
    this.addToCartButton = page.locator('button:has-text("Add To Cart")');
    this.successToast = page.locator('#toast-container');
  }
}
