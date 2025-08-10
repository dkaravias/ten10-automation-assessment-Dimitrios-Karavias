import { Page, Locator, expect } from '@playwright/test';
import { TestUtils } from '../utils/testUtils';

export class LoginPage {
  private readonly page: Page;
  private readonly loginButton: Locator;
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.emailInput = page.getByRole('textbox', { name: 'Email' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.submitButton = page.getByRole('button', { name: 'Log in' });
  }

  async navigateToLogin() {
    await this.page.goto('/');
    await this.loginButton.click();
  }

  async fillCredentials(email: string, password: string) {
    await TestUtils.smartFill(this.emailInput, email);
    await TestUtils.smartFill(this.passwordInput, password);
  }

  async submitLogin() {
    await this.submitButton.click();
    // Network idle wait is handled by global config
  }

  async login(email: string, password: string) {
    const perfStart = await TestUtils.performanceCheck(this.page, 'Complete login flow');
    
    await this.navigateToLogin();
    await this.fillCredentials(email, password);
    await this.submitLogin();
    
    TestUtils.finishPerformanceCheck(perfStart, 'Complete login flow');
  }

  // Validation methods
  async verifyLoginButtonVisible() {
    await expect(this.loginButton).toBeVisible();
  }

  async verifyLoginFormVisible() {
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.submitButton).toBeVisible();
  }
}
