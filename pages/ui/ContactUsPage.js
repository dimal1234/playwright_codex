import { expect } from '@playwright/test';

export class ContactUsPage {
  constructor(page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: /get in touch/i });
    this.nameInput = page.getByPlaceholder('Name');
    this.emailInput = page.getByPlaceholder('Email', { exact: true });
    this.subjectInput = page.getByPlaceholder('Subject');
    this.messageInput = page.getByPlaceholder('Your Message Here');
    this.submitButton = page.getByRole('button', { name: /submit/i });
    this.successAlert = page.locator('.status.alert-success');
  }

  async goto() {
    await this.#blockThirdPartyAds();
    await this.page.goto('/contact_us');
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/\/contact_us/);
    await expect(this.heading).toBeVisible();
  }

  async submitMessage({ name, email, subject, message }) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.subjectInput.fill(subject);
    await this.messageInput.fill(message);
    this.page.once('dialog', dialog => dialog.accept());
    await this.submitButton.click();
  }

  async expectSubmitted() {
    await expect(this.successAlert).toContainText(
      'Success! Your details have been submitted successfully.',
      { timeout: 15000 },
    );
  }

  async #blockThirdPartyAds() {
    await this.page.route(
      /.*(adservice|doubleclick|googleads|googlesyndication|googletagmanager|pagead2)\.*/,
      route => route.abort(),
    );
  }
}
