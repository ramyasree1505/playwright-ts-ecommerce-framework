import { test, request } from '@playwright/test';
import { loginPayLoad } from '../../src/testData/apiPayloads/LoginPayload';
import { productsPayLoad } from '../../src/testData/apiPayloads/productsPayload';
import { ApiUtils } from '../../src/utils/APiutils';
import { LoginPage } from '../../src/pages/loginpage';
import { HomePage } from '../../src/pages/Homepage';

const fakePayLoadOrders = { data: [], message: "No Orders" };

let response: any;
let loginPage: LoginPage;
let homePage: HomePage;

test.beforeAll(async () => {
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
 
 
//create order is success
test('@API Intercept the orders response', async ({ page }) => {
    
    await page.addInitScript(value => {
        localStorage.setItem('token', value);
    }, response.token);

    // Navigate to the orders page and verify the order is present in UI
    loginPage = new LoginPage(page);
    await loginPage.goto();

    // Since we have already set the token in local storage, we can directly navigate to the home page and click on my orders button
    homePage = new HomePage(page);
    
    // Network Interception to intercept the orders page request and send the fake payload
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async route => {
            const response = await page.request.fetch(route.request());
            let body = JSON.stringify(fakePayLoadOrders);

            // Fulfill the request with the fake payload
            route.fulfill(
                {
                    response,
                    body,
                }
            );
        }
    );
 
    // Click on my orders button and wait for the network response
    await homePage.headerComponent.clickOrders();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
    console.log(await page.locator(".mt-4").textContent());
});