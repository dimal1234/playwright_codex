# Test Plan

## Scope

This plan documents the automated Playwright tests currently implemented for the Automation Exercise web application. It covers the API and UI tests under `tests/` and does not include planned or unimplemented scenarios.

Base URL: `https://automationexercise.com`

Configured Playwright projects:

| Project | Test directory | Browser/context |
| --- | --- | --- |
| `api` | `tests/api` | API request context |
| `ui-chromium` | `tests/ui` | Desktop Chrome |
| `ui-firefox` | `tests/ui` | Desktop Firefox |
| `ui-webkit` | `tests/ui` | Desktop Safari |

## Test Suites

### API: Products API

File: `tests/api/products.api.spec.js`

| Test case | Flow | Main assertions |
| --- | --- | --- |
| `gets all products list` | Request `/api/productsList`. | HTTP status is `200`, response code is `200`, products are returned, and the first product includes numeric `id`, string `name`, and string `price`. |

### API: Brands API

File: `tests/api/brands.api.spec.js`

| Test case | Flow | Main assertions |
| --- | --- | --- |
| `gets all brands list` | Request `/api/brandsList`. | HTTP status is `200`, response code is `200`, brands are returned, and the first brand includes numeric `id` and string `brand`. |

### API: Search Product API

File: `tests/api/search-product.api.spec.js`

| Test case | Flow | Main assertions |
| --- | --- | --- |
| `searches products with valid search term` | Submit a product search request using `productApiData.validSearchTerm`. | HTTP status is `200`, response code is `200`, matching products are returned, and the first product includes numeric `id`, string `name`, and string `price`. |
| `returns bad request when search term is missing` | Submit a product search request without `search_product`. | HTTP status is `200`, response code is `400`, and the response message matches `productApiData.missingSearchTermMessage`. |

### UI: Home Page

File: `tests/ui/home.spec.js`

| Test case | Flow | Main assertions |
| --- | --- | --- |
| `loads home page and shows signup login navigation` | Open the home page. | Page title matches Automation Exercise, the home slider is visible, and the Signup/Login navigation link is visible. |
| `subscribes from the footer` | Open the home page, enter a generated subscriber email, and submit the footer subscription form. | Subscription success text is shown and `#success-subscribe` is visible. |

### UI: Products Page

File: `tests/ui/products.spec.js`

| Test case | Flow | Main assertions |
| --- | --- | --- |
| `searches for products by keyword` | Open the home page, navigate to Products, search using `productSearchData.validSearchTerm`. | Products page URL and heading are shown, product cards are visible, searched products heading is visible, and the first result name contains the search term. |
| `adds first listed product to cart` | Open the home page, navigate to Products, hover over the first product, and add it to the cart. | Products page is loaded, the add-to-cart modal contains `Added!`, and the View Cart link is visible. |

### UI: Contact Us Page

File: `tests/ui/contact-us.spec.js`

| Test case | Flow | Main assertions |
| --- | --- | --- |
| `submits a contact message` | Open Contact Us, fill generated contact data, accept the browser dialog, and submit the form. | Contact page URL and heading are visible, and the success alert confirms the details were submitted. |

### UI: Customer Signup

File: `tests/ui/signup.spec.js`

| Test case | Flow | Main assertions |
| --- | --- | --- |
| `creates a new customer account` | Open Signup/Login, start signup with generated customer data, complete account information, continue after account creation, verify the signed-in user, and delete the account. | Signup page loads, account information form appears, account creation succeeds, logged-in user text contains the generated customer name, and account deletion succeeds. |

## Placeholder Tests

File: `tests/ui/seed.spec.ts`

This file contains a placeholder `seed` test with no actions or assertions. It is not counted as functional coverage in this plan.

## Test Data

| Area | Data source |
| --- | --- |
| API product search | `test-data/api/productApiData.js` |
| UI contact form | `test-data/ui/contactData.js` |
| UI customer signup | `test-data/ui/customerData.js` |
| UI product search | `test-data/ui/productData.js` |
| UI subscription | `test-data/ui/subscriptionData.js` |

## Risks and Notes

- UI tests depend on the public Automation Exercise site and require network access.
- The signup test creates a unique account and deletes it during cleanup.
- Page objects block common third-party ad routes in some flows to reduce UI interruptions.
- Product and brand API checks validate response shape for the first returned item, not the full collection.
- Cart coverage currently verifies the add-to-cart modal, but does not continue into cart validation or checkout.
- Contact form coverage verifies successful submission only; validation and error states are not covered.
- Signup coverage verifies the happy path only; duplicate email, invalid data, and login flows are not covered.
- Mobile and branded browser projects are present only as commented examples in `playwright.config.js`; they are not active execution targets.
