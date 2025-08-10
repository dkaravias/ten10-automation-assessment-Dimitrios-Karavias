# Interest Calculator - Test Suite Generator

## Prompt for Claude-4: Generate Complete Test Automation Suite

You are a Lead SDET expert at Ten10. Generate a comprehensive test automation suite for an interest calculator web application based on the exact Product Owner requirements below. Do not add additional features or requirements beyond what is specified.

## Product Owner Requirements

**Objective**: As a product owner, I want to build a responsive interest calculator web application.

**Features:**

1. The application should provide options to choose the duration for interest calculation: Daily, Monthly, and Yearly.
2. Users should be able to input the principal amount.
3. Users should be able to select the interest rate from a predefined list of rates up to 15%.
4. The application should calculate the correct interest based on the selected duration, principal amount, and interest rate.
5. The application should display the calculated interest and the total amount including interest.
6. All input fields (principal amount, interest rate, duration and consent) are mandatory.
7. The application should inform the user if any field is left empty or not selected.
8. For simplicity, the calculated interest and total amount should be rounded to two decimal places.
9. The application should be responsive and user-friendly.
10. Clear error messages should be displayed to guide users in case of missing or incorrect inputs.

## Test Automation Requirements

### 1. Page Object Model (`tests/pages/InterestCalculatorPage.ts`)

#### Locators (use role-based selectors)
- Principal amount input field
- Interest rate dropdown/select (predefined rates up to 15%)
- Duration selection options (Daily, Monthly, Yearly)
- Consent checkbox
- Calculate button
- Calculated interest display
- Total amount display
- Error message areas

#### Methods to Implement
```typescript
// Input methods for requirements 1-3
async enterPrincipalAmount(amount: string): Promise<void>
async selectInterestRate(rate: string): Promise<void>
async selectDuration(duration: 'Daily' | 'Monthly' | 'Yearly'): Promise<void>
async toggleConsent(agree: boolean): Promise<void>
async clickCalculate(): Promise<void>

// Validation methods for requirements 4-5
async getCalculatedInterest(): Promise<string>
async getTotalAmount(): Promise<string>

// Error handling methods for requirements 6-7, 10
async getErrorMessage(): Promise<string>
async verifyFieldErrorMessage(field: string): Promise<string>

// Form state methods for requirement 8
async verifyResultsRoundedToTwoDecimals(): Promise<boolean>

// Responsive design methods for requirement 9
async verifyResponsiveLayout(): Promise<void>
```

### 2. Test Data Management (`tests/data/calculatorTestData.ts`)

#### Valid Calculation Test Cases (Requirements 1-5, 8)
```typescript
export const validCalculationCases = [
  { principal: '1000', rate: '5%', duration: 'Daily', description: 'Daily calculation test' },
  { principal: '1000', rate: '5%', duration: 'Monthly', description: 'Monthly calculation test' },
  { principal: '1000', rate: '5%', duration: 'Yearly', description: 'Yearly calculation test' },
  { principal: '1000', rate: '15%', duration: 'Yearly', description: 'Maximum rate test' },
];
```

#### Mandatory Field Validation Cases (Requirements 6-7)
```typescript
export const mandatoryFieldCases = [
  { principal: '', rate: '5%', duration: 'Yearly', consent: true, field: 'principal' },
  { principal: '1000', rate: '', duration: 'Yearly', consent: true, field: 'rate' },
  { principal: '1000', rate: '5%', duration: '', consent: true, field: 'duration' },
  { principal: '1000', rate: '5%', duration: 'Yearly', consent: false, field: 'consent' },
];
```

### 3. Test Suites

#### Core Functionality Tests (`tests/interest-calculation.spec.ts`)
Test requirements 1-5:
```typescript
test.describe('Interest Calculator - Core Functionality', () => {
  // Requirement 1: Test Daily, Monthly, Yearly duration options
  test('should provide duration options for Daily, Monthly, and Yearly');
  
  // Requirement 2: Test principal amount input
  test('should allow users to input principal amount');
  
  // Requirement 3: Test interest rate selection from predefined list up to 15%
  test('should allow selection of interest rate from predefined list up to 15%');
  
  // Requirement 4: Test correct interest calculation
  test('should calculate correct interest based on duration, principal, and rate');
  
  // Requirement 5: Test display of calculated interest and total amount
  test('should display calculated interest and total amount');
  
  // Requirement 8: Test two decimal place rounding
  test('should round calculated interest and total amount to two decimal places');
});
```

