import { Page, Locator, expect } from '@playwright/test';
import { TestUtils } from '../utils/testUtils';

export type Duration = 'Daily' | 'Monthly' | 'Yearly';

export class InterestCalculatorPage {
  readonly page: Page;
  private readonly principalAmountInput: Locator;
  private readonly interestRateSelect: Locator;
  private readonly durationLinkDaily: Locator;
  private readonly durationLinkMonthly: Locator;
  private readonly durationLinkYearly: Locator;
  private readonly consentCheckbox: Locator;
  private readonly calculateButton: Locator;
  private readonly calculatedInterestDisplay: Locator;
  private readonly totalAmountDisplay: Locator;
  private readonly errorMessageArea: Locator;

  constructor(page: Page) {
    this.page = page;
    this.principalAmountInput = page.getByRole('textbox', { name: 'Principal Amount' });
    this.interestRateSelect = page.getByRole('combobox', { name: 'Interest Rate' });
    this.durationLinkDaily = page.getByRole('link', { name: 'Daily' });
    this.durationLinkMonthly = page.getByRole('link', { name: 'Monthly' });
    this.durationLinkYearly = page.getByRole('link', { name: 'Yearly' });
    this.consentCheckbox = page.getByRole('checkbox', { name: 'Consent' });
    this.calculateButton = page.getByRole('button', { name: 'Calculate' });
    this.calculatedInterestDisplay = page.getByTestId('calculated-interest');
    this.totalAmountDisplay = page.getByTestId('total-amount');
    this.errorMessageArea = page.getByTestId('error-message');
  }

  // Input methods for requirements 1-3
  async enterPrincipalAmount(amount: string): Promise<void> {
    await this.page.getByRole('slider', { name: 'Principal Amount:' }).fill(amount);
  }

  async selectInterestRate(rate: string): Promise<void> {
    await this.page.getByRole('button', { name: /Select Interest Rate/ }).click();
    await this.page.getByRole('checkbox', { name: rate, exact: true }).check();
  }

  async selectDuration(duration: Duration): Promise<void> {
    switch (duration) {
      case 'Daily':
        await this.durationLinkDaily.click();
        break;
      case 'Monthly':
        await this.durationLinkMonthly.click();
        break;
      case 'Yearly':
        await this.durationLinkYearly.click();
        break;
    }
  }

  async toggleConsent(agree: boolean): Promise<void> {
    if (agree) {
      await this.consentCheckbox.check();
    } else {
      await this.consentCheckbox.uncheck();
    }
  }

  async clickCalculate(): Promise<void> {
    await this.calculateButton.click();
  }

  // Validation methods for requirements 4-5
  async getCalculatedInterest(): Promise<string> {
    await expect(this.calculatedInterestDisplay).toBeVisible();
    return await this.calculatedInterestDisplay.textContent() || '';
  }

  async getTotalAmount(): Promise<string> {
    await expect(this.totalAmountDisplay).toBeVisible();
    return await this.totalAmountDisplay.textContent() || '';
  }

  // Error handling methods for requirements 6-7, 10
  async getErrorMessage(): Promise<string> {
    await expect(this.errorMessageArea).toBeVisible();
    return await this.errorMessageArea.textContent() || '';
  }

  async verifyFieldErrorMessage(field: string): Promise<string> {
    const fieldErrorLocator = this.page.getByTestId(`${field}-error`);
    await expect(fieldErrorLocator).toBeVisible();
    return await fieldErrorLocator.textContent() || '';
  }

  // Form state methods for requirement 8
  async verifyResultsRoundedToTwoDecimals(): Promise<boolean> {
    const interestText = await this.getCalculatedInterest();
    const totalText = await this.getTotalAmount();
    
    // Extract numeric values and check decimal places
    const interestMatch = interestText.match(/\d+\.\d{2}/);
    const totalMatch = totalText.match(/\d+\.\d{2}/);
    
    return !!(interestMatch && totalMatch);
  }

  // Responsive design methods for requirement 9
  async verifyResponsiveLayout(): Promise<void> {
    await expect(this.principalAmountInput).toBeVisible();
    await expect(this.interestRateSelect).toBeVisible();
    await expect(this.consentCheckbox).toBeVisible();
    await expect(this.calculateButton).toBeVisible();
  }

  // Helper methods
  async fillCompleteForm(principal: string, rate: string, duration: Duration, consent: boolean): Promise<void> {
    await this.enterPrincipalAmount(principal);
    await this.selectInterestRate(rate);
    await this.selectDuration(duration);
    await this.toggleConsent(consent);
  }

  async verifyDurationOptionsAvailable(): Promise<void> {
    await expect(this.durationLinkDaily).toBeVisible();
    await expect(this.durationLinkMonthly).toBeVisible();
    await expect(this.durationLinkYearly).toBeVisible();
  }

  async verifyDurationSelected(duration: Duration): Promise<void> {
    const durationLink = this.page.getByRole('link', { name: duration });
    await expect(durationLink).toHaveClass(/active/);
  }

  async verifyPrincipalAmountValue(expectedValue: string): Promise<void> {

}

  async verifyInterestRateSelected(expectedRate: string): Promise<void> {
    await expect(this.interestRateSelect).toHaveValue(expectedRate);
  }

  async verifyInterestRateOptionsUpTo15Percent(): Promise<void> {
    await this.interestRateSelect.click();
    
    // Verify that options up to 15% are available
    await expect(this.page.getByRole('option', { name: '15%' })).toBeVisible();
    
    // Close dropdown
    await this.page.keyboard.press('Escape');
  }

  async verifyCalculationResults(): Promise<void> {
    await expect(this.calculatedInterestDisplay).toBeVisible();
    await expect(this.totalAmountDisplay).toBeVisible();
  }

  async verifyMandatoryFieldsValidation(): Promise<void> {
    await this.clickCalculate();
    await expect(this.errorMessageArea).toBeVisible();
  }
}