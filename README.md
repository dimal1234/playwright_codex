# Playwright Automation Framework

Playwright JavaScript test automation framework for [Automation Exercise](https://automationexercise.com/).

The framework covers both UI and API testing, follows the Page Object Model for UI flows, and keeps reusable test data in a separate folder for easier maintenance.

## Tech Stack

- JavaScript
- Playwright Test
- Page Object Model
- UI and API test projects
- OpenAI - Codex

## Project Structure

```text
.
├── pages
│   ├── api
│   │   └── AutomationExerciseApi.js
│   └── ui
│       ├── ContactUsPage.js
│       ├── HomePage.js
│       ├── ProductsPage.js
│       └── SignupPage.js
├── test-data
│   ├── api
│   │   └── productApiData.js
│   └── ui
│       ├── contactData.js
│       ├── customerData.js
│       ├── productData.js
│       └── subscriptionData.js
├── tests
│   ├── api
│   │   ├── brands.api.spec.js
│   │   ├── products.api.spec.js
│   │   └── search-product.api.spec.js
│   └── ui
│       ├── contact-us.spec.js
│       ├── home.spec.js
│       ├── products.spec.js
│       └── signup.spec.js
├── playwright.config.js
├── package.json
└── README.md
```

## Prerequisites

- Node.js installed
- npm installed

## Installation

Install project dependencies:

```bash
npm install
```

Install Playwright browsers if they are not already installed:

```bash
npx playwright install
```

## Test Application

Base URL:

```text
https://automationexercise.com
```

The base URL is configured in `playwright.config.js`.

## Run Tests

Run all tests:

```bash
npm test
```

Run UI tests in Chromium:

```bash
npm run test:ui
```

Run UI tests in Chromium, Firefox, and WebKit:

```bash
npm run test:ui:all
```

Run API tests:

```bash
npm run test:api
```

Open the Playwright HTML report:

```bash
npm run report
```

## Test Coverage

UI tests include:

- Home page load and signup/login navigation
- Footer subscription
- Product search
- Add product to cart
- Contact form submission
- Customer account creation and cleanup

API tests include:

- Get all products
- Get all brands
- Search products
- Validate missing search parameter error

## Page Object Model

UI page actions and assertions are stored under `pages/ui`.

Example:

```js
const homePage = new HomePage(page);

await homePage.goto();
await homePage.openSignupLogin();
```

API request helpers are stored under `pages/api`.

Example:

```js
const api = new AutomationExerciseApi(request);

const response = await api.getProducts();
```

## Test Data

Reusable test data is stored under `test-data`.

- UI data: `test-data/ui`
- API data: `test-data/api`

Dynamic data factories are used where unique values are needed, such as customer signup emails.

## Reports and Results

Playwright generates:

- `playwright-report/`
- `test-results/`

These folders are ignored by Git through `.gitignore`.

## Notes

- UI tests run against the public Automation Exercise site, so internet access is required.
- Signup tests create a unique customer account and delete it at the end of the test.
- The framework blocks common third-party ad routes in page objects where needed to keep UI tests stable.
