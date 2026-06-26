import { type Page, type Locator } from '@playwright/test';
import { HomePageLocators } from '../locators/Home.locators';
import { expect } from '@playwright/test';
import { HeaderComponent } from './HeaderComponent';

export class HomePage {

  readonly page: Page;
  readonly locators: HomePageLocators;
  readonly headerComponent: HeaderComponent;
  
  constructor(page: Page) {
    this.page = page;
    this.locators = new HomePageLocators(page);
    this.headerComponent = new HeaderComponent(page); 
  }
  async verifyHomePageHeader() {
    await expect(this.locators.homePageHeader).toBeVisible();
  }
  
  async navigateToCartPage() {
    await this.page.getByRole("listitem").getByRole('button', { name: "Cart" }).click();
  }
  
  async getNumberOfProductsAvailable(): Promise<number> {
    await this.locators.numberOfProducts.first().waitFor({ state: 'visible' });
    const productCount = await this.locators.numberOfProducts.count();
    return productCount;
  }

  async addToCartByProductName(productName: string) {
    await this.locators.productName.filter({ hasText: productName }).first().waitFor({ state: 'visible' });
    await this.locators.productName.filter({ hasText: productName }).getByRole('button', { name: ' Add To Cart' }).click();
    await expect(this.locators.successToast).toContainText('Product Added To Cart');
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('load');
  }

  async verifyProductsLoaded() {
    await this.page.locator(".card-body b").first().waitFor();
  }

  async verifyProductsTitles() {
    const productTitles = await this.page.locator(".card-body b").allTextContents();
    console.log("Product Titles:", productTitles);
  }

}