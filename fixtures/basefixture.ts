import { test as base } from '@playwright/test';
import { expect } from '@playwright/test';
import { LoginPage } from '../src/pages/loginpage';
import { env } from '../config/env';

type FixtureBase = {
    loginPage: LoginPage;
};

// Define the base fixture with the necessary setup and teardown logic.
export const test = base.extend<FixtureBase>({
    loginPage: async ({ page }, use) => {

        // Initialize the LoginPage with the provided page object.
        const loginPage = new LoginPage(page);
        await page.goto('/client/#/auth/login');
        // await loginPage.goto();
        await loginPage.login(env.username,env.password);
        await expect(page).toHaveURL(/\/dashboard\/dash$/);
        
        // Use the initialized loginPage in the tests.
        await use(loginPage);
    }
});

export { expect } from '@playwright/test';
