import { test, expect, request } from '@playwright/test';
import { ApiUtils } from '../../src/utils/APiutils';
import { loginPayLoad } from '../../src/testData/apiPayloads/LoginPayload';
import { productsPayLoad } from '../../src/testData/apiPayloads/productsPayload';
import { LoginPage } from '../../src/pages/loginpage';
import { HomePage } from '../../src/pages/Homepage';
import { OrdersPage } from '../../src/pages/OrdersPage';


let response: any;
let loginPage: LoginPage;
let homePage: HomePage;

test.beforeAll(async () => {
    // Create API context and instance of ApiUtils
    const apiContext = await request.newContext();
    const apiUtils = new ApiUtils(apiContext, loginPayLoad, productsPayLoad);
    const productId = await apiUtils.getProductIds(productsPayLoad);
    const orderPayLoad = {
        orders: [
            { country: "Cuba", productOrderedId: productId }
        ]
    };

    // Get token and create order
    response = await apiUtils.createOrder(orderPayLoad);

})

// Create order is success
test('@API Place the order', async ({ page }) => {
    await page.addInitScript(value => {
        localStorage.setItem('token', value);
    }, response.token);

    // Navigate to the orders page and verify the order is present in UI
    loginPage = new LoginPage(page);
    await loginPage.goto();

    // Since we have already set the token in local storage, we can directly navigate to the home page and click on my orders button
    homePage = new HomePage(page);
    await homePage.headerComponent.clickOrders();

    // Verify the order is present in the orders page
    const ordersPage = new OrdersPage(page);
    await ordersPage.verifyOrderPage();
    await ordersPage.verifyOrderDetails(response.orderId);
});
