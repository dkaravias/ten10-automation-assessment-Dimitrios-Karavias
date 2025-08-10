# Interest Calculator Test Suite

## Overview
Comprehensive test automation suite for the interest calculator web application, covering all 10 Product Owner requirements with AI-enhanced testing capabilities.

## Test Coverage by Requirement

### Core Functionality Tests (`interest-calculation.spec.ts`)
- **Requirement 1**: Duration options (Daily, Monthly, Yearly) availability and selection
- **Requirement 2**: Principal amount input field functionality  
- **Requirement 3**: Interest rate selection from predefined list up to 15%
- **Requirement 4**: Accurate interest calculation based on inputs
- **Requirement 5**: Display of calculated interest and total amount
- **Requirement 8**: Two decimal place rounding verification

### Form Validation Tests (`form-validation.spec.ts`)
- **Requirement 6**: Mandatory field validation (principal, rate, duration, consent)
- **Requirement 7**: Empty field validation and user notification
- **Requirement 10**: Clear error messages for missing/incorrect inputs

### Responsive Design Tests (`responsive-design.spec.ts`)
- **Requirement 9**: Responsive layout across mobile, tablet, desktop viewports
- **Requirement 9**: User-friendly interface maintenance across devices

## Test Execution

### Run All Calculator Tests
```bash
npm run test:calculator
```

### Run Individual Test Suites
```bash
npm run test:functionality    # Core calculation tests
npm run test:validation      # Form validation tests  
npm run test:responsive      # Responsive design tests
```

### Interactive Testing
```bash
npm run test:ui             # Playwright UI mode
npm run test:debug          # Debug mode
npm run test:headed         # Visual browser mode
```

## Page Object Model

### InterestCalculatorPage
Location: `tests/pages/InterestCalculatorPage.ts`

**Key Methods:**
- `enterPrincipalAmount(amount: string)` - Input principal amount
- `selectInterestRate(rate: string)` - Select interest rate from dropdown
- `selectDuration(duration)` - Choose Daily/Monthly/Yearly
- `toggleConsent(agree: boolean)` - Handle consent checkbox
- `clickCalculate()` - Submit calculation
- `getCalculatedInterest()` - Retrieve interest result
- `getTotalAmount()` - Retrieve total amount result
- `verifyResultsRoundedToTwoDecimals()` - Validate decimal formatting

## Test Data Management

### Location: `tests/data/calculatorTestData.ts`

**Valid Test Cases:**
- Daily, Monthly, Yearly calculation scenarios
- Maximum interest rate (15%) testing
- Decimal precision validation cases

**Validation Test Cases:**
- Empty field scenarios for each mandatory field
- Error message validation data

**Responsive Testing:**
- Mobile (375x667), Tablet (768x1024), Desktop (1920x1080) viewports

## AI-Enhanced Features

### Calculator Validation (`tests/utils/calculatorValidation.ts`)
- **Mathematical Accuracy**: Verifies calculations against expected formulas
- **Number Format Validation**: Ensures proper decimal place formatting
- **Performance Monitoring**: Tracks calculation response times
- **Result Consistency**: Validates consistent behavior across browsers
- **Accessibility Validation**: Basic form accessibility checks

### Smart Testing Utilities (from existing framework)
- **Intelligent Element Waiting**: Stability-based waiting for dynamic results
- **Smart Form Filling**: Value verification after input
- **Debug Screenshots**: Automated capture on failures
- **Performance Tracking**: Built-in timing for user interactions

## Test Scenarios Summary

### Positive Test Cases ✅
1. Complete calculation flow for each duration type
2. Valid input combinations with various rates
3. Decimal precision handling and rounding
4. Responsive layout across all viewports
5. Results display and formatting

### Negative Test Cases ❌
1. Empty mandatory fields validation
2. Missing consent checkbox handling
3. Form submission prevention with invalid data
4. Error message clarity and helpfulness
5. Progressive error correction workflows

### Edge Cases 🔄
1. Maximum interest rate (15%) calculations
2. Decimal principal amounts
3. Cross-browser calculation consistency
4. Touch interactions on mobile devices
5. Viewport orientation changes

## Requirements Traceability

| Requirement | Test File | Test Method | Status |
|-------------|-----------|-------------|---------|
| 1. Duration Options | interest-calculation.spec.ts | `should provide duration options` | ✅ |
| 2. Principal Input | interest-calculation.spec.ts | `should allow users to input principal` | ✅ |
| 3. Rate Selection | interest-calculation.spec.ts | `should allow selection of interest rate` | ✅ |
| 4. Calculation | interest-calculation.spec.ts | `should calculate correct interest` | ✅ |
| 5. Results Display | interest-calculation.spec.ts | `should display calculated interest` | ✅ |
| 6. Mandatory Fields | form-validation.spec.ts | `should require all mandatory fields` | ✅ |
| 7. Empty Validation | form-validation.spec.ts | `should inform user when fields empty` | ✅ |
| 8. Decimal Rounding | interest-calculation.spec.ts | `should round to two decimal places` | ✅ |
| 9. Responsive Design | responsive-design.spec.ts | `should be responsive on [viewport]` | ✅ |
| 10. Error Messages | form-validation.spec.ts | `should display clear error messages` | ✅ |

## Framework Integration

### Authentication (if required)
- Uses existing authentication fixtures from `tests/fixtures/auth.fixture.ts`
- Supports multiple user types for role-based testing

### Configuration
- Leverages centralized Playwright configuration
- Automatic network idle waiting
- Cross-browser execution (Chrome, Firefox, Safari)
- Screenshot and video capture on failures

### Reporting
- HTML reports for visual test results
- JUnit XML for CI/CD integration
- JSON output for custom reporting tools

## Best Practices Demonstrated

1. **Requirement-Driven Testing**: Each test maps directly to a specific requirement
2. **Data-Driven Approach**: Parameterized tests with comprehensive test data
3. **Page Object Pattern**: Clean separation of test logic and page interactions
4. **AI Enhancement**: Intelligent waiting, validation, and monitoring
5. **Responsive Testing**: Multi-viewport validation for inclusive design
6. **Error Handling**: Comprehensive validation and error recovery testing

## Execution Reports

After running tests, view results:
```bash
npm run report
```

Reports include:
- Test execution summary
- Requirement coverage matrix
- Performance metrics
- Screenshot evidence for failures
- Cross-browser compatibility results
