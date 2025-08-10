# Ten10 AI-Enhanced Test Framework Generator

## Prompt for Claude-4: Enterprise Test Automation Framework Setup

You are a Lead SDET expert specializing in AI-enhanced test automation frameworks for enterprise clients, particularly in the public sector. Create a comprehensive Playwright test automation framework that demonstrates modern testing practices and AI integration capabilities.

## Framework Requirements

### Core Architecture
- **Testing Framework**: Playwright with TypeScript
- **Architecture Pattern**: Page Object Model without unnecessary base classes
- **Configuration**: Centralized in `playwright.config.ts` (no BasePage abstraction)
- **Organization**: Professional folder structure with clear separation of concerns

### Folder Structure to Create
```
tests/
├── pages/              # Page Object Models (clean classes, no inheritance)
├── fixtures/           # Test fixtures and authentication setup
├── data/              # Test data management and user credentials
├── utils/             # AI-enhanced testing utilities
├── [domain].spec.ts   # Test suites organized by functional area
```

### Required Files and Components

#### 1. Configuration (`playwright.config.ts`)
- Base URL configuration for the application under test
- Global timeout settings (action: 10s, navigation: 30s, test: 30s)
- Automatic network idle waiting for all navigations
- Cross-browser testing (Chrome, Firefox, Safari)
- Multiple reporters (HTML, JUnit, JSON) for CI/CD integration
- Screenshot and video capture on failures
- Comprehensive trace collection

#### 2. Page Object Models (`tests/pages/`)
- Clean TypeScript classes without inheritance
- Role-based locators (avoid CSS selectors)
- Descriptive method names that reflect user actions
- Built-in validation methods for each page
- Integration with AI-enhanced utilities

#### 3. Authentication Fixture (`tests/fixtures/auth.fixture.ts`)
- Custom Playwright fixture for automatic user authentication
- Support for different user types/roles
- Clean separation of authenticated vs non-authenticated tests
- Type-safe fixture definitions

#### 4. Test Data Management (`tests/data/`)
- Centralized user credentials and test data
- TypeScript interfaces for data structures
- Environment-specific configurations
- Reusable test datasets

#### 5. AI-Enhanced Utilities (`tests/utils/testUtils.ts`)
Include these intelligent testing capabilities:
- **Smart Element Waiting**: Stability-based waiting for dynamic elements
- **Intelligent Form Filling**: Value verification after input operations
- **Performance Monitoring**: Built-in timing checks with configurable thresholds
- **Accessibility Validation**: Basic compliance checks for WCAG standards
- **Debug Automation**: Automated screenshot capture with metadata
- **Custom Waiting Strategies**: Intelligent wait conditions beyond standard Playwright

#### 6. Package.json Scripts
Comprehensive npm scripts for different testing scenarios:
- `test`: Run all tests
- `test:ui`: Interactive debugging mode
- `test:headed`: Visual browser execution
- `test:debug`: Step-through debugging
- `test:chrome/firefox/webkit`: Browser-specific execution
- `report`: View test results
- `install-browsers`: Setup command

### AI Enhancement Features to Implement

#### Smart Testing Utilities
```typescript
// Example implementations to include:
TestUtils.waitForStableElement(locator) // Waits for element stability
TestUtils.smartFill(locator, value)     // Intelligent form filling
TestUtils.performanceCheck(page, action) // Performance monitoring
TestUtils.takeDebugScreenshot(page, name) // Automated debug capture
```

#### Intelligent Assertions
- Web-first assertions with automatic waiting
- Custom matchers for common validation patterns
- Accessibility compliance checks
- Performance threshold validations

### Test Implementation Guidelines

#### Test Structure
- Use descriptive test names that explain expected behavior
- Organize tests in `describe` blocks by functional areas
- Implement proper setup/teardown with `beforeEach`/`afterEach`
- Leverage fixtures for authentication and common setup

#### Best Practices to Follow
- Prefer role-based locators over CSS selectors
- Use `data-testid` attributes when available
- Implement parallel test execution
- Avoid hardcoded timeouts
- Use web-first assertions (`toBeVisible`, `toHaveText`, etc.)

### Documentation Requirements

#### README.md Structure
Create a comprehensive README that includes:
1. **Framework Overview**: Architecture and key features
2. **Getting Started**: Installation and setup instructions
3. **AI-Enhanced Features**: Detailed explanation of intelligent capabilities
4. **Lead SDET Capabilities**: How the framework demonstrates advanced skills
5. **Strategic Value Proposition**: Business benefits for Ten10 clients
6. **Public Sector Focus**: Emphasis on citizen-centric digital services
7. **Ten10 Brand Alignment**: Mirror Ten10's tone of voice and strategic focus

#### Strategic Positioning
The README should position this framework as:
- Enabling "sustainable automation culture through Human + AI collaboration"
- Supporting "enhancing UK citizen services through AI-driven automation"
- Demonstrating "agentic AI" capabilities
- Addressing public sector challenges like skills shortages and digital inclusion
- Ensuring WCAG 2.1 AA compliance for government services

### Application Context

**Target Application**: Interest calculator web application
- Authentication flow with email/password
- Multiple calculation modes (Daily, Monthly, Yearly)
- Responsive design requirements
- Public-facing service expectations

### Example Test Scenarios to Implement
1. **Authentication Tests**: Login validation and form accessibility
2. **Calculator Navigation**: Mode selection and interface validation
3. **Cross-Browser Compatibility**: Consistent behavior across browsers
4. **Performance Validation**: Response time monitoring
5. **Accessibility Compliance**: WCAG standard adherence

### Deliverables Expected
- Complete project structure with all files
- Functional test suite that can run immediately
- Comprehensive documentation
- AI-enhanced utilities ready for extension
- Configuration optimized for CI/CD deployment

### Quality Standards
- Type-safe TypeScript implementation
- No linting errors
- Professional code organization
- Enterprise-ready configuration
- Scalable architecture for team adoption

## Execution Instructions

When given an application URL and basic requirements, generate the complete framework following this specification. Ensure all components work together seamlessly and demonstrate both technical excellence and strategic business understanding suitable for a Lead SDET position at Ten10.

Focus on creating a framework that showcases:
- Modern testing practices
- AI integration capabilities
- Public sector awareness
- Ten10's strategic positioning
- Measurable business value
