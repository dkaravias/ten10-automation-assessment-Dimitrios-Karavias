import { test, expect } from './fixtures/auth.fixture';
import { responsiveViewports } from './data/calculatorTestData';

test.describe('Interest Calculator - Responsive Design', () => {

  // Requirement 9: Test responsive and user-friendly design
  responsiveViewports.forEach((viewport) => {
    test.describe(`${viewport.name} viewport (${viewport.width}x${viewport.height})`, () => {
      test.beforeEach(async ({ page }) => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
      });

      test(`should be responsive on ${viewport.name.toLowerCase()} viewport`, async ({ authenticatedPage, calculatorPage }) => {
        // Verify all form elements are visible and accessible
        await calculatorPage.verifyResponsiveLayout();
        
        // Verify elements are properly sized and positioned
        const principalInput = calculatorPage.page.getByRole('textbox', { name: 'Principal Amount' });
        const calculateButton = calculatorPage.page.getByRole('button', { name: 'Calculate' });
        
        // Check that elements are within viewport
        const principalBox = await principalInput.boundingBox();
        const buttonBox = await calculateButton.boundingBox();
        
        expect(principalBox).toBeTruthy();
        expect(buttonBox).toBeTruthy();
        
        if (principalBox && buttonBox) {
          expect(principalBox.x).toBeGreaterThanOrEqual(0);
          expect(principalBox.x + principalBox.width).toBeLessThanOrEqual(viewport.width);
          expect(buttonBox.x).toBeGreaterThanOrEqual(0);
          expect(buttonBox.x + buttonBox.width).toBeLessThanOrEqual(viewport.width);
        }
      });

      test(`should maintain user-friendly interface on ${viewport.name.toLowerCase()}`, async ({ authenticatedPage, calculatorPage }) => {
        // Test form interaction on this viewport
        await calculatorPage.enterPrincipalAmount('1000');
        await calculatorPage.selectInterestRate('5%');
        await calculatorPage.selectDuration('Yearly');
        await calculatorPage.toggleConsent(true);
        
        // Verify calculate button is accessible and clickable
        const calculateButton = calculatorPage.page.getByRole('button', { name: 'Calculate' });
        await expect(calculateButton).toBeVisible();
        await expect(calculateButton).toBeEnabled();
        
        // Perform calculation
        await calculatorPage.clickCalculate();
        
        // Verify results are displayed properly on this viewport
        await calculatorPage.verifyCalculationResults();
        
        // Check that results are visible within viewport
        const interestDisplay = calculatorPage.page.getByTestId('calculated-interest');
        const totalDisplay = calculatorPage.page.getByTestId('total-amount');
        
        const interestBox = await interestDisplay.boundingBox();
        const totalBox = await totalDisplay.boundingBox();
        
        expect(interestBox).toBeTruthy();
        expect(totalBox).toBeTruthy();
        
        if (interestBox && totalBox) {
          expect(interestBox.x).toBeGreaterThanOrEqual(0);
          expect(totalBox.x).toBeGreaterThanOrEqual(0);
        }
      });

      if (viewport.name === 'Mobile') {
        test('should support touch interactions on mobile', async ({ authenticatedPage, calculatorPage }) => {
          // Test touch-friendly interactions
          await calculatorPage.page.tap('[role="textbox"][name="Principal Amount"]');
          await calculatorPage.enterPrincipalAmount('1500');
          
          await calculatorPage.page.tap('[role="combobox"][name="Interest Rate"]');
          await calculatorPage.selectInterestRate('10%');
          
          await calculatorPage.page.tap('[role="radio"][name="Monthly"]');
          await calculatorPage.page.tap('[role="checkbox"][name="Consent"]');
          
          // Verify form submission works with touch
          await calculatorPage.page.tap('[role="button"][name="Calculate"]');
          await calculatorPage.verifyCalculationResults();
        });
      }
    });
  });

  test('should maintain layout integrity across device orientations', async ({ authenticatedPage, calculatorPage }) => {
    // Test tablet in both portrait and landscape
    await authenticatedPage.setViewportSize({ width: 768, height: 1024 }); // Portrait
    await calculatorPage.verifyResponsiveLayout();
    
    // Switch to landscape
    await authenticatedPage.setViewportSize({ width: 1024, height: 768 }); // Landscape
    await calculatorPage.verifyResponsiveLayout();
  });

  test('should provide consistent user experience across all viewports', async ({ authenticatedPage, calculatorPage }) => {
    const testData = { principal: '2000', rate: '8%', duration: 'Monthly' as const, consent: true };
    
    for (const viewport of responsiveViewports) {
      await authenticatedPage.setViewportSize({ width: viewport.width, height: viewport.height });
      
      // Perform same test on each viewport
      await calculatorPage.fillCompleteForm(testData.principal, testData.rate, testData.duration, testData.consent);
      await calculatorPage.clickCalculate();
      
      // Verify consistent behavior
      await calculatorPage.verifyCalculationResults();
      const interest = await calculatorPage.getCalculatedInterest();
      const total = await calculatorPage.getTotalAmount();
      
      // Results should be consistent across viewports
      expect(interest).toBeTruthy();
      expect(total).toBeTruthy();
      expect(interest).toMatch(/\d+\.\d{2}/);
      expect(total).toMatch(/\d+\.\d{2}/);
    }
  });

  test('should handle form validation consistently across devices', async ({ authenticatedPage, calculatorPage }) => {
    for (const viewport of responsiveViewports) {
      await authenticatedPage.setViewportSize({ width: viewport.width, height: viewport.height });
      
      // Test validation on each viewport
      await calculatorPage.clickCalculate(); // Submit empty form
      
      const errorMessage = await calculatorPage.getErrorMessage();
      expect(errorMessage).toBeTruthy();
      
      // Verify error messages are visible and readable
      const errorBox = await calculatorPage.page.getByTestId('error-message').boundingBox();
      expect(errorBox).toBeTruthy();
      
      if (errorBox) {
        expect(errorBox.width).toBeGreaterThan(0);
        expect(errorBox.height).toBeGreaterThan(0);
      }
    }
  });
});
