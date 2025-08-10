import { test, expect } from './fixtures/auth.fixture';
import { mandatoryFieldCases, expectedErrorMessages } from './data/calculatorTestData';

test.describe('Interest Calculator - Form Validation', () => {
  // Using authenticated page and calculator page from fixture

  // Requirement 6: Test all mandatory fields
  test.describe('should require all mandatory fields', () => {
    test('should require principal amount to be filled', async ({ authenticatedPage, calculatorPage }) => {
      await calculatorPage.selectInterestRate('5%');
      await calculatorPage.selectDuration('Yearly');
      await calculatorPage.toggleConsent(true);
      await calculatorPage.clickCalculate();
      
      const errorMessage = await calculatorPage.verifyFieldErrorMessage('principal');
      expect(errorMessage).toContain('required');
    });

    test('should require interest rate to be selected', async ({ authenticatedPage, calculatorPage }) => {
      await calculatorPage.enterPrincipalAmount('1000');
      await calculatorPage.selectDuration('Yearly');
      await calculatorPage.toggleConsent(true);
      await calculatorPage.clickCalculate();
      
      const errorMessage = await calculatorPage.verifyFieldErrorMessage('rate');
      expect(errorMessage).toContain('required');
    });

    test('should require duration to be selected', async ({ authenticatedPage, calculatorPage }) => {
      await calculatorPage.enterPrincipalAmount('1000');
      await calculatorPage.selectInterestRate('5%');
      await calculatorPage.toggleConsent(true);
      await calculatorPage.clickCalculate();
      
      const errorMessage = await calculatorPage.verifyFieldErrorMessage('duration');
      expect(errorMessage).toContain('required');
    });

    test('should require consent to be checked', async ({ authenticatedPage, calculatorPage }) => {
      await calculatorPage.enterPrincipalAmount('1000');
      await calculatorPage.selectInterestRate('5%');
      await calculatorPage.selectDuration('Yearly');
      await calculatorPage.clickCalculate();
      
      const errorMessage = await calculatorPage.verifyFieldErrorMessage('consent');
      expect(errorMessage).toContain('required');
    });
  });

  // Requirement 7: Test empty field validation
  test.describe('should inform user when fields are empty or not selected', () => {
    mandatoryFieldCases.forEach((testCase) => {
      test(`should inform user when ${testCase.field} is empty/not selected`, async ({ authenticatedPage, calculatorPage }) => {
        // Fill form according to test case
        if (testCase.principal) {
          await calculatorPage.enterPrincipalAmount(testCase.principal);
        }
        if (testCase.rate) {
          await calculatorPage.selectInterestRate(testCase.rate);
        }
        if (testCase.duration) {
          await calculatorPage.selectDuration(testCase.duration as 'Daily' | 'Monthly' | 'Yearly');
        }
        if (testCase.consent) {
          await calculatorPage.toggleConsent(testCase.consent);
        }
        
        await calculatorPage.clickCalculate();
        
        // Verify appropriate error message is displayed
        const errorMessage = await calculatorPage.verifyFieldErrorMessage(testCase.field);
        expect(errorMessage).toBeTruthy();
        expect(errorMessage.toLowerCase()).toContain('required');
      });
    });
  });

  // Requirement 10: Test clear error messages
  test('should display clear error messages for missing inputs', async ({ authenticatedPage, calculatorPage }) => {
    // Submit form with all fields empty
    await calculatorPage.clickCalculate();
    
    // Verify general error message
    const generalErrorMessage = await calculatorPage.getErrorMessage();
    expect(generalErrorMessage).toBeTruthy();
    expect(generalErrorMessage.toLowerCase()).toMatch(/please|required|missing|fill/);
    
    // Verify specific field error messages
    for (const field of ['principal', 'rate', 'duration', 'consent']) {
      const fieldErrorMessage = await calculatorPage.verifyFieldErrorMessage(field);
      expect(fieldErrorMessage).toBeTruthy();
      expect(fieldErrorMessage).toContain(expectedErrorMessages[field as keyof typeof expectedErrorMessages]);
    }
  });

  test('should clear error messages when form is corrected', async ({ authenticatedPage, calculatorPage }) => {
    // First, trigger validation errors
    await calculatorPage.clickCalculate();
    await calculatorPage.getErrorMessage(); // Ensure errors are displayed
    
    // Then fill the form correctly
    await calculatorPage.fillCompleteForm('1000', '5%', 'Yearly', true);
    await calculatorPage.clickCalculate();
    
    // Verify results are displayed instead of errors
    await calculatorPage.verifyCalculationResults();
  });

  test('should guide users to correct inputs with helpful error messages', async ({authenticatedPage, calculatorPage }) => {
    // Test principal amount validation
    await calculatorPage.selectInterestRate('5%');
    await calculatorPage.selectDuration('Yearly');
    await calculatorPage.toggleConsent(true);
    await calculatorPage.clickCalculate();
    
    const principalError = await calculatorPage.verifyFieldErrorMessage('principal');
    expect(principalError.toLowerCase()).toMatch(/principal|amount|enter|input/);
    
    // Test rate validation
    await calculatorPage.enterPrincipalAmount('1000');
    await calculatorPage.clickCalculate(); // Rate still not selected
    
    const rateError = await calculatorPage.verifyFieldErrorMessage('rate');
    expect(rateError.toLowerCase()).toMatch(/rate|interest|select|choose/);
  });

  test('should prevent form submission when mandatory fields are missing', async ({ authenticatedPage, calculatorPage }) => {
    // Try to submit with missing fields
    await calculatorPage.enterPrincipalAmount('1000');
    await calculatorPage.clickCalculate();
    
    // Verify that results are not displayed (calculation didn't happen)
    const resultsVisible = await calculatorPage.page.getByTestId('calculated-interest').isVisible();
    expect(resultsVisible).toBe(false);
    
    // Verify error messages are shown instead
    const errorMessage = await calculatorPage.getErrorMessage();
    expect(errorMessage).toBeTruthy();
  });
});
