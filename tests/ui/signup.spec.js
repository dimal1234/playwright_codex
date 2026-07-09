import { test } from '@playwright/test';
import { HomePage } from '../../pages/ui/HomePage';
import { SignupPage } from '../../pages/ui/SignupPage';
import { createCustomerData } from '../../test-data/ui/customerData';

test.describe('Customer signup', () => {
  test('creates a new customer account', async ({ page }) => {
    const homePage = new HomePage(page);
    const signupPage = new SignupPage(page);
    const customer = createCustomerData();

    await homePage.goto();
    await homePage.openSignupLogin();
    await signupPage.expectLoaded();
    await signupPage.startSignup(customer);
    await signupPage.expectAccountInformationForm();
    await signupPage.createAccount(customer);
    await signupPage.expectAccountCreated();
    await signupPage.continueAfterAccountCreated();
    await signupPage.expectLoggedInAs(customer.name);
    await signupPage.deleteAccount();
  });
});
