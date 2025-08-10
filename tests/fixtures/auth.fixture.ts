import { test as base, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InterestCalculatorPage } from '../pages/InterestCalculatorPage';
import { TEST_USERS, TestUserType } from '../data/testUsers';

type AuthFixtures = {
  loginPage: LoginPage;
  calculatorPage: InterestCalculatorPage;
  authenticatedPage: Page;
};

export const test = base.extend<AuthFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  calculatorPage: async ({ page }, use) => {
    const calculatorPage = new InterestCalculatorPage(page);
    await use(calculatorPage);
  },

  authenticatedPage: async ({ page }, use) => {
    // This fixture automatically logs in a user
    const loginPage = new LoginPage(page);
    const standardUser = TEST_USERS.standardUser;
    
    await loginPage.login(standardUser.email, standardUser.password);
    
    await use(page);
  },
});

export { expect } from '@playwright/test';

// Helper function for logging in with different user types
export async function loginAsUser(page: Page, userType: TestUserType = 'standardUser') {
  const loginPage = new LoginPage(page);
  const user = TEST_USERS[userType];
  await loginPage.login(user.email, user.password);
  return page;
}
