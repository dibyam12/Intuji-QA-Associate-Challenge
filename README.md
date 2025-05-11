# Intuji-QA-Associate-Challenge

## Project Overview
This project is a Cypress-based end-to-end (E2E) test suite for the [AutomationExercise.com](https://automationexercise.com) e-commerce platform, developed as part of an automation assessment. The suite automates a complete user flow, including user registration, product browsing, cart management, checkout, and logout/re-login, with additional negative testing for invalid login. It leverages the Page Object Model (POM) for modularity, custom Cypress commands for reusability, and both `cy.session` and local storage for session management.

### Objectives
- Automate the core user journey (registration, product selection, cart operations, checkout, logout/re-login).
- Implement session persistence using `cy.session` and local storage.
- Validate negative scenarios (e.g., invalid login).
- Ensure maintainable, reusable code with POM and custom commands.
- Document test cases and setup for clarity.

## Setup Instructions
- Clone the repository.
- Install Node.js (v16+).
- Run npm install.
- Install dependencies: npm install cypress @faker-js/faker cypress-localstorage-commands.

## Run Tests
- Open Cypress UI: npx cypress open.
- Run all tests: npx cypress run.

## Configuration
- Base URL: https://automationexercise.com (set in cypress.config.js).
- Default Command Timeout: 10 seconds.
- watchForFileChanges: false,

## Tools/Plugins
- Cypress: v13.x
- Faker.js: For generating random user data
- Cypress Intercept: For API response validation
- cypress Local Storage: For session persistence

## Key Features
- Page Object Model (POM): Modular classes (HomePage, ProductsPage, CartPage, CheckoutPage) encapsulate page interactions.
- Custom Commands: cy.addProductToCart, cy.registerUser, cy.login enhance reusability.
- Session Management:
    - Session-Based: Uses cy.session for efficient session persistence.
    - Local Storage-Based: Uses cypress-localstorage-commands for legacy session management.
- API Testing: Validates /productsList and /brandsList endpoints using cy.request.
- Negative Testing: Ensures error handling for invalid login.
- Test Coverage: Covers registration, product browsing, cart operations, checkout, logout/re-login, negative scenarios, and API validation.

## Known Limitations
- API responses may vary based on server state.
- Visual screenshots not implemented due to time constraints.
- Automatic Logout (E2E Tests):
    - Navigating to /products triggers a logout, requiring a conditional re-login in assessment.cy.js.
    - Mitigation: Added re-login check in tests and addProductToCart command.

## Test Case
The test suite includes six test cases, covering E2E and API testing, documented in Cypress_Assessment_test_case.xlsx.

## Future Improvements
- Resolve Logout Issue: Investigate cookie clearing on /products navigation.
- Enhance Negative Tests: Add scenarios (e.g., invalid payment details, out-of-stock products).
- CI/CD Integration: Add GitHub Actions for automated test runs.
- Reporting: Integrate Allure or Mochawesome for detailed test reports.
- Visual Testing: Implement screenshot comparisons for UI validation.

## Conclusion
This test suite demonstrates a robust automation framework for AutomationExercise.com, leveraging Cypress v14, POM, custom commands, and API testing. Despite minor issues (logout), it achieves comprehensive coverage of E2E and API scenarios, with clear documentation and test case reporting. The GitHub repository and README.md provide all necessary details.

