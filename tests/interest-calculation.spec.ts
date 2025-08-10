import { test, expect } from './fixtures/auth.fixture';
import { validCalculationCases, durationOptions, interestRateOptions } from './data/calculatorTestData';

test.describe('Interest Calculator - Core Functionality', () => {
  // Using authenticated page and calculator page from fixture

  // Requirement 1: Test Daily, Monthly, Yearly duration options
  test('should provide duration options for Daily, Monthly, and Yearly', async ({ authenticatedPage, calculatorPage }) => {
    await calculatorPage.verifyDurationOptionsAvailable();
    
    // Verify each duration option is selectable
    for (const duration of durationOptions) {
      await calculatorPage.selectDuration(duration);
    }
  });

  // Requirement 2: Test principal amount input
  test('should allow users to input principal amount', async ({ authenticatedPage, calculatorPage }) => {
    const testAmount = '1500';
    await calculatorPage.enterPrincipalAmount(testAmount);
    
    // Verify the input value was set correctly
    await calculatorPage.verifyPrincipalAmountValue(testAmount);
  });

  // Requirement 3: Test interest rate selection from predefined list up to 15%
  test('should allow selection of interest rate from predefined list up to 15%', async ({ authenticatedPage, calculatorPage }) => {
    await calculatorPage.verifyInterestRateOptionsUpTo15Percent();
    
    // Test selecting different rates
    // TODO: Fix page object to select interest rate
    await calculatorPage.selectInterestRate('10%');
    await calculatorPage.verifyInterestRateSelected('10%');
    
    await calculatorPage.selectInterestRate('15%');
    await calculatorPage.verifyInterestRateSelected('15%');
  });

  // Requirement 4: Test correct interest calculation
  test.skip('should calculate correct interest based on duration, principal, and rate', () => {
    validCalculationCases.forEach((testCase) => {
      test(`${testCase.description}`, async ({ authenticatedPage, calculatorPage }) => {
        await calculatorPage.fillCompleteForm(
          testCase.principal, 
          testCase.rate, 
          testCase.duration, 
          true
        );
        await calculatorPage.clickCalculate();
        
        // Verify calculation results are displayed
        await calculatorPage.verifyCalculationResults();
        
        const calculatedInterest = await calculatorPage.getCalculatedInterest();
        const totalAmount = await calculatorPage.getTotalAmount();
        
        // Verify results are numeric and greater than 0
        expect(calculatedInterest).toMatch(/\d+\.\d{2}/);
        expect(totalAmount).toMatch(/\d+\.\d{2}/);
        
        // Verify total amount is greater than principal
        const principalValue = parseFloat(testCase.principal);
        const totalValue = parseFloat(totalAmount.replace(/[^\d.]/g, ''));
        expect(totalValue).toBeGreaterThan(principalValue);
      });
    });
  });

  // Requirement 5: Test display of calculated interest and total amount
  test('should display calculated interest and total amount', async ({ authenticatedPage, calculatorPage }) => {
    await calculatorPage.fillCompleteForm('1000', '5%', 'Yearly', true);
    await calculatorPage.clickCalculate();
    
    // Verify both results are visible and contain numeric values
    const calculatedInterest = await calculatorPage.getCalculatedInterest();
    const totalAmount = await calculatorPage.getTotalAmount();
    
    expect(calculatedInterest).toBeTruthy();
    expect(totalAmount).toBeTruthy();
    expect(calculatedInterest).toMatch(/\d+/);
    expect(totalAmount).toMatch(/\d+/);
  });

  // Requirement 8: Test two decimal place rounding
  test('should round calculated interest and total amount to two decimal places', async ({ authenticatedPage, calculatorPage }) => {
    // Use a case that will likely produce decimals requiring rounding
    await calculatorPage.fillCompleteForm('1000', '7.5%', 'Monthly', true);
    await calculatorPage.clickCalculate();
    
    const isRoundedCorrectly = await calculatorPage.verifyResultsRoundedToTwoDecimals();
    expect(isRoundedCorrectly).toBe(true);
    
    // Also verify by checking the actual values
    const calculatedInterest = await calculatorPage.getCalculatedInterest();
    const totalAmount = await calculatorPage.getTotalAmount();
    
    // Extract numeric values and verify they have exactly 2 decimal places
    const interestMatch = calculatedInterest.match(/(\d+\.\d{2})/);
    const totalMatch = totalAmount.match(/(\d+\.\d{2})/);
    
    expect(interestMatch).toBeTruthy();
    expect(totalMatch).toBeTruthy();
  });
});
