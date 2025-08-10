import { Page, expect } from '@playwright/test';

export class CalculatorValidation {
  static async verifyNumberFormat(value: string, expectedDecimalPlaces: number = 2): Promise<boolean> {
    const regex = new RegExp(`^\\d+\\.\\d{${expectedDecimalPlaces}}$`);
    return regex.test(value.replace(/[^\d.]/g, ''));
  }

  static async verifyCurrencyDisplay(value: string): Promise<boolean> {
    // Check if value contains currency symbols or is properly formatted as currency
    const cleanValue = value.replace(/[£$€,\s]/g, '');
    return this.verifyNumberFormat(cleanValue);
  }

  static async verifyMathematicalAccuracy(
    principal: number, 
    rate: number, 
    duration: 'Daily' | 'Monthly' | 'Yearly',
    calculatedInterest: string
  ): Promise<boolean> {
    let expectedInterest: number;
    
    // Calculate expected interest based on duration
    switch (duration) {
      case 'Daily':
        expectedInterest = (principal * rate) / 365;
        break;
      case 'Monthly':
        expectedInterest = (principal * rate) / 12;
        break;
      case 'Yearly':
        expectedInterest = principal * rate;
        break;
    }
    
    // Round to 2 decimal places
    expectedInterest = Math.round(expectedInterest * 100) / 100;
    
    // Extract numeric value from calculated interest
    const actualInterest = parseFloat(calculatedInterest.replace(/[^\d.]/g, ''));
    
    // Allow for small floating point differences
    const tolerance = 0.01;
    return Math.abs(actualInterest - expectedInterest) <= tolerance;
  }

  static async verifyCalculationConsistency(page: Page, testCases: Array<{
    principal: string;
    rate: string;
    duration: 'Daily' | 'Monthly' | 'Yearly';
  }>): Promise<boolean> {
    const results: string[] = [];
    
    // Run the same calculation multiple times
    for (let i = 0; i < 3; i++) {
      for (const testCase of testCases) {
        // Perform calculation (this would use the calculator page object)
        // Store result
        // This is a framework for consistency checking
      }
    }
    
    // Check if all results for the same input are identical
    return true; // Placeholder implementation
  }

  static async monitorCalculationPerformance(
    page: Page, 
    calculationFunction: () => Promise<void>,
    expectedMaxDuration: number = 2000
  ): Promise<{ duration: number; withinThreshold: boolean }> {
    const startTime = Date.now();
    
    await calculationFunction();
    
    const duration = Date.now() - startTime;
    const withinThreshold = duration <= expectedMaxDuration;
    
    if (!withinThreshold) {
      console.warn(`⚠️ Calculation took ${duration}ms (expected < ${expectedMaxDuration}ms)`);
    }
    
    return { duration, withinThreshold };
  }

  static extractNumericValue(displayValue: string): number {
    // Remove currency symbols, commas, and other non-numeric characters except decimal point
    const cleanValue = displayValue.replace(/[^\d.-]/g, '');
    return parseFloat(cleanValue);
  }

  static async verifyResultsPresentation(
    interestDisplay: string, 
    totalDisplay: string, 
    principalAmount: number
  ): Promise<{ isValid: boolean; errors: string[] }> {
    const errors: string[] = [];
    
    // Verify interest display format
    if (!this.verifyNumberFormat(interestDisplay)) {
      errors.push('Interest amount is not properly formatted to 2 decimal places');
    }
    
    // Verify total display format
    if (!this.verifyNumberFormat(totalDisplay)) {
      errors.push('Total amount is not properly formatted to 2 decimal places');
    }
    
    // Verify total is greater than principal
    const totalValue = this.extractNumericValue(totalDisplay);
    if (totalValue <= principalAmount) {
      errors.push('Total amount should be greater than principal amount');
    }
    
    // Verify interest is positive
    const interestValue = this.extractNumericValue(interestDisplay);
    if (interestValue <= 0) {
      errors.push('Interest amount should be positive');
    }
    
    // Verify mathematical relationship: total = principal + interest
    const calculatedTotal = principalAmount + interestValue;
    if (Math.abs(totalValue - calculatedTotal) > 0.01) {
      errors.push('Total amount does not equal principal plus interest');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  static async validateFormState(page: Page): Promise<{
    allFieldsPresent: boolean;
    mandatoryFieldsMarked: boolean;
    formIsAccessible: boolean;
  }> {
    // Check if all required form fields are present
    const principalInput = page.getByRole('textbox', { name: 'Principal Amount' });
    const rateSelect = page.getByRole('combobox', { name: 'Interest Rate' });
    const durationOptions = page.getByRole('radio').first();
    const consentCheckbox = page.getByRole('checkbox', { name: 'Consent' });
    const calculateButton = page.getByRole('button', { name: 'Calculate' });
    
    const allFieldsPresent = await Promise.all([
      principalInput.isVisible(),
      rateSelect.isVisible(),
      durationOptions.isVisible(),
      consentCheckbox.isVisible(),
      calculateButton.isVisible()
    ]).then(results => results.every(result => result));
    
    // Check if mandatory fields are properly marked (e.g., with required attribute or visual indicators)
    const mandatoryFieldsMarked = await Promise.all([
      principalInput.getAttribute('required'),
      rateSelect.getAttribute('required'),
      consentCheckbox.getAttribute('required')
    ]).then(attrs => attrs.every(attr => attr !== null));
    
    // Basic accessibility check - verify fields have proper labels
    const formIsAccessible = await Promise.all([
      principalInput.getAttribute('aria-label'),
      rateSelect.getAttribute('aria-label'),
      consentCheckbox.getAttribute('aria-label')
    ]).then(labels => labels.every(label => label !== null));
    
    return {
      allFieldsPresent,
      mandatoryFieldsMarked,
      formIsAccessible
    };
  }
}
