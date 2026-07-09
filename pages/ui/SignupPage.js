import { expect } from '@playwright/test';

export class SignupPage {
  constructor(page) {
    this.page = page;
    this.newUserSignupHeading = page.getByRole('heading', { name: /new user signup/i });
    this.signupNameInput = page.locator('[data-qa="signup-name"]');
    this.signupEmailInput = page.locator('[data-qa="signup-email"]');
    this.signupButton = page.locator('[data-qa="signup-button"]');
    this.accountInformationHeading = page.getByText('Enter Account Information');
    this.titleMrRadio = page.locator('#id_gender1');
    this.passwordInput = page.locator('[data-qa="password"]');
    this.daySelect = page.locator('[data-qa="days"]');
    this.monthSelect = page.locator('[data-qa="months"]');
    this.yearSelect = page.locator('[data-qa="years"]');
    this.newsletterCheckbox = page.locator('#newsletter');
    this.offersCheckbox = page.locator('#optin');
    this.firstNameInput = page.locator('[data-qa="first_name"]');
    this.lastNameInput = page.locator('[data-qa="last_name"]');
    this.companyInput = page.locator('[data-qa="company"]');
    this.addressInput = page.locator('[data-qa="address"]');
    this.address2Input = page.locator('[data-qa="address2"]');
    this.countrySelect = page.locator('[data-qa="country"]');
    this.stateInput = page.locator('[data-qa="state"]');
    this.cityInput = page.locator('[data-qa="city"]');
    this.zipcodeInput = page.locator('[data-qa="zipcode"]');
    this.mobileNumberInput = page.locator('[data-qa="mobile_number"]');
    this.createAccountButton = page.locator('[data-qa="create-account"]');
    this.accountCreatedHeading = page.locator('[data-qa="account-created"]');
    this.continueButton = page.locator('[data-qa="continue-button"]');
    this.loggedInAs = page.getByText(/logged in as/i);
    this.deleteAccountLink = page.getByRole('link', { name: /delete account/i });
    this.accountDeletedHeading = page.locator('[data-qa="account-deleted"]');
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/\/login/);
    await expect(this.newUserSignupHeading).toBeVisible();
  }

  async startSignup({ name, email }) {
    await this.signupNameInput.fill(name);
    await this.signupEmailInput.fill(email);
    await this.signupButton.click();
  }

  async expectAccountInformationForm() {
    await expect(this.accountInformationHeading).toBeVisible();
  }

  async createAccount(customer) {
    await this.titleMrRadio.check();
    await this.passwordInput.fill(customer.password);
    await this.daySelect.selectOption(customer.birthDay);
    await this.monthSelect.selectOption(customer.birthMonth);
    await this.yearSelect.selectOption(customer.birthYear);
    await this.newsletterCheckbox.check();
    await this.offersCheckbox.check();
    await this.firstNameInput.fill(customer.firstName);
    await this.lastNameInput.fill(customer.lastName);
    await this.companyInput.fill(customer.company);
    await this.addressInput.fill(customer.address);
    await this.address2Input.fill(customer.address2);
    await this.countrySelect.selectOption(customer.country);
    await this.stateInput.fill(customer.state);
    await this.cityInput.fill(customer.city);
    await this.zipcodeInput.fill(customer.zipcode);
    await this.mobileNumberInput.fill(customer.mobileNumber);
    await this.createAccountButton.click();
  }

  async expectAccountCreated() {
    await expect(this.accountCreatedHeading).toContainText('Account Created!');
  }

  async continueAfterAccountCreated() {
    await this.continueButton.click();
  }

  async expectLoggedInAs(name) {
    await expect(this.loggedInAs).toContainText(name);
  }

  async deleteAccount() {
    await this.deleteAccountLink.click();
    await expect(this.accountDeletedHeading).toContainText('Account Deleted!');
    await this.continueButton.click();
  }
}
