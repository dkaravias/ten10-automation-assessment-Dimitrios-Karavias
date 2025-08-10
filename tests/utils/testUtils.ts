import { Page, Locator, expect } from '@playwright/test';

export class TestUtils {
  static async waitForStableElement(locator: Locator, timeout = 5000): Promise<void> {
    // AI-enhanced: Wait for element to be stable (not moving/changing)
    await locator.waitFor({ state: 'visible', timeout });
    
    let previousBoundingBox = await locator.boundingBox();
    let stabilityCount = 0;
    const requiredStability = 3; // Element must be stable for 3 checks
    
    while (stabilityCount < requiredStability) {
      await locator.page().waitForTimeout(100);
      const currentBoundingBox = await locator.boundingBox();
      
      if (JSON.stringify(previousBoundingBox) === JSON.stringify(currentBoundingBox)) {
        stabilityCount++;
      } else {
        stabilityCount = 0;
        previousBoundingBox = currentBoundingBox;
      }
    }
  }

  static async smartFill(locator: Locator, value: string): Promise<void> {
    // AI-enhanced: Clear field intelligently and verify fill
    await locator.click();
    await locator.selectText();
    await locator.fill(value);
    
    // Verify the value was actually filled
    const actualValue = await locator.inputValue();
    expect(actualValue).toBe(value);
  }

  static async takeDebugScreenshot(page: Page, name: string): Promise<void> {
    // AI-enhanced: Debug screenshots with timestamp and browser info
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const browserName = page.context().browser()?.browserType().name() || 'unknown';
    const screenshotName = `debug-${name}-${browserName}-${timestamp}.png`;
    
    await page.screenshot({ 
      path: `test-results/screenshots/${screenshotName}`, 
      fullPage: true 
    });
  }

  static async verifyElementAccessibility(locator: Locator): Promise<void> {
    // AI-enhanced: Basic accessibility checks
    const element = locator.first();
    
    // Check if element has proper ARIA attributes or text content
    const ariaLabel = await element.getAttribute('aria-label');
    const textContent = await element.textContent();
    const role = await element.getAttribute('role');
    
    expect(ariaLabel || textContent || role).toBeTruthy();
  }

  static async performanceCheck(page: Page, actionDescription: string): Promise<number> {
    // AI-enhanced: Simple performance monitoring
    const startTime = Date.now();
    console.log(`⏱️  Starting performance check: ${actionDescription}`);
    
    return startTime;
  }

  static finishPerformanceCheck(startTime: number, actionDescription: string, maxDuration = 3000): void {
    const duration = Date.now() - startTime;
    console.log(`⏱️  Finished performance check: ${actionDescription} took ${duration}ms`);
    
    if (duration > maxDuration) {
      console.warn(`⚠️  Performance warning: ${actionDescription} took ${duration}ms (expected < ${maxDuration}ms)`);
    }
  }

  static async intelligentWait(page: Page, condition: () => Promise<boolean>, timeout = 10000): Promise<void> {
    // AI-enhanced: Smart waiting with custom conditions
    const startTime = Date.now();
    
    while (Date.now() - startTime < timeout) {
      if (await condition()) {
        return;
      }
      await page.waitForTimeout(100);
    }
    
    throw new Error(`Condition not met within ${timeout}ms`);
  }
}
