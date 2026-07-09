import { expect } from '@playwright/test';

export class HomePage {
  constructor(page) {
    this.page = page;
    this.slider = page.locator('#slider');
    this.productsLink = page.getByRole('link', { name: /products/i });
    this.contactUsLink = page.getByRole('link', { name: /contact us/i });
    this.signupLoginLink = page.getByRole('link', { name: /signup \/ login/i });
    this.subscriptionEmail = page.locator('#susbscribe_email');
    this.subscribeButton = page.locator('#subscribe');
    this.subscriptionSuccess = page.locator('.alert-success');
  }

  async goto() {
    await this.#blockThirdPartyAds();
    await this.page.goto('/');
  }

  async expectLoaded() {
    await expect(this.page).toHaveTitle(/Automation Exercise/);
    await expect(this.slider).toBeVisible();
  }

  async openProducts() {
    await this.productsLink.click();
    await this.#gotoIfAdInterrupted('/products', /\/products/);
  }

  async openContactUs() {
    await this.contactUsLink.click();
    await this.#gotoIfAdInterrupted('/contact_us', /\/contact_us/);
  }

  async openSignupLogin() {
    await this.signupLoginLink.click();
    await this.#gotoIfAdInterrupted('/login', /\/login/);
  }

  async expectSignupLoginAvailable() {
    await expect(this.signupLoginLink).toBeVisible();
  }

  async subscribe(email) {
    await this.subscriptionEmail.scrollIntoViewIfNeeded();
    await this.subscriptionEmail.fill(email);
    await this.subscribeButton.click();
  }

  async expectSubscriptionSuccess() {
    await expect(this.subscriptionSuccess).toContainText('You have been successfully subscribed!');
  }

  async #blockThirdPartyAds() {
    await this.page.route(
      /.*(adservice|doubleclick|googleads|googlesyndication|googletagmanager|pagead2)\.*/,
      route => route.abort(),
    );
  }

  async #gotoIfAdInterrupted(path, expectedUrl) {
    try {
      await expect(this.page).toHaveURL(expectedUrl, { timeout: 5000 });
    } catch {
      await this.page.goto(path);
    }
  }
}