#### Form Validation Tests (`tests/form-validation.spec.ts`)
Test requirements 6-7, 10:
```typescript
test.describe('Interest Calculator - Form Validation', () => {
  // Requirement 6: Test all mandatory fields
  test('should require principal amount to be filled');
  test('should require interest rate to be selected');
  test('should require duration to be selected');
  test('should require consent to be checked');
  
  // Requirement 7: Test empty field validation
  test('should inform user when principal amount is empty');
  test('should inform user when interest rate is not selected');
  test('should inform user when duration is not selected');
  test('should inform user when consent is not checked');
  
  // Requirement 10: Test clear error messages
  test('should display clear error messages for missing inputs');
});
```

#### Responsive Design Tests (`tests/responsive-design.spec.ts`)
Test requirement 9:
```typescript
test.describe('Interest Calculator - Responsive Design', () => {
  // Requirement 9: Test responsive and user-friendly design
  test('should be responsive on mobile viewport');
  test('should be responsive on tablet viewport');
  test('should be responsive on desktop viewport');
  test('should maintain user-friendly interface across devices');
});
```

### 4. Test Scenarios by Requirement

#### Requirement 1: Duration Options
- Verify Daily option is available and selectable
- Verify Monthly option is available and selectable
- Verify Yearly option is available and selectable

#### Requirement 2: Principal Amount Input
- Verify principal amount input field exists
- Verify users can enter numeric values
- Verify input accepts decimal values

#### Requirement 3: Interest Rate Selection
- Verify predefined interest rate list exists
- Verify rates go up to 15%
- Verify users can select from the list

#### Requirement 4: Calculation Accuracy
- Test calculation with Daily duration
- Test calculation with Monthly duration
- Test calculation with Yearly duration
- Verify calculation uses correct formula for each duration

#### Requirement 5: Results Display
- Verify calculated interest is displayed
- Verify total amount (principal + interest) is displayed
- Verify results appear after calculation

#### Requirement 6: Mandatory Fields
- Test principal amount is mandatory
- Test interest rate is mandatory
- Test duration is mandatory
- Test consent is mandatory

#### Requirement 7: Empty Field Validation
- Test behavior when principal amount is empty
- Test behavior when interest rate is not selected
- Test behavior when duration is not selected
- Test behavior when consent is not checked

#### Requirement 8: Decimal Rounding
- Verify interest amount rounded to 2 decimal places
- Verify total amount rounded to 2 decimal places
- Test with values that require rounding

#### Requirement 9: Responsive Design
- Test layout on different screen sizes
- Verify user-friendly interface elements
- Test touch interactions on mobile

#### Requirement 10: Error Messages
- Verify error messages are clear and helpful
- Test error message display for each validation failure
- Verify error messages guide users to correct inputs

## Implementation Guidelines

### Use Existing Framework Components
- Leverage existing Page Object Model pattern
- Use established AI-enhanced testing utilities
- Follow existing TypeScript and test organization standards
- Integrate with current Playwright configuration

### Test Quality Standards
- Write descriptive test names that reference specific requirements
- Use parameterized tests for similar scenarios across different durations
- Implement proper async/await patterns
- Include comprehensive assertions for each requirement

### AI Enhancement Integration
- Use smart element waiting for calculation results
- Implement intelligent form filling utilities
- Add performance monitoring for calculation speed
- Include accessibility validation where applicable

## Expected Deliverables

1. **Complete Page Object Model** with methods covering all 10 requirements
2. **Test Data Sets** for valid calculations and validation scenarios
3. **Test Suites** organized by requirement categories
4. **Comprehensive Test Coverage** for each of the 10 specified requirements
5. **Integration** with existing test framework components

Generate the complete test automation suite covering exactly these 10 requirements without adding additional features or scenarios.
