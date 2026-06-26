import { test, expect } from '../../../fixtures/basefixture';
import { HomePage } from '../../../src/pages/Homepage';

test.describe('Home Page Functionality', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ loginPage }) => {
    homePage = new HomePage(loginPage.page);
  });

  test('Verify user should display the home page header and products after login', async () => {
    await homePage.verifyHomePageHeader();

    const numberOfProducts = await homePage.getNumberOfProductsAvailable();
    expect(numberOfProducts).toBeGreaterThan(0);
  });

  test('Verify user should show product cards with add to cart actions', async () => {
    await homePage.verifyHomePageHeader();

    const productCount = await homePage.getNumberOfProductsAvailable();
    expect(productCount).toBeGreaterThan(0);

    await expect(homePage.locators.productName.first()).toBeVisible();
    await expect(homePage.locators.addToCartButton.first()).toBeVisible();
  });

  test('Verify user should add a specific product to the cart', async () => {
    await homePage.verifyHomePageHeader();

    await homePage.addToCartByProductName('ZARA COAT 3');

    await expect(homePage.locators.addToCartButton.first()).toBeVisible();
  });

  test('Verify user should navigate to My Orders page from the home page', async ({ page }) => {
    await homePage.verifyHomePageHeader();

    await homePage.headerComponent.clickOrders();

    await expect(page).toHaveURL(/\/dashboard\/myorders$/);
  });
});