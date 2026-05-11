import { test, expect, request } from '@playwright/test';
import { ApiUtils } from '../../src/utils/APiutils';
import { loginPayLoad } from '../../src/testData/apiPayloads/LoginPayload';
import { productsPayLoad } from '../../src/testData/apiPayloads/productsPayload';
import { LoginPage } from '../../src/pages/loginpage';
import { BASE_URL, REST_API_BASE_URL } from '../../config/env';
import { HomePage } from '../../src/pages/Homepage';


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
    await loginPage.goto(BASE_URL);

    // Since we have already set the token in local storage, we can directly navigate to the home page and click on my orders button
    homePage = new HomePage(page);
    await homePage.clickMyOrdersButton();
    await page.locator("tbody").waitFor();
    const rows = page.locator("tbody tr");

    // Iterate through the rows to find the order with the matching orderId and click on the details button
    for (let i : number = 0; i < await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (response.orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }

    // Verify the order details
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(response.orderId.includes(orderIdDetails)).toBeTruthy();

});
