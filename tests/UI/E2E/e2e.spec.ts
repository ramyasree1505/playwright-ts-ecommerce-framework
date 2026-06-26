import { test, expect } from '../../../fixtures/basefixture';
import { HomePage } from '../../../src/pages/Homepage';
import { productsTestData } from '../../../src/testData/products.testdata';
import { PaymentPage } from '../../../src/pages/paymentPage';
import { OrderSummary } from '../../../src/pages/OrderSummary';
import { CartPage } from '../../../src/pages/CartPage';
import { orderSummaryTestData } from '../../../src/testData/OrderSummary.testdata';
import { OrdersPage } from '../../../src/pages/OrdersPage';

test.describe('End to End Ecommerce Flow', () => {
  test('Verify the complete purchase flow from product addition to order confirmation', async ({ page, loginPage }) => {
    const homePage = new HomePage(loginPage.page);
    const cartPage = new CartPage(page);
    const paymentPage = new PaymentPage(page);
    const orderSummary = new OrderSummary(page);
    
    await homePage.verifyHomePageHeader();
    await homePage.addToCartByProductName(productsTestData.productZara);

    // Navigate to Cart Page and verify the product is added
    await homePage.navigateToCartPage();
    await cartPage.verifyCartPage();
    await cartPage.verifyMyCartProducts(productsTestData.productZara);

    // Proceed to Checkout and verify order summary
    await cartPage.proceedToCheckout();
    await paymentPage.proceedToPlaceOrder();
    await orderSummary.verifyOrderSummary(productsTestData.productZara, orderSummaryTestData.thankyouForOrder);

    // Get Orders ID from Order Summary Page
    const orderId = await orderSummary.getOrderId();
    expect(orderId).not.toBeNull();

    // Navigate to Orders Page and verify the order details
    await orderSummary.headerComponent.clickOrders();
    const ordersPage = new OrdersPage(page);
    await ordersPage.verifyOrderPage();
    await ordersPage.verifyOrderDetails(orderId);

  });
});